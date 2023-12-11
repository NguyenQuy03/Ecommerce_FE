
import * as httpRequest from '~/utils/httpRequest';

export const getCategories = async () => {
  try {
    const res = await httpRequest.get('/v1/buyer/category', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
