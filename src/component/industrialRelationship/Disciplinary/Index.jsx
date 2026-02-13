import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "../../../redux/Action";
// import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import axios from "axios";
 import Swal from "sweetalert2";
import TableLoader from "../../../common/TableLoader";
import AppealRegister from "./Modals/Appeal/AppealRegister";
import AppealInvitationModal from "./Modals/Appeal/AppealInvitationModal";
import AppealHearingModal from "./Modals/Appeal/AppealHearingModal";
import DisciplinaryInviatatioModal from "./Modals/Hearing/DisciplinaryInvitationModal"

const Index = () => {
	
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	let navigate = useNavigate();
	const token = sessionStorage.getItem('token');
	const [disciplinaries, setDisciplinaryDetails] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showAppealModal, setShowAppealModal] = useState(false);
	const [showDisciplinaryInvitationModal, setShowDisciplinaryInvitationModal] = useState(false);
	const [showAppealInvitationModal, setShowAppealInviatationModal] = useState(false);
	const [showAppealHearingModal, setShowAppealHearingModal] = useState(false);

 useEffect(() => {
    const fetchDisciplinaryDetails = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${apiBaseUrl}/industrial_relationship/disciplinary/retrieve_all_disciplinary`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setDisciplinaryDetails(res.data.disciplinary);
      } catch (error) {
        console.error('Failed to fetch disciplinary data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisciplinaryDetails();
  }, []);
	
	

function Style1() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#5e76a6',
   

		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Activated!',
				'Your employer has been Activated.',
				'success'
			  )
			}
		  })
	 }

    return (
        <div>
        			
		<div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Industrial Relashionship Management</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
						Home
						<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
					</a>
					</li>
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employers/registrations/registrations`}>
						Industrial Relashionship Management
						{/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
					</a>
					</li>
				</ol>
				</div>
            <div className= "col-span-12 md:col-span-6 xxl:!col-span-4">
                      <div className= "box">
                          <div className= "box-header">
                              <h5 className= "box-title">Industrial Relashionship Management</h5>
                          </div>
                          <div className= "box-body">
                            <div className= "border-b-0 border-gray-200 dark:border-white/10">
                              <nav className= "flex space-x-2 rtl:space-x-reverse" aria-label="Tabs">
                                <button type="button" className= "hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-primary dark:hs-tab-active:bg-transparent dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-primary -mb-px py-2 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300 active" id="hs-tab-js-behavior-item-1" data-hs-tab="#hs-tab-js-behavior-1" aria-controls="hs-tab-js-behavior-1">
                                  Disciplinary Case
								</button>
								<button type="button" className= "hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-primary dark:hs-tab-active:bg-transparent dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-primary -mb-px py-2 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="hs-tab-js-behavior-item-2" data-hs-tab="#hs-tab-js-behavior-2" aria-controls="hs-tab-js-behavior-2">
                                  Invitation Appeal Hearing
								</button>
								<button type="button" className= "hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-primary dark:hs-tab-active:bg-transparent dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-primary -mb-px py-2 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="hs-tab-js-behavior-item-2" data-hs-tab="#hs-tab-js-behavior-2" aria-controls="hs-tab-js-behavior-2">
                                  Appeal Committee Hearing
								</button>
                                <button type="button" className= "hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-primary dark:hs-tab-active:bg-transparent dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-primary -mb-px py-2 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="hs-tab-js-behavior-item-2" data-hs-tab="#hs-tab-js-behavior-2" aria-controls="hs-tab-js-behavior-2">
                                  Invitation Disciplinary Hearing
								</button>
								 <button type="button" className= "hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-primary dark:hs-tab-active:bg-transparent dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-primary -mb-px py-2 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="hs-tab-js-behavior-item-3" data-hs-tab="#hs-tab-js-behavior-3" aria-controls="hs-tab-js-behavior-3">
                                  Disciplinary Committee Hearing
                                </button>
                                <button type="button" className= "hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-primary dark:hs-tab-active:bg-transparent dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-primary -mb-px py-2 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="hs-tab-js-behavior-item-4" data-hs-tab="#hs-tab-js-behavior-4" aria-controls="hs-tab-js-behavior-4">
                                 Appeal Invitation Re-Hearing
								</button>
								<button type="button" className= "hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-primary dark:hs-tab-active:bg-transparent dark:hs-tab-active:border-b-white/10 dark:hs-tab-active:text-primary -mb-px py-2 px-3 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300" id="hs-tab-js-behavior-item-4" data-hs-tab="#hs-tab-js-behavior-4" aria-controls="hs-tab-js-behavior-4">
                                 Appeal Committee Re-Hearing
                                </button>
                              </nav>
                            </div>

                            <div className= "">
                              <div id="hs-tab-js-behavior-1" role="tabpanel" aria-labelledby="hs-tab-js-behavior-item-1">
                               <div className="grid grid-cols-12 gap-x-6">
									<div className="col-span-12">
										<div className="box">
											<div className="box-header">
												<div className="flex">
													<h5 className="box-title my-auto">Employees Disciplinary Cases</h5>
													<div className="space-y-2">
														<button
														type="button"
														onClick={() => setShowAppealModal(true)}
														className="ti-btn ti-btn-primary"
														>
														<i className="ti ti-user-plus w-3.5 h-3.5"></i> Appeal
														</button>
														<button
														type="button"
														onClick={() => setShowDisciplinaryInvitationModal(true)}
														className="ti-btn ti-btn-secondary"
														>
														<i className="ti ti-user-plus w-3.5 h-3.5"></i> Create Inviatation
														</button>
														<AppealRegister
															isOpen={showAppealModal}
															onClose={() => setShowAppealModal(false)} 
														/>
														<DisciplinaryInviatatioModal
															isOpen={showDisciplinaryInvitationModal}
															onClose={() => setShowDisciplinaryInvitationModal(false)} 
														/>
													</div>
													</div>
											</div>
											<div className="box-body">
												<div className="table-bordered rounded-sm ti-custom-table-head overflow-auto">									
													<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
														<thead className="bg-gray-50 dark:bg-black/20">
															<tr className="">
																<th scope="col" className="dark:text-white/80">S/no</th>
																<th scope="col" className="dark:text-white/80">EmployeeId</th>
																<th scope="col" className="dark:text-white/80">Fullname</th>
																<th scope="col" className="dark:text-white/80 min-w-[300px]">Employer</th>
																<th scope="col" className="dark:text-white/80">Case Decision</th>
																<th scope="col" className="dark:text-white/80">Initiated Date</th>
																<th scope="col" className="dark:text-white/80">Occurance</th>
																{/* 
																<th scope="col" className="dark:text-white/80">Balance</th> */}
																<th scope="col" className="dark:text-white/80">Status</th>
																<th scope="col" className="dark:text-white/80">Action</th>
															</tr>
														</thead>
														<tbody className="">
															{isLoading ? (
																<TableLoader colSpan={9} />
															) : (
																disciplinaries?.map((disciplinary, index) => (
														// <div key={index}></div>
															<tr key={index} className="">
																		<td>{ index + 1}</td>
																<td>
																	<div className="flex space-x-3 rtl:space-x-reverse w-full">
																		<div className="block w-full my-auto">
																			<span
																				className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{disciplinary.employee_id}</span>
																				</div>
																	</div>
																		</td>
																		<td>{disciplinary.employee_name}</td>
																<td className=" font-semibold text-base">{disciplinary.employer}</td>
																<td>
																	<div className="flex space-x-3 rtl:space-x-reverse text-start">
																		
																		<div className="block my-auto">
																			<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{disciplinary.case_decision}</p>
																		</div>
																	</div>
																		</td>
																		<td>{disciplinary.initiated_date}</td>
																		<td>{disciplinary.disciplinary_number}</td>
																	<td>
																	{disciplinary.status && (
																	<span
																	className={`truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium 
																		${
																		disciplinary.status === 'Initiated' ? 'bg-orange-500/20 text-orange-600'
																		: disciplinary.status === 'Reviewed' ? 'bg-blue-500/20 text-blue-600'
																		: disciplinary.status === 'Approved' ? 'bg-green-500/20 text-green-600'
																		: 'bg-yellow-400/20 text-yellow-600'
																		}`
																	}
																	>
																	{disciplinary.status}
																	</span>
																)}
																</td>
										
																<td className="font-medium space-x-2 rtl:space-x-reverse">
																	<div className="hs-tooltip ti-main-tooltip">
																		<Link to={`${import.meta.env.BASE_URL}industrials/disciplinaries/show_disciplinary/${disciplinary.id}`}
																			className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
																			<i className="ti ti-eye"></i>
																			<span
																				className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
																				role="tooltip">
													View
																			</span>
																				</Link>
																				</div>
																				&nbsp;&nbsp;
																
																			<button 
																		aria-label="anchor"
																		className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
																		onClick={() => {
																	navigate(`${import.meta.env.BASE_URL}industrials/disciplinaries/edit_disciplinary/${disciplinary.id}`);   
																		}}
																	>
																		<i className="ti ti-pencil"></i>
																			</button>
																			
																			
																			
																			
																				&nbsp;&nbsp;
																	
																			
																{disciplinary.status === 'Active' ? (
															<button
																type="button"
																className="ti-btn ti-btn-success show-example-btn"
																aria-label="Deactivate! Example: End of contract"
																id="ajax-btn"
																onClick={(e) => Ajaxcalling(e, disciplinary.id)}
															>
																Initiate
															</button>
															) : (
															<></>
															)}
																</td>
															</tr>
															)
															)
															)}
															
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
								</div>
                              <div id="hs-tab-js-behavior-2" className= "hidden" role="tabpanel" aria-labelledby="hs-tab-js-behavior-item-2">
                                	<div className="col-span-12">
									<div className="box">
										<div className="box-header">
											<div className="flex">
												<h5 className="box-title my-auto">Appeal Invitation Meeting</h5>
												<div className="space-y-2">
																		<button
																		type="button"
																		onClick={() => setShowAppealModal(true)}
																		className="ti-btn ti-btn-primary"
																		>
																		<i className="ti ti-user-plus w-3.5 h-3.5"></i> Create Invitation
																		</button>
																		<AppealInvitationModal
																			isOpen={showAppealInvitationModal}
																			onClose={() => setShowAppealInviatationModal(false)} 
																		/>
																	</div>
													
											</div>
										</div>
										<div className="box-body">
											<div className="table-bordered rounded-sm ti-custom-table-head overflow-auto">
												<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
													<thead className="bg-gray-50 dark:bg-black/20">
														<tr className="">
															<th scope="col" className="dark:text-white/80">S/no</th>
															<th scope="col" className="dark:text-white/80">EmployeeId</th>
															<th scope="col" className="dark:text-white/80">Fullname</th>
															<th scope="col" className="dark:text-white/80 min-w-[300px]">Employer</th>
															<th scope="col" className="dark:text-white/80">Type</th>
															<th scope="col" className="dark:text-white/80">Investigation</th>
															<th scope="col" className="dark:text-white/80">Status</th>
															<th scope="col" className="dark:text-white/80">Action</th>
														</tr>
													</thead>
													<tbody className="">
														{isLoading ? (
															<TableLoader colSpan={8} />
														) : (
															disciplinaries?.map((capacity, index) => (
													// <div key={index}></div>
														<tr key={index} className="">
																	<td>{ index + 1}</td>
															<td>
															<div className="flex space-x-3 rtl:space-x-reverse w-full">
																<div className="block w-full my-auto">
																<span
																	className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{capacity.employee_id}</span>
																</div>
																</div>
																</td>
																<td>{capacity.employee_name}</td>
															<td className="font-semibold text-base">{capacity.employer}</td>
															<td>
																<div className="flex space-x-3 rtl:space-x-reverse text-start">
																	
																	<div className="block my-auto">
																		<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{capacity.capacity_type}</p>
																	</div>
																</div>
																	</td>
																	<td>{capacity.investigation_date}</td>
																	<td>
																		{ capacity.status === 1
																		? (
																<span
																className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80">Submitted</span>)													
																: (<span
																			className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-danger/15 text-info/80">{capacity.status}</span>
																)}
															</td>
									
															<td className="font-medium space-x-2 rtl:space-x-reverse">
																<div className="hs-tooltip ti-main-tooltip">
																	<Link to={`${import.meta.env.BASE_URL}industrials/performance_capacity/show_assessment/${capacity.id}`}
																		className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
																		<i className="ti ti-eye"></i>
																		<span
																			className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
																			role="tooltip">
												View
																		</span>
																			</Link>
																			</div>
																			&nbsp;&nbsp;
															
																		<button 
																	aria-label="anchor"
																	className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
																	onClick={() => {
																navigate(`${import.meta.env.BASE_URL}industrials/performance_capacity/edit_assessment/${capacity.id}`);   
																	}}
																>
																	<i className="ti ti-pencil"></i>
																		</button>
																		
																		
																		
																		
																			&nbsp;&nbsp;
																
																		
															{capacity.status === 'Active' ? (
														<button
															type="button"
															className="ti-btn ti-btn-success show-example-btn"
															aria-label="Deactivate! Example: End of contract"
															id="ajax-btn"
															onClick={(e) => Ajaxcalling(e, capacity.id)}
														>
															Initiate
														</button>
														) : (
														<></>
														)}
															</td>
														</tr>
														))
														)}
														
													</tbody>
												</table>
											</div>
										</div>
									</div>
									</div>
                              </div>
                              <div id="hs-tab-js-behavior-3" className= "hidden" role="tabpanel" aria-labelledby="hs-tab-js-behavior-item-3">
                                <div className="col-span-12">
									<div className="box">
										<div className="box-header">
											<div className="flex">
												<h5 className="box-title my-auto">Appeal Invitation Meeting</h5>
												<div className="space-y-2">
																		<button
																		type="button"
																		onClick={() => setShowAppealModal(true)}
																		className="ti-btn ti-btn-primary"
																		>
																		<i className="ti ti-user-plus w-3.5 h-3.5"></i> Create Invitation
																		</button>
																		<AppealInvitationModal
																			isOpen={showAppealInvitationModal}
																			onClose={() => setShowAppealInviatationModal(false)} 
																		/>
																	</div>
													
											</div>
										</div>
										<div className="box-body">
											<div className="table-bordered rounded-sm ti-custom-table-head overflow-auto">
												<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
													<thead className="bg-gray-50 dark:bg-black/20">
														<tr className="">
															<th scope="col" className="dark:text-white/80">S/no</th>
															<th scope="col" className="dark:text-white/80">EmployeeId</th>
															<th scope="col" className="dark:text-white/80">Fullname</th>
															<th scope="col" className="dark:text-white/80 min-w-[300px]">Employer</th>
															<th scope="col" className="dark:text-white/80">Type</th>
															<th scope="col" className="dark:text-white/80">Investigation</th>
															<th scope="col" className="dark:text-white/80">Status</th>
															<th scope="col" className="dark:text-white/80">Action</th>
														</tr>
													</thead>
													<tbody className="">
														{isLoading ? (
															<TableLoader colSpan={8} />
														) : (
															disciplinaries?.map((capacity, index) => (
													// <div key={index}></div>
														<tr key={index} className="">
																	<td>{ index + 1}</td>
															<td>
															<div className="flex space-x-3 rtl:space-x-reverse w-full">
																<div className="block w-full my-auto">
																<span
																	className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{capacity.employee_id}</span>
																</div>
																</div>
																</td>
																<td>{capacity.employee_name}</td>
															<td className="font-semibold text-base">{capacity.employer}</td>
															<td>
																<div className="flex space-x-3 rtl:space-x-reverse text-start">
																	
																	<div className="block my-auto">
																		<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{capacity.capacity_type}</p>
																	</div>
																</div>
																	</td>
																	<td>{capacity.investigation_date}</td>
																	<td>
																		{ capacity.status === 1
																		? (
																<span
																className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80">Submitted</span>)													
																: (<span
																			className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-danger/15 text-info/80">{capacity.status}</span>
																)}
															</td>
									
															<td className="font-medium space-x-2 rtl:space-x-reverse">
																<div className="hs-tooltip ti-main-tooltip">
																	<Link to={`${import.meta.env.BASE_URL}industrials/performance_capacity/show_assessment/${capacity.id}`}
																		className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
																		<i className="ti ti-eye"></i>
																		<span
																			className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
																			role="tooltip">
												View
																		</span>
																			</Link>
																			</div>
																			&nbsp;&nbsp;
															
																		<button 
																	aria-label="anchor"
																	className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
																	onClick={() => {
																navigate(`${import.meta.env.BASE_URL}industrials/performance_capacity/edit_assessment/${capacity.id}`);   
																	}}
																>
																	<i className="ti ti-pencil"></i>
																		</button>
																		
																		
																		
																		
																			&nbsp;&nbsp;
																
																		
															{capacity.status === 'Active' ? (
														<button
															type="button"
															className="ti-btn ti-btn-success show-example-btn"
															aria-label="Deactivate! Example: End of contract"
															id="ajax-btn"
															onClick={(e) => Ajaxcalling(e, capacity.id)}
														>
															Initiate
														</button>
														) : (
														<></>
														)}
															</td>
														</tr>
														)
														)
														)}
														
													</tbody>
												</table>
											</div>
										</div>
									</div>
									</div>
							</div>
							 <div id="hs-tab-js-behavior-4" className= "hidden" role="tabpanel" aria-labelledby="hs-tab-js-behavior-item-4">
                               <div className="col-span-12">
									<div className="box">
										<div className="box-header">
											<div className="flex">
												<h5 className="box-title my-auto">Appeal Invitation Meeting</h5>
												<div className="space-y-2">
																		<button
																		type="button"
																		onClick={() => setShowAppealModal(true)}
																		className="ti-btn ti-btn-primary"
																		>
																		<i className="ti ti-user-plus w-3.5 h-3.5"></i> Create Invitation
																		</button>
																		<AppealInvitationModal
																			isOpen={showAppealInvitationModal}
																			onClose={() => setShowAppealInviatationModal(false)} 
																		/>
																	</div>
													
											</div>
										</div>
										<div className="box-body">
											<div className="table-bordered rounded-sm ti-custom-table-head overflow-auto">
												<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
													<thead className="bg-gray-50 dark:bg-black/20">
														<tr className="">
															<th scope="col" className="dark:text-white/80">S/no</th>
															<th scope="col" className="dark:text-white/80">EmployeeId</th>
															<th scope="col" className="dark:text-white/80">Fullname</th>
															<th scope="col" className="dark:text-white/80 min-w-[300px]">Employer</th>
															<th scope="col" className="dark:text-white/80">Type</th>
															<th scope="col" className="dark:text-white/80">Investigation</th>
															<th scope="col" className="dark:text-white/80">Status</th>
															<th scope="col" className="dark:text-white/80">Action</th>
														</tr>
													</thead>
													<tbody className="">
														{isLoading ? (
															<TableLoader colSpan={8} />
														) : (
															disciplinaries?.map((capacity, index) => (
													// <div key={index}></div>
														<tr key={index} className="">
																	<td>{ index + 1}</td>
															<td>
															<div className="flex space-x-3 rtl:space-x-reverse w-full">
																<div className="block w-full my-auto">
																<span
																	className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{capacity.employee_id}</span>
																</div>
																</div>
																</td>
																<td>{capacity.employee_name}</td>
															<td className="font-semibold text-base">{capacity.employer}</td>
															<td>
																<div className="flex space-x-3 rtl:space-x-reverse text-start">
																	
																	<div className="block my-auto">
																		<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{capacity.capacity_type}</p>
																	</div>
																</div>
																	</td>
																	<td>{capacity.investigation_date}</td>
																	<td>
																		{ capacity.status === 1
																		? (
																<span
																className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80">Submitted</span>)													
																: (<span
																			className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-danger/15 text-info/80">{capacity.status}</span>
																)}
															</td>
									
															<td className="font-medium space-x-2 rtl:space-x-reverse">
																<div className="hs-tooltip ti-main-tooltip">
																	<Link to={`${import.meta.env.BASE_URL}industrials/performance_capacity/show_assessment/${capacity.id}`}
																		className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
																		<i className="ti ti-eye"></i>
																		<span
																			className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
																			role="tooltip">
												View
																		</span>
																			</Link>
																			</div>
																			&nbsp;&nbsp;
															
																		<button 
																	aria-label="anchor"
																	className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
																	onClick={() => {
																navigate(`${import.meta.env.BASE_URL}industrials/performance_capacity/edit_assessment/${capacity.id}`);   
																	}}
																>
																	<i className="ti ti-pencil"></i>
																		</button>
																		
																		
																		
																		
																			&nbsp;&nbsp;
																
																		
															{capacity.status === 'Active' ? (
														<button
															type="button"
															className="ti-btn ti-btn-success show-example-btn"
															aria-label="Deactivate! Example: End of contract"
															id="ajax-btn"
															onClick={(e) => Ajaxcalling(e, capacity.id)}
														>
															Initiate
														</button>
														) : (
														<></>
														)}
															</td>
														</tr>
														)
														)
														)}
														
													</tbody>
												</table>
											</div>
										</div>
									</div>
									</div>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>

			
			
		</div>
		
	);
}


export default Index;