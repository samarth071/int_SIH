import { useState } from 'react';
import { mockShelters, SHELTER_STATUS, SHELTER_TYPES } from '../data/mockShelters.js';
import { ArrowLeftIcon, LocationIcon, PhoneIcon, SearchIcon } from '../components/icons.jsx';
import './Shelters.css';

function CapacityBar({ capacity, occupied }) {
  const pct = Math.min(100, Math.round((occupied / capacity) * 100));
  const color = pct >= 90 ? '#DC2626' : pct >= 70 ? '#D97706' : '#059669';
  return (
    <div className="shelter-cap-bar" aria-label={`${pct}% full`}>
      <div className="shelter-cap-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export default function Shelters({ navigate }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = mockShelters.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="cp-page-wide shelter-page">
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <button className="sos-back-btn" onClick={() => navigate('home')}>
          <ArrowLeftIcon size={18} /> Back
        </button>

        <div className="cp-page-header">
          <h1 className="cp-page-title">Nearby Shelters</h1>
          <p className="cp-page-subtitle">
            Find available relief camps, shelters, and emergency facilities near you.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="shelter-controls">
          <div className="shelter-search-wrap">
            <SearchIcon size={16} />
            <input
              type="search"
              className="shelter-search"
              placeholder="Search by name or area…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search shelters"
            />
          </div>
          <div className="shelter-filter-chips">
            {[
              { id: 'all', label: 'All' },
              { id: 'open', label: 'Open' },
              { id: 'almost_full', label: 'Almost Full' },
              { id: 'full', label: 'Full' },
            ].map((f) => (
              <button
                key={f.id}
                className={`shelter-filter-chip ${filterStatus === f.id ? 'active' : ''}`}
                onClick={() => setFilterStatus(f.id)}
                aria-pressed={filterStatus === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shelter list */}
        {filtered.length === 0 ? (
          <div className="cp-empty">
            <SearchIcon size={36} />
            <p>No shelters match your search.</p>
          </div>
        ) : (
          <div className="shelter-list">
            {filtered.map((s) => {
              const statusInfo = SHELTER_STATUS[s.status] || SHELTER_STATUS.closed;
              const pct = Math.round((s.occupied / s.capacity) * 100);

              return (
                <div key={s.id} className="shelter-card cp-card">
                  <div className="shelter-card-top">
                    <div>
                      <h3 className="shelter-name">{s.name}</h3>
                      <p className="shelter-type">{SHELTER_TYPES[s.type] || s.type}</p>
                    </div>
                    <span
                      className="cp-badge"
                      style={{ background: statusInfo.bg, color: statusInfo.color }}
                    >
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="shelter-address-row">
                    <LocationIcon size={14} />
                    <span>{s.address}</span>
                    <span className="shelter-distance">{s.distance}</span>
                  </div>

                  {/* Capacity bar */}
                  <div className="shelter-cap-section">
                    <div className="shelter-cap-label">
                      <span>Capacity</span>
                      <span>
                        {s.occupied} / {s.capacity} ({pct}% full)
                      </span>
                    </div>
                    <CapacityBar capacity={s.capacity} occupied={s.occupied} />
                  </div>

                  {/* Facilities */}
                  {s.facilities.length > 0 && (
                    <div className="shelter-facilities">
                      {s.facilities.map((f) => (
                        <span key={f} className="cp-tag">{f}</span>
                      ))}
                    </div>
                  )}

                  {/* Contact */}
                  {s.contact && (
                    <div className="shelter-contact">
                      <PhoneIcon size={14} />
                      <a href={`tel:${s.contact}`}>{s.contact}</a>
                    </div>
                  )}

                  <p className="shelter-updated">
                    Updated: {new Date(s.lastUpdated).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })},{' '}
                    {new Date(s.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="cp-banner cp-banner-info" style={{ marginTop: '8px' }}>
          <span>Shelter data is updated every 30 minutes by state emergency authorities. Call ahead to confirm availability before travelling.</span>
        </div>
      </div>
    </div>
  );
}
