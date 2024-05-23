import { useAxiosPrivate } from '~/hooks';

const PRODUCT_URL = '/v1/buyer/product';
const PRODUCT_RECOMMEND_URL = PRODUCT_URL + '/recommend';
const PRODUCT_RECOMMEND_BY_SELLER_URL = PRODUCT_RECOMMEND_URL + '/seller';
// const PRODUCT_RECOMMEND_BY_CATEGORY_URL = PRODUCT_RECOMMEND_URL + '/category';
const PRODUCT_DETAIL_URL = '/v1/buyer/product/detail';

function ProductService() {
    const axiosPrivate = useAxiosPrivate();

    const getProducts = async () => {
        try {
            const res = await axiosPrivate.get(PRODUCT_URL, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return res.data;
        } catch (error) {
            throw new Error('Failed to fetch products');
        }
    };

    const getProductsBySellerId = async ({ sellerId }) => {
        try {
            const res = await axiosPrivate.get(PRODUCT_RECOMMEND_BY_SELLER_URL, {
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

    const getProduct = async ({ id }) => {
        try {
            const res = await axiosPrivate.get(PRODUCT_DETAIL_URL , {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    id: id,
                },
            });
            if (res.data) {
                const variations = {};
                const images = [];
                images.push(res.data.image);

                res.data.specification = JSON.parse(res.data.specification);
                res.data.productItems.forEach((element) => {
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
                    images.push(element.image);
                });

                res.data['images'] = images;
            }
            return res?.data;
        } catch (error) {
            throw new Error('Failed to fetch product details');
        }
    };

    return { getProducts, getProductsBySellerId, getProduct };
}

export default ProductService;
