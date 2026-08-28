import { useState } from 'react';
import { getActiveAlerts } from '../data/mockAlerts.js';
import { mockShelters, SHELTER_STATUS, SHELTER_TYPES } from '../data/mockShelters.js';
import { useGeolocation } from '../hooks/useGeolocation.js';
import AlertCard from '../components/AlertCard.jsx';
import QuickActionCard from '../components/QuickActionCard.jsx';
import {
  LocationIcon,
  FileIcon,
  UserIcon,
  HeartPlusIcon,
  ShieldIcon,
  AlertIcon,
  PhoneIcon,
  CheckCircleIcon,
  CloseIcon,
  BookIcon,
  WavesIcon,
  MountainIcon,
  SendIcon,
} from '../components/icons.jsx';
import './Home.css';

const activeAlerts = getActiveAlerts();
const criticalAlerts = activeAlerts.filter(
  (a) => a.severity === 'critical' || a.severity === 'high'
);

const COMPACT_SAFETY_TIPS = {
  flood: {
    title: 'Flood Safety',
    Icon: WavesIcon,
    color: '#0891B2',
    bg: '#ECFEFF',
    dos: [
      'Move immediately to higher ground or upper floors.',
      'Turn off the main electricity switch and gas supply.',
      'Keep your emergency go-bag and clean drinking water ready.',
    ],
    donts: [
      'Never walk, swim, or drive through moving floodwaters.',
      'Do not touch fallen electric poles, cables, or damaged wiring.',
      'Do not consume food or water exposed to floodwater.',
    ],
  },
  earthquake: {
    title: 'Earthquake Safety',
    Icon: MountainIcon,
    color: '#D97706',
    bg: '#FFFBEB',
    dos: [
      'Drop, Cover, and Hold On under a sturdy desk or table.',
      'Stay away from windows, exterior walls, and tall glass items.',
      'If outside, move to open ground away from power lines and buildings.',
    ],
    donts: [
      'Do not use elevators during or immediately after the tremor.',
      'Do not run outdoors while shaking is ongoing — falling debris is dangerous.',
      'Do not light matches or use open flames (check for gas leaks first).',
    ],
  },
  landslide: {
    title: 'Landslide Safety',
    Icon: MountainIcon,
    color: '#92400E',
    bg: '#FEF3C7',
    dos: [
      'Evacuate immediately if you notice slope cracking or unusual rumbling.',
      'Stay alert during continuous heavy rainfall in hilly regions.',
      'Move away from the path of landslide flow to stable, higher ground.',
    ],
    donts: [
      'Do not cross or inspect a freshly slipped slope area.',
      'Do not stay in low-lying channels or valleys during heavy rain.',
      'Do not ignore sudden changes in local drainage or stream flow.',
    ],
  },
};

