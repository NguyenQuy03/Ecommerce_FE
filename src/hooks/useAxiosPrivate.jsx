import { useEffect } from 'react';
import { useAuth } from '~/hooks';
import { axiosPrivate } from '~/utils/httpRequest';
import AuthService from '~/services/buyer/AuthService';

const useAxiosPrivate = () => {
    const authService = AuthService();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    if (auth.accessToken) {
                        config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                    } else {
                        config.headers['Authorization'] = 'Bearer ';
                    }
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await authService.refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth]);

    return axiosPrivate;
};

export default useAxiosPrivate;
