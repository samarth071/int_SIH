import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Building2, 
  Users, 
  Phone, 
  MapPin, 
  Star, 
  Package, 
  CheckCircle2,
  Clock,
  Shield,
  Search,
  ArrowRight
} from 'lucide-react';
import './admin.css';

export default function AdminVolunteersOrgs({ 
  volunteers, 
  ngos, 
  onUpdateVolunteerStatus,
  onNavigate 
}) {
  const [activeTab, setActiveTab] = useState('volunteers'); // 'volunteers' | 'ngos'
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');

  const totalVolunteers = volunteers.length;
  const availableVolunteers = volunteers.filter(v => v.availability === 'Available').length;
  const totalNgoVolunteers = ngos.reduce((acc, curr) => acc + (curr.activeVolunteers || 0), 0);

  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch = 
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkill = skillFilter === 'all' || v.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="admin-view-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-title-row">
            <h1 className="admin-title">Volunteers & Partner NGOs</h1>
            <span className="admin-badge badge-green">Civil Society Coordination</span>
          </div>
          <p className="admin-subtitle">
            Synchronized mobilization of grassroots volunteers, community responders, and humanitarian NGOs.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="admin-header-right">
          <div className="radius-pill-group">
            <button 
              className={`radius-pill-btn ${activeTab === 'volunteers' ? 'active' : ''}`}
              onClick={() => setActiveTab('volunteers')}
            >
              Registered Volunteers ({volunteers.length})
            </button>
            <button 
              className={`radius-pill-btn ${activeTab === 'ngos' ? 'active' : ''}`}
              onClick={() => setActiveTab('ngos')}
            >
              Partner Organizations ({ngos.length})
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(234, 88, 12, 0.12)', color: '#f97316' }}>
            <HeartHandshake size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Active Civil Volunteers</span>
            <span className="admin-stat-value">{totalVolunteers}</span>
            <span className="admin-stat-trend">{availableVolunteers} ready for immediate callout</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>
            <Building2 size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Federated NGO Partners</span>
            <span className="admin-stat-value">{ngos.length} Orgs</span>
            <span className="admin-stat-trend">Red Cross, Goonj & Seva Bharati</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e' }}>
            <Users size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">NGO Deployed Personnel</span>
            <span className="admin-stat-value">{totalNgoVolunteers}</span>
            <span className="admin-stat-trend">Staffing community kitchens & triage</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff' }}>
            <Package size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">NGO Portal Synchronization</span>
            <span className="admin-stat-value">Live Active</span>
            <span className="admin-stat-trend" style={{ color: '#22c55e' }}>Cross-portal data linked</span>
          </div>
        </div>
      </div>

      {/* TAB 1: VOLUNTEERS */}
      {activeTab === 'volunteers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Filter Bar */}
          <div className="admin-filters-bar">
            <div className="admin-filters-left">
              <input 
                type="text" 
                className="admin-search-input"
                placeholder="Search volunteers by name, skill, zone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select 
                className="admin-select"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              >
                <option value="all">All Specialties & Skills</option>
                <option value="Rescue">Boat / Search & Rescue</option>
                <option value="Paramedic">Medical / Paramedic</option>
                <option value="Radio">Ham Radio / LoRa</option>
                <option value="Logistics">Food & Ration Logistics</option>
                <option value="Driver">Heavy Vehicle Driver</option>
              </select>
            </div>
          </div>

          {/* Volunteer Roster Grid */}
          <div className="sub-grid-2">
            {filteredVolunteers.map((vol) => (
              <div key={vol.id} className="admin-card" style={{ padding: '20px', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#71717a', fontFamily: 'monospace' }}>{vol.id}</span>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '2px 0 0' }}>
                      {vol.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a1a1aa', fontSize: '12px', marginTop: '2px' }}>
                      <MapPin size={12} />
                      <span>{vol.zone}</span>
                    </div>
                  </div>

                  <span className={`admin-badge ${vol.availability === 'On Duty' ? 'badge-orange' : 'badge-green'}`}>
                    {vol.availability}
                  </span>
                </div>

                {/* Skills tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {vol.skills.map((skill, idx) => (
                    <span key={idx} className="admin-badge badge-blue" style={{ fontSize: '11px' }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                    <strong>{vol.hoursContributed} hrs</strong> service • Rating: {vol.rating} ★
                  </div>

                  <a 
                    href={`tel:${vol.phone}`}
                    className="admin-btn admin-btn-outline admin-btn-sm"
                    style={{ textDecoration: 'none' }}
                  >
                    <Phone size={12} />
                    <span>Contact ({vol.phone})</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ORGANIZATIONS / NGOs */}
      {activeTab === 'ngos' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="sub-grid-2">
            {ngos.map((ngo) => (
              <div key={ngo.id} className="admin-card" style={{ padding: '22px', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#71717a', fontFamily: 'monospace' }}>{ngo.id}</span>
                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#ffffff', margin: '2px 0 0' }}>
                      {ngo.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '2px' }}>
                      Operating Area: <strong style={{ color: '#ffffff' }}>{ngo.area}</strong>
                    </div>
                  </div>

                  <span className={`admin-badge ${ngo.supportStatus === 'Active Dispatch' || ngo.supportStatus === 'On Site' ? 'badge-green' : 'badge-orange'}`}>
                    {ngo.supportStatus}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: '#d4d4d8', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px' }}>
                  <strong>Committed Resources:</strong><br />
                  <span style={{ color: '#60a5fa' }}>{ngo.resourcesSummary}</span>
                </div>

                {/* Active missions */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#a1a1aa', marginBottom: '8px' }}>
                    Active Field Relief Missions:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {ngo.activeMissions.map((m, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', background: 'rgba(255,255,255,0.015)', padding: '8px 10px', borderRadius: '6px' }}>
                        <div>
                          <strong style={{ color: '#ffffff' }}>{m.targetZone}:</strong> {m.items}
                        </div>
                        <span className="admin-badge badge-gray">{m.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                    Contact: {ngo.contactPerson} ({ngo.phone})
                  </span>

                  <span className="admin-badge badge-blue">
                    {ngo.activeVolunteers} Volunteers Deployed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
