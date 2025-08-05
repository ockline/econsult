import React, { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import ALLImages from '../../common/imagesData'
import { Helmet } from 'react-helmet';
import { UserChanger, RolesChanger } from '../../redux/Action';
import { connect } from "react-redux"
import axios from 'axios';

const Firebaselogin = ({local_varaiable, UserChanger, RolesChanger}) => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  
    
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
    });
    const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

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
    setIsLoading(true);
    try {
      const token = await csrfToken();
      // console.log('waletee Token:', token);
      // Use the retrieved CSRF token in your request
      const resp = await axios.post(`${apiBaseUrl}/login`, body, {
        headers: {
          'X-CSRF-Token': token,
        },
      });
      // console.log('walete wazunguuuu',resp.data);
      if (resp.data.status === 422) {
        swal({
          title: 'Failed',
          text: resp.data.message,
          icon: 'error',
          button: 'OK',
        });
        setIsLoading(false);
      }
       if (resp.data.status === 429) {
        swal({
          title: 'Failed',
          text: resp.data.message,
          icon: 'error',
          button: 'OK',
        });
        setIsLoading(false);
      }else {
                                  
        const data = resp.data.token;
        if (data) {
          // console.log('humu ndani', resp.data);
          setUser(resp.data.user);
          // set user and roles to redux
          UserChanger(resp.data.user);
          RolesChanger(resp.data.user_roles.map(r => r.alias));
          sessionStorage.setItem('token', data)
          setToken(data);
                     
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error yoteeee', error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          setError(error.response.data.message);
        } else {
          swal({
            title: 'Failed',
            text: `Error ${error.response.status}: ${error.response.data.message}`,
            icon: 'error',
            button: 'OK',
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        swal({
          title: 'Error',
          text: 'Failed to connect to the server. Please check your internet connection and try again.',
          icon: 'error',
          button: 'OK',
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        swal({
          title: 'Unexpected Error',
          text: error.message,
          icon: 'error',
          button: 'OK',
        });
      }
      setIsLoading(false);
    }
  }
     
  return (

<div
  className="flex justify-center items-center min-h-screen" style={{ backgroundColor: '#fff' }}>
    <div className="font-[sans-serif] flex items-center justify-center min-h-screen p-4">

        <div class="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl max-md:max-w-lg rounded-md p-8" style={{ backgroundColor: 'white' }}>
            <h1 className="text-2xl text-[#b2000a]"><b>&nbsp;SOCRATE MANAGEMENT SYSTEM (SOMS)</b></h1>
            <hr 
              style={{ 
                height: '3px',       
                width: '45%',       
                backgroundColor: '#b2000a',
                border: 'none',     
                margin: '8px 0'     
              }} 
            />

            <div class="grid md:grid-cols-2 items-center gap-12">
              <div class="max-md:order-1 lg:min-w-[500px]">
                            <img src={ALLImages('authenticate')} class="lg:w-11/12 w-full object-cover" alt="login-image" />
                      
              </div>

              <form class="md:max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
                <div class="mb-16">
                  <h3 class="text-5xl font-extrabold text-[#b2000a]">Sign in</h3>
                </div>

                <div>
                  <div class="relative flex items-center">
                    <input name="email" type="email"  value={state.email} onChange={changeHandler}
                                    required   autoComplete="email" class="w-full text-lg border-b border-gray-300 focus:border-[#b2000a] px-2 py-4 outline-none" placeholder="Enter email" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[22px] h-[22px] absolute right-2" viewBox="0 0 682.667 682.667">
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                        </clipPath>
                      </defs>
                      <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                        <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div class="mt-12">
                  <div class="relative flex items-center">
                    <input 
                      name="password" 
                      type={showPassword ? "text" : "password"}  
                      value={state.password} 
                      onChange={changeHandler} 
                      required 
                      class="w-full text-lg border-b border-gray-300 focus:border-[#b2000a] px-2 py-4 outline-none" 
                      placeholder="Enter password" 
                    />
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      stroke="#bbb" 
                      class="w-[22px] h-[22px] absolute right-2 cursor-pointer" 
                      viewBox="0 0 24 24"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        // Hide password icon (eye-slash)
                        <path d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 0 1 1.563-3.029m5.858.908a3 3 0 1 1 4.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                      ) : (
                        // Show password icon (eye)
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </>
                      )}
                    </svg>
                  </div>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4 mt-8">
                  <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-5 w-5 shrink-0 text-[#b2000a] focus:ring-[#b2000a] border-gray-300 rounded" />
                    <label for="remember-me" class="text-gray-800 ml-3 block text-base">
                      Remember me
                    </label>
                  </div>
                  <div>
                <Link className="text-[#b2000a] font-semibold text-base hover:underline" to={`${import.meta.env.BASE_URL}Authentication/forgetpassword/cover1`}>Forgot password?</Link>
                  </div>
                </div>

                <div class="mt-16">
                   <button
                type="submit"
                className="w-full shadow-xl py-4 px-5 text-lg font-semibold rounded-md text-white bg-[#b2000a] hover:bg-[#b2000a] focus:outline-none"
                disabled={isLoading} // Disable the button when loading
            >
                {isLoading ? (
                    <>
                        <span className="ti-spinner text-white" role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </span>
                        Loading...
                    </>
                ) : (
                    'Sign in'
                )}
            </button>
                  <p class="text-gray-800 text-base text-center mt-8">Don't have an account <a href="#" class="text-[#b2000a] font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
                </div>
              </form>
            </div>
        </div>
    </div>
</div>

  )
}

const mapStateToProps = (state) => ({
    local_varaiable: state
  })
export default connect(mapStateToProps,{UserChanger, RolesChanger})(Firebaselogin);

