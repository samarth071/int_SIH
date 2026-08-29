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

// Admin Navigation & Layout imports
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import { AlertCircle, X, ShieldAlert, User, Users } from 'lucide-react';

// Admin Dedicated Module Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminIncidents from './pages/admin/AdminIncidents.jsx';
import AdminIncidentDetails from './pages/admin/AdminIncidentDetails.jsx';
import AdminDisasterMap from './pages/admin/AdminDisasterMap.jsx';
import AdminResponseTeams from './pages/admin/AdminResponseTeams.jsx';
import AdminVolunteersOrgs from './pages/admin/AdminVolunteersOrgs.jsx';
import AdminSheltersRelief from './pages/admin/AdminSheltersRelief.jsx';
import AdminEarlyWarnings from './pages/admin/AdminEarlyWarnings.jsx';
import AdminNotifications from './pages/admin/AdminNotifications.jsx';

// Admin Mock Data Store
import { 
  initialIncidents, 
  initialResponseTeams, 
  initialVolunteers, 
  initialNGOs, 
  initialShelters, 
  initialReliefSupplies, 
  initialEarlyWarnings, 
  initialRecentActivities, 
  initialNotifications 
} from './data/adminMockData.js';

// NGO Portal component import
import NgoPortal from './pages/NgoPortal.jsx';

