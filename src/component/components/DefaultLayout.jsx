import React, {useEffect} from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStatecontext} from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

function DefaultLayout() {

    const {user,token,setUser,setToken} = useStatecontext();
    useEffect(() => {
        axiosClient.get('/user')
            .then(({data})=>{
                setUser(data)
            })

    }, []);
    if (!token){
        return <Navigate to="/login" />
    }
    const onLogout = (ev)=>{
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(()=>{
                setUser(null)
                setToken(null)
            })
    }


    return (
        <div id="defaultLayout">

            <aside>
                <Link to="/dashboard" >Dashboard</Link>
                <Link to="/loan" >Loan</Link>
                <Link to="/approve" >Approval</Link>
                <Link to="/users" >User</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>{user.name}<a href="#" onClick={onLogout} className="btn-logout">Log Out</a></div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;