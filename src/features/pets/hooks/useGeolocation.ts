import { useState, useRef, useCallback, useEffect } from "react";

export type GeoStatus =
  | "idle"       // not yet requested
  | "loading"    // in progress
  | "success"    // have coords
  | "denied"     // user/system denied — direct to Settings
  | "unavailable"// GPS/network unavailable
  | "timeout"    // timed out before fix
  | "insecure";  // non-HTTPS context (Safari blocks geolocation on HTTP)

export interface GeoState {
  status: GeoStatus;
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  errorMessage: string | null;
}

const INITIAL: GeoState = {
  status: "idle",
  latitude: null,
  longitude: null,
  accuracy: null,
  errorMessage: null,
};

/**
 * iOS Safari quirks addressed:
 *
 * 1. enableHighAccuracy: false — true causes frequent TIMEOUT on iPhone (GPS cold-start is slow).
 *    Use false (WiFi/cell) for a fast coarse fix; accuracy is sufficient for 30–100 km radius.
 *
 * 2. timeout: never Infinity — confirmed WebKit bug #27254: Infinity behaves like 0 on Safari,
 *    causing immediate TIMEOUT before the permission prompt even appears.
 *
 * 3. watchPosition instead of getCurrentPosition — on iPhone, getCurrentPosition returns only
 *    the first, least-accurate reading. watchPosition progressively improves accuracy and
 *    resolves once coords.accuracy is within the desired threshold.
 *
 * 4. Permission prompt requires a user gesture — calling from useEffect on mount will work
 *    only if permission was already granted. First-time users must trigger via a button tap.
 *
 * 5. navigator.permissions.query() is broken on iOS Safari — reports "prompt" even when
 *    the user has denied. Do not use it; read error.code from the error callback instead.
 *
 * 6. HTTPS required — Safari blocks geolocation on non-secure origins (including LAN IPs
 *    like http://192.168.x.x even though http://localhost is exempt).
 */
export function useGeolocation(desiredAccuracyMeters = 150) {
  const [state, setState] = useState<GeoState>(INITIAL);
  const watchIdRef = useRef<number | null>(null);
  const deadlineRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopWatch = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (deadlineRef.current !== null) {
      clearTimeout(deadlineRef.current);
      deadlineRef.current = null;
    }
  }, []);

  // Clean up on unmount
  useEffect(() => stopWatch, [stopWatch]);

  const requestLocation = useCallback(() => {
    if (!window.isSecureContext) {
      setState({ ...INITIAL, status: "insecure", errorMessage: "Geolocation requires HTTPS." });
      return;
    }
    if (!navigator.geolocation) {
      setState({ ...INITIAL, status: "unavailable", errorMessage: "Geolocation is not supported by this browser." });
      return;
    }

    setState({ ...INITIAL, status: "loading" });
    stopWatch();

    // Max wait before giving up — independent of the options.timeout below
    deadlineRef.current = setTimeout(() => {
      stopWatch();
      setState({ ...INITIAL, status: "timeout", errorMessage: "Could not determine location in time. Try again outdoors." });
    }, 15_000);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // Always update coords so caller has the latest reading
        setState({ status: "success", latitude, longitude, accuracy, errorMessage: null });

        // Stop watching once we have a fix accurate enough for our use case
        if (accuracy <= desiredAccuracyMeters) {
          stopWatch();
        }
      },
      (error) => {
        stopWatch();
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setState({ ...INITIAL, status: "denied", errorMessage: "Location access denied. Enable it in Settings → Safari → Location." });
            break;
          case error.POSITION_UNAVAILABLE:
            setState({ ...INITIAL, status: "unavailable", errorMessage: "Your device could not determine its location." });
            break;
          case error.TIMEOUT:
            setState({ ...INITIAL, status: "timeout", errorMessage: "Location request timed out. Try again outdoors." });
            break;
          default:
            setState({ ...INITIAL, status: "unavailable", errorMessage: error.message });
        }
      },
      {
        enableHighAccuracy: false, // true causes frequent TIMEOUT on iOS (GPS cold-start)
        timeout: 10_000,           // explicit value required — Infinity is a Safari bug
        maximumAge: 60_000,        // accept a cached fix up to 60 s old (fast on repeat calls)
      },
    );
  }, [stopWatch, desiredAccuracyMeters]);

  return { state, requestLocation };
}
