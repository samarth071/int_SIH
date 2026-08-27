import { SEVERITY_LEVELS } from '../constants/index.js';
import { AlertIcon, ClockIcon, ChevronRightIcon } from './icons.jsx';
import './AlertCard.css';

function getSeverityStyle(severity) {
  return SEVERITY_LEVELS.find((s) => s.id === severity) ?? SEVERITY_LEVELS[0];
}

function formatTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMin = Math.round((now - date) / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function AlertCard({ alert, onClick }) {
  const sev = getSeverityStyle(alert.severity);

  return (
    <button
      className="alert-card"
      onClick={onClick}
      aria-label={`${alert.title} — ${sev.label} severity`}
    >
      <div className="alert-card-top">
        <span className="cp-badge" style={{ background: sev.bg, color: sev.color }}>
          <AlertIcon size={10} />
          {sev.label}
        </span>
        <span className="alert-card-time">
          <ClockIcon size={12} />
          {formatTime(alert.updatedAt)}
        </span>
      </div>

      <h3 className="alert-card-title">{alert.title}</h3>
      <p className="alert-card-area">{alert.area}</p>
      <p className="alert-card-message">{alert.message}</p>

      <div className="alert-card-footer">
        <span className="alert-card-issuer">{alert.issuedBy}</span>
        <span className="alert-card-action">
          View details <ChevronRightIcon size={14} />
        </span>
      </div>
    </button>
  );
}
