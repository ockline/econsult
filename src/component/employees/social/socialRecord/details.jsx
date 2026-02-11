
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchSocialRecordDetails } from "../../../../common/employeesdata";
import Select from 'react-select';
import { Assigned, SortBy, StatusTask } from "/src/common/select2data";
import TableLoader from "../../../../common/TableLoader";

const SocialDetails = () => {


    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // for Searching
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const socialRecordDetails = await fetchSocialRecordDetails();
                setAllData(socialRecordDetails);
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

    return (
        <div>


            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Social Record Details</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/socialrecords/details/`}>
                            Social Record
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h5 className="box-title my-auto text-lg">Employee Social Record List </h5>
                    {/* <Link to={`${import.meta.env.BASE_URL}employees/personal/add_employee`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-address-book"></i>Add Social Records</Link> */}
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
                                       Department
                                    </th><th scope="col" className="!text-center font-bold text-black">
                                        Phone number
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Stage
                                    </th>
                                    
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Status
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Register Social
                                    </th>
                                    <th scope="col" className="!text-center font-bold text-black">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <TableLoader colSpan={9} />
                                ) : (
                                    currentEntries.map((employee, index) => (
                                        <tr className="product-list" key={employee.id}>
                                            <td>{index + 1 + indexOfFirstEntry}</td>
                                            <td>{employee.employee_no}</td>
                                            <td className="font-semibold">{employee.employee_name}</td>
                                            <td>{employee.job_title}</td>
                                            <td>{employee.mobile_number} </td>
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
                                                    <span className="badge bg-green-500 text-white">Person ID</span>
                                                ) : (<span className="badge bg-success text-white">Registration Completed</span>)

                                                }
                                            </td>
                                           
                                            <td>
                                                {
                                                employee.progressive_stage === 4 ? (
                                                    <span className="badge bg-green-500 text-white">Attended</span>
                                                ) : (<span className="badge bg-warning text-white">Not Attended</span>)
                                                }
                                        </td>
                                            <td className="text-center font-bold">
                                                  {
                                                employee.progressive_stage !== 4 ? ( <Link to={`${import.meta.env.BASE_URL}employees/socialrecords/add_record/${employee.id}`} className="ti-btn ti-btn-primary m-0 py-2 btn-sm"><i className="ti ti-address-book"></i>Add Social Records</Link> ) : ( <></>
                                                 )}</td>
                                            <td className="text-end font-medium">
                                                {/* Adjust the links according to your routes and logic */}
                                                <Link
                                                    aria-label="anchor"
                                                    to={`${import.meta.env.BASE_URL}employees/socialrecords/show_record/` + employee.id}
                                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
                                                >
                                                    <i className="ti ti-eye"></i>
                                                </Link>
                                                <Link
                                                    aria-label="anchor"
                                                    to={`${import.meta.env.BASE_URL}employees/socialrecords/edit_record/` + employee.id}
                                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
                                                >
                                                    <i className="ti ti-pencil"></i>
                                                </Link>
                                                {/* <button
                                                    aria-label="anchor"
                                                    className="product-btn w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger"
                                                    onClick={() => handleRemove(employee.id)}
                                                >
                                                    <i className="ti ti-trash"></i>
                                                </button> */}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
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
export default SocialDetails;
