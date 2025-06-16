import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const loginInfo = useSelector((state) => state.loginInfo);

    if (!loginInfo.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (requiredRole && loginInfo.role !== requiredRole && loginInfo.role !== "ROLE_DEV") {
        return <Navigate to="/403" replace />;
    }

    return children;
};

export default ProtectedRoute;