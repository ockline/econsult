import React, { Fragment, useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useStatecontext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { Provider } from "react-redux";
import store from "../../redux/store";

import Footer from "../../layout/layoutsection/footer/footer";
import Header from "../../layout/layoutsection/header/header";
import Sidebar from "../../layout/layoutsection/sidemenu/sidemenubar";
import Switcher from "../../layout/layoutsection/switcher/switcher";

const DefaultLayout = () => {
    const { user, token, setUser, setToken } = useStatecontext();

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            });
    }, []);

    // useEffect(() => {
    //     import("preline");
    // }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser(null);
                setToken(null);
            });
    };

    return (
        <Fragment>
            <Provider store={store}>
                <Switcher />
                <div className="page">
                    <Sidebar />
                    <Header />
                    <div className="content relative">
                        {/* <header>
                            <div>{user?.name}<a href="#" onClick={onLogout} className="btn-logout">Log Out</a></div>
                        </header> */}
                        <main>
                            <Outlet />
                        </main>
                    </div>
                    <Footer />
                </div>
            </Provider>
        </Fragment>
    );
};

export default DefaultLayout;
