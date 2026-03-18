export const validators = {
  email: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email address",

  required: (value: unknown) =>
    value !== null && value !== undefined && value !== ""
      ? null
      : "This field is required",

  minLength: (min: number) => (value: string) =>
    value.length >= min ? null : `Minimum ${min} characters`,

  maxLength: (max: number) => (value: string) =>
    value.length <= max ? null : `Maximum ${max} characters`,

  positiveNumber: (value: number) =>
    value > 0 ? null : "Must be greater than 0",

  latitude: (value: number) =>
    value >= -90 && value <= 90 ? null : "Latitude must be between -90 and 90",

  longitude: (value: number) =>
    value >= -180 && value <= 180
      ? null
      : "Longitude must be between -180 and 180",
};
