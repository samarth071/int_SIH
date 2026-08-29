import React from 'react';
import { Search, Bell, AlertTriangle, Radio } from 'lucide-react';

export default function Topbar({ 
  activeTab, 
  onReportSOS, 
  onNavigate,
  unreadCount = 0 
}) {
  const getBreadcrumbs = () => {
    switch (activeTab) {
      case 'dashboard':
        return ['Disaster Command', 'Live Overview'];
      case 'incidents':
        return ['Incident Management', 'Incident Directory'];
      case 'incident-details':
        return ['Incident Management', '360° Radius Situational Intelligence'];
      case 'map':
        return ['Spatial Operations', 'Tactical Disaster Map'];
      case 'teams':
        return ['Responder Operations', 'Response Team Fleet'];
      case 'volunteers-orgs':
        return ['Civil Society', 'Volunteers & NGO Partners'];
      case 'shelters-relief':
        return ['Logistics & Supply', 'Shelters & Relief Distribution'];
      case 'alerts':
        return ['Risk & Warning', 'Early Warnings & Targeted Alerts'];
      case 'notifications':
        return ['Command Center', 'Notification Centre'];
      default:
        return ['Disaster Command', 'Overview'];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header style={styles.topbar}>
      {/* Dynamic Breadcrumbs */}
      <div style={styles.breadcrumbs}>
        <span style={styles.breadcrumbItem}>{breadcrumbs[0]}</span>
        <span style={styles.separator}>/</span>
        <span style={{ ...styles.breadcrumbItem, ...styles.breadcrumbActive }}>
          {breadcrumbs[1]}
        </span>
      </div>

      {/* Right Controls */}
      <div style={styles.controls}>
        {/* Alerts Bell */}
        <div style={styles.iconButtonContainer}>
          <button 
            style={styles.iconButton}
            onClick={() => onNavigate && onNavigate('notifications')}
            title="Notification Centre"
          >
            <Bell size={17} color="#ffffff" />
            {unreadCount > 0 && (
              <span style={styles.alertBadge}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* SOS Action Button */}
        <button style={styles.sosButton} onClick={onReportSOS}>
          <AlertTriangle size={15} style={{ marginRight: '6px' }} />
          <span>Broadcast SOS</span>
        </button>
      </div>
    </header>
  );
}

const styles = {
  topbar: {
    height: '68px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    backgroundColor: '#090a10',
    flexShrink: 0
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: '500'
  },
  breadcrumbItem: {
    color: '#71717a'
  },
  breadcrumbActive: {
    color: '#ffffff',
    fontWeight: '600'
  },
  separator: {
    color: '#3f3f46'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  iconButtonContainer: {
    position: 'relative'
  },
  iconButton: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease'
  },
  alertBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    minWidth: '18px',
    height: '18px',
    padding: '0 4px',
    borderRadius: '9px',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: '10px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(239, 68, 68, 0.5)'
  },
  sosButton: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    height: '38px',
    padding: '0 16px',
    fontSize: '12px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)'
  }
};
