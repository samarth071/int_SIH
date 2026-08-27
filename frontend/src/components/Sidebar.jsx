import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Radio, 
  Activity, 
  Settings, 
  ShieldCheck, 
  HelpCircle,
  Cpu
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'responders', label: 'Responders & Ops', icon: Users },
    { id: 'supplies', label: 'Relief & Supplies', icon: Package },
    { id: 'comms', label: 'Communications', icon: Radio },
    { id: 'analytics', label: 'Analytics & Audit', icon: ShieldCheck }
  ];

  return (
    <div style={styles.sidebar}>
      {/* Profile Section */}
      <div style={styles.profileContainer}>
        <div style={styles.avatar}>
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" 
            alt="Admin Profile" 
            style={styles.avatarImg}
          />
          <div style={styles.statusBadge}></div>
        </div>
        <div style={styles.profileText}>
          <div style={styles.profileName}>HQ Command Center</div>
          <div style={styles.profileRole}>Admin Control</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={styles.menuContainer}>
        <div style={styles.menuHeader}>COMMAND</div>
        <nav style={styles.navList}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {})
                }}
              >
                <Icon size={18} style={isActive ? styles.iconActive : styles.icon} />
                <span style={styles.navLabel}>{item.label}</span>
                {item.id === 'comms' && (
                  <span style={styles.badge}>184</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* System Settings & Support */}
      <div style={styles.menuContainer}>
        <div style={styles.menuHeader}>SYSTEM</div>
        <nav style={styles.navList}>
          <button style={styles.navItem}>
            <Settings size={18} style={styles.icon} />
            <span style={styles.navLabel}>System Settings</span>
          </button>
          <button style={styles.navItem}>
            <HelpCircle size={18} style={styles.icon} />
            <span style={styles.navLabel}>Support Hub</span>
          </button>
        </nav>
      </div>

      {/* AI Emergency Assistant Info Card (similar to "Your AI Friend in Trade") */}
      <div style={styles.aiCard}>
        <div style={styles.aiHeader}>
          <div style={styles.aiIconContainer}>
            <Cpu size={16} color="#ffffff" />
          </div>
          <span style={styles.aiTag}>Active AI</span>
        </div>
        <div style={styles.aiTitle}>AI Response Assistant</div>
        <div style={styles.aiDesc}>
          Monitoring telemetry, estimating structural damage, and routing supplies.
        </div>
        <button style={styles.aiButton}>
          Telemetry Stream
        </button>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '260px',
    height: '100vh',
    backgroundColor: '#0c0c0e',
    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    flexShrink: 0,
    zIndex: 10
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    padding: '0 8px'
  },
  avatar: {
    position: 'relative',
    width: '40px',
    height: '40px'
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    border: '2px solid #0c0c0e'
  },
  profileText: {
    display: 'flex',
    flexDirection: 'column'
  },
  profileName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: '1.2'
  },
  profileRole: {
    fontSize: '11px',
    color: '#71717a',
    marginTop: '2px'
  },
  menuContainer: {
    marginBottom: '28px'
  },
  menuHeader: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#52525b',
    marginBottom: '12px',
    paddingLeft: '12px'
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
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
    transition: 'all 0.2s ease',
    width: '100%'
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff'
  },
  icon: {
    color: '#71717a',
    transition: 'color 0.2s ease'
  },
  iconActive: {
    color: '#ffffff'
  },
  navLabel: {
    fontSize: '13px',
    fontWeight: '500',
    flexGrow: 1
  },
  badge: {
    backgroundColor: '#ffffff',
    color: '#0c0c0e',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '10px',
    minWidth: '20px',
    textAlign: 'center'
  },
  aiCard: {
    marginTop: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  aiIconContainer: {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  aiTag: {
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: '#a1a1aa',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  aiTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#ffffff',
    marginTop: '4px'
  },
  aiDesc: {
    fontSize: '11px',
    color: '#71717a',
    lineHeight: '1.4'
  },
  aiButton: {
    backgroundColor: '#ffffff',
    color: '#0c0c0e',
    border: 'none',
    borderRadius: '6px',
    padding: '8px',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
    textAlign: 'center',
    transition: 'opacity 0.2s ease',
    width: '100%'
  }
};
