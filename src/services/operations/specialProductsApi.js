import { apiConnector } from '../apiConnector';
import {
  forecastProductsEndpoints,
  specialProducts,
  cyclonesEndPoints,
} from '../apis';
import { toast } from 'react-hot-toast';

const { GET_ALL_SPECIAL_PRODUCTS_NAMES, GET_ALL_OBSERVATION_PRODUCTS_NAMES } =
  specialProducts;
const { GET_SPECIAL_ALL_PRODUCTS } = forecastProductsEndpoints;
const { GET_CYCLONES_IMAGES_URL } = cyclonesEndPoints;

export const fetchCyclonesUrl = async (cycle) => {
  try {
    const [datePart, timePart] = cycle.split(' ');
    const utc = timePart === '00UTC' ? '00' : '12';

    const response = await apiConnector(
      'GET',
      GET_CYCLONES_IMAGES_URL,
      null, // bodyData
      null, // headers
      { date: datePart, utc: utc } // params
    );

    console.log('cyclone response', response);

    if (!response?.data?.imageUrl) {
      throw new Error('Cyclone image URL not found in response.');
    }

    return response.data.imageUrl;
  } catch (error) {
    toast.error('Failed to load cyclone image');
    console.error('Cyclone API Error:', error);
    throw error;
  }
};

export const fetchSpecialProductsNames = async () => {
  try {
    const response = await apiConnector('GET', GET_ALL_SPECIAL_PRODUCTS_NAMES);

    // Ensure response.data is a valid array before proceeding
    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('Could Not Fetch Special Forecast Products');
    }

    // toast.success('Products fetched successfully!');
    return response?.data;
  } catch (error) {
    toast.error('Failed to load special forecast products');
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchObservationProductsNames = async () => {
  try {
    const response = await apiConnector(
      'GET',
      GET_ALL_OBSERVATION_PRODUCTS_NAMES
    );

    // Ensure response.data is a valid array before proceeding
    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('Could Not Fetch Special Forecast Products');
    }

    // toast.success('Products fetched successfully!');
    return response?.data;
  } catch (error) {
    toast.error('Failed to load special forecast products');
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchForecastUrl = async (
  model,
  productName,
  category,
  type,
  date,
  utc,
  forecastHour = 0,
  page = 1,
  limit = 4
) => {
  const toastId = toast.loading('Fetching forecast data...');
  let result = null;
  let totalPages = 1;

  // console.log(
  //   'model:',
  //   model,
  //   'productName :',
  //   productName,
  //   'category:',
  //   category,
  //   'type:',
  //   type,
  //   'date:',
  //   date,
  //   'utc:',
  //   utc
  // );

  try {
    // URL stays exactly the same now for all categories
    const apiUrl = `${GET_SPECIAL_ALL_PRODUCTS}/${model}/${productName}/${category}/${type}/${date}/${utc}/${page}/${limit}/${forecastHour}`;
    const response = await apiConnector('GET', apiUrl);
    if (!response?.data?.success) {
      throw new Error('Failed to fetch forecast URL');
    }
    // result = response.data.url;
    // console.log('response', response);
    result =
      response.data.url ||
      response.data.urls ||
      response.data.oceanMeteograms ||
      [];
    totalPages = response.data.totalPages || 1;
    // console.log('result', result);
  } catch (error) {
    console.error('Error fetching forecast URL:', error);
    toast.error('Failed to fetch forecast data');
  } finally {
    toast.dismiss(toastId);
  }

  return { result, totalPages };
};
