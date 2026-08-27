import React, { useState } from 'react';

// ==========================================
// 1. SOS Request Status (DONUT CHART)
// ==========================================
export function SOSDonutChart({ scale = 1.0 }) {
  const data = [
    { label: 'Waiting', value: Math.round(82 * scale), color: '#f97316' },     // Orange
    { label: 'In Progress', value: Math.round(41 * scale), color: '#3b82f6' },  // Blue
    { label: 'Resolved', value: Math.round(14 * scale), color: '#10b981' }     // Green
  ];
  const total = Math.round(137 * scale);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // SVG Calculations
  const radius = 60;
  const strokeWidth = 14;
  const circ = 2 * Math.PI * radius;
  const center = 90;

  let currentOffset = 0;

  return (
    <div style={styles.chartContainer}>
      <h4 style={styles.chartTitle}>SOS Request Status</h4>
      
      <div style={styles.donutWrapper}>
        <svg width="180" height="180" viewBox="0 0 180 180">
          <defs>
            {data.map((item, idx) => (
              <filter id={`glow-${idx}`} key={idx}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Background circle track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth={strokeWidth}
          />

          {data.map((item, idx) => {
            const percentage = item.value / total;
            const strokeLength = percentage * circ;
            const strokeOffset = circ - strokeLength + currentOffset;
            currentOffset -= strokeLength;

            const isHovered = hoveredIdx === idx;

            return (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${strokeLength} ${circ}`}
                strokeDashoffset={strokeOffset}
                transform={`rotate(-90 ${center} ${center})`}
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  filter: isHovered ? `url(#glow-${idx})` : 'none'
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}

          {/* Center Info Text */}
          <text x={center} y={center - 5} textAnchor="middle" fill="#71717a" fontSize="11" fontWeight="600">
            TOTAL
          </text>
          <text x={center} y={center + 15} textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="700">
            {hoveredIdx !== null ? data[hoveredIdx].value : total}
          </text>
        </svg>

        {/* Legend */}
        <div style={styles.legend}>
          {data.map((item, idx) => (
            <div 
              key={idx} 
              style={{
                ...styles.legendItem,
                opacity: hoveredIdx === null || hoveredIdx === idx ? 1 : 0.4
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span style={{ ...styles.legendDot, backgroundColor: item.color }}></span>
              <span style={styles.legendLabel}>{item.label}</span>
              <span style={styles.legendVal}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Incident Severity (BAR CHART)
// ==========================================
export function IncidentBarChart({ scale = 1.0 }) {
  const data = [
    { label: 'Critical', value: Math.round(24 * scale), color: '#ef4444' },
    { label: 'High', value: Math.round(38 * scale), color: '#f97316' },
    { label: 'Medium', value: Math.round(31 * scale), color: '#eab308' },
    { label: 'Low', value: Math.round(15 * scale), color: '#10b981' }
  ];

  const maxValue = Math.max(5, Math.round(40 * scale));
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // SVG dimensions
  const height = 180;
  const width = 280;
  const paddingX = 40;
  const paddingY = 20;

  const graphHeight = height - paddingY * 2;
  const graphWidth = width - paddingX * 2;

  return (
    <div style={styles.chartContainer}>
      <h4 style={styles.chartTitle}>Incidents by Severity</h4>
      
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Horizontal grid lines */}
        {[0, Math.round(10 * scale), Math.round(20 * scale), Math.round(30 * scale), Math.round(40 * scale)].map((tick, i) => {
          const y = height - paddingY - (tick / maxValue) * graphHeight;
          return (
            <g key={i}>
              <line 
                x1={paddingX} 
                y1={y} 
                x2={width - paddingX} 
                y2={y} 
                stroke="rgba(255,255,255,0.03)" 
                strokeWidth="1" 
              />
              <text 
                x={paddingX - 10} 
                y={y + 4} 
                fill="#71717a" 
                fontSize="9" 
                textAnchor="end"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((item, idx) => {
          const barWidth = 30;
          const spacing = graphWidth / data.length;
          const x = paddingX + idx * spacing + (spacing - barWidth) / 2;
          const barHeight = (item.value / maxValue) * graphHeight;
          const y = height - paddingY - barHeight;
          
          const isHovered = hoveredIdx === idx;

          return (
            <g key={idx}>
              {/* Hover effect bar bg */}
              <rect
                x={x - 6}
                y={paddingY}
                width={barWidth + 12}
                height={graphHeight}
                fill={isHovered ? 'rgba(255, 255, 255, 0.02)' : 'transparent'}
                rx="6"
                style={{ transition: 'all 0.3s ease' }}
              />

              {/* Styled active bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color}
                opacity={isHovered ? 1 : 0.8}
                rx="4"
                style={{ 
                  transition: 'all 0.3s ease',
                  cursor: 'pointer' 
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />

              {/* Value Text on hover / always */}
              <text
                x={x + barWidth / 2}
                y={y - 6}
                fill={isHovered ? '#ffffff' : '#a1a1aa'}
                fontSize="10"
                fontWeight="700"
                textAnchor="middle"
                style={{ opacity: isHovered ? 1 : 0.6, transition: 'opacity 0.2s' }}
              >
                {item.value}
              </text>

              {/* Label */}
              <text
                x={x + barWidth / 2}
                y={height - paddingY + 14}
                fill={isHovered ? '#ffffff' : '#71717a'}
                fontSize="9"
                fontWeight="600"
                textAnchor="middle"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ==========================================
// 3. Emergency Activity (LINE CHART)
// ==========================================
export function EmergencyLineChart({ scale = 1.0 }) {
  // Last 24 hours (simulated intervals: 0h, 4h, 8h, 12h, 16h, 20h, 24h)
  const intervals = ['04:00', '08:00', '12:00', '16:00', '20:00', '00:00', '04:00'];
  
  const lineData = {
    sos: [10, 18, 45, 82, 95, 115, 137].map(v => Math.round(v * scale)),
    active: [12, 15, 22, 24, 21, 25, 24].map(v => Math.round(v * scale)),
    resolved: [2, 5, 8, 11, 12, 13, 14].map(v => Math.round(v * scale))
  };

  const maxValue = Math.max(10, Math.round(150 * scale));
  const [activeMetric, setActiveMetric] = useState('sos'); // 'sos' | 'active' | 'resolved'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG dimensions
  const height = 180;
  const width = 360;
  const paddingX = 40;
  const paddingY = 20;

  const graphHeight = height - paddingY * 2;
  const graphWidth = width - paddingX * 2;

  // Compute points string for SVG polyline
  const getPointsStr = (dataList) => {
    return dataList.map((val, idx) => {
      const x = paddingX + (idx / (dataList.length - 1)) * graphWidth;
      const y = height - paddingY - (val / maxValue) * graphHeight;
      return `${x},${y}`;
    }).join(' ');
  };

  const getMetricColor = (metric) => {
    switch (metric) {
      case 'sos': return '#f97316';       // Orange
      case 'active': return '#ef4444';    // Red
      case 'resolved': return '#10b981';  // Green
      default: return '#ffffff';
    }
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.lineHeader}>
        <h4 style={styles.chartTitle}>Emergency Activity (24H)</h4>
        <div style={styles.toggleButtons}>
          {[
            { key: 'sos', label: 'SOS', color: '#f97316' },
            { key: 'active', label: 'Incidents', color: '#ef4444' },
            { key: 'resolved', label: 'Resolved', color: '#10b981' }
          ].map(btn => (
            <button
              key={btn.key}
              onClick={() => setActiveMetric(btn.key)}
              style={{
                ...styles.toggleBtn,
                borderColor: activeMetric === btn.key ? btn.color : 'rgba(255, 255, 255, 0.08)',
                color: activeMetric === btn.key ? '#ffffff' : '#71717a',
                backgroundColor: activeMetric === btn.key ? 'rgba(255,255,255,0.03)' : 'transparent'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id={`gradient-${activeMetric}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={getMetricColor(activeMetric)} stopOpacity="0.25" />
            <stop offset="100%" stopColor={getMetricColor(activeMetric)} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, Math.round(50 * scale), Math.round(100 * scale), Math.round(150 * scale)].map((tick, i) => {
          const y = height - paddingY - (tick / maxValue) * graphHeight;
          return (
            <g key={i}>
              <line 
                x1={paddingX} 
                y1={y} 
                x2={width - paddingX} 
                y2={y} 
                stroke="rgba(255,255,255,0.03)" 
                strokeWidth="1" 
              />
              <text 
                x={paddingX - 10} 
                y={y + 4} 
                fill="#71717a" 
                fontSize="9" 
                textAnchor="end"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Gradient fill area under the line */}
        <polygon
          points={`${paddingX},${height - paddingY} ${getPointsStr(lineData[activeMetric])} ${width - paddingX},${height - paddingY}`}
          fill={`url(#gradient-${activeMetric})`}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Trend Line */}
        <polyline
          fill="none"
          stroke={getMetricColor(activeMetric)}
          strokeWidth="3"
          points={getPointsStr(lineData[activeMetric])}
          style={{ transition: 'all 0.3s ease' }}
        />

        {/* Interactive dots & hover detection */}
        {lineData[activeMetric].map((val, idx) => {
          const x = paddingX + (idx / (lineData[activeMetric].length - 1)) * graphWidth;
          const y = height - paddingY - (val / maxValue) * graphHeight;
          const isHovered = hoveredPoint === idx;

          return (
            <g key={idx}>
              {/* Invisible large hover area */}
              <circle
                cx={x}
                cy={y}
                r="16"
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredPoint(idx)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {/* Visible dot */}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 6 : 4}
                fill={getMetricColor(activeMetric)}
                stroke="#ffffff"
                strokeWidth={isHovered ? 2 : 1.5}
                style={{ transition: 'all 0.2s ease', pointerEvents: 'none' }}
              />
              {/* Tooltip on hover */}
              {isHovered && (
                <g pointerEvents="none">
                  <rect
                    x={x - 22}
                    y={y - 25}
                    width="44"
                    height="16"
                    rx="4"
                    fill="rgba(0,0,0,0.85)"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.5"
                  />
                  <text
                    x={x}
                    y={y - 14}
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {val}
                  </text>
                </g>
              )}
              {/* Axis Label */}
              <text
                x={x}
                y={height - paddingY + 14}
                fill="#71717a"
                fontSize="8"
                fontWeight="500"
                textAnchor="middle"
              >
                {intervals[idx]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const styles = {
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  chartTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#a1a1aa',
    marginBottom: '16px'
  },
  donutWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    flexGrow: 1
  },
  legend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease'
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  legendLabel: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#a1a1aa',
    width: '75px'
  },
  legendVal: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#ffffff'
  },
  lineHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  toggleButtons: {
    display: 'flex',
    gap: '4px'
  },
  toggleBtn: {
    fontSize: '9px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '4px',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};
