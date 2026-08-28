import { ChevronRightIcon } from './icons.jsx';
import './QuickActionCard.css';

/**
 * QuickActionCard — used on the home page for quick navigation actions.
 * Props:
 *   icon: ReactNode (SVG component)
 *   label: string
 *   description: string
 *   onClick: function
 *   variant: 'default' | 'danger' | 'warning' | 'success'
 */
export default function QuickActionCard({
  icon,
  label,
  description,
  onClick,
  variant = 'default',
}) {
  return (
    <button
      className={`quick-action-card quick-action-card--${variant}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="quick-action-icon">{icon}</span>
      <div className="quick-action-content">
        <span className="quick-action-label">{label}</span>
        {description && (
          <span className="quick-action-desc">{description}</span>
        )}
      </div>
      <ChevronRightIcon size={16} />
    </button>
  );
}
