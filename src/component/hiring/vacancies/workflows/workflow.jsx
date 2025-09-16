import React, { useState, useEffect } from 'react'
// import PageHeader from '../../../layout/layoutsection/pageHeader/pageHeader';
import DatePicker from 'react-datepicker';
import { DepartmentData, EmployerData, VacancyTypeData, JobTitleData } from '/src/common/select2data';
import { fetchInitiatedJobDetails } from '/src/common/workflowdata';

import Creatable from "react-select/creatable";
import ALLImages from "../../../../common/imagesData";
import Select from 'react-dropdown-select';
import { Link, useParams } from "react-router-dom";
import 'react-form-wizard-component/dist/style.css';
import "../../../../../src/assets/css/button-link-style.css";
import axios from "axios";
import { ThemeChanger } from "../../../../redux/Action"
import store from "../../../../redux/store";
import { connect } from "react-redux"

const Workflow = ({ local_varaiable, ThemeChanger }) => {
	const [startDate, setStartDate] = useState(new Date());
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
	const roles = local_varaiable.roles
	const user = local_varaiable.user

	console.log('welcome roles', user)

	// const history = useHistory();
	const [value, setValue] = useState('');
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState([])
	const [loading, setIsLoading] = useState(false)
	const [Show, setShow] = useState(true);
	const [closeModal, setCloseModal] = useState(false)


	const { id } = useParams();
	
	
	//retrive  initiated workflow
	const [initiatedWorkflow, setInititatedWorkflow] = useState({});
	useEffect(() => {
		axios.get(`${apiBaseUrl}/workflows/vacancies/retrive_initiated/${id}`)
			.then((res) => {
				setInititatedWorkflow(res.data.initiated_details);
				//   console.log("dataaa",res.data.job_document)
			})
			.catch((error) => {
				console.error('Error fetching job documents:', error);
			});
	}, [id]);

	useEffect(() => {
		axios.get(`${apiBaseUrl}/hiring/job/home_job/${id}`).then((res) => {
			setFormData(res.data.formData)
			// console.log(res.data.formData)
		})
	}, [id])
	const handleInputChange = (stepName, value) => {
		setFormData((prevData) => ({
			...prevData,
			[stepName]: value,
			error_list: { ...prevData.error_list, [stepName]: null },
		}));
	};
	//block to preview signed  and  job application
	const [jobDocument, setJobDocument] = useState([]);
	const [documentUrl, setDocumentUrl] = useState('');
	const jobDocumentArray = Object.values(jobDocument);


	// console.log('log dataaa', documentUrl);
	useEffect(() => {
		axios.get(`${apiBaseUrl}/hiring/job/get_job_document/${id}`)
			.then((res) => {
				setJobDocument(res.data.job_document);
				//   console.log("dataaa",res.data.job_document)
			})
			.catch((error) => {
				console.error('Error fetching job documents:', error);
			});
	}, [id]);
	const handlePreviewClick = (description) => {
		// Assuming the documents are stored in a specific folder on the server      
		const absoluteUrl = `${docBaseUrl}/hiring/vacancies/${description}`;

		//   console.log('absoluteUrl', absoluteUrl);

		// Update the state with the document URL
		setDocumentUrl(absoluteUrl);

	};
	//************************************************* */
	const [formInitiateData, setFormInitiateData] = useState({

		initiate_comment: '',
		error_list: [],
	});

	const handleInitiateInputChange = (stepName, value) => {
		setFormInitiateData((prevData) => ({
			...prevData,
			[stepName]: value,
			error_list: { ...prevData.error_list, [stepName]: null },
		}));
	};
	const handleInitiateSubmit = async (e) => {
		e.preventDefault();

		const DataToSend = {
			user_id: user.id,
			workflow_id: id,
			initiate_comment: formInitiateData.initiate_comment,

		};


		try {
			const resp = await axios.post(`${apiBaseUrl}/workflows/vacancies/initiate_workflow`, DataToSend, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
			if (resp.data.validator_err) {
				// Handle validation errors
				const validationErrors = resp.data.validator_err;

				// Update component state with validation errors
				setFormInitiateData((prevData) => ({
					...prevData,
					error_list: validationErrors,
				}));

				// Format validation errors for display in SweetAlert
				const formattedErrors = Object.keys(validationErrors).map((field) => (
					`${field}: ${validationErrors[field].join(', ')}`
				)).join('\n');

				swal({
					title: 'Sorry! Operation failed',
					text: formattedErrors,
					icon: 'error',
					button: 'OK',
				});
			} else if (resp.data.status === 500) {
				swal({
					title: 'Failed',
					text: resp.data.message,
					icon: 'warning',
					button: 'ok',
				})
				// Additional logic or state updates after successful update
			} else if (resp.data.status === 200) {
				swal({
					title: 'Success',
					text: resp.data.message,
					icon: 'success',
					button: 'ok',
				});
			}
		}
		catch (error) {
			console.error("Unexpected error:", error.message);
		};
	};

	//Working on the  review  vacancies/review_workflow
	const [formReviewData, setFormReviewData] = useState({

		initiate_comment: '',
		error_list: [],
	});

	const handleReviewInputChange = (stepName, value) => {
		setFormReviewData((prevData) => ({
			...prevData,
			[stepName]: value,
			error_list: { ...prevData.error_list, [stepName]: null },
		}));
	};
	const handleReviewSubmit = async (e) => {
		e.preventDefault();

		const DataToSend = {
			user_id: user.id,
			workflow_id: id,
			initiate_comment: formReviewData.initiate_comment,

		};


		try {
			const resp = await axios.post(`${apiBaseUrl}/workflows/vacancies/review_workflow`, DataToSend, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			});
			if (resp.data.validator_err) {
				// Handle validation errors
				const validationErrors = resp.data.validator_err;

				// Update component state with validation errors
				setFormReviewData((prevData) => ({
					...prevData,
					error_list: validationErrors,
				}));

				// Format validation errors for display in SweetAlert
				const formattedErrors = Object.keys(validationErrors).map((field) => (
					`${field}: ${validationErrors[field].join(', ')}`
				)).join('\n');

				swal({
					title: 'Sorry! Operation failed',
					text: formattedErrors,
					icon: 'error',
					button: 'OK',
				});
			} else if (resp.data.status === 500) {
				swal({
					title: 'Failed',
					text: resp.data.message,
					icon: 'warning',
					button: 'ok',
				})
				// Additional logic or state updates after successful update
			} else if (resp.data.status === 200) {
				swal({
					title: 'Success',
					text: resp.data.message,
					icon: 'success',
					button: 'ok',
				});
			}
		}
		catch (error) {
			console.error("Unexpected error:", error.message);
		};
	};



	return (
		<div>
			<div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Job Application Workflow</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
						<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/vacancies/jobs/`}>
							Home
							<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
						</a>
					</li>
					<li className="text-sm">
						<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/vacancies/show_job/`}>
							Show Job Application
							{/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
						</a>
					</li>
				</ol>
			</div>
			<div className="grid grid-cols-12 xl:gap-6">
				<div className="col-span-12 xl:col-span-8">
					<div className="box">
						<div className="box-body space-y-4">
							<iframe src={documentUrl} width="100%" height="700px" title="Document Preview"></iframe>
						</div>
					</div>
				</div>
				<div className="col-span-12 xl:col-span-4">

					<div className="box">
						<div className="box-header">
							<h5 className="box-title">Workflow Section</h5>
						</div>
						{roles.includes('VI') && (
							<div className="box-body">
								<div className="col-span-12 lg:col-span-6">
									<div className="box">
										<div className="box-header">
											<h5 className="box-title"> Workflow History</h5>
										</div>
										<div className="box-body">
											<div className="hs-accordion-group">
												<div className="hs-accordion active overflow-hidden bg-white border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-1-primary">
													<button
														className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
														aria-controls="hs-accordion-collapse-1-primary" type="button">
														Initiator


														<i className="ti ti-chevron-up hs-accordion-active:hidden hs-accordion-active:text-secondary"></i>
														<svg
															className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
													</button>
													<div id="hs-accordion-collapse-1-primary"
														className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
														aria-labelledby="hs-accordion-heading-1-primary">
														<p className="text-gray-800 dark:text-gray-200 py-4 px-5">
															<em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
														</p>
													</div>
												</div>
												<div className="hs-accordion overflow-hidden bg-white border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-2-primary">
													<button
														className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
														aria-controls="hs-accordion-collapse-1-primary" type="button">
														Reviewer
														<svg
															className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
														<svg
															className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
													</button>
													<div id="hs-accordion-collapse-2-primary"
														className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
														aria-labelledby="hs-accordion-heading-2-primary">
														<p className="text-gray-800 dark:text-gray-200 py-4 px-5">
															<em>This is the third item's accordion body.</em> It is
														</p>
													</div>
												</div>

												<div className="hs-accordion overflow-hidden bg-white border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-3-primary">
													<button
														className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
														aria-controls="hs-accordion-collapse-1-primary" type="button">
														Approval
														<svg
															className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
														<svg
															className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
													</button>
													<div id="hs-accordion-collapse-3-primary"
														className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
														aria-labelledby="hs-accordion-heading-3-primary">
														<p className="text-gray-800 dark:text-gray-200 py-4 px-5">
															<em>This is the third item's accordion body.</em> It
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<form className="space-y-3" onSubmit={handleInitiateSubmit}>
									<label htmlFor="input-label" className="ti-form-label">Comment</label>
									<textarea
										type="text"
										id="input-label"
										name="initiate_comment"
										className="ti-form-input"

										value={formInitiateData.initiate_comment}
										onChange={(e) => handleInitiateInputChange('initiate_comment', e.target.value)}
										placeholder="Write Comment"

									/>

									<div className="grid grid-cols-12 gap-x-6">
										<div className="col-span-6"></div>
										<div className="col-span-6">
											<button type="submit" onClick={handleInitiateSubmit} className="ti-btn ti-btn-success">Initiate</button>
											<button type="submit" className="ti-btn ti-btn-danger">Cancel</button>
										</div>
									</div>
								</form>
							</div>
						)}

						{roles.includes('VR') && (
							<div className="box-body">
								<div className="col-span-12 lg:col-span-6">
									<div className="box">
										<div className="box-header">
											<h5 className="box-title"> Workflow History</h5>
										</div>
										<div className="box-body">
											<div className="hs-accordion-group">
												<div className="hs-accordion active overflow-hidden bg-white border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-1-primary">
													<button
														className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
														aria-controls="hs-accordion-collapse-1-primary" type="button">
														Initiator


														<i className="ti ti-chevron-up hs-accordion-active:hidden hs-accordion-active:text-secondary"></i>
														<svg
															className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
													</button>
													<div id="hs-accordion-collapse-1-primary"
														className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
														aria-labelledby="hs-accordion-heading-1-primary">
														<p className="text-gray-800 dark:text-gray-200 py-4 px-5">
															<em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
														</p>
													</div>
												</div>
												<div className="hs-accordion overflow-hidden bg-white border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-2-primary">
													<button
														className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
														aria-controls="hs-accordion-collapse-1-primary" type="button">
														Reviewer
														<svg
															className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
														<svg
															className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
													</button>
													<div id="hs-accordion-collapse-2-primary"
														className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
														aria-labelledby="hs-accordion-heading-2-primary">
														<p className="text-gray-800 dark:text-gray-200 py-4 px-5">
															<em>This is the third item's accordion body.</em> It is
														</p>
													</div>
												</div>

												<div className="hs-accordion overflow-hidden bg-white border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-3-primary">
													<button
														className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
														aria-controls="hs-accordion-collapse-1-primary" type="button">
														Approval
														<svg
															className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
														<svg
															className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
													</button>
													<div id="hs-accordion-collapse-3-primary"
														className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
														aria-labelledby="hs-accordion-heading-3-primary">
														<p className="text-gray-800 dark:text-gray-200 py-4 px-5">
															<em>This is the third item's accordion body.</em> It
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<form className="space-y-3" onSubmit={handleReviewSubmit}>
									<label htmlFor="input-label"
										className="ti-form-label">Comment</label>
									<textarea
										type="text"
										id="input-label"
										name="initiate_comment"
										className="ti-form-input"

										value={formReviewData.review_comment}
										onChange={(e) => handleReviewInputChange('initiate_comment', e.target.value)}
										placeholder="Write Comment"

									/>
									<div className="grid grid-cols-12 gap-x-6" >
										<div className="col-span-3"> </div>
										<div className="col-span-9">
											<button type="submit" onClick={handleReviewSubmit} className="ti-btn ti-btn-success ">Review</button>
											<button type="submit" className="ti-btn ti-btn-warning ">Reverse</button>
											<button type="submit" className="ti-btn ti-btn-danger ">Cancel</button>
										</div>
									</div>
								</form>
							</div>

						)}


						{roles.includes('VA') && (
							<div className="box-body">
								{/* <div>
                                    <span><b>Ininitor &nbsp;:&nbsp;</b> Initiator  - date</span><br/>
                                    <span><b>Comment &nbsp;:&nbsp;</b>  Comments </span>
                                </div> */}
								<div className="col-span-12 lg:col-span-6">
									<div className="box">
										<div className="box-header">
											<h5 className="box-title"> Workflow History</h5>
										</div>
										<div className="box-body">
											<div className="hs-accordion-group">
												<div className="hs-accordion active overflow-hidden bg-white border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-1-primary">
													<button
														className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
														aria-controls="hs-accordion-collapse-1-primary" type="button">
														Initiator


														<i className="ti ti-chevron-up hs-accordion-active:hidden hs-accordion-active:text-secondary"></i>
														<svg
															className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
													</button>
													<div id="hs-accordion-collapse-1-primary"
														className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
														aria-labelledby="hs-accordion-heading-1-primary">
														<p className="text-gray-800 dark:text-gray-200 py-4 px-5">
															<em>This is the third item's accordion body.</em> It is hidden by default, until the collapse
														</p>
													</div>
												</div>
												<div className="hs-accordion overflow-hidden bg-white border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-2-primary">
													<button
														className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
														aria-controls="hs-accordion-collapse-1-primary" type="button">
														Reviewer
														<svg
															className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
														<svg
															className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
													</button>
													<div id="hs-accordion-collapse-2-primary"
														className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
														aria-labelledby="hs-accordion-heading-2-primary">
														<p className="text-gray-800 dark:text-gray-200 py-4 px-5">
															<em>This is the third item's accordion body.</em> It is
														</p>
													</div>
												</div>

												<div className="hs-accordion overflow-hidden bg-white border -mt-px first:rounded-t-sm last:rounded-b-sm dark:bg-bgdark dark:border-white/10" id="hs-accordion-heading-3-primary">
													<button
														className="hs-accordion-toggle hs-accordion-active:text-secondary hs-accordion-active:bg-secondary/10 group py-4 px-5 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-secondary dark:text-gray-200 dark:hover:text-white/80"
														aria-controls="hs-accordion-collapse-1-primary" type="button">
														Approval
														<svg
															className="hs-accordion-active:hidden hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
														<svg
															className="hs-accordion-active:block hs-accordion-active:text-secondary hs-accordion-active:group-hover:text-secondary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
															width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
																stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
														</svg>
													</button>
													<div id="hs-accordion-collapse-3-primary"
														className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
														aria-labelledby="hs-accordion-heading-3-primary">
														<p className="text-gray-800 dark:text-gray-200 py-4 px-5">
															<em>This is the third item's accordion body.</em> It
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<form className="space-y-3">
									<label htmlFor="input-label"
										className="ti-form-label">Comment</label>
									<textarea type="text" id="input-label" className="ti-form-input" placeholder="Write Comment" />

									<div className="grid grid-cols-12 gap-x-6" >
										<div className="col-span-3"> </div>
										<div className="col-span-9">
											<button type="submit" className="ti-btn ti-btn-success ">Approve</button>
											<button type="submit" className="ti-btn btn-sm ti-btn-warning ">Reverse</button>
											<button type="submit" className="ti-btn btn-sm ti-btn-danger ">Cancel</button>
										</div>
									</div>
								</form>
							</div>

						)}

					</div>

				</div>
			</div>
		</div>
	);

};
;

const mapStateToProps = (state) => ({
	local_varaiable: state
})
export default connect(mapStateToProps, { ThemeChanger })(Workflow);