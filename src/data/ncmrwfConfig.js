// Configuration for Daily View
export const DAILY_STATS = [
  { id: 'BIAS', label: 'BIAS' },
  { id: 'CORR', label: 'CORR' },
  { id: 'RMSE', label: 'RMSE' },
];
export const DAILY_VARIABLES = [
  { id: 'U', label: 'U' },
  { id: 'V', label: 'V' },
  { id: 'T', label: 'T' },
  { id: 'H', label: 'H' },
];
export const DAILY_TIMES = ['00', '12'];

// Configuration for Weekly View
export const WEEKLY_HPA_LEVELS = ['250', '500', '850'];
export const WEEKLY_VARIABLES = [
  { id: 'UGRD', label: 'U-Wind' },
  { id: 'VGRD', label: 'V-Wind' },
  { id: 'TMP', label: 'Temperature' },
  { id: 'HGT', label: 'Geo-Height' },
];
export const WEEKLY_REGIONS = [
  { id: 'TR', label: 'TR' }, // Tropics
  { id: 'GL', label: 'GL' }, // Northern Hemisphere
  { id: 'AS', label: 'AS' }, // Southern Hemisphere
  { id: 'RS', label: 'RS' },
  { id: 'NA', label: 'NA' },
  { id: 'EA', label: 'EA' },
  { id: 'AN', label: 'AN' },
  { id: 'IN', label: 'IN' },
];

/**
 * Base URL for fetching chart images (Domain part).
 */
export const IMAGE_API_BASE_URL =
  process.env.REACT_APP_ASSETS_BASE_URL_NEW || ''; // Example fallback

/**
 * Number of days to show in the date dropdown.
 */
export const NUM_DATE_OPTIONS = 7;
