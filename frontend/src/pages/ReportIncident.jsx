import { useState } from 'react';
import { DISASTER_TYPES, SEVERITY_LEVELS, HELP_TYPES } from '../constants/index.js';
import {
  ArrowLeftIcon,
  UploadIcon,
  CheckCircleIcon,
  FileIcon,
} from '../components/icons.jsx';
import './ReportIncident.css';

const INITIAL_FORM = {
  disasterType: '',
  severity: '',
  helpRequired: [],
  affectedCount: '',
  description: '',
  photo: null,
};

export default function ReportIncident({ navigate }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [reportRef, setReportRef] = useState('');

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleHelp(id) {
    setForm((prev) => {
      const current = prev.helpRequired;
      return {
        ...prev,
        helpRequired: current.includes(id)
          ? current.filter((h) => h !== id)
          : [...current, id],
      };
    });
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPhotoName(file.name);
      handleChange('photo', file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.disasterType || !form.severity || !form.description) return;
    setSubmitting(true);
    setTimeout(() => {
      setReportRef(`RPT-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`);
      setSubmitting(false);
      setSubmitted(true);
    }, 1600);
  }

  if (submitted) {
    return (
      <div className="cp-page">
        <div className="report-success">
          <div className="report-success-icon">
            <CheckCircleIcon size={52} />
          </div>
          <h1>Report Submitted</h1>
          <p>Thank you. Your incident report has been received by the emergency control center. Responders will review it shortly.</p>
          <div className="report-success-detail">
            <span>Report Reference</span>
            <strong>{reportRef}</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            <button className="cp-btn cp-btn-primary cp-btn-lg cp-btn-full" onClick={() => navigate('my-requests')}>
              Track Report Status
            </button>
            <button className="cp-btn cp-btn-ghost cp-btn-full" onClick={() => navigate('home')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-page">
      <button className="sos-back-btn" onClick={() => navigate('home')}>
        <ArrowLeftIcon size={18} /> Back
      </button>

      <div className="cp-page-header">
        <h1 className="cp-page-title">Report Incident</h1>
        <p className="cp-page-subtitle">
          Report a disaster, hazard, or emergency situation to help responders act quickly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="report-form" noValidate>
        {/* Disaster Type */}
        <div className="cp-form-group">
          <label className="cp-label" htmlFor="report-type">Disaster / Emergency Type *</label>
          <select
            id="report-type"
            className="cp-select"
            value={form.disasterType}
            onChange={(e) => handleChange('disasterType', e.target.value)}
            required
          >
            <option value="">Select disaster type</option>
            {DISASTER_TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Severity */}
        <div className="cp-form-group">
          <label className="cp-label">Severity *</label>
          <div className="report-severity-row">
            {SEVERITY_LEVELS.map((s) => (
              <button
                type="button"
                key={s.id}
                className={`report-severity-btn ${form.severity === s.id ? 'selected' : ''}`}
                style={
                  form.severity === s.id
                    ? { background: s.bg, color: s.color, borderColor: s.color }
                    : {}
                }
                onClick={() => handleChange('severity', s.id)}
                aria-pressed={form.severity === s.id}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Number of people affected */}
        <div className="cp-form-group">
          <label className="cp-label" htmlFor="report-count">
            Approximate number of people affected
          </label>
          <input
            id="report-count"
            type="number"
            className="cp-input"
            placeholder="e.g., 5"
            min="0"
            value={form.affectedCount}
            onChange={(e) => handleChange('affectedCount', e.target.value)}
          />
        </div>

        {/* Help required */}
        <div className="cp-form-group">
          <label className="cp-label">Help Required</label>
          <div className="report-help-chips">
            {HELP_TYPES.map((h) => (
              <button
                type="button"
                key={h.id}
                className={`report-help-chip ${form.helpRequired.includes(h.id) ? 'selected' : ''}`}
                onClick={() => toggleHelp(h.id)}
                aria-pressed={form.helpRequired.includes(h.id)}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="cp-form-group">
          <label className="cp-label" htmlFor="report-desc">Description *</label>
          <textarea
            id="report-desc"
            className="cp-textarea"
            placeholder="Describe the situation in detail — what happened, who is affected, what is needed..."
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={5}
            required
          />
        </div>

        {/* Photo upload */}
        <div className="cp-form-group">
          <label className="cp-label">Photo / Evidence (optional)</label>
          <label className="report-upload-area" htmlFor="report-photo">
            <UploadIcon size={22} />
            <span>
              {photoName ? photoName : 'Tap to attach a photo or video'}
            </span>
            <span className="cp-hint">JPG, PNG, MP4 up to 10 MB</span>
            <input
              id="report-photo"
              type="file"
              accept="image/*,video/*"
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        <button
          id="report-submit-btn"
          type="submit"
          className="cp-btn cp-btn-primary cp-btn-lg cp-btn-full"
          disabled={submitting || !form.disasterType || !form.severity || !form.description}
          style={{ marginTop: '8px' }}
        >
          <FileIcon size={18} />
          {submitting ? 'Submitting…' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}
