import { apiConnector } from '../apiConnector';
import { officeOrdersEndpoints } from '../apis';

export const fetchOfficeOrderYears = async () => {
  try {
    const response = await apiConnector(
      'GET',
      officeOrdersEndpoints.GET_ALL_YEARS
    );

    if (!response?.data) {
      throw new Error('No data received from server for years.');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching office order years:', error);
    return [];
  }
};

export const fetchOrdersByYear = async (year) => {
  if (!year) {
    console.error('Year parameter is required for fetchOrdersByYear.');
    return [];
  }

  try {
    const url = officeOrdersEndpoints.GET_ORDERS_BY_YEAR_PARAM.replace(
      ':year',
      year
    );
    const response = await apiConnector('GET', url);

    if (!response?.data) {
      throw new Error(`No data received from server for year ${year}.`);
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching office orders for year ${year}:`, error);
    return [];
  }
};

export const fetchAllOfficeOrders = async (filterYear = null) => {
  let url = officeOrdersEndpoints.GET_ALL_ORDERS;
  if (filterYear) {
    url += `?year=${filterYear}`;
  }

  try {
    const response = await apiConnector('GET', url);
    if (!response?.data) {
      throw new Error('No data received from server for office orders.');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching all office orders:', error);
    return [];
  }
};
