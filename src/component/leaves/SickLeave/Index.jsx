import React, { useState, useEffect} from "react";
import { Link  } from "react-router-dom";
// import { connect } from "react-redux";
// import { ThemeChanger } from "../../redux/Action";
// import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import axios from "axios";
 import Swal from "sweetalert2";

const Index = () => {
	
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	
	 const [sickLeave, setSickLeave] = useState([]);

  useEffect(() => {
    const fetchSickLeave = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/leaves/retrieve_sick_leave`);
        setSickLeave(res.data.sick_leave);
      } catch (error) {
        throw new Error('Failed to fetch sick leave: ' + error.message);
      }
    };

    fetchSickLeave();
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

	
	 
  /** ****************************************************************** */
  //Block that Destroy data
function Ajaxcalling(e, id) {
  e.preventDefault();
//   console.log("ID new", id);

  Swal.fire({
    title: 'Initiation  Reason',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    showLoaderOnConfirm: true,
    preConfirm: (reason) => {
      return axios
        .delete(`${apiBaseUrl}/leaves/initiate_sick_leave/${id}`, {
          data: { reason: reason }
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
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employers/registrations/registrations`}>
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
								<h5 className="box-title my-auto">Employees Sick Leave</h5>
								<div className="space-y-2">
                                     	<Link to={`${import.meta.env.BASE_URL}leaves/sick/create-leave/`}>
								    <button type="button" className="ti-btn ti-btn-primary ">
									<i className="ti ti-user-plus w-3.5 h-3.5"></i>	 Create Leave							
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
                                            <th scope="col" className="dark:text-white/80">Type</th>
                                            <th scope="col" className="dark:text-white/80">Start</th>
                                             <th scope="col" className="dark:text-white/80">End</th>
                                            <th scope="col" className="dark:text-white/80">Balance</th>
											<th scope="col" className="dark:text-white/80">Status</th>
									    	<th scope="col" className="dark:text-white/80">Action</th>
										</tr>
									</thead>
									<tbody className="">
										{
											sickLeave?.map((sick, index) => (
									// <div key={index}></div>
										<tr key={index} className="">
													<td>{ index + 1}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span
															className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{sick.employee_id}</span>
															</div>
												</div>
                                                    </td>
                                                    <td>{sick.employee_name}</td>
											<td className="!text-success font-semibold text-base">{sick.employer}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse text-start">
													
													<div className="block my-auto">
														<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{sick.leave_type}</p>
														{/* <span
															className="block text-xs text-gray-400 dark:text-white/80 !font-normal my-auto">socratesitumay@gmail.com</span> */}
													</div>
												</div>
                                                    </td>
                                                    <td>{sick.start_date}</td>
												<td>{sick.end_date}</td>                                                    
											<td>{sick.all_balance}</td>
													<td>
														{ sick.status === 1
														? (
<span
												className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80">Submitted</span>)													
												 : (<span
															className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-danger/15 text-info/80">{sick.status}</span>
												 )}
											</td>
					
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to={`${import.meta.env.BASE_URL}leaves/sick/show_sick_leave/${sick.id}`}
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
																									
														<Link 
															aria-label="anchor"
															className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
															to={`${import.meta.env.BASE_URL}leaves/sick/edit_sick_leave/${sick.id}`}   
                                            
                                                   >
                                                    <i className="ti ti-pencil"></i>
                                                </Link>	
														
															&nbsp;&nbsp;
												
														
											{sick.status === null ? (
										<button
											type="button"
											className="ti-btn ti-btn-success show-example-btn"
											aria-label="Deactivate! Example: End of contract"
											id="ajax-btn"
											onClick={(e) => Ajaxcalling(e, sick.id)}
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