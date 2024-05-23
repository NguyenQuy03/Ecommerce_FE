import { useAxiosPrivate } from '~/hooks';

const CATEGORY_URL = '/v1/buyer/category';

function CategoryService() {
    const axiosPrivate = useAxiosPrivate();
    const getCategories = async () => {
        try {
            const res = await axiosPrivate.get(CATEGORY_URL, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return res.data;
        } catch (error) {
            throw new Error('Failed to fetch categories');
        }
    };

    const addCategory = async (payload, jwt) => {
        try {
            const res = await axiosPrivate.post(CATEGORY_URL, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                    withCredentials: true,
                },
            });
            return res.data;
        } catch (error) {
            throw new Error('Failed to fetch categories');
        }
    };
    return { getCategories, addCategory };
}

export default CategoryService;
