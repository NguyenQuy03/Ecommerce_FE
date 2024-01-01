import * as httpRequest from '~/utils/httpRequest';

const PRODUCT_URL = '/v1/buyer/product';
const PRODUCT_RECOMMEND_URL = PRODUCT_URL + '/recommend';
const PRODUCT_RECOMMEND__BY_SELLER_URL = PRODUCT_RECOMMEND_URL + '/seller';
const PRODUCT_RECOMMEND__BY_CATEGORY_URL = PRODUCT_RECOMMEND_URL + '/category';
const PRODUCT_DETAIL_URL = '/v1/buyer/product/detail';

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

export const getProductsBySellerId = async ({sellerId}) => {
  try {
    const res = await httpRequest.get(PRODUCT_RECOMMEND__BY_SELLER_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        sellerId: 3,
      },
    });
    return res.data.listResult;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const getProduct = async ({ id }) => {
  try {
    const res = await httpRequest.get(PRODUCT_DETAIL_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        id: id
      }
    });
    if (res.data) {
      const variations = {};
      const images = [];
      images.push(res.data.image);

      res.data.specification = JSON.parse(res.data.specification);
      res.data.productItems.forEach(element => {
        element.variation = JSON.parse(element.variation);

        // Group all variation of product_item to a map
        for (let key in element.variation) {
          if (!variations[key]) {
            variations[key] = [];
          }
          if (!variations[key].includes(element.variation[key])) {
            variations[key].push(element.variation[key]);
          }

        }
        res.data.variations = variations;

        // Group all image to a list
        images.push(element.image)
      });

      res.data["images"] = images;
    }
    return res?.data;
  } catch (error) {
    throw new Error('Failed to fetch product details');
  }
};
