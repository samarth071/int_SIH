import React from 'react';
import { 
  Users, 
  Clock, 
  Radio, 
  Network, 
  CheckCircle2, 
  AlertTriangle,
  Cpu,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function Operations() {
  // Card 12: Responder Operations & Teams
  const teams = [
    { name: 'Rescue Team 04', status: 'En Route', eta: '6 min', type: 'Rescue' },
    { name: 'Medical Team 02', status: 'Available', eta: '—', type: 'Medical' },
    { name: 'Police Unit 08', status: 'Responding', eta: '3 min', type: 'Police' },
    { name: 'Hazmat Unit 01', status: 'Busy', eta: '—', type: 'Hazmat' },
    { name: 'Rescue Team 09', status: 'Offline', eta: '—', type: 'Rescue' }
  ];

  const statusCounts = {
    Available: 32,
    Assigned: 41,
    'En Route': 13,
    Busy: 8,
    Offline: 8
  };

  // Card 11: Average Response Time
  const responseTime = {
    total: '12m 34s',
    steps: [
      { name: 'Acknowledgement', time: '1m 24s', percent: 11 },
      { name: 'Dispatch', time: '2m 18s', percent: 18 },
      { name: 'Arrival', time: '5m 40s', percent: 45 },
      { name: 'Resolution', time: '3m 12s', percent: 26 }
    ]
  };

  // Card 18: Communication Network
  const networks = [
    { name: 'LoRa Mesh', status: 'Active', color: '#10b981' },
    { name: 'Cellular Network', status: 'Active', color: '#10b981' },
    { name: 'SMS Gateway', status: 'Active', color: '#10b981' },
    { name: 'IVR Gateway', status: 'Active', color: '#10b981' }
  ];

  const networkMetrics = {
    nodesConnected: 184,
    gatewaysActive: 12,
    nodesOffline: 7,
    messagesQueued: 23,
    messagesDelivered: 1842
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return '#10b981';
      case 'Responding':
      case 'En Route': return '#3b82f6';
      case 'Busy': return '#eab308';
      case 'Offline': return '#71717a';
      default: return '#ffffff';
    }
  };

  return (
    <div style={styles.container}>
      <div className="bento-grid" style={{ marginBottom: '24px' }}>
        {/* Responder Operations Card (Card 12) - spans 6 columns */}
        <div className="col-6 glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.titleWithIcon}>
              <Users size={18} color="#3b82f6" />
              <h3 style={styles.title}>Responder Operations</h3>
            </div>
            <span style={styles.badgePrimary}>86 Responders</span>
          </div>

          {/* Status Breakdown Grid */}
          <div style={styles.statusGrid}>
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} style={styles.statusBox}>
                <div style={styles.statusLabel}>{status}</div>
                <div style={{ ...styles.statusCount, color: getStatusColor(status) }}>{count}</div>
              </div>
            ))}
          </div>

          {/* Active Teams List */}
          <div style={styles.teamList}>
            <div style={styles.listHeader}>Active Deployment Units</div>
            {teams.map((team, idx) => (
              <div key={idx} style={styles.teamRow}>
                <div style={styles.teamInfo}>
                  <div style={styles.teamName}>{team.name}</div>
                  <div style={styles.teamType}>{team.type} Division</div>
                </div>
                <div style={styles.teamStatus}>
                  <span 
                    style={{ 
                      ...styles.statusDot, 
                      backgroundColor: getStatusColor(team.status) 
                    }}
                  ></span>
                  <span style={{ color: getStatusColor(team.status), fontSize: '12px', fontWeight: '600' }}>
                    {team.status}
                  </span>
                  {team.eta !== '—' && (
                    <span style={styles.etaText}>• ETA {team.eta}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Average Response Time Card (Card 11) - spans 6 columns */}
        <div className="col-6 glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.titleWithIcon}>
              <Clock size={18} color="#eab308" />
              <h3 style={styles.title}>Average Response Time</h3>
            </div>
            <div style={styles.trendBadge}>
              <TrendingDown size={14} color="#10b981" />
              <span>↓ 33% today</span>
            </div>
          </div>

          <div style={styles.timeOverview}>
            <div style={styles.bigTime}>{responseTime.total}</div>
            <div style={styles.timeLabel}>Standard response interval across all critical sectors</div>
          </div>

          {/* Visual Step Timeline */}
          <div style={styles.timelineContainer}>
            <div style={styles.timelineTitle}>Dispatch & Arrival Milestones</div>
            <div style={styles.timeline}>
              {responseTime.steps.map((step, idx) => (
                <div key={idx} style={styles.timelineStep}>
                  <div style={styles.stepHeader}>
                    <span style={styles.stepNum}>0{idx + 1}</span>
                    <span style={styles.stepName}>{step.name}</span>
                    <span style={styles.stepTime}>{step.time}</span>
                  </div>
                  {/* Progress bar container */}
                  <div style={styles.progressBarBg}>
                    <div 
                      style={{ 
                        ...styles.progressBarFill, 
                        width: `${step.percent}%`,
                        backgroundColor: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : idx === 2 ? '#ef4444' : '#eab308'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Communications Mesh telemetry card (Card 18) - spans 12 columns */}
      <div className="glass-panel" style={{ ...styles.card, padding: '24px' }}>
        <div style={styles.cardHeader}>
          <div style={styles.titleWithIcon}>
            <Radio size={20} color="#10b981" className="pulse-dot" />
            <div>
              <h3 style={styles.title}>Communication Network Telemetry</h3>
              <p style={styles.subtitle}>Critical LoRa routing networks when conventional lines fail.</p>
            </div>
          </div>
          <span style={styles.badgeSuccess}>Offline Resilient</span>
        </div>

        {/* Network Gateways Indicators Row */}
        <div style={styles.networkStatusRow}>
          {networks.map((net, idx) => (
            <div key={idx} style={styles.networkGateBox} className="glass-panel">
              <div style={styles.netInfo}>
                <div style={styles.netName}>{net.name}</div>
                <div style={styles.netStatus}>
                  <span style={{ ...styles.statusDot, backgroundColor: net.color, marginRight: '6px' }}></span>
                  {net.status}
                </div>
              </div>
              <Cpu size={18} color="#a1a1aa" />
            </div>
          ))}
        </div>

        {/* Node & Queue statistics */}
        <div style={styles.metricGrid}>
          <div style={styles.metricItem}>
            <div style={styles.metricVal}>{networkMetrics.nodesConnected}</div>
            <div style={styles.metricLabel}>Connected Mesh Nodes</div>
          </div>
          <div style={styles.metricItem}>
            <div style={styles.metricVal}>{networkMetrics.gatewaysActive}</div>
            <div style={styles.metricLabel}>Active Area Gateways</div>
          </div>
          <div style={{ ...styles.metricItem, borderRight: 'none' }}>
            <div style={{ ...styles.metricVal, color: '#ef4444' }}>{networkMetrics.nodesOffline}</div>
            <div style={styles.metricLabel}>Offline Nodes Alert</div>
          </div>
        </div>

        {/* Message Queue Monitor */}
        <div style={styles.messageBox} className="glass-panel">
          <div style={styles.msgHeader}>
            <Network size={16} color="#3b82f6" />
            <span style={styles.msgTitle}>Mesh Message Dispatcher</span>
          </div>
          <div style={styles.msgProgressGrid}>
            <div style={styles.msgStat}>
              <div style={styles.msgStatVal}>{networkMetrics.messagesQueued}</div>
              <div style={styles.msgStatLabel}>Queued Logs</div>
            </div>
            <div style={styles.progressSeparator}>
              <ArrowRight size={20} color="#3f3f46" />
            </div>
            <div style={styles.msgStat}>
              <div style={{ ...styles.msgStatVal, color: '#10b981' }}>{networkMetrics.messagesDelivered}</div>
              <div style={styles.msgStatLabel}>Delivered Mesh Packets</div>
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
    minHeight: '400px'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
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
  subtitle: {
    fontSize: '12px',
    color: '#a1a1aa',
    marginTop: '2px'
  },
  badgePrimary: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  trendBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '8px',
    marginBottom: '20px'
  },
  statusBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    padding: '10px 6px',
    textAlign: 'center'
  },
  statusLabel: {
    fontSize: '9px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#71717a',
    marginBottom: '4px'
  },
  statusCount: {
    fontSize: '18px',
    fontWeight: '700'
  },
  teamList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexGrow: 1,
    overflowY: 'auto'
  },
  listHeader: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#71717a',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    marginBottom: '4px'
  },
  teamRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.03)'
  },
  teamInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  teamName: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#ffffff'
  },
  teamType: {
    fontSize: '10px',
    color: '#71717a',
    marginTop: '2px'
  },
  teamStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },
  etaText: {
    fontSize: '11px',
    color: '#a1a1aa'
  },
  timeOverview: {
    marginBottom: '24px'
  },
  bigTime: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: '1'
  },
  timeLabel: {
    fontSize: '11px',
    color: '#a1a1aa',
    marginTop: '6px'
  },
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexGrow: 1
  },
  timelineTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#71717a',
    textTransform: 'uppercase'
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  timelineStep: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '11px'
  },
  stepNum: {
    color: '#71717a',
    fontWeight: '700',
    marginRight: '6px'
  },
  stepName: {
    color: '#ffffff',
    fontWeight: '500',
    flexGrow: 1
  },
  stepTime: {
    color: '#a1a1aa',
    fontWeight: '600'
  },
  progressBarBg: {
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '2px',
    width: '100%',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '2px'
  },
  badgeSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  networkStatusRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  networkGateBox: {
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  netInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  netName: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#ffffff'
  },
  netStatus: {
    fontSize: '10px',
    color: '#a1a1aa',
    display: 'flex',
    alignItems: 'center'
  },
  metricGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    padding: '20px 0',
    marginBottom: '24px'
  },
  metricItem: {
    textAlign: 'center',
    borderRight: '1px solid rgba(255, 255, 255, 0.06)'
  },
  metricVal: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff'
  },
  metricLabel: {
    fontSize: '11px',
    color: '#71717a',
    marginTop: '4px'
  },
  messageBox: {
    padding: '16px',
    backgroundColor: 'rgba(255,255,255,0.01)'
  },
  msgHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '14px'
  },
  msgTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#ffffff'
  },
  msgProgressGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px'
  },
  msgStat: {
    textAlign: 'center'
  },
  msgStatVal: {
    fontSize: '22px',
    fontWeight: '700'
  },
  msgStatLabel: {
    fontSize: '10px',
    color: '#71717a',
    marginTop: '2px'
  },
  progressSeparator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
