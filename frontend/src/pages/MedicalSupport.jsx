import { useState } from 'react';
import { MEDICAL_EMERGENCY_TYPES } from '../constants/index.js';
import { mockAIResponses } from '../data/mockReports.js';
import {
  ArrowLeftIcon,
  UploadIcon,
  HeartPlusIcon,
  AlertIcon,
  PhoneIcon,
  CheckCircleIcon,
  InfoIcon,
} from '../components/icons.jsx';
import './MedicalSupport.css';

const URGENCY_STYLES = {
  critical: { label: 'Critical — Call 112 Immediately', color: '#DC2626', bg: '#FEF2F2' },
  high: { label: 'High Urgency — Seek Medical Help Now', color: '#D97706', bg: '#FFFBEB' },
  medium: { label: 'Moderate — Monitor & Seek Care', color: '#0891B2', bg: '#ECFEFF' },
};

export default function MedicalSupport({ navigate }) {
  const [step, setStep] = useState('form'); // form | result
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) setPhotoName(file.name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!emergencyType && !description) return;
    setLoading(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      const response = mockAIResponses[emergencyType] || mockAIResponses.default;
      setResult(response);
      setLoading(false);
      setStep('result');
    }, 2200);
  }

  return (
    <div className="cp-page medical-page">
      <button className="sos-back-btn" onClick={() => navigate('home')}>
        <ArrowLeftIcon size={18} /> Back
      </button>

      <div className="cp-page-header">
        <h1 className="cp-page-title">Medical Emergency Support</h1>
        <p className="cp-page-subtitle">
          AI-assisted emergency assessment and first-aid guidance.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="cp-banner cp-banner-warning medical-disclaimer">
        <AlertIcon size={16} />
        <span>
          <strong>Important Disclaimer:</strong> This tool provides general first-aid guidance only. It is NOT a medical diagnosis. For serious conditions, call{' '}
          <strong>112</strong> or go to the nearest hospital immediately. Always consult trained emergency medical professionals.
        </span>
      </div>

      {/* Form */}
      {step === 'form' && (
        <form className="medical-form" onSubmit={handleSubmit} noValidate>
          {/* Emergency type */}
          <div className="cp-form-group">
            <label className="cp-label" htmlFor="med-type">Emergency Type *</label>
            <select
              id="med-type"
              className="cp-select"
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
            >
              <option value="">Select emergency type</option>
              {MEDICAL_EMERGENCY_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="cp-form-group">
            <label className="cp-label" htmlFor="med-desc">
              Describe what happened *
            </label>
            <textarea
              id="med-desc"
              className="cp-textarea"
              placeholder="Describe the patient's condition, what happened, symptoms observed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Photo upload */}
          <div className="cp-form-group">
            <label className="cp-label">
              Upload Image (injury/scene photo — optional)
            </label>
            <label className="report-upload-area" htmlFor="med-photo">
              <UploadIcon size={20} />
              <span>{photoName || 'Tap to attach a photo'}</span>
              <span className="cp-hint">
                Photo may help assess the situation. Max 10 MB.
              </span>
              <input
                id="med-photo"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          <button
            id="med-submit-btn"
            type="submit"
            className="cp-btn cp-btn-primary cp-btn-lg cp-btn-full"
            disabled={loading || (!emergencyType && !description)}
          >
            <HeartPlusIcon size={18} />
            {loading ? 'Analysing…' : 'Get First-Aid Guidance'}
          </button>

          {loading && (
            <div className="medical-loading">
              <div className="medical-loading-bar">
                <div className="medical-loading-fill" />
              </div>
              <p>Analysing your input…</p>
            </div>
          )}

          {/* Quick SOS */}
          <div className="medical-quick-sos">
            <p className="cp-text-sm cp-text-secondary">Is this a life-threatening emergency?</p>
            <button
              type="button"
              className="cp-btn cp-btn-danger"
              onClick={() => navigate('sos')}
            >
              <PhoneIcon size={16} />
              Send Emergency SOS
            </button>
          </div>
        </form>
      )}

      {/* Result */}
      {step === 'result' && result && (
        <div className="medical-result">
          {/* Urgency badge */}
          {URGENCY_STYLES[result.urgency] && (
            <div
              className="medical-urgency-banner"
              style={{
                background: URGENCY_STYLES[result.urgency].bg,
                color: URGENCY_STYLES[result.urgency].color,
                borderColor: URGENCY_STYLES[result.urgency].color,
              }}
            >
              <AlertIcon size={16} />
              <strong>{URGENCY_STYLES[result.urgency].label}</strong>
            </div>
          )}

          <div className="cp-card">
            <div className="medical-result-header">
              <HeartPlusIcon size={22} />
              <h2>{result.title}</h2>
            </div>

            {/* Steps */}
            <div className="medical-section">
              <h3>
                <CheckCircleIcon size={16} />
                First-Aid Steps
              </h3>
              <ol className="medical-steps-list">
                {result.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Do Nots */}
            {result.doNots && result.doNots.length > 0 && (
              <div className="medical-section medical-section--donots">
                <h3>
                  <AlertIcon size={16} />
                  Important Don'ts
                </h3>
                <ul className="medical-donots-list">
                  {result.doNots.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Disclaimer in result */}
          <div className="cp-banner cp-banner-info">
            <InfoIcon size={16} />
            <span>
              This guidance is AI-assisted and for informational purposes only. It does not replace professional medical diagnosis or treatment. Call 112 for emergencies.
            </span>
          </div>

          {/* Actions */}
          <div className="medical-result-actions">
            <button
              className="cp-btn cp-btn-danger cp-btn-lg"
              onClick={() => navigate('sos')}
            >
              <PhoneIcon size={18} />
              Send Emergency SOS
            </button>
            <button
              className="cp-btn cp-btn-outline"
              onClick={() => { setStep('form'); setResult(null); }}
            >
              Ask Another Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
