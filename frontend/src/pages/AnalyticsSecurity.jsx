import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Cpu, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Database,
  Lock,
  History
} from 'lucide-react';

export default function AnalyticsSecurity() {
  // Card 15: AI Damage Assessment
  const aiDamage = {
    buildings: '2,450',
    categories: [
      { name: 'No Damage', percent: 42, color: '#10b981' },
      { name: 'Minor Damage', percent: 24, color: '#3b82f6' },
      { name: 'Moderate Damage', percent: 18, color: '#eab308' },
      { name: 'Severe Damage', percent: 11, color: '#f97316' },
      { name: 'Destroyed', percent: 5, color: '#ef4444' }
    ],
    zones: ['Zone A', 'Zone B', 'Zone C']
  };

  // Card 16: Risk & Vulnerability
  const riskVal = {
    level: 'HIGH',
    metrics: [
      { name: 'Population at Risk', val: '64,250' },
      { name: 'Flood Probability', val: '84%' },
      { name: 'Infrastructure Risk', val: 'Vulnerable' },
      { name: 'Vulnerability Index', val: '7.8 / 10' }
    ],
    highRiskAreas: ['Zone A', 'Zone B']
  };

  // Card 20: Post-Disaster Analytics
  const postAnalytics = {
    metrics: [
      { name: 'Total SOS Requests', val: '1,492' },
      { name: 'People Rescued', val: '3,240' },
      { name: 'People Evacuated', val: '2,816' },
      { name: 'Est. Structural Damage', val: '$14.2M' }
    ],
    comparisons: [
      { label: 'Avg Response Time', val: '↓ 33%', color: '#10b981' },
      { label: 'SOS Resolution Rate', val: '↑ 17%', color: '#10b981' }
    ]
  };

  // Card 21: Security & Audit
  const security = {
    status: 'Secure',
    encryption: 'AES-256',
    transport: 'TLS 1.3',
    sessions: 14,
    failedLogins: 0,
    backup: '12 min ago',
    logs: [
      { user: 'Admin A', action: 'assigned Rescue Team #04', time: '4 min ago' },
      { user: 'Officer B', action: 'updated Incident #2048', time: '11 min ago' },
      { user: 'System', action: 'completed LoRa telemetry snapshot', time: '20 min ago' }
    ]
  };

  return (
    <div style={styles.container}>
      <div className="bento-grid" style={{ marginBottom: '24px' }}>
        {/* AI Damage Assessment (Card 15) */}
        <div className="col-6 glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.titleWithIcon}>
              <Cpu size={18} color="#3b82f6" />
              <h3 style={styles.title}>AI Damage Assessment</h3>
            </div>
            <span style={styles.badgePrimary}>{aiDamage.buildings} Buildings Analyzed</span>
          </div>

          {/* Classification bars */}
          <div style={styles.damageBarsList}>
            {aiDamage.categories.map((cat, idx) => (
              <div key={idx} style={styles.damageRow}>
                <div style={styles.damageInfo}>
                  <span style={styles.damageName}>{cat.name}</span>
                  <span style={styles.damageVal}>{cat.percent}%</span>
                </div>
                <div style={styles.progressBarBg}>
                  <div 
                    style={{ 
                      ...styles.progressBarFill, 
                      width: `${cat.percent}%`,
                      backgroundColor: cat.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.recoveryZoneBlock}>
            <div style={styles.zoneTitle}>Priority Recovery Areas</div>
            <div style={styles.zonesRow}>
              {aiDamage.zones.map((zone, i) => (
                <span key={i} style={styles.zoneTag}>{zone}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Risk & Vulnerability (Card 16) */}
        <div className="col-6 glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.titleWithIcon}>
              <AlertTriangle size={18} color="#ef4444" />
              <h3 style={styles.title}>Risk & Vulnerability Matrix</h3>
            </div>
            <span style={styles.badgeDanger}>Risk Level: {riskVal.level}</span>
          </div>

          {/* Metrics Grid */}
          <div style={styles.riskMetricsGrid}>
            {riskVal.metrics.map((metric, idx) => (
              <div key={idx} style={styles.riskBox} className="glass-panel">
                <div style={styles.riskLabel}>{metric.name}</div>
                <div style={styles.riskValText}>{metric.val}</div>
              </div>
            ))}
          </div>

          <div style={styles.recoveryZoneBlock}>
            <div style={styles.zoneTitle}>High Vulnerability Grids</div>
            <div style={styles.zonesRow}>
              {riskVal.highRiskAreas.map((area, i) => (
                <span key={i} style={{ ...styles.zoneTag, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>{area}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bento-grid">
        {/* Post Disaster Analytics (Card 20) */}
        <div className="col-6 glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.titleWithIcon}>
              <Activity size={18} color="#10b981" />
              <h3 style={styles.title}>Post-Disaster Analytics</h3>
            </div>
          </div>

          <div style={styles.analyticsStatsGrid}>
            {postAnalytics.metrics.map((m, i) => (
              <div key={i} style={styles.analyticBox}>
                <div style={styles.analyticVal}>{m.val}</div>
                <div style={styles.analyticLabel}>{m.name}</div>
              </div>
            ))}
          </div>

          <div style={styles.analyticsComparison}>
            <div style={styles.compTitle}>Performance Metrics Benchmark</div>
            <div style={styles.compRow}>
              {postAnalytics.comparisons.map((c, i) => (
                <div key={i} style={styles.compCard} className="glass-panel">
                  <span style={styles.compLabel}>{c.label}</span>
                  <div style={{ ...styles.compValue, color: c.color }}>
                    {c.val === '↓ 33%' ? <TrendingDown size={14} style={{ marginRight: '4px' }} /> : <TrendingUp size={14} style={{ marginRight: '4px' }} />}
                    {c.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Audit Logs (Card 21) */}
        <div className="col-6 glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.titleWithIcon}>
              <ShieldCheck size={18} color="#10b981" />
              <h3 style={styles.title}>Security & Audit Systems</h3>
            </div>
            <span style={styles.badgeSuccess}>System: {security.status}</span>
          </div>

          {/* Details Row */}
          <div style={styles.securitySummary}>
            <div style={styles.secItem}>
              <Lock size={12} color="#a1a1aa" />
              <span>{security.encryption}</span>
            </div>
            <div style={styles.secItem}>
              <Database size={12} color="#a1a1aa" />
              <span>Backup: {security.backup}</span>
            </div>
          </div>

          {/* Audit Logs list */}
          <div style={styles.auditLogBlock}>
            <div style={styles.auditHeader}>
              <History size={12} style={{ marginRight: '6px' }} />
              Recent Authorization Logs
            </div>
            <div style={styles.logList}>
              {security.logs.map((log, idx) => (
                <div key={idx} style={styles.logRow}>
                  <div style={styles.logText}>
                    <strong style={{ color: '#ffffff' }}>{log.user}</strong> {log.action}
                  </div>
                  <div style={styles.logTime}>{log.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  card: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '380px'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    width: '100%'
  },
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  title: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff'
  },
  badgePrimary: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  badgeDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  badgeSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  damageBarsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: '16px'
  },
  damageRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  damageInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px'
  },
  damageName: {
    color: '#a1a1aa',
    fontWeight: '500'
  },
  damageVal: {
    color: '#ffffff',
    fontWeight: '600'
  },
  progressBarBg: {
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '2px'
  },
  recoveryZoneBlock: {
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    paddingTop: '12px'
  },
  zoneTitle: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  },
  zonesRow: {
    display: 'flex',
    gap: '8px'
  },
  zoneTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '4px',
    padding: '3px 8px',
    fontSize: '10px',
    color: '#e4e4e7',
    fontWeight: '600'
  },
  riskMetricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: '16px'
  },
  riskBox: {
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  riskLabel: {
    fontSize: '10px',
    color: '#71717a',
    marginBottom: '4px'
  },
  riskValText: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#ffffff'
  },
  analyticsStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: '16px'
  },
  analyticBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  analyticVal: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff'
  },
  analyticLabel: {
    fontSize: '10px',
    color: '#71717a',
    marginTop: '4px'
  },
  analyticsComparison: {
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    paddingTop: '12px'
  },
  compTitle: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px'
  },
  compRow: {
    display: 'flex',
    gap: '12px'
  },
  compCard: {
    flexGrow: 1,
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  compLabel: {
    fontSize: '11px',
    color: '#a1a1aa'
  },
  compValue: {
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center'
  },
  securitySummary: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    fontSize: '11px',
    color: '#a1a1aa'
  },
  secItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  auditLogBlock: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  auditHeader: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'flex',
    alignItems: 'center'
  },
  logList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxHeight: '160px',
    overflowY: 'auto',
    paddingRight: '4px'
  },
  logRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    borderRadius: '6px',
    padding: '8px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logText: {
    fontSize: '11px',
    color: '#a1a1aa',
    lineHeight: '1.4'
  },
  logTime: {
    fontSize: '10px',
    color: '#71717a',
    flexShrink: 0,
    marginLeft: '12px'
  }
};
