
import * as httpRequest from '~/utils/httpRequest';

export const getCategories = async () => {
  try {
    const res = await httpRequest.get('/v1/buyer/category', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
