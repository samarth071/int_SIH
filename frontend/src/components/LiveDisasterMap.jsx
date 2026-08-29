import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Navigation, 
  Activity, 
  ShieldAlert, 
  Home, 
  Heart, 
  Skull,
  Eye
} from 'lucide-react';

export default function LiveDisasterMap({ 
  selectedRegion, 
  onSelectRegion, 
  onResetSelection,
  selectedNode: propSelectedNode,
  setSelectedNode: propSetSelectedNode
}) {
  const [activeLayers, setActiveLayers] = useState({
    incidents: true,
    sos: true,
    critical: true,
    highRisk: true,
    shelters: true,
    hospitals: true,
    responders: true,
    blockedRoads: true,
    flood: true
  });

  const [localSelectedNode, setLocalSelectedNode] = useState(null);
  const selectedNode = propSelectedNode !== undefined ? propSelectedNode : localSelectedNode;
  const setSelectedNode = propSetSelectedNode !== undefined ? propSetSelectedNode : setLocalSelectedNode;

  const handleMapClick = (e) => {
    // If the user clicked on an interactive node, ignore it
    let current = e.target;
    while (current && current !== e.currentTarget) {
      if (current.tagName === 'g' && current.style.cursor === 'pointer') {
        return; // Clicked on a marker node, ignore background handler
      }
      current = current.parentNode;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Scale from element bounds to 700x400 viewBox
    const svgX = Math.round((clickX / rect.width) * 700);
    const svgY = Math.round((clickY / rect.height) * 400);

    setSelectedNode({
      id: 'custom-pin',
      type: 'custom',
      x: svgX,
      y: svgY,
      label: 'Manual Selection',
      desc: 'User specified coordinate'
    });
  };

  // Mock map data locations
  const nodes = [
    // Incidents
    { id: 1, type: 'incidents', x: 220, y: 140, label: 'Critical: Flood Rescue', desc: '18 People Affected, Mysuru East', severity: 'critical' },
    { id: 2, type: 'incidents', x: 380, y: 280, label: 'Critical: Building Collapse', desc: '9 People Affected, Zone B', severity: 'critical' },
    { id: 3, type: 'incidents', x: 520, y: 190, label: 'High: Medical Emergency', desc: '4 People Affected, Zone C', severity: 'high' },
    
    // SOS
    { id: 4, type: 'sos', x: 180, y: 210, label: 'SOS Request #1024', desc: 'Waiting - Water rescue requested', status: 'waiting' },
    { id: 5, type: 'sos', x: 440, y: 150, label: 'SOS Request #1028', desc: 'In Progress - Building evacuation', status: 'progress' },
    { id: 6, type: 'sos', x: 300, y: 340, label: 'SOS Request #1031', desc: 'Waiting - Elderly evacuation support', status: 'waiting' },

    // Relief Shelters
    { id: 7, type: 'shelters', x: 290, y: 180, label: 'Relief Center #04', desc: 'Occupancy: 82% (410/500)', capacity: 'near-full' },
    { id: 8, type: 'shelters', x: 600, y: 250, label: 'Relief Center #05', desc: 'Occupancy: 45% (225/500)', capacity: 'normal' },

    // Hospitals
    { id: 9, type: 'hospitals', x: 150, y: 310, label: 'City General Hospital', desc: 'Fully operational, emergency ward open' },
    { id: 10, type: 'hospitals', x: 480, y: 110, label: 'Apex Trauma Care Center', desc: 'Critical supply warning, power on backups' },

    // Responders
    { id: 11, type: 'responders', x: 250, y: 155, label: 'Rescue Team 04', desc: 'En Route - ETA 6 min' },
    { id: 12, type: 'responders', x: 410, y: 260, label: 'Medical Team 02', desc: 'Available - Stationed' },
    { id: 13, type: 'responders', x: 320, y: 200, label: 'Police Unit 08', desc: 'Responding - Incident site' }
  ];

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const getLayerColor = (type) => {
    switch (type) {
      case 'incidents': return '#ef4444';
      case 'sos': return '#f97316';
      case 'shelters': return '#3b82f6';
      case 'hospitals': return '#10b981';
      case 'responders': return '#ec4899';
      case 'custom': return '#3b82f6';
      default: return '#ffffff';
    }
  };

  return (
    <div style={styles.container} className="glass-panel">
      {/* Map Header */}
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <Activity size={18} color="#ef4444" style={styles.pulseIcon} />
          <h3 style={styles.title}>Live Disaster Map</h3>
          {selectedRegion && (
            <span style={styles.selectedRegionBadge}>
              📍 Selected: {selectedRegion.name} ({selectedRegion.radius >= 1000 ? `${selectedRegion.radius/1000}km` : `${selectedRegion.radius}m`})
            </span>
          )}
        </div>
        <div style={styles.headerRight}>
          {selectedRegion && (
            <button 
              style={styles.resetBtn} 
              onClick={() => {
                onResetSelection();
                setSelectedNode(null);
              }}
            >
              Reset Selection
            </button>
          )}
          <div style={styles.badge}>
            <span style={styles.liveDot}></span> Live Telemetry
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div style={styles.mapArea}>
        {/* Layer Controls Panel (Left overlay) */}
        <div style={styles.layerControlPanel}>
          <div style={styles.layerPanelTitle}>
            <Layers size={14} style={{ marginRight: '6px' }} />
            Layers
          </div>
          <div style={styles.layerList}>
            {[
              { id: 'incidents', label: 'Active Incidents', color: '#ef4444' },
              { id: 'sos', label: 'SOS Locations', color: '#f97316' },
              { id: 'critical', label: 'Critical Zones', color: 'rgba(239, 68, 68, 0.2)' },
              { id: 'highRisk', label: 'High-Risk Zones', color: 'rgba(249, 115, 22, 0.2)' },
              { id: 'shelters', label: 'Relief Centers', color: '#3b82f6' },
              { id: 'hospitals', label: 'Hospitals', color: '#10b981' },
              { id: 'responders', label: 'Responders', color: '#ec4899' },
              { id: 'blockedRoads', label: 'Blocked Roads', color: '#7f1d1d' },
              { id: 'flood', label: 'Flood Zones', color: 'rgba(59, 130, 246, 0.15)' }
            ].map(layer => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                style={{
                  ...styles.layerButton,
                  opacity: activeLayers[layer.id] ? 1 : 0.4
                }}
              >
                <span style={{ ...styles.colorIndicator, backgroundColor: layer.color }}></span>
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom SVG Map Canvas */}
        <svg viewBox="0 0 700 400" style={styles.svg} onClick={handleMapClick}>
          {/* Base Geography / Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            </pattern>
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(239, 68, 68, 0.08)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
            </radialGradient>
          </defs>

          {/* Grid Background */}
          <rect id="map-grid" width="100%" height="100%" fill="url(#grid)" />

          {/* Selected Region Circle Overlay */}
          {selectedRegion && (
            <g>
              <circle
                cx={selectedRegion.x}
                cy={selectedRegion.y}
                r={selectedRegion.radius === 500 ? 50 : selectedRegion.radius === 1000 ? 100 : 200}
                fill="rgba(59, 130, 246, 0.03)"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeDasharray="5,3"
                style={{ pointerEvents: 'none' }}
              />
              <circle
                cx={selectedRegion.x}
                cy={selectedRegion.y}
                r={selectedRegion.radius === 500 ? 50 : selectedRegion.radius === 1000 ? 100 : 200}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="6"
                opacity="0.1"
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}

          {/* Topographic Lines / Rivers (Custom Vector art) */}
          <path d="M 0,200 Q 150,150 250,220 T 500,280 T 700,210" fill="none" stroke="rgba(59, 130, 246, 0.12)" strokeWidth="24" />
          <path d="M 0,200 Q 150,150 250,220 T 500,280 T 700,210" fill="none" stroke="rgba(59, 130, 246, 0.08)" strokeWidth="36" />

          {/* Roads & Networks */}
          <path d="M 100,0 L 120,400 M 0,100 L 700,120 M 350,0 L 320,400 M 0,300 L 700,320" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="3" />

          {/* Blocked Roads Layer */}
          {activeLayers.blockedRoads && (
            <>
              <path d="M 110,200 L 115,300" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="6,4" />
              <path d="M 200,120 L 320,120" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="6,4" />
              {/* Blocked markers */}
              <circle cx="112" cy="250" r="10" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" />
              <line x1="107" y1="245" x2="117" y2="255" stroke="#ef4444" strokeWidth="2" />
              <line x1="117" y1="245" x2="107" y2="255" stroke="#ef4444" strokeWidth="2" />

              <circle cx="260" cy="120" r="10" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" />
              <line x1="255" y1="115" x2="265" y2="125" stroke="#ef4444" strokeWidth="2" />
              <line x1="265" y1="115" x2="255" y2="125" stroke="#ef4444" strokeWidth="2" />
            </>
          )}

          {/* Flood Zones Layer */}
          {activeLayers.flood && (
            <path d="M 80,180 C 140,150 200,200 280,240 C 240,280 180,290 100,260 Z" fill="rgba(59, 130, 246, 0.18)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" strokeDasharray="4,2" />
          )}

          {/* Critical Risk Zones (Zone A) */}
          {activeLayers.critical && (
            <g>
              <ellipse cx="230" cy="160" rx="90" ry="60" fill="rgba(239, 68, 68, 0.08)" stroke="rgba(239, 68, 68, 0.25)" strokeWidth="1.5" strokeDasharray="6,3" />
              <text x="230" y="165" fill="rgba(239, 68, 68, 0.4)" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="1">CRITICAL ZONE A</text>
            </g>
          )}

          {/* High Risk Zones (Zone B & C) */}
          {activeLayers.highRisk && (
            <g>
              <ellipse cx="430" cy="250" rx="100" ry="70" fill="rgba(249, 115, 22, 0.05)" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x="430" y="255" fill="rgba(249, 115, 22, 0.3)" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="1">HIGH-RISK ZONE B</text>
            </g>
          )}

          {/* Radar sweep simulation */}
          <circle cx="350" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle cx="350" cy="200" r="280" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

          {/* Dotted Route Line to Assigned Team */}
          {selectedNode?.type === 'incidents' && (
            (() => {
              let responderX = null;
              let responderY = null;
              if (selectedNode.id === 1) {
                responderX = 250;
                responderY = 155;
              } else if (selectedNode.id === 2) {
                responderX = 250;
                responderY = 155;
              } else if (selectedNode.id === 3) {
                responderX = 410;
                responderY = 260;
              }

              if (responderX !== null) {
                return (
                  <g>
                    <path
                      d={`M ${selectedNode.x},${selectedNode.y} L ${responderX},${responderY}`}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    >
                      <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
                    </path>
                    <circle cx={responderX} cy={responderY} r="14" fill="none" stroke="#ec4899" strokeWidth="1.5">
                      <animate attributeName="r" values="5;14" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              }
            })()
          )}

          {/* Custom Pin Marker */}
          {selectedNode?.id === 'custom-pin' && (
            <g transform={`translate(${selectedNode.x}, ${selectedNode.y})`}>
              <circle r="15" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.8">
                <animate attributeName="r" values="5;18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <text y="-14" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.9)' }}>
                Selected Point
              </text>
            </g>
          )}

          {/* Render Active Nodes */}
          {nodes
            .filter(node => activeLayers[node.type])
            .map(node => {
              const color = getLayerColor(node.type);
              const isSelected = selectedNode?.id === node.id;
              return (
                <g 
                  key={node.id} 
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedNode(node)}
                >
                  {/* Pulsing effects for SOS and Incidents */}
                  {(node.type === 'sos' || (node.type === 'incidents' && node.severity === 'critical')) && (
                    <circle r="15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8">
                      <animate attributeName="r" values="5;18" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Node Anchor shape */}
                  <circle 
                    r={isSelected ? 7 : 5} 
                    fill={color} 
                    stroke="#ffffff" 
                    strokeWidth={isSelected ? 2 : 1}
                  />

                  {/* Muted label under nodes */}
                  {isSelected && (
                    <rect 
                      x="-50" 
                      y="-25" 
                      width="100" 
                      height="16" 
                      rx="4" 
                      fill="rgba(0, 0, 0, 0.85)" 
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="0.5"
                    />
                  )}
                  <text 
                    y={isSelected ? "-14" : "15"} 
                    fill="#ffffff" 
                    fontSize={isSelected ? "9" : "8"} 
                    fontWeight={isSelected ? "bold" : "normal"}
                    textAnchor="middle"
                    style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.9)' }}
                  >
                    {node.type === 'sos' ? `SOS #${node.id + 1020}` : node.label.split(':').pop().trim()}
                  </text>
                </g>
              );
            })}
        </svg>

        {/* Selected Details Overlay */}
        {selectedNode && (
          <div style={styles.detailPopup}>
            <div style={styles.popupHeader}>
              <div style={styles.popupTag}>
                <span 
                  style={{ 
                    ...styles.statusDot, 
                    backgroundColor: getLayerColor(selectedNode.type) 
                  }}
                ></span>
                {selectedNode.type.toUpperCase()}
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>
            <div style={styles.popupTitle}>{selectedNode.label}</div>
            <div style={styles.popupDesc}>{selectedNode.desc}</div>

            {selectedNode.type === 'incidents' && (
              <div style={styles.popupAssignedSection}>
                <span style={styles.assignedLabel}>Assigned Unit:</span>
                <span style={styles.assignedValue}>
                  {selectedNode.id === 1 && "Rescue Team 04 (En Route - ETA 6m)"}
                  {selectedNode.id === 2 && "Rescue Team 04 (En Route - ETA 6m)"}
                  {selectedNode.id === 3 && "Medical Team 02 (Stationed - Available)"}
                </span>
              </div>
            )}

            {/* Filter Dashboard by Radius Controls */}
            <div style={styles.popupSelectRegionSection}>
              <span style={styles.radiusLabel}>Filter Dashboard by Radius:</span>
              <div style={styles.radiusButtons}>
                {[500, 1000, 2000].map(r => {
                  const isActive = selectedRegion?.x === selectedNode.x && 
                                   selectedRegion?.y === selectedNode.y && 
                                   selectedRegion?.radius === r;
                  return (
                    <button
                      key={r}
                      style={{
                        ...styles.radiusBtn,
                        ...(isActive ? styles.radiusBtnActive : {})
                      }}
                      onClick={() => onSelectRegion({
                        nodeId: selectedNode.id,
                        name: selectedNode.label.split(':').pop().trim(),
                        x: selectedNode.x,
                        y: selectedNode.y,
                        radius: r
                      })}
                    >
                      {r >= 1000 ? `${r/1000}km` : `${r}m`}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={styles.popupFooter}>
              <span>Coordinates: {selectedNode.x}°N, {selectedNode.y}°E</span>
              <button style={styles.actionBtn}>
                Focus Unit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  pulseIcon: {
    animation: 'pulse-slow 2s infinite'
  },
  title: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  selectedRegionBadge: {
    fontSize: '11px',
    color: '#3b82f6',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    padding: '3px 8px',
    borderRadius: '6px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  resetBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '10px',
    fontWeight: '600',
    padding: '4px 10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  badge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  liveDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'pulse-ring 2s infinite'
  },
  mapArea: {
    position: 'relative',
    flexGrow: 1,
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex'
  },
  layerControlPanel: {
    width: '150px',
    backgroundColor: 'rgba(12, 12, 14, 0.85)',
    borderRight: '1px solid rgba(255, 255, 255, 0.06)',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2,
    backdropFilter: 'blur(10px)'
  },
  layerPanelTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#a1a1aa',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  layerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  layerButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#e4e4e7',
    fontSize: '11px',
    fontWeight: '500',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '4px 0',
    transition: 'opacity 0.2s ease'
  },
  colorIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginRight: '8px',
    flexShrink: 0
  },
  svg: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
    zIndex: 1
  },
  detailPopup: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    width: '280px',
    backgroundColor: '#121215',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '14px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    zIndex: 3,
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    animation: 'pulse-slow 8s infinite'
  },
  popupHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  popupTag: {
    fontSize: '9px',
    fontWeight: '700',
    color: '#a1a1aa',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%'
  },
  closeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#71717a',
    cursor: 'pointer',
    fontSize: '12px'
  },
  popupTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#ffffff'
  },
  popupDesc: {
    fontSize: '11px',
    color: '#a1a1aa',
    lineHeight: '1.4'
  },
  popupFooter: {
    marginTop: '4px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '9px',
    color: '#71717a'
  },
  actionBtn: {
    backgroundColor: '#ffffff',
    color: '#0c0c0e',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '9px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  popupSelectRegionSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '10px',
    marginTop: '4px'
  },
  radiusLabel: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  radiusButtons: {
    display: 'flex',
    gap: '4px'
  },
  radiusBtn: {
    flex: 1,
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: '#a1a1aa',
    fontSize: '10px',
    fontWeight: '600',
    padding: '4px 0',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.15s ease',
    outline: 'none'
  },
  radiusBtnActive: {
    backgroundColor: '#3b82f6',
    border: '1px solid #3b82f6',
    color: '#ffffff'
  },
  popupAssignedSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '10px',
    marginTop: '4px'
  },
  assignedLabel: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  assignedValue: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#ec4899'
  }
};
