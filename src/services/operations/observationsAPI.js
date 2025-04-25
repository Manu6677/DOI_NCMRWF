import { apiConnector } from '../apiConnector';
import { observationsEndpoints } from '../apis';

const { GET_ALL_OBSERVATION_REPORTS_BY_TYPE } = observationsEndpoints;

export const fetchObservationReportsByType = async (
  selectedType = 'received-data-volume'
) => {
  try {
    const response = await apiConnector(
      'GET',
      `${GET_ALL_OBSERVATION_REPORTS_BY_TYPE}?subOptionSlug=${selectedType}`
    );

    return response?.data?.cycles || [];
  } catch (err) {
    throw new Error('Failed to fetch publications.');
  }
};
