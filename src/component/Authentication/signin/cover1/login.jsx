import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ALLImages from '../../../../common/imagesData'
import { useStatecontext } from "../../../../contexts/ContextProvider";
import { Helmet } from 'react-helmet';
import axios from 'axios';

const SignInCover1 = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL


    const navigate = useNavigate();





    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStatecontext();

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
        };

        try {

            const res = await axios.post(`${apiBaseUrl}/login`, body, {

            });


            console.log('**************************');
            console.log(res.status);
            if (res.data.status === 422) {
                swal({
                    title: 'Operation Failed',
                    text: res.data.message,
                    icon: 'error',
                    button: 'OK',
                });
            } else {
                swal({
                    title: 'Success',
                    text: res.data.message,
                    icon: 'success',
                    button: 'OK',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                }).then(() => {
                    const data = res.data.token;
                    console.log('humu ndani', data);
                    setUser(res.data.user)
                    setToken(data)

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

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                /> */}
                <img src= {ALLImages('dark')} alt="logo" className="mx-auto block justify-center mb-2"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Socrate Management System (SMS)
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={state.email} onChange={changeHandler}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link className="text-sm text-primary decoration-2 hover:underline font-medium"
                                    to={`${import.meta.env.BASE_URL}Authentication/forgetpassword/cover1`}>Forgot password?</Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={state.password} onChange={changeHandler}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default SignInCover1;