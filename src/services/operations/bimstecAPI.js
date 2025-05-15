import { apiConnector } from '../apiConnector';
import { bimstecProductsEndpoints } from '../apis';
import { toast } from 'react-hot-toast';

const { GET_ALL_BIMSTEC_PRODUCTS, GET_BIMSTEC_FORECAST_HOURS } =
  bimstecProductsEndpoints;

export const fetchBimstecProductsNames = async () => {
  try {
    const response = await apiConnector('GET', GET_ALL_BIMSTEC_PRODUCTS);

    // Ensure response.data is a valid array before proceeding
    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error('Could Not Fetch Special Forecast Products');
    }

    // toast.success('Products fetched successfully!');
    return response?.data;
  } catch (error) {
    toast.error('Failed to load bimstec forecast products');
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchBimstecForecastHoursAndUrls = async ({
  product,
  hour,
  date,
}) => {
  try {
    const params = {
      product_header: product.product_header,
      product_sub_header: product.product_sub_header,
      product_name: product.product_name,
      forecastHour: hour,
      date: date,
    };

    const response = await apiConnector(
      'GET',
      GET_BIMSTEC_FORECAST_HOURS,
      null,
      null,
      params
    );
    const data = response?.data;

    // console.log('Forecast Data:', data);

    if (!data) throw new Error('No data returned from forecast API');

    const { forecastHours, forecastUrls } = data;

    if (!Array.isArray(forecastHours)) {
      console.error('forecastHours is not an array');
    }

    if (!Array.isArray(forecastUrls)) {
      console.error('forecastUrls is not an array');
    }

    return { forecastHours, forecastUrls };
  } catch (error) {
    toast.error('Failed to load forecast hours and URLs');
    console.error('API Error:', error);
    throw error;
  }
};
