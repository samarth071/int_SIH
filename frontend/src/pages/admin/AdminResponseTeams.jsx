import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  Truck, 
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import './admin.css';

export default function AdminResponseTeams({ 
  teams, 
  incidents, 
  onUpdateTeamStatus,
  onAssignTeamToIncident,
  onNavigate 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeModalTeam, setActiveModalTeam] = useState(null);
  const [modalIncidentId, setModalIncidentId] = useState('');
  const [modalNewStatus, setModalNewStatus] = useState('Assigned');

  // Summary counts
  const totalResponders = teams.reduce((acc, curr) => acc + (curr.personnel || 0), 0);
  const onSiteCount = teams.filter(t => t.status === 'On Site').length;
  const enRouteCount = teams.filter(t => t.status === 'En Route').length;
  const availableCount = teams.filter(t => t.status === 'Available').length;

  const filteredTeams = teams.filter((t) => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Site':
        return <span className="admin-badge badge-green">On Site</span>;
      case 'En Route':
        return <span className="admin-badge badge-orange">En Route</span>;
      case 'Assigned':
        return <span className="admin-badge badge-blue">Assigned</span>;
      case 'Completed':
        return <span className="admin-badge badge-gray">Completed</span>;
      case 'Available':
      default:
        return <span className="admin-badge badge-green">Available</span>;
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!activeModalTeam) return;

    if (modalIncidentId) {
      onAssignTeamToIncident(modalIncidentId, activeModalTeam.id);
    } else {
      onUpdateTeamStatus(activeModalTeam.id, modalNewStatus);
    }

    setActiveModalTeam(null);
  };

  return (
    <div className="admin-view-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-title-row">
            <h1 className="admin-title">Response Team Fleet & Operations</h1>
            <span className="admin-badge badge-blue">{teams.length} Active Battalions</span>
          </div>
          <p className="admin-subtitle">
            Tactical deployment, real-time muster roll, and incident mission assignments.
          </p>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>
            <Users size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Total Field Responders</span>
            <span className="admin-stat-value">{totalResponders}</span>
            <span className="admin-stat-trend">NDRF, SDRF, Fire & Medics</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e' }}>
            <ShieldCheck size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">On Site Conducting Rescue</span>
            <span className="admin-stat-value">{onSiteCount} Units</span>
            <span className="admin-stat-trend" style={{ color: '#22c55e' }}>Active operations underway</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#f97316' }}>
            <Truck size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">En Route / Mobilizing</span>
            <span className="admin-stat-value">{enRouteCount} Units</span>
            <span className="admin-stat-trend">GPS tracking synchronized</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff' }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Standby / Available</span>
            <span className="admin-stat-value">{availableCount} Units</span>
            <span className="admin-stat-trend">Ready for rapid redeployment</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-filters-bar">
        <div className="admin-filters-left">
          <input 
            type="text" 
            className="admin-search-input"
            placeholder="Search teams by ID, name, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select 
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="En Route">En Route</option>
            <option value="On Site">On Site</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Teams Grid Layout */}
      <div className="sub-grid-2">
        {filteredTeams.map((team) => (
          <div key={team.id} className="admin-card" style={{ padding: '20px', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#71717a', fontFamily: 'monospace' }}>{team.id}</span>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '2px 0 0' }}>
                  {team.name}
                </h3>
                <div style={{ fontSize: '12px', color: '#60a5fa', marginTop: '2px' }}>
                  {team.type}
                </div>
              </div>
              {getStatusBadge(team.status)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#d4d4d8', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px' }}>
              <div>
                <strong>Current Position:</strong> {team.location}
              </div>
              <div>
                <strong>Assignment:</strong> {team.currentAssignment}
              </div>
              <div>
                <strong>Lead Officer:</strong> {team.leadOfficer} ({team.contact})
              </div>
              <div>
                <strong>Fleet & Equipment:</strong> {team.vehicles}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '6px' }}>
              <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                <strong>{team.personnel}</strong> Certified Responders
              </span>

              <button 
                className="admin-btn admin-btn-primary admin-btn-sm"
                onClick={() => {
                  setActiveModalTeam(team);
                  setModalNewStatus(team.status);
                  setModalIncidentId('');
                }}
              >
                Assign / Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assignment / Status Update Modal */}
      {activeModalTeam && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Manage Team: {activeModalTeam.name}</h3>
              <button 
                className="admin-btn admin-btn-outline admin-btn-sm"
                onClick={() => setActiveModalTeam(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleModalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Assign to Incident</label>
                <select 
                  className="admin-form-select"
                  value={modalIncidentId}
                  onChange={(e) => setModalIncidentId(e.target.value)}
                >
                  <option value="">-- Keep Current / Change Status Only --</option>
                  {incidents.map((inc) => (
                    <option key={inc.id} value={inc.id}>
                      {inc.id}: {inc.type} ({inc.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Update Operational Status</label>
                <select 
                  className="admin-form-select"
                  value={modalNewStatus}
                  onChange={(e) => setModalNewStatus(e.target.value)}
                >
                  <option value="Available">Available (Standby)</option>
                  <option value="Assigned">Assigned</option>
                  <option value="En Route">En Route</option>
                  <option value="On Site">On Site</option>
                  <option value="Completed">Completed / Stood Down</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-outline"
                  onClick={() => setActiveModalTeam(null)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