export default function Home({ navigate }) {
  // Modal state for SOS confirmation and active state
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [sosStatus, setSosStatus] = useState('confirm'); // 'confirm' | 'sending' | 'active'
  const [sosReqId, setSosReqId] = useState('');
  const [activeGuideTab, setActiveGuideTab] = useState('flood');

  const { location, loading: locLoading, getLocation } = useGeolocation();

  function handleOpenSos() {
    setIsSosModalOpen(true);
    setSosStatus('confirm');
    getLocation(); // detect GPS coordinates early
  }

  function handleConfirmSos() {
    setSosStatus('sending');
    setTimeout(() => {
      setSosReqId(`REQ-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`);
      setSosStatus('active');
    }, 1200);
  }

  function handleCloseModal() {
    setIsSosModalOpen(false);
    setSosStatus('confirm');
  }

  const QUICK_ACTIONS = [
    {
      icon: <PhoneIcon size={20} />,
      label: 'Save Me SOS',
      description: 'One-tap emergency alert',
      variant: 'danger',
      onClick: handleOpenSos,
    },
    {
      icon: <ShieldIcon size={20} />,
      label: 'Nearby Shelters',
      description: 'Find relief camps & beds',
      variant: 'default',
      onClick: () => navigate('shelters'),
    },
    {
      icon: <UserIcon size={20} />,
      label: 'Report Missing Person',
      description: 'Search & report displaced',
      variant: 'default',
      onClick: () => navigate('missing'),
    },
    {
      icon: <BookIcon size={20} />,
      label: 'Safety Instructions',
      description: 'Do\'s and don\'ts for disasters',
      variant: 'default',
      onClick: () => navigate('safety-guide'),
    },
    {
      icon: <FileIcon size={20} />,
      label: 'Report Incident',
      description: 'Report local hazards & damage',
      variant: 'warning',
      onClick: () => navigate('report'),
    },
    {
      icon: <HeartPlusIcon size={20} />,
      label: 'Medical Support',
      description: 'AI-assisted first-aid triage',
      variant: 'success',
      onClick: () => navigate('medical'),
    },
  ];

  const currentGuide = COMPACT_SAFETY_TIPS[activeGuideTab];

  return (
    <div className="home-page">
      {/* 1. Active alert top banner if high/critical alert exists */}
      {criticalAlerts.length > 0 && (
        <div className="home-alert-banner" role="alert">
          <div className="home-alert-inner">
            <AlertIcon size={16} />
            <span>
              <strong>Active Emergency Alert:</strong> {criticalAlerts[0].title} — {criticalAlerts[0].area}
            </span>
            <button
              className="home-alert-link"
              onClick={() => navigate('alerts')}
            >
              View details &rarr;
            </button>
          </div>
        </div>
      )}

      <div className="cp-page-wide">
        {/* 2. Safety Status Header Bar */}
        <section className="home-status-bar" aria-label="Citizen Status Overview">
          <div className="home-status-item">
            <span className={`status-pill ${sosStatus === 'active' ? 'status-pill--emergency' : 'status-pill--safe'}`}>
              <span className="status-indicator-dot" />
              {sosStatus === 'active' ? 'SOS Active • Alert Sent' : 'Status: You are currently safe'}
            </span>
          </div>

          <div className="home-status-meta">
            <span className="status-meta-text">
              <LocationIcon size={14} />
              {location?.address ? location.address : 'Surat, Gujarat • Monitored by NDMA/SDMA'}
            </span>
            <span className="status-helpline">
              Helpline: <a href="tel:112">112</a> &nbsp;|&nbsp; Disaster: <a href="tel:1078">1078</a>
            </span>
          </div>
        </section>

        {/* 3. Primary Emergency SOS Card */}
        <section className="home-sos-section" aria-label="Emergency SOS Action">
          <div className="home-sos-card">
            <div className="home-sos-badge-row">
              <span className="home-sos-badge">
                <AlertIcon size={14} />
                High Priority Action
              </span>
              <span className="home-sos-note-text">
                Live location sharing enabled
              </span>
            </div>

            <div className="home-sos-main-content">
              <div className="home-sos-text-group">
                <h1 className="home-sos-title">Emergency SOS</h1>
                <p className="home-sos-description">
                  In immediate danger? An emergency alert and your current real-time GPS location will be shared immediately with disaster response authorities.
                </p>
                <div className="home-sos-tags">
                  <span className="sos-pill-tag">NDMA / SDRF Dispatch</span>
                  <span className="sos-pill-tag">Police &amp; Fire Services</span>
                  <span className="sos-pill-tag">Automated Location Broadcast</span>
                </div>
              </div>

              <div className="home-sos-action-area">
                <button
                  id="activate-sos-btn"
                  className="home-activate-sos-button"
                  onClick={handleOpenSos}
                  aria-label="Activate Emergency SOS"
                >
                  <span className="sos-btn-pulse-ring" />
                  <span className="sos-btn-inner-icon">
                    <PhoneIcon size={26} />
                  </span>
                  <span className="sos-btn-text">ACTIVATE SOS</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Quick Actions */}
        <section className="home-section" aria-labelledby="quick-actions-heading">
          <div className="home-section-header">
            <div>
              <h2 id="quick-actions-heading" className="cp-section-title" style={{ margin: 0 }}>
                Quick Actions
              </h2>
              <p className="cp-text-sm cp-text-secondary">
                Essential tools and emergency assistance services
              </p>
            </div>
          </div>

          <div className="home-actions-grid">
            {QUICK_ACTIONS.map((action, idx) => (
              <QuickActionCard
                key={idx}
                icon={action.icon}
                label={action.label}
                description={action.description}
                variant={action.variant}
                onClick={action.onClick}
              />
            ))}
          </div>
        </section>

        <hr className="cp-divider" />

        {/* 5. Nearby Help & Relief Camps Preview */}
        <section className="home-section" aria-labelledby="nearby-help-heading">
          <div className="home-section-header">
            <div>
              <h2 id="nearby-help-heading" className="cp-section-title" style={{ margin: 0 }}>
                Nearby Help &amp; Shelters
              </h2>
              <p className="cp-text-sm cp-text-secondary">
                Verified relief camps, medical shelters, and supply centers near you
              </p>
            </div>
            <button
              className="cp-btn cp-btn-outline cp-btn-sm"
              onClick={() => navigate('shelters')}
            >
              View All Shelters &rarr;
            </button>
          </div>

          <div className="home-shelters-grid">
            {mockShelters.slice(0, 3).map((shelter) => {
              const statusInfo = SHELTER_STATUS[shelter.status] || SHELTER_STATUS.open;
              const pct = Math.round((shelter.occupied / shelter.capacity) * 100);

              return (
                <div key={shelter.id} className="home-shelter-card cp-card cp-card-sm">
                  <div className="home-shelter-top">
                    <div>
                      <h3 className="home-shelter-name">{shelter.name}</h3>
                      <p className="home-shelter-type">{SHELTER_TYPES[shelter.type] || shelter.type}</p>
                    </div>
                    <span
                      className="cp-badge"
                      style={{ background: statusInfo.bg, color: statusInfo.color }}
                    >
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="home-shelter-address">
                    <LocationIcon size={13} />
                    <span>{shelter.address}</span>
                    <strong className="home-shelter-dist">{shelter.distance}</strong>
                  </div>

                  <div className="home-shelter-cap">
                    <div className="home-shelter-cap-text">
                      <span>Capacity</span>
                      <span>{shelter.occupied} / {shelter.capacity} ({pct}%)</span>
                    </div>
                    <div className="shelter-cap-bar">
                      <div
                        className="shelter-cap-fill"
                        style={{
                          width: `${pct}%`,
                          background: pct >= 90 ? '#DC2626' : pct >= 70 ? '#D97706' : '#059669',
                        }}
                      />
                    </div>
                  </div>

                  <div className="home-shelter-facilities">
                    {shelter.facilities.slice(0, 3).map((f) => (
                      <span key={f} className="cp-tag">{f}</span>
                    ))}
                    {shelter.facilities.length > 3 && (
                      <span className="cp-tag">+{shelter.facilities.length - 3} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <hr className="cp-divider" />

        {/* 6. Safety Guides & Disaster Awareness (Compact Interactive) */}
        <section className="home-section" aria-labelledby="awareness-heading">
          <div className="home-section-header">
            <div>
              <h2 id="awareness-heading" className="cp-section-title" style={{ margin: 0 }}>
                Disaster Safety &amp; Awareness
              </h2>
              <p className="cp-text-sm cp-text-secondary">
                Immediate do's and don'ts for critical disaster scenarios
              </p>
            </div>
            <button
              className="cp-btn cp-btn-outline cp-btn-sm"
              onClick={() => navigate('safety-guide')}
            >
              Full Safety Guide &rarr;
            </button>
          </div>

          <div className="home-guide-container cp-card">
            {/* Disaster category tabs */}
            <div className="home-guide-tabs" role="tablist">
              {['flood', 'earthquake', 'landslide'].map((tabKey) => {
                const item = COMPACT_SAFETY_TIPS[tabKey];
                const TabIcon = item.Icon;
                const isActive = activeGuideTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    role="tab"
                    aria-selected={isActive}
                    className={`home-guide-tab ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveGuideTab(tabKey)}
                    style={isActive ? { borderColor: item.color, color: item.color } : {}}
                  >
                    <TabIcon size={16} />
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* Do's and Don'ts Split Panel */}
            <div className="home-guide-content">
              <div className="home-guide-col home-guide-col--dos">
                <div className="home-guide-col-header">
                  <CheckCircleIcon size={18} />
                  <h3>What TO DO (Essential Steps)</h3>
                </div>
                <ul className="home-guide-list">
                  {currentGuide.dos.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="home-guide-col home-guide-col--donts">
                <div className="home-guide-col-header">
                  <CloseIcon size={18} />
                  <h3>What NOT TO DO (Avoid Mistakes)</h3>
                </div>
                <ul className="home-guide-list">
                  {currentGuide.donts.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="home-guide-footer">
              <span className="cp-text-xs cp-text-muted">
                Source: NDMA &amp; SDMA Official Disaster Readiness Handbook
              </span>
              <button
                className="home-guide-link"
                onClick={() => navigate('safety-guide')}
              >
                Explore all 6 disaster guidelines &rarr;
              </button>
            </div>
          </div>
        </section>

        <hr className="cp-divider" />

        {/* 7. Recent Alerts & Updates (Clearly labelled mock/simulated) */}
        <section className="home-section" aria-labelledby="alerts-heading">
          <div className="home-section-header">
            <div>
              <h2 id="alerts-heading" className="cp-section-title" style={{ margin: 0 }}>
                Recent Alerts &amp; Updates
              </h2>
              <p className="cp-text-sm cp-text-secondary">
                Simulated official broadcast feeds for demonstration
              </p>
            </div>
            <button
              className="cp-btn cp-btn-outline cp-btn-sm"
              onClick={() => navigate('alerts')}
            >
              View All Alerts &rarr;
            </button>
          </div>

          <div className="home-alerts-list">
            {activeAlerts.slice(0, 2).map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onClick={() => navigate('alerts')}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 8. Emergency SOS Confirmation / Active Modal */}
      {isSosModalOpen && (
        <div className="sos-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="sos-modal-title">
          <div className="sos-modal-card">
            {sosStatus === 'confirm' && (
              <>
                <div className="sos-modal-header">
                  <div className="sos-modal-icon-wrap">
                    <PhoneIcon size={28} />
                  </div>
                  <div>
                    <h2 id="sos-modal-title" className="sos-modal-title">
                      Are you in immediate danger?
                    </h2>
                    <p className="sos-modal-subtitle">
                      Your emergency alert and current location will be shared with the response team.
                    </p>
                  </div>
                </div>

                <div className="sos-modal-loc-preview">
                  <LocationIcon size={16} />
                  <div>
                    <span className="sos-loc-label">Detected Location:</span>
                    <span className="sos-loc-val">
                      {locLoading
                        ? 'Locating via GPS coordinates…'
                        : location?.address || 'Udhna, Surat, Gujarat (Approx. GPS)'}
                    </span>
                  </div>
                </div>

                <div className="cp-banner cp-banner-warning" style={{ fontSize: '13px' }}>
                  <span>
                    <strong>Caution:</strong> Only trigger for genuine life-safety emergencies. Authorities will be dispatched immediately.
                  </span>
                </div>

                <div className="sos-modal-actions">
                  <button
                    className="cp-btn cp-btn-ghost cp-btn-lg"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    id="confirm-send-sos-btn"
                    className="cp-btn cp-btn-danger cp-btn-lg"
                    onClick={handleConfirmSos}
                  >
                    <SendIcon size={18} />
                    Send SOS
                  </button>
                </div>
              </>
            )}

            {sosStatus === 'sending' && (
              <div className="sos-modal-sending">
                <div className="sos-modal-pulse-loader" />
                <h2>Broadcasting SOS Alert…</h2>
                <p>Establishing connection with nearest emergency dispatch unit…</p>
              </div>
            )}

            {sosStatus === 'active' && (
              <>
                <div className="sos-modal-success-header">
                  <div className="sos-success-icon-wrap">
                    <CheckCircleIcon size={36} />
                  </div>
                  <h2 className="sos-modal-title" style={{ color: '#059669' }}>
                    SOS Alert Sent
                  </h2>
                  <p className="sos-modal-subtitle">
                    Your location has been shared. Emergency responders are being notified.
                  </p>
                </div>

                <div className="sos-active-details">
                  <div className="sos-active-row">
                    <span>Reference ID</span>
                    <strong>{sosReqId}</strong>
                  </div>
                  <div className="sos-active-row">
                    <span>Dispatch Status</span>
                    <span className="cp-badge cp-badge-info">In Progress • NDRF Team 7</span>
                  </div>
                  <div className="sos-active-row">
                    <span>GPS Coordinates</span>
                    <span>{location?.address || '21.1702° N, 72.8311° E'}</span>
                  </div>
                </div>

                <div className="sos-modal-actions">
                  <button
                    className="cp-btn cp-btn-primary cp-btn-lg cp-btn-full"
                    onClick={() => {
                      setIsSosModalOpen(false);
                      navigate('my-requests');
                    }}
                  >
                    Track Request Status
                  </button>
                  <button
                    className="cp-btn cp-btn-ghost cp-btn-full"
                    onClick={handleCloseModal}
                  >
                    Dismiss / I am Safe
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
