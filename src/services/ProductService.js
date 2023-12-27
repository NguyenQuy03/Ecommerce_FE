import * as httpRequest from '~/utils/httpRequest';

const PRODUCT_URL = '/v1/buyer/product';
const PRODUCT_DETAIL_URL = '/v1/buyer/product/detail/';

export const getProducts = async () => {
  try {
    const res = await httpRequest.get(PRODUCT_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const getProduct = async ({ id }) => {
  try {
    const res = await httpRequest.get(`${PRODUCT_DETAIL_URL}${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.data) {
      let variations = {};

      res.data.specification = JSON.parse(res.data.specification);
      res.data.productItems.forEach(element => {
        element.variation = JSON.parse(element.variation);
        
        for (let key in element.variation) {
          if(!variations[key]) {
            variations[key] = [];
          }
          if(!variations[key].includes(element.variation[key])){
            variations[key].push(element.variation[key]);
          }
          
        }
        res.data.variations = variations;
      });
    }
    return res?.data;
  } catch (error) {
    throw new Error('Failed to fetch product details');
  }
};
