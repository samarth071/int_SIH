import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getStoredSosAlerts, saveSosAlert } from '../lib/api';

const SOSContext = createContext(null);

const BACKEND_WS = import.meta.env.VITE_BACKEND_URL || 'https://sos-backend-v7vg.onrender.com';

export const SOSProvider = ({ children }) => {
  const [sosAlerts, setSosAlerts] = useState([]);
  const [incomingAlert, setIncomingAlert] = useState(null);
  const socketRef = useRef(null);

  // Initialize stored alerts
  useEffect(() => {
    setSosAlerts(getStoredSosAlerts());
  }, []);

  // Connect WebSocket / Socket.IO (matching ambulance project's TelemetryProvider logic)
  useEffect(() => {
    let activeSocket = null;

    if (typeof window !== 'undefined' && window.io) {
      try {
        const socket = window.io(BACKEND_WS, {
          transports: ['websocket', 'polling'],
          reconnection: true,
        });

        socket.on('connect', () => {
          console.log('⚡ Connected to SOS Data Stream:', socket.id);
          socket.emit('join_admin_room');
        });

        const processedIds = new Set();

        const handleIncomingEvent = (data) => {
          if (!data) return;
          const incidentId = data.id || data.meshMessageId || `REQ-${Date.now()}`;
          if (processedIds.has(incidentId)) return;
          processedIds.add(incidentId);

          // Retain only last 50 processed IDs to avoid memory leaks
          if (processedIds.size > 50) {
            const first = processedIds.values().next().value;
            processedIds.delete(first);
          }

          console.log('🚨 Incoming Real-Time SOS Alert:', data);

          const formattedAlert = {
            id: incidentId,
            type: 'sos',
            disasterType: data.severity || data.disasterType || 'emergency',
            description: data.message || data.description || 'Emergency SOS broadcast received',
            location: data.location || `GPS (${data.lat || data.latitude || 21.1702}, ${data.lng || data.longitude || 72.8311})`,
            latitude: Number(data.lat || data.latitude || 21.1702),
            longitude: Number(data.lng || data.longitude || 72.8311),
            submittedAt: data.created_at || data.timestamp || new Date().toISOString(),
            currentStatus: data.status || 'received',
            priority: 'Critical',
          };

          saveSosAlert(formattedAlert);
          setSosAlerts((prev) => [formattedAlert, ...prev.filter((a) => a.id !== incidentId)]);
          setIncomingAlert(formattedAlert);
        };

        const events = ['incident:new', 'sos:alert', 'new_incident', 'sos_alert', 'sos:new'];
        events.forEach((evt) => socket.on(evt, handleIncomingEvent));

        socketRef.current = socket;
        activeSocket = socket;
      } catch (err) {
        console.warn('Socket.IO connection failed:', err);
      }
    }

    // Listen to local custom window events & storage events
    const handleCustomEvent = (e) => {
      if (e.detail) {
        setIncomingAlert(e.detail);
        setSosAlerts((prev) => [e.detail, ...prev.filter((a) => a.id !== e.detail.id)]);
      }
    };

    window.addEventListener('sosAlertCreated', handleCustomEvent);

    return () => {
      if (activeSocket) activeSocket.disconnect();
      window.removeEventListener('sosAlertCreated', handleCustomEvent);
    };
  }, []);

  const triggerSosAlert = (alertData) => {
    saveSosAlert(alertData);
    setIncomingAlert(alertData);
    setSosAlerts((prev) => [alertData, ...prev.filter((a) => a.id !== alertData.id)]);
  };

  const dismissAlert = () => {
    setIncomingAlert(null);
  };

  return (
    <SOSContext.Provider value={{ sosAlerts, incomingAlert, triggerSosAlert, dismissAlert }}>
      {children}
    </SOSContext.Provider>
  );
};

export const useSOS = () => {
  const context = useContext(SOSContext);
  if (!context) {
    return {
      sosAlerts: [],
      incomingAlert: null,
      triggerSosAlert: () => {},
      dismissAlert: () => {},
    };
  }
  return context;
};
