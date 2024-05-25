import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "./index.scss";
import { RouteData } from "./common/routingData";
import  router  from "./router";

import { HelmetProvider } from 'react-helmet-async';

import App from "./layout/App";

import Normals from "./component/dashboards/normal/normal";

import Authenticationlayout from "./layout/Authenticationlayout";
import Commingsoon from "./component/Authentication/commingsoon/commingsoon";
import Error404 from "./component/Authentication/errorpage/error404/error404";
import Error500 from "./component/Authentication/errorpage/error500/error500";

import CreatePasswordBasic from "./component/Authentication/createpassword/basic/createpasswordbasic";
import CreatePasswordCover1 from "./component/Authentication/createpassword/cover1/createpasswordcover1";
import CreatePasswordCover2 from "./component/Authentication/createpassword/cover2/createpasswordcover2";
import ForgetPasswordBasic from "./component/Authentication/forgetpassword/basic/forgetpasswordbasic";
import ForgetPasswordCover1 from "./component/Authentication/forgetpassword/cover1/forgetpasswordcover1";
import ForgetPasswordCover2 from "./component/Authentication/forgetpassword/cover2/forgetpasswordcover2";
import LockScreenBasic from "./component/Authentication/lockscreen/basic/lockscreenbasic";
import LockScreenCover1 from "./component/Authentication/lockscreen/cover1/lockscreencover1";
import LockScreenCover2 from "./component/Authentication/lockscreen/cover2/lockscreencover2";
import ResetPasswordBasic from "./component/Authentication/resetpassword/basic/resetpasswordbasic";
import ResetPasswordCover1 from "./component/Authentication/resetpassword/cover1/resetpasswordcover1";
import ResetPasswordCover2 from "./component/Authentication/resetpassword/cover2/resetpasswordcover2";
import SignInBasic from "./component/Authentication/signin/basic/signinbasic";
import SignInCover1 from "./component/Authentication/signin/cover1/signincover1";
import SignUpBasic from "./component/Authentication/signup/basic/signupbasic";
import SignUpCover1 from "./component/Authentication/signup/cover1/signupcover1";
import SignUpCover2 from "./component/Authentication/signup/cover2/signupcover2";
import VerificationBasic from "./component/Authentication/twostepverification/basic/verificationbasic";
import VerificationCover1 from "./component/Authentication/twostepverification/cover1/verificationcover1";
import VerificationCover2 from "./component/Authentication/twostepverification/cover2/verificationcover2";
import Underconstruction from "./component/Authentication/underconstruction/underconstruction";
import Undermaintenance from "./component/Authentication/undermaintenance/undermaintenance";


import Firebaselayout from "./layout/firebase/firebaselayout";
import Firebaselogin from "./layout/firebase/firebaselogin";
import Firebaseregister from "./layout/firebase/firebaseregister";
import ScrollToTop from "./ScrollToTop/ScrolltoTop";
import { ContextProvider } from "./contexts/ContextProvider";
import useInactivity from './redux/useInactivity'; // Adjust the path as necessary
import axios from 'axios';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		
		<ContextProvider>
			<RouterProvider router={router}/>
		</ContextProvider>
		
	</>,
);
