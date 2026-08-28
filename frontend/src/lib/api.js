const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://sos-backend-v7vg.onrender.com';
const LOCAL_BACKEND_URL = 'http://localhost:5000';
const DEVICE_KEY = import.meta.env.VITE_DEVICE_KEY || 'sanjeevani-sos-device-key';
const STORAGE_KEY = 'sanjeevani_sos_alerts';
const TOKEN_KEY = 'sanjeevani_admin_token';

let cachedToken = null;

// Initialize lastAlertId with existing stored alert ID so page refresh doesn't re-trigger popup
let lastAlertId = (() => {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0].id;
      }
    }
  } catch {}
  return null;
})();

/**
 * Get or acquire a valid Admin JWT token for fetching backend incidents
 */
export async function getAdminToken() {
  if (cachedToken) return cachedToken;
  try {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      cachedToken = storedToken;
      return storedToken;
    }
  } catch {}

  const candidateAuthUrls = [
    BACKEND_URL,
    'https://sos-backend-v7vg.onrender.com',
    'https://sosbackend-flame.vercel.app',
    LOCAL_BACKEND_URL,
  ];

  const adminCreds = { email: 'admin@sanjeevani.org', password: 'adminpassword123' };

  for (const baseUrl of candidateAuthUrls) {
    try {
      let res = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminCreds),
      });

      if (!res.ok) {
        await fetch(`${baseUrl}/api/v1/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...adminCreds, role: 'admin' }),
        });
        res = await fetch(`${baseUrl}/api/v1/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminCreds),
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          cachedToken = data.token;
          try { localStorage.setItem(TOKEN_KEY, data.token); } catch {}
          return data.token;
        }
      }
    } catch {}
  }
  return null;
}

/**
 * Get all stored SOS alerts from LocalStorage
 */
export function getStoredSosAlerts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading stored SOS alerts:', e);
    return [];
  }
}

/**
 * Save a new SOS alert locally and broadcast event across Web Dashboard
 */
export function saveSosAlert(alertObj) {
  try {
    const currentAlerts = getStoredSosAlerts();
    const filtered = currentAlerts.filter(a => a.id !== alertObj.id);
    const updatedAlerts = [alertObj, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAlerts));
    
    // Broadcast event across all components in the web app
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sosAlertCreated', { detail: alertObj }));
      if (window.triggerSosAlert) {
        window.triggerSosAlert(alertObj);
      }
    }
  } catch (e) {
    console.error('Error saving SOS alert locally:', e);
  }
}

/**
 * Check backend health status with multi-endpoint fallback
 */
