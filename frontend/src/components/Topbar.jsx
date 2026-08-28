import React from 'react';
import { Search, Bell, AlertTriangle, Smartphone } from 'lucide-react';
import { simulateMobileSosAlert } from '../lib/api';

export default function Topbar({ activeTab, onReportSOS }) {
  const getBreadcrumbs = () => {
    switch (activeTab) {
      case 'dashboard':
        return ['Disaster Operations', 'Dashboard'];
      case 'responders':
        return ['Disaster Operations', 'Responders & Operations'];
      case 'supplies':
        return ['Resource Management', 'Relief & Supply Status'];
      case 'comms':
        return ['Network Operations', 'Communications & Mesh'];
      case 'analytics':
        return ['Intelligence & Audit', 'Analytics & Reports'];
      default:
        return ['Disaster Operations', 'Command Center'];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div style={styles.topbar}>
      {/* Breadcrumbs */}
      <div style={styles.breadcrumbs}>
        <span style={styles.breadcrumbItem}>{breadcrumbs[0]}</span>
        <span style={styles.separator}>/</span>
        <span style={{ ...styles.breadcrumbItem, ...styles.breadcrumbActive }}>
          {breadcrumbs[1]}
        </span>
      </div>

      {/* Right Controls */}
      <div style={styles.controls}>
        {/* Search */}
        <div style={styles.searchContainer}>
          <Search size={16} style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search incidents, nodes, shelters..." 
            style={styles.searchInput}
          />
        </div>

        {/* Alerts Bell */}
        <div style={styles.iconButtonContainer}>
          <button style={styles.iconButton}>
            <Bell size={18} color="#a1a1aa" />
            <span style={styles.alertBadge}></span>
          </button>
        </div>

        {/* Test Mobile SOS Alert Button */}
        <button
          style={{
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '18px',
            height: '36px',
            padding: '0 14px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
          }}
          onClick={() => simulateMobileSosAlert()}
          title="Simulate receiving an SOS alert from mobile app"
        >
          <Smartphone size={14} style={{ marginRight: '6px' }} />
          Test Mobile SOS
        </button>

        {/* SOS Action Button */}
        <button style={styles.sosButton} onClick={onReportSOS}>
          <AlertTriangle size={15} style={{ marginRight: '6px' }} />
          Report SOS
        </button>
      </div>
    </div>
  );
}

const styles = {
  topbar: {
    height: '72px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    backgroundColor: '#09090b',
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
    color: '#ffffff'
  },
  separator: {
    color: '#3f3f46'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: '#71717a'
  },
  searchInput: {
    width: '280px',
    height: '36px',
    borderRadius: '18px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    paddingLeft: '38px',
    paddingRight: '16px',
    color: '#ffffff',
    fontSize: '12px',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  iconButtonContainer: {
    position: 'relative'
  },
  iconButton: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative'
  },
  alertBadge: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#ef4444'
  },
  sosButton: {
    backgroundColor: '#ffffff',
    color: '#0c0c0e',
    border: 'none',
    borderRadius: '18px',
    height: '36px',
    padding: '0 16px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)'
  }
};
