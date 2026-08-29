import React, { useState } from 'react';
import { 
  BellRing, 
  AlertTriangle, 
  CloudRain, 
  Wind, 
  Radio, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  Smartphone, 
  Volume2, 
  Vibrate, 
  MessageSquare,
  Users,
  Compass,
  FileCheck
} from 'lucide-react';
import './admin.css';

export default function AdminEarlyWarnings({ 
  alerts, 
  onBroadcastAlert, 
  onNavigate 
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successBroadcastMsg, setSuccessBroadcastMsg] = useState(null);

  // Form State for Broadcast Alert Creator
  const [formTitle, setFormTitle] = useState('Flash Flood & Embankment Breach Alert');
  const [formZone, setFormZone] = useState('Tapi River Basin & Low-lying Sectors');
  const [formSeverity, setFormSeverity] = useState('red'); // 'red' | 'orange' | 'green'
  const [formRadius, setFormRadius] = useState('3.5');
  const [formTargetCount, setFormTargetCount] = useState('38000');
  const [formSummary, setFormSummary] = useState('Heavy cloudburst upstream (>120mm/hr) predicted. Flood inundation likely in residential sectors within 2 hours.');
  const [formInstructions, setFormInstructions] = useState('Move to upper floors or designated relief camps immediately.\nDo not cross submerged roads.\nTurn off LPG cylinders and main power.');
  const [formAction, setFormAction] = useState('Mandatory evacuation of ground floors to Govt High School Camp.');

  // Channels state
  const [channelInApp, setChannelInApp] = useState(true);
  const [channelPush, setChannelPush] = useState(true);
  const [channelStrobe, setChannelStrobe] = useState(true);
  const [channelHaptic, setChannelHaptic] = useState(true);
  const [channelSMS, setChannelSMS] = useState(true);

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();

    const channelsList = [];
    if (channelInApp) channelsList.push('In-App Broadcast');
    if (channelPush) channelsList.push('Push Notification');
    if (channelStrobe) channelsList.push('Visual Banner & Strobe');
    if (channelHaptic) channelsList.push('Haptic Vibration');
    if (channelSMS) channelsList.push('Cellular SMS Fallback');

    const newAlert = {
      id: `WARN-2026-0${Math.floor(Math.random() * 80) + 50}`,
      title: formTitle,
      zone: formZone,
      severity: formSeverity,
      severityLabel: formSeverity === 'red' ? 'Critical Emergency Alert' : formSeverity === 'orange' ? 'Warning' : 'Awareness Advisory',
      source: 'District Command Centre + IMD Weather Radar',
      issuedAt: new Date().toISOString(),
      validUntil: 'Next 24 Hours',
      affectedRadiusKm: parseFloat(formRadius) || 3.0,
      estimatedTargetCitizens: parseInt(formTargetCount) || 35000,
      summary: formSummary,
      safetyInstructions: formInstructions.split('\n').filter(Boolean),
      recommendedAction: formAction,
      channels: channelsList,
      status: 'Active Broadcast'
    };

    if (onBroadcastAlert) {
      onBroadcastAlert(newAlert);
    }

    setSuccessBroadcastMsg(`Alert "${formTitle}" successfully pushed to ${parseInt(formTargetCount).toLocaleString()} citizens in ${formZone}!`);
    setShowCreateModal(false);

    setTimeout(() => {
      setSuccessBroadcastMsg(null);
    }, 6000);
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'red':
        return <span className="admin-badge badge-red">Level 3 Critical Alert</span>;
      case 'orange':
        return <span className="admin-badge badge-orange">Level 2 Warning</span>;
      case 'green':
      default:
        return <span className="admin-badge badge-green">Level 1 Awareness</span>;
    }
  };

  return (
    <div className="admin-view-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-title-row">
            <h1 className="admin-title">Early Warnings & Targeted Alerts</h1>
            <span className="admin-badge badge-red">Multi-Channel Dissemination</span>
          </div>
          <p className="admin-subtitle">
            Forecast-driven risk mitigation, localized zone broadcasts, and multi-mode emergency warnings.
          </p>
        </div>

        <div className="admin-header-right">
          <button 
            className="admin-btn admin-btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <BellRing size={14} />
            <span>Compose & Broadcast Alert</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successBroadcastMsg && (
        <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.35)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', color: '#ffffff' }}>
          <CheckCircle2 size={20} color="#22c55e" />
          <span style={{ fontSize: '13px', fontWeight: '600' }}>{successBroadcastMsg}</span>
        </div>
      )}

      {/* Incoming Environmental Feeds & Forecast Inputs */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title-group">
            <Radio size={18} color="#60a5fa" />
            <div>
              <h2 className="admin-card-title">Live Risk Feeds & Official Meteorological Forecasts</h2>
              <div className="admin-card-subtitle">Aggregated sensor telemetry & official bulletins from IMD, CWC & NCS</div>
            </div>
          </div>
        </div>

        <div className="sub-grid-3">
          <div className="sub-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#71717a' }}>IMD DOPPLER RADAR</span>
              <span className="admin-badge badge-red">Flash Flood Risk</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginTop: '6px' }}>
              Heavy Inundation Warning (>140mm)
            </div>
            <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '4px 0 0' }}>
              Cloudburst band centered over Surat West basin. River discharge peaking at 2.4 lakh cusecs.
            </p>
          </div>

          <div className="sub-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#71717a' }}>COASTAL STORM RADAR</span>
              <span className="admin-badge badge-orange">Cyclone Advisory</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginTop: '6px' }}>
              Tidal Surge 1.2m Above Normal
            </div>
            <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '4px 0 0' }}>
              Wind speeds gusting 85 km/h along Dumas coastal perimeter. High tide at 16:30 hrs.
            </p>
          </div>

          <div className="sub-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#71717a' }}>SEISMIC NETWORK</span>
              <span className="admin-badge badge-green">Normal / Quiet</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginTop: '6px' }}>
              No Major Aftershocks Recorded
            </div>
            <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '4px 0 0' }}>
              Sector 4 collapse structural perimeter stabilized; minor ground tremor threshold normal.
            </p>
          </div>
        </div>
      </div>

      {/* Active Broadcasts List */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-card-title-group">
            <ShieldAlert size={18} color="#ef4444" />
            <div>
              <h2 className="admin-card-title">Active Public Safety Broadcasts</h2>
              <div className="admin-card-subtitle">Currently live on citizen mobile devices, SMS nodes, and municipal mesh</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {alerts.map((alert) => (
            <div key={alert.id} className="priority-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '11px', color: '#71717a', fontFamily: 'monospace' }}>{alert.id}</span>
                    {getSeverityBadge(alert.severity)}
                    <span className="admin-badge badge-gray">{alert.status}</span>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#ffffff', margin: '4px 0 2px' }}>
                    {alert.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                    Zone: <strong style={{ color: '#ffffff' }}>{alert.zone}</strong> • Radius: <strong>{alert.affectedRadiusKm} km</strong> • Target: <strong>{alert.estimatedTargetCitizens.toLocaleString()} Citizens</strong>
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: '#71717a' }}>
                  Source: {alert.source}
                </div>
              </div>

              {/* Summary */}
              <div style={{ fontSize: '13px', color: '#e4e4e7', background: 'rgba(255,255,255,0.02)', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <strong>Situation Assessment:</strong> {alert.summary}
              </div>

              {/* Safety Instructions */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#a1a1aa', marginBottom: '6px' }}>
                  Safety Directives Broadcasted to Public:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#d4d4d8', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {alert.safetyInstructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              </div>

              {/* Channels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#71717a' }}>Channels:</span>
                  {alert.channels.map((ch, idx) => (
                    <span key={idx} className="admin-badge badge-blue" style={{ fontSize: '10px' }}>
                      {ch}
                    </span>
                  ))}
                </div>

                <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: '600' }}>
                  Action: {alert.recommendedAction}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast Alert Composer Modal */}
      {showCreateModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box" style={{ maxWidth: '640px' }}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={18} color="#ef4444" />
                <h3 className="admin-modal-title">Broadcast Targeted Disaster Alert</h3>
              </div>
              <button 
                className="admin-btn admin-btn-outline admin-btn-sm"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBroadcastSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Alert Headline</label>
                <input 
                  type="text"
                  className="admin-form-input"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div className="sub-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Target Zone</label>
                  <select 
                    className="admin-form-select"
                    value={formZone}
                    onChange={(e) => setFormZone(e.target.value)}
                  >
                    <option value="Tapi River Basin & Low-lying Sectors">Tapi River Basin & Low-lying Sectors</option>
                    <option value="Coastal Districts & Dumas Seafront">Coastal Districts & Dumas Seafront</option>
                    <option value="Sector 4 Industrial Zone B">Sector 4 Industrial Zone B</option>
                    <option value="North Ghats Bypass KM-14">North Ghats Bypass KM-14</option>
                    <option value="All City Sectors (Surat Metro)">All City Sectors (Surat Metro)</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Alert Severity Level</label>
                  <select 
                    className="admin-form-select"
                    value={formSeverity}
                    onChange={(e) => setFormSeverity(e.target.value)}
                  >
                    <option value="red">Red (Critical Emergency Alert)</option>
                    <option value="orange">Orange (High Attention Warning)</option>
                    <option value="green">Green (Awareness Advisory)</option>
                  </select>
                </div>
              </div>

              <div className="sub-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Target Radius (km)</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    min="0.5"
                    className="admin-form-input"
                    value={formRadius}
                    onChange={(e) => setFormRadius(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Estimated Target Citizens</label>
                  <input 
                    type="number"
                    className="admin-form-input"
                    value={formTargetCount}
                    onChange={(e) => setFormTargetCount(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">What is Happening / Situation Assessment</label>
                <textarea 
                  className="admin-form-textarea"
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Public Safety Instructions (One per line)</label>
                <textarea 
                  className="admin-form-textarea"
                  value={formInstructions}
                  onChange={(e) => setFormInstructions(e.target.value)}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Recommended Action</label>
                <input 
                  type="text"
                  className="admin-form-input"
                  value={formAction}
                  onChange={(e) => setFormAction(e.target.value)}
                  required
                />
              </div>

              {/* Supported Broadcast Channels */}
              <div>
                <label className="admin-form-label" style={{ marginBottom: '8px', display: 'block' }}>
                  Supported Dissemination Channels:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12px', color: '#ffffff' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={channelInApp} onChange={(e) => setChannelInApp(e.target.checked)} />
                    <span>In-App Banner</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={channelPush} onChange={(e) => setChannelPush(e.target.checked)} />
                    <span>Push Notification</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={channelStrobe} onChange={(e) => setChannelStrobe(e.target.checked)} />
                    <span>High Audio Strobe</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={channelHaptic} onChange={(e) => setChannelHaptic(e.target.checked)} />
                    <span>Haptic Vibration</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={channelSMS} onChange={(e) => setChannelSMS(e.target.checked)} />
                    <span>Cellular SMS</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-danger"
                  style={{ fontWeight: '700' }}
                >
                  <Send size={14} />
                  <span>Transmit Broadcast Alert</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
