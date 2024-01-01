
import * as httpRequest from '~/utils/httpRequest';

const CATEGORY_URL = '/v1/buyer/category';

export const getCategories = async () => {
  try {
    const res = await httpRequest.get(CATEGORY_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
