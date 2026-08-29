import React from 'react';
import { 
  AlertOctagon, 
  Radio, 
  ShieldCheck, 
  Users, 
  MapPin, 
  ArrowRight, 
  Clock, 
  Compass, 
  AlertTriangle,
  Flame,
  CheckCircle2
} from 'lucide-react';
import './admin.css';

export default function AdminDashboard({ 
  incidents, 
  responseTeams, 
  activities, 
  onNavigate, 
  onSelectIncident 
}) {
  // Compute vital numbers cleanly
  const criticalIncidentsCount = incidents.filter(i => i.severity === 'critical').length;
  const totalSOSRequests = incidents.reduce((acc, curr) => acc + (curr.sosRequestsCount || 0), 0);
  const teamsDeployedCount = responseTeams.filter(t => t.status === 'On Site' || t.status === 'En Route' || t.status === 'Assigned').length;
  const totalAffectedCitizens = incidents.reduce((acc, curr) => acc + (curr.affectedCitizensCount || 0), 0);

  // Top 3 urgent priority incidents
  const priorityIncidents = [...incidents]
    .sort((a, b) => (b.criticalityScore || 0) - (a.criticalityScore || 0))
    .slice(0, 3);

  // Format today's date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="admin-badge badge-red">Critical</span>;
      case 'high':
        return <span className="admin-badge badge-orange">High Attention</span>;
      case 'medium':
        return <span className="admin-badge badge-orange">Moderate</span>;
      case 'low':
      default:
        return <span className="admin-badge badge-green">Monitoring</span>;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#ef4444';
      case 'high':
      case 'medium': return '#f97316';
      case 'low':
      default: return '#22c55e';
    }
  };

  return (
    <div className="admin-view-container">
      {/* 1. Header & Welcome Area */}
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-title-row">
            <h1 className="admin-title">Disaster Command Centre</h1>
            <span className="status-pill">
              <span className="pulse-dot"></span>
              Level 3 Active Incident Mode
            </span>
          </div>
          <p className="admin-subtitle">
            Unified Crisis Monitoring & Tactical Coordination • {todayFormatted}
          </p>
        </div>

        <div className="admin-header-right">
          <button 
            className="admin-btn admin-btn-outline" 
            onClick={() => onNavigate('alerts')}
          >
            <AlertTriangle size={14} color="#f97316" />
            <span>Issue Warning Alert</span>
          </button>
          <button 
            className="admin-btn admin-btn-primary"
            onClick={() => onNavigate('map')}
          >
            <Compass size={14} />
            <span>Open Disaster Map</span>
          </button>
        </div>
      </div>

      {/* 2. Four Essential Summary Statistics */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
            <AlertOctagon size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Active Critical Incidents</span>
            <span className="admin-stat-value">{criticalIncidentsCount}</span>
            <span className="admin-stat-trend" style={{ color: '#ef4444' }}>Immediate response active</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#f97316' }}>
            <Radio size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Active SOS Requests</span>
            <span className="admin-stat-value">{totalSOSRequests}</span>
            <span className="admin-stat-trend">Across all zones via LoRa/Mesh</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>
            <ShieldCheck size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Response Teams Deployed</span>
            <span className="admin-stat-value">{teamsDeployedCount} <span style={{ fontSize: '14px', color: '#71717a' }}>/ {responseTeams.length}</span></span>
            <span className="admin-stat-trend" style={{ color: '#60a5fa' }}>NDRF, SDRF & Medics on duty</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e' }}>
            <Users size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Affected Citizens</span>
            <span className="admin-stat-value">{totalAffectedCitizens}</span>
            <span className="admin-stat-trend">Shelters accommodating 64%</span>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Body: Priority Incidents & Activity/Map */}
      <div className="dashboard-grid-2">
        {/* A. PRIORITY INCIDENTS */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title-group">
              <Flame size={18} color="#ef4444" />
              <div>
                <h2 className="admin-card-title">Priority Incidents</h2>
                <div className="admin-card-subtitle">Most urgent threats requiring leadership attention</div>
              </div>
            </div>
            <button 
              className="admin-btn admin-btn-outline admin-btn-sm"
              onClick={() => onNavigate('incidents')}
            >
              <span>View All ({incidents.length})</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="priority-list">
            {priorityIncidents.map((incident) => (
              <div key={incident.id} className="priority-item">
                <div className="priority-left">
                  <div 
                    className="severity-stripe" 
                    style={{ backgroundColor: getSeverityColor(incident.severity) }}
                  />
                  <div className="priority-details">
                    <div className="priority-title-row">
                      <span className="priority-title">{incident.type}</span>
                      {getSeverityBadge(incident.severity)}
                      <span className="admin-badge badge-gray">{incident.status}</span>
                    </div>

                    <div className="priority-location">
                      <MapPin size={13} />
                      <span>{incident.location}</span>
                    </div>

                    <div className="priority-meta">
                      <span><strong>{incident.sosRequestsCount}</strong> SOS Requests</span>
                      <span>•</span>
                      <span><strong>{incident.affectedCitizensCount}</strong> Affected</span>
                      <span>•</span>
                      <span style={{ color: '#a1a1aa' }}>Team: {incident.assignedTeam}</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="admin-btn admin-btn-primary admin-btn-sm"
                  onClick={() => {
                    onSelectIncident(incident);
                    onNavigate('incident-details');
                  }}
                >
                  <span>View Incident</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: B. Recent Activity & C. Small Map Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* C. SMALL MAP OVERVIEW */}
          <div className="admin-card" style={{ padding: '20px' }}>
            <div className="admin-card-header">
              <div className="admin-card-title-group">
                <Compass size={17} color="#60a5fa" />
                <div>
                  <h3 className="admin-card-title" style={{ fontSize: '14px' }}>Disaster Zone Overview</h3>
                  <div className="admin-card-subtitle">Real-time GPS nodes & active hazard perimeter</div>
                </div>
              </div>
              <button 
                className="admin-btn admin-btn-outline admin-btn-sm"
                onClick={() => onNavigate('map')}
              >
                <span>Full Map</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Compact Map Preview Visualizer */}
            <div className="compact-map-wrap">
              <svg width="100%" height="100%" viewBox="0 0 400 180" style={{ background: '#0a0d14' }}>
                <defs>
                  <pattern id="gridSmall" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
                  </pattern>
                  <radialGradient id="redZoneGlow" cx="35%" cy="40%" r="35%">
                    <stop offset="0%" stopColor="rgba(239, 68, 68, 0.35)" />
                    <stop offset="100%" stopColor="rgba(239, 68, 68, 0.0)" />
                  </radialGradient>
                </defs>
                
                <rect width="100%" height="100%" fill="url(#gridSmall)" />
                
                {/* River contour line */}
                <path 
                  d="M -10,90 Q 90,40 180,95 T 320,80 T 420,110" 
                  fill="none" 
                  stroke="rgba(59, 130, 246, 0.35)" 
                  strokeWidth="8" 
                />

                {/* Flood Risk Buffer */}
                <circle cx="140" cy="85" r="45" fill="url(#redZoneGlow)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Incident Pins */}
                <circle cx="140" cy="85" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <text x="152" y="89" fill="#ffffff" fontSize="9" fontWeight="600">Tapi Flood (18 SOS)</text>

                <circle cx="270" cy="130" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                <text x="282" y="134" fill="#ffffff" fontSize="9" fontWeight="600">Collapse Z-B</text>

                <circle cx="310" cy="50" r="4" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
                <text x="320" y="54" fill="#f97316" fontSize="8">Landslide</text>

                {/* Shelter Node */}
                <circle cx="190" cy="120" r="4" fill="#3b82f6" />
                <text x="200" y="124" fill="#60a5fa" fontSize="8">Shelter #1</text>
              </svg>

              <div className="compact-map-overlay">
                <button 
                  className="admin-btn admin-btn-primary admin-btn-sm"
                  onClick={() => onNavigate('map')}
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                >
                  Open Disaster Map
                </button>
              </div>
            </div>
          </div>

          {/* B. RECENT ACTIVITY TIMELINE */}
          <div className="admin-card" style={{ padding: '20px' }}>
            <div className="admin-card-header">
              <div className="admin-card-title-group">
                <Clock size={17} color="#a1a1aa" />
                <div>
                  <h3 className="admin-card-title" style={{ fontSize: '14px' }}>Recent Operational Feed</h3>
                  <div className="admin-card-subtitle">Live events streamed across the mesh</div>
                </div>
              </div>
            </div>

            <div className="activity-list">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="activity-item">
                  <div className="activity-icon-wrap" style={{ borderColor: act.color, color: act.color }}>
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-header">
                      <span className="activity-title">{act.title}</span>
                      <span className="activity-time">{act.time}</span>
                    </div>
                    <div className="activity-desc">{act.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
