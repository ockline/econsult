import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ALLImages from "/src/common/imagesdata";
import Select from "react-select";
import { fetchEmployeeUploadedDocument } from "../../../../common/employeesdata";
import ProfileService from "/src/common/profileservices";
import { HomeGallery } from "/src/component/advancedUi/filemanager/filedetails/filedetailscarcousel";
import { TagsInput } from "react-tag-input-component";
import { Helmet } from "react-helmet";
import axios from "axios";


const UploadedDocument = () => {
    // react-tag-input-component
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
    //URl image


    //toggle button for image

    const [ClassName, setClassName] = useState();

    useEffect(() => {
        if (ProfileService.returnImage() != undefined) {
            setImage(ProfileService.returnImage());
        }
        let contactItem = document.querySelectorAll(".main-contact-item");
        contactItem.forEach((ele) => {
            ele.addEventListener("click", () => {
                setClassName("main-content-body-show");
            })
        });
    }, [location]);


    const [allData, setAllData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // for Searching
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeDetails = await fetchEmployeeUploadedDocument();
                setAllData(employeeDetails);
                console.log('welimba', employeeDetails);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    //block for filterling 
    function handleRemove(id) {
        const newList = allData.filter((employee) => employee.id !== id);
        setAllData(newList);
    }

    // Filter data based on search query
    const filteredData = allData.filter((employee) =>
        employee.employee.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //*********************Pagination */
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // useEffect(() => {
    //     axios.get(`${apiBaseUrl}/employees/show_employee/${id}`)
    //         .then((res) => {
    //             // console.log('API Response:', res.data);  // Log the entire response
    //             setEmployeeData(res.data.employee);
    //             console.log('data', res.data.employee);
    //             // setAssessedCandidateData(res.data.assessed_candidate);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, [id]);


    // /**   Block for document preview  */
    const [employeeDocument, setEmployeeDocument] = useState([]);
    const [documentUrl, setDocumentUrl] = useState('');

    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/get_employee_document/${id}`)
            .then((res) => {
                setEmployeeDocument(res.data.employee_document);
                console.log(res.data.employee_document);
            })
            .catch((error) => {
                console.error('Error fetching candidate documents:', error);
            });
    }, [id]);



    return (
        <div>
            <Helmet>
                <body class={ClassName}></body>
            </Helmet>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Employee Required Documentation</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboard/normal/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/document/uploaded/`}>Uploaded Document List

                        </a>
                    </li>
                </ol>
            </div>



            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 xxl:col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title text-black font-lg">Recent Files</h5>
                        </div>
                        <div className="box-body">
                            <div className="pb-5">
                                <div className="md:flex justify-between space-y-2 md:space-y-0">
                                    <div className="relative max-w-xs">
                                        <label htmlFor="hs-table-search" className="sr-only">Search</label>
                                        <input type="text" onChange={(ele) => { myfunction(ele.target.value) }} name="hs-table-search" id="hs-table-search" className="p-2 ltr:pr-10 rtl:pl-10 ti-form-input" placeholder="Search for items" />
                                        <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
                                            <svg className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="overflow-auto">
                                <table className="ti-custom-table  table-bordered ti-custom-table-head">
                                    <thead className="bg-gray-50 dark:bg-black/20">
                                        <tr>
                                            <th className="!text-center text-black font-lg">S/No</th>
                                            <th className="!text-center text-black font-lg">Employee name</th>
                                            <th scope="col" className="!text-center text-black font-lg">Files</th>
                                            <th scope="col" className="!text-center text-black font-lg">Status</th>
                                            <th scope="col" className="!text-center text-black font-lg">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentEntries.map((document, index) => (
                                                <tr key={index + 1}>
                                                    <td className="text-center text-black font-semibold">{index + 1}</td>
                                                    <td className="text-black font-semibold">{document.employee}</td>
                                                    <td className="text-center text-black font-semibold">{document.total_employee_files}</td>
                                                    <td text-black font-semibold>
                                                        {document.total_employee_files >= 11 ? (
                                                            <span className="badge bg-success !text-center text-white">Completed</span>
                                                        ) :  (
                                                            <span className="badge bg-warning !text-center text-white">Not Completed</span>
                                                        ) 
                                                   }
                                                    </td>
                                                    <td className="text-center text-black font-semibold">
                                                      
                                                <Link to={`${import.meta.env.BASE_URL}employees/document/file_manager_list/${document.employee_id}`} className="ti-btn ti-btn-primary m-0 py-2 font-md" style={{ backgroundColor: '#285f29' }}><i className="ti ti-eye-check"></i>View Files</Link>
                                            
                                                    </td>
                                                </tr>

                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="py-1 ltr:float-right rtl:float-left">
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
        </div>
    );
};

export default UploadedDocument;
