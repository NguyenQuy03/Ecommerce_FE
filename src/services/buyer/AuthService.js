import { useAuth } from '~/hooks';
import { axiosPrivate } from '~/utils/httpRequest';

const PREFIX_URL = '/v1/auth';

const LOGIN_URL = PREFIX_URL + '/login';
const LOGOUT_URL = PREFIX_URL + '/logout';
const REGISTER_URL = PREFIX_URL + '/register';
const REFRESH_TOKEN_URL = PREFIX_URL + '/refresh-token';

function AuthService() {
    const { setAuth } = useAuth();

    const login = async (payload) => {
        try {
            const res = await axiosPrivate.post(LOGIN_URL, payload);
            return res;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await axiosPrivate.post(LOGOUT_URL);

            if (response) {
                setAuth({});
            }
            console.log(response);
            return response;
        } catch (err) {
            console.error(err);
        }
    };

    const register = async (payload) => {
        try {
            const res = await axiosPrivate.post(REGISTER_URL, payload);
            return res;
        } catch (error) {
            throw error;
        }
    };

    const refresh = async () => {
        const response = await axiosPrivate.post(REFRESH_TOKEN_URL);

        setAuth(response.data);
        return response.data.accessToken;
    };

    return { login, register, logout, refresh };
}

export default AuthService;
