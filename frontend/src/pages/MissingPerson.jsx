import { useState } from 'react';
import { mockMissingPersons } from '../data/mockReports.js';
import {
  ArrowLeftIcon,
  UserIcon,
  UploadIcon,
  CheckCircleIcon,
  SearchIcon,
} from '../components/icons.jsx';
import './MissingPerson.css';

const TABS = [
  { id: 'report', label: 'Report Missing' },
  { id: 'found', label: 'Report Found' },
  { id: 'view', label: 'Search Reports' },
];

const INITIAL_FORM = {
  name: '',
  age: '',
  gender: '',
  description: '',
  lastSeen: '',
  contact: '',
  photo: null,
};

function ReportMissingForm({ onSubmit, type }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [photoName, setPhotoName] = useState('');

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (file) {
      setPhotoName(file.name);
      handleChange('photo', file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.description || !form.contact) return;
    onSubmit(form);
  }

  const isPerson = type === 'report';
  const placeholder = isPerson
    ? 'e.g., Tall, grey hair, wearing white kurta. Has a hearing aid in right ear.'
    : 'e.g., Found a woman in green saree, confused, near Main Road bus stop.';

  return (
    <form className="missing-form" onSubmit={handleSubmit} noValidate>
      <div className="cp-form-group">
        <label className="cp-label" htmlFor="mp-name">
          {isPerson ? 'Full Name *' : "Approximate Description / Name (if known) *"}
        </label>
        <input
          id="mp-name"
          className="cp-input"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder={isPerson ? 'e.g., Rajan Mehta' : 'e.g., Elderly woman'}
          required
        />
      </div>

      <div className="cp-grid-2">
        <div className="cp-form-group">
          <label className="cp-label" htmlFor="mp-age">Age (approx.)</label>
          <input
            id="mp-age"
            type="number"
            className="cp-input"
            value={form.age}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="e.g., 65"
            min="0"
          />
        </div>
        <div className="cp-form-group">
          <label className="cp-label" htmlFor="mp-gender">Gender</label>
          <select
            id="mp-gender"
            className="cp-select"
            value={form.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="cp-form-group">
        <label className="cp-label" htmlFor="mp-desc">Physical Description *</label>
        <textarea
          id="mp-desc"
          className="cp-textarea"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder={placeholder}
          rows={3}
          required
        />
      </div>

      <div className="cp-form-group">
        <label className="cp-label" htmlFor="mp-location">
          {isPerson ? 'Last Known Location *' : 'Location where found *'}
        </label>
        <input
          id="mp-location"
          className="cp-input"
          value={form.lastSeen}
          onChange={(e) => handleChange('lastSeen', e.target.value)}
          placeholder={isPerson ? 'e.g., Near Tapi River, Surat' : 'e.g., Main Road Bus Stop, Adajan'}
          required
        />
      </div>

      <div className="cp-form-group">
        <label className="cp-label" htmlFor="mp-contact">Your Contact Number *</label>
        <input
          id="mp-contact"
          type="tel"
          className="cp-input"
          value={form.contact}
          onChange={(e) => handleChange('contact', e.target.value)}
          placeholder="10-digit mobile number"
          required
        />
      </div>

      <div className="cp-form-group">
        <label className="cp-label">Photo (optional but recommended)</label>
        <label className="report-upload-area" htmlFor="mp-photo">
          <UploadIcon size={20} />
          <span>{photoName || 'Tap to attach a photo'}</span>
          <input
            id="mp-photo"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhoto}
          />
        </label>
      </div>

      <button
        type="submit"
        id="mp-submit-btn"
        className="cp-btn cp-btn-primary cp-btn-lg cp-btn-full"
        disabled={!form.name || !form.description || !form.contact}
      >
        <UserIcon size={18} />
        Submit Report
      </button>
    </form>
  );
}

function SuccessScreen({ navigate }) {
  const [refId] = useState(() => `MP-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`);
  return (
    <div className="mp-success">
      <CheckCircleIcon size={48} />
      <h2>Report Submitted</h2>
      <p>Your report has been filed with state emergency authorities. You will be contacted if there is a match.</p>
      <p className="mp-ref">Reference: {refId}</p>
      <button className="cp-btn cp-btn-primary" onClick={() => navigate('home')}>
        Back to Home
      </button>
    </div>
  );
}

function ViewReports() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockMissingPersons.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.lastSeen.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="mp-view">
      <div className="shelter-search-wrap" style={{ marginBottom: '12px' }}>
        <SearchIcon size={16} />
        <input
          type="search"
          className="shelter-search"
          placeholder="Search by name, description or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="shelter-filter-chips" style={{ marginBottom: '20px' }}>
        {[
          { id: 'all', label: 'All' },
          { id: 'missing', label: 'Missing' },
          { id: 'found', label: 'Found' },
        ].map((f) => (
          <button
            key={f.id}
            className={`shelter-filter-chip ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="cp-empty">
          <UserIcon size={36} />
          <p>No reports found matching your search.</p>
        </div>
      ) : (
        <div className="mp-cards">
          {filtered.map((person) => (
            <div key={person.id} className="mp-card cp-card">
              <div className="mp-card-top">
                <div className="mp-avatar">
                  <UserIcon size={24} />
                </div>
                <div className="mp-card-info">
                  <h3 className="mp-card-name">{person.name}</h3>
                  <p className="mp-card-meta">
                    {person.age ? `${person.age} years` : 'Age unknown'} &nbsp;·&nbsp; {person.gender}
                  </p>
                </div>
                <span
                  className={`cp-badge ${person.status === 'missing' ? 'cp-badge-danger' : 'cp-badge-success'}`}
                >
                  {person.status === 'missing' ? 'Missing' : 'Found'}
                </span>
              </div>
              <p className="mp-card-desc">{person.description}</p>
              <p className="mp-card-location">
                <strong>Last seen:</strong> {person.lastSeen}
              </p>
              <p className="mp-card-reported">
                Reported by {person.reportedBy} &nbsp;·&nbsp; Call:{' '}
                <a href={`tel:${person.contact}`}>{person.contact}</a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MissingPerson({ navigate }) {
  const [tab, setTab] = useState('report');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    setTimeout(() => setSubmitted(true), 1400);
  }

  if (submitted) {
    return (
      <div className="cp-page">
        <SuccessScreen navigate={navigate} />
      </div>
    );
  }

  return (
    <div className="cp-page">
      <button className="sos-back-btn" onClick={() => navigate('home')}>
        <ArrowLeftIcon size={18} /> Back
      </button>

      <div className="cp-page-header">
        <h1 className="cp-page-title">Missing &amp; Found Persons</h1>
        <p className="cp-page-subtitle">Report a missing person or a found person during a disaster situation.</p>
      </div>

      {/* Tabs */}
      <div className="mp-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            className={`mp-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
            aria-selected={tab === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'report' && <ReportMissingForm onSubmit={handleSubmit} type="report" />}
        {tab === 'found' && <ReportMissingForm onSubmit={handleSubmit} type="found" />}
        {tab === 'view' && <ViewReports />}
      </div>
    </div>
  );
}
