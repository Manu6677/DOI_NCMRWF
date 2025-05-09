import { apiConnector } from '../apiConnector';
import { bulletinBoardEndPoints } from '../apis';

const { GET_BULLETIN_BOARD_PDF_NAMES } = bulletinBoardEndPoints;

export const fetchBulletinBoardPDFNames = async () => {
  try {
    const response = await apiConnector('GET', GET_BULLETIN_BOARD_PDF_NAMES);
    // console.log('response board', response);
    return {
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching bulletin PDFs:', error);
    return { data: [] };
  }
};
