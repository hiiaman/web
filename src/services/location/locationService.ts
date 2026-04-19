/**
 * Stores the user's device coordinates for the session.
 * Populated on login; read by PetForm when creating/editing a pet.
 */
const LAT_KEY = "bdh_lat";
const LNG_KEY = "bdh_lng";

// HCMC city centre — fallback when geolocation is unavailable
const FALLBACK = { latitude: 10.7769, longitude: 106.7009 };

export const locationService = {
  set(latitude: number, longitude: number): void {
    sessionStorage.setItem(LAT_KEY, String(latitude));
    sessionStorage.setItem(LNG_KEY, String(longitude));
  },

  get(): { latitude: number; longitude: number } {
    const lat = sessionStorage.getItem(LAT_KEY);
    const lng = sessionStorage.getItem(LNG_KEY);
    if (lat && lng) return { latitude: Number(lat), longitude: Number(lng) };
    return FALLBACK;
  },

  clear(): void {
    sessionStorage.removeItem(LAT_KEY);
    sessionStorage.removeItem(LNG_KEY);
  },

  requestAndStore(): void {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => locationService.set(pos.coords.latitude, pos.coords.longitude),
      (err) => console.warn("[Geolocation]", err.code, err.message),
      { enableHighAccuracy: true, timeout: 15_000, maximumAge: 0 },
    );
  },
};
