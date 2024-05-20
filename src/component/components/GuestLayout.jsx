import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useStatecontext} from "../../contexts/ContextProvider";

function GuestLayout() {
    const {token} = useStatecontext();
    if (token){
        return <Navigate to="/dasboards/normal/" />
    }
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default GuestLayout;