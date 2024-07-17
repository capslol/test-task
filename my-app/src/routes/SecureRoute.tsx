import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext";

const SecureRoute = () => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default SecureRoute;
