import React from 'react';
import { 
  LayoutDashboard, 
  AlertOctagon, 
  MapPin, 
  Shield, 
  HeartHandshake, 
  Home, 
  AlertTriangle, 
  Bell, 
  Settings, 
  HelpCircle,
  Radio
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  unreadNotifsCount = 3,
  criticalIncidentsCount = 2
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'incidents', label: 'Incidents', icon: AlertOctagon, badge: criticalIncidentsCount > 0 ? `${criticalIncidentsCount}` : null, badgeColor: '#ef4444' },
    { id: 'map', label: 'Disaster Map', icon: MapPin },
    { id: 'teams', label: 'Response Teams', icon: Shield },
    { id: 'volunteers-orgs', label: 'Volunteers & NGOs', icon: HeartHandshake },
    { id: 'shelters-relief', label: 'Shelters & Relief', icon: Home },
    { id: 'alerts', label: 'Early Warnings', icon: AlertTriangle },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : null, badgeColor: '#3b82f6' }
  ];

  return (
    <aside style={styles.sidebar}>
      {/* Brand & Command Profile Header */}
      <div style={styles.profileContainer}>
        <div style={styles.avatar}>
          <div style={styles.avatarLogo}>
            <Radio size={20} color="#ffffff" />
          </div>
          <div style={styles.statusBadge}></div>
        </div>
        <div style={styles.profileText}>
          <div style={styles.profileName}>Sanjeevani Mesh</div>
          <div style={styles.profileRole}>Disaster Command Centre</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={styles.menuContainer}>
        <div style={styles.menuHeader}>COMMAND MODULES</div>
        <nav style={styles.navList}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (activeTab === 'incident-details' && item.id === 'incidents');
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {})
                }}
              >
                <Icon size={17} style={isActive ? styles.iconActive : styles.icon} />
                <span style={styles.navLabel}>{item.label}</span>
                {item.badge && (
                  <span style={{ 
                    ...styles.badge, 
                    backgroundColor: item.badgeColor || '#ffffff',
                    color: '#ffffff'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer Card */}
      <div style={styles.systemCard}>
        <div style={styles.systemHeader}>
          <div style={styles.systemPulseWrap}>
            <span style={styles.pulseDot}></span>
            <span style={styles.systemTag}>LoRa Mesh Online</span>
          </div>
          <span style={{ fontSize: '11px', color: '#a1a1aa' }}>99.8% Sync</span>
        </div>
        <div style={styles.systemDesc}>
          142 relay nodes transmitting live sensor telemetry & citizen distress signals.
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '260px',
    height: '100vh',
    backgroundColor: '#0c0e14',
    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 14px',
    flexShrink: 0,
    zIndex: 10,
    overflowY: 'auto'
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '28px',
    padding: '0 8px'
  },
  avatar: {
    position: 'relative',
    width: '40px',
    height: '40px'
  },
  avatarLogo: {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusBadge: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    border: '2px solid #0c0e14'
  },
  profileText: {
    display: 'flex',
    flexDirection: 'column'
  },
  profileName: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: '1.2',
    letterSpacing: '-0.2px'
  },
  profileRole: {
    fontSize: '11px',
    color: '#71717a',
    marginTop: '2px'
  },
  menuContainer: {
    marginBottom: 'auto'
  },
  menuHeader: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#52525b',
    marginBottom: '10px',
    paddingLeft: '12px'
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#a1a1aa',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
    width: '100%'
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    fontWeight: '600'
  },
  icon: {
    color: '#71717a',
    transition: 'color 0.15s ease',
    flexShrink: 0
  },
  iconActive: {
    color: '#ffffff',
    flexShrink: 0
  },
  navLabel: {
    fontSize: '13px',
    fontWeight: '500',
    flexGrow: 1
  },
  badge: {
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 7px',
    borderRadius: '10px',
    minWidth: '18px',
    textAlign: 'center'
  },
  systemCard: {
    marginTop: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  systemHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  systemPulseWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  pulseDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#22c55e'
  },
  systemTag: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#ffffff'
  },
  systemDesc: {
    fontSize: '11px',
    color: '#71717a',
    lineHeight: '1.4'
  }
};