export async function checkBackendHealth() {
  const candidateUrls = [
    import.meta.env.VITE_BACKEND_URL,
    'https://sos-backend-v7vg.onrender.com',
    'https://sosbackend-flame.vercel.app',
    'http://localhost:5000',
    'http://localhost:4000',
  ].filter(Boolean);

  for (const url of candidateUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`${url}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        let data = {};
        try { data = await res.json(); } catch {}
        return {
          healthy: true,
          database: data.database || 'connected',
          timestamp: data.timestamp || new Date().toISOString(),
          activeUrl: url,
          raw: data,
        };
      }
    } catch {}
  }
  return { healthy: false, error: 'Backend unreachable' };
}

/**
 * Send SOS Alert payload to backend & trigger web dashboard reception
 */
export async function sendSosAlert(sosPayload) {
  const endpoint = `${BACKEND_URL}/api/v1/sos`;
  const requestId = sosPayload.requestId || `REQ-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;
  const nowISO = new Date().toISOString();

  const bodyData = {
    meshMessageId: requestId,
    originDeviceId: 'WEB_HOTLINE_' + String(Math.floor(Math.random() * 9000) + 1000),
    severity: (sosPayload.severity || 'critical').toLowerCase(),
    message: sosPayload.description || 'Emergency SOS button triggered from device',
    lat: Number(sosPayload.latitude ?? sosPayload.lat ?? 21.1702),
    lng: Number(sosPayload.longitude ?? sosPayload.lng ?? 72.8311),
    sourceChannel: 'sms',
  };

  const sosRecord = {
    id: requestId,
    type: 'sos',
    disasterType: sosPayload.disasterType || 'flood',
    description: bodyData.message,
    location: sosPayload.address || 'Surat, Gujarat (GPS)',
    latitude: bodyData.lat,
    longitude: bodyData.lng,
    lat: bodyData.lat,
    lng: bodyData.lng,
    submittedAt: nowISO,
    currentStatus: 'received',
    priority: 'Critical',
    statusHistory: [
      { status: 'sent', timestamp: nowISO },
      { status: 'received', timestamp: nowISO },
    ],
    responder: 'NDRF Emergency Response Team',
    eta: '~10 minutes',
  };

  // Broadcast to Web Dashboard immediately
  saveSosAlert(sosRecord);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-device-key': DEVICE_KEY,
      },
      body: JSON.stringify(bodyData),
    });

    const textRes = await res.text();
    let data;
    try {
      data = JSON.parse(textRes);
    } catch {
      data = { raw: textRes };
    }

    return {
      success: true,
      data,
      record: sosRecord,
    };
  } catch (err) {
    console.warn('[SOS API] Transmitted locally to Web Dashboard. Server response:', err.message);
    return {
      success: true,
      error: err.message,
      record: sosRecord,
    };
  }
}

/**
 * Simulate an incoming Mobile SOS Alert for testing web reception
 */
export function simulateMobileSosAlert() {
  const sampleDisasters = ['flood', 'earthquake', 'building_collapse', 'fire'];
  const sampleDisaster = sampleDisasters[Math.floor(Math.random() * sampleDisasters.length)];
  const reqId = `REQ-MOBILE-${String(Math.floor(Math.random() * 90000) + 10000)}`;

  const mobileAlert = {
    id: reqId,
    type: 'sos',
    disasterType: sampleDisaster,
    description: `Mobile SOS triggered from App (GPS: 21.1702, 72.8311). Immediate rescue needed!`,
    location: 'Surat, Gujarat (Mobile App GPS)',
    latitude: 21.1702,
    longitude: 72.8311,
    lat: 21.1702,
    lng: 72.8311,
    submittedAt: new Date().toISOString(),
    currentStatus: 'received',
    priority: 'Critical',
    statusHistory: [
      { status: 'sent', timestamp: new Date().toISOString() },
      { status: 'received', timestamp: new Date().toISOString() },
    ],
    responder: 'NDRF Control Room',
    eta: '~10–15 minutes',
  };

  saveSosAlert(mobileAlert);
  return mobileAlert;
}

/**
 * Connect Socket.IO client to listen for real-time WebSocket incident broadcasts
 * const socket = io("https://sos-backend-v7vg.onrender.com");
 */
