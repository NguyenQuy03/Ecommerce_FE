import * as httpRequest from '~/utils/httpRequest';

export const getProducts = async () => {
  try {
    const res = await httpRequest.get('/v1/buyer/product', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
