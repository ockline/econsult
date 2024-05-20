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

        // <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            

             <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src= {ALLImages('dark')} alt="logo" className="mx-auto block justify-center mb-2"/>
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
         Socrate Management System (SMS)
        </h2>
        {/* <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
          Or
          <a href="#" className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            create a new account
          </a>
        </p> */}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={state.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="user@example.com"
                />
                {/* {errors.email && ( */}
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                    {/* <span className="text-red-500 ml-1">{errors.email}</span> */}
                  </div>
                {/* )} */}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">Password</label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={state.password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {/* {errors.password && (
                  <div className="text-red-500 mt-1">{errors.password}</div>
                )} */}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember" type="checkbox" value="1" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
              </div>

              <div className="text-sm leading-5">
                <a href="#" className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Sign in
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  
        
    )
}

export default SignInCover1;