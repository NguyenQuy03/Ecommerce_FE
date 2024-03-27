import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '~/hooks';
import AuthService from '~/services/buyer/AuthService';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const authService = AuthService();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await authService.refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    return <>{isLoading ? <Spin spinning={isLoading} fullscreen /> : <Outlet />}</>;
};

export default PersistLogin;
