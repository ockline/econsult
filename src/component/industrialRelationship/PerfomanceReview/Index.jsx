import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import TableLoader from "/src/common/TableLoader";
// import { connect } from "react-redux";
// import { ThemeChanger } from "../../redux/Action";
// import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import axios from "axios";
 import Swal from "sweetalert2";

const Index = () => {
	
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	
	const [perfomanceReview, setPerfomanceReview] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	let navigate = useNavigate();

  useEffect(() => {
    const fetchPerfomanceReview = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${apiBaseUrl}/industrial_relationship/retrieve_perfomance_review`);
        setPerfomanceReview(res.data.perfomance_review);
      } catch (error) {
        throw new Error('Failed to fetch annual leave: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerfomanceReview();
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

	
	 
  /** ****************************************************************** */
 
	function Ajaxcalling(e, id) {
  e.preventDefault();
//   console.log("ID new", id);

  Swal.fire({
    title: 'Fill Initiation Reason',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    showLoaderOnConfirm: true,

    preConfirm: (comments) => {
    //   return axios
    //     .post(`${apiBaseUrl}/industrial_relationship/initiate_perfomance_review/${id}`, {
    //       data: { comments: comments }
		//     })
		const token = sessionStorage.getItem('token');
		
		return axios.post(`${apiBaseUrl}/industrial_relationship/initiate_perfomance_review/${id}`, { comments: comments }, {
          headers: {
             'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
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
    text: "You want to initate Review Process!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#5e76a6',
   

		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Initiated!',
				'Your employee Review process successfully Initiated.',
				'success'
			  )
			}
		  })
	 }
	// ***************  Activation block for Employer ***************************
	  
	



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
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/perfomanace_review`}>
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
								<h5 className="box-title my-auto">Employees Perfomance Review</h5>
								<div className="space-y-2">
                                     	<Link to={`${import.meta.env.BASE_URL}industrials/perfomance_reviews/create`}>
								    <button type="button" className="ti-btn ti-btn-primary ">
									<i className="ti ti-user-plus w-3.5 h-3.5"></i>	 Create Review							
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
                                            <th scope="col" className="dark:text-white/80">Perfomance</th>
                                            <th scope="col" className="dark:text-white/80">Review Date</th>
                                             <th scope="col" className="dark:text-white/80">Department</th>
											<th scope="col" className="dark:text-white/80">Status</th>
									    	<th scope="col" className="dark:text-white/80">Action</th>
										</tr>
									</thead>
									<tbody className="">
										{isLoading ? (
											<TableLoader colSpan={9} />
										) : (
											perfomanceReview?.map((review, index) => (
									// <div key={index}></div>
										<tr key={index} className="">
													<td>{ index + 1}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse w-full">
													<div className="block w-full my-auto">
														<span
															className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">{review.employee_id}</span>
															</div>
												</div>
                                                    </td>
                                                    <td>{review.employee_name}</td>
											<td>{review.employer}</td>
											<td>
												<div className="flex space-x-3 rtl:space-x-reverse text-start">
													
													<div className="block my-auto">
														<p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">{review.overall_rating}</p>
																																		</div>
												</div>
                                                    </td>
                                                    <td>{review.review_date}</td>
												<td>{review.departments}</td>                                       
													<td>
														{ review.status === 1
														? (
<span
												className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80">Submitted</span>)													
												 : (<span
															className="truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-danger/15 text-info/80">{review.status}</span>
												 )}
											</td>
					
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to={`${import.meta.env.BASE_URL}industrials/show_perfomance_review/${review.id}`}
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
                                                   navigate(`${import.meta.env.BASE_URL}industrials/perfomance_review/edit/${review.id}`);   
                                                    }}
                                                   >
                                                    <i className="ti ti-pencil"></i>
														</button>
																						
															&nbsp;&nbsp;
													
											{(review.status === 'Not Initiated' || review.status === 'Returned' ) ? (
										<button
											type="button"
											className="ti-btn ti-btn-success show-example-btn"
											aria-label="Deactivate! Example: End of contract"
											id="ajax-btn"
											onClick={(e) => Ajaxcalling(e, review.id)}
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
		
	);
}


export default Index;