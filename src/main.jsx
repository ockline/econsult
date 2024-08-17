import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./ScrollToTop/ScrolltoTop";
import { Provider } from "react-redux";
import store from "./redux/store";
import Root from "./Root.jsx";

const helmetContext = {};




ReactDOM.createRoot(document.getElementById("root")).render(<Fragment>
	<Provider store={store}>
		<HelmetProvider context={helmetContext}>
		<BrowserRouter>
		<ScrollToTop/>
			<Root />
		</BrowserRouter>
		</HelmetProvider>
	</Provider>
</Fragment>);
// export default connect(mapStateToProps, { ThemeChanger })(Main);




// function App() {
//     useEffect(() => {
//         setupIdleListener();
//         document.body.style.zoom = '0.9';
//     }, []);
//     return (
//       <BrowserRouter>
//           <div className="App">
//               <Routes>
//                   <Route path="/" element={<Authentication/>} />
//                   <Route path="/scheme-selection" element={<SelectScheme/>} />
//                   <Route path="/main/*" element={<Main/>}>
//                   </Route>
//               </Routes>
//           </div>
//       </BrowserRouter>
//   );
// }

// export default App;