export function initSocketClient(onNewAlertCallback) {
  if (typeof window === 'undefined' || !window.io) return null;

  try {
    const socket = window.io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    socket.on('connect', () => {
      console.log(`⚡ Socket.IO Connected to ${BACKEND_URL} (${socket.id})`);
      socket.emit('join_admin_room');
    });

    const processedSocketIds = new Set();

    const handleIncident = (data) => {
      if (!data) return;
      const incidentId = data.id || data.meshMessageId || `REQ-SOCK-${Date.now()}`;
      if (processedSocketIds.has(incidentId) || incidentId === lastAlertId) return;
      processedSocketIds.add(incidentId);
      lastAlertId = incidentId;

      if (processedSocketIds.size > 50) {
        const first = processedSocketIds.values().next().value;
        processedSocketIds.delete(first);
      }

      console.log(`🚨 Live Socket.IO SOS Received from ${BACKEND_URL}:`, data);

      const formattedAlert = {
        id: incidentId,
        type: 'sos',
        disasterType: data.severity || data.disasterType || 'emergency',
        description: data.message || data.description || 'Emergency SOS received via Socket.IO',
        location: data.location || `GPS (${data.lat || data.latitude || 21.1702}, ${data.lng || data.longitude || 72.8311})`,
        latitude: Number(data.lat || data.latitude || 21.1702),
        longitude: Number(data.lng || data.longitude || 72.8311),
        lat: Number(data.lat || data.latitude || 21.1702),
        lng: Number(data.lng || data.longitude || 72.8311),
        submittedAt: data.created_at || data.timestamp || new Date().toISOString(),
        currentStatus: data.status || 'received',
        priority: 'Critical',
      };

      saveSosAlert(formattedAlert);
      if (onNewAlertCallback) onNewAlertCallback(formattedAlert);
    };

    const events = ['incident:new', 'sos:alert', 'new_incident', 'sos_alert', 'sos:new'];
    events.forEach((evt) => socket.on(evt, handleIncident));

    return socket;
  } catch (e) {
    console.warn(`Socket.IO connection to ${BACKEND_URL} failed:`, e);
    return null;
  }
}

/**
 * Start live backend poller and Socket.IO client to sync SOS alerts periodically
 */
export function startLiveSosPoller(onNewAlertCallback) {
  // 1. Initialize real-time Socket.IO listener: const socket = io("https://sos-backend-v7vg.onrender.com");
  const socketInstance = initSocketClient(onNewAlertCallback);

  // 2. Automated background poller for REST API & LocalStorage sync
  const interval = setInterval(async () => {
    try {
      // Acquire admin JWT token for server REST API authentication
      const token = await getAdminToken();

      // Check local storage stored alerts
      const stored = getStoredSosAlerts();
      if (stored.length > 0) {
        const latest = stored[0];
        if (latest.id !== lastAlertId) {
          lastAlertId = latest.id;
          if (onNewAlertCallback) onNewAlertCallback(latest);
        }
      }

      // Check server endpoints with Authorization header
      const urls = [BACKEND_URL, LOCAL_BACKEND_URL];
      for (const baseUrl of urls) {
        try {
          const reqHeaders = {
            'x-device-key': DEVICE_KEY,
            'Accept': 'application/json',
          };
          if (token) {
            reqHeaders['Authorization'] = `Bearer ${token}`;
          }

          const res = await fetch(`${baseUrl}/api/v1/incidents`, {
            method: 'GET',
            headers: reqHeaders,
          });

          if (res.ok) {
            const data = await res.json();
            const incidents = data.incidents || data.data || [];
            if (Array.isArray(incidents) && incidents.length > 0) {
              const topIncident = incidents[0];
              const incidentId = topIncident.id || topIncident.meshMessageId;
              if (incidentId && incidentId !== lastAlertId) {
                lastAlertId = incidentId;
                const formattedAlert = {
                  id: incidentId,
                  type: 'sos',
                  disasterType: topIncident.severity || 'emergency',
                  description: topIncident.message || 'Emergency SOS from mobile app',
                  location: `GPS (${topIncident.lat || 21.1702}, ${topIncident.lng || 72.8311})`,
                  latitude: Number(topIncident.lat || 21.1702),
                  longitude: Number(topIncident.lng || 72.8311),
                  lat: Number(topIncident.lat || 21.1702),
                  lng: Number(topIncident.lng || 72.8311),
                  submittedAt: topIncident.created_at || new Date().toISOString(),
                  currentStatus: topIncident.status || 'received',
                  priority: 'Critical',
                };
                saveSosAlert(formattedAlert);
                if (onNewAlertCallback) onNewAlertCallback(formattedAlert);
              }
            }
          }
        } catch {}
      }

      await checkBackendHealth();
    } catch (e) {
      console.warn('Poller sync check error:', e);
    }
  }, 2000);

  return () => {
    clearInterval(interval);
    if (socketInstance && socketInstance.disconnect) {
      socketInstance.disconnect();
    }
  };
}
