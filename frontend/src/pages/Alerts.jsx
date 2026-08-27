import { useState } from 'react';
import { mockAlerts } from '../data/mockAlerts.js';
import { SEVERITY_LEVELS } from '../constants/index.js';
import { AlertIcon, ClockIcon, ShieldIcon } from '../components/icons.jsx';
import './Alerts.css';

function getSeverity(id) {
  return SEVERITY_LEVELS.find((s) => s.id === id) ?? SEVERITY_LEVELS[0];
}

function formatTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMin = Math.round((now - date) / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default function Alerts() {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('active');
  const [expanded, setExpanded] = useState(null);

  const filtered = mockAlerts.filter((a) => {
    const matchSev = filterSeverity === 'all' || a.severity === filterSeverity;
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && a.isActive) ||
      (filterStatus === 'inactive' && !a.isActive);
    return matchSev && matchStatus;
  });

  return (
    <div className="cp-page-wide alerts-page">
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="cp-page-header">
          <h1 className="cp-page-title">Disaster Alerts</h1>
          <p className="cp-page-subtitle">
            Official alerts and warnings from NDMA, IMD, and state disaster authorities.
          </p>
        </div>

        {/* Filters */}
        <div className="alerts-filters">
          <div>
            <p className="cp-label" style={{ marginBottom: '8px' }}>Status</p>
            <div className="shelter-filter-chips">
              {[
                { id: 'active', label: 'Active' },
                { id: 'all', label: 'All' },
                { id: 'inactive', label: 'Past' },
              ].map((f) => (
                <button
                  key={f.id}
                  className={`shelter-filter-chip ${filterStatus === f.id ? 'active' : ''}`}
                  onClick={() => setFilterStatus(f.id)}
                  aria-pressed={filterStatus === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="cp-label" style={{ marginBottom: '8px' }}>Severity</p>
            <div className="shelter-filter-chips">
              <button
                className={`shelter-filter-chip ${filterSeverity === 'all' ? 'active' : ''}`}
                onClick={() => setFilterSeverity('all')}
              >
                All
              </button>
              {SEVERITY_LEVELS.map((s) => (
                <button
                  key={s.id}
                  className={`shelter-filter-chip ${filterSeverity === s.id ? 'active' : ''}`}
                  onClick={() => setFilterSeverity(s.id)}
                  style={filterSeverity === s.id ? { background: s.bg, color: s.color, borderColor: s.color } : {}}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alert count */}
        <p className="alerts-count">
          Showing {filtered.length} alert{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Alert list */}
        {filtered.length === 0 ? (
          <div className="cp-empty">
            <ShieldIcon size={36} />
            <p>No alerts match the selected filters.</p>
          </div>
        ) : (
          <div className="alerts-list">
            {filtered.map((alert) => {
              const sev = getSeverity(alert.severity);
              const isOpen = expanded === alert.id;

              return (
                <div
                  key={alert.id}
                  className={`alert-detail-card ${!alert.isActive ? 'alert-inactive' : ''}`}
                >
                  <button
                    className="alert-detail-header"
                    onClick={() => setExpanded(isOpen ? null : alert.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="alert-detail-header-left">
                      <span
                        className="cp-badge"
                        style={{ background: sev.bg, color: sev.color }}
                      >
                        <AlertIcon size={10} />
                        {sev.label}
                      </span>
                      {!alert.isActive && (
                        <span className="cp-badge cp-badge-neutral">Past</span>
                      )}
                    </div>
                    <span className="alert-detail-time">
                      <ClockIcon size={12} />
                      {formatTime(alert.updatedAt)}
                    </span>
                  </button>

                  <div className="alert-detail-body">
                    <h3 className="alert-detail-title">{alert.title}</h3>
                    <p className="alert-detail-area">{alert.area}</p>
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="alert-detail-expanded">
                      <p className="alert-detail-message">{alert.message}</p>

                      {alert.safetyTip && (
                        <div className="alert-safety-tip">
                          <ShieldIcon size={14} />
                          <div>
                            <strong>Safety Tip</strong>
                            <p>{alert.safetyTip}</p>
                          </div>
                        </div>
                      )}

                      <p className="alert-issuer">Issued by: {alert.issuedBy}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
