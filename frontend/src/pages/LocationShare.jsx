import { useGeolocation } from '../hooks/useGeolocation.js';
import {
  ArrowLeftIcon,
  LocationIcon,
  CheckCircleIcon,
  AlertIcon,
  SendIcon,
} from '../components/icons.jsx';
import './LocationShare.css';

export default function LocationShare({ navigate }) {
  const { location, loading, error, shared, getLocation, shareLocation, resetLocation } =
    useGeolocation();

  function handleShare() {
    if (!location) {
      getLocation();
    }
    shareLocation();
  }

  return (
    <div className="cp-page location-page">
      <button className="sos-back-btn" onClick={() => navigate('home')} aria-label="Go back">
        <ArrowLeftIcon size={18} />
        Back
      </button>

      <div className="cp-page-header">
        <h1 className="cp-page-title">Share Location</h1>
        <p className="cp-page-subtitle">
          Share your current location with emergency services so help can reach you quickly.
        </p>
      </div>

      {/* Location card */}
      <div className={`loc-card ${location ? 'loc-card--has-loc' : ''}`}>
        <div className="loc-card-icon">
          <LocationIcon size={28} />
        </div>

        {!location && !loading && (
          <div className="loc-card-content">
            <h2>Location Not Shared</h2>
            <p>Tap "Get My Location" to detect and share your current GPS coordinates with emergency services.</p>
          </div>
        )}

        {loading && (
          <div className="loc-card-content">
            <h2>Detecting Location…</h2>
            <p>Please wait while we fetch your GPS coordinates.</p>
            <div className="loc-loading-bar">
              <div className="loc-loading-fill" />
            </div>
          </div>
        )}

        {location && !loading && (
          <div className="loc-card-content">
            <h2>Location Detected</h2>
            <p className="loc-address">
              {location.address || `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`}
            </p>
            <div className="loc-coords-row">
              <span className="loc-coord-item">
                <strong>Lat:</strong> {location.lat.toFixed(6)}
              </span>
              <span className="loc-coord-item">
                <strong>Lng:</strong> {location.lng.toFixed(6)}
              </span>
              {location.accuracy && (
                <span className="loc-coord-item">
                  <strong>Accuracy:</strong> ±{location.accuracy}m
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="cp-banner cp-banner-warning">
          <AlertIcon size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Shared success banner */}
      {shared && (
        <div className="cp-banner cp-banner-success loc-shared-banner">
          <CheckCircleIcon size={18} />
          <div>
            <strong>Location Shared Successfully</strong>
            <p style={{ marginTop: '2px', fontSize: '13px' }}>
              Emergency services can now see your location. Keep this page open.
            </p>
          </div>
        </div>
      )}

      {/* Map placeholder */}
      <div className="loc-map-placeholder" aria-label="Location map preview (demo)">
        <div className="loc-map-overlay">
          <LocationIcon size={32} />
          <p>Map preview available when connected to live backend</p>
        </div>
        <div className="loc-map-grid" />
      </div>

      {/* Action buttons */}
      <div className="loc-actions">
        {!location && (
          <button
            id="loc-get-btn"
            className="cp-btn cp-btn-primary cp-btn-lg cp-btn-full"
            onClick={getLocation}
            disabled={loading}
          >
            <LocationIcon size={18} />
            {loading ? 'Detecting…' : 'Get My Location'}
          </button>
        )}

        {location && !shared && (
          <button
            id="loc-share-btn"
            className="cp-btn cp-btn-danger cp-btn-lg cp-btn-full"
            onClick={handleShare}
          >
            <SendIcon size={18} />
            Share Location with Emergency Services
          </button>
        )}

        {shared && (
          <div className="loc-status-row">
            <div className="loc-live-dot" />
            <span>Location is being shared with emergency services</span>
          </div>
        )}

        {location && (
          <button
            className="cp-btn cp-btn-ghost cp-btn-full"
            onClick={resetLocation}
          >
            Reset &amp; Re-detect
          </button>
        )}
      </div>

      <div className="cp-banner cp-banner-info">
        <AlertIcon size={16} />
        <span>
          Your location is only shared with emergency services during an active emergency. It is not stored permanently.
        </span>
      </div>
    </div>
  );
}
