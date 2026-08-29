import React, { useState, useEffect } from 'react';

// Citizen components/pages imports
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import SOSPage from './pages/SOSPage.jsx';
import LocationShare from './pages/LocationShare.jsx';
import ReportIncident from './pages/ReportIncident.jsx';
import Shelters from './pages/Shelters.jsx';
import MissingPerson from './pages/MissingPerson.jsx';
import MedicalSupport from './pages/MedicalSupport.jsx';
import Alerts from './pages/Alerts.jsx';
import SafetyGuide from './pages/SafetyGuide.jsx';
import MyRequests from './pages/MyRequests.jsx';
import './App.css';

// Admin components/pages imports
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Overview from './pages/Overview.jsx';
import Operations from './pages/Operations.jsx';
import Relief from './pages/Relief.jsx';
import AnalyticsSecurity from './pages/AnalyticsSecurity.jsx';
import { AlertCircle, X, ShieldAlert, User, Users } from 'lucide-react';

// NGO Portal component import
import NgoPortal from './pages/NgoPortal.jsx';

// API poller import
import { startLiveSosPoller } from './lib/api.js';
import { useSOS } from './context/SOSContext.jsx';

export default function App() {
  const { incomingAlert, dismissAlert: dismissContextAlert } = useSOS();

  // Portal selection state ('citizen', 'admin', or 'ngo')
  const [currentPortal, setCurrentPortal] = useState('citizen');

  // Citizen routing state
  const [citizenPage, setCitizenPage] = useState('home');

  // Admin routing state
  const [adminTab, setAdminTab] = useState('dashboard');
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [incomingToast, setIncomingToast] = useState(null);

  const activeToastAlert = incomingAlert || incomingToast;

  // NGO Theme state ('light' or 'dark')
  const [ngoTheme, setNgoTheme] = useState('light');

  // Admin Card 10: Emergency Priority Queue data state
  const [mockQueue, setMockQueue] = useState([]);

  // Admin SOS Form state
  const [formIncident, setFormIncident] = useState('Flood Rescue');
  const [formLocation, setFormLocation] = useState('');
  const [formPeople, setFormPeople] = useState('1');
  const [formPriority, setFormPriority] = useState('High');

  // Real-time listener for incoming SOS alerts across all portals
  useEffect(() => {
    function handleNewSosAlert(alertData) {
      if (!alertData) return;

      // 1. Open live emergency popup modal (stays open until user dismisses)
      setIncomingToast(alertData);

      // 2. Add to Admin Emergency Priority Queue (with deduplication by ID & location)
      setMockQueue((prev) => {
        const incId = alertData.id || alertData.meshMessageId;
        const alertLoc = alertData.location || 'Surat, Gujarat';
        const isDuplicate = prev.some(
          (item) => (incId && item.id === incId) || (item.location === alertLoc && item.time === 'Just now')
        );
        if (isDuplicate) return prev;

        return [
          {
            id: incId,
            priority: 'Critical',
            incident: alertData.disasterType ? `${alertData.disasterType.toUpperCase()} Alert` : 'Emergency SOS',
            location: alertLoc,
            affected: 1,
            time: 'Just now',
            status: 'Waiting',
            team: 'Unassigned',
          },
          ...prev,
        ];
      });
    }

    function onCustomEvent(e) {
      if (e.detail) {
        handleNewSosAlert(e.detail);
      }
    }

    function onStorageEvent(e) {
      if (e.key === 'sanjeevani_sos_alerts' && e.newValue) {
        try {
          const list = JSON.parse(e.newValue);
          if (list && list.length > 0) {
            handleNewSosAlert(list[0]);
          }
        } catch {}
      }
    }

    // Attach global helper to window so any component/console can call window.triggerSosAlert()
    window.triggerSosAlert = (alertData) => {
      handleNewSosAlert(alertData);
    };

    window.addEventListener('sosAlertCreated', onCustomEvent);
    window.addEventListener('storage', onStorageEvent);

    // Start background live poller for server/mobile alert synchronization
    const stopPoller = startLiveSosPoller(handleNewSosAlert);

    return () => {
      window.removeEventListener('sosAlertCreated', onCustomEvent);
      window.removeEventListener('storage', onStorageEvent);
      stopPoller();
    };
  }, []);

  // Dynamic Theme/Body class and data-theme switcher
  useEffect(() => {
    if (currentPortal === 'citizen') {
      document.body.className = 'citizen-portal-theme';
      document.body.removeAttribute('data-theme');
    } else if (currentPortal === 'admin') {
      document.body.className = 'admin-portal-theme';
      document.body.removeAttribute('data-theme');
    } else if (currentPortal === 'ngo') {
      document.body.className = 'ngo-portal-theme';
      document.body.setAttribute('data-theme', ngoTheme);
    }
  }, [currentPortal, ngoTheme]);

  // Scroll to top whenever the citizen page changes
  useEffect(() => {
    if (currentPortal === 'citizen') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [citizenPage, currentPortal]);

  // Citizen Navigation helper
  const navigateCitizen = (page) => {
    setCitizenPage(page);
  };

  // Render Citizen Page
  const renderCitizenPage = () => {
    switch (citizenPage) {
      case 'home':
        return <Home navigate={navigateCitizen} />;
      case 'sos':
        return <SOSPage navigate={navigateCitizen} />;
      case 'location':
        return <LocationShare navigate={navigateCitizen} />;
      case 'report':
        return <ReportIncident navigate={navigateCitizen} />;
      case 'shelters':
        return <Shelters navigate={navigateCitizen} />;
      case 'missing':
        return <MissingPerson navigate={navigateCitizen} />;
      case 'medical':
        return <MedicalSupport navigate={navigateCitizen} />;
      case 'alerts':
        return <Alerts navigate={navigateCitizen} />;
      case 'safety-guide':
        return <SafetyGuide navigate={navigateCitizen} />;
      case 'my-requests':
        return <MyRequests navigate={navigateCitizen} />;
      default:
        return <Home navigate={navigateCitizen} />;
    }
  };

  // Render Admin Page
  const renderAdminPage = () => {
    switch (adminTab) {
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

  // Admin SOS Broadcast submission handler
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

  return (
    <div 
      className={currentPortal === 'citizen' ? 'citizen-portal-theme' : currentPortal === 'admin' ? 'admin-portal-theme' : 'ngo-portal-theme'} 
      data-theme={currentPortal === 'ngo' ? ngoTheme : undefined}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', position: 'relative' }}
    >
      {/* Live SOS Alert Notification Modal Popup & Top Toast across Web Dashboard */}
      {activeToastAlert && (
        <>
          {/* 1. Top Banner Notification */}
          <div
            style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 999999,
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              padding: '14px 24px',
              borderRadius: '12px',
              boxShadow: '0 12px 36px rgba(220, 38, 38, 0.55)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
            role="alert"
          >
            <AlertCircle size={28} />
            <div>
              <strong style={{ display: 'block', fontSize: '14px', letterSpacing: '0.5px' }}>
                🚨 EMERGENCY SOS ALERT RECEIVED IN WEB DASHBOARD!
              </strong>
              <span style={{ fontSize: '12px', opacity: 0.95 }}>
                ID: <strong>{activeToastAlert.id}</strong> • Location: <strong>{activeToastAlert.location}</strong> • Type: <strong style={{ textTransform: 'capitalize' }}>{activeToastAlert.disasterType}</strong>
              </span>
            </div>
            <button
              onClick={() => { setIncomingToast(null); dismissContextAlert(); }}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: '8px',
              }}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>

          {/* 2. Centered Emergency Modal Popup */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(6px)',
              zIndex: 9999990,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => { setIncomingToast(null); dismissContextAlert(); }}
          >
            <div
              style={{
                backgroundColor: '#18181B',
                color: '#F4F4F5',
                border: '2px solid #DC2626',
                borderRadius: '16px',
                padding: '28px',
                maxWidth: '480px',
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(220, 38, 38, 0.4)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div
                  style={{
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    padding: '12px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShieldAlert size={32} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#EF4444', fontWeight: 700 }}>
                    Incoming Emergency SOS Alert
                  </h3>
                  <span style={{ fontSize: '12px', color: '#A1A1AA' }}>
                    Triggered from Mobile App / Citizen Hotline
                  </span>
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: '10px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#A1A1AA' }}>Request ID:</span>
                  <strong style={{ color: '#F4F4F5' }}>{activeToastAlert.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#A1A1AA' }}>Emergency Type:</span>
                  <strong style={{ color: '#EF4444', textTransform: 'capitalize' }}>{activeToastAlert.disasterType?.replace('_', ' ')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#A1A1AA' }}>Location:</span>
                  <strong style={{ color: '#F4F4F5' }}>{activeToastAlert.location}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#A1A1AA' }}>Status:</span>
                  <span style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)', color: '#F87171', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>CRITICAL • RECEIVED</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => {
                      const reqId = activeToastAlert.id;
                      const loc = activeToastAlert.location || 'Emergency GPS';
                      
                      // 1. Update queue status
                      setMockQueue((prev) =>
                        prev.map((item) =>
                          item.id === reqId || item.location === loc
                            ? { ...item, status: 'Relief Dispatched', team: 'NDRF Unit 4 (Food & Medical)' }
                            : item
                        )
                      );

                      // 2. Open Admin Relief & Supplies Portal
                      setCurrentPortal('admin');
                      setAdminTab('supplies');
                      setIncomingToast(null);
                      dismissContextAlert();

                      // 3. Show confirmation feedback
                      alert(`🚚 RELIEF DISPATCHED SUCCESSFULLY!\n\nNDRF Emergency Unit #4 + Food Rations, Clean Water, & Trauma Kits have been dispatched to ${loc}.`);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    🚚 Send Relief & Supplies
                  </button>

                  <button
                    onClick={() => {
                      setCurrentPortal('admin');
                      setAdminTab('dashboard');
                      setIncomingToast(null);
                      dismissContextAlert();
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#DC2626',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                    }}
                  >
                    🚨 Dispatch Rescue Team
                  </button>
                </div>

                <button
                  onClick={() => { setIncomingToast(null); dismissContextAlert(); }}
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    color: '#A1A1AA',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Dismiss Notification
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      {currentPortal === 'citizen' && (
        /* ==========================================================
           CITIZEN PORTAL LAYOUT
           ========================================================== */
        <div className="portal-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Navbar currentPage={citizenPage} navigate={navigateCitizen} />
          
          <main className="portal-main" id="main-content" style={{ flex: 1 }}>
            {renderCitizenPage()}
          </main>

          {/* Floating Switch to Admin Button */}
          <button 
            onClick={() => setCurrentPortal('admin')}
            style={switcherStyles.floatingBtnCitizen}
            title="Switch to Admin Portal"
          >
            <ShieldAlert size={18} />
            <span>Admin Portal</span>
          </button>
        </div>
      )}

      {currentPortal === 'admin' && (
        /* ==========================================================
           ADMIN PORTAL LAYOUT
           ========================================================== */
        <div style={adminStyles.app}>
          {/* Sidebar navigation */}
          <Sidebar activeTab={adminTab} setActiveTab={setAdminTab} />

          {/* Main workspace */}
          <div style={adminStyles.main}>
            <Topbar activeTab={adminTab} onReportSOS={() => setShowSOSModal(true)} />
            
            {/* Main scrollable body */}
            <div style={adminStyles.content}>
              {renderAdminPage()}
            </div>
          </div>

          {/* Floating Switch to NGO Button */}
          <button 
            onClick={() => setCurrentPortal('ngo')}
            style={switcherStyles.floatingBtnAdmin}
            title="Switch to NGO Portal"
          >
            <Users size={18} />
            <span>NGO Portal</span>
          </button>

          {/* SOS Reporting Modal */}
          {showSOSModal && (
            <div style={adminStyles.modalOverlay}>
              <div style={adminStyles.modalContent} className="glass-panel">
                <div style={adminStyles.modalHeader}>
                  <div style={adminStyles.modalTitleRow}>
                    <AlertCircle size={18} color="#ef4444" className="pulse-dot" />
                    <h3 style={adminStyles.modalTitle}>File Emergency SOS Report</h3>
                  </div>
                  <button 
                    onClick={() => setShowSOSModal(false)}
                    style={adminStyles.modalCloseBtn}
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSOSSubmit} style={adminStyles.form}>
                  <div style={adminStyles.formField}>
                    <label style={adminStyles.label}>Incident Category</label>
                    <select 
                      value={formIncident}
                      onChange={(e) => setFormIncident(e.target.value)}
                      style={adminStyles.select}
                    >
                      <option value="Flood Rescue">Flood Rescue</option>
                      <option value="Building Collapse">Building Collapse</option>
                      <option value="Medical Emergency">Medical Emergency</option>
                      <option value="Hazmat Leak">Hazmat Leak</option>
                      <option value="Power Outage">Power Grid Failure</option>
                    </select>
                  </div>

                  <div style={adminStyles.formField}>
                    <label style={adminStyles.label}>Location / Grid Coordinates</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mysuru East, Zone B" 
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      required
                      style={adminStyles.input}
                    />
                  </div>

                  <div style={adminStyles.formRow}>
                    <div style={{ ...adminStyles.formField, flexGrow: 1 }}>
                      <label style={adminStyles.label}>People Affected</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={formPeople}
                        onChange={(e) => setFormPeople(e.target.value)}
                        style={adminStyles.input}
                      />
                    </div>

                    <div style={{ ...adminStyles.formField, flexGrow: 1 }}>
                      <label style={adminStyles.label}>Priority Threshold</label>
                      <select 
                        value={formPriority}
                        onChange={(e) => setFormPriority(e.target.value)}
                        style={adminStyles.select}
                      >
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" style={adminStyles.submitBtn}>
                    Broadcast SOS Report
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {currentPortal === 'ngo' && (
        /* ==========================================================
           NGO PORTAL LAYOUT
           ========================================================== */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <NgoPortal theme={ngoTheme} setTheme={setNgoTheme} />

          {/* Floating Switch to Citizen Button */}
          <button 
            onClick={() => setCurrentPortal('citizen')}
            style={switcherStyles.floatingBtnNgo}
            title="Switch to Citizen Portal"
          >
            <User size={18} />
            <span>Citizen Portal</span>
          </button>
        </div>
      )}
    </div>
  );
}

// Styles specific to the Admin Portal layout (inline as in samarth branch)
const adminStyles = {
  app: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#09090b',
    flex: 1
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

// Premium Floating Portal Switcher Button Styles
const switcherStyles = {
  floatingBtnCitizen: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    border: '1px solid #334155',
    borderRadius: '50px',
    padding: '12px 20px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    zIndex: 9999,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease'
  },
  floatingBtnAdmin: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    border: '1px solid #E2E8F0',
    borderRadius: '50px',
    padding: '12px 20px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    zIndex: 9999,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.2s ease'
  },
  floatingBtnNgo: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    backgroundColor: '#ea580c',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 20px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    zIndex: 9999,
    boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.3), 0 8px 10px -6px rgba(234, 88, 12, 0.3)',
    transition: 'all 0.2s ease'
  }
};
