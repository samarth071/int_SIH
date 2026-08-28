import React, { useState } from 'react';
import { 
  Package, 
  Home, 
  Users, 
  AlertCircle, 
  CheckCircle,
  HelpCircle,
  Clock,
  HeartHandshake
} from 'lucide-react';

export default function Relief() {
  // Card 13: Relief Supply Status
  const supplies = [
    { name: 'Food Rations', percent: 82, status: 'Normal', color: '#10b981' },
    { name: 'Drinking Water', percent: 71, status: 'Normal', color: '#10b981' },
    { name: 'Medicines', percent: 58, status: 'Moderate', color: '#eab308' },
    { name: 'Blankets & Bedding', percent: 41, status: 'Low Stock', color: '#ef4444' },
    { name: 'Emergency Kits', percent: 67, status: 'Normal', color: '#10b981' }
  ];

  // Card 14: Relief Centers Details
  const centers = [
    { name: 'Relief Center #04', occupancy: 82, current: 410, capacity: 500, available: 90, facilities: { food: 'Available', water: 'Available', medical: 'Limited' } },
    { name: 'Relief Center #01', occupancy: 95, current: 475, capacity: 500, available: 25, facilities: { food: 'Available', water: 'Limited', medical: 'Critical' } },
    { name: 'Relief Center #05', occupancy: 45, current: 225, capacity: 500, available: 275, facilities: { food: 'Available', water: 'Available', medical: 'Available' } }
  ];

  const [selectedCenterIdx, setSelectedCenterIdx] = useState(0);
  const activeCenter = centers[selectedCenterIdx];

  // Card 17: NGO & Volunteer Management
  const volunteerStats = {
    registeredNGOs: 42,
    activeNGOs: 18,
    activeVolunteers: 312,
    availableVolunteers: 124,
    assignedVolunteers: 188,
    completedTasks: 84
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Food Distribution', location: 'Relief Center #05', required: 8, assigned: 6, status: 'In Progress' },
    { id: 2, title: 'First Aid Support', location: 'Zone B Trauma Tent', required: 4, assigned: 4, status: 'Assigned' },
    { id: 3, title: 'Blanket Distribution', location: 'Relief Center #04', required: 12, assigned: 5, status: 'In Progress' }
  ]);

  const handleAssignVol = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id && t.assigned < t.required) {
        return { ...t, assigned: t.assigned + 1 };
      }
      return t;
    }));
  };

  return (
    <div style={styles.container}>
      <div className="bento-grid" style={{ marginBottom: '24px' }}>
        {/* Relief Supply Status (Card 13) */}
        <div className="col-6 glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.titleWithIcon}>
              <Package size={18} color="#eab308" />
              <h3 style={styles.title}>Relief Supply Status</h3>
            </div>
            <span style={styles.badgeDanger}>Blankets: Low Stock</span>
          </div>

          <div style={styles.suppliesList}>
            {supplies.map((item, idx) => (
              <div key={idx} style={styles.supplyRow}>
                <div style={styles.supplyInfo}>
                  <span style={styles.supplyName}>{item.name}</span>
                  <span 
                    style={{ 
                      ...styles.supplyStatus, 
                      color: item.status === 'Low Stock' ? '#ef4444' : item.status === 'Moderate' ? '#eab308' : '#10b981'
                    }}
                  >
                    {item.status}
                  </span>
                </div>
                <div style={styles.progressContainer}>
                  <div style={styles.progressBarBg}>
                    <div 
                      style={{ 
                        ...styles.progressBarFill, 
                        width: `${item.percent}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                  <span style={styles.supplyVal}>{item.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relief Center Detail Panel (Card 14) */}
        <div className="col-6 glass-panel" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.titleWithIcon}>
              <Home size={18} color="#10b981" />
              <h3 style={styles.title}>Relief Centers Directory</h3>
            </div>
            
            {/* Center Selector tabs */}
            <div style={styles.tabs}>
              {centers.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCenterIdx(idx)}
                  style={{
                    ...styles.tabBtn,
                    backgroundColor: selectedCenterIdx === idx ? 'rgba(255,255,255,0.06)' : 'transparent',
                    borderColor: selectedCenterIdx === idx ? '#ffffff' : 'transparent',
                    color: selectedCenterIdx === idx ? '#ffffff' : '#71717a'
                  }}
                >
                  {c.name.split(' ').pop()}
                </button>
              ))}
            </div>
          </div>

          {/* Occupancy Indicator */}
          <div style={styles.centerDetailsBody}>
            <div style={styles.occupancyMetric}>
              <div style={styles.metricBig}>{activeCenter.occupancy}%</div>
              <div style={styles.metricDetails}>
                <div style={styles.centerNameLabel}>{activeCenter.name}</div>
                <div style={styles.occupancyCount}>
                  <span>Current: <strong>{activeCenter.current}</strong></span> / <span>Cap: {activeCenter.capacity}</span>
                </div>
                <div style={styles.availCount}>Available Beds: <strong style={{color:'#10b981'}}>{activeCenter.available}</strong></div>
              </div>
            </div>

            {/* Facilities lists */}
            <div style={styles.facilitiesBlock}>
              <div style={styles.facilitiesTitle}>On-Site Resource Levels</div>
              <div style={styles.facilityGrid}>
                {[
                  { label: 'Food Rations', val: activeCenter.facilities.food },
                  { label: 'Water Supply', val: activeCenter.facilities.water },
                  { label: 'Medical Tent', val: activeCenter.facilities.medical }
                ].map((fac, i) => (
                  <div key={i} style={styles.facCard} className="glass-panel">
                    <div style={styles.facLabel}>{fac.label}</div>
                    <div 
                      style={{ 
                        ...styles.facValue,
                        color: fac.val === 'Available' ? '#10b981' : fac.val === 'Limited' ? '#eab308' : '#ef4444'
                      }}
                    >
                      {fac.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NGO & Volunteer Management (Card 17) */}
      <div className="glass-panel" style={{ ...styles.card, padding: '24px' }}>
        <div style={styles.cardHeader}>
          <div style={styles.titleWithIcon}>
            <HeartHandshake size={20} color="#3b82f6" />
            <div>
              <h3 style={styles.title}>NGO & Volunteer Management</h3>
              <p style={styles.subtitle}>Directing civilian support units and organizations in active quadrants.</p>
            </div>
          </div>
        </div>

        {/* Volunteer Statistics Grid */}
        <div style={styles.volStatsGrid}>
          {[
            { label: 'Registered NGOs', val: volunteerStats.registeredNGOs },
            { label: 'Active NGOs', val: volunteerStats.activeNGOs },
            { label: 'Active Volunteers', val: volunteerStats.activeVolunteers },
            { label: 'Available Volunteers', val: volunteerStats.availableVolunteers, highlight: '#10b981' },
            { label: 'Assigned Volunteers', val: volunteerStats.assignedVolunteers },
            { label: 'Completed Tasks', val: volunteerStats.completedTasks }
          ].map((stat, idx) => (
            <div key={idx} style={styles.volStatBox} className="glass-panel">
              <div style={{ ...styles.volStatVal, color: stat.highlight || '#ffffff' }}>{stat.val}</div>
              <div style={styles.volStatLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Volunteer Task Priority List */}
        <div style={styles.taskListContainer}>
          <div style={styles.taskListHeader}>Active Mutual Aid Tasks</div>
          <div style={styles.taskTableWrapper}>
            <table style={styles.taskTable}>
              <thead>
                <tr>
                  <th style={styles.th}>Task</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Volunteers Required</th>
                  <th style={styles.th}>Volunteers Assigned</th>
                  <th style={styles.th}>Status</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id} style={styles.tr}>
                    <td style={{ ...styles.td, fontWeight: '600' }}>{task.title}</td>
                    <td style={styles.td}>{task.location}</td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>{task.required}</td>
                    <td style={styles.td}>
                      <div style={styles.barProgressGroup}>
                        <div style={styles.smallProgressBg}>
                          <div 
                            style={{ 
                              ...styles.smallProgressFill, 
                              width: `${(task.assigned / task.required) * 100}%`,
                              backgroundColor: task.assigned === task.required ? '#10b981' : '#3b82f6'
                            }}
                          ></div>
                        </div>
                        <span style={styles.barLabelText}>{task.assigned} / {task.required}</span>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span 
                        style={{
                          ...styles.statusChip,
                          color: task.assigned === task.required ? '#10b981' : '#eab308',
                          backgroundColor: task.assigned === task.required ? 'rgba(16, 185, 129, 0.05)' : 'rgba(234, 179, 8, 0.05)'
                        }}
                      >
                        {task.assigned === task.required ? 'Staffed' : task.status}
                      </span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'right' }}>
                      <button 
                        onClick={() => handleAssignVol(task.id)}
                        disabled={task.assigned === task.required}
                        style={{
                          ...styles.actionBtn,
                          opacity: task.assigned === task.required ? 0.3 : 1,
                          cursor: task.assigned === task.required ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Assign Vol
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  badgeDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '12px'
  },
  suppliesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    flexGrow: 1,
    justifyContent: 'center'
  },
  supplyRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  supplyInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px'
  },
  supplyName: {
    color: '#ffffff',
    fontWeight: '500'
  },
  supplyStatus: {
    fontWeight: '600',
    fontSize: '11px'
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  progressBarBg: {
    flexGrow: 1,
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '3px'
  },
  supplyVal: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#ffffff',
    width: '32px',
    textAlign: 'right'
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: '2px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  tabBtn: {
    border: '1px solid transparent',
    borderRadius: '6px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  centerDetailsBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    flexGrow: 1,
    justifyContent: 'center'
  },
  occupancyMetric: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.03)',
    borderRadius: '12px',
    padding: '16px'
  },
  metricBig: {
    fontSize: '38px',
    fontWeight: '700',
    color: '#ffffff'
  },
  metricDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  centerNameLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff'
  },
  occupancyCount: {
    fontSize: '11px',
    color: '#a1a1aa'
  },
  availCount: {
    fontSize: '11px',
    marginTop: '2px'
  },
  facilitiesBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  facilitiesTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  facilityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  facCard: {
    padding: '12px',
    textAlign: 'center'
  },
  facLabel: {
    fontSize: '10px',
    color: '#71717a',
    marginBottom: '6px'
  },
  facValue: {
    fontSize: '11px',
    fontWeight: '700'
  },
  volStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  volStatBox: {
    padding: '14px 8px',
    textAlign: 'center'
  },
  volStatVal: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '4px'
  },
  volStatLabel: {
    fontSize: '10px',
    color: '#71717a',
    lineHeight: '1.2'
  },
  taskListContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flexGrow: 1
  },
  taskListHeader: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px'
  },
  taskTableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  taskTable: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '10px 12px',
    color: '#71717a',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  tr: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.01)'
    }
  },
  td: {
    padding: '12px',
    fontSize: '12px',
    color: '#e4e4e7'
  },
  barProgressGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  smallProgressBg: {
    width: '80px',
    height: '4px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  smallProgressFill: {
    height: '100%'
  },
  barLabelText: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#a1a1aa'
  },
  statusChip: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '600'
  },
  actionBtn: {
    backgroundColor: '#ffffff',
    color: '#0c0c0e',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: '10px',
    fontWeight: '600',
    transition: 'all 0.2s ease'
  }
};
