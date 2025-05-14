import { apiConnector } from '../apiConnector';
import { vacancyEndPoints } from '../apis';

const { GET_VACANCIES } = vacancyEndPoints;

export const fetchVacancies = async () => {
  try {
    const response = await apiConnector('GET', GET_VACANCIES);
    console.log('Vacancies response:', response); // Log the response for debugging
    return response; // Return the response data
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    return { data: [] }; // Return empty data if there's an error
  }
};
