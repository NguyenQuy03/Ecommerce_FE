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
            const res = await axiosPrivate.get(PRODUCT_URL);
            res.data.map(item => {
                item.image = item.productImages[0];
            })
            console.log(res.data);
            return res.data;
        } catch (e) {
            throw e.response;
        }
    };

    const getProductsBySellerId = async ({ sellerId }) => {
        try {
            const res = await axiosPrivate.get(PRODUCT_RECOMMEND_BY_SELLER_URL, {
                params: {
                    sellerId: 3,
                },
            });
            return res.data.listResult;
        } catch (e) {
            throw e.response;
        }
    };

    const getProduct = async ({ id }) => {
        try {
            const res = await axiosPrivate.get(PRODUCT_DETAIL_URL, {
                params: {
                    id: JSON.parse(id),
                },
            });
            if (res.data) {
                const variations = {};

                res.data.specification = JSON.parse(res.data.specification);

                res.data.productItems.forEach((element) => {
                    // Group all variation of product_item to a map
                    element.variation.split(';').forEach((pair) => {
                        const [key, value] = pair.split(':').map((item) => item.trim());
                        if (!variations[key]) {
                            variations[key] = [];
                        }
                        if (!variations[key].includes(value)) {
                            variations[key].push(value);
                        }
                    });

                    res.data.variations = variations;

                    // Group all image to a list
                    res.data.productImages.push(element.image);
                });
            }

            return res?.data;
        } catch (e) {
            throw e.response;
        }
    };

    return { getProducts, getProductsBySellerId, getProduct };
}

export default ProductService;
