// api.js
import * as httpRequest from '~/utils/httpRequest';

const LOGIN_URL = '/v1/auth/login';
const REGISTER_URL = '/v1/auth/register';

export const login = async (payload) => {
    try {
        const res = await httpRequest.post(LOGIN_URL, payload, {
            headers: {
                'Content-Type': 'application/json',
                withCredentials: true,
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};

export const register = async (payload) => {
    try {
        const res = await httpRequest.post(REGISTER_URL, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        throw error;
    }
};
