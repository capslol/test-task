import React from 'react';
import { useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <>
            Page not found go <span onClick={() => navigate('/')}>HOME</span>
        </>
    );
};

export default NotFound;