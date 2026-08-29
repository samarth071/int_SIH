import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Navigation, 
  ShieldCheck, 
  Home, 
  AlertTriangle,
  Eye,
  Radio,
  Users,
  Compass,
  Maximize2,
  ZoomIn,
  ZoomOut,
  SlidersHorizontal,
  X
} from 'lucide-react';
import './admin.css';

export default function AdminDisasterMap({ 
  incidents, 
  responseTeams, 
  shelters, 
  onSelectIncident, 
  onNavigate 
}) {
  const [activeLayers, setActiveLayers] = useState({
    incidents: true,
    teams: true,
    shelters: true,
    zones: true,
  });

  const [selectedPin, setSelectedPin] = useState(null); // Selected marker object
  const [filterSeverity, setFilterSeverity] = useState('all');

  const toggleLayer = (layerKey) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#ef4444';
      case 'high':
      case 'medium': return '#f97316';
      default: return '#22c55e';
    }
  };

  // Filtered incidents on map
  const visibleIncidents = incidents.filter(i => {
    if (filterSeverity === 'all') return true;
    return i.severity === filterSeverity;
  });

  return (
    <div className="admin-view-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-title-row">
            <h1 className="admin-title">Tactical Disaster Map</h1>
            <span className="admin-badge badge-blue">Live LoRa Geolocation Feed</span>
          </div>
          <p className="admin-subtitle">
            Spatial monitoring of active hazards, responder GPS telemetry, and evacuation perimeters.
          </p>
        </div>

        {/* Layer Toggles Toolbar */}
        <div className="admin-header-right">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button 
              className={`radius-pill-btn ${activeLayers.incidents ? 'active' : ''}`}
              onClick={() => toggleLayer('incidents')}
              style={{ fontSize: '11px', padding: '5px 10px' }}
            >
              Incidents ({visibleIncidents.length})
            </button>
            <button 
              className={`radius-pill-btn ${activeLayers.teams ? 'active' : ''}`}
              onClick={() => toggleLayer('teams')}
              style={{ fontSize: '11px', padding: '5px 10px' }}
            >
              Teams ({responseTeams.length})
            </button>
            <button 
              className={`radius-pill-btn ${activeLayers.shelters ? 'active' : ''}`}
              onClick={() => toggleLayer('shelters')}
              style={{ fontSize: '11px', padding: '5px 10px' }}
            >
              Shelters ({shelters.length})
            </button>
            <button 
              className={`radius-pill-btn ${activeLayers.zones ? 'active' : ''}`}
              onClick={() => toggleLayer('zones')}
              style={{ fontSize: '11px', padding: '5px 10px' }}
            >
              Hazard Zones
            </button>
          </div>
        </div>
      </div>

      {/* Map Layout Grid: Map Canvas + Inspection Side Drawer */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedPin ? '1fr 340px' : '1fr', gap: '20px', transition: 'all 0.3s ease' }}>
        
        {/* Interactive Map Visualizer Container */}
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden', position: 'relative', height: '620px', background: '#090a10' }}>
          
          {/* Top-left Quick Overlay Filters */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, display: 'flex', gap: '8px' }}>
            <select 
              className="admin-select"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              style={{ background: 'rgba(18, 20, 29, 0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical (Red Only)</option>
              <option value="high">High Attention (Orange)</option>
              <option value="low">Monitoring (Green)</option>
            </select>
          </div>

          {/* Map Legend (Bottom-left) */}
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 10, background: 'rgba(18, 20, 29, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', display: 'flex', gap: '14px', fontSize: '11px', color: '#a1a1aa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
              <span>Critical Hazard</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></span>
              <span>High / Warning</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span>
              <span>Response Team</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              <span>Shelter Camp</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 800 520" 
            style={{ width: '100%', height: '100%', cursor: 'grab' }}
          >
            <defs>
              <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
              
              {/* Radial gradients for risk zones */}
              <radialGradient id="tapiFloodGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.4)" />
                <stop offset="60%" stopColor="rgba(239, 68, 68, 0.15)" />
                <stop offset="100%" stopColor="rgba(239, 68, 68, 0.0)" />
              </radialGradient>

              <radialGradient id="cycloneSurgeGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(249, 115, 22, 0.35)" />
                <stop offset="70%" stopColor="rgba(249, 115, 22, 0.1)" />
                <stop offset="100%" stopColor="rgba(249, 115, 22, 0.0)" />
              </radialGradient>
            </defs>

            {/* Background Grid */}
            <rect width="100%" height="100%" fill="url(#mapGrid)" />

            {/* Map Geography: Tapi River Corridor */}
            <path 
              d="M -20,180 C 140,80 280,240 450,160 C 580,100 700,210 820,170" 
              fill="none" 
              stroke="rgba(37, 99, 235, 0.25)" 
              strokeWidth="24" 
              strokeLinecap="round"
            />
            <path 
              d="M -20,180 C 140,80 280,240 450,160 C 580,100 700,210 820,170" 
              fill="none" 
              stroke="rgba(96, 165, 250, 0.45)" 
              strokeWidth="6" 
            />

            {/* Coastal Shoreline Line */}
            <path 
              d="M 100,530 C 130,420 180,310 240,240 C 270,200 300,100 310,-10" 
              fill="none" 
              stroke="rgba(56, 189, 248, 0.15)" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />

            {/* Main Highway Corridors */}
            <line x1="0" y1="360" x2="800" y2="360" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <line x1="420" y1="0" x2="420" y2="520" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <line x1="160" y1="0" x2="680" y2="520" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />

            {/* Hazard Buffer Zones */}
            {activeLayers.zones && (
              <g id="hazard-zones">
                {/* Tapi River Basin Flood Zone */}
                <circle 
                  cx="220" 
                  cy="140" 
                  r="75" 
                  fill="url(#tapiFloodGradient)" 
                  stroke="#ef4444" 
                  strokeWidth="1.5" 
                  strokeDasharray="5 5" 
                />
                <text x="220" y="70" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700" letterSpacing="0.5">
                  ZONE A: INUNDATION BUFFER (1.5 KM)
                </text>

                {/* Coastal Cyclone Surge Zone */}
                <circle 
                  cx="180" 
                  cy="320" 
                  r="65" 
                  fill="url(#cycloneSurgeGradient)" 
                  stroke="#f97316" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                />
              </g>
            )}

            {/* Shelter Markers */}
            {activeLayers.shelters && shelters.map((sh, idx) => {
              // Simulated map coordinates for shelters
              const posX = 160 + (idx * 130);
              const posY = 190 + (idx % 2 === 0 ? 50 : -40);
              return (
                <g 
                  key={sh.id} 
                  transform={`translate(${posX}, ${posY})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPin({ type: 'shelter', data: sh })}
                >
                  <circle cx="0" cy="0" r="14" fill="#090d18" stroke="#10b981" strokeWidth="2" />
                  <circle cx="0" cy="0" r="6" fill="#10b981" />
                  <text x="0" y="24" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="600">
                    {sh.name.split('—')[0].substring(0, 16)}
                  </text>
                </g>
              );
            })}

            {/* Response Team Markers */}
            {activeLayers.teams && responseTeams.map((team, idx) => {
              const posX = 240 + (idx * 75);
              const posY = 155 + (idx % 3 === 0 ? 80 : -50);
              return (
                <g 
                  key={team.id} 
                  transform={`translate(${posX}, ${posY})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPin({ type: 'team', data: team })}
                >
                  <rect x="-10" y="-10" width="20" height="20" rx="6" fill="#090d18" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="0" cy="0" r="4" fill="#60a5fa" />
                  <text x="0" y="22" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="600">
                    {team.name.split(' ')[0]} {team.name.split(' ')[1]}
                  </text>
                </g>
              );
            })}

            {/* Incident Markers */}
            {activeLayers.incidents && visibleIncidents.map((incident) => {
              const { x, y } = incident.coordinates;
              const isSelected = selectedPin?.data?.id === incident.id;
              const sevColor = getSeverityColor(incident.severity);

              return (
                <g 
                  key={incident.id} 
                  transform={`translate(${x}, ${y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPin({ type: 'incident', data: incident })}
                >
                  {/* Ping Animation Ring */}
                  {incident.severity === 'critical' && (
                    <circle cx="0" cy="0" r="22" fill="none" stroke={sevColor} strokeWidth="1.5" opacity="0.6">
                      <animate attributeName="r" from="12" to="28" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Marker Body */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={isSelected ? "14" : "11"} 
                    fill={sevColor} 
                    stroke="#ffffff" 
                    strokeWidth={isSelected ? "3" : "2"} 
                    filter="drop-shadow(0 4px 8px rgba(0,0,0,0.6))"
                  />

                  {/* Marker Core Indicator */}
                  <circle cx="0" cy="0" r="4" fill="#ffffff" />

                  {/* Label */}
                  <text 
                    x="16" 
                    y="4" 
                    fill="#ffffff" 
                    fontSize="11" 
                    fontWeight="700"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {incident.type} ({incident.sosRequestsCount} SOS)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Pin Detail Inspection Drawer */}
        {selectedPin && (
          <div className="admin-card" style={{ height: '620px', overflowY: 'auto', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
              <span className="admin-badge badge-blue" style={{ textTransform: 'uppercase' }}>
                {selectedPin.type} Inspector
              </span>
              <button 
                className="admin-btn admin-btn-outline admin-btn-sm"
                onClick={() => setSelectedPin(null)}
                style={{ padding: '4px 8px' }}
              >
                <X size={14} />
              </button>
            </div>

            {/* INCIDENT PIN DETAIL */}
            {selectedPin.type === 'incident' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: 'monospace' }}>
                    {selectedPin.data.id}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: '2px 0 0' }}>
                    {selectedPin.data.type}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>
                    <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {selectedPin.data.location}
                  </div>
                </div>

                <div className="sub-grid-2">
                  <div className="sub-card" style={{ padding: '10px' }}>
                    <span style={{ fontSize: '11px', color: '#71717a' }}>ACTIVE SOS</span>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#ef4444' }}>{selectedPin.data.sosRequestsCount}</span>
                  </div>
                  <div className="sub-card" style={{ padding: '10px' }}>
                    <span style={{ fontSize: '11px', color: '#71717a' }}>AFFECTED</span>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff' }}>{selectedPin.data.affectedCitizensCount}</span>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#d4d4d8', lineHeight: '1.5', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px' }}>
                  {selectedPin.data.description}
                </div>

                <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                  <strong>Assigned Unit:</strong> {selectedPin.data.assignedTeam}
                </div>

                <button 
                  className="admin-btn admin-btn-primary"
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={() => {
                    onSelectIncident(selectedPin.data);
                    onNavigate('incident-details');
                  }}
                >
                  <Eye size={14} />
                  <span>Open 360° Radius View</span>
                </button>
              </div>
            )}

            {/* RESPONSE TEAM PIN DETAIL */}
            {selectedPin.type === 'team' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: 'monospace' }}>
                    {selectedPin.data.id}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '2px 0 0' }}>
                    {selectedPin.data.name}
                  </h3>
                  <span className="admin-badge badge-green" style={{ marginTop: '6px' }}>
                    {selectedPin.data.status}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: '#d4d4d8' }}>
                  <strong>Lead:</strong> {selectedPin.data.leadOfficer}<br />
                  <strong>Responders:</strong> {selectedPin.data.personnel} Personnel<br />
                  <strong>Vehicles:</strong> {selectedPin.data.vehicles}
                </div>

                <button 
                  className="admin-btn admin-btn-outline"
                  onClick={() => onNavigate('teams')}
                >
                  Manage Response Teams
                </button>
              </div>
            )}

            {/* SHELTER PIN DETAIL */}
            {selectedPin.type === 'shelter' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                    {selectedPin.data.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>
                    {selectedPin.data.address}
                  </div>
                </div>

                <div className="sub-card" style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span>Occupancy</span>
                    <strong>{selectedPin.data.currentOccupancy} / {selectedPin.data.totalCapacity}</strong>
                  </div>
                  <div className="capacity-bar-wrap">
                    <div 
                      className="capacity-bar-fill" 
                      style={{ 
                        width: `${Math.round((selectedPin.data.currentOccupancy / selectedPin.data.totalCapacity) * 100)}%`,
                        background: '#10b981'
                      }}
                    />
                  </div>
                </div>

                <button 
                  className="admin-btn admin-btn-outline"
                  onClick={() => onNavigate('shelters-relief')}
                >
                  View Shelters & Supplies
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
