const BASE_URL = process.env.REACT_APP_BASE_URL;

export const officeOrdersEndpoints = {
  GET_ALL_YEARS: BASE_URL + `/officeOrders/years`,
  GET_ORDERS_BY_YEAR_PARAM: BASE_URL + `/officeOrders/by-year/:year`,
  GET_ALL_ORDERS: BASE_URL + `/officeOrders/`,
};

export const sliderImagesEndpoints = {
  GET_ALL_IMAGES_BY_CATEGORY: BASE_URL + `/images/fetchImageByType`,
  CREATE_IMAGES_BY_CATEGORY: BASE_URL + `/images/createImage`,
};

export const bimstecProductsEndpoints = {
  GET_ALL_BIMSTEC_PRODUCTS: BASE_URL + `/bimstec/getAllBimstecProducts`,
  GET_BIMSTEC_FORECAST_HOURS: BASE_URL + `/bimstec/forecast-hours`,
};

export const reportsEndpoints = {
  GET_ALL_REPORTS_BY_TYPE: BASE_URL + `/reports/getReportByType`,
};

export const observationsEndpoints = {
  GET_ALL_OBSERVATION_REPORTS_BY_TYPE:
    BASE_URL + `/observations/getObservationCyclesBySlug`,
};

// FORECAST PRODUCTS ENDPOINTS
export const forecastProductsEndpoints = {
  GET_FORECAST_HOURS: BASE_URL + '/forecast-products/getForecastHours',
  GET_MEDIUM_FORECAST_MODEL_CHARTS:
    BASE_URL + '/forecast-products/getAllGlobalForecastProducts',
  GET_SHORT_FORECAST_MODEL_CHARTS:
    BASE_URL + '/forecast-products/getAllRegionalForecastProducts',
  GET_ENSEMBLE_FORECAST_MODEL_CHARTS:
    BASE_URL + '/forecast-products/getAllEnsembleForecastProducts',
  GET_EXTENDED_FORECAST_MODEL_CHARTS:
    BASE_URL + '/forecast-products/getAllExtendedForecastProducts',
  GET_URBAN_FORECAST_MODEL_CHARTS:
    BASE_URL + '/forecast-products/getUrbanModelForecastProducts',
  GET_ALL_FORECAST_MODELS: BASE_URL + '/forecast/all-models',
  GET_ALL_MODEL_FORECAST_PRODUCTS: BASE_URL + '/forecast/forecast-products',
  GET_SPECIAL_ALL_PRODUCTS:
    BASE_URL + '/special-products/generate-forecast-url',
};

export const allJobsOpeningsEndpoints = {
  GET_ALL_JOBS: BASE_URL + '/all/listedopenings', // Update with your actual endpoint
};

// New job application endpoint
export const jobApplicationEndpoints = {
  APPLY_JOB: BASE_URL + '/apply',
};

// Endpoint for all EMP
export const employeesList = {
  GET_ALL_EMPLOYEES: BASE_URL + '/employees/list',
};

// End for a Special_Products_Names
export const specialProducts = {
  GET_ALL_SPECIAL_PRODUCTS_NAMES: BASE_URL + '/special-products/getAllProducts',
  GET_ALL_OBSERVATION_PRODUCTS_NAMES:
    BASE_URL + '/special-products/getAllObservationProducts',
};

export const authEndpoints = {
  LOGIN_URL: BASE_URL + '/auth/login',
  REGISTER_URL: BASE_URL + '/auth/register',
};

// PUBLICATIONS ENDPOINTS
export const publicationsEndpoints = {
  GET_PUBLICATIONS_BY_YEAR: BASE_URL + '/publications/publication',
  GET_INTERNAL_REPORTS: BASE_URL + '/publications/reports',
};

export const bulletinBoardEndPoints = {
  GET_BULLETIN_BOARD_PDF_NAMES: BASE_URL + '/pdfs/bulletin',
};

export const cyclonesEndPoints = {
  GET_CYCLONES_IMAGES_URL: BASE_URL + '/image-url',
};
