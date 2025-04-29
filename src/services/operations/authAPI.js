import { apiConnector } from '../apiConnector';
import { authEndpoints } from '../apis';
import { toast } from 'react-hot-toast';

const { LOGIN_URL, REGISTER_URL } = authEndpoints;

export const loginUser = async (username, password) => {
  const toastId = toast.loading('Logging in...');
  let result = null;

  try {
    const response = await apiConnector('POST', LOGIN_URL, {
      username,
      password,
    });

    if (!response?.data?.success) {
      throw new Error('Login failed. Please check your credentials.');
    }

    result = response?.data;
    toast.success('Login successful!');
  } catch (error) {
    console.error('Error logging in:', error);
    toast.error(error.message || 'Failed to log in.');
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

export const registerUser = async ({ username, email, password, role }) => {
  const toastId = toast.loading('Registering...');
  let result = null;

  try {
    const response = await apiConnector('POST', REGISTER_URL, {
      username,
      email,
      password,
      role,
    });

    if (!response?.data?.success) {
      throw new Error('Registration failed. Please try again.');
    }

    result = response?.data;
    toast.success('Registration successful!');
  } catch (error) {
    console.error('Error registering:', error);
    toast.error(error.message || 'Failed to register.');
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};
