import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import TableLoader from "/src/common/TableLoader";
import { Assigned, SortBy, StatusTask } from "/src/common/select2data";
// import { connect } from "react-redux";
// import { ThemeChanger } from "../../redux/Action";
// import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import axios from "axios";
 import Swal from "sweetalert2";

const Index = () => {
	
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	
	const [annualLeave, setAnnualLeave] = useState([]);
	const [emergencyLeave, setEmergencyLeave] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	
	let navigate = useNavigate();
	//  const [allData, setAllData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // for Searching
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;
    const [activeTab, setActiveTab] = useState('profile-1'); // State to track active tab


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [annualRes, emergencyRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/leaves/retrieve_annual_leave`),
          axios.get(`${apiBaseUrl}/leaves/retrieve_emergency_leave`)
        ]);
        setAnnualLeave(annualRes.data.annual_leave);
        setEmergencyLeave(emergencyRes.data.emergency_leave);
      } catch (error) {
        console.error('Failed to fetch leave data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiBaseUrl]); // Fetch data on component mount
	
	
	 const filteredData = annualLeave.filter((employee) =>
        employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
	 
	
	 const [showToast, setShowToast] = useState(false);

    const handleCustomToast = () => {
        setShowToast(true);

        // Set a timer to hide the toast after a certain duration
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Adjust the duration as needed
    };
    
	
  /** ****************************************************************** */
  //Block that Destroy data
function Ajaxcalling(e, id) {
  e.preventDefault();
//   console.log("ID new", id);

  Swal.fire({
    title: 'Fill Deactivate Reason',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    showLoaderOnConfirm: true,
    preConfirm: (deactivate_reason) => {
      return axios
        .delete(`${apiBaseUrl}/annuals/delete_employer/${id}`, {
          data: { deactivate_reason: deactivate_reason }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          } else {
            Style2();
            // console.log('wazungu waitwe');
          }
        })
        .catch(error => {
          Style2();
          Swal.showValidationMessage(
            
          );
        });
    },
    allowOutsideClick: () => !Swal.isLoading()
  });
}

function Style2() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#5e76a6',
   

		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Deleted!',
				'Your employer has been deleted.',
				'success'
			  )
			}
		  })
	 }
	// ***************  Activation block for Employer ***************************
	  
	function ActivateClient(e, id) {
  e.preventDefault();
//   console.log("ID new", id);

  Swal.fire({
    title: 'Fill employer activation Reason',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    showLoaderOnConfirm: true,
    preConfirm: (activate_reason) => {
      return axios
        .delete(`${apiBaseUrl}/employers/delete_employer/${id}`, {
          data: { activate_reason: activate_reason }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          } else {
            Style1();
            console.log('wazungu waitwe');
          }
        })
        .catch(error => {
          Style1();
          Swal.showValidationMessage(
            
          );
        });
    },
    allowOutsideClick: () => !Swal.isLoading()
  });
}

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
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Leave Management</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
						Home
						<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
					</a>
					</li>
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}leaves/annual/`}>
						Leave Management
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
								<h5 className="box-title my-auto">Employees Annual Leave</h5>
								<div className="space-y-2" >
                                    {activeTab === 'profile-1' && ( // Show button only if tab 1 is active
                                        <Link to={`${import.meta.env.BASE_URL}leaves/annual/create-leave/`}>
                                            <button type="button" className="ti-btn ti-btn-primary " id="profile-item-1">
                                                <i className="ti ti-user-plus w-3.5 h-3.5"></i>	 Create Leave							
                                            </button>
                                        </Link>
                                    )}
								</div>
								<div className="space-y-2 ">
                                    {activeTab === 'profile-2' && ( // Show button only if tab 2 is active
                                        <Link to={`${import.meta.env.BASE_URL}leaves/emergency/create-emergency-leave/`}>
                                            <button type="button" className="ti-btn ti-btn-primary hidden"   id="profile-2">
                                                <i className="ti ti-user-plus w-3.5 h-3.5"></i>	 Create Emergency							
                                            </button>
                                        </Link>
                                    )}
								</div>
									
							</div>
						</div>
						  <div className="box-body">
           
                    <div className="grid grid-cols-12 gap-6">
                        {/* <div className="col-span-12 lg:col-span-3">
                            <Link 
        to={`${import.meta.env.BASE_URL}employees/applications/create_general_id`} 
        className="ti-btn ti-btn-secondary m-0 py-2 btn-sm ml-auto"
    >
        <i className="ti ti-credit-card"></i>View Application
                            </Link></div> */}
                         <div className="col-span-12 lg:col-span-4">
                            <nav
                                className="sm:flex sm:space-x-2 space-y-2 sm:space-y-0 rtl:space-x-reverse block"
                                aria-label="Tabs"
                                role="tablist"
                            >
                                <button
                                    type="button"
                                    className={`hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300 ${activeTab === 'profile-1' ? 'active' : ''}`}
                                    id="profile-item-1"
                                    data-hs-tab="#profile-1"
                                    aria-controls="profile-1"
                                    role="tab"
                                    onClick={() => setActiveTab('profile-1')} // Update active tab
                                ><i className="ti ti-user-circle font-semibold"></i>
                                    Annual Leaves
                                </button>
                                <button
                                    type="button"
                                    className={`hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-1 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300 ${activeTab === 'profile-2' ? 'active' : ''}`}
                                    id="profile-item-2"
                                    data-hs-tab="#profile-2"
                                    aria-controls="profile-2"
                                    role="tab"
                                    onClick={() => setActiveTab('profile-2')} // Update active tab
                                ><i className="ti ti-urgent font-semibold"></i>
                                    Emergency Leave
                                </button>
                             

                            </nav>
                        </div>
                        
                        <div className="col-span-12 lg:col-span-2">
                            <div className="relative sm:max-w-xs max-w-[210px]">
                                <label htmlFor="hs-table-search" className="sr-only">Search</label>
                                <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
                                    <i className="ti ti-search"></i>
                                </div>
                                <input type="text" name="hs-table-search" id="hs-table-search" className="p-2 ltr:pr-10 rtl:pl-10 ti-form-input" value={searchQuery} onChange={(ele) => setSearchQuery(ele.target.value)}
                                    placeholder="Search by employee name" />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-5">
                            <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-3 space-x-0 justify-end task-right rtl:space-x-reverse">
                                <Select classNamePrefix='react-select' className="task-choice totdolist" options={SortBy} menuPlacement='auto' placeholder='sort By' />

                                <Select classNamePrefix='react-select' className="task-choice totdolist" options={StatusTask} menuPlacement='auto' placeholder='Status' />
                               
                            </div>
                        </div>
                       
     


                                   
                    </div>
                    <br />
                    
                    <div className={`ti-toast ${showToast ? '' : 'hidden'} bg-red-500/30 border-red-200 text-sm text-red-500 shadow-md `} role="alert" >
                        <div className="flex p-3">
                            Hello, You cannot do this action because it is not in the appropriate stage.
                            <div className="ltr:ml-auto rtl:mr-auto">
                                <button type="button"
                                    className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-sm text-red-400 hover:text-red-600 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-red-100 focus:ring-red-400 transition-all text-sm"
                                    onClick={() => setShowToast(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        </div>
                     
                    
                    <div className="box-body">
                            <div
                                id="profile-1"
                                className={activeTab === 'profile-1' ? '' : 'hidden'}
                                role="tabpanel"
                                aria-labelledby="profile-item-1"
                            >

                                
                    <div className="table-bordered whitespace-nowrap rounded-sm overflow-auto">
                        	<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr className="">
											<th scope="col" className="dark:text-white/80">S/no</th>
											<th scope="col" className="dark:text-white/80">EmployeeId</th>
											<th scope="col" className="dark:text-white/80">Fullname</th>
											<th scope="col" className="dark:text-white/80 min-w-[300px]">Employer</th>
                                            <th scope="col" className="dark:text-white/80">Type</th>
                                            <th scope="col" className="dark:text-white/80">Start</th>
                                             <th scope="col" className="dark:text-white/80">End</th>
                                            <th scope="col" className="dark:text-white/80">Balance</th>
											<th scope="col" className="dark:text-white/80">Status</th>
									    	<th scope="col" className="dark:text-white/80">Action</th>
										</tr>
									</thead>
									<tbody className="">
										{isLoading ? (
											<TableLoader colSpan={10} />
										) : (
											filteredData.map((annual, index) => (
										<tr key={index} className="">
													<td>{ index + 1}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span
															className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{annual.employee_id}</span>
															</div>
												</div>
                                                    </td>
                                                    <td>{annual.employee_name}</td>
											<td className=" font-semibold text-base">{annual.employer}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse text-start">
													
													<div className="block my-auto">
														<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{annual.leave_type}</p>
														{/* <span
															className="block text-xs text-gray-400 dark:text-white/80 !font-normal my-auto">socratesitumay@gmail.com</span> */}
													</div>
												</div>
                                                    </td>
                                                    <td>{annual.start_date}</td>
												<td>{annual.end_date}</td>                                                    
											<td>{annual.all_balance}</td>
													<td>
														{ annual.status === 1
														? (
<span
												className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80">Submitted</span>)													
												 : (<span
															className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-danger/15 text-info/80">{annual.status}</span>
												 )}
											</td>
					
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to={`${import.meta.env.BASE_URL}leaves/annual/show_annual_leave/${annual.id}`}
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
                                                   navigate(`${import.meta.env.BASE_URL}leaves/annual/edit_Leave/${annual.id}`);   
                                                    }}
                                                   >
                                                    <i className="ti ti-pencil"></i>
														</button>
														
														
														
														
															&nbsp;&nbsp;
												
														
											{annual.status === 'Active' ? (
										<button
											type="button"
											className="ti-btn ti-btn-success show-example-btn"
											aria-label="Deactivate! Example: End of contract"
											id="ajax-btn"
											onClick={(e) => Ajaxcalling(e, annual.id)}
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
                         <div
                                id="profile-2"
                                className={activeTab === 'profile-2' ? '' : 'hidden'}
                                role="tabpanel"
                                aria-labelledby="profile-item-2"
                        >
                        
                         <div className="table-bordered whitespace-nowrap rounded-sm overflow-auto">
                        	<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr className="">
											<th scope="col" className="dark:text-white/80">S/no</th>
											<th scope="col" className="dark:text-white/80">EmployeeIdddd</th>
											<th scope="col" className="dark:text-white/80">Fullname</th>
											<th scope="col" className="dark:text-white/80 min-w-[300px]">Employer</th>
                                            <th scope="col" className="dark:text-white/80">Type</th>
                                            <th scope="col" className="dark:text-white/80">Start</th>
                                             <th scope="col" className="dark:text-white/80">End</th>
                                            <th scope="col" className="dark:text-white/80">Balance</th>
											<th scope="col" className="dark:text-white/80">Status</th>
									    	<th scope="col" className="dark:text-white/80">Action</th>
										</tr>
									</thead>
									<tbody className="">
										{isLoading ? (
											<TableLoader colSpan={10} />
										) : (
											emergencyLeave.map((emergency, index) => (
										<tr key={index} className="">
													<td>{ index + 1}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span
															className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{emergency.employee_id}</span>
															</div>
												</div>
                                                    </td>
                                                    <td>{emergency.employee_name}</td>
											<td className=" font-semibold text-base">{emergency.employer}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse text-start">
													
													<div className="block my-auto">
														<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{emergency.leave_type}</p>
														{/* <span
															className="block text-xs text-gray-400 dark:text-white/80 !font-normal my-auto">socratesitumay@gmail.com</span> */}
													</div>
												</div>
                                                    </td>
                                                    <td>{emergency.start_date}</td>
												<td>{emergency.end_date}</td>                                                    
											<td>{emergency.all_balance}</td>
													<td>
														{ emergency.status === 1
														? (
<span
												className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80">Submitted</span>)													
												 : (<span
															className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-danger/15 text-info/80">{emergency.status}</span>
												 )}
											</td>
					
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to={`${import.meta.env.BASE_URL}leaves/emergency/show_emergency_leave/${emergency.id}`}
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
                                                   navigate(`${import.meta.env.BASE_URL}leaves/emergency/edit_emergency_Leave/${emergency.id}`);   
                                                    }}
                                                   >
                                                    <i className="ti ti-pencil"></i>
														</button>
														
														
														
														
															&nbsp;&nbsp;
												
														
											{emergency.status === 'Active' ? (
										<button
											type="button"
											className="ti-btn ti-btn-success show-example-btn"
											aria-label="Deactivate! Example: End of contract"
											id="ajax-btn"
											onClick={(e) => Ajaxcalling(e, emergency.id)}
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
                        
                        
                        
                        
                    <br />
                    <nav className="pagination-style-3 flex justify-end">
                        <ul className="ti-pagination">
                            <li><Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                                Prev
                            </Link></li>
                            {[...Array(Math.ceil(filteredData.length / entriesPerPage)).keys()].map(number => (
                                <li key={number + 1}>
                                    <Link className={`page-link ${currentPage === number + 1 ? 'active' : ''}`} to="#" onClick={() => paginate(number + 1)}>
                                        {number + 1}
                                    </Link>
                                </li>
                            ))}
                            <li><Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>
                                Next
                            </Link></li>
                        </ul>
                    </nav>
                </div>
					</div>
				</div>
			</div>
		</div>
		
	);
}


export default Index;