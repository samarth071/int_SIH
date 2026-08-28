import { useState, useEffect } from 'react';
import { mockMyRequests } from '../data/mockReports.js';
import { getStoredSosAlerts } from '../lib/api.js';
import StatusTimeline from '../components/StatusTimeline.jsx';
import { ArrowLeftIcon, ClockIcon, LocationIcon, FileIcon, PhoneIcon } from '../components/icons.jsx';
import './MyRequests.css';

const TYPE_LABELS = {
  sos: 'SOS Emergency',
  report: 'Incident Report',
};

const TYPE_ICON_MAP = {
  sos: PhoneIcon,
  report: FileIcon,
};

function formatDate(isoString) {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return 'Just now';
  }
}

export default function MyRequests({ navigate }) {
  const [requests, setRequests] = useState(() => {
    const stored = getStoredSosAlerts();
    const storedIds = new Set(stored.map((s) => s.id));
    const uniqueMock = mockMyRequests.filter((m) => !storedIds.has(m.id));
    return [...stored, ...uniqueMock];
  });

  useEffect(() => {
    function handleNewSos(e) {
      if (e.detail) {
        setRequests((prev) => {
          const filtered = prev.filter((r) => r.id !== e.detail.id);
          return [e.detail, ...filtered];
        });
      }
    }

    window.addEventListener('sosAlertCreated', handleNewSos);
    return () => window.removeEventListener('sosAlertCreated', handleNewSos);
  }, []);

  if (requests.length === 0) {
    return (
      <div className="cp-page">
        <button className="sos-back-btn" onClick={() => navigate('home')}>
          <ArrowLeftIcon size={18} /> Back
        </button>
        <div className="cp-empty" style={{ marginTop: '48px' }}>
          <FileIcon size={40} />
          <p>You have no emergency requests yet.</p>
          <button className="cp-btn cp-btn-primary" onClick={() => navigate('sos')}>
            Send SOS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-page">
      <button className="sos-back-btn" onClick={() => navigate('home')}>
        <ArrowLeftIcon size={18} /> Back
      </button>

      <div className="cp-page-header">
        <h1 className="cp-page-title">My Emergency Requests</h1>
        <p className="cp-page-subtitle">
          Track the status of your SOS requests and incident reports.
        </p>
      </div>

      <div className="myrequests-list">
        {requests.map((req) => {
          const TypeIcon = TYPE_ICON_MAP[req.type] || FileIcon;
          const isResolved = req.currentStatus === 'resolved';

          return (
            <div key={req.id} className="myrequest-card cp-card">
              {/* Card header */}
              <div className="myrequest-header">
                <div className="myrequest-icon-wrap">
                  <TypeIcon size={20} />
                </div>
                <div className="myrequest-meta">
                  <h3 className="myrequest-type">
                    {TYPE_LABELS[req.type] || 'Request'}
                  </h3>
                  <p className="myrequest-id">{req.id}</p>
                </div>
                <span
                  className={`cp-badge ${isResolved ? 'cp-badge-success' : 'cp-badge-info'}`}
                >
                  {isResolved ? 'Resolved' : 'Active'}
                </span>
              </div>

              {/* Details */}
              <div className="myrequest-details">
                <div className="myrequest-detail-row">
                  <FileIcon size={13} />
                  <span>
                    <strong>Emergency:</strong>{' '}
                    {req.disasterType.replace('_', ' ')}
                  </span>
                </div>
                <div className="myrequest-detail-row">
                  <LocationIcon size={13} />
                  <span>{req.location}</span>
                </div>
                <div className="myrequest-detail-row">
                  <ClockIcon size={13} />
                  <span>{formatDate(req.submittedAt)}</span>
                </div>
                {req.responder && (
                  <div className="myrequest-detail-row">
                    <PhoneIcon size={13} />
                    <span>
                      <strong>Assigned to:</strong> {req.responder}
                    </span>
                  </div>
                )}
                {req.eta && !isResolved && (
                  <div className="myrequest-eta">
                    ETA: {req.eta}
                  </div>
                )}
              </div>

              <p className="myrequest-desc">{req.description}</p>

              <hr className="cp-divider" style={{ margin: '16px 0' }} />

              {/* Timeline */}
              <h4 className="myrequest-timeline-label">Request Status</h4>
              <StatusTimeline
                currentStatus={req.currentStatus}
                statusHistory={req.statusHistory}
              />
            </div>
          );
        })}
      </div>

      <div className="cp-banner cp-banner-info" style={{ marginTop: '8px' }}>
        <span>
          For urgent assistance, call the National Emergency Number <strong>112</strong> or the Disaster Helpline <strong>1078</strong>.
        </span>
      </div>
    </div>
  );
}
