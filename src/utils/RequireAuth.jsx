import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '~/hooks';
import PropTypes from 'prop-types';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : auth?.accessToken ? (
        <Navigate to="/unauthorized" state={{ from: location, message: 'UnAuthorized', status: 'warning' }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location, message: 'No Permission', status: 'warning' }} replace />
    );
};

RequireAuth.propTypes = {
    allowedRoles: PropTypes.array.isRequired
}

export default RequireAuth;
