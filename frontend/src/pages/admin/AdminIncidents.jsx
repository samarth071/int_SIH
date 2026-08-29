import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  Radio, 
  ArrowRight,
  Shield,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import './admin.css';

export default function AdminIncidents({ 
  incidents, 
  onSelectIncident, 
  onNavigate,
  onUpdateIncidentStatus 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');

  // Filtered incidents logic
  const filteredIncidents = incidents.filter((item) => {
    const matchesSearch = 
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignedTeam.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity = severityFilter === 'all' || item.severity === severityFilter;
    const matchesType = typeFilter === 'all' || item.category === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesZone = zoneFilter === 'all' || item.zone === zoneFilter;

    return matchesSearch && matchesSeverity && matchesType && matchesStatus && matchesZone;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="admin-badge badge-red">Critical (Red)</span>;
      case 'high':
        return <span className="admin-badge badge-orange">High Attention (Orange)</span>;
      case 'medium':
        return <span className="admin-badge badge-orange">Moderate (Orange)</span>;
      case 'low':
      default:
        return <span className="admin-badge badge-green">Monitoring (Green)</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Progress':
        return <span className="admin-badge badge-red">In Progress</span>;
      case 'Responding':
        return <span className="admin-badge badge-orange">Responding</span>;
      case 'Verified':
        return <span className="admin-badge badge-blue">Verified</span>;
      case 'Resolved':
        return <span className="admin-badge badge-green">Resolved</span>;
      case 'Reported':
      default:
        return <span className="admin-badge badge-gray">Reported</span>;
    }
  };

  return (
    <div className="admin-view-container">
      {/* Page Header */}
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-title-row">
            <h1 className="admin-title">Incident Management</h1>
            <span className="admin-badge badge-gray">{incidents.length} Total Incidents</span>
          </div>
          <p className="admin-subtitle">
            Prioritize, assign responder units, and inspect radius situational intelligence.
          </p>
        </div>

        <div className="admin-header-right">
          <button 
            className="admin-btn admin-btn-outline"
            onClick={() => onNavigate('map')}
          >
            <MapPin size={14} />
            <span>Map View</span>
          </button>
        </div>
      </div>

      {/* Comprehensive Filter Bar */}
      <div className="admin-filters-bar">
        <div className="admin-filters-left">
          {/* Search */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              className="admin-search-input"
              placeholder="Search by ID, location, disaster..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Severity Filter */}
          <select 
            className="admin-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical (Red)</option>
            <option value="high">High Attention (Orange)</option>
            <option value="medium">Moderate (Orange)</option>
            <option value="low">Monitoring (Green)</option>
          </select>

          {/* Disaster Type Filter */}
          <select 
            className="admin-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Disaster Types</option>
            <option value="flood">Flood</option>
            <option value="earthquake">Earthquake / Collapse</option>
            <option value="cyclone">Cyclone</option>
            <option value="landslide">Landslide</option>
            <option value="fire">Fire / Hazmat</option>
          </select>

          {/* Status Filter */}
          <select 
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Responding">Responding</option>
            <option value="Verified">Verified</option>
            <option value="Reported">Reported</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Zone Filter */}
          <select 
            className="admin-select"
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
          >
            <option value="all">All Zones</option>
            <option value="Zone A - West Basin">Zone A - West Basin</option>
            <option value="Zone B - East Sector">Zone B - East Sector</option>
            <option value="Zone C - Coastal Belt">Zone C - Coastal Belt</option>
            <option value="Zone D - North Highway">Zone D - North Highway</option>
            <option value="Zone E - Industrial South">Zone E - Industrial South</option>
          </select>
        </div>

        {/* Reset Filter Action */}
        {(searchTerm || severityFilter !== 'all' || typeFilter !== 'all' || statusFilter !== 'all' || zoneFilter !== 'all') && (
          <button 
            className="admin-btn admin-btn-outline admin-btn-sm"
            onClick={() => {
              setSearchTerm('');
              setSeverityFilter('all');
              setTypeFilter('all');
              setStatusFilter('all');
              setZoneFilter('all');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Incidents Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Disaster Type</th>
                <th>Location / Zone</th>
                <th>Severity</th>
                <th>Time Reported</th>
                <th>SOS / Citizens</th>
                <th>Assigned Unit</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#71717a' }}>
                    No incidents found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((incident) => (
                  <tr key={incident.id}>
                    {/* ID */}
                    <td style={{ fontWeight: '600', color: '#ffffff', fontFamily: 'monospace' }}>
                      {incident.id}
                    </td>

                    {/* Disaster Type */}
                    <td style={{ fontWeight: '600', color: '#f4f4f5' }}>
                      {incident.type}
                    </td>

                    {/* Location */}
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#ffffff' }}>{incident.location}</span>
                        <span style={{ fontSize: '11px', color: '#71717a' }}>{incident.zone}</span>
                      </div>
                    </td>

                    {/* Severity */}
                    <td>
                      {getSeverityBadge(incident.severity)}
                    </td>

                    {/* Time */}
                    <td style={{ color: '#a1a1aa', fontSize: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        <span>{incident.timeReported}</span>
                      </div>
                    </td>

                    {/* SOS / Citizens */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="admin-badge badge-red" title="Active SOS Requests">
                          <Radio size={10} />
                          {incident.sosRequestsCount} SOS
                        </span>
                        <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                          {incident.affectedCitizensCount} affected
                        </span>
                      </div>
                    </td>

                    {/* Assigned Team */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e4e4e7', fontSize: '12px' }}>
                        <Shield size={13} color="#60a5fa" />
                        <span>{incident.assignedTeam}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      {getStatusBadge(incident.status)}
                    </td>

                    {/* Action */}
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="admin-btn admin-btn-primary admin-btn-sm"
                        onClick={() => {
                          onSelectIncident(incident);
                          onNavigate('incident-details');
                        }}
                      >
                        <Eye size={12} />
                        <span>Situational View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
