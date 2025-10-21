import { Navigate, Outlet } from 'react-router-dom';

const AuthChecker = () => {
    const isAuthenticated = false; // Replace with real auth check

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default AuthChecker;
