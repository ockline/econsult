import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ALLImages from '../../../../common/imagesData';
import { Helmet } from 'react-helmet';
// import { UserChanger, RolesChanger } from '../redux/Action';
import { connect } from "react-redux"
import axios from 'axios';

const ResetPasswordCover1 = () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  
    const navigate = useNavigate();    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // useEffect to navigate once the user and token are set
    useEffect(() => {
        if (user && token) {
            navigate(`${import.meta.env.BASE_URL}dashboards/normal/`);
        }
    }, [user, token, navigate]);
   

    const [state, setState] = useState({
        email: '',
        password: '',
        new_password: '',
        confirm_password: '',
        remember_me: '',
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const csrfToken = async () => {
        // Implement your logic to fetch CSRF token
        // For example, if you are using Laravel, you might retrieve it from a meta tag in the HTML
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
            return metaTag.getAttribute('content');
        }
        // Replace this logic with your actual CSRF token retrieval mechanism
    };

    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
  
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        //   console.log('Form submitted!');
        const body = {
            email: state.email,
            password: state.password,
            new_password: state.new_password,
            confirm_password: state.confirm_password,
            remember_me:  state.remember_me,
      };

        try {
            const token = await csrfToken();
            // console.log('CSRF Token:', token);
            // Use the retrieved CSRF token in your request
            const resp = await axios.post(`${apiBaseUrl}/reset_password`, body, {
                headers: {
                    'X-CSRF-Token': token,
                },
            });
            if (resp.data.status === 422) {
                swal({
                    title: 'Operation Failed',
                    text: resp.data.message,
                    icon: 'error',
                    button: 'OK',
                });
            } else {
                swal({
                    title: 'Success Password reset',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'OK',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                }).then(() => {
                   
                    navigate('/login')
                }

                );
            }
            
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError(error.response.data.message);
            }
        }
      };
    
    return (
        <>
        <Helmet>
        <html dir='ltr' class="h-full"></html>
                <body class="cover1 justify-center"></body>
        </Helmet>
        <div className="flex justify-center min-h-screen align-middle">
            <main id="content" className="w-full max-w-md mx-auto my-auto p-6">
                <Link to={`${import.meta.env.BASE_URL}dashboards/normal/`} className="header-logo">
                    <img src={ALLImages('dark')} alt="logo" className="mx-auto block" />
                </Link>
                <div className="mt-7 bg-white rounded-sm shadow-sm dark:bg-bgdark">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Reset password?</h1>
                            <p className="mt-3 text-sm text-gray-600 dark:text-white/70">
                                Remember your password?
                                <Link className="text-primary decoration-2 hover:underline font-medium" to={`${import.meta.env.BASE_URL}login`}> Sign in here </Link>
                            </p>
                        </div>

                        <div className="mt-5">
                            <form class="md:max-w-md w-full mx-auto" onSubmit={handleSubmit}>
                                    <div className="grid gap-y-4">
                                        <div>
                                        <div className="flex justify-between items-center">
                                            <label className="block text-sm mb-2 dark:text-white">Email</label>
                                        </div>
                                        <div className="relative">
                                            <input type="email" name="email"  value={state.email} onChange={changeHandler} className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label className="block text-sm mb-2 dark:text-white">Password</label>
                                        </div>
                                        <div className="relative">
                                            <input type="password" name="password"  value={state.password} onChange={changeHandler} className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label className="block text-sm mb-2 dark:text-white">New Password</label>
                                        </div>
                                        <div className="relative">
                                            <input type="password" name="new_password"  value={state.new_password} onChange={changeHandler} className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label className="block text-sm mb-2 dark:text-white">Confirm Password</label>
                                        </div>
                                        <div className="relative">
                                            <input type="password" name="confirm_password"  value={state.confirm_password} onChange={changeHandler} className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" required />
                                        </div>
                                    </div>
                                    {/* <div className="flex items-center">
                                        <div className="flex">
                                            <input id="remember-me" name="remember_me"  value={state.remember_me} onChange={changeHandler}type="checkbox"
                                                className="shrink-0 mt-0.5 border-gray-200 rounded text-primary pointer-events-none focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:checked:bg-primary dark:checked:border-primary dark:focus:ring-offset-white/10" />
                                        </div>
                                        <div className="ltr:ml-3 rtl:mr-3">
                                            <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                                        </div>
                                    </div> */}
                                        

                                    <button type="submit" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">Reset password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        </>
    )
}

export default ResetPasswordCover1;