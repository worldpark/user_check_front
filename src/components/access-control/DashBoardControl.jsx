import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DashBoardControl = ({children}) => {
    const loginInfo = useSelector((state) => state.loginInfo);

    if (!loginInfo.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if(loginInfo.role === "ROLE_USER"){
        return <Navigate to="/user/dashboard/status" replace />;
    }

    if(loginInfo.role === "ROLE_DEV" || loginInfo.role === "ROLE_ADMIN"){
        return <Navigate to="/admin/dashboard/status" replace />;
    }

    return children;
};

export default DashBoardControl;