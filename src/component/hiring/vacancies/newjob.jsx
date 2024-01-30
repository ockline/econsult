import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import {Link}  from "react-router-dom";


const Newjob = () => {
	
	
	

	


	return (
		<div>
           <PageHeader currentpage="New Jobs" activepage="Basic Ui" mainpage="New Jobs" />
		
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-12 lg:col-span-12">
					<div className="box">
						<div className="box-header">
							<h5 className="box-title">Announced Job Vacancies
								<Link className="text-white hover:text-info" to={`${import.meta.env.BASE_URL}hiring/vacancies/add_job/`}>
							<button type="button" className="ti-btn ti-btn-primary float-end">
								<i className="ti ti-plus"></i>
                           Create Job			
								</button></Link>
							</h5>
						</div>
								<div className="box-body">
							<div className="table-bordered rounded-md ti-custom-table-head">
								<div className="py-2 px-3">
									<div className="relative max-w-xs">
										<label htmlFor="hs-table-search2" className="sr-only">Search</label>
										<input type="text" name="hs-table-search2" id="hs-table-search2" className="p-3 ltr:pl-10 rtl:pr-10 ti-form-input" placeholder="Search for items"/>
										<div className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center pointer-events-none ltr:pl-4 rtl:pr-4">
											<svg className="h-3.5 w-3.5 text-gray-400 dark:text-white/70" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
												<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
											</svg>
										</div>
									</div>
								</div>
								<div className="overflow-auto">
									<table className="ti-custom-table ti-custom-table-head">
										<thead className="bg-gray-50 dark:bg-black/20">
											<tr>
												<th scope="col" className="py-2 px-3 ltr:pr-0 rtl:pl-0">
													{/* <div className="flex items-center h-5">
														<input id="hs-table-search-checkbox-all" type="checkbox" className="ti-form-checkbox"/>
														<label htmlFor="hs-table-search-checkbox-all" className="sr-only">Checkbox</label>
													</div> */}
													S/No
												</th>
												<th scope="col" className="">Employer Name</th>
												<th scope="col" className="">Job Title</th>
												<th scope="col" className="">Vacancy Type</th>
												<th scope="col" className="">Vacant Date</th>
												<th scope="col" className="">Deadline Date</th>
												<th scope="col" className="">Action</th>
											</tr>
										</thead>
										<tbody className="">
											<tr>
												<td className="py-3 ltr:pl-4 rtl:pr-4">
													{/* <div className="flex items-center h-5 justify-center">
														<input id="hs-table-search-checkbox-11" type="checkbox" className="ti-form-checkbox"/>
														<label htmlFor="hs-table-search-checkbox-11" className="sr-only">Checkbox</label>
													</div> */}
													1
												</td>
												<td className="font-medium">John Brown</td>
												<td>45</td>
												<td>20-01-2024</td>
												<td>04-02-2024</td>
												<td>New York No</td>
												<td className="text-end font-medium">
													<Link className="text-white hover:text-info" to="#">
													<button
													variant=""
													className="ti-btn ti-btn-success me-1"
													type="button"
													onClick={(e) => handleEditClick(e, contact)}
													><i className="ti ti-eye"></i>
													View
													</button>
													</Link>&nbsp;
													<Link className="text-white hover:text-info" to={`${import.meta.env.BASE_URL}hiring/vacancies/edit_job/1`}>
													<button
													variant=""
													className="ti-btn ti-btn-primary me-1"
													type="button"
													onClick={(e) => handleEditClick(e, contact)}
													><i className="ti ti-edit"></i>
																Edit
													</button>
													</Link>&nbsp;
													<Link className="text-danger hover:text-primary" to="#">
													<button
													variant=""
													className="ti-btn ti-btn-danger me-1"
													type="button"
													onClick={(e) => handleDeleteClick(e, contact.id)}
													>
													Delete
													</button>
													</Link>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="py-1 px-4">
									<nav className="flex items-center space-x-0 rtl:space-x-reverse">
										<Link className="text-gray-400 dark:text-white/70 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md" to="#">
											<span aria-hidden="true">«</span>
											<span className="sr-only">Previous</span>
										</Link>
										<Link className="w-10 h-10 bg-primary text-white p-4 inline-flex items-center text-sm font-medium rounded-full" to="#" aria-current="page">1</Link>
										<Link className="w-10 h-10 text-gray-400 dark:text-white/70 hover:text-primary p-4 inline-flex items-center text-sm font-medium rounded-full" to="#">2</Link>
										<Link className="w-10 h-10 text-gray-400 dark:text-white/70 hover:text-primary p-4 inline-flex items-center text-sm font-medium rounded-full" to="#">3</Link>
										<Link className="text-gray-400 dark:text-white/70 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md" to="#">
											<span className="sr-only">Next</span>
											<span aria-hidden="true">»</span>
										</Link>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Newjob;
