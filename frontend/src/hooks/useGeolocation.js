import { useState, useCallback } from 'react';

const MOCK_LOCATION = {
  lat: 21.1702,
  lng: 72.8311,
  address: 'Udhna, Surat, Gujarat — 394210',
  accuracy: 15,
};

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shared, setShared] = useState(false);

  const getLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      // Browser doesn't support geolocation — use mock
      setTimeout(() => {
        setLocation(MOCK_LOCATION);
        setLoading(false);
      }, 1200);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy),
          address: `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`,
        });
        setLoading(false);
      },
      (err) => {
        // On permission denied or error, fall back to mock
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location access denied. Using approximate location for demo.');
        } else {
          setError('Could not get precise location. Using approximate location.');
        }
        setLocation(MOCK_LOCATION);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }, []);

  const shareLocation = useCallback(() => {
    if (!location) {
      getLocation();
    }
    // Simulate sharing to backend
    setTimeout(() => {
      setShared(true);
    }, 800);
  }, [location, getLocation]);

  const resetLocation = useCallback(() => {
    setLocation(null);
    setError(null);
    setShared(false);
  }, []);

  return { location, loading, error, shared, getLocation, shareLocation, resetLocation };
}
