
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { fetchPersonnelApplicationDetails, fetchAllIdApplicationDetails } from "../../../../common/employeesdata";
import Select from 'react-select';
import { Assigned, SortBy, StatusTask } from "/src/common/select2data";
import Swal from "sweetalert2";
import axios from "axios";
import TableLoader from "../../../../common/TableLoader";

const Application = () => {


    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    let navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // for Searching
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const personnelApplicationDetails = await fetchPersonnelApplicationDetails();
                setAllData(personnelApplicationDetails);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    function handleRemove(id) {
        const newList = allData.filter((employee) => employee.id !== id);
        setAllData(newList);
    }

    // Filter data based on search query
    const filteredData = allData.filter((employee) =>
        employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //*********************Pagination */
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // console.log('apiBaseUrl:', apiBaseUrl);
    function Style2(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to edit this file again!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5e76a6',
            cancelButtonColor: '#edcb63',
            confirmButtonText: 'Yes, Complete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(
                    `${apiBaseUrl}/employees/application/complete_application_record/${id}`,
                    {},
                    {
                        headers: {
                            'X-CSRF-TOKEN': 'form/multi-part',
                        },
                    }
                )
                    .then(response => {
                        // Handle the response if needed
                        Swal.fire(
                            'Completed',
                            'Your file has been Completed.',
                            'success'
                        );
                    })
                    .catch(error => {
                        // Handle errors if necessary
                        console.error('Error completing file:', error);
                        Swal.fire(
                            'Error',
                            'An error occurred while completing the file.',
                            'error'
                        );
                    });
            }
        });
    }


    const [showToast, setShowToast] = useState(false);

    const handleCustomToast = () => {
        setShowToast(true);

        // Set a timer to hide the toast after a certain duration
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Adjust the duration as needed
    };
    
    //block to return all application request
    
    const [allIdRequest, setAllIdRequestData] = useState();
    const [isLoadingIdRequest, setIsLoadingIdRequest] = useState(true);
      useEffect(() => {
        const fetchIdRequestData = async () => {
            setIsLoadingIdRequest(true);
            try {
                const allIdApplicationDetails = await fetchAllIdApplicationDetails();
                setAllIdRequestData(allIdApplicationDetails);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setIsLoadingIdRequest(false);
            }
        };

        fetchIdRequestData();
    }, []);


    return (
        <div>


            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Personnel ID Application</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/applications/all_id_application/`}>
                            Personnel Id Application
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h5 className="box-title my-auto text-lg">Personnel ID Application List </h5>
                    {/* <Link to={`${import.meta.env.BASE_URL}employees/personal/add_employee`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-address-book"></i>Add Social Records</Link> */}
                                            {/* <div className="flex w-full"> */}
    <Link 
        to={`${import.meta.env.BASE_URL}employees/applications/create_general_id`} 
        className="ti-btn ti-btn-primary m-0 py-2 btn-sm ml-auto"
    >
        <i className="ti ti-credit-card"></i>New Request ID
    </Link>
{/* </div>                */}
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
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300 active"
                                    id="profile-item-1"
                                    data-hs-tab="#profile-1"
                                    aria-controls="profile-1"
                                    role="tab"
                                ><i className="ti ti-user-circle font-semibold"></i>
                                    Personnel ID Details
                                </button>
                                <button
                                    type="button"
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-1 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                    id="profile-item-2"
                                    data-hs-tab="#profile-2"
                                    aria-controls="profile-2"
                                    role="tab"
                                ><i className="ti ti-urgent font-semibold"></i>
                                    View All Application
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
                                className=""
                                role="tabpanel"
                                aria-labelledby="profile-item-1"
                            >

                                
                    <div className="table-bordered whitespace-nowrap rounded-sm overflow-auto">
                        <table className="ti-custom-table ti-custom-table-head edit-table">
                            <thead className="bg-gray-100 dark:bg-black/20">
                                <tr>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        S/NO
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black ">
                                        Employee No
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Employee Name
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                       Personal Type
                                    </th>
                                    {/* <th scope="col" className="!text-center font-bold text-black">
                                        Date Registered
                                    </th> */}
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Stage
                                    </th>

                                    <th scope="col" className="!text-center font-bold text-black">
                                        Status
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Apply ID
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <TableLoader colSpan={8} />
                                ) : (
                                    currentEntries.map((employee, index) => (
                                        <tr className="product-list" key={employee.id}>
                                            <td>{index + 1 + indexOfFirstEntry}</td>
                                            <td>{employee.employee}</td>
                                            <td className="font-semibold">{employee.employee_name}</td>
                                            <td>{employee.personal_type}</td>
                                            {/* <td>{employee.created_at} </td> */}
                                            <td className="text-center font-bold">
                                                {employee.progressive_stage === 1 ? (
                                                    <span className="badge bg-warning text-white">Employee Details</span>
                                                ) : employee.progressive_stage === 2 ? (
                                                    <span className="badge bg-info text-white">Supportive Document</span>
                                                ) : employee.progressive_stage === 3 ? (
                                                    <span className="badge bg-secondary text-white">Social Record</span>
                                                ) : employee.progressive_stage === 4 ? (
                                                    <span className="badge bg-primary text-white">Induction Training</span>
                                                ) : employee.progressive_stage === 5 ? (
                                                    <span className="badge bg-purple-500 text-white">Contract</span>
                                                ) : employee.progressive_stage === 6 ? (
                                                    <span className="badge  text-white" style={{ backgroundColor: '#437243' }}>Person ID</span>
                                                ) : (<span className="badge bg-success text-white">Registration Completed</span>)

                                                }
                                            </td>

                                            <td>
                                                {
                                                    employee.stage === 1 ? (
                                                        <span className="badge bg-green-500 text-white" style={{ backgroundColor: '#08adf8' }}>Attended</span>
                                                    ) : employee.stage === 0 ? (<span className="badge bg-secondary text-white">Partial attended</span>) : (<span className="badge bg-warning text-white">Not Attended</span>)
                                                }
                                            </td>
                                            <td className="text-center font-bold">
                                                {
                                                    employee.stage === 1 ? (<></>) :
                                                        employee.stage === 0 ? (<Link to="#" className="ti-btn ti-btn-success m-0 py-2 btn-sm" id="confirm-btn" onClick={() => Style2(employee.id)}><i className="ti ti-corner-up-right-double"  ></i>Complete </Link>) : (<Link to={`${import.meta.env.BASE_URL}employees/applications/create_application/${employee.employee_id}`} className="ti-btn ti-btn-primary m-0 py-2 btn-sm"><i className="ti ti-credit-card"></i>Add Personnel ID</Link>
                                                        )}</td>
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
                                    ))
                                )}
                            </tbody>
                        </table>
                            </div>
                        </div>
                         <div
                                id="profile-2"
                                className="hidden"
                                role="tabpanel"
                                aria-labelledby="profile-item-2"
                        >
                        
                         <div className="table-bordered whitespace-nowrap rounded-sm overflow-auto">
                        <table className="ti-custom-table ti-custom-table-head edit-table">
                            <thead className="bg-gray-100 dark:bg-black/20">
                                <tr>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        S/NO
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black ">
                                        Fullname
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Organization
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                       ID Type
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Requested
                                    </th>

                                    <th scope="col" className="!text-center font-bold text-black">
                                        Status
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                               {isLoadingIdRequest ? (
    <TableLoader colSpan={7} />
) : allIdRequest && allIdRequest.length > 0 ? (
    allIdRequest.map((requester, index) => (
        <tr className="product-list" key={requester.id}>
            <td>{index + 1 + indexOfFirstEntry}</td>
            <td>{requester.applicant}</td>
            <td className="font-semibold">{requester.organization || requester.employer ||requester.institution_name}</td>
            <td>{requester.type}</td>
            <td>{requester.requested}</td>

            <td>
                {requester.stage === 1 ? (
                    <span className="badge bg-green-500 text-white" style={{ backgroundColor: '#08adf8' }}>Attended</span>
                ) : requester.stage === 0 ? (
                    <span className="badge bg-secondary text-white">Partial attended</span>
                ) : (
                    <span className="badge bg-warning text-white">Not Attended</span>
                )}
            </td>
            <td className="text-end font-medium">
                <Link
                    aria-label="anchor"
                    to={`${import.meta.env.BASE_URL}employees/applications/show_general_application/` + requester.id}
                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
                >
                    <i className="ti ti-eye"></i>
                </Link>

                <button
                    aria-label="anchor"
                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
                    onClick={() => {
                        if (requester.stage === 1) {
                            handleCustomToast();
                        } else {
                            navigate(`${import.meta.env.BASE_URL}employees/applications/edit_application/` + requester.id);
                        }
                    }}
                >
                    <i className="ti ti-pencil"></i>
                </button>
            </td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan="7" className="text-center">No data available</td>
    </tr>
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
    );
};
export default Application;
