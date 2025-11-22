import React, { Fragment } from "react";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	
	return (
		<Fragment>
			<footer className="mt-auto py-3 border-t dark:border-white/10 bg-white dark:bg-bgdark">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<p className="text-center">Copyright © <span id="year">{currentYear}</span> <a href="#" className="text-primary">econsult</a>. Designed with <span className="ri ri-heart-fill text-red-500"></span> by <a className="text-primary" href="#"> Socrate Consulting (T) Ltd </a> All rights reserved </p>
				</div>
			</footer>

		</Fragment>
	);
};

export default Footer;
