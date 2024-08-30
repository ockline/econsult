
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux"
import { Route, Routes } from "react-router-dom";
import { RouteData } from "./common/routingData";
import Normals from "./component/dashboards/normal/normal";
import Pagelayout from "./layout/pagelayout";
import TermsConditions from "./component/pagecomponent/terms&conditions/terms&conditions";
import Home from "./component/pagecomponent/profile/home/home";
import Authenticationlayout from "./layout/Authenticationlayout";

import App from "./layout/App";

import Commingsoon from "./component/Authentication/commingsoon/commingsoon";


import Error404 from "./component/Authentication/errorpage/error404/error404";
import Error500 from "./component/Authentication/errorpage/error500/error500";


import CreatePasswordCover1 from "./component/Authentication/createpassword/cover1/createpasswordcover1";
import ForgetPasswordCover1 from "./component/Authentication/forgetpassword/cover1/forgetpasswordcover1";
import LockScreenCover1 from "./component/Authentication/lockscreen/cover1/lockscreencover1";
import ResetPasswordCover1 from "./component/Authentication/resetpassword/cover1/resetpasswordcover1";
import SignInCover1 from "./component/Authentication/signin/cover1/signincover1";
import SignUpBasic from "./component/Authentication/signup/basic/signupbasic";
import SignUpCover1 from "./component/Authentication/signup/cover1/signupcover1";
import VerificationBasic from "./component/Authentication/twostepverification/basic/verificationbasic";
import VerificationCover1 from "./component/Authentication/twostepverification/cover1/verificationcover1";
import VerificationCover2 from "./component/Authentication/twostepverification/cover2/verificationcover2";
import Underconstruction from "./component/Authentication/underconstruction/underconstruction";
import Undermaintenance from "./component/Authentication/undermaintenance/undermaintenance";


import Firebaselayout from "./layout/firebase/firebaselayout";
import Firebaselogin from "./layout/firebase/firebaselogin";
import Firebaseregister from "./layout/firebase/firebaseregister";
import ScrollToTop from "./ScrollToTop/ScrolltoTop";


function Root({ local_varaiable }) {
    const [routes, setRoutes] = useState(RouteData)
	const hasRole = (requiredRoles) => {
		// returns true when user has atleast one of the roles required by menu item
		// User roles = ['ALL'] - required = ['ALL', 'DEV']
		// local_varaiable.roles.map((r) => requiredRoles.includes(r)) => [true]
        console.log(local_varaiable.roles, requiredRoles, local_varaiable.roles.map((r) => requiredRoles.includes(r)), local_varaiable.roles.map((r) => requiredRoles.includes(r)).includes(true))
		return local_varaiable.roles.map((r) => requiredRoles.includes(r)).includes(true);
	}

    useEffect(() => {
        setRoutes(RouteData.filter((i) => hasRole(i.roles || ['ALL'])))
    }, [local_varaiable.roles])

	return (<>
    <Routes>
        <Route path={`${import.meta.env.BASE_URL}`} element={<Firebaselayout />}>
            <Route index element={<Firebaselogin />} />
            <Route path={`${import.meta.env.BASE_URL}login`} element={<Firebaselogin />} />
            <Route path={`${import.meta.env.BASE_URL}firebase/firebaseregister`} element={<Firebaseregister />} />
        </Route>

            <Fragment >
                {/* //Main page */}
                <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
                    <Route  index element={<Normals />} />
                    {routes.map((idx) => (
                        <Route key={Math.random()} exact path={idx.path} element={idx.element} />
                    ))}
                </Route>
                <Route path={`${import.meta.env.BASE_URL}`} element={<Pagelayout />}>
                    {/* <Route path={`${import.meta.env.BASE_URL}pagecomponent/aboutus`} element={<Aboutus />} />
                    <Route path={`${import.meta.env.BASE_URL}pagecomponent/faqs`} element={<Faqs />} />
                    <Route path={`${import.meta.env.BASE_URL}pagecomponent/Contactus`} element={<Contactus />} /> */}
                    <Route path={`${import.meta.env.BASE_URL}pagecomponent/terms&conditions`} element={<TermsConditions />} />

                    {/* Profile */}
                    <Route path={`${import.meta.env.BASE_URL}pagecomponent/profile/home`} element={<Home />} />
                </Route>

                {/* Authentication */}
                
                <Route path={`${import.meta.env.BASE_URL}`} element={<Authenticationlayout />}>
                <Route path="*" element={<Error404/>} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/commingsoon`} element={<Commingsoon />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/createpassword/cover1`} element={<CreatePasswordCover1 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/errorpage/error404`} element={<Error404 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/errorpage/error500`} element={<Error500 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/forgetpassword/cover1`} element={<ForgetPasswordCover1 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/lockscreen/cover1`} element={<LockScreenCover1 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/resetpassword`} element={<ResetPasswordCover1 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/signin/cover1`} element={<SignInCover1 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/signup/basic`} element={<SignUpBasic />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/signup/cover1`} element={<SignUpCover1 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/twostepverification/basic`} element={<VerificationBasic />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/twostepverification/cover1`} element={<VerificationCover1 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/twostepverification/cover2`} element={<VerificationCover2 />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/underconstruction`} element={<Underconstruction />} />
                    <Route path={`${import.meta.env.BASE_URL}Authentication/undermaintenance`} element={<Undermaintenance />} />
                </Route>
                
            </Fragment>

    </Routes></>)
}

const mapStateToProps = (state) => ({
	local_varaiable: state
})
export default connect(mapStateToProps, {})(Root);
