import { apiConnector } from '../apiConnector';
import { publicationsEndpoints } from '../apis';

const { GET_PUBLICATIONS_BY_YEAR, GET_INTERNAL_REPORTS } =
  publicationsEndpoints;

export const fetchPublications = async (selectedYear) => {
  try {
    const response = await apiConnector(
      'GET',
      `${GET_PUBLICATIONS_BY_YEAR}/${selectedYear}`
    );
    return response?.data?.publications || [];
  } catch (err) {
    throw new Error('Failed to fetch publications.');
  }
};

export const fetchInternalReports = async () => {
  try {
    const response = await apiConnector('GET', GET_INTERNAL_REPORTS);
    return response?.data?.reports || [];
  } catch (err) {
    throw new Error('Failed to fetch reports.');
  }
};
