import { apiConnector } from '../apiConnector';
import { visitorsEndpoints } from '../apis';

const { LOG_VISIT, GET_VISITOR_COUNT } = visitorsEndpoints;

// Function to log a visitor (POST request)
export const logVisitor = async () => {
  try {
    const response = await apiConnector('POST', LOG_VISIT);
    console.log('Visitor logged:', response);
    return response;
  } catch (error) {
    console.error('Error logging visitor:', error);
    return null;
  }
};

// Function to fetch visitor count (GET request)
export const fetchVisitorCount = async () => {
  try {
    const response = await apiConnector('GET', GET_VISITOR_COUNT);
    console.log('Visitor count response:', response);
    return response?.data?.count || 0;
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return 0;
  }
};