export default function App() {
  // Portal selection state ('citizen', 'admin', or 'ngo')
  const [currentPortal, setCurrentPortal] = useState('citizen');

  // Citizen routing state
  const [citizenPage, setCitizenPage] = useState('home');

  // Admin routing state
  const [adminTab, setAdminTab] = useState('dashboard');
  const [selectedIncident, setSelectedIncident] = useState(initialIncidents[0]);
  const [showSOSModal, setShowSOSModal] = useState(false);

  // Admin Reactive Shared State Store
  const [incidents, setIncidents] = useState(initialIncidents);
  const [responseTeams, setResponseTeams] = useState(initialResponseTeams);
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [ngos, setNgos] = useState(initialNGOs);
  const [shelters, setShelters] = useState(initialShelters);
  const [supplies, setSupplies] = useState(initialReliefSupplies);
  const [earlyWarnings, setEarlyWarnings] = useState(initialEarlyWarnings);
  const [recentActivities, setRecentActivities] = useState(initialRecentActivities);
  const [notifications, setNotifications] = useState(initialNotifications);

  // NGO Theme state ('light' or 'dark')
  const [ngoTheme, setNgoTheme] = useState('light');

  // Admin SOS Broadcast Form state
  const [formIncident, setFormIncident] = useState('Flood Rescue');
  const [formLocation, setFormLocation] = useState('');
  const [formPeople, setFormPeople] = useState('1');
  const [formPriority, setFormPriority] = useState('Critical');

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

  // Scroll to top whenever page changes
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

  // =========================================================================
  // ADMIN INTERACTIVE HANDLERS (Shared State Synchronizers)
  // =========================================================================

  // Assign or Reassign a Response Team
  const handleAssignTeamToIncident = (incidentId, teamId) => {
    const team = responseTeams.find(t => t.id === teamId);
    const incident = incidents.find(i => i.id === incidentId);
    if (!team || !incident) return;

    // 1. Update team status and assignment
    setResponseTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          status: 'En Route',
          currentAssignment: `${incident.id} (${incident.type})`,
          lastUpdate: 'Just now'
        };
      }
      return t;
    }));

    // 2. Update incident assigned team
    setIncidents(prev => prev.map(i => {
      if (i.id === incidentId) {
        const updated = {
          ...i,
          assignedTeam: team.name,
          assignedTeamId: team.id,
          status: 'Responding'
        };
        if (selectedIncident?.id === incidentId) {
          setSelectedIncident(updated);
        }
        return updated;
      }
      return i;
    }));

    // 3. Add to activity stream
    const newAct = {
      id: `ACT-${Date.now()}`,
      time: 'Just now',
      type: 'team',
      title: 'Response Team Assigned',
      desc: `${team.name} assigned to ${incident.type} at ${incident.location}.`,
      badge: 'Team Dispatched',
      color: '#3b82f6'
    };
    setRecentActivities(prev => [newAct, ...prev]);

    // 4. Add to notifications
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      category: 'team',
      title: 'Deployment Order Dispatched',
      message: `${team.name} mobilized to ${incident.id} (${incident.location}).`,
      timestamp: 'Just now',
      read: false,
      severity: 'info',
      targetType: 'incident',
      targetId: incident.id
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Update Team Status
  const handleUpdateTeamStatus = (teamId, newStatus) => {
    const team = responseTeams.find(t => t.id === teamId);
    if (!team) return;

    setResponseTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        return { ...t, status: newStatus, lastUpdate: 'Just now' };
      }
      return t;
    }));

    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      category: 'team',
      title: `${team.name} Status Changed`,
      message: `Status updated to "${newStatus}" for location ${team.location}.`,
      timestamp: 'Just now',
      read: false,
      severity: newStatus === 'On Site' ? 'success' : 'info',
      targetType: 'team',
      targetId: teamId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Update Supply Dispatch Status
  const handleUpdateSupplyStatus = (supplyId, newStatus, targetDestination) => {
    const supply = supplies.find(s => s.id === supplyId);
    if (!supply) return;

    setSupplies(prev => prev.map(s => {
      if (s.id === supplyId) {
        return {
          ...s,
          status: newStatus,
          lastDispatchedTo: targetDestination || s.lastDispatchedTo
        };
      }
      return s;
    }));

    const newAct = {
      id: `ACT-${Date.now()}`,
      time: 'Just now',
      type: 'ngo',
      title: 'Relief Logistics Update',
      desc: `${supply.name} status changed to ${newStatus} for ${targetDestination || supply.lastDispatchedTo}.`,
      badge: 'Supply Updated',
      color: '#10b981'
    };
    setRecentActivities(prev => [newAct, ...prev]);

    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      category: 'ngo',
      title: `Relief Shipment: ${newStatus}`,
      message: `${supply.name} (${supply.quantity.toLocaleString()} ${supply.unit}) en route to ${targetDestination || supply.lastDispatchedTo}.`,
      timestamp: 'Just now',
      read: false,
      severity: 'success',
      targetType: 'shelter',
      targetId: 'SHELTER-001'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Broadcast Early Warning Alert
  const handleBroadcastAlert = (newAlert) => {
    setEarlyWarnings(prev => [newAlert, ...prev]);

    const newAct = {
      id: `ACT-${Date.now()}`,
      time: 'Just now',
      type: 'alert',
      title: 'Emergency Warning Broadcasted',
      desc: `${newAlert.title} pushed to ${newAlert.estimatedTargetCitizens.toLocaleString()} citizens in ${newAlert.zone}.`,
      badge: 'Warning Transmitted',
      color: '#ef4444'
    };
    setRecentActivities(prev => [newAct, ...prev]);

    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      category: 'alert',
      title: `Active Warning: ${newAlert.title}`,
      message: `Emergency broadcast initiated across ${newAlert.channels.length} channels for zone ${newAlert.zone}.`,
      timestamp: 'Just now',
      read: false,
      severity: newAlert.severity === 'red' ? 'critical' : 'warning',
      targetType: 'alert',
      targetId: newAlert.id
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Notification mark as read
  const handleMarkAsRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Broadcast SOS report submission from Topbar modal
  const handleSOSSubmit = (e) => {
    e.preventDefault();
    if (!formLocation.trim()) return;

    const newId = `INC-2026-0${Math.floor(Math.random() * 80) + 900}`;
    const newIncidentObj = {
      id: newId,
      type: formIncident,
      category: formIncident.toLowerCase().includes('flood') ? 'flood' : formIncident.toLowerCase().includes('collapse') ? 'earthquake' : 'fire',
      location: formLocation,
      coordinates: { x: 300, y: 200, lat: 21.1750, lng: 72.8250 },
      severity: formPriority === 'Critical' ? 'critical' : 'high',
      severityLabel: formPriority,
      timeReported: 'Just now',
      reportedAt: new Date().toISOString(),
      description: `Immediate SOS distress report logged by command officer. Category: ${formIncident}. People affected: ${formPeople}. Location: ${formLocation}.`,
      sosRequestsCount: 1,
      affectedCitizensCount: parseInt(formPeople) || 1,
      status: 'Reported',
      assignedTeam: 'Unassigned (Awaiting Unit)',
      assignedTeamId: null,
      zone: 'Zone A - West Basin',
      criticalityScore: formPriority === 'Critical' ? 95 : 75
    };

    setIncidents(prev => [newIncidentObj, ...prev]);

    const newAct = {
      id: `ACT-${Date.now()}`,
      time: 'Just now',
      type: 'sos',
      title: 'New Emergency SOS Filed',
      desc: `${formIncident} reported at ${formLocation} (${formPeople} citizen(s) affected).`,
      badge: 'SOS Broadcast',
      color: '#ef4444'
    };
    setRecentActivities(prev => [newAct, ...prev]);

    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      category: 'sos',
      title: `Emergency Distress SOS: ${formIncident}`,
      message: `${formLocation} — ${formPeople} affected. Immediate responder dispatch required.`,
      timestamp: 'Just now',
      read: false,
      severity: 'critical',
      targetType: 'incident',
      targetId: newId
    };
    setNotifications(prev => [newNotif, ...prev]);

    setShowSOSModal(false);
    setFormLocation('');
    setSelectedIncident(newIncidentObj);
    setAdminTab('incident-details');
  };

  // Render Admin View Switcher
  const renderAdminPage = () => {
    switch (adminTab) {
      case 'dashboard':
        return (
          <AdminDashboard 
            incidents={incidents}
            responseTeams={responseTeams}
            activities={recentActivities}
            onNavigate={(tab) => setAdminTab(tab)}
            onSelectIncident={(inc) => {
              setSelectedIncident(inc);
              setAdminTab('incident-details');
            }}
          />
        );

      case 'incidents':
        return (
          <AdminIncidents 
            incidents={incidents}
            onSelectIncident={(inc) => {
              setSelectedIncident(inc);
              setAdminTab('incident-details');
            }}
            onNavigate={(tab) => setAdminTab(tab)}
          />
        );

      case 'incident-details':
        return (
          <AdminIncidentDetails 
            incident={selectedIncident || incidents[0]}
            allTeams={responseTeams}
            onBack={() => setAdminTab('incidents')}
            onNavigate={(tab) => setAdminTab(tab)}
            onAssignTeamToIncident={handleAssignTeamToIncident}
          />
        );

      case 'map':
        return (
          <AdminDisasterMap 
            incidents={incidents}
            responseTeams={responseTeams}
            shelters={shelters}
            onSelectIncident={(inc) => {
              setSelectedIncident(inc);
              setAdminTab('incident-details');
            }}
            onNavigate={(tab) => setAdminTab(tab)}
          />
        );

      case 'teams':
        return (
          <AdminResponseTeams 
            teams={responseTeams}
            incidents={incidents}
            onUpdateTeamStatus={handleUpdateTeamStatus}
            onAssignTeamToIncident={handleAssignTeamToIncident}
            onNavigate={(tab) => setAdminTab(tab)}
          />
        );

      case 'volunteers-orgs':
        return (
          <AdminVolunteersOrgs 
            volunteers={volunteers}
            ngos={ngos}
            onNavigate={(tab) => setAdminTab(tab)}
          />
        );

      case 'shelters-relief':
        return (
          <AdminSheltersRelief 
            shelters={shelters}
            supplies={supplies}
            onUpdateSupplyStatus={handleUpdateSupplyStatus}
            onNavigate={(tab) => setAdminTab(tab)}
          />
        );

      case 'alerts':
        return (
          <AdminEarlyWarnings 
            alerts={earlyWarnings}
            onBroadcastAlert={handleBroadcastAlert}
            onNavigate={(tab) => setAdminTab(tab)}
          />
        );

      case 'notifications':
        return (
          <AdminNotifications 
            notifications={notifications}
            incidents={incidents}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onNavigate={(tab) => setAdminTab(tab)}
            onSelectIncident={(inc) => {
              setSelectedIncident(inc);
              setAdminTab('incident-details');
            }}
          />
        );

      default:
        return (
          <AdminDashboard 
            incidents={incidents}
            responseTeams={responseTeams}
            activities={recentActivities}
            onNavigate={(tab) => setAdminTab(tab)}
            onSelectIncident={(inc) => {
              setSelectedIncident(inc);
              setAdminTab('incident-details');
            }}
          />
        );
    }
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;
  const criticalIncidentsCount = incidents.filter(i => i.severity === 'critical').length;

  return (
    <div 
      className={currentPortal === 'citizen' ? 'citizen-portal-theme' : currentPortal === 'admin' ? 'admin-portal-theme' : 'ngo-portal-theme'} 
      data-theme={currentPortal === 'ngo' ? ngoTheme : undefined}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      
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
           ADMIN PORTAL LAYOUT (Disaster Command Centre)
           ========================================================== */
        <div style={adminStyles.app}>
          {/* Sidebar navigation with 8 modules */}
          <Sidebar 
            activeTab={adminTab} 
            setActiveTab={setAdminTab} 
            unreadNotifsCount={unreadNotifsCount}
            criticalIncidentsCount={criticalIncidentsCount}
          />

          {/* Main workspace */}
          <div style={adminStyles.main}>
            <Topbar 
              activeTab={adminTab} 
              onReportSOS={() => setShowSOSModal(true)} 
              onNavigate={(tab) => setAdminTab(tab)}
              unreadCount={unreadNotifsCount}
            />
            
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
                      <option value="Power Grid Failure">Power Grid Failure</option>
                      <option value="Landslide Blockade">Landslide Blockade</option>
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

// Styles specific to the Admin Portal layout
const adminStyles = {
  app: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#090a10',
    flex: 1
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#090a10'
  },
  content: {
    flexGrow: 1,
    padding: '28px 32px',
    overflowY: 'auto',
    backgroundColor: '#090a10'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  modalContent: {
    width: '420px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: '#12141e'
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
    fontSize: '15px',
    fontWeight: '700',
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
    height: '38px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontSize: '12px',
    padding: '0 12px',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  select: {
    height: '38px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
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
    height: '40px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
  }
};

// Floating Switcher Buttons
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
