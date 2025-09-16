import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
// import { connect } from "react-redux";
// import { ThemeChanger } from "../../redux/Action";
// import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import axios from "axios";
 import Swal from "sweetalert2";

const Index = () => {
	
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	
	const [allGriavences, setAllGrievance] = useState([]);
	let navigate = useNavigate();

  useEffect(() => {
    const fetchAllGrievance= async () => {
		try {
		  const token = sessionStorage.getItem('token');
			const res = await axios.get(`${apiBaseUrl}/industrial_relationship/grievances/retrieve_all_grievances`,
			 {
          headers: {
             'Authorization': `Bearer ${token}`
        },
      });
        setAllGrievance(res.data.grievance);
      } catch (error) {
        throw new Error('Failed to fetch grievances: ' + error.message);
      }
    };

    fetchAllGrievance();
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

	
	 
 






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
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/grievances/initiate-grievance`}>
						Industrial Relashionship Management
						{/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
					</a>
					</li>
				</ol>
				</div>
								
			<div className="grid grid-cols-12 gap-x-6">
				<div className="col-span-12">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Employees Grievances</h5>
								<div className="space-y-2">
                                     	<Link to={`${import.meta.env.BASE_URL}industrials/grievances/initiate-grievance`}>
								    <button type="button" className="ti-btn ti-btn-primary ">
									<i className="ti ti-user-plus w-3.5 h-3.5"></i>	Create Grievance							
									</button>
							   </Link>    
									</div>
									{/* <div className="space-y-2">
                                         <div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									
									<button type="button" className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">View All <i className="ti ti-chevron-down"></i></button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" to="#">Download</Link>
										<Link className="ti-dropdown-item" to="#">Import</Link>
										<Link className="ti-dropdown-item" to="#">Export</Link>
									</div>
								</div>
                               </div> */}
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
                                            <th scope="col" className="dark:text-white/80">Department</th>
                                            <th scope="col" className="dark:text-white/80">Position</th>
                                             <th scope="col" className="dark:text-white/80">Grievance</th>
											<th scope="col" className="dark:text-white/80">Status</th>
									    	<th scope="col" className="dark:text-white/80">Action</th>
										</tr>
									</thead>
									<tbody className="">
										{
											allGriavences?.map((grievance, index) => (
									// <div key={index}></div>
										<tr key={index} className="">
													<td>{ index + 1}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span
															className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{grievance.employee_id}</span>
															</div>
												</div>
                                                    </td>
                                                    <td>{grievance.employee_name}</td>
											<td className="font-semibold text-base">{grievance.employer}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse text-start">
													
													<div className="block my-auto">
														<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{grievance.departments}</p>
													</div>
												</div>
                                                    </td>
                                                    <td>{grievance.job_title}</td>
												<td>{grievance.grievance_date}</td>                                                    

													<td>
													{grievance.status && (
														<span
														className={`truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium 
															${
															grievance.status === 'Initiated' ? 'bg-orange-500/20 text-orange-600'
															: grievance.status === 'Reviewed' ? 'bg-blue-500/20 text-blue-600'
															: grievance.status === 'Approved' ? 'bg-green-500/20 text-green-600'
															: 'bg-yellow-400/20 text-yellow-600'
															}`
														}
														>
														{grievance.status}
														</span>
													)}
													</td>

											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
												<Link
													to={`${import.meta.env.BASE_URL}industrials/grievances/show_grievances/${grievance.id}`}
													className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary"
												>
													<i className="ti ti-eye"></i>
													<span
													className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-green-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
													role="tooltip"
													>
													View
													</span>
												</Link>
												</div>
															&nbsp;&nbsp;
											
														<div className="hs-tooltip ti-main-tooltip">
															<button
																aria-label="anchor"
																className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary hs-tooltip-toggle relative"
																onClick={() => {
																if (grievance.status === 'Reviewed' || grievance.status === 'Approved') {
																	Swal.fire({
																	icon: 'warning',
																	title: 'Sorry!',
																	text: 'You cannot edit at this stage.',
																	confirmButtonColor: '#3085d6',
																	confirmButtonText: 'OK'
																	});
																} else {
																	navigate(`${import.meta.env.BASE_URL}industrials/grievances/edit_grievance/${grievance.id}`);
																}
																}}
															>
																<i className="ti ti-pencil"></i>
																<span
																className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-green-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
																role="tooltip"
																>
																Edit
																</span>
															</button>
															</div>

														
														
														
														
															&nbsp;&nbsp;
												
														
											{grievance.status === 'Active' ? (
										<button
											type="button"
											className="ti-btn ti-btn-success show-example-btn"
											aria-label="Deactivate! Example: End of contract"
											id="ajax-btn"
											onClick={(e) => Ajaxcalling(e, grievance.id)}
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
										}
										
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	);
}


export default Index;