import { useAxiosPrivate } from '~/hooks';

const CATEGORY_URL = '/v1/manager/category';

function CategoryService() {
    const axiosPrivate = useAxiosPrivate();

    const addCategory = async (payload) => {
        try {
            const res = await axiosPrivate.post(CATEGORY_URL, payload);
            return res;
        } catch (error) {
            throw error.response;
        }
    };

    const updateCategory = async (payload) => {
        try {
            const res = await axiosPrivate.post(CATEGORY_URL, payload);
            return res;
        } catch (error) {
            throw error.response;
        }
    };

    const deleteCategory = async (params) => {
        try {
            const res = await axiosPrivate.delete(CATEGORY_URL, { params: params });
            return res;
        } catch (error) {
            throw error.response;
        }
    };

    return { addCategory, updateCategory, deleteCategory };
}

export default CategoryService;
