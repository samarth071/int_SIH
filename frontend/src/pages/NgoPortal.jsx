import { useState, useEffect } from 'react';
import './NgoPortal.css';

const LayoutDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const ClipboardList = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>;
const Package = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const Users = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Activity = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>;

const MapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" fill="#fff" stroke="none" />
  </svg>
);

const ArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const Map = () => <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.1, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>;

const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;

const PanelLeftClose = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>;
const PanelLeftOpen = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>;

const mockNeedsData = [];

export default function NgoPortal({ theme, setTheme }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [needs, setNeeds] = useState(mockNeedsData);

  useEffect(() => {
    function handleNewSos(e) {
      const sos = e.detail;
      if (!sos) return;

      const newNeed = {
        id: Date.now(),
        location: sos.location || 'Surat, Gujarat',
        requirement: `EMERGENCY SOS: ${sos.disasterType.toUpperCase()}`,
        qty: 'Immediate Rescue',
        people: 1,
        priority: 'Critical',
        status: 'Pending',
        top: `${Math.floor(Math.random() * 50) + 20}%`,
        left: `${Math.floor(Math.random() * 50) + 25}%`,
      };

      setNeeds((prev) => [newNeed, ...prev]);
    }

    window.addEventListener('sosAlertCreated', handleNewSos);
    return () => window.removeEventListener('sosAlertCreated', handleNewSos);
  }, []);
  const [operations, setOperations] = useState([]);

  // --- RESOURCES STATE ---
  const [resources, setResources] = useState([]);

  const [matchingNeeds, setMatchingNeeds] = useState([]);

  // --- TEAM STATE ---
  const [teamMembers, setTeamMembers] = useState([
    { id: 101, name: 'Alex Johnson', skill: 'Medical Rescue', location: 'City Center', availability: 'Available', currentOperation: '' },
    { id: 102, name: 'Sarah Lee', skill: 'Logistics', location: 'North District', availability: 'Busy', currentOperation: 'Food Distribution - Village A' },
    { id: 103, name: 'Mike Chen', skill: 'Communications', location: 'East Sector', availability: 'Unavailable', currentOperation: '' },
    { id: 104, name: 'Emily Davis', skill: 'First Aid', location: 'South District', availability: 'Available', currentOperation: '' },
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    { id: 201, name: 'David Smith', skill: 'Search & Rescue', location: 'West End' },
    { id: 202, name: 'Maria Garcia', skill: 'Driver', location: 'Central Hub' }
  ]);

  // --- Team Logic ---
  const handleApproveRequest = (req) => {
    setTeamMembers([...teamMembers, { ...req, availability: 'Available', currentOperation: '' }]);
    setPendingRequests(pendingRequests.filter(p => p.id !== req.id));
  };

  const handleRejectRequest = (id) => {
    setPendingRequests(pendingRequests.filter(p => p.id !== id));
  };

  const handleAssignMember = (id) => {
    const operationId = window.prompt("Assign to Operation ID (e.g. OP-101):");
    if (!operationId) return;
    
    // Check if operation exists
    const opIndex = operations.findIndex(o => o.id === operationId.trim());
    if (opIndex === -1) return alert("Operation not found.");

    // Update Team Member
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, availability: 'Busy', currentOperation: operationId.trim() } : m));
    
    // Update Operation
    const op = operations[opIndex];
    if (!op.assignedTeam.includes(id)) {
      setOperations(operations.map(o => o.id === operationId.trim() ? { ...o, assignedTeam: [...o.assignedTeam, id] } : o));
    }
  };

  // --- Needs View Logic ---
  const handleOfferAssistanceList = () => {
    if (!selectedNeed) return;
    const newOpId = 'OP-' + Date.now().toString().slice(-4);
    
    // Create new operation
    setOperations([...operations, {
      id: newOpId,
      activity: selectedNeed.requirement,
      location: selectedNeed.location,
      resourcesRequired: [{ name: 'Resource', requested: parseInt(selectedNeed.qty) || 0, allocated: 0, unit: selectedNeed.qty.replace(/[0-9,\s]/g, '') }],
      assignedTeam: [],
      progress: 0,
      notes: 'Created from Need',
      status: 'New'
    }]);

    // Update Need Status
    setNeeds(needs.map(n => n.id === selectedNeed.id ? { ...n, status: 'Operation Prepared' } : n));
    alert(`Assistance confirmed! Created Operation ${newOpId}.`);
    setSelectedNeed(null);
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'Critical': return 'critical';
      case 'High': return 'high';
      case 'Medium': return 'warning';
      case 'Under Control': return 'success';
      default: return 'info';
    }
  };

  // --- Resources View Logic ---
  const handleAddResource = () => {
    const name = window.prompt("Resource Name (e.g. Tents):");
    if (!name) return;
    const total = parseInt(window.prompt("Total Quantity:") || "0", 10);
    const unit = window.prompt("Unit (e.g. tents):");
    if (isNaN(total)) return alert("Invalid number.");
    setResources([...resources, { id: Date.now(), name, total, unit, available: total, allocated: 0 }]);
  };

  const handleUpdateQuantity = (resId) => {
    const qty = parseInt(window.prompt("New Total Quantity:") || "0", 10);
    if (isNaN(qty) || qty <= 0) return;
    setResources(resources.map(r => {
      if (r.id === resId) {
        // Assume updated qty just readjusts available vs allocated logic.
        // If qty is less than allocated, we force available to 0 and allocated to qty.
        return { 
          ...r, 
          total: qty, 
          available: Math.max(0, qty - r.allocated), 
          allocated: Math.min(qty, r.allocated)
        };
      }
      return r;
    }));
  };

  const handleAllocate = (resId) => {
    const opId = window.prompt("Allocate to Operation ID (e.g. OP-101):");
    if (!opId) return;
    
    const opIndex = operations.findIndex(o => o.id === opId.trim());
    if (opIndex === -1) return alert("Operation not found.");

    const qty = parseInt(window.prompt("Quantity to Allocate:") || "0", 10);
    if (isNaN(qty) || qty <= 0) return;

    setResources(resources.map(r => {
      if (r.id === resId) {
        if (qty > r.available) {
          alert('Not enough available resources!');
          return r;
        }
        return { ...r, available: r.available - qty, allocated: r.allocated + qty };
      }
      return r;
    }));

    // Update Operation Resources
    const res = resources.find(r => r.id === resId);
    setOperations(operations.map(o => {
      if (o.id === opId.trim()) {
        const existingRes = o.resourcesRequired.find(req => req.name === res.name);
        if (existingRes) {
          return {
            ...o, 
            resourcesRequired: o.resourcesRequired.map(req => req.name === res.name ? { ...req, allocated: req.allocated + qty } : req)
          };
        } else {
          return {
            ...o,
            resourcesRequired: [...o.resourcesRequired, { name: res.name, requested: qty, allocated: qty, unit: res.unit }]
          };
        }
      }
      return o;
    }));
    alert("Resource allocated to " + opId.trim());
  };

  const handleMatchAssistance = (need) => {
    const resourceIndex = resources.findIndex(r => r.name.toLowerCase() === need.resourceName.toLowerCase());
    if (resourceIndex === -1) {
      return alert("Our NGO doesn't currently track this resource in inventory.");
    }
    const res = resources[resourceIndex];
    if (res.available <= 0) {
      return alert("No resources available to allocate.");
    }

    const allocateQty = Math.min(res.available, need.requestedQty);
    if (res.available < need.requestedQty) {
      if (!window.confirm(`We only have ${res.available} available. Allocate partial assistance?`)) {
        return;
      }
    }

    // Deduct from Resources state
    setResources(resources.map((r, i) => i === resourceIndex ? { ...r, available: r.available - allocateQty, allocated: r.allocated + allocateQty } : r));
    // Set need operation status
    setMatchingNeeds(matchingNeeds.map(n => n.id === need.id ? { ...n, status: 'Operation Prepared' } : n));
    alert(`Operation Prepared! Allocated ${allocateQty} ${res.unit}.`);
  };

  // --- Operations Logic ---
  const handleAcceptOp = (opId) => {
    setOperations(operations.map(o => o.id === opId ? { ...o, status: 'Accepted' } : o));
  };

  const handleStartOp = (opId) => {
    setOperations(operations.map(o => o.id === opId ? { ...o, status: 'In Progress' } : o));
  };

  const handleCompleteOp = (opId) => {
    const op = operations.find(o => o.id === opId);
    if (!op) return;

    // Set operation as completed
    setOperations(operations.map(o => o.id === opId ? { ...o, status: 'Completed', progress: 100 } : o));
    
    // Free team members
    setTeamMembers(teamMembers.map(m => op.assignedTeam.includes(m.id) ? { ...m, availability: 'Available', currentOperation: '' } : m));

    // Return allocated resources
    let updatedResources = [...resources];
    op.resourcesRequired.forEach(req => {
      const rIndex = updatedResources.findIndex(r => r.name === req.name);
      if (rIndex !== -1) {
        updatedResources[rIndex] = {
          ...updatedResources[rIndex],
          available: updatedResources[rIndex].available + req.allocated,
          allocated: updatedResources[rIndex].allocated - req.allocated
        };
      }
    });
    setResources(updatedResources);
  };

  const handleUpdateProgress = (opId) => {
    const p = parseInt(window.prompt("Enter new progress % (0-100):") || "0", 10);
    if (isNaN(p)) return;
    const notes = window.prompt("Enter notes (optional):");
    setOperations(operations.map(o => o.id === opId ? { ...o, progress: Math.min(100, Math.max(0, p)), notes: notes || o.notes } : o));
  };

  const stats = {
    criticalNeeds: needs.filter(n => n.priority === 'Critical' && n.status !== 'Operation Prepared').length,
    activeOperations: operations.filter(o => o.status === 'In Progress').length,
    availableTeam: teamMembers.filter(m => m.availability === 'Available').length,
    lowResources: resources.filter(r => r.available < r.total * 0.2).length,
  };

  return (
    <div className="app-container">
      <button 
        className="theme-toggle-btn"
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        aria-label="Toggle Theme"
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2 className="nav-label">Disaster Relief</h2>
          <span className="nav-label">NGO Portal</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('dashboard'); }}>
            <LayoutDashboard />
            <span className="nav-label">Dashboard</span>
          </a>
          <a href="#" className={`nav-item ${currentView === 'needs' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('needs'); }}>
            <ClipboardList />
            <span className="nav-label">Needs</span>
          </a>
          <a href="#" className={`nav-item ${currentView === 'resources' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('resources'); }}>
            <Package />
            <span className="nav-label">Resources</span>
          </a>
          <a href="#" className={`nav-item ${currentView === 'team' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('team'); }}>
            <Users />
            <span className="nav-label">Team</span>
          </a>
          <a href="#" className={`nav-item ${currentView === 'operations' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentView('operations'); }}>
            <Activity />
            <span className="nav-label">Operations</span>
          </a>
        </nav>
        <div style={{ marginTop: 'auto', padding: '16px 12px', borderTop: '1px solid var(--border-color)' }}>
          <button 
            className="nav-item btn-text w-full" 
            style={{ display: 'flex', justifyContent: 'flex-start', color: 'var(--text-muted)' }}
            onClick={() => setIsSidebarCollapsed(c => !c)}
          >
            {isSidebarCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            <span className="nav-label">{isSidebarCollapsed ? '' : 'Collapse'}</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        {currentView === 'dashboard' && (
          <>
            <header className="main-header">
              <h1>NGO Dashboard</h1>
              <p className="subtitle">Overview of critical relief operations and resources.</p>
            </header>

            <section className="stats-grid">
              <div className="stat-card stat-critical">
                <h3>Critical Needs</h3>
                <div className="stat-value">{stats.criticalNeeds}</div>
              </div>
              <div className="stat-card stat-active">
                <h3>Active Operations</h3>
                <div className="stat-value">{stats.activeOperations}</div>
              </div>
              <div className="stat-card stat-team">
                <h3>Available Team Members</h3>
                <div className="stat-value">{stats.availableTeam}</div>
              </div>
              <div className="stat-card stat-warning">
                <h3>Low Resources</h3>
                <div className="stat-value">{stats.lowResources}</div>
              </div>
            </section>

            <div className="dashboard-content">
              <section className="data-section">
                <div className="section-header">
                  <h2>URGENT NEEDS</h2>
                </div>
                <div className="data-list">
                  {needs.filter(n => n.priority === 'Critical' && n.status !== 'Operation Prepared').slice(0,3).map(need => (
                    <div key={need.id} className="list-item">
                      <div className="item-info">
                        <strong>{need.requirement.split(' ')[0]}</strong>
                        <span className="separator">ΓÇö</span>
                        <span>{need.location}</span>
                      </div>
                      <div className="item-meta">
                        <span className="qty">{need.qty}</span>
                        <span className="badge badge-critical">Critical</span>
                      </div>
                    </div>
                  ))}
                  {needs.filter(n => n.priority === 'Critical' && n.status !== 'Operation Prepared').length === 0 && (
                    <p className="text-muted text-sm" style={{padding: '16px'}}>No active critical needs.</p>
                  )}
                </div>
              </section>

              <section className="data-section">
                <div className="section-header">
                  <h2>ACTIVE OPERATIONS</h2>
                </div>
                <div className="data-list">
                  {operations.filter(o => o.status === 'In Progress').map(op => (
                    <div key={op.id} className="list-item">
                      <div className="item-info">
                        <strong>{op.activity}</strong>
                        <span className="separator">ΓÇö</span>
                        <span>{op.location}</span>
                      </div>
                      <div className="item-meta">
                        <span className="qty">{op.assignedTeam.length} member(s)</span>
                        <span className="badge badge-progress">In Progress</span>
                      </div>
                    </div>
                  ))}
                  {operations.filter(o => o.status === 'In Progress').length === 0 && (
                    <p className="text-muted text-sm" style={{padding: '16px'}}>No active operations.</p>
                  )}
                </div>
              </section>
            </div>
          </>
        )}

        {currentView === 'needs' && (
          <div className="needs-view">
            <header className="main-header">
              <h1>Relief Needs Map</h1>
              <p className="subtitle">Interactive view of critical requirements and disaster zones.</p>
            </header>
            
            <div className="needs-split-layout">
              <div className="map-container">
                <Map />
                {needs.map((need) => (
                  <button 
                    key={need.id}
                    className={`map-pin text-${getPriorityClass(need.priority)} ${selectedNeed?.id === need.id ? 'pin-selected' : ''}`}
                    style={{ top: need.top, left: need.left }}
                    onClick={() => setSelectedNeed(need)}
                    aria-label={`Select need at ${need.location}`}
                  >
                    <MapPin />
                  </button>
                ))}
              </div>
              
              <div className="needs-sidebar-panel">
                {selectedNeed ? (
                  <div className="need-detail-card">
                    <button className="btn-back" onClick={() => setSelectedNeed(null)}>
                      <ArrowLeft /> Back to List
                    </button>
                    
                    <h3 className="detail-location">{selectedNeed.location}</h3>
                    
                    <div className="detail-row">
                      <span className="detail-label">Requirement:</span>
                      <span className="detail-value font-bold">{selectedNeed.requirement}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Quantity:</span>
                      <span className="detail-value">{selectedNeed.qty}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">People Affected:</span>
                      <span className="detail-value">{selectedNeed.people}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Priority:</span>
                      <span className={`badge badge-${getPriorityClass(selectedNeed.priority)}`}>
                        {selectedNeed.priority}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value font-medium">{selectedNeed.status}</span>
                    </div>

                    <div className="detail-actions">
                      <button className="btn-primary" onClick={handleOfferAssistanceList}>
                        Offer Assistance
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="needs-list-card">
                    <h3 className="list-title">All Relief Requests</h3>
                    <div className="compact-data-list">
                      {needs.map(need => (
                        <div 
                           key={need.id} 
                           className="compact-list-item"
                           onClick={() => setSelectedNeed(need)}
                        >
                          <div className="compact-item-main">
                            <strong className="block">{need.location}</strong>
                            <span className="text-sm text-muted">{need.requirement} ΓÇó {need.qty}</span>  
                          </div>
                          <div className="compact-item-meta">
                            <span className={`badge badge-${getPriorityClass(need.priority)}`}>
                              {need.priority}
                            </span>
                            <span className="text-sm text-muted mt-1">{need.people} affected</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'resources' && (
          <div className="resources-view">
            <header className="main-header header-with-action">
              <div>
                <h1>Resource Inventory</h1>
                <p className="subtitle">Manage current stockpile and pledge assistance.</p>
              </div>
              <button className="btn-primary btn-sm" onClick={handleAddResource}>
                + Add Resource
              </button>
            </header>

            <div className="needs-split-layout">
              {/* Inventory List */}
              <div className="resources-container">
                <div className="resources-list card-container">
                  {resources.map(res => (
                    <div key={res.id} className="resource-card">
                      <div className="resource-header">
                        <h3>{res.name}</h3>
                        <div className="resource-actions">
                          <button onClick={() => handleUpdateQuantity(res.id)} className="btn-text">Update</button>
                          <button onClick={() => handleAllocate(res.id)} className="btn-text text-primary">Allocate</button>
                        </div>
                      </div>
                      <div className="resource-stats">
                        <div className="r-stat">
                          <span className="r-label">Total</span>
                          <span className="r-val">{res.total.toLocaleString()} <small>{res.unit}</small></span>
                        </div>
                        <div className="r-stat stat-success">
                          <span className="r-label">Available</span>
                          <span className="r-val">{res.available.toLocaleString()} <small>{res.unit}</small></span>
                        </div>
                        <div className="r-stat stat-info">
                          <span className="r-label">Allocated</span>
                          <span className="r-val">{res.allocated.toLocaleString()} <small>{res.unit}</small></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matching Needs Sidebar */}
              <div className="needs-sidebar-panel">
                <div className="needs-list-card">
                  <h3 className="list-title">MATCHING NEEDS</h3>
                  <div className="compact-data-list">
                    {matchingNeeds.map(need => {
                      const matchedRes = resources.find(r => r.name.toLowerCase() === need.resourceName.toLowerCase());
                      const hasSufficient = matchedRes && matchedRes.available >= need.requestedQty;
                      const hasPartial = matchedRes && matchedRes.available > 0 && matchedRes.available < need.requestedQty;
                      const isPrepared = need.status === 'Operation Prepared';

                      return (
                        <div key={need.id} className="compact-list-item match-item">
                           <div className="match-info">
                             <strong>{need.location} needs:</strong>
                             <div className="need-requested">{need.requestedQty.toLocaleString()} {need.unit} of {need.resourceName}</div>
                           </div>
                           
                           <div className="match-stock">
                             <span className="text-sm">Our NGO has:</span>
                             <div className={`stock-status ${hasSufficient ? 'text-success' : hasPartial ? 'text-warning' : 'text-critical'}`}>
                               {matchedRes ? matchedRes.available.toLocaleString() : 0} {need.unit} available
                             </div>
                           </div>

                           {!isPrepared ? (
                             <button className="btn-primary mt-2 w-full" onClick={() => handleMatchAssistance(need)}>
                               Offer Assistance
                             </button>
                           ) : (
                             <button className="btn-primary mt-2 w-full" disabled style={{opacity: 0.5, cursor:'default'}}>
                               Operation Prepared
                             </button>
                           )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {currentView === 'team' && (
          <div className="resources-view">
            <header className="main-header">
              <h1>Team Management</h1>
              <p className="subtitle">Manage pending volunteers and deploy available members.</p>
            </header>

            <div className="needs-split-layout">
              {/* Main Panel: Team Members */}
              <div className="resources-container">
                <div className="resources-list card-container">
                  {teamMembers.map(member => (
                    <div key={member.id} className="resource-card">
                      <div className="resource-header" style={{ marginBottom: '12px' }}>
                        <h3>{member.name}</h3>
                        <div className="resource-actions">
                          {member.availability === 'Available' && (
                            <button onClick={() => handleAssignMember(member.id)} className="btn-text text-primary">Assign</button>
                          )}
                        </div>
                      </div>
                      <div className="detail-row" style={{ padding: '4px 0' }}>
                        <span className="detail-label">Skill:</span>
                        <span className="detail-value">{member.skill}</span>
                      </div>
                      <div className="detail-row" style={{ padding: '4px 0' }}>
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">{member.location}</span>
                      </div>
                      <div className="detail-row" style={{ padding: '4px 0', borderBottom: 'none' }}>
                        <span className="detail-label">Status:</span>
                        <span className={`badge ${member.availability === 'Available' ? 'badge-success' : member.availability === 'Busy' ? 'badge-warning' : 'badge-critical'}`}>
                          {member.availability}
                        </span>
                      </div>
                      {member.availability === 'Busy' && member.currentOperation && (
                        <div className="detail-row" style={{ padding: '4px 0', borderBottom: 'none' }}>
                          <span className="detail-label">Operation:</span>
                          <span className="detail-value" style={{ fontSize: '0.9rem' }}>{member.currentOperation}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Panel: Pending Requests */}
              <div className="needs-sidebar-panel">
                <div className="needs-list-card">
                  <h3 className="list-title">Pending Requests</h3>
                  <div className="compact-data-list">
                    {pendingRequests.length === 0 ? (
                      <p className="text-muted text-sm">No pending requests.</p>
                    ) : (
                      pendingRequests.map(req => (
                        <div key={req.id} className="compact-list-item match-item">
                           <div className="match-info">
                             <strong>{req.name}</strong>
                             <div className="text-sm mt-1">{req.skill} ΓÇó {req.location}</div>
                           </div>
                           <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '12px' }}>
                             <button className="btn-primary btn-sm flex-1" style={{ flex: 1, backgroundColor: 'var(--success)' }} onClick={() => handleApproveRequest(req)}>Approve</button>
                             <button className="btn-primary btn-sm flex-1" style={{ flex: 1, backgroundColor: 'var(--critical)' }} onClick={() => handleRejectRequest(req.id)}>Reject</button>
                           </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'operations' && (
          <div className="resources-view">
            <header className="main-header" style={{ marginBottom: '24px' }}>
              <h1>Operations Control</h1>
              <p className="subtitle">Track and govern active relief efforts.</p>
            </header>

            <div className="resources-list card-container" style={{ padding: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {operations.map(op => (
                <div key={op.id} className="resource-card" style={{ gap: '8px' }}>
                  <div className="resource-header" style={{ marginBottom: '8px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {op.id}
                      <span className={`badge ${op.status === 'In Progress' ? 'badge-progress' : op.status === 'Completed' ? 'badge-success' : op.status === 'Accepted' ? 'badge-high' : 'badge-pending'}`}>
                        {op.status}
                      </span>
                    </h3>
                    <div className="resource-actions">
                      {op.status === 'New' && <button className="btn-primary btn-sm" onClick={() => handleAcceptOp(op.id)}>Accept</button>}
                      {op.status === 'Accepted' && <button className="btn-primary btn-sm" style={{ backgroundColor: 'var(--success)' }} onClick={() => handleStartOp(op.id)}>Start</button>}
                      {op.status === 'In Progress' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-text" onClick={() => handleUpdateProgress(op.id)}>Update</button>
                          <button className="btn-primary btn-sm" style={{ backgroundColor: 'var(--success)' }} onClick={() => handleCompleteOp(op.id)}>Complete</button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="detail-row" style={{ padding: '4px 0' }}>
                    <span className="detail-label">Activity:</span>
                    <span className="detail-value font-bold">{op.activity}</span>
                  </div>
                  <div className="detail-row" style={{ padding: '4px 0' }}>
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{op.location}</span>
                  </div>
                  
                  <div className="detail-row" style={{ padding: '4px 0', borderBottom: 'none' }}>
                    <span className="detail-label">Team:</span>
                    <span className="detail-value">{op.assignedTeam.map(id => teamMembers.find(t => t.id === id)?.name).join(', ') || 'None'}</span>
                  </div>
                  <div className="detail-row" style={{ padding: '4px 0', borderBottom: 'none' }}>
                    <span className="detail-label">Resources:</span>
                    <span className="detail-value">
                      {op.resourcesRequired.map(r => `${r.allocated}/${r.requested} ${r.unit} ${r.name}`).join(', ') || 'None'}
                    </span>
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span>Progress</span>
                      <span>{op.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${op.progress}%`, height: '100%', backgroundColor: op.progress === 100 ? 'var(--success)' : 'var(--primary)', transition: 'width 0.3s' }} />
                    </div>
                  </div>
                  
                  {op.notes && (
                    <div className="text-sm text-muted mt-2" style={{ padding: '8px', backgroundColor: 'var(--bg-color)', borderRadius: '4px' }}>
                      {op.notes}
                    </div>
                  )}
                </div>
              ))}
              {operations.length === 0 && (
                <p className="text-muted">No operations to show.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
