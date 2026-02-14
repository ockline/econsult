import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";
import ALLImages from "../../../../common/imagesdata";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { TagsInput } from "react-tag-input-component";
import { LanguageData, TimeZoneData } from "../../../../common/select2data";
import ProfileService from "../../../../common/profileservices";
import { Helmet } from "react-helmet";
import store from "../../../../redux/store";
import { ThemeChanger } from "../../../../redux/Action";
import Swal from "sweetalert2";

const Profilesetting = ({ local_varaiable = {}, ThemeChanger }) => {
	const [searchParams] = useSearchParams();
	const [startDate, setStartDate] = useState(new Date());
	const [selected, setSelected] = useState(['Laravel', 'Angular', 'Html', 'VueJs', 'React' ]);  // react-tag-input-component

			//URl image
			const [UrlImage, setUrlImage] = useState(ALLImages('jpg57'));
			//Disabling input feild
			const [UrlDisabled, setUrlDisabled] = useState(true);
		
			const [fileDisabled, setfileDisabled] = useState(false);
			//Default image
			const [Image, setImage] = useState(ALLImages('jpg57'));
		
			let location = useLocation();
		
		
			const putImage = () => {
				setImage(ProfileService.returnImage())
				if (UrlImage != Image) {
					ProfileService.handleChangeUrl(UrlImage)
					setImage(ProfileService.returnImage())
				}
				// setSmShow(false)
			}
		
			//toggle button for image 
			const toggleImage = (type) => {
				if (type == "fileDisabled") {
					setfileDisabled(false)
					setUrlDisabled(true)
				}
				if (type == "UrlDisabled") {
					setUrlDisabled(false)
					setfileDisabled(true)
				}
			}
			const [ClassName, setClassName] = useState()
		
			useEffect(() => {
				if (ProfileService.returnImage() != undefined) {
					setImage(ProfileService.returnImage())
				}
				let contactItem = document.querySelectorAll(".main-contact-item")
				contactItem.forEach((ele => {
					ele.addEventListener("click", () => {
						setClassName("main-content-body-show")
					});
				}))
		
			}, [location]);

			// Open Daily Activities tab when redirected from notification (?tab=daily_activities)
			useEffect(() => {
				if (searchParams.get("tab") === "daily_activities") {
					const activateTab = () => {
						const tabBtn = document.getElementById("profile-settings-item-6");
						if (tabBtn) tabBtn.click();
					};
					const t = setTimeout(activateTab, 100);
					return () => clearTimeout(t);
				}
			}, [searchParams]);

	const handleLogoutAllDevices = async () => {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "You will be logged out from all devices. This action cannot be undone.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#b91c1c",
			cancelButtonColor: "#6b7280",
			confirmButtonText: "Yes, log out",
		});
		if (!result.isConfirmed) return;

		const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
		const token = sessionStorage.getItem("token");
		if (!token || !apiBaseUrl) {
			sessionStorage.removeItem("token");
			sessionStorage.removeItem("profile");
			sessionStorage.removeItem("roles");
			sessionStorage.removeItem("currentRole");
			sessionStorage.removeItem("accessToken");
			window.location.href = `${(import.meta.env.BASE_URL || "").replace(/\/?$/, "")}/login`;
			return;
		}
		try {
			await axios.post(`${apiBaseUrl}/logout-all`, {}, {
				headers: { Authorization: `Bearer ${token}` },
			});
		} catch (e) {
			// Ignore API errors; we still clear session
		}
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("profile");
		sessionStorage.removeItem("roles");
		sessionStorage.removeItem("currentRole");
		sessionStorage.removeItem("accessToken");
		window.location.href = `${(import.meta.env.BASE_URL || "").replace(/\/?$/, "")}/login`;
	};
	
	// <p className="ti-dropdown-header-title !text-white">{local_varaiable.user.firstname} {local_varaiable.user.middlename} {local_varaiable.user.lastname}</p>
	
	
	console.log('datatata',local_varaiable)
	return (
		<div>
			<Helmet>
          <body class={ClassName}></body>
        </Helmet>
			<PageHeader currentpage="Profile Settings" activepage="Pages" mainpage="Profile Settings" />
			<div className= "grid grid-cols-12 gap-x-6">
				<div className= "col-span-12 xl:col-span-3">
					<div className= "box">
						<div className= "box-body relative">
							<div className= "flex relative before:bg-black/50 before:absolute before:w-full before:h-full before:rounded-sm">
								<img src= {ALLImages('png106')} alt="" className= "h-[200px] w-full rounded-sm" id="profile-img2"/>
								<span className= "absolute top-5 ltr:right-5 rtl:left-5 flex p-2 rounded-sm ring-1 ring-black/10 text-white bg-black/10 leading-none">
									<i className= "ri ri-pencil-line"></i>
									
								</span>
							</div>
							<div className= "absolute top-[4.5rem] inset-x-0 text-center space-y-3">
								<div className= "flex justify-center w-full">
									<div className= "relative">
										<img src= {Image} className= "w-24 h-24 rounded-full ring-4 ring-white/10 mx-auto" id="profile-img" alt="pofile-img"/>
										
										<button type="button" className="absolute bottom-0 ltr:right-0 rtl:left-0 block p-1 rounded-full ring-3 ring-white/10 text-white bg-white/10 dark:bg-bgdark leading-none" data-hs-overlay="#hs-small-modal"><i className= "ri ri-pencil-line"></i> <span></span></button>

										<div id="hs-small-modal" className="hs-overlay hidden ti-modal">
											<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
												<div className="ti-modal-content">
													<div className="ti-modal-body">
													<div onClick={() => { toggleImage("fileDisabled") }}>
													<label htmlFor="file-input" className = "sr-only">Choose file</label>
													<input type="file" name="file-input" id="file-input" disabled={fileDisabled} onChange={(ele) => ProfileService.handleChange(ele)} className = " inset-0 block w-full h-full cursor-pointer border my-2 border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-3 file:px-4 dark:file:bg-black/20 dark:file:text-white/70"/>
													</div>
													<div onClick={() => { toggleImage("UrlDisabled") }}>
													<input type="text" className= "my-auto ti-form-input"  name="basic-input" id="basic-input" disabled={UrlDisabled} onChange={(ele) => { setUrlImage(ele.target.value) }} placeholder="Paste the URL"/>
													</div><br/>
													<button type="button"  onClick={() => { putImage() }} className= "py-1 px-3 ti-btn ti-btn-primary text-sm m-0">Submit</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className= "box-body pt-0">
							<nav className= "flex flex-col space-y-2" aria-label="Tabs" role="tablist" data-hs-tabs-vertical="true">
								<button type="button" className= "hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white -mr-px py-3 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 active" id="profile-settings-item-1" data-hs-tab="#profile-settings-1" aria-controls="profile-settings-1" role="tab">
									<i className= "ri ri-shield-user-line"></i> Personal Settings
								</button>
								<button type="button" className= "hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white -mr-px py-3 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="profile-settings-item-2" data-hs-tab="#profile-settings-2" aria-controls="profile-settings-2" role="tab">
									<i className= "ri ri-global-line"></i> General Settings
								</button>
								<button type="button" className= "hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white -mr-px py-3 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="profile-settings-item-3" data-hs-tab="#profile-settings-3" aria-controls="profile-settings-3" role="tab">
									<i className= "ri ri-lock-line"></i> Password Settings
								</button>
								<button type="button" className= "hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white -mr-px py-3 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="profile-settings-item-4" data-hs-tab="#profile-settings-4" aria-controls="profile-settings-4" role="tab">
									<i className= "ri ri-account-circle-line"></i> Account Settings
								</button>
								<button type="button" className= "hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white -mr-px py-3 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="profile-settings-item-5" data-hs-tab="#profile-settings-5" aria-controls="profile-settings-5" role="tab">
									<i className= "ri ri-notification-4-line"></i> Notifications Settings
								</button>
								<button type="button" className= "hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white -mr-px py-3 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="profile-settings-item-6" data-hs-tab="#profile-settings-6" aria-controls="profile-settings-6" role="tab">
									<i className= "ri ri-todo-line"></i> Daily Activities
								</button>
							</nav>
						</div>
					</div>
				</div>
				<div className= "col-span-12 xl:col-span-9">
					<div className= "box">
						<div className= "box-body p-0">
							<div id="profile-settings-1" role="tabpanel" aria-labelledby="profile-settings-item-1">
								<div className= "box border-0 shadow-none mb-0">
									<div className= "box-header">
										<h5 className= "box-title leading-none flex"><i className= "ri ri-shield-user-line ltr:mr-2 rtl:ml-2"></i> Personal Settings</h5>
									</div>
									<div className= "box-body">
										<div>
											<div className= "grid lg:grid-cols-2 gap-6">
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">First Name</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="Firstname" name="firstname" />
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Last Name</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="Lastname"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Phone Number</label>
													<input type="number" className= "my-auto ti-form-input" placeholder="+91 123-456-789"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Email Address</label>
													<input type="email" className= "my-auto ti-form-input" placeholder="your@site.com"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Date Of Birth</label>
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Gender</label>
													<ul className= "flex flex-col sm:flex-row">
														<li className= "ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
															<div className= "relative flex items-start w-full">
																<div className= "flex items-center h-5">
																	<input id="hs-horizontal-list-group-item-radio-1" name="hs-horizontal-list-group-item-radio" type="radio" className= "ti-form-radio" defaultChecked/>
																</div>
																<label htmlFor="hs-horizontal-list-group-item-radio-1" className= "ltr:ml-3 rtl:mr-3 block w-full text-sm text-gray-600 dark:text-white/70">
                                         Female
																</label>
															</div>
														</li>

														<li className= "ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
															<div className= "relative flex items-start w-full">
																<div className= "flex items-center h-5">
																	<input id="hs-horizontal-list-group-item-radio-2" name="hs-horizontal-list-group-item-radio" type="radio" className= "ti-form-radio"/>
																</div>
																<label htmlFor="hs-horizontal-list-group-item-radio-2" className= "ltr:ml-3 rtl:mr-3 block w-full text-sm text-gray-600 dark:text-white/70">
                                          Male
																</label>
															</div>
														</li>

														<li className= "ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
															<div className= "relative flex items-start w-full">
																<div className= "flex items-center h-5">
																	<input id="hs-horizontal-list-group-item-radio-3" name="hs-horizontal-list-group-item-radio" type="radio" className= "ti-form-radio"/>
																</div>
																<label htmlFor="hs-horizontal-list-group-item-radio-3" className= "ltr:ml-3 rtl:mr-3 block w-full text-sm text-gray-600 dark:text-white/70">
                                        Others
																</label>
															</div>
														</li>
													</ul>
												</div>
											</div>
											<div className= "my-5">
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Address</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="Address"/>
												</div>
											</div>
											<div className= "grid lg:grid-cols-2 gap-6">
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">City</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="city"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Country</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="state"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">State</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="state"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Pincode</label>
													<input type="number" className= "my-auto ti-form-input" placeholder="pincode"/>
												</div>
											</div>
											<div className= "mt-5">
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Bio</label>
													<textarea className= "ti-form-input" rows="3" placeholder="Add Your Bio"></textarea>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="profile-settings-2" className= "hidden" role="tabpanel" aria-labelledby="profile-settings-item-2">
								<div className= "box border-0 shadow-none mb-0">
									<div className= "box-header">
										<h5 className= "box-title leading-none flex"><i className= "ri ri-global-line ltr:mr-2 rtl:ml-2"></i> General Settings</h5>
									</div>
									<div className= "box-body">
										<h5 className= "text-base font-semibold">User Details</h5>
										<div className= "my-4">
											<div className= "grid lg:grid-cols-2 gap-6 mb-6">
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">User Id</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="User Id"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Joining Date</label>
													
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Language</label>
													<Select classNamePrefix='react-select' options={LanguageData} placeholder='US-English' />
													
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Time Zone</label>
													<Select classNamePrefix='react-select' options={TimeZoneData} placeholder='(GMT-11:00) Midway Island, Samoa' />

													
												</div>
											</div>
											<div className= "space-y-2" id="skills">
												<label className= "ti-form-label">Skills</label>
												
												<TagsInput className="badge bg-gray-100 border dark:bg-black/20 dark:text-white text-gray-800" value={selected} onChange={setSelected} name="ProductTag" placeHolder="Filter product" />
											</div>
										</div>
										<h5 className= "text-base font-semibold">Education Details</h5>
										<div className= "my-4">
											<div className= "grid lg:grid-cols-3 gap-6">
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Schooling</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="Schooling"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Joining Date</label>
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Completed Date</label>
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Graduation</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="Graduation"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Joining Date</label>
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Completed Date</label>
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
											</div>
										</div>
										<h5 className= "text-base font-semibold">Work  Experience</h5>
										<div className= "my-4">
											<div className= "grid lg:grid-cols-4 gap-6">
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Work 1 :</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="company Name"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Designation</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="Designation"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Joining Date</label>
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Completed Date</label>
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Work 2 :</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="company Name"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Designation</label>
													<input type="text" className= "my-auto ti-form-input" placeholder="Designation"/>
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Joining Date</label>
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
												<div className= "space-y-2">
													<label className= "ti-form-label mb-0">Completed Date</label>
													<DatePicker className="ti-form-input rounded-l-none focus:z-10" showIcon selected={startDate} onChange={(date) => setStartDate(date)} placeholderText='choose Date' />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="profile-settings-3" className= "hidden" role="tabpanel" aria-labelledby="profile-settings-item-3">
								<div className= "box border-0 shadow-none mb-0">
									<div className= "box-header">
										<h5 className= "box-title leading-none flex"><i className= "ri ri-lock-line ltr:mr-2 rtl:ml-2"></i> Password Settings</h5>
									</div>
									<div className= "box-body p-0">
										<div className= "grid grid-cols-12">
											<div className= "col-span-12 xl:col-span-6 xl:ltr:border-r xl:rtl:border-l xl:border-b-0 border-b p-6 border-gray-200 dark:border-white/10">
												<div className= "space-y-4">
													<div className= "space-y-2">
														<label className= "ti-form-label mb-0">Email Id<sup className= "text-danger">*</sup></label>
														<input type="email" className= "my-auto ti-form-input" placeholder="Email Id" required/>
													</div>
													<div className= "space-y-2">
														<label className= "ti-form-label mb-0">Current Password<sup className= "text-danger">*</sup></label>
														<input type="password" className= "my-auto ti-form-input" autoComplete="off" placeholder="Current Password" required/>
													</div>
													<div className= "space-y-2">
														<label className= "ti-form-label mb-0">New Password<sup className= "text-danger">*</sup></label>
														<input type="password" className= "my-auto ti-form-input" autoComplete="off" placeholder="New Password" required/>
													</div>
													<div className= "space-y-2">
														<label className= "ti-form-label mb-0">Confirm Password<sup className= "text-danger">*</sup></label>
														<input type="password" className= "my-auto ti-form-input" autoComplete="off" placeholder="Confirm Password" required/>
													</div>
													<p className= "text-xs text-gray-500 dark:text-white/70">Password should be min of <b className= "text-success">10 characters <sup>*</sup> </b> (and up to 100 characters),<b className= "text-success">One Upper Case Character<sup>*</sup></b> and <b className= "text-success">One Special Character<sup>*</sup></b>   e.g., ! @ # ? included.</p>
												</div>
											</div>
											<div className= "col-span-12 xl:col-span-6">
												<div className= "box border-0 shadow-none">
													<div className= "box-header">
														<div className= "sm:flex space-y-4">
															<h5 className= "box-title my-auto">Web Linked Devices</h5>
															<button type="button" className= "py-1 px-3 ti-btn ti-btn-primary text-sm m-0" onClick={handleLogoutAllDevices}>Log out From All Devices </button>
														</div>
													</div>
													<div className= "box-body">
														<ul className= "flex flex-col">
															<li className= "ti-list-group bg-white text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
																<div className= "sm:flex w-full space-y-2">
																	<div className= "flex space-x-3 rtl:space-x-reverse">
																		<div className= "avatar rounded-sm avatar-sm bg-gray-100 dark:bg-black/20 p-2.5">
																			<i className= "ri ri-smartphone-line text-xl leading-none text-gray-500 dark:text-white/70"></i>
																		</div>
																		<div className= "">
																			<p className= "mb-0 text-sm">Mobile-Poco-M2-Pro</p>
																			<p className= "mb-0 text-gray-500 dark:text-white/70 text-xs">Manchester, UK-Nov 30, 04:45PM</p>
																		</div>
																	</div>
																	<div className= "ltr:ml-auto rtl:mr-auto my-auto text-end">
																		<button type="button" className= "px-2 py-1 ti-btn ti-btn-soft-info text-xs">ReWoke</button>
																		<button type="button" className= "px-2 py-1 ti-btn ti-btn-soft-danger text-xs">Logout</button>
																	</div>
																</div>
															</li>
															<li className= "ti-list-group bg-white text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
																<div className= "sm:flex w-full space-y-2">
																	<div className= "flex space-x-3 rtl:space-x-reverse">
																		<div className= "avatar rounded-sm avatar-sm bg-gray-100 dark:bg-black/20 p-2.5">
																			<i className= "ri ri-tablet-line text-xl leading-none text-gray-500 dark:text-white/70"></i>
																		</div>
																		<div className= "">
																			<p className= "mb-0 text-sm">Apple Tablet</p>
																			<p className= "mb-0 text-gray-500 dark:text-white/70 text-xs">Manchester, UK-Nov 30, 02:45PM</p>
																		</div>
																	</div>
																	<div className= "ltr:ml-auto rtl:mr-auto my-auto text-end">
																		<button type="button" className= "px-2 py-1 ti-btn ti-btn-soft-info text-xs">ReWoke</button>
																		<button type="button" className= "px-2 py-1 ti-btn ti-btn-soft-danger text-xs">Logout</button>
																	</div>
																</div>
															</li>
															<li className= "ti-list-group bg-white text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
																<div className= "sm:flex w-full space-y-2">
																	<div className= "flex space-x-3 rtl:space-x-reverse">
																		<div className= "avatar rounded-sm avatar-sm bg-gray-100 dark:bg-black/20 p-2.5">
																			<i className= "ri ri-airplay-line text-xl leading-none text-gray-500 dark:text-white/70"></i>
																		</div>
																		<div className= "">
																			<p className= "mb-0 text-sm">Dell Desktop</p>
																			<p className= "mb-0 text-gray-500 dark:text-white/70 text-xs">Manchester, UK-Nov 30, 02:45PM</p>
																		</div>
																	</div>
																	<div className= "ltr:ml-auto rtl:mr-auto my-auto text-end">
																		<button type="button" className= "px-2 py-1 ti-btn ti-btn-soft-info text-xs">ReWoke</button>
																		<button type="button" className= "px-2 py-1 ti-btn ti-btn-soft-danger text-xs">Logout</button>
																	</div>
																</div>
															</li>
															<li className= "ti-list-group bg-white text-gray-800 dark:bg-bgdark dark:border-white/10 dark:text-white">
																<div className= "sm:flex w-full space-y-2">
																	<div className= "flex space-x-3 rtl:space-x-reverse">
																		<div className= "avatar rounded-sm avatar-sm bg-gray-100 dark:bg-black/20 p-2.5">
																			<i className= "ri ri-macbook-line text-xl leading-none text-gray-500 dark:text-white/70"></i>
																		</div>
																		<div className= "">
																			<p className= "mb-0 text-sm">Lenovo Laptop</p>
																			<p className= "mb-0 text-gray-500 dark:text-white/70 text-xs">Manchester, UK-Nov 30, 02:45PM</p>
																		</div>
																	</div>
																	<div className= "ltr:ml-auto rtl:mr-auto my-auto text-end">
																		<button type="button" className= "px-2 py-1 ti-btn ti-btn-soft-info text-xs">ReWoke</button>
																		<button type="button" className= "px-2 py-1 ti-btn ti-btn-soft-danger text-xs">Logout</button>
																	</div>
																</div>
															</li>
														</ul>
													</div>
												</div>
												<div className= "my-5 px-6">
													<div className= "sm:space-x-6 rtl:space-x-reverse sm:flex space-y-4">
														<label className= "ti-form-label my-auto">Account :</label>
														<button type="button" className= "ti-btn ti-btn-danger">
                                    Deactivate Account
														</button>
														<button type="button" className= "ti-btn-disabled ti-btn ti-btn-success">
                                    Activate Account
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="profile-settings-4" className= "hidden" role="tabpanel" aria-labelledby="profile-settings-item-4">
								<div className= "box border-0 shadow-none mb-0">
									<div className= "box-header">
										<h5 className= "box-title leading-none flex"><i className= "ri ri-account-circle-line ltr:mr-2 rtl:ml-2"></i> Account Settings</h5>
									</div>
									<div className= "box-body">
										<div className= "sm:grid grid-cols-12 gap-6 space-y-6">
											<div className= "col-span-2 my-auto">
												<label className= "ti-form-label mb-0">Verfication Step - 2
													<Link aria-label="anchor" className= "ltr:ml-2 rtl:mr-2" to="#">
														<i className= "ri ri-question-line"></i>
													</Link>
												</label>
											</div>
											<div className= "col-span-10">
												<div className= "flex items-center">
													<input type="checkbox" className= "ti-switch shrink-0 w-11 h-6 before:w-5 before:h-5 ltr:float-right rtl:float-left m-0 "/>
												</div>
											</div>
										</div>
										<div className= "my-5">
											<nav className= "flex space-x-2 rtl:space-x-reverse mb-4" aria-label="Tabs" role="tablist">
												<button type="button" className= "hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:text-white py-2 px-4 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 active" id="adhar-tab" data-hs-tab="#adhar" aria-controls="adhar" role="tab">
                            Adhar Number
												</button>
												<button type="button" className= "hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:text-white py-2 px-4 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="mobile-tab" data-hs-tab="#mobile" aria-controls="mobile" role="tab">
                            mobile Number
												</button>
											</nav>
											<div>
												<div id="adhar" role="tabpanel" aria-labelledby="adhar-tab">
													<input type="text" className= "ti-form-input" placeholder="name" defaultValue="5353 2525 2525"/>
												</div>
												<div id="mobile" className= "hidden" role="tabpanel" aria-labelledby="mobile-tab">
													<input type="number" className= "ti-form-input" placeholder="name" defaultValue="9699696996"/>
												</div>
											</div>
										</div>
										<h5 className= "text-base font-semibold ">Social Accounts</h5>
										<div className= "space-y-3 mt-5">
											<div className= "sm:grid grid-cols-12 gap-6 space-y-4">
												<div className= "col-span-2 my-auto">
													<label className= "ti-form-label">Facebook</label>
												</div>
												<div className= "col-span-10">
													<input type="email" className= "ti-form-input" defaultValue="https://www.facebook.com/Spruha"/>
												</div>
											</div>
											<div className= "sm:grid grid-cols-12 gap-6 space-y-4">
												<div className= "col-span-2 my-auto">
													<label className= "ti-form-label">Twitter</label>
												</div>
												<div className= "col-span-10">
													<input type="email" className= "ti-form-input" defaultValue="twitter.com/spruko.me"/>
												</div>
											</div>
											<div className= "sm:grid grid-cols-12 gap-6 space-y-4">
												<div className= "col-span-2 my-auto">
													<label className= "ti-form-label">Google+</label>
												</div>
												<div className= "col-span-10">
													<input type="email" className= "ti-form-input" defaultValue="spruko.com"/>
												</div>
											</div>
											<div className= "sm:grid grid-cols-12 gap-6 space-y-4">
												<div className= "col-span-2 my-auto">
													<label className= "ti-form-label">Linked in</label>
												</div>
												<div className= "col-span-10">
													<input type="email" className= "ti-form-input" defaultValue="linkedin.com/in/spruko"/>
												</div>
											</div>
											<div className= "sm:grid grid-cols-12 gap-6 space-y-4">
												<div className= "col-span-2 my-auto">
													<label className= "ti-form-label">Github</label>
												</div>
												<div className= "col-span-10">
													<input type="email" className= "ti-form-input" defaultValue="github.com/spruko"/>
												</div>
											</div>
											<div className= "sm:grid grid-cols-12 gap-6 space-y-4">
												<div className= "col-span-2 my-auto">
													<label className= "ti-form-label">System</label>
												</div>
												<div className= "col-span-10">
													<input type="email" className= "ti-form-input" defaultValue="www.andersonitumay.com"/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="profile-settings-5" className= "hidden" role="tabpanel" aria-labelledby="profile-settings-item-5">
								<div className= "box border-0 shadow-none mb-0">
									<div className= "box-header">
										<h5 className= "box-title leading-none flex"><i className= "ri ri-notification-4-line ltr:mr-2 rtl:ml-2"></i> Notifications Settings</h5>
									</div>
									<div className= "box-body">
										<div className= "space-y-4">
											<NotificationEmailSection />
										</div>
									</div>
								</div>
							</div>
							<div id="profile-settings-6" className= "hidden" role="tabpanel" aria-labelledby="profile-settings-item-6">
								<DailyActivitiesTab />
							</div>
						</div>
						<div className= "box-footer text-end space-x-3 rtl:space-x-reverse">
							<Link to="#" className= "ti-btn m-0 ti-btn-soft-primary"><i className= "ri ri-refresh-line"></i> Update</Link>
							<Link to="#" className= "ti-btn m-0 ti-btn-soft-secondary"><i className= "ri ri-close-circle-line"></i> Cancel</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const NotificationEmailSection = () => {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	const [users, setUsers] = useState([]);
	const [recipients, setRecipients] = useState([]);
	const [recipientEmails, setRecipientEmails] = useState([]);
	const [ccEmails, setCcEmails] = useState([]);
	const [bccEmails, setBccEmails] = useState([]);
	const [subject, setSubject] = useState("");
	const [body, setBody] = useState("");
	const [emails, setEmails] = useState([]);
	const [loading, setLoading] = useState(false);
	const [sending, setSending] = useState(false);
	const [emailsLoading, setEmailsLoading] = useState(false);

	const isValidEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(str || "").trim());

	const getAuthHeaders = () => ({
		Authorization: `Bearer ${sessionStorage.getItem("token")}`,
	});

	const fetchEmails = async () => {
		setEmailsLoading(true);
		try {
			const res = await axios.get(`${apiBaseUrl}/notifications`, { headers: getAuthHeaders() });
			setEmails(res.data.emails || []);
		} catch (e) {
			console.error(e);
		} finally {
			setEmailsLoading(false);
		}
	};

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`${apiBaseUrl}/notifications/users`, { headers: getAuthHeaders() });
				setUsers(res.data.users || []);
			} catch (e) {
				console.error(e);
				Swal.fire("Error", "Failed to load users.", "error");
			} finally {
				setLoading(false);
			}
		};
		fetchUsers();
		fetchEmails();
	}, [apiBaseUrl]);

	const handleSend = async (e) => {
		e.preventDefault();
		const ids = recipients.map((r) => r.value ?? r.id).filter(Boolean);
		const manualEmails = (recipientEmails || []).filter((em) => isValidEmail(em));
		if (!ids.length && !manualEmails.length) {
			Swal.fire("Warning", "Please select at least one recipient or enter an email address.", "warning");
			return;
		}
		if (!subject.trim()) {
			Swal.fire("Warning", "Please enter a subject.", "warning");
			return;
		}
		if (!body.trim()) {
			Swal.fire("Warning", "Please enter a message.", "warning");
			return;
		}
		setSending(true);
		try {
			await axios.post(`${apiBaseUrl}/notifications/send`, {
				recipient_ids: ids.length ? ids : undefined,
				recipient_emails: manualEmails.length ? manualEmails : undefined,
				cc_emails: (ccEmails || []).filter((em) => isValidEmail(em)),
				bcc_emails: (bccEmails || []).filter((em) => isValidEmail(em)),
				subject: subject.trim(),
				body: body.trim(),
			}, { headers: getAuthHeaders() });
			Swal.fire("Success", "Email(s) sent successfully.", "success");
			setRecipients([]);
			setRecipientEmails([]);
			setCcEmails([]);
			setBccEmails([]);
			setSubject("");
			setBody("");
			fetchEmails();
		} catch (e) {
			Swal.fire("Error", e.response?.data?.message || "Failed to send email.", "error");
		} finally {
			setSending(false);
		}
	};

	return (
		<>
			<div className="p-4 border border-gray-200 dark:border-white/10 rounded-sm">
				<p className="text-base mb-1 font-semibold">Send Notification Email</p>
				<p className="text-xs mb-4 text-gray-500 dark:text-white/70">Send an email to one or multiple users.</p>
				<form onSubmit={handleSend} className="space-y-4">
					<div className="space-y-2">
						<label className="ti-form-label mb-0">To (recipients) <sup className="text-danger">*</sup></label>
						<p className="text-xs text-gray-500 dark:text-white/70 mb-1">Select users and/or type email addresses — you can type only, select only, or both.</p>
						<div className="space-y-2">
							<Select
								isMulti
								options={users}
								value={recipients}
								onChange={setRecipients}
								placeholder={loading ? "Loading users..." : "Select users (optional)..."}
								isDisabled={loading}
								classNamePrefix="react-select"
							/>
							<TagsInput
								value={recipientEmails}
								onChange={setRecipientEmails}
								placeHolder="Type email addresses (e.g. user@example.com)"
								className="ti-form-input badge bg-gray-100 dark:bg-black/20 dark:text-white text-gray-800"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<label className="ti-form-label mb-0">CC (optional)</label>
						<TagsInput
							value={ccEmails}
							onChange={setCcEmails}
							placeHolder="Carbon copy emails..."
							className="ti-form-input badge bg-gray-100 dark:bg-black/20 dark:text-white text-gray-800"
						/>
					</div>
					<div className="space-y-2">
						<label className="ti-form-label mb-0">BCC (optional)</label>
						<TagsInput
							value={bccEmails}
							onChange={setBccEmails}
							placeHolder="Blind carbon copy emails..."
							className="ti-form-input badge bg-gray-100 dark:bg-black/20 dark:text-white text-gray-800"
						/>
					</div>
					<div className="space-y-2">
						<label className="ti-form-label mb-0">Subject <sup className="text-danger">*</sup></label>
						<input type="text" className="ti-form-input w-full" placeholder="Email subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
					</div>
					<div className="space-y-2">
						<label className="ti-form-label mb-0">Message <sup className="text-danger">*</sup></label>
						<textarea className="ti-form-input w-full" rows="5" placeholder="Enter your message..." value={body} onChange={(e) => setBody(e.target.value)} />
					</div>
					<button type="submit" className="ti-btn ti-btn-primary" disabled={sending}>
						{sending ? "Sending..." : "Send Email"}
					</button>
				</form>
			</div>
			<div className="p-4 border border-gray-200 dark:border-white/10 rounded-sm">
				<h6 className="font-semibold mb-3">Sent Emails</h6>
				{emailsLoading ? (
					<p className="text-gray-500 text-sm">Loading...</p>
				) : emails.length === 0 ? (
					<p className="text-gray-500 text-sm">No emails sent yet.</p>
				) : (
					<div className="table-bordered rounded-sm overflow-auto max-h-[350px]">
						<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
							<thead className="bg-gray-50 dark:bg-black/20 sticky top-0">
								<tr>
									<th className="!py-2 !px-3">S/No</th>
									<th className="!py-2 !px-3">Recipient</th>
									<th className="!py-2 !px-3">Subject</th>
									<th className="!py-2 !px-3">Status</th>
									<th className="!py-2 !px-3">Sent At</th>
								</tr>
							</thead>
							<tbody>
								{emails.map((em, idx) => (
									<tr key={em.id} className="border-b border-gray-200 dark:border-white/10">
										<td className="!py-2 !px-3">{idx + 1}</td>
										<td className="!py-2 !px-3" title={em.recipient_email}>{em.recipient}</td>
										<td className="!py-2 !px-3 max-w-[200px] truncate" title={em.subject}>{em.subject}</td>
										<td className="!py-2 !px-3">
											<span className={`badge text-xs capitalize ${em.status === "delivered" ? "bg-success/10 text-success" : em.status === "sent" ? "bg-primary/10 text-primary" : "bg-danger/10 text-danger"}`}>
												{em.status}
											</span>
										</td>
										<td className="!py-2 !px-3">{em.sent_at || "—"}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
};

const DailyActivitiesTab = () => {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	const [activityDate, setActivityDate] = useState(new Date());
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [rating, setRating] = useState("");
	const [status, setStatus] = useState("completed");
	const [activities, setActivities] = useState([]);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [selectedToConfirm, setSelectedToConfirm] = useState([]);
	const [confirming, setConfirming] = useState(false);

	const getAuthHeaders = () => ({
		Authorization: `Bearer ${sessionStorage.getItem("token")}`,
	});

	const fetchActivities = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${apiBaseUrl}/user_activities`, { headers: getAuthHeaders() });
			setActivities(res.data.activities || []);
		} catch (e) {
			console.error(e);
			Swal.fire("Error", "Failed to load activities.", "error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchActivities();
	}, []);

	const toYMD = (d) => {
		if (!d) return "";
		const dt = d instanceof Date ? d : new Date(d);
		return dt.toISOString().slice(0, 10);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!description.trim()) {
			Swal.fire("Warning", "Please enter a description.", "warning");
			return;
		}
		setSaving(true);
		try {
			await axios.post(`${apiBaseUrl}/user_activities`, {
				activity_date: toYMD(activityDate),
				start_time: startTime || null,
				end_time: endTime || null,
				title: title.trim() || null,
				description: description.trim(),
				rating: rating ? parseInt(rating, 10) : null,
				status: status || "completed",
			}, { headers: getAuthHeaders() });
			Swal.fire("Success", "Activity saved successfully.", "success");
			setTitle("");
			setDescription("");
			setRating("");
			setStatus("completed");
			setStartTime("");
			setEndTime("");
			fetchActivities();
		} catch (e) {
			Swal.fire("Error", e.response?.data?.message || "Failed to save activity.", "error");
		} finally {
			setSaving(false);
		}
	};

	const handleConfirmActivities = async () => {
		if (selectedToConfirm.length === 0) {
			Swal.fire("Warning", "Please select activities to confirm.", "warning");
			return;
		}
		setConfirming(true);
		try {
			await axios.post(`${apiBaseUrl}/user_activities/confirm`, { ids: selectedToConfirm }, { headers: getAuthHeaders() });
			Swal.fire("Success", "Activities confirmed successfully.", "success");
			setSelectedToConfirm([]);
			fetchActivities();
		} catch (e) {
			Swal.fire("Error", e.response?.data?.message || "Failed to confirm activities.", "error");
		} finally {
			setConfirming(false);
		}
	};

	const toggleSelectConfirm = (id) => {
		setSelectedToConfirm((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
	};
	const unconfirmedCount = activities.filter((a) => !a.confirmed_at).length;

	return (
		<div className="box border-0 shadow-none mb-0">
			<div className="box-header">
				<h5 className="box-title leading-none flex"><i className="ri ri-todo-line ltr:mr-2 rtl:ml-2"></i> Daily Activities</h5>
			</div>
			<div className="box-body space-y-6">
				<form onSubmit={handleSubmit} className="p-4 border border-gray-200 dark:border-white/10 rounded-sm space-y-4">
					<h6 className="font-semibold">Log Today&apos;s Activities</h6>
					<div className="grid lg:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="ti-form-label mb-0">Date</label>
							<DatePicker className="ti-form-input w-full" dateFormat="dd/MM/yyyy" selected={activityDate} onChange={(d) => setActivityDate(d)} />
						</div>
						<div className="space-y-2">
							<label className="ti-form-label mb-0">Title (optional)</label>
							<input type="text" className="ti-form-input w-full" placeholder="Brief title" value={title} onChange={(e) => setTitle(e.target.value.toUpperCase())} style={{ textTransform: "uppercase" }} />
						</div>
						<div className="space-y-2">
							<label className="ti-form-label mb-0">Start Time (optional)</label>
							<input type="time" className="ti-form-input w-full" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
						</div>
						<div className="space-y-2">
							<label className="ti-form-label mb-0">End Time (optional)</label>
							<input type="time" className="ti-form-input w-full" value={endTime} onChange={(e) => setEndTime(e.target.value)} min={startTime || undefined} />
						</div>
					</div>
					<div className="space-y-2">
						<label className="ti-form-label mb-0">Description <sup className="text-danger">*</sup></label>
						<textarea className="ti-form-input w-full" rows="4" placeholder="What did you accomplish today?" value={description} onChange={(e) => setDescription(e.target.value)} required />
					</div>
					<div className="grid lg:grid-cols-2 gap-6">
						<div className="space-y-2 lg:max-w-[200px]">
							<label className="ti-form-label mb-0">Self Rating (1-5, optional)</label>
							<select className="ti-form-input w-full" value={rating} onChange={(e) => setRating(e.target.value)}>
								<option value="">--</option>
								{[1, 2, 3, 4, 5].map((n) => (
									<option key={n} value={n}>{n} - {n <= 2 ? "Low" : n === 3 ? "Medium" : "High"}</option>
								))}
							</select>
						</div>
						<div className="space-y-2 lg:max-w-[200px]">
							<label className="ti-form-label mb-0">Status</label>
							<select className="ti-form-input w-full" value={status} onChange={(e) => setStatus(e.target.value)}>
								<option value="completed">Completed</option>
								<option value="in_progress">In Progress</option>
								<option value="pending">Pending</option>
							</select>
						</div>
					</div>
					<button type="submit" className="ti-btn ti-btn-primary" disabled={saving}>
						{saving ? "Saving..." : "Save Activity"}
					</button>
				</form>
				<div>
					<div className="flex justify-between items-center flex-wrap gap-2 mb-3">
						<h6 className="font-semibold mb-0">Recent Activities</h6>
						{unconfirmedCount > 0 && (
							<div className="flex items-center gap-2">
								<button type="button" className="ti-btn ti-btn-primary ti-btn-sm" onClick={handleConfirmActivities} disabled={confirming || selectedToConfirm.length === 0}>
									{confirming ? "Confirming..." : `Confirm Selected (${selectedToConfirm.length})`}
								</button>
							</div>
						)}
					</div>
					{loading ? (
						<p className="text-gray-500">Loading...</p>
					) : activities.length === 0 ? (
						<p className="text-gray-500">No activities yet. Log your first activity above.</p>
					) : (
						<div className="table-bordered rounded-sm overflow-auto max-h-[400px]">
							<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
								<thead className="bg-gray-50 dark:bg-black/20 sticky top-0">
									<tr>
										{unconfirmedCount > 0 && <th className="!py-2 !px-3 w-10">Confirm</th>}
										<th className="!py-2 !px-3">S/No</th>
										<th className="!py-2 !px-3">Title</th>
										<th className="!py-2 !px-3">Description</th>
										<th className="!py-2 !px-3">Rate</th>
										<th className="!py-2 !px-3">Time</th>
										<th className="!py-2 !px-3">Status</th>
									</tr>
								</thead>
								<tbody>
									{activities.map((a, idx) => (
										<tr key={a.id} className={`border-b border-gray-200 dark:border-white/10 ${!a.confirmed_at ? "bg-warning/5" : ""}`}>
											{unconfirmedCount > 0 && (
												<td className="!py-2 !px-3">
													{!a.confirmed_at ? (
														<input type="checkbox" className="ti-form-checkbox" checked={selectedToConfirm.includes(a.id)} onChange={() => toggleSelectConfirm(a.id)} />
													) : (
														<span className="text-success" title="Confirmed"><i className="ri-checkbox-circle-fill"></i></span>
													)}
												</td>
											)}
											<td className="!py-2 !px-3">{idx + 1}</td>
											<td className="!py-2 !px-3">{a.title || "—"}</td>
											<td className="!py-2 !px-3 max-w-[200px] truncate" title={a.description}>{a.description}</td>
											<td className="!py-2 !px-3">{a.rating ? `${a.rating}/5` : "—"}</td>
											<td className="!py-2 !px-3">{(a.start_time || a.end_time) ? [a.start_time, a.end_time].filter(Boolean).map((t) => (t || "").slice(0, 5)).join(" – ") : "—"}</td>
											<td className="!py-2 !px-3">
												<span className={`badge text-xs capitalize ${a.status === "completed" ? "bg-success/10 text-success" : a.status === "in_progress" ? "bg-warning/10 text-warning" : "bg-gray-100 dark:bg-black/20 text-gray-600 dark:text-white/70"}`}>
													{(a.status || "completed").replace(/_/g, " ")}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({ local_varaiable: state });
export default connect(mapStateToProps)(Profilesetting);
