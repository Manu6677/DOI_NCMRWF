import { apiConnector } from '../apiConnector';
import { reportsEndpoints } from '../apis';

const { GET_ALL_REPORTS_BY_TYPE } = reportsEndpoints;

export const fetchReportsByType = async (selectedType = 'global') => {
  try {
    const response = await apiConnector(
      'GET',
      `${GET_ALL_REPORTS_BY_TYPE}?type=${selectedType}`
    );

    return response?.data?.reports || [];
  } catch (err) {
    throw new Error('Failed to fetch publications.');
  }
};
