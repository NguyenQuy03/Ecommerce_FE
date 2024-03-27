import { axiosPrivate } from '~/utils/httpRequest';

const PREFIX_URL = '/v1/auth'

const REGISTER_URL = PREFIX_URL + '/manager/register';

function AuthService() {

    const register = async (payload) => {
        try {
            const res = await axiosPrivate.post(REGISTER_URL, payload);
            return res;
        } catch (error) {
            throw error;
        }
    };

    return { register };
}

export default AuthService;
