import React, { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import ALLImages from '../../../../common/imagesData'
import { Helmet } from 'react-helmet';
import axios from 'axios';

const SignInCover1 = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  
    
    const navigate = useNavigate();
    const RouteChange = () => {
        let path = `${import.meta.env.BASE_URL}dashboards/normal/`;
        navigate(path);
    }
    
    
   

    const [state, setState] = useState({
        email: '',
        password: '',
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
        };

        try {
            const token = await csrfToken();
            // console.log('CSRF Token:', token);
            // Use the retrieved CSRF token in your request
            const resp = await axios.post(`${apiBaseUrl}/login`, body, {
                headers: {
                    'X-CSRF-Token': token,
                },
            });
            console.log('hellow hapaaa');
            console.log(resp.data.message);
            console.log('**************************');
            console.log(resp.status);
                if (resp.status === 200) {
                    setLoggedIn(true);
                    // setUser(resp.data.user); // Make sure setUser is defined
                    navigate('/dashboard/normal'); // Redirect to the 'dashboard' route
                }
            
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError(error.response.data.message);
            }
        }
      };
  
     
  return (

<div className='flex justify-center min-h-screen align-middle'>
        <Helmet>
        <html dir='ltr' class="h-full"></html>
          <body class="cover1 justify-center"></body>
        </Helmet>
        <main id="content"  className="w-full max-w-md mx-auto my-auto p-6">
            {/* <Link to={`${import.meta.env.BASE_URL}dashboards/normal/`} className="header-logo">
                <img src={ALLImages('dark')} alt="logo" className="mx-auto block"/>
            </Link> */}
              <h1 className=" header-logo block text-2xl font-bold text-gray-800 dark:text-white">
                  &nbsp;&nbsp;&nbsp;Socrate Management System</h1>
              <hr></hr>
            <div className="mt-7 bg-white rounded-sm shadow-sm dark:bg-bgdark">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                        <p className="mt-3 text-sm text-gray-600 dark:text-white/70">
                            If you have an account yet?
                            {/* <Link className="text-primary decoration-2 hover:underline font-medium" to={`${import.meta.env.BASE_URL}Authentication/signup/cover1`}> Sign up here</Link> */}
                        </p>
                    </div>

                    <div className="mt-5">
                        <div
                            className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 ltr:before:mr-6 rtl:before:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 ltr:after:ml-6 rtl:after:mr-6 dark:text-white/70 dark:before:border-white/10 dark:after:border-white/10">
                            </div>

                          <div>
                              <form className="relative" onSubmit={handleSubmit}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                                    <div className="relative">
                                        <input type="email" id="email" name="email" value={state.email} onChange={changeHandler}
                                            className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
                                            required/>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                                        <Link className="text-sm text-primary decoration-2 hover:underline font-medium"
                                            to={`${import.meta.env.BASE_URL}Authentication/forgetpassword/cover1`}>Forgot password?</Link>
                                    </div>
                                    <div className="relative">
                                        <input type="password" id="password" name="password"  value={state.password} onChange={changeHandler}
                                            className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
                                            required/>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex">
                                        <input id="remember-me" name="remember-me" type="checkbox"
                                            className="shrink-0 mt-0.5 border-gray-200 rounded text-primary pointer-events-none focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:checked:bg-primary dark:checked:border-primary dark:focus:ring-offset-white/10"/>
                                    </div>
                                    <div className="ltr:ml-3 rtl:mr-3">
                                        <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                                    </div>
                                </div>
                                      {/* <Link to="#" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">Sign in</Link> */}
                                      
                                      <button type="submit" name="submit" className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">Login</button>
                                  </div>
                             </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

  )
}

export default SignInCover1;