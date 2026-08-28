import { REQUEST_STATUSES } from '../constants/index.js';
import { CheckCircleIcon, ClockIcon } from './icons.jsx';
import './StatusTimeline.css';

const STATUS_ORDER = REQUEST_STATUSES.map((s) => s.id);

export default function StatusTimeline({ currentStatus, statusHistory = [] }) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  function getStepState(index) {
    if (index < currentIndex) return 'done';
    if (index === currentIndex) return 'current';
    return 'pending';
  }

  function getTimestamp(statusId) {
    const entry = statusHistory.find((h) => h.status === statusId);
    if (!entry) return null;
    const d = new Date(entry.timestamp);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) +
      ', ' +
      d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }

  return (
    <div className="status-timeline" role="list" aria-label="Request status timeline">
      {REQUEST_STATUSES.map((step, index) => {
        const state = getStepState(index);
        const ts = getTimestamp(step.id);

        return (
          <div
            key={step.id}
            className={`timeline-step timeline-step--${state}`}
            role="listitem"
          >
            {/* Connector line */}
            {index < REQUEST_STATUSES.length - 1 && (
              <div className={`timeline-connector ${state === 'done' ? 'done' : ''}`} />
            )}

            {/* Icon */}
            <div className="timeline-dot">
              {state === 'done' ? (
                <CheckCircleIcon size={18} />
              ) : state === 'current' ? (
                <div className="timeline-pulse" aria-label="Current step" />
              ) : (
                <div className="timeline-empty" />
              )}
            </div>

            {/* Content */}
            <div className="timeline-content">
              <span className="timeline-label">{step.label}</span>
              {state !== 'pending' && (
                <span className="timeline-desc">{step.description}</span>
              )}
              {ts && (
                <span className="timeline-time">
                  <ClockIcon size={11} />
                  {ts}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
