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
  // Critical Alerts list with coordinates for proximity grouping (Card 19)
  const [alerts, setAlerts] = useState([
    // Volunteer alerts
    { 
      id: 1, 
      source: 'volunteer', 
      reporterName: 'Rahul K. (Volunteer)', 
      type: 'critical', 
      text: 'Water levels rising rapidly near bridge, block is flooded', 
      time: '2 min ago',
      x: 220, 
      y: 140, 
      locationName: 'Vidhana Soudha'
    },
    { 
      id: 2, 
      source: 'volunteer', 
      reporterName: 'Sneha M. (Volunteer)', 
      type: 'high', 
      text: 'Relief Center #04 running out of insulin and clean syringes', 
      time: '10 min ago',
      x: 520, 
      y: 190, 
      locationName: 'Cunningham Road'
    },
    { 
      id: 3, 
      source: 'volunteer', 
      reporterName: 'Anil P. (Volunteer)', 
      type: 'medium', 
      text: '7 LoRa mesh nodes offline due to power loss', 
      time: '30 min ago',
      x: 380, 
      y: 280, 
      locationName: 'Richmond Town'
    },
    {
      id: 4,
      source: 'volunteer',
      reporterName: 'David J. (Volunteer)',
      type: 'critical',
      text: 'Road cave-in reported. Blocking emergency vehicles.',
      time: '45 min ago',
      x: 230,
      y: 145,
      locationName: 'Vidhana Soudha'
    },
    
    // Citizen alerts
    { 
      id: 5, 
      source: 'citizen', 
      reporterName: 'Karan S. (Citizen)', 
      type: 'critical', 
      text: 'Elderly couple trapped on 2nd floor, water entering lobby', 
      time: '5 min ago',
      x: 210, 
      y: 135,
      locationName: 'Vidhana Soudha'
    },
    { 
      id: 6, 
      source: 'citizen', 
      reporterName: 'Priya R. (Citizen)', 
      type: 'high', 
      text: 'Severe water logging inside homes. Need immediate assistance.', 
      time: '12 min ago',
      x: 530, 
      y: 195,
      locationName: 'Cunningham Road'
    },
    { 
      id: 7, 
      source: 'citizen', 
      reporterName: 'Vikram A. (Citizen)', 
      type: 'medium', 
      text: 'Tree fallen on power lines. Sparks visible.', 
      time: '18 min ago',
      x: 500, 
      y: 180,
      locationName: 'Vasanth Nagar'
    },
    {
      id: 8,
      source: 'citizen',
      reporterName: 'Sunita G. (Citizen)',
      type: 'high',
      text: 'Shortage of drinking water. 50+ residents affected.',
      time: '25 min ago',
      x: 390,
      y: 275,
      locationName: 'Richmond Town'
    }
  ]);

  const [selectedRegion, setSelectedRegion] = useState(null); // { nodeId, name, x, y, radius }
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeAlertTab, setActiveAlertTab] = useState('volunteer'); // 'volunteer', 'citizen', 'grouped'

  // Get active pixel radius based on selection
  const currentRadiusPx = selectedRegion 
    ? (selectedRegion.radius === 500 ? 50 : selectedRegion.radius === 1000 ? 100 : 200)
    : 50; // default 500m (50px)

  // Filter alerts by selected region coordinates on map
  const regionFilteredAlerts = selectedRegion
    ? alerts.filter(a => {
        const dx = a.x - selectedRegion.x;
        const dy = a.y - selectedRegion.y;
        return Math.sqrt(dx * dx + dy * dy) <= currentRadiusPx;
      })
    : alerts;

  // Group alerts into proximity clusters using map pixel coordinates
  const getGroupedAlerts = (alertsList, radiusPx) => {
    const clusters = [];
    alertsList.forEach((alert) => {
      let addedToCluster = false;
      for (let cluster of clusters) {
        const distance = Math.sqrt(
          (alert.x - cluster.center.x) ** 2 + (alert.y - cluster.center.y) ** 2
        );
        if (distance <= radiusPx) {
          cluster.alerts.push(alert);
          // Recalculate center centroid
          const total = cluster.alerts.length;
          cluster.center.x =
            cluster.alerts.reduce((sum, a) => sum + a.x, 0) / total;
          cluster.center.y =
            cluster.alerts.reduce((sum, a) => sum + a.y, 0) / total;
          addedToCluster = true;
          break;
        }
      }
      if (!addedToCluster) {
        clusters.push({
          id: `cluster-${alert.id}`,
          center: { x: alert.x, y: alert.y },
          locationName: alert.locationName,
          alerts: [alert]
        });
      }
    });
    return clusters;
  };

  // Metric scaling factor based on radius
  const getMetricScaleFactor = () => {
    if (!selectedRegion) return 1.0;
    switch (selectedRegion.radius) {
      case 500: return 0.25;
      case 1000: return 0.45;
      case 2000: return 0.75;
      default: return 1.0;
    }
  };

  const scale = getMetricScaleFactor();

  // Prepare alerts for rendering
  const filteredAlerts = regionFilteredAlerts.filter(a => a.source === activeAlertTab);
  const groupedAlerts = getGroupedAlerts(regionFilteredAlerts, currentRadiusPx);
  const activeAlertCount = activeAlertTab === 'grouped' ? regionFilteredAlerts.length : filteredAlerts.length;

  // Queue coordinates for priority list filtering
  const queueLocationCoords = {
    'Mysuru East': { x: 220, y: 140 },
    'Zone B': { x: 380, y: 280 },
    'Zone C': { x: 520, y: 190 },
    'Relief Center #04': { x: 290, y: 180 }
  };

  const filteredQueue = selectedRegion
    ? mockQueue.filter(row => {
        const coords = queueLocationCoords[row.location] || { x: 0, y: 0 };
        const dx = coords.x - selectedRegion.x;
        const dy = coords.y - selectedRegion.y;
        return Math.sqrt(dx * dx + dy * dy) <= currentRadiusPx;
      })
    : mockQueue;

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
            <div style={styles.primaryVal}>{Math.round(24 * scale)}</div>
            <div style={{ ...styles.secondaryVal, color: '#ef4444' }}>+{Math.max(1, Math.round(5 * scale))} in last hour</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Crit: <strong style={{color:'#ef4444'}}>{Math.round(6 * scale)}</strong></span>
            <span style={styles.footerItem}>High: <strong style={{color:'#f97316'}}>{Math.round(11 * scale)}</strong></span>
            <span style={styles.footerItem}>Med: <strong style={{color:'#eab308'}}>{Math.round(7 * scale)}</strong></span>
          </div>
        </div>

        {/* Card 2: Active SOS Requests */}
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #f97316' }} className="glass-panel">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Active SOS Requests</span>
            <AlertTriangle size={16} color="#f97316" />
          </div>
          <div style={styles.cardBody}>
            <div style={styles.primaryVal}>{Math.round(137 * scale)}</div>
            <div style={{ ...styles.secondaryVal, color: '#f97316' }}>Waiting: {Math.round(82 * scale)}</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Pending: <strong>{Math.round(82 * scale)}</strong></span>
            <span style={styles.footerItem}>Progress: <strong>{Math.round(41 * scale)}</strong></span>
            <span style={styles.footerItem}>Done: <strong>{Math.round(14 * scale)}</strong></span>
          </div>
        </div>

        {/* Card 3: People Affected */}
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #a1a1aa' }} className="glass-panel">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>People Affected</span>
            <Users size={16} color="#a1a1aa" />
          </div>
          <div style={styles.cardBody}>
            <div style={styles.primaryVal}>{Math.round(8492 * scale).toLocaleString()}</div>
            <div style={{ ...styles.secondaryVal, color: '#a1a1aa' }}>Rescued: {Math.round(3240 * scale).toLocaleString()}</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Evac: <strong>{selectedRegion ? `${(2.8 * scale).toFixed(1)}k` : '2.8k'}</strong></span>
            <span style={styles.footerItem}>Missing: <strong style={{color:'#ef4444'}}>{Math.round(436 * scale)}</strong></span>
            <span style={styles.footerItem}>Displaced: <strong>{selectedRegion ? `${(2 * scale).toFixed(1)}k` : '2k'}</strong></span>
          </div>
        </div>

        {/* Card 4: Active Responders */}
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #3b82f6' }} className="glass-panel">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Active Responders</span>
            <TrendingUp size={16} color="#3b82f6" />
          </div>
          <div style={styles.cardBody}>
            <div style={styles.primaryVal}>{Math.round(86 * scale)}</div>
            <div style={{ ...styles.secondaryVal, color: '#3b82f6' }}>Assigned: {Math.round(41 * scale)}</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Avail: <strong>{Math.round(32 * scale)}</strong></span>
            <span style={styles.footerItem}>En Route: <strong>{Math.round(13 * scale)}</strong></span>
            <span style={styles.footerItem}>Offline: <strong>{Math.round(8 * scale)}</strong></span>
          </div>
        </div>

        {/* Card 5: Active Relief Centers */}
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #10b981' }} className="glass-panel">
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Relief Centers</span>
            <Home size={16} color="#10b981" />
          </div>
          <div style={styles.cardBody}>
            <div style={styles.primaryVal}>{Math.round(18 * scale)}</div>
            <div style={{ ...styles.secondaryVal, color: '#10b981' }}>{Math.max(1, Math.round(4 * scale))} Near Capacity</div>
          </div>
          <div style={styles.cardFooter}>
            <span style={styles.footerItem}>Total Cap: <strong>{selectedRegion ? `${(6.5 * scale).toFixed(1)}k` : '6.5k'}</strong></span>
            <span style={styles.footerItem}>Occupied: <strong>{selectedRegion ? `${(5.2 * scale).toFixed(1)}k` : '5.2k'}</strong></span>
            <span style={styles.footerItem}>Avail: <strong>{selectedRegion ? `${(1.3 * scale).toFixed(1)}k` : '1.2k'}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Bento Grid Area */}
      <div className="bento-grid" style={{ marginBottom: '24px' }}>
        {/* Map - 8 Columns */}
        <div className="col-8" style={{ height: '450px' }}>
          <LiveDisasterMap 
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            onResetSelection={() => {
              setSelectedRegion(null);
              setSelectedNode(null);
            }}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        </div>

        {/* Critical Alerts - 4 Columns */}
        <div className="col-4 glass-panel" style={{ height: '450px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={styles.panelHeader}>
            <h3 style={styles.panelTitle}>Critical Alerts</h3>
            <span style={styles.alertCounter}>{activeAlertCount}</span>
          </div>

          {/* Sub-tabs / Filters */}
          <div style={styles.alertTabContainer}>
            <button 
              style={{
                ...styles.alertTab,
                ...(activeAlertTab === 'volunteer' ? styles.alertTabActive : {})
              }}
              onClick={() => setActiveAlertTab('volunteer')}
            >
              Volunteer ({regionFilteredAlerts.filter(a => a.source === 'volunteer').length})
            </button>
            <button 
              style={{
                ...styles.alertTab,
                ...(activeAlertTab === 'citizen' ? styles.alertTabActive : {})
              }}
              onClick={() => setActiveAlertTab('citizen')}
            >
              Citizen ({regionFilteredAlerts.filter(a => a.source === 'citizen').length})
            </button>
            <button 
              style={{
                ...styles.alertTab,
                ...(activeAlertTab === 'grouped' ? styles.alertTabActive : {})
              }}
              onClick={() => setActiveAlertTab('grouped')}
            >
              Grouped ({groupedAlerts.length})
            </button>
          </div>
          
          <div style={styles.alertsList}>
            {activeAlertTab === 'grouped' ? (
              groupedAlerts.map(group => (
                <div key={group.id} style={styles.groupContainer}>
                  <div style={styles.groupHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={12} color="#ef4444" />
                      <span style={styles.groupTitle}>
                        {group.locationName} Region
                      </span>
                    </div>
                    <span style={styles.groupBadge}>
                      {group.alerts.length} {group.alerts.length === 1 ? 'Alert' : 'Alerts'}
                    </span>
                  </div>
                  <div style={styles.groupAlertsList}>
                    {group.alerts.map(alert => (
                      <div 
                        key={alert.id} 
                        style={{ 
                          ...styles.groupAlertItem,
                          borderLeft: `3px solid ${alert.type === 'critical' ? '#ef4444' : alert.type === 'high' ? '#f97316' : '#eab308'}`
                        }}
                      >
                        <div style={styles.alertMain}>
                          <div style={styles.reporterRow}>
                            <span style={styles.reporterName}>
                              {alert.source === 'volunteer' ? '🛡️ ' : '👤 '}
                              {alert.reporterName}
                            </span>
                            <span style={styles.alertTime}>{alert.time}</span>
                          </div>
                          <div style={styles.alertText}>{alert.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              filteredAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  style={{ 
                    ...styles.alertItem,
                    borderLeft: `3px solid ${alert.type === 'critical' ? '#ef4444' : alert.type === 'high' ? '#f97316' : '#eab308'}`
                  }}
                >
                  <div style={styles.alertMain}>
                    <div style={styles.reporterRow}>
                      <span style={styles.reporterName}>
                        {alert.source === 'volunteer' ? '🛡️ ' : '👤 '}
                        {alert.reporterName}
                      </span>
                      <span style={styles.alertTime}>{alert.time}</span>
                    </div>
                    <div style={styles.alertText}>{alert.text}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={styles.alertActions}>
            <button style={styles.alertBtn} onClick={() => {
              if (activeAlertTab === 'grouped') {
                setAlerts([]);
              } else {
                setAlerts(alerts.filter(a => a.source !== activeAlertTab));
              }
            }}>
              Acknowledge All
            </button>
            <button style={styles.alertBtnMuted}>View Logs</button>
          </div>
        </div>
      </div>

      {/* Charts Bento Row */}
      <div className="bento-grid" style={{ marginBottom: '24px' }}>
        <div className="col-4 glass-panel" style={styles.chartCard}>
          <SOSDonutChart scale={scale} />
        </div>
        <div className="col-4 glass-panel" style={styles.chartCard}>
          <IncidentBarChart scale={scale} />
        </div>
        <div className="col-4 glass-panel" style={styles.chartCard}>
          <EmergencyLineChart scale={scale} />
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
              {filteredQueue.map((row, idx) => {
                let matchedNodeId = null;
                if (row.location === 'Mysuru East') matchedNodeId = 1;
                else if (row.location === 'Zone B') matchedNodeId = 2;
                else if (row.location === 'Zone C') matchedNodeId = 3;

                return (
                  <tr 
                    key={idx} 
                    style={{ ...styles.tr, cursor: 'pointer' }}
                    onClick={() => {
                      if (matchedNodeId) {
                        const targetNode = {
                          id: matchedNodeId,
                          type: 'incidents',
                          x: matchedNodeId === 1 ? 220 : matchedNodeId === 2 ? 380 : 520,
                          y: matchedNodeId === 1 ? 140 : matchedNodeId === 2 ? 280 : 190,
                          label: matchedNodeId === 1 ? 'Critical: Flood Rescue' : matchedNodeId === 2 ? 'Critical: Building Collapse' : 'High: Medical Emergency',
                          desc: matchedNodeId === 1 ? '18 People Affected, Mysuru East' : matchedNodeId === 2 ? '9 People Affected, Zone B' : '4 People Affected, Zone C'
                        };
                        setSelectedNode(targetNode);
                      }
                    }}
                  >
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
                );
              })}
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
  },
  alertTabContainer: {
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '8px',
    padding: '3px',
    marginBottom: '12px',
    gap: '2px'
  },
  alertTab: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    color: '#a1a1aa',
    fontSize: '11px',
    fontWeight: '600',
    padding: '6px 0',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  alertTabActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  radiusSelectorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    borderRadius: '6px',
    padding: '6px 8px',
    marginBottom: '12px'
  },
  radiusLabel: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  radiusButtons: {
    display: 'flex',
    gap: '4px'
  },
  radiusBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    color: '#a1a1aa',
    fontSize: '10px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    outline: 'none'
  },
  radiusBtnActive: {
    backgroundColor: '#ffffff',
    border: '1px solid #ffffff',
    color: '#0c0c0e'
  },
  groupContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  groupHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#ffffff',
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    paddingBottom: '6px'
  },
  groupTitle: {
    letterSpacing: '0.3px',
    fontSize: '11px'
  },
  groupBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    color: '#a1a1aa',
    fontSize: '9px',
    fontWeight: '600',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  groupAlertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  groupAlertItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.02)',
    display: 'flex',
    flexDirection: 'column'
  },
  reporterRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '4px'
  },
  reporterName: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#a1a1aa'
  }
};
