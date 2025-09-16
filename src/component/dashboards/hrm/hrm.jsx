import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import ALLImages from "../../../common/imagesData";
import { NormalsOverviewHRM } from "../../../common/chartData";
import axios from 'axios';

const Hrm = () => {
	
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
	
	
	//block for retrive staticstics 
		//count contracted employees  from differnt employern employed
	const [employedData, setEmployedCount] = useState([])
	const [activeEmployer, setActiveEmployer] = useState()
	const [unactiveEmployer, setUnActiveEmployer] = useState()
	const [allEmployer, setAllEmployerCount] = useState()
	const [activeEmployed, setActiveEmployed] = useState()
	
	console.log('ngapi',activeEmployer);
    useEffect(() => {
        axios.get(`${apiBaseUrl}/home/excecutive/employee_count`)
            .then((res) => {

				setEmployedCount(res.data.employed_count['employed']); // Assuming "education_history" 
				setActiveEmployer(res.data.employed_count['active_client']);
				setUnActiveEmployer(res.data.employed_count['unactive_client']);
				setAllEmployerCount(res.data.employed_count['all_client']);
				setActiveEmployed(res.data.employed_count['active_employee']);
                // console.log("dataa", ' ', res.data.dependant_detail);
            })
            .catch((error) => {
                console.error('Error fetching contracted data:', error);
            });
    }, []);
	
	const [employeeData, setEmployeeDetails] = useState([])
    useEffect(() => {
        axios.get(`${apiBaseUrl}/home/normal/show_employees`)
            .then((res) => {

                setEmployeeDetails(res.data.employees); // Assuming "education_history" is correct
                // console.log("dataa", ' ', res.data.dependant_detail);
            })
            .catch((error) => {
                console.error('Error fetching practical data:', error);
            });
    }, []);
	
	
	
	
	
	
	
	
	return (
		<div>
			<PageHeader currentpage="Executive Dashboard" activepage="Home" mainpage="Executive Dashboard" />

			<div className="grid grid-cols-12 gap-x-5">
				<div className="col-span-12 sm:col-span-6 xl:col-span-3">
					<div className="box">
						<div className="box-body">
							<div className="flex">
								<div className="ltr:mr-3 rtl:ml-3">
									<div className="avatar rounded-sm text-primary p-2.5 bg-primary/20 "><i
										className="ti ti-users text-2xl leading-none"></i></div>
								</div>
								<div className="flex-1">
									<p className="text-sm">Total Employees</p>
									<div className="flex justify-between items-center">
										<h5 className="mb-0 text-2xl font-semibold text-gray-800 dark:text-white">{ employedData }</h5>
										<span className="text-success badge bg-success/20 rounded-sm p-1"><i
											className="ti ti-trending-up leading-none"></i> +1.03%</span>
									</div>
									<span className="text-xs text-gray-500 dark:text-white/70">This Month</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-12 sm:col-span-6 xl:col-span-3">
					<div className="box">
						<div className="box-body">
							<div className="flex">
								<div className="ltr:mr-3 rtl:ml-3">
									<div className="avatar rounded-sm text-primary p-2.5 bg-primary/20 "><i
										className="ti ti-users-minus text-2xl leading-none"></i></div>
								</div>
								<div className="flex-1">
									<p className="text-sm">Present Employees</p>
									<div className="flex justify-between items-center">
										<h5 className="mb-0 text-2xl font-semibold text-gray-800 dark:text-white">{activeEmployed}</h5>
										<span className="text-success badge bg-success/20 rounded-sm p-1"><i
											className="ti ti-trending-up leading-none"></i> +0.36%</span>
									</div>
									<span className=" text-gray-500 dark:text-white/70 text-xs">This Month</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-12 sm:col-span-6 xl:col-span-3">
					<div className="box">
						<div className="box-body">
							<div className="flex">
								<div className="ltr:mr-3 rtl:ml-3">
									<div className="avatar rounded-sm text-primary p-2.5 bg-primary/20 "><i
										className="ti ti-briefcase text-2xl leading-none"></i></div>
								</div>
								<div className="flex-1">
									<p className="text-sm">Employees In Leave</p>
									<div className="flex justify-between items-center">
										<h5 className="mb-0 text-2xl font-semibold text-gray-800 dark:text-white">0</h5>
										<span className="text-danger badge bg-danger/20 rounded-sm p-1"><i
											className="ti ti-trending-down leading-none"></i> -1.28%</span>
									</div>
									<span className=" text-gray-500 dark:text-white/70 text-xs">This Month</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-12 sm:col-span-6 xl:col-span-3">
					<div className="box">
						<div className="box-body">
							<div className="flex">
								<div className="ltr:mr-3 rtl:ml-3">
									<div className="avatar rounded-sm text-primary p-2.5 bg-primary/20 "><i
										className="ti ti-chart-bar text-2xl leading-none"></i></div>
								</div>
								<div className="flex-1">
									<p className="text-sm">Absent employees</p>
									<div className="flex justify-between items-center">
										<h5 className="mb-0 text-2xl font-semibold text-gray-800 dark:text-white">0</h5>
										<span className="text-success badge bg-success/20 rounded-sm p-1"><i
											className="ti ti-trending-down leading-none"></i>+4.25%</span>
									</div>
									<span className=" text-gray-500 dark:text-white/70 text-xs">This Month</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-x-6">
				<div className="col-span-12">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Staff overview Details</h5>
								<div className=" block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" className="ti-btn m-0 rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                      View All</button>
								</div>
							</div>
						</div>
						<div className="box-body">
							<div className="table-bordered rounded-sm ti-custom-table-head overflow-auto">
								<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr className="">
											<th scope="col" className="dark:text-white/80">S.no</th>
											<th scope="col" className="dark:text-white/80">Employee Details</th>
											<th scope="col" className="dark:text-white/80">Department</th>
											<th scope="col" className="dark:text-white/80">Designation</th>
											<th scope="col" className="dark:text-white/80">Assigned file</th>
											<th scope="col" className="dark:text-white/80">Aging</th>
											
										</tr>
									</thead>
									<tbody className="">
										<tr>
											<td>1</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full min-w-[200px]">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Robert Steeve</span>
														
													</div>
												</div>
											</td>
											<td><span>Front End</span></td>
											<td><span>UI Designer</span></td>
											<td><span>12</span></td>
											<td><span>2</span></td>
											
											
																				</tr>
										<tr>
											<td className="tx-center">2</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full min-w-[200px]">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Steeve Robert</span>
														
													</div>
												</div>
											</td>
											<td><span>Front End</span></td>
											<td><span>UI Developer</span></td>
											<td><span>15</span></td>
											<td><span>0</span></td>
											
																				</tr>
										<tr>
											<td className="tx-center">3</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full min-w-[200px]">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Mary Rose</span>
														
													</div>
												</div>
											</td>
											<td><span>Back End</span></td>
											<td><span>PHP Developer</span></td>
											<td><span>22</span></td>
											<td><span>1</span></td>
											
																				</tr>
										<tr>
											<td className="tx-center">4</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full min-w-[200px]">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Stella Rose</span>
														
													</div>
												</div>
											</td>
											<td><span>Android</span></td>
											<td><span>Ionic Developer</span></td>
											<td><span>21</span></td>
											<td><span>0</span></td>
											
																				</tr>
										<tr>
											<td className="tx-center">5</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full min-w-[200px]">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">John Abraham</span>
														
													</div>
												</div>
											</td>
											<td><span>Front End</span></td>
											<td><span>UI Designer</span></td>
											<td><span>12</span></td>
											<td><span>3</span></td>
											
											
										</tr>
										<tr>
											<td className="tx-center">6</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full min-w-[200px]">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Richard Bose</span>
														
													</div>
												</div>
											</td>
											<td><span>Front End</span></td>
											<td><span>UI Developer</span></td>
											<td><span>12</span></td>
											<td><span>4</span></td>
											
											
										</tr>
										<tr>
											<td className="tx-center">7</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full min-w-[200px]">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Abagnale Mal</span>
														
													</div>
												</div>
											</td>
											<td><span>Back End</span></td>
											<td><span>Java Developer</span></td>
											<td><span>25</span></td>
											<td><span>0</span></td>
											
											
										</tr>
										
									</tbody>
								</table>
							</div>
						</div>
						<div className="box-footer">
							<div className="sm:flex items-center">
								<div className="">
                      showing 5 Entries <i className="ri-arrow-right-line ml-2 font-semibold"></i>
								</div>
								<div className="ltr:ml-auto rtl:mr-auto">
									<nav className="flex justify-center items-center space-x-2 rtl:space-x-reverse">
										<Link className="text-gray-500 hover:text-primary e py-1 px-2 leading-none inline-flex items-center gap-2 rounded-sm" to="#">
											<span aria-hidden="true">Prev</span>
											<span className="sr-only">Previous</span>
										</Link>
										<Link className="bg-primary text-white py-1 px-2 leading-none inline-flex items-center text-sm font-medium rounded-sm" to="#" aria-current="page">1</Link>
										<Link className="text-gray-500 hover:text-primary e py-1 px-2 leading-none inline-flex items-center text-sm font-medium rounded-sm" to="#">2</Link>
										<Link className="text-gray-500 hover:text-primary e py-1 px-2 leading-none inline-flex items-center text-sm font-medium rounded-sm" to="#">3</Link>
										<Link className="text-gray-500 hover:text-primary e py-1 px-2 leading-none inline-flex items-center gap-2 rounded-sm" to="#">
											<span className="sr-only">Next</span>
											<span aria-hidden="true">Next</span>
										</Link>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-12 gap-x-5">
				<div className="col-span-12 xl:col-span-12">
					<div className="box">
						<div className="box-header">
							<div className="sm:flex justify-between">
								<h5 className="box-title my-auto">Normals Overview</h5>
								<div className="inline-flex rounded-md shadow-sm">
									<button type="button" className="ti-btn-group text-xs !border-0 py-2 px-3 ti-btn-soft-primary">1D</button>
									<button type="button" className="ti-btn-group text-xs !border-0 py-2 px-3 ti-btn-soft-primary">1W</button>
									<button type="button" className="ti-btn-group text-xs !border-0 py-2 px-3 ti-btn-soft-primary">1M</button>
									<button type="button" className="ti-btn-group text-xs !border-0 py-2 px-3 ti-btn-soft-primary">3M</button>
									<button type="button" className="ti-btn-group text-xs !border-0 py-2 px-3 ti-btn-soft-primary">6M</button>
									<button type="button" className="ti-btn-group text-xs !border-0 py-2 px-3 ti-btn-primary">1Y</button>
								</div>
							</div>
						</div>
						<div className="box-body">
							<NormalsOverviewHRM/>
						</div>
					</div>
				</div>	
			</div>

			<div className="grid grid-cols-12 gap-x-5">
				<div className="col-span-12">
					<div className="box">
						<div className="box-body p-0">
							<div className="grid grid-cols-12">
								<div className="col-span-12  sm:col-span-6 xl:col-span-3 sm:border-b-0 ltr:border-r rtl:border-l border-b border-gray-200 dark:border-white/10">
									<div className="flex flex-wrap p-6 items-center">
										<div className="ltr:mr-3 rtl:ml-3 leading-none">
											<span
												className="avatar inline-flex justify-center items-center rounded-full bg-primary/20 text-primary shadow-sm">
												<i className="ti ti-package text-lg"></i>
											</span>
										</div>
										<div className="flex-1 font-semibold">
											<div className="flex justify-between items-center mb-2">
												<p className="mb-0 text-gray-800 dark:text-white">Active Clients</p>
												<span>{activeEmployer}/{allEmployer}</span>
											</div>
											<div className="ti-main-progress bg-gray-200 dark:bg-black/20 mb-2">
												<div className="ti-main-progress-bar bg-success text-xs text-white text-center" role="progressbar" style={{width: "55%"}}
													aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
											<Link to="#" className="text-gray-500 dark:text-white/70 text-xs flex">Full
                          Details<i className="ri-arrow-right-s-line ltr:ml-2 rtl:mr-2"></i></Link>
										</div>
									</div>
								</div>
								<div className="col-span-12  sm:col-span-6 xl:col-span-3 sm:border-b-0 ltr:border-r rtl:border-l border-b border-gray-200 dark:border-white/10">
									<div className="flex flex-wrap p-6 items-center">
										<div className="ltr:mr-3 rtl:ml-3 leading-none">
											<span
												className="avatar inline-flex justify-center items-center rounded-full bg-secondary/20 text-secondary shadow-sm">
												<i className="ti ti-ticket text-lg"></i>
											</span>
										</div>
										<div className="flex-1 font-semibold">
											<div className="flex justify-between items-center mb-2">
												<p className="mb-0 text-gray-800 dark:text-white">Un Active Clients</p>
												<span>{unactiveEmployer}/{allEmployer}</span>
											</div>
											<div className="ti-main-progress bg-gray-200 dark:bg-black/20 mb-2">
												<div className="ti-main-progress-bar bg-secondary text-xs text-white text-center" role="progressbar" 
													style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
											<Link to="#" className="text-gray-500 dark:text-white/70 text-xs flex">Full
                          Details<i className="ri-arrow-right-s-line ltr:ml-2 rtl:mr-2"></i></Link>
										</div>
									</div>
								</div>
								<div className="col-span-12  sm:col-span-6 xl:col-span-3 sm:border-b-0 ltr:border-r rtl:border-l border-b border-gray-200 dark:border-white/10">
									<div className="flex flex-wrap p-6 items-center">
										<div className="ltr:mr-3 rtl:ml-3 leading-none">
											<span
												className="avatar inline-flex justify-center items-center rounded-full bg-danger/20 text-danger shadow-sm">
												<i className="ti ti-file-invoice text-lg"></i>
											</span>
										</div>
										<div className="flex-1 font-semibold">
											<div className="flex justify-between items-center mb-2">
												<p className="mb-0 text-gray-800 dark:text-white">Ongoing Project</p>
												<span>1/2</span>
											</div>
											<div className="ti-main-progress bg-gray-200 dark:bg-black/20 mb-2">
												<div className="ti-main-progress-bar bg-warning text-xs text-white text-center" style={{width: "75%"}} role="progressbar" 
													aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
											<Link to="#" className="text-gray-500 dark:text-white/70 text-xs flex">Full
                          Details<i className="ri-arrow-right-s-line ltr:ml-2 rtl:mr-2"></i></Link>
										</div>
									</div>
								</div>
								<div className="col-span-12  sm:col-span-6 xl:col-span-3">
									<div className="flex flex-wrap p-6 items-center">
										<div className="ltr:mr-3 rtl:ml-3 leading-none">
											<span
												className="avatar inline-flex justify-center items-center rounded-full bg-info/20 text-info shadow-sm">
												<i className="ti ti-vocabulary text-lg"></i>
											</span>
										</div>
										<div className="flex-1 font-semibold">
											<div className="flex justify-between items-center mb-2">
												<p className="mb-0 text-gray-800 dark:text-white">Completed Project</p>
												<span>1/2</span>
											</div>
											<div className="ti-main-progress bg-gray-200 dark:bg-black/20 mb-2">
												<div className="ti-main-progress-bar bg-success text-xs text-white text-center" style={{width: "55%"}} role="progressbar" 
													aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
											<Link to="#" className="text-gray-500 dark:text-white/70 text-xs flex">Full
                          Details<i className="ri-arrow-right-s-line ltr:ml-2 rtl:mr-2"></i></Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* block for Leave history */}
			{/* <div className="grid grid-cols-12 gap-x-5">
				<div className="col-span-12 lg:col-span-5">
					<div className="box">
						<div className="box-header flex justify-between">
							<div className="box-title my-auto">
                    Attendance
							</div>
							<div className=" block ltr:ml-auto rtl:mr-auto my-auto">
								<button type="button" className="ti-btn m-0 rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                      View All</button>
							</div>
						</div>
						<div className="box-body p-0 attendance-table">
							<div className="overflow-auto">
								<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
									<thead>
										<tr>
											<th scope="col">S.no</th>
											<th scope="col">Employee</th>
											<th scope="col">Status</th>
											<th scope="col">Checkin</th>
											<th scope="col">Checkout</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr className="">
											<td>1</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Alice Rex</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">Tester</span>
													</div>
												</div>
											</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-success/10 text-success/80">Present</span></td>
											<td>09:30 Am</td>
											<td>06:30 Pm</td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#" className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-phone"></i>
														<span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700" role="tooltip">
                                    Call
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>2</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Rehna Eni</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">UI/UX Designer
														</span>
													</div>
												</div>
											</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-success/10 text-success/80">Present</span></td>
											<td>09:45 Am</td>
											<td>06:50 Pm</td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#" className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-phone"></i>
														<span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700" role="tooltip">
                                    Call
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>3</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">
                                    Bob Upt</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">Backend
														</span>
													</div>
												</div>
											</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-danger/10 text-danger/80">Absent</span></td>
											<td>00:00 Am</td>
											<td>00:00 Pm</td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#" className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-phone"></i>
														<span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700" role="tooltip">
                                    Call
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>4</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Charlie Davieson</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">Team Lead
														</span>
													</div>
												</div>
											</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-success/10 text-success/80">Present</span></td>
											<td>10:00 Am</td>
											<td>07:00 Pm</td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#" className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-phone"></i>
														<span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700" role="tooltip">
                                    Call
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>5</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Suzika Stallone</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">UI Designer
														</span>
													</div>
												</div>
											</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-success/10 text-success/80">Present</span></td>
											<td>09:30 Am</td>
											<td>05:15 Pm</td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#" className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-phone"></i>
														<span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700" role="tooltip">
                                    Call
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>6</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Mc Greggor</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">Java Developer
														</span>
													</div>
												</div>
											</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-danger/10 text-danger/80">Absent</span></td>
											<td>00:00 Am</td>
											<td>00:00 Pm</td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#" className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-phone"></i>
														<span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700" role="tooltip">
                                    Call
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-7">
					<div className="box">
						<div className="box-header flex justify-between">
							<div className="box-title my-auto">
                    Leave Request
							</div>
							<div className=" block ltr:ml-auto rtl:mr-auto my-auto">
								<button type="button" className="ti-btn m-0 rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                      View All</button>
							</div>
						</div>
						<div className="box-body p-0">
							<div className="overflow-auto">
								<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
									<thead>
										<tr>
											<th scope="col">Employee</th>
											<th scope="col">Type</th>
											<th scope="col">From</th>
											<th scope="col">To</th>
											<th scope="col">Status</th>
											<th scope="col">Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr className="">
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Socrates Itumay</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">Team Lead</span>
													</div>
												</div>
											</td>
											<td>Sick Leave</td>
											<td>05-04-2023</td>
											<td>08-04-2023</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-success/10 text-success">Approved</span></td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#"
														className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-eye"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
                                    View
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Samantha Paul</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">Sr.UI Developer</span>
													</div>
												</div>
											</td>
											<td>Casual Leave</td>
											<td>20-04-2023</td>
											<td>24-04-2023</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-warning/10 text-warning">Pending</span></td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#"
														className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-eye"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
                                    View
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Gray Noal</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">Java Developer</span>
													</div>
												</div>
											</td>
											<td>Paternity Leave</td>
											<td>18-04-2023</td>
											<td>24-04-2023</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-success/10 text-success">Approved</span></td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#"
														className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-eye"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
                                    View
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Gray Noal</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">React Developer</span>
													</div>
												</div>
											</td>
											<td>Personal Leave</td>
											<td>05-04-2023</td>
											<td>06-04-2023</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-danger/10 text-danger">Rejected</span></td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#"
														className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-eye"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
                                    View
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Emiley Jackson</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">Full Stack Developer</span>
													</div>
												</div>
											</td>
											<td>Maternity Leave</td>
											<td>05-04-2023</td>
											<td>06-06-2023</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-success/10 text-success">Approved</span></td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#"
														className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-eye"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
                                    View
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
										<tr className="">
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 max-w-[180px] truncate">Pope Johnson</span>
														<span className="block text-xs text-gray-400 dark:text-white/80 !font-normal">Jr.Java Developer</span>
													</div>
												</div>
											</td>
											<td>Gifted Leave</td>
											<td>06-04-2023</td>
											<td>20-04-2023</td>
											<td><span className="whitespace-nowrap inline-block py-1 px-3 rounded-sm text-xs font-medium bg-warning/10 text-warning">Pending</span></td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#"
														className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-eye"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
                                    View
														</span>
													</Link>
												</div>
												
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div> */}

			
		</div>
	);
};
export default Hrm;
