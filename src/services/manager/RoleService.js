import { useAxiosPrivate } from '~/hooks';

const ROLE_URL = '/v1/manager/role';

function RoleService() {
    const axiosPrivate = useAxiosPrivate();

    const getRoles = async () => {
        try {
            const res = await axiosPrivate.get(ROLE_URL, {});
            return res.data;
        } catch (error) {
            throw new Error('Failed to fetch roles');
        }
    };

    return { getRoles };
}

export default RoleService;
