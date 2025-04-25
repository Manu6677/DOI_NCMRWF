// Base URL (can be shared if consistent across components)
export const IMAGE_API_BASE_URL =
  process.env.REACT_APP_ASSETS_BASE_URL_NEW || '';

// Specific product folder name in the URL path
export const PRODUCT_FOLDER = 'GFS-Bias-Corrected-Temperatures';

// Types of charts to display
export const CHART_TYPES = [
  { id: 'tmin', label: 'Min Temperature' },
  { id: 'tmax', label: 'Max Temperature' },
];

// Number of forecast days to display
export const FORECAST_DAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Or generate dynamically if needed

// Shared config (can be in a separate shared config file)
export const NUM_DATE_OPTIONS = 7;
