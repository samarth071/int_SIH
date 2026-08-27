import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Overview from './pages/Overview';
import Operations from './pages/Operations';
import Relief from './pages/Relief';
import AnalyticsSecurity from './pages/AnalyticsSecurity';
import { AlertCircle, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSOSModal, setShowSOSModal] = useState(false);

  // Card 10: Emergency Priority Queue data state
  const [mockQueue, setMockQueue] = useState([
    { priority: 'Critical', incident: 'Flood Rescue', location: 'Mysuru East', affected: 18, time: '4 min ago', status: 'Waiting', team: '—' },
    { priority: 'Critical', incident: 'Building Collapse', location: 'Zone B', affected: 9, time: '7 min ago', status: 'Responding', team: 'Rescue Team 04' },
    { priority: 'High', incident: 'Medical Emergency', location: 'Zone C', affected: 4, time: '11 min ago', status: 'Waiting', team: '—' }
  ]);

  // SOS Form state
  const [formIncident, setFormIncident] = useState('Flood Rescue');
  const [formLocation, setFormLocation] = useState('');
  const [formPeople, setFormPeople] = useState('1');
  const [formPriority, setFormPriority] = useState('High');

  const handleSOSSubmit = (e) => {
    e.preventDefault();
    if (!formLocation.trim()) return;

    const newSOS = {
      priority: formPriority,
      incident: formIncident,
      location: formLocation,
      affected: parseInt(formPeople) || 1,
      time: 'Just now',
      status: 'Waiting',
      team: '—'
    };

    setMockQueue([newSOS, ...mockQueue]);
    setShowSOSModal(false);
    setFormLocation('');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Overview mockQueue={mockQueue} setMockQueue={setMockQueue} />;
      case 'responders':
        return <Operations />;
      case 'supplies':
        return <Relief />;
      case 'comms':
        return <Operations />; // Comms and operations share the mesh network monitoring
      case 'analytics':
        return <AnalyticsSecurity />;
      default:
        return <Overview mockQueue={mockQueue} setMockQueue={setMockQueue} />;
    }
  };

  return (
    <div style={styles.app}>
      {/* Sidebar navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main workspace */}
      <div style={styles.main}>
        <Topbar activeTab={activeTab} onReportSOS={() => setShowSOSModal(true)} />
        
        {/* Main scrollable body */}
        <div style={styles.content}>
          {renderActiveView()}
        </div>
      </div>

      {/* SOS Reporting Modal */}
      {showSOSModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent} className="glass-panel">
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleRow}>
                <AlertCircle size={18} color="#ef4444" className="pulse-dot" />
                <h3 style={styles.modalTitle}>File Emergency SOS Report</h3>
              </div>
              <button 
                onClick={() => setShowSOSModal(false)}
                style={styles.modalCloseBtn}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSOSSubmit} style={styles.form}>
              <div style={styles.formField}>
                <label style={styles.label}>Incident Category</label>
                <select 
                  value={formIncident}
                  onChange={(e) => setFormIncident(e.target.value)}
                  style={styles.select}
                >
                  <option value="Flood Rescue">Flood Rescue</option>
                  <option value="Building Collapse">Building Collapse</option>
                  <option value="Medical Emergency">Medical Emergency</option>
                  <option value="Hazmat Leak">Hazmat Leak</option>
                  <option value="Power Outage">Power Grid Failure</option>
                </select>
              </div>

              <div style={styles.formField}>
                <label style={styles.label}>Location / Grid Coordinates</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mysuru East, Zone B" 
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formRow}>
                <div style={{ ...styles.formField, flexGrow: 1 }}>
                  <label style={styles.label}>People Affected</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={formPeople}
                    onChange={(e) => setFormPeople(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={{ ...styles.formField, flexGrow: 1 }}>
                  <label style={styles.label}>Priority Threshold</label>
                  <select 
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    style={styles.select}
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <button type="submit" style={styles.submitBtn}>
                Broadcast SOS Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#09090b'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden'
  },
  content: {
    flexGrow: 1,
    padding: '32px',
    overflowY: 'auto',
    backgroundColor: '#09090b'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  modalContent: {
    width: '400px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    paddingBottom: '12px'
  },
  modalTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  modalTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff'
  },
  modalCloseBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#71717a',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  formRow: {
    display: 'flex',
    gap: '16px'
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#a1a1aa'
  },
  input: {
    height: '36px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    fontSize: '12px',
    padding: '0 12px',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  select: {
    height: '36px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    fontSize: '12px',
    padding: '0 12px',
    outline: 'none',
    cursor: 'pointer'
  },
  submitBtn: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    height: '38px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
  }
};
