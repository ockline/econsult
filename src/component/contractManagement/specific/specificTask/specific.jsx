
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { fetchSpecificTaskContract } from "/src/common/contractsdata";
import Select from 'react-select';
import { Assigned, SortBy, StatusTask } from "/src/common/select2data";
import Swal from "sweetalert2";
import axios from "axios";
import { getActiveRole, filterItemsByActiveRole, getAvailableActions } from "/src/utility/roleHelper";
import { connect } from "react-redux";

const SpecificContract = ({ local_varaiable }) => {
    const userRoles = local_varaiable?.roles || [];
    const activeRole = getActiveRole();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    let navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // for Searching
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const entriesPerPage = 10;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Listen for role change events
        const handleRoleChange = () => {
            fetchData();
        };

        window.addEventListener('roleChanged', handleRoleChange);
        return () => window.removeEventListener('roleChanged', handleRoleChange);
    }, []);

    useEffect(() => {
        // Filter data based on active role
        if (activeRole) {
            const filtered = filterItemsByActiveRole(allData, activeRole, 'stage');
            setFilteredData(filtered);
        } else {
            setFilteredData(allData);
        }
    }, [allData, activeRole]);

        const fetchData = async () => {
        setLoading(true);
            try {
                const SpecificTaskContracts = await fetchSpecificTaskContract();
            setAllData(SpecificTaskContracts || []);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            setAllData([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter data based on search query
    const searchFilteredData = filteredData.filter((employee) =>
        employee.employee_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employer?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //*********************Pagination */
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = searchFilteredData.slice(indexOfFirstEntry, indexOfLastEntry);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleComplete = async (employee_id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to edit this file again!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5e76a6',
            cancelButtonColor: '#edcb63',
            confirmButtonText: 'Yes, Complete it!'
        });

            if (result.isConfirmed) {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.post(
                    `${apiBaseUrl}/contracts/specific/complete_specific_task/${employee_id}`,
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'X-CSRF-TOKEN': 'form/multi-part',
                        },
                    }
                );

                if (response.data.status === 404) {
                    Swal.fire('Error', response.data.message, 'error');
                } else {
                    Swal.fire('Completed', 'Your file has been Completed.', 'success');
                    fetchData();
                }
            } catch (error) {
                console.error('Error completing file:', error);
                Swal.fire('Error', 'An error occurred while completing the file.', 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleWorkflowAction = async (contract, action) => {
        const actionText = {
            'approve': 'Approve',
            'reject': 'Reject'
        };

        const result = await Swal.fire({
            title: `${actionText[action]} Specific Task Contract`,
            html: `<p>Are you sure you want to ${action} the contract for <strong>${contract.employee_name}</strong>?</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: actionText[action],
            cancelButtonText: 'Cancel',
            confirmButtonColor: action === 'approve' ? '#52c41a' : '#ff4d4f',
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                // Note: Update this endpoint based on your backend API
                const endpoint = `${apiBaseUrl}/contracts/specific/${action}_specific_task`;
                
                const response = await axios.post(
                    endpoint,
                    {
                        contract_id: contract.id || contract.employee_id,
                        action: action
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status === 200) {
                    Swal.fire({
                        title: 'Success',
                        text: `Contract ${action}ed successfully`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#b2000a'
                    });
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.data.message || `Failed to ${action} contract`,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#b2000a'
                    });
                }
            } catch (error) {
                console.error(`Error ${action}ing contract:`, error);
                Swal.fire({
                    title: 'Error',
                    text: error.response?.data?.message || `Failed to ${action} contract`,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#b2000a'
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const getStatusColor = (status) => {
        if (status === 'Draft' || status === 'Not Attended') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-warning/10 text-warning/80';
        } else if (status === 'Submitted' || status === 'Attended') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80';
        } else if (status === 'Under Review') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-info/10 text-info/80';
        } else if (status === 'Approved') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80';
        } else if (status === 'Rejected') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-danger/15 text-danger/80';
        }
        return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-gray/10 text-gray/80';
    };

    const getStageColor = (stage) => {
        if (stage === 'Initiated' || stage === 'Employee Details') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary/80';
        } else if (stage === 'HR Review' || stage === 'Supportive Document') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-info/10 text-info/80';
        } else if (stage === 'Manager Review' || stage === 'Social Record') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-warning/10 text-warning/80';
        } else if (stage === 'Final Approval' || stage === 'Contract') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80';
        } else if (stage === 'Completed' || stage === 'Person ID') {
            return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80';
        }
        return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-gray/10 text-gray/80';
    };


    const [showToast, setShowToast] = useState(false);

    const handleCustomToast = () => {
        setShowToast(true);

        // Set a timer to hide the toast after a certain duration
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Adjust the duration as needed
    };

    return (
        <div>


            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Employee Specific Task Contracts</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/specific/specific_task/`}>
                            Fixed Contracts
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header">
                    <div className="flex">
                        <h5 className="box-title my-auto">Specific Task Contract List</h5>
                        <div className="space-y-2">
                            <Link to={`${import.meta.env.BASE_URL}exits/end_specific_contracts/add`}>
                                <button 
                                    type="button" 
                                    className="ti-btn ti-btn-primary" 
                                    style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                                >
                                    <i className="ti ti-user-plus w-3.5 h-3.5"></i> Initiate End of Specific Task
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="box-body">

                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 lg:col-span-4">
                            <div className="relative sm:max-w-xs max-w-[210px]">
                                <label htmlFor="hs-table-search" className="sr-only">Search</label>
                                <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
                                    <i className="ti ti-search"></i>
                                </div>
                                <input type="text" name="hs-table-search" id="hs-table-search" className="p-2 ltr:pr-10 rtl:pl-10 ti-form-input" value={searchQuery} onChange={(ele) => setSearchQuery(ele.target.value)}
                                    placeholder="Search by employee name" />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-8">
                            <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-3 space-x-0 justify-end task-right rtl:space-x-reverse">
                                <Select classNamePrefix='react-select' className="task-choice totdolist" options={SortBy} menuPlacement='auto' placeholder='sort By' />

                                <Select classNamePrefix='react-select' className="task-choice totdolist" options={StatusTask} menuPlacement='auto' placeholder='Status' />
                                <div className="hs-dropdown ti-dropdown">
                                    <Link aria-label="anchor" to="#"
                                        className="hs-dropdown-toggle ti-dropdown-toggle inline-flex !p-2 flex-shrink-0 justify-center items-center gap-2 w-full rounded-sm border font-medium bg-white text-gray-500 shadow-sm align-middle focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-primary transition-all text-xs dark:bg-bgdark dark:border-white/10 dark:text-white/70 dark:focus:ring-offset-white/10">
                                        <i className="ri ri-more-2-line text-lg leading-none"></i>
                                    </Link>
                                    <div className="hs-dropdown-menu ti-dropdown-menu">
                                        <Link className="ti-dropdown-item" to="#">Select All</Link>
                                        <Link className="ti-dropdown-item" to="#">Mark All</Link>
                                    </div>
                                </div>
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
                     
                    <div className="table-bordered whitespace-nowrap rounded-sm overflow-auto">
                        <table className="ti-custom-table ti-custom-table-head edit-table">
                            <thead className="bg-gray-100 dark:bg-black/20">
                                <tr>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        S/NO
                                    </th>
                                    {/* <th scope="col" className="!text-center font-bold text-black ">
                                        Employee No
                                    </th> */}
                                    
                                    <th scope="col" className="!text-center font-bold text-black">
                                       employer (BETWEEN)
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Employee (AND)
                                    </th>
                                    
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Contracted Date 
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Stage
                                    </th>

                                    <th scope="col" className="!text-center font-bold text-black">
                                        Status
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Contract Detail
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentEntries.map((employee, index) => (
                                        <tr className="product-list" key={employee.id}>
                                            <td>{index + 1 + indexOfFirstEntry}</td>
                                             <td>{employee.employer}</td>
                                            <td className="font-semibold">{employee.stages === 1 ? (<>{employee.contract_employee}</>) : employee.employee_name}
                                            </td>
                                            <td>{employee.stages === 1 ? (<>{employee.contract_created}</>) : employee.created_at} </td>
                                            {employee.stages === 1 ? (
                                                <td>
                                                    <span className={getStageColor('Person ID')}>Person ID</span>
                                                </td>
                                            ) : (
                                                <td className="text-center font-bold">
                                                    {employee.progressive_stage === 1 ? (
                                                        <span className={getStageColor('Employee Details')}>Employee Details</span>
                                                    ) : employee.progressive_stage === 2 ? (
                                                        <span className={getStageColor('Supportive Document')}>Supportive Document</span>
                                                    ) : employee.progressive_stage === 3 ? (
                                                        <span className={getStageColor('Social Record')}>Social Record</span>
                                                    ) : employee.progressive_stage === 4 ? (
                                                        <span className={getStageColor('Induction Training')}>Induction Training</span>
                                                    ) : employee.progressive_stage === 5 ? (
                                                        <span className={getStageColor('Contract')}>Contract</span>
                                                    ) : employee.progressive_stage === 6 ? (
                                                        <span className={getStageColor('Person ID')}>Person ID</span>
                                                    ) : (
                                                        <span className={getStageColor('Completed')}>Registration Completed</span>
                                                    )}
                                                </td>
                                            )}

                                            <td>
                                                {
                                                    employee.stages === 1 ? (
                                                        <span className={getStatusColor('Attended')}>Attended</span>
                                                    ) : employee.stages === 0 ? (
                                                        <span className={getStatusColor('Partial attended')}>Partial attended</span>
                                                    ) : (
                                                        <span className={getStatusColor('Not Attended')}>Not Attended</span>
                                                    )
                                                }
                                            </td>
                                            <td className="text-center font-bold">
                                                {
                                                    employee.stages === 1 ? (<></>) :
                                                        employee.stages === 0 ? (
                                                            <Link 
                                                                to="#" 
                                                                className="ti-btn ti-btn-success m-0 py-2 btn-sm" 
                                                                id="confirm-btn" 
                                                                onClick={() => handleComplete(employee.employee_id)}
                                                            >
                                                                <i className="ti ti-corner-up-right-double"></i>Complete
                                                            </Link>
                                                        ) : (
                                                            <Link 
                                                                to={`${import.meta.env.BASE_URL}contracts/specific/add_specific_task/${employee.employee_id}`} 
                                                                className="ti-btn ti-btn-primary m-0 py-2 btn-sm"
                                                            >
                                                                <i className="ti ti-layout-grid-add"></i>Add Specific
                                                            </Link>
                                                        )
                                                }
                                            </td>
                                            <td className="text-end font-medium">
                                                <Link
                                                    aria-label="anchor"
                                                    to={`${import.meta.env.BASE_URL}contracts/specific/show_specific_task/` + employee.employee_id}
                                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
                                                    title="View"
                                                >
                                                    <i className="ti ti-eye"></i>
                                                </Link>
                                                &nbsp;&nbsp;
                                              
                                                {(employee.stages !== 1 && (activeRole?.includes('IR') || activeRole === 'DEV' || activeRole === 'ADMIN')) && (
                                                    <>
                                                <button
                                                    aria-label="anchor"
                                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
                                                    onClick={() => {
                                                        if (employee.stages === 1) {
                                                            handleCustomToast();
                                                        } else {
                                                            navigate(`${import.meta.env.BASE_URL}contracts/specific/edit_specific_task/` + employee.employee_id);
                                                        }
                                                    }}
                                                            title="Edit"
                                                >
                                                    <i className="ti ti-pencil"></i>
                                                </button>
                                                        &nbsp;&nbsp;
                                                    </>
                                                )}

                                                {/* Show workflow action buttons based on active role */}
                                                {activeRole && getAvailableActions(activeRole, employee, 'stage').map(action => {
                                                    if (action === 'approve') {
                                                        return (
                                                            <button
                                                                key={action}
                                                                type="button"
                                                                className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
                                                                onClick={() => handleWorkflowAction(employee, action)}
                                                                title="Approve"
                                                            >
                                                                <i className="ti ti-check-double"></i>
                                                            </button>
                                                        );
                                                    }
                                                    if (action === 'reject') {
                                                        return (
                                                            <button
                                                                key={action}
                                                                type="button"
                                                                className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger"
                                                                onClick={() => handleWorkflowAction(employee, 'reject')}
                                                                title="Reject"
                                                            >
                                                                <i className="ti ti-x"></i>
                                                            </button>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <nav className="pagination-style-3 flex justify-end">
                        <ul className="ti-pagination">
                            <li><Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
                                Prev
                            </Link></li>
                            {[...Array(Math.ceil(searchFilteredData.length / entriesPerPage)).keys()].map(number => (
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
const mapStateToProps = (state) => ({
    local_varaiable: state
});

export default connect(mapStateToProps)(SpecificContract);
