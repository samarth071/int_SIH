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
import { AlertCircle, X, ShieldAlert, User } from 'lucide-react';

export default function App() {
  // Portal selection state ('citizen' or 'admin')
  const [currentPortal, setCurrentPortal] = useState('citizen');

  // Citizen routing state
  const [citizenPage, setCitizenPage] = useState('home');

  // Admin routing state
  const [adminTab, setAdminTab] = useState('dashboard');
  const [showSOSModal, setShowSOSModal] = useState(false);

  // Admin Card 10: Emergency Priority Queue data state
  const [mockQueue, setMockQueue] = useState([
    { priority: 'Critical', incident: 'Flood Rescue', location: 'Mysuru East', affected: 18, time: '4 min ago', status: 'Waiting', team: '—' },
    { priority: 'Critical', incident: 'Building Collapse', location: 'Zone B', affected: 9, time: '7 min ago', status: 'Responding', team: 'Rescue Team 04' },
    { priority: 'High', incident: 'Medical Emergency', location: 'Zone C', affected: 4, time: '11 min ago', status: 'Waiting', team: '—' }
  ]);

  // Admin SOS Form state
  const [formIncident, setFormIncident] = useState('Flood Rescue');
  const [formLocation, setFormLocation] = useState('');
  const [formPeople, setFormPeople] = useState('1');
  const [formPriority, setFormPriority] = useState('High');

  // Dynamic Theme/Body class switcher
  useEffect(() => {
    document.body.className = currentPortal === 'citizen' ? 'citizen-portal-theme' : 'admin-portal-theme';
  }, [currentPortal]);

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
    <div className={currentPortal === 'citizen' ? 'citizen-portal-theme' : 'admin-portal-theme'} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {currentPortal === 'citizen' ? (
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
      ) : (
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

          {/* Floating Switch to Citizen Button */}
          <button 
            onClick={() => setCurrentPortal('citizen')}
            style={switcherStyles.floatingBtnAdmin}
            title="Switch to Citizen Portal"
          >
            <User size={18} />
            <span>Citizen Portal</span>
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
  }
};
