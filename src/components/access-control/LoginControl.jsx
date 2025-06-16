import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoginControl = ({ children }) => {
    const loginInfo = useSelector((state) => state.loginInfo);

    if (loginInfo.isAuthenticated) {
        return <Navigate to="/board-process" replace />;
    }

    return children;
};

export default LoginControl;