import { useAuth } from '~/hooks';
import { axiosPrivate } from '~/utils/httpRequest';

const LOGIN_URL = '/v1/auth/login';
const LOGOUT_URL = '/v1/auth/logout';
const REGISTER_URL = '/v1/auth/register';

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
            const response = await axiosPrivate.post(LOGOUT_URL, {
                withCredentials: true,
            });
            
            if (response) {
                setAuth({});
            }
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
        const response = await axiosPrivate.post('/v1/auth/refresh-token', {
            withCredentials: true,
        });

        setAuth(response.data);
        return response.data.accessToken;
    };

    return { login, register, logout, refresh };
}

export default AuthService;
