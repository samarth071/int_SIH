import React, { useState } from 'react';
import { 
  Bell, 
  Radio, 
  AlertOctagon, 
  ShieldCheck, 
  HeartHandshake, 
  AlertTriangle, 
  Check, 
  Trash2,
  ArrowRight,
  Filter
} from 'lucide-react';
import './admin.css';

export default function AdminNotifications({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onNavigate,
  onSelectIncident,
  incidents = []
}) {
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'sos' | 'incident' | 'team' | 'ngo' | 'alert'

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (activeCategory === 'all') return true;
    return n.category === activeCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'sos':
        return <Radio size={16} color="#ef4444" />;
      case 'incident':
        return <AlertOctagon size={16} color="#ef4444" />;
      case 'team':
        return <ShieldCheck size={16} color="#60a5fa" />;
      case 'ngo':
        return <HeartHandshake size={16} color="#10b981" />;
      case 'alert':
      default:
        return <AlertTriangle size={16} color="#f97316" />;
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="admin-badge badge-red">Critical Priority</span>;
      case 'warning':
        return <span className="admin-badge badge-orange">Warning</span>;
      case 'success':
        return <span className="admin-badge badge-green">Success</span>;
      case 'info':
      default:
        return <span className="admin-badge badge-blue">Info</span>;
    }
  };

  const handleNotificationClick = (notif) => {
    if (onMarkAsRead) {
      onMarkAsRead(notif.id);
    }

    if (notif.targetType === 'incident') {
      const matchInc = incidents.find(i => i.id === notif.targetId);
      if (matchInc && onSelectIncident) {
        onSelectIncident(matchInc);
        onNavigate('incident-details');
      } else {
        onNavigate('incidents');
      }
    } else if (notif.targetType === 'team') {
      onNavigate('teams');
    } else if (notif.targetType === 'shelter') {
      onNavigate('shelters-relief');
    } else if (notif.targetType === 'alert') {
      onNavigate('alerts');
    }
  };

  return (
    <div className="admin-view-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-title-row">
            <h1 className="admin-title">Notification Centre</h1>
            {unreadCount > 0 && (
              <span className="admin-badge badge-red">{unreadCount} Unread Alerts</span>
            )}
          </div>
          <p className="admin-subtitle">
            Direct high-priority situational notifications streamed from field teams, citizen SOS, and partner NGOs.
          </p>
        </div>

        <div className="admin-header-right">
          {unreadCount > 0 && (
            <button 
              className="admin-btn admin-btn-outline"
              onClick={onMarkAllAsRead}
            >
              <Check size={14} />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="admin-filters-bar">
        <div className="admin-filters-left">
          <div className="radius-pill-group">
            <button 
              className={`radius-pill-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Notifications ({notifications.length})
            </button>
            <button 
              className={`radius-pill-btn ${activeCategory === 'sos' ? 'active' : ''}`}
              onClick={() => setActiveCategory('sos')}
            >
              New SOS
            </button>
            <button 
              className={`radius-pill-btn ${activeCategory === 'incident' ? 'active' : ''}`}
              onClick={() => setActiveCategory('incident')}
            >
              Critical Incidents
            </button>
            <button 
              className={`radius-pill-btn ${activeCategory === 'team' ? 'active' : ''}`}
              onClick={() => setActiveCategory('team')}
            >
              Team Updates
            </button>
            <button 
              className={`radius-pill-btn ${activeCategory === 'ngo' ? 'active' : ''}`}
              onClick={() => setActiveCategory('ngo')}
            >
              NGO Relief
            </button>
            <button 
              className={`radius-pill-btn ${activeCategory === 'alert' ? 'active' : ''}`}
              onClick={() => setActiveCategory('alert')}
            >
              Early Warnings
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Feed */}
      <div className="admin-card" style={{ gap: '12px' }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#71717a' }}>
            No notifications in this category.
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className="priority-item"
              style={{
                background: notif.read ? 'rgba(255, 255, 255, 0.015)' : 'rgba(255, 255, 255, 0.04)',
                borderColor: notif.read ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.15)',
                cursor: 'pointer'
              }}
              onClick={() => handleNotificationClick(notif)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flexGrow: 1 }}>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getCategoryIcon(notif.category)}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>
                      {notif.title}
                    </span>
                    {getSeverityBadge(notif.severity)}
                    {!notif.read && (
                      <span className="pulse-dot" style={{ background: '#ef4444' }}></span>
                    )}
                  </div>

                  <div style={{ fontSize: '13px', color: '#d4d4d8', lineHeight: '1.4' }}>
                    {notif.message}
                  </div>

                  <div style={{ fontSize: '11px', color: '#71717a', marginTop: '2px' }}>
                    {notif.timestamp}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  className="admin-btn admin-btn-outline admin-btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotificationClick(notif);
                  }}
                >
                  <span>Inspect</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
