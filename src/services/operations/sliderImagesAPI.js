import { apiConnector } from '../apiConnector';
import { sliderImagesEndpoints } from '../apis';

const { GET_ALL_IMAGES_BY_CATEGORY } = sliderImagesEndpoints;

export const fetchImagesByType = async (category = 'rajbhasha') => {
  try {
    const response = await apiConnector(
      'GET',
      `${GET_ALL_IMAGES_BY_CATEGORY}?category=${category}`
    );

    return response?.data?.images || [];
  } catch (err) {
    throw new Error('Failed to fetch publications.');
  }
};
