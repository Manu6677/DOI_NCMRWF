import { apiConnector } from '../apiConnector';
import { forecastProductsEndpoints } from '../apis';
import { toast } from 'react-hot-toast';

const {
  GET_FORECAST_HOURS,
  GET_MEDIUM_FORECAST_MODEL_CHARTS,
  GET_SHORT_FORECAST_MODEL_CHARTS,
  GET_ENSEMBLE_FORECAST_MODEL_CHARTS,
  GET_EXTENDED_FORECAST_MODEL_CHARTS,
  GET_ALL_FORECAST_MODELS,
  GET_ALL_MODEL_FORECAST_PRODUCTS,
  GET_SPECIAL_ALL_PRODUCTS,
} = forecastProductsEndpoints;

export const fetchForecastHours = async (
  modelId = null,
  forecastProductId = null,
  specialProductId = null
) => {
  // console.log(specialProductId);
  // const toastId = toast.loading('Loading forecast hours...');
  let result = [];
  try {
    let url = `${GET_FORECAST_HOURS}?`;

    if (specialProductId) {
      url += `specialProductId=${specialProductId}`;
    } else if (modelId && forecastProductId) {
      url += `model_id=${modelId}&forecast_product_id=${forecastProductId}`;
    } else {
      throw new Error(
        'Invalid parameters: Either modelId & forecastProductId OR specialProductId must be provided.'
      );
    }

    // console.log(url);

    const response = await apiConnector('GET', url);

    // const response = await apiConnector(
    //   'GET',
    //   `${GET_FORECAST_HOURS}/${modelId}/${forecastProductId}/${specialProductId}`
    // );
    // console.log('response', response);
    if (!response?.data?.success) {
      throw new Error('Could Not Fetch forecast charts');
    }

    result = response?.data?.forecastHours || [];
  } catch (error) {
    console.error('Error fetching forecast hours:', error);
    // toast.error('Failed to load forecast hours');
  } finally {
    // toast.dismiss(toastId);
  }

  return { hours: result };
};

export const fetchProductChart = async (
  modelId = 1,
  forecast_product_id = 2,
  date,
  forecast_hour,
  utc,
  page = 1,
  limit = 4,
  selectedProductId
) => {
  // const toastId = toast.loading('Loading forecast products...');
  let result = [];
  let totalPages = 1;
  let metadata = [];
  let showMap = false;
  let cityNames = [];

  try {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (utc) params.append('utc', utc);
    if (forecast_hour === 0 || forecast_hour)
      params.append('forecast_hour', forecast_hour);
    params.append('page', page);
    params.append('limit', limit);

    let url = '';
    if (modelId === 1) {
      url = `${GET_MEDIUM_FORECAST_MODEL_CHARTS}/${modelId}/${forecast_product_id}`;
    } else if (modelId === 2) {
      url = `${GET_SHORT_FORECAST_MODEL_CHARTS}/${modelId}/${forecast_product_id}`;
    } else if (modelId === 3) {
      url = `${GET_ENSEMBLE_FORECAST_MODEL_CHARTS}/${modelId}/${forecast_product_id}`;
    } else if (modelId === 4) {
      url = `${GET_EXTENDED_FORECAST_MODEL_CHARTS}/${modelId}/${forecast_product_id}`;
    }

    if (selectedProductId > 0) {
      url = `${GET_SPECIAL_ALL_PRODUCTS}/UM-Reg4Km/Severe-Weather-Warning`;
    }
    const response = await apiConnector('GET', `${url}?${params.toString()}`);

    // const response = await apiConnector(
    //   'GET',
    //   `${GET_MEDIUM_FORECAST_MODEL_CHARTS}/${modelId}/${forecast_product_id}?${params.toString()}`
    // );

    if (!response?.data?.success) {
      throw new Error('Could Not Fetch forecast charts');
    }
    result = response?.data?.products || [];
    totalPages = response?.data?.totalPages || 1;
    showMap = response?.data?.showMap;
    cityNames = response?.data?.cityNames;

    if (forecast_product_id === 5) {
      metadata = response?.data?.metadata || null;
    }
  } catch (error) {
    console.error('Error fetching forecast charts:', error);
    // toast.error('Failed to load forecast charts');
  } finally {
    // toast.dismiss(toastId);
  }

  return { products: result, totalPages, metadata, showMap, cityNames };
};

// Fetch all forecast models
export const fetchModels = async () => {
  const toastId = toast.loading('Loading forecast models...');
  let result = [];

  try {
    const response = await apiConnector('GET', GET_ALL_FORECAST_MODELS);

    if (!response?.data?.success) {
      throw new Error('Could Not Fetch forecast models');
    }
    result = response?.data;
  } catch (error) {
    console.error('Error fetching forecast models:', error);
    toast.error('Failed to load forecast models');
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

// Fetch model-wise forecast products
export const getModelWiseForecastProducts = async (modelId) => {
  if (!modelId) {
    toast.error('Model id is required');
    return [];
  }

  const toastId = toast.loading('Loading forecast products...');
  let result = [];

  try {
    const response = await apiConnector(
      'GET',
      GET_ALL_MODEL_FORECAST_PRODUCTS,
      null,
      null,
      { model_id: modelId }
    );

    if (!response?.data?.success) {
      throw new Error('Could Not Fetch forecast products');
    }

    result = response.data; // Storing fetched products into result
  } catch (error) {
    console.error('Error fetching forecast products:', error);
    toast.error('Failed to load forecast products');
  } finally {
    toast.dismiss(toastId); // Dismissing loading toast
  }

  return result;
};
