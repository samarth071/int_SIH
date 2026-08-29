import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  Users, 
  Droplet, 
  Utensils, 
  HeartPulse, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Truck, 
  Send,
  Plus
} from 'lucide-react';
import './admin.css';

export default function AdminSheltersRelief({ 
  shelters, 
  supplies, 
  onUpdateSupplyStatus,
  onNavigate 
}) {
  const [activeTab, setActiveTab] = useState('shelters'); // 'shelters' | 'relief'
  const [dispatchModalSupply, setDispatchModalSupply] = useState(null);
  const [targetDestination, setTargetDestination] = useState('');
  const [dispatchStatus, setDispatchStatus] = useState('Dispatched');

  const totalCapacity = shelters.reduce((acc, curr) => acc + curr.totalCapacity, 0);
  const totalOccupied = shelters.reduce((acc, curr) => acc + curr.currentOccupancy, 0);
  const availableBeds = totalCapacity - totalOccupied;
  const overallOccupancyPercent = Math.round((totalOccupied / totalCapacity) * 100);

  const handleDispatchSubmit = (e) => {
    e.preventDefault();
    if (dispatchModalSupply && onUpdateSupplyStatus) {
      onUpdateSupplyStatus(dispatchModalSupply.id, dispatchStatus, targetDestination);
    }
    setDispatchModalSupply(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="admin-badge badge-green">Delivered</span>;
      case 'Dispatched':
        return <span className="admin-badge badge-blue">Dispatched / In Transit</span>;
      case 'Preparing':
        return <span className="admin-badge badge-orange">Preparing</span>;
      case 'Available':
      default:
        return <span className="admin-badge badge-green">Available</span>;
    }
  };

  return (
    <div className="admin-view-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-title-row">
            <h1 className="admin-title">Shelters & Humanitarian Relief</h1>
            <span className="admin-badge badge-blue">Logistics Control</span>
          </div>
          <p className="admin-subtitle">
            Evacuation camp capacities, bed occupancy telemetry, and relief inventory dispatch pipeline.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="admin-header-right">
          <div className="radius-pill-group">
            <button 
              className={`radius-pill-btn ${activeTab === 'shelters' ? 'active' : ''}`}
              onClick={() => setActiveTab('shelters')}
            >
              Shelter Camps ({shelters.length})
            </button>
            <button 
              className={`radius-pill-btn ${activeTab === 'relief' ? 'active' : ''}`}
              onClick={() => setActiveTab('relief')}
            >
              Relief Supplies ({supplies.length})
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>
            <Home size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Total Shelter Capacity</span>
            <span className="admin-stat-value">{totalCapacity.toLocaleString()} Beds</span>
            <span className="admin-stat-trend">Across 5 municipal complexes</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
            <Users size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Current Occupancy</span>
            <span className="admin-stat-value">{totalOccupied.toLocaleString()} <span style={{ fontSize: '14px', color: '#a1a1aa' }}>({overallOccupancyPercent}%)</span></span>
            <span className="admin-stat-trend" style={{ color: '#f97316' }}>{availableBeds} beds remaining</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e' }}>
            <Utensils size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Meals Dispatched Today</span>
            <span className="admin-stat-value">14,500</span>
            <span className="admin-stat-trend">Ready-to-eat rations</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrap" style={{ background: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4' }}>
            <Droplet size={22} />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-label">Clean Water Dispatched</span>
            <span className="admin-stat-value">18,000 L</span>
            <span className="admin-stat-trend">Bottled & tanker distribution</span>
          </div>
        </div>
      </div>

      {/* TAB 1: SHELTERS */}
      {activeTab === 'shelters' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="sub-grid-2">
            {shelters.map((shelter) => {
              const occPercent = Math.round((shelter.currentOccupancy / shelter.totalCapacity) * 100);
              const isHigh = occPercent >= 90;
              const isMed = occPercent >= 70 && occPercent < 90;

              return (
                <div key={shelter.id} className="admin-card" style={{ padding: '22px', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#71717a', fontFamily: 'monospace' }}>{shelter.id}</span>
                      <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#ffffff', margin: '2px 0 0' }}>
                        {shelter.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a1a1aa', fontSize: '12px', marginTop: '2px' }}>
                        <MapPin size={12} />
                        <span>{shelter.address}</span>
                      </div>
                    </div>

                    <span className={`admin-badge ${isHigh ? 'badge-red' : isMed ? 'badge-orange' : 'badge-green'}`}>
                      {shelter.status}
                    </span>
                  </div>

                  {/* Occupancy Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#a1a1aa', marginBottom: '6px' }}>
                      <span>Occupied: <strong>{shelter.currentOccupancy}</strong> / {shelter.totalCapacity}</span>
                      <span style={{ color: isHigh ? '#ef4444' : isMed ? '#f97316' : '#22c55e', fontWeight: '700' }}>
                        {occPercent}% Full ({shelter.totalCapacity - shelter.currentOccupancy} Available)
                      </span>
                    </div>
                    <div className="capacity-bar-wrap" style={{ height: '8px' }}>
                      <div 
                        className="capacity-bar-fill" 
                        style={{ 
                          width: `${occPercent}%`,
                          backgroundColor: isHigh ? '#ef4444' : isMed ? '#f97316' : '#22c55e'
                        }}
                      />
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#71717a', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Available On-Site Facilities:
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {shelter.facilities.map((fac, idx) => (
                        <span key={idx} className="admin-badge badge-gray" style={{ fontSize: '11px' }}>
                          ✓ {fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                      Help Desk: {shelter.contact}
                    </span>

                    <button 
                      className="admin-btn admin-btn-outline admin-btn-sm"
                      onClick={() => onNavigate('map')}
                    >
                      Locate on Map
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: RELIEF SUPPLIES */}
      {activeTab === 'relief' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Resource Description</th>
                    <th>Total Inventory</th>
                    <th>Allocated / Dispatched</th>
                    <th>Available in Depot</th>
                    <th>Dispatched Destination</th>
                    <th>Delivery Status</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {supplies.map((sup) => (
                    <tr key={sup.id}>
                      <td style={{ fontWeight: '600', color: '#ffffff' }}>
                        {sup.category}
                      </td>
                      <td style={{ color: '#e4e4e7' }}>
                        {sup.name}
                      </td>
                      <td style={{ color: '#ffffff', fontWeight: '600' }}>
                        {sup.quantity.toLocaleString()} {sup.unit}
                      </td>
                      <td style={{ color: '#60a5fa' }}>
                        {sup.allocated.toLocaleString()} {sup.unit}
                      </td>
                      <td style={{ color: '#22c55e', fontWeight: '700' }}>
                        {sup.available.toLocaleString()} {sup.unit}
                      </td>
                      <td style={{ fontSize: '12px', color: '#a1a1aa' }}>
                        {sup.lastDispatchedTo}
                      </td>
                      <td>
                        {getStatusBadge(sup.status)}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button 
                          className="admin-btn admin-btn-primary admin-btn-sm"
                          onClick={() => {
                            setDispatchModalSupply(sup);
                            setTargetDestination(sup.lastDispatchedTo);
                            setDispatchStatus(sup.status);
                          }}
                        >
                          <Truck size={12} />
                          <span>Dispatch</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Dispatch Supply Modal */}
      {dispatchModalSupply && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Dispatch Supplies: {dispatchModalSupply.name}</h3>
              <button 
                className="admin-btn admin-btn-outline admin-btn-sm"
                onClick={() => setDispatchModalSupply(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDispatchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Destination Zone / Shelter</label>
                <select 
                  className="admin-form-select"
                  value={targetDestination}
                  onChange={(e) => setTargetDestination(e.target.value)}
                  required
                >
                  <option value="">-- Choose Destination --</option>
                  <option value="Tapi River Basin Flood Zone">Tapi River Basin Flood Zone</option>
                  <option value="Sector 4 Collapse Site">Sector 4 Collapse Site</option>
                  <option value="Government Model High School Camp">Government Model High School Camp</option>
                  <option value="NDRF Athwa Stadium Base">NDRF Athwa Stadium Base</option>
                  <option value="Dumas Coastal Belt">Dumas Coastal Belt</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Logistics Status</label>
                <select 
                  className="admin-form-select"
                  value={dispatchStatus}
                  onChange={(e) => setDispatchStatus(e.target.value)}
                >
                  <option value="Preparing">Preparing at Warehouse</option>
                  <option value="Dispatched">Dispatched / In Transit</option>
                  <option value="Delivered">Delivered On Site</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-outline"
                  onClick={() => setDispatchModalSupply(null)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
