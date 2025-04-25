import { apiConnector } from '../apiConnector';
import { toast } from 'react-hot-toast';
import { employeesList } from '../apis';

const { GET_ALL_EMPLOYEES } = employeesList;

export const fetchEmployees = async (page, rowsPerPage, filter) => {
  try {
    const response = await apiConnector(
      'GET',
      `${GET_ALL_EMPLOYEES}?page=${page}&rowsPerPage=${rowsPerPage}&filter=${filter}`
    );

    return {
      data: response.data.data,
      totalCount: response.data.totalCount, // Ensure total count is returned
    };
  } catch (error) {
    console.error('Error fetching employees:', error);
    return { data: [], totalCount: 0 };
  }
};
