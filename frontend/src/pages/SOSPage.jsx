import { useState } from 'react';
import { DISASTER_TYPES } from '../constants/index.js';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { sendSosAlert } from '../lib/api.js';
import {
  ArrowLeftIcon,
  PhoneIcon,
  LocationIcon,
  CheckCircleIcon,
  SendIcon,
} from '../components/icons.jsx';
import './SOSPage.css';

const STEPS = ['confirm', 'type', 'details', 'location', 'success'];

function StepIndicator({ current }) {
  const labels = ['Confirm', 'Type', 'Details', 'Location', 'Done'];
  const currentIdx = STEPS.indexOf(current);
  return (
    <div className="sos-steps" aria-label="SOS submission progress">
      {STEPS.map((step, i) => (
        <div
          key={step}
          className={`sos-step-dot ${i < currentIdx ? 'done' : i === currentIdx ? 'active' : 'pending'}`}
          aria-label={labels[i]}
        />
      ))}
    </div>
  );
}

export default function SOSPage({ navigate }) {
  const [step, setStep] = useState('confirm');
  const [disasterType, setDisasterType] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [requestId] = useState(() => `REQ-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`);

  const { location, loading: locLoading, error: locError, getLocation, shareLocation } = useGeolocation();

  function goBack() {
    const idx = STEPS.indexOf(step);
    if (idx === 0) {
      navigate('home');
    } else {
      setStep(STEPS[idx - 1]);
    }
  }

  function handleConfirm() {
    setStep('type');
    getLocation(); // Start fetching location early
  }

  function handleTypeNext() {
    if (!disasterType) return;
    setStep('details');
  }

  function handleDetailsNext() {
    setStep('location');
  }

  async function handleSubmit() {
    setSubmitting(true);
    shareLocation();

    const payload = {
      requestId,
      latitude: location?.lat || 21.1702,
      longitude: location?.lng || 72.8311,
      address: location?.address || 'Udhna, Surat, Gujarat — 394210',
      disasterType: disasterType || 'general_sos',
      description: description || 'Emergency assistance requested via app',
    };

    const res = await sendSosAlert(payload);
    setApiResponse(res);
    setSubmitting(false);
    setStep('success');
  }

  return (
    <div className="cp-page sos-page">
      {step !== 'success' && (
        <button className="sos-back-btn" onClick={goBack} aria-label="Go back">
          <ArrowLeftIcon size={18} />
          {step === 'confirm' ? 'Cancel' : 'Back'}
        </button>
      )}

      <StepIndicator current={step} />

      {/* Step 1: Confirm */}
      {step === 'confirm' && (
        <div className="sos-step-content">
          <div className="sos-confirm-icon">
            <PhoneIcon size={40} />
          </div>
          <h1 className="sos-step-title">Send Emergency SOS?</h1>
          <p className="sos-step-desc">
            This will alert local emergency services and share your location. Please only use this for genuine emergencies.
          </p>
          <div className="sos-confirm-info">
            <p>Your SOS request will be sent to:</p>
            <ul>
              <li>National Disaster Management Authority (NDMA)</li>
              <li>State Disaster Response Force (SDRF)</li>
              <li>Local Police &amp; Fire Services</li>
            </ul>
          </div>
          <button
            id="sos-confirm-btn"
            className="cp-btn cp-btn-danger cp-btn-lg cp-btn-full sos-action-btn"
            onClick={handleConfirm}
          >
            <PhoneIcon size={20} />
            Yes, Send SOS Now
          </button>
          <button
            className="cp-btn cp-btn-ghost cp-btn-full"
            onClick={() => navigate('home')}
          >
            Cancel — I am safe
          </button>
        </div>
      )}

      {/* Step 2: Disaster Type */}
      {step === 'type' && (
        <div className="sos-step-content">
          <h1 className="sos-step-title">What is the emergency?</h1>
          <p className="sos-step-desc">Select the type of disaster or emergency.</p>
          <div className="sos-type-grid">
            {DISASTER_TYPES.map((type) => (
              <button
                key={type.id}
                className={`sos-type-btn ${disasterType === type.id ? 'selected' : ''}`}
                onClick={() => setDisasterType(type.id)}
                aria-pressed={disasterType === type.id}
              >
                {type.label}
              </button>
            ))}
          </div>
          <button
            id="sos-type-next-btn"
            className="cp-btn cp-btn-danger cp-btn-lg cp-btn-full sos-action-btn"
            onClick={handleTypeNext}
            disabled={!disasterType}
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 'details' && (
        <div className="sos-step-content">
          <h1 className="sos-step-title">Describe the situation</h1>
          <p className="sos-step-desc">
            Briefly describe what is happening so responders can prepare.
          </p>
          <div className="cp-form-group" style={{ marginBottom: '24px' }}>
            <label className="cp-label" htmlFor="sos-description">
              Description (optional)
            </label>
            <textarea
              id="sos-description"
              className="cp-textarea"
              placeholder="e.g., Floodwater rising, 3 people stranded on rooftop. Building at corner of..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
            <span className="cp-hint">Keep it brief. Your location will be shared automatically.</span>
          </div>
          <button
            id="sos-details-next-btn"
            className="cp-btn cp-btn-danger cp-btn-lg cp-btn-full sos-action-btn"
            onClick={handleDetailsNext}
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 4: Location */}
      {step === 'location' && (
        <div className="sos-step-content">
          <h1 className="sos-step-title">Confirm your location</h1>
          <p className="sos-step-desc">
            Your location will be shared with emergency responders to find you quickly.
          </p>

          <div className="sos-location-box">
            <LocationIcon size={22} />
            {locLoading ? (
              <div>
                <p className="sos-loc-status">Detecting location…</p>
              </div>
            ) : location ? (
              <div>
                <p className="sos-loc-status sos-loc-found">Location detected</p>
                <p className="sos-loc-coords">
                  {location.address || `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`}
                </p>
                {location.accuracy && (
                  <p className="sos-loc-accuracy">Accuracy: ±{location.accuracy}m</p>
                )}
              </div>
            ) : (
              <div>
                <p className="sos-loc-status">Location not yet fetched</p>
                <button className="cp-btn cp-btn-outline cp-btn-sm" onClick={getLocation}>
                  Get location
                </button>
              </div>
            )}
          </div>

          {locError && (
            <div className="cp-banner cp-banner-warning" style={{ marginBottom: '16px' }}>
              <span>{locError}</span>
            </div>
          )}

          <button
            id="sos-submit-btn"
            className="cp-btn cp-btn-danger cp-btn-lg cp-btn-full sos-action-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            <SendIcon size={18} />
            {submitting ? 'Sending SOS…' : 'Send SOS Request'}
          </button>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 'success' && (
        <div className="sos-step-content sos-success">
          <div className="sos-success-icon">
            <CheckCircleIcon size={52} />
          </div>
          <h1 className="sos-step-title">SOS Sent Successfully</h1>
          <p className="sos-step-desc">
            Your emergency request has been received. Emergency services have been alerted.
          </p>

          <div className="sos-success-card">
            <div className="sos-success-row">
              <span>Request ID</span>
              <strong>{requestId}</strong>
            </div>
            <div className="sos-success-row">
              <span>Emergency Type</span>
              <strong style={{ textTransform: 'capitalize' }}>{disasterType.replace('_', ' ')}</strong>
            </div>
            <div className="sos-success-row">
              <span>Status</span>
              <span className="cp-badge cp-badge-info">Received</span>
            </div>
            <div className="sos-success-row">
              <span>Backend Route</span>
              <span className="cp-badge cp-badge-success" style={{ fontSize: '11px' }}>
                POST /api/v1/sos
              </span>
            </div>
            <div className="sos-success-row">
              <span>Estimated Response</span>
              <strong>10–20 minutes</strong>
            </div>
          </div>

          <div className="cp-banner cp-banner-info" style={{ marginBottom: '16px' }}>
            <span>Keep your phone nearby. Responders may call you for your exact location.</span>
          </div>

          <button
            className="cp-btn cp-btn-primary cp-btn-lg cp-btn-full"
            onClick={() => navigate('my-requests')}
          >
            Track Request Status
          </button>
          <button
            className="cp-btn cp-btn-ghost cp-btn-full"
            style={{ marginTop: '10px' }}
            onClick={() => navigate('home')}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
