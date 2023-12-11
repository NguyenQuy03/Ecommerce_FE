// api.js
import * as httpRequest from '~/utils/httpRequest';

export const login = async (payload) => {
    try {
        const res = await httpRequest.post('/v1/auth/login',
            payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (payload) => {
    try {
        const res = await httpRequest.post('/v1/auth/register',
            payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};