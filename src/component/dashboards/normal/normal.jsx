import React, { useEffect, useState} from "react";
import { NormalsOverView, NormalsValue, SocialVisitor } from "../../../common/chartData";
import ALLImages from "../../../common/imagesData";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { connect } from "react-redux"
import { Link } from 'react-router-dom';
import axios from 'axios';

const Normal = () => {
	
	  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
	
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
			<PageHeader currentpage="Dashboard" activepage="Home" mainpage="Dashboard"/>
			
			{/* monitoring folder will handle all pendings and assigned workflo */}
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
												<p className="mb-0 text-gray-800 dark:text-white">Total Active </p>
												<span>200</span>
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
												<p className="mb-0 text-gray-800 dark:text-white">Attended Active </p>
												<span>20/200</span>
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
												<p className="mb-0 text-gray-800 dark:text-white">Onprogress Activity</p>
												<span>30/200</span>
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
												<p className="mb-0 text-gray-800 dark:text-white">UnAttended Activities</p>
												<span>150/200</span>
											</div>
											<div className="ti-main-progress bg-gray-200 dark:bg-black/20 mb-2">
												<div className="ti-main-progress-bar bg-danger text-xs text-white text-center" style={{width: "55%"}} role="progressbar" 
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
			<div className="grid grid-cols-12 gap-x-6">
				<div className="col-span-12">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Employee List</h5>
								<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">View All <i className="ti ti-chevron-down"></i></button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" to="#">Download</Link>
										<Link className="ti-dropdown-item" to="#">Import</Link>
										<Link className="ti-dropdown-item" to="#">Export</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="box-body">
							<div className="table-bordered rounded-sm ti-custom-table-head overflow-auto">
								<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr className="">
											<th scope="col" className="dark:text-white/80">S/No</th>
											<th scope="col" className="dark:text-white/80">Membership</th>
											<th scope="col" className="dark:text-white/80">Employees</th>
											<th scope="col" className="dark:text-white/80 ">Job </th>
											<th scope="col" className="dark:text-white/80">Employed</th>
											{/* <th scope="col" className="dark:text-white/80">Birth</th> */}
											<th scope="col" className="dark:text-white/80">Email </th>
												<th scope="col" className="dark:text-white/80">Phone</th>
											<th scope="col" className="dark:text-white/80">Status</th>
									    	<th scope="col" className="dark:text-white/80">Action</th>
										</tr>
									</thead>
									
										 <tbody>
                                                {Array.isArray(employeeData) && employeeData.map((employee, index) => (

                                                    <tr key={index}>
														<td>{index + 1}</td>
														<td colSpan={1} className="">{employee.employee_id}</td>   
														<td colSpan={1} className="">{employee.employee_name}</td>
														<td colSpan={1} className="">{employee.job}</td>
                                                        <td colSpan={1} >{employee.employement_date}</td>
                                                        {/* <td colSpan={1} >{employee.birth_date}</td> */}
														<td colSpan={1} >{employee.email}</td>
														<td colSpan={1} >{employee.phone}</td>
														<td>
														   <Link
                                                    aria-label="anchor"
                                                    to="#"
                                                    className="w-13 h-6 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
                                                > Active
                                                </Link>
														</td>
														<td className="text-end font-medium">
                                                {/* Adjust the links according to your routes and logic */}
                                                <Link
                                                    aria-label="anchor"
                                                    to={`${import.meta.env.BASE_URL}employees/applications/show_application/` + employee.id}
                                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
                                                > <i className="ti ti-eye"></i>
                                                </Link>
                                                {/* <Link
                                                    aria-label="anchor"
                                                    to={`${import.meta.env.BASE_URL}employees/applications/edit_application/` + employee.id}
                                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
                                                > <i className="ti ti-pencil"></i>
                                                </Link> */}

                                                <button
                                                    aria-label="anchor"
                                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
                                                    onClick={() => {
                                                        if (employee.stage === 1) {
                                                            // Show custom toast if employee.stage is 1
                                                            handleCustomToast();
                                                        } else {
                                                            // Navigate to the edit link
                                                            navigate(`${import.meta.env.BASE_URL}employees/applications/edit_application/` + employee.id);
                                                        }
                                                    }}
                                                >
                                                    <i className="ti ti-pencil"></i>
                                                </button>


                                            </td>
														
                                                    </tr>
                                                ))}
                                            </tbody>
										
									
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};



 export default Normal
