import { useAxiosPrivate } from '~/hooks';

const CATEGORY_URL = '/v1/buyer/category';

function CategoryService() {
    const axiosPrivate = useAxiosPrivate();

    const getCategories = async () => {
        try {
            const res = await axiosPrivate.get(CATEGORY_URL);
            return res.data;
        } catch (error) {
            throw new Error('Failed to fetch categories');
        }
    };

    return { getCategories };
}

export default CategoryService;
