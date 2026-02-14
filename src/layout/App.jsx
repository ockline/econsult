import React, { Fragment, useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import { Link, useNavigate  } from 'react-router-dom'
import { Helmet } from "react-helmet-async";
import Backtotop from "./layoutsection/backtotop/backtotop";
import Footer from "./layoutsection/footer/footer";
import Header from "./layoutsection/header/header";
import Sidebar from "./layoutsection/sidemenu/sidemenubar";
import Switcher from "./layoutsection/switcher/switcher";
import * as switcherdata from "../common/switcherdata";
import { UserChanger, RolesChanger } from "../redux/Action.jsx"
import axios from 'axios';
import { connect } from "react-redux"
import setupIdleListener from "../utility/idleTimeout";

 
const App = ({local_varaiable, UserChanger, RolesChanger}) => {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
	let [MyclassName , setMyClass] = useState("")
	const navigate = useNavigate()

	const [initializing, setInitializing] = useState(true);

	const Bodyclickk = () => {
		if (localStorage.getItem("Syntoverticalstyles") == "icontext") {
			setMyClass("")
		}
	}
	useEffect(() => {
		// Initialize Preline
		const initializePreline = async () => {
			try {
				// Import Preline dynamically
				const { initFlowbite } = await import('preline');
				if (typeof initFlowbite === 'function') {
					initFlowbite();
				} else {
					console.warn('Preline initialization function not found');
				}
			} catch (error) {
				console.error('Error initializing Preline:', error);
			}
		};

		// Call initialize functions
		initialize();
		initializePreline();

		// Re-initialize Preline when route changes
		const observer = new MutationObserver(() => {
			initializePreline();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		// Idle timeout: after 10 min inactivity, prompt "Are you still active?" with 2 min countdown
		const cleanupIdle = setupIdleListener();

		// Cleanup
		return () => {
			observer.disconnect();
			if (cleanupIdle) cleanupIdle();
		};
	}, []);

	 const csrfToken = async () => {
        // Implement your logic to fetch CSRF token
        // For example, if you are using Laravel, you might retrieve it from a meta tag in the HTML
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        if (metaTag) {
            return metaTag.getAttribute('content');
        }
        // Replace this logic with your actual CSRF token retrieval mechanism
    };

	async function initialize() {
		// perform request to obtain user details and set to the redux state
		setInitializing(true);
        try {
            const token = await sessionStorage.getItem('token');
            // console.log('CSRF Token:', token);
            // Use the retrieved CSRF token in your request
            const resp = await axios.get(`${apiBaseUrl}/get_user_token`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

			// set user and roles to redux
			
			UserChanger(resp.data.user);
			RolesChanger(resp.data.user_roles.map(r => r.alias));
			setInitializing(false)
		} catch (e) {
			// navigate to login page
			console.log(e)
			navigate('')
		}
	}
	return (
		<Fragment>
				<Helmet
					htmlAttributes={{
						lang: "en",
						// "data-menu-styles":"dark",
						dir: "ltr",
						class: "light",
						"data-nav-layout":"vertical",
						"data-header-styles":"light",
						"data-vertical-style":"overlay",
						"icon-text": MyclassName
					}}
				/>
				<Switcher />
				{initializing ?<div className="text-center mt-[360px]">
    <div className="ti-spinner text-primary w-12 h-12" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
    </div>
</div>
 : 
				<div className="page">
					<Sidebar />
					<Header />
					<div className="content">
						<div className="main-content" onClick={Bodyclickk}>
							<Outlet />
						</div>
					</div>
					<Footer />
				</div> }
				<Backtotop />
				<div id="responsive-overlay"></div>
			{/* </Provider> */}
		</Fragment>
	);
};


const mapStateToProps = (state) => ({
    local_varaiable: state
  })
export default connect(mapStateToProps,{UserChanger, RolesChanger})(App);

