import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Radio, 
  Users, 
  ShieldCheck, 
  HeartHandshake, 
  Home, 
  Package, 
  AlertOctagon,
  Phone,
  CheckCircle2,
  Send,
  Navigation,
  FileText,
  UserCheck
} from 'lucide-react';
import { getRadiusSituationalData } from '../../data/adminMockData';
import './admin.css';

export default function AdminIncidentDetails({ 
  incident, 
  onBack, 
  onNavigate,
  onAssignTeamToIncident,
  allTeams = []
}) {
  const [radiusOption, setRadiusOption] = useState('1km'); // '500m' | '1km' | '2km'
  const [activeTab, setActiveTab] = useState('citizens'); // 'citizens' | 'response' | 'volunteers' | 'shelters' | 'relief'
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(incident?.assignedTeamId || '');

  // Calculate dynamic radius situational picture
  const radiusData = getRadiusSituationalData(incident, radiusOption);

  if (!incident) {
    return (
      <div className="admin-view-container">
        <button className="admin-btn admin-btn-outline" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Incidents</span>
        </button>
        <div className="admin-card" style={{ textAlign: 'center', padding: '60px' }}>
          <AlertOctagon size={36} color="#ef4444" style={{ margin: '0 auto 12px' }} />
          <h2 style={{ color: '#ffffff' }}>No Incident Selected</h2>
          <p style={{ color: '#a1a1aa' }}>Please select an active incident from the Incidents or Dashboard list.</p>
        </div>
      </div>
    );
  }

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (onAssignTeamToIncident && selectedTeamId) {
      onAssignTeamToIncident(incident.id, selectedTeamId);
    }
    setShowAssignModal(false);
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical': return <span className="admin-badge badge-red">Critical (Red)</span>;
      case 'high': return <span className="admin-badge badge-orange">High Attention</span>;
      case 'medium': return <span className="admin-badge badge-orange">Moderate</span>;
      default: return <span className="admin-badge badge-green">Monitoring</span>;
    }
  };

  return (
    <div className="admin-view-container">
      {/* Back button & Breadcrumb header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button className="admin-btn admin-btn-outline" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Incidents List</span>
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="admin-btn admin-btn-outline"
            onClick={() => onNavigate('map')}
          >
            <Navigation size={14} />
            <span>Locate on Map</span>
          </button>
          <button 
            className="admin-btn admin-btn-primary"
            onClick={() => setShowAssignModal(true)}
          >
            <ShieldCheck size={14} />
            <span>Reassign / Deploy Team</span>
          </button>
        </div>
      </div>

      {/* Incident Hero Card */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#a1a1aa' }}>
                {incident.id}
              </span>
              {getSeverityBadge(incident.severity)}
              <span className="admin-badge badge-gray">{incident.status}</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff', margin: '4px 0 0' }}>
              {incident.type}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a1a1aa', fontSize: '13px' }}>
              <MapPin size={14} color="#ef4444" />
              <span>{incident.location} ({incident.zone})</span>
              <span style={{ margin: '0 4px' }}>•</span>
              <Clock size={14} />
              <span>Reported {incident.timeReported}</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="sub-card" style={{ padding: '10px 18px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase' }}>Active SOS</span>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#ef4444' }}>{incident.sosRequestsCount}</span>
            </div>
            <div className="sub-card" style={{ padding: '10px 18px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase' }}>Affected Citizens</span>
              <span style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff' }}>{incident.affectedCitizensCount}</span>
            </div>
            <div className="sub-card" style={{ padding: '10px 18px', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase' }}>Assigned Unit</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#60a5fa', whiteSpace: 'nowrap' }}>
                {incident.assignedTeam.split('—')[0]}
              </span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: '#d4d4d8', lineHeight: '1.6', background: 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <strong>Field Incident Brief:</strong> {incident.description}
        </div>
      </div>

      {/* ====================================================================
          RADIUS-BASED SITUATIONAL ANALYSIS SELECTOR & CONTROLS
          ==================================================================== */}
      <div className="admin-card" style={{ gap: '16px' }}>
        <div className="radius-selector-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Navigation size={16} color="#60a5fa" />
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
              Situational Radius Analysis:
            </span>
          </div>

          <div className="radius-pill-group">
            <button 
              className={`radius-pill-btn ${radiusOption === '500m' ? 'active' : ''}`}
              onClick={() => setRadiusOption('500m')}
            >
              500 Metres (Tactical Core)
            </button>
            <button 
              className={`radius-pill-btn ${radiusOption === '1km' ? 'active' : ''}`}
              onClick={() => setRadiusOption('1km')}
            >
              1 Kilometre (Immediate Sector)
            </button>
            <button 
              className={`radius-pill-btn ${radiusOption === '2km' ? 'active' : ''}`}
              onClick={() => setRadiusOption('2km')}
            >
              2 Kilometres (Regional Buffer)
            </button>
          </div>

          <span style={{ fontSize: '12px', color: '#a1a1aa', marginLeft: 'auto' }}>
            Showing telemetry inside <strong>{radiusData.radiusDistanceText}</strong> perimeter
          </span>
        </div>

        {/* Situational Analysis Tabs */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab-btn ${activeTab === 'citizens' ? 'active' : ''}`}
            onClick={() => setActiveTab('citizens')}
          >
            <Users size={15} />
            <span>Citizens & SOS ({radiusData.mockCitizensList.length})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'response' ? 'active' : ''}`}
            onClick={() => setActiveTab('response')}
          >
            <ShieldCheck size={15} />
            <span>Response Teams ({radiusData.nearbyTeams.length})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'volunteers' ? 'active' : ''}`}
            onClick={() => setActiveTab('volunteers')}
          >
            <HeartHandshake size={15} />
            <span>Volunteers ({radiusData.volunteerStats.totalNearby})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'shelters' ? 'active' : ''}`}
            onClick={() => setActiveTab('shelters')}
          >
            <Home size={15} />
            <span>Shelters ({radiusData.nearbyShelters.length})</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'relief' ? 'active' : ''}`}
            onClick={() => setActiveTab('relief')}
          >
            <Package size={15} />
            <span>Relief & Supplies</span>
          </button>
        </div>

        {/* TAB 1: CITIZENS */}
        {activeTab === 'citizens' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Radius summary metrics */}
            <div className="sub-grid-3">
              <div className="sub-card">
                <span className="admin-stat-label">Total Registered in Radius</span>
                <span className="admin-stat-value">{radiusData.totalRegistered.toLocaleString()}</span>
                <span className="admin-stat-trend">Based on census & voter registration</span>
              </div>
              <div className="sub-card">
                <span className="admin-stat-label">Potentially Affected in Zone</span>
                <span className="admin-stat-value" style={{ color: '#f97316' }}>{radiusData.potentiallyAffected.toLocaleString()}</span>
                <span className="admin-stat-trend">Inside flood inundation contour</span>
              </div>
              <div className="sub-card">
                <span className="admin-stat-label">Active SOS / Missing Reports</span>
                <span className="admin-stat-value" style={{ color: '#ef4444' }}>
                  {radiusData.activeSOS} <span style={{ fontSize: '13px', color: '#a1a1aa' }}>SOS / {radiusData.missingReports} Missing</span>
                </span>
                <span className="admin-stat-trend" style={{ color: '#ef4444' }}>Verified through LoRa mesh & app</span>
              </div>
            </div>

            {/* Citizens and SOS requests within radius */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>
                Active Distress & Evacuation Calls inside {radiusData.radiusDistanceText}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {radiusData.mockCitizensList.map((cit) => (
                  <div key={cit.id} className="priority-item" style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{cit.name}</span>
                        <span className="admin-badge badge-red">{cit.priority}</span>
                        <span className="admin-badge badge-gray">{cit.people} Person(s)</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                        {cit.location} • <strong style={{ color: '#60a5fa' }}>{cit.distance}</strong>
                      </div>
                      <div style={{ fontSize: '12px', color: '#fca5a5' }}>
                        Status: {cit.status} ({cit.time})
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a 
                        href={`tel:${cit.contact}`} 
                        className="admin-btn admin-btn-outline admin-btn-sm"
                        style={{ textDecoration: 'none' }}
                      >
                        <Phone size={12} />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESPONSE TEAMS */}
        {activeTab === 'response' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                Response Teams Positioned within {radiusData.radiusDistanceText}
              </h3>
              <button 
                className="admin-btn admin-btn-primary admin-btn-sm"
                onClick={() => setShowAssignModal(true)}
              >
                Assign Additional Team
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {radiusData.nearbyTeams.map((team) => (
                <div key={team.id} className="priority-item">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{team.name}</span>
                      <span className={`admin-badge ${team.status === 'On Site' ? 'badge-green' : team.status === 'En Route' ? 'badge-orange' : 'badge-blue'}`}>
                        {team.status}
                      </span>
                      <span className="admin-badge badge-gray">{team.personnel} Responders</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                      Lead: <strong>{team.lead}</strong> • Specialty: {team.specialty}
                    </div>
                    <div style={{ fontSize: '12px', color: '#60a5fa' }}>
                      Proximity: {team.distance}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => onNavigate('teams')}>
                      Team Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VOLUNTEERS */}
        {activeTab === 'volunteers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="sub-grid-3">
              <div className="sub-card">
                <span className="admin-stat-label">Total Volunteers Nearby</span>
                <span className="admin-stat-value">{radiusData.volunteerStats.totalNearby}</span>
              </div>
              <div className="sub-card">
                <span className="admin-stat-label">Available for Dispatch</span>
                <span className="admin-stat-value" style={{ color: '#22c55e' }}>{radiusData.volunteerStats.available}</span>
              </div>
              <div className="sub-card">
                <span className="admin-stat-label">Currently Assigned</span>
                <span className="admin-stat-value" style={{ color: '#60a5fa' }}>{radiusData.volunteerStats.assigned}</span>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>
                Volunteer Roster in {radiusData.radiusDistanceText} Radius
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {radiusData.nearbyVolunteers.map((vol) => (
                  <div key={vol.id} className="priority-item" style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{vol.name}</span>
                        <span className={`admin-badge ${vol.availability === 'On Duty' ? 'badge-orange' : 'badge-green'}`}>
                          {vol.availability}
                        </span>
                        <span style={{ fontSize: '11px', color: '#71717a' }}>{vol.id}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                        Skills: <strong style={{ color: '#e4e4e7' }}>{vol.skills}</strong>
                      </div>
                      <div style={{ fontSize: '11px', color: '#71717a' }}>
                        Distance: {vol.distance} from epicenter
                      </div>
                    </div>

                    <a 
                      href={`tel:${vol.phone}`}
                      className="admin-btn admin-btn-outline admin-btn-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      <Phone size={12} />
                      <span>Contact</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SHELTERS */}
        {activeTab === 'shelters' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
              Designated Emergency Shelters in {radiusData.radiusDistanceText} Radius
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {radiusData.nearbyShelters.map((shelter) => {
                const occupancyPercent = Math.round((shelter.currentOccupancy / shelter.totalCapacity) * 100);
                return (
                  <div key={shelter.id} className="priority-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{shelter.name}</span>
                        <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '2px' }}>
                          Distance: <strong style={{ color: '#60a5fa' }}>{shelter.distance}</strong> • {shelter.status}
                        </div>
                      </div>
                      <span className="admin-badge badge-blue">
                        {shelter.availableCapacity} beds open
                      </span>
                    </div>

                    {/* Progress occupancy bar */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#a1a1aa', marginBottom: '6px' }}>
                        <span>Occupancy: {shelter.currentOccupancy} / {shelter.totalCapacity}</span>
                        <span>{occupancyPercent}%</span>
                      </div>
                      <div className="capacity-bar-wrap">
                        <div 
                          className="capacity-bar-fill" 
                          style={{ 
                            width: `${occupancyPercent}%`,
                            backgroundColor: occupancyPercent > 90 ? '#ef4444' : occupancyPercent > 70 ? '#f97316' : '#22c55e'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {shelter.facilities.map((fac, idx) => (
                        <span key={idx} className="admin-badge badge-gray" style={{ fontSize: '10px' }}>
                          ✓ {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: RELIEF */}
        {activeTab === 'relief' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="sub-grid-2">
              <div className="sub-card">
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                  Active NGO Partners in Radius
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {radiusData.reliefData.supportingNGOs.map((ngo, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: '#ffffff', fontWeight: '600' }}>{ngo.name}</span>
                      <span className="admin-badge badge-green">{ngo.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sub-card">
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                  Delivery & Logistics Status
                </h4>
                <div style={{ fontSize: '12px', color: '#60a5fa', marginTop: '8px', fontWeight: '600' }}>
                  {radiusData.reliefData.resources.deliveryStatus}
                </div>
                <p style={{ fontSize: '11px', color: '#71717a', margin: '4px 0 0' }}>
                  Direct coordination via Sanjeevani Mesh Relief Dispatch pipeline.
                </p>
              </div>
            </div>

            {/* Inventory available in radius */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>
                Resource Quantities Positioned for {radiusData.radiusDistanceText} Zone
              </h3>
              <div className="sub-grid-3">
                <div className="sub-card">
                  <span className="admin-stat-label">Food Packets (MRE)</span>
                  <span className="admin-stat-value">{radiusData.reliefData.resources.foodMealsAvailable.toLocaleString()}</span>
                  <span className="admin-stat-trend">Warm rations & biscuits</span>
                </div>
                <div className="sub-card">
                  <span className="admin-stat-label">Drinking Water</span>
                  <span className="admin-stat-value">{radiusData.reliefData.resources.waterLitresAvailable.toLocaleString()} L</span>
                  <span className="admin-stat-trend">Cans & sealed 1L bottles</span>
                </div>
                <div className="sub-card">
                  <span className="admin-stat-label">Medical Trauma Kits</span>
                  <span className="admin-stat-value" style={{ color: '#22c55e' }}>
                    {radiusData.reliefData.resources.medicalKitsAvailable}
                  </span>
                  <span className="admin-stat-trend">Triage, bandages & IV fluids</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Team Assignment / Reassignment Modal */}
      {showAssignModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Deploy / Reassign Response Team</h3>
              <button 
                className="admin-btn admin-btn-outline admin-btn-sm"
                onClick={() => setShowAssignModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Incident</label>
                <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: '600' }}>
                  {incident.id} — {incident.type} ({incident.location})
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Select Response Team</label>
                <select 
                  className="admin-form-select"
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  required
                >
                  <option value="">-- Choose Team Unit --</option>
                  {allTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.status} • {team.personnel} Responders)
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Priority Order / Dispatch Directives</label>
                <textarea 
                  className="admin-form-textarea"
                  defaultValue="Proceed to coordinate perimeter with local police. Prioritize boat rescue for elderly & medical triage."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-outline"
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary"
                >
                  Confirm & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
