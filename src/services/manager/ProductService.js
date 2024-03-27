import { useAxiosPrivate } from '~/hooks';

const PRODUCT_URL = '/v1/manager/product';

function ProductService() {
    const axiosPrivate = useAxiosPrivate();

    const getProductsByStatus = async (params) => {
        try {
            const res = await axiosPrivate.get(PRODUCT_URL, {
                params: {...params}
            });
            return res.data;
        } catch (e) {
            throw e.response;
        }
    };


    const addProduct = async (payload) => {
        try {
            const res = await axiosPrivate.post(PRODUCT_URL, payload)

            return res.data;
        } catch (e) {
            throw e.response;
        }
    }

    return { getProductsByStatus, addProduct };
}

export default ProductService;
