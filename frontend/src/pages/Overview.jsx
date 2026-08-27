import React, { useState } from 'react';
import LiveDisasterMap from '../components/LiveDisasterMap';
import { SOSDonutChart, IncidentBarChart, EmergencyLineChart } from '../components/CustomCharts';
import { 
  AlertOctagon, 
  HelpCircle, 
  Users, 
  Home, 
  AlertTriangle,
  Clock,
  MapPin,
  TrendingUp,
  Plus
} from 'lucide-react';

export default function Overview({ mockQueue, setMockQueue }) {
  // Critical Alerts list (Card 19)
  const alerts = [
    { id: 1, type: 'critical', text: '12 new SOS requests — Zone A', time: '2 min ago' },
    { id: 2, type: 'high', text: 'Medical supplies below threshold — Center #04', time: '10 min ago' },
    { id: 3, type: 'high', text: 'Flood risk increased — Zone B', time: '14 min ago' },
    { id: 4, type: 'medium', text: '7 LoRa mesh nodes offline', time: '30 min ago' }
  ];

  return (
    <div style={styles.container}>
      {/* Grid of 5 Summary Cards */}
      <div style={styles.summaryGrid}>
        {/* Card 1: Active Incidents */}
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #ef4444' }} className="glass-panel">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Active Incidents</span>
            <AlertOctagon size={16} color="#ef4444" />
          </div>
          <div style={styles.cardBody}>
            <div style={styles.primaryVal}>24</div>
            <div style={{ ...styles.secondaryVal, color: '#ef4444' }}>+5 in last hour</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Crit: <strong style={{color:'#ef4444'}}>6</strong></span>
            <span style={styles.footerItem}>High: <strong style={{color:'#f97316'}}>11</strong></span>
            <span style={styles.footerItem}>Med: <strong style={{color:'#eab308'}}>7</strong></span>
          </div>
        </div>

        {/* Card 2: Active SOS Requests */}
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #f97316' }} className="glass-panel">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Active SOS Requests</span>
            <AlertTriangle size={16} color="#f97316" />
          </div>
          <div style={styles.cardBody}>
            <div style={styles.primaryVal}>137</div>
            <div style={{ ...styles.secondaryVal, color: '#f97316' }}>Waiting: 82</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Pending: <strong>82</strong></span>
            <span style={styles.footerItem}>Progress: <strong>41</strong></span>
            <span style={styles.footerItem}>Done: <strong>14</strong></span>
          </div>
        </div>

        {/* Card 3: People Affected */}
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #a1a1aa' }} className="glass-panel">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>People Affected</span>
            <Users size={16} color="#a1a1aa" />
          </div>
          <div style={styles.cardBody}>
            <div style={styles.primaryVal}>8,492</div>
            <div style={{ ...styles.secondaryVal, color: '#a1a1aa' }}>Rescued: 3,240</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Evac: <strong>2.8k</strong></span>
            <span style={styles.footerItem}>Missing: <strong style={{color:'#ef4444'}}>436</strong></span>
            <span style={styles.footerItem}>Displaced: <strong>2k</strong></span>
          </div>
        </div>

        {/* Card 4: Active Responders */}
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #3b82f6' }} className="glass-panel">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Active Responders</span>
            <TrendingUp size={16} color="#3b82f6" />
          </div>
          <div style={styles.cardBody}>
            <div style={styles.primaryVal}>86</div>
            <div style={{ ...styles.secondaryVal, color: '#3b82f6' }}>Assigned: 41</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Avail: <strong>32</strong></span>
            <span style={styles.footerItem}>En Route: <strong>13</strong></span>
            <span style={styles.footerItem}>Offline: <strong>8</strong></span>
          </div>
        </div>

        {/* Card 5: Active Relief Centers */}
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #10b981' }} className="glass-panel">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Relief Centers</span>
            <Home size={16} color="#10b981" />
          </div>
          <div style={styles.cardBody}>
            <div style={styles.primaryVal}>18</div>
            <div style={{ ...styles.secondaryVal, color: '#10b981' }}>4 Near Capacity</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Total Cap: <strong>6.5k</strong></span>
            <span style={styles.footerItem}>Occupied: <strong>5.2k</strong></span>
            <span style={styles.footerItem}>Avail: <strong>1.2k</strong></span>
          </div>
        </div>
      </div>

      {/* Main Bento Grid Area */}
      <div className="bento-grid" style={{ marginBottom: '24px' }}>
        {/* Map - 8 Columns */}
        <div className="col-8" style={{ height: '450px' }}>
          <LiveDisasterMap />
        </div>

        {/* Critical Alerts - 4 Columns */}
        <div className="col-4 glass-panel" style={{ height: '450px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={styles.panelHeader}>
            <h3 style={styles.panelTitle}>Critical Alerts</h3>
            <span style={styles.alertCounter}>{alerts.length}</span>
          </div>
          
          <div style={styles.alertsList}>
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                style={{ 
                  ...styles.alertItem,
                  borderLeft: `3px solid ${alert.type === 'critical' ? '#ef4444' : alert.type === 'high' ? '#f97316' : '#eab308'}`
                }}
              >
                <div style={styles.alertMain}>
                  <div style={styles.alertText}>{alert.text}</div>
                  <div style={styles.alertTime}>{alert.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.alertActions}>
            <button style={styles.alertBtn}>Acknowledge All</button>
            <button style={styles.alertBtnMuted}>View Logs</button>
          </div>
        </div>
      </div>

      {/* Charts Bento Row */}
      <div className="bento-grid" style={{ marginBottom: '24px' }}>
        <div className="col-4 glass-panel" style={styles.chartCard}>
          <SOSDonutChart />
        </div>
        <div className="col-4 glass-panel" style={styles.chartCard}>
          <IncidentBarChart />
        </div>
        <div className="col-4 glass-panel" style={styles.chartCard}>
          <EmergencyLineChart />
        </div>
      </div>

      {/* Emergency Priority Queue Table */}
      <div className="glass-panel" style={styles.queueContainer}>
        <div style={styles.queueHeader}>
          <div>
            <h3 style={styles.queueTitle}>Emergency Priority Queue</h3>
            <p style={styles.queueSub}>Real-time routing for immediate search, rescue, and evacuation deployment.</p>
          </div>
          <button style={styles.addQueueBtn} onClick={() => {
            const newSOS = {
              priority: 'High',
              incident: 'Medical Emergency',
              location: 'Relief Center #04',
              affected: 5,
              time: 'Just now',
              status: 'Waiting',
              team: '—'
            };
            setMockQueue([newSOS, ...mockQueue]);
          }}>
            <Plus size={14} style={{ marginRight: '6px' }} />
            Add Mock Incident
          </button>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Incident</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>People Affected</th>
                <th style={styles.th}>Time Received</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Assigned Team</th>
              </tr>
            </thead>
            <tbody>
              {mockQueue.map((row, idx) => (
                <tr key={idx} style={styles.tr}>
                  <td style={styles.td}>
                    <span 
                      style={{
                        ...styles.priorityBadge,
                        backgroundColor: row.priority === 'Critical' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                        color: row.priority === 'Critical' ? '#ef4444' : '#f97316'
                      }}
                    >
                      <span 
                        style={{
                          ...styles.priorityDot,
                          backgroundColor: row.priority === 'Critical' ? '#ef4444' : '#f97316'
                        }}
                        className={row.priority === 'Critical' ? 'pulse-dot' : ''}
                      ></span>
                      {row.priority}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontWeight: '600' }}>{row.incident}</td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="#a1a1aa" />
                      {row.location}
                    </div>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>{row.affected}</td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#71717a' }}>
                      <Clock size={12} />
                      {row.time}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span 
                      style={{
                        ...styles.statusChip,
                        color: row.status === 'Waiting' ? '#f97316' : '#3b82f6',
                        backgroundColor: row.status === 'Waiting' ? 'rgba(249, 115, 22, 0.05)' : 'rgba(59, 130, 246, 0.05)'
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td style={{ ...styles.td, color: row.team === '—' ? '#71717a' : '#ffffff' }}>{row.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    width: '100%'
  },
  summaryCard: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '110px'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#a1a1aa'
  },
  cardTitle: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  cardBody: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    margin: '8px 0'
  },
  primaryVal: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff'
  },
  secondaryVal: {
    fontSize: '11px',
    fontWeight: '600'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
    paddingTop: '6px',
    fontSize: '10px',
    color: '#71717a'
  },
  footerItem: {
    display: 'inline-block'
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  panelTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff'
  },
  alertCounter: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '10px'
  },
  alertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: '16px',
    paddingRight: '4px'
  },
  alertItem: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.04)',
    display: 'flex',
    flexDirection: 'column'
  },
  alertMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  alertText: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#e4e4e7',
    lineHeight: '1.4'
  },
  alertTime: {
    fontSize: '10px',
    color: '#71717a'
  },
  alertActions: {
    display: 'flex',
    gap: '10px',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    paddingTop: '14px'
  },
  alertBtn: {
    flexGrow: 1,
    height: '32px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  alertBtnMuted: {
    width: '80px',
    height: '32px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#71717a',
    fontSize: '11px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  chartCard: {
    padding: '20px',
    height: '240px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  queueContainer: {
    padding: '24px'
  },
  queueHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  queueTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '4px'
  },
  queueSub: {
    fontSize: '12px',
    color: '#a1a1aa'
  },
  addQueueBtn: {
    backgroundColor: '#ffffff',
    color: '#0c0c0e',
    border: 'none',
    borderRadius: '16px',
    height: '32px',
    padding: '0 14px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(255,255,255,0.05)'
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '12px 16px',
    color: '#71717a',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  tr: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.01)'
    }
  },
  td: {
    padding: '14px 16px',
    fontSize: '12px',
    color: '#e4e4e7'
  },
  priorityBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  priorityDot: {
    width: '4px',
    height: '4px',
    borderRadius: '50%'
  },
  statusChip: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '600'
  }
};
