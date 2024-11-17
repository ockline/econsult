import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ALLImages from "/src/common/imagesdata";
import ProfileService from "/src/common/profileservices";
import { HomeGallery } from "/src/component/advancedUi/filemanager/filedetails/filedetailscarcousel";
import { TagsInput } from "react-tag-input-component";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";


const ShowPaternity = () => {
    // react-tag-input-component
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
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


    const [formData, setEmployeeData] = useState([])

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${apiBaseUrl}/leaves/retrieve_sick_detail/${id}`)
            .then((res) => {
                // console.log('API Response:', res.data);  // Log the entire response
                setEmployeeData(res.data.employee);
                // console.log('data', res.data.fixed_contract);
                if (res.data.status === 404) {
                    Dangersweetalert()
                    navigate('/leaves/sick_leave/'); // Call the navigate function to redirect to the specified route
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);




   

    

    function Dangersweetalert() {
        Swal.fire({
            // text: " Welcome to Your Admin Page",
            allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">No data found, Kindly add, then  you may edit </a>'
        });
    }


    // /**   Block for document preview  */
    const [employeeDocument, setEmployeeDocument] = useState([]);
    const [documentUrl, setDocumentUrl] = useState('');

    useEffect(() => {
        axios.get(`${apiBaseUrl}/contracts/fixed/get_contract_document/${id}`)
            .then((res) => {
                setEmployeeDocument(res.data.contract_document);
                console.log(res.data.contract_document);
            })
            .catch((error) => {
                console.error('Error fetching personnel application  documents:', error);
            });
    }, [id]);

    const handlePreviewClick = (description) => {
        // Assuming the documents are stored in a specific folder on the server      
        const absoluteUrl = `${docBaseUrl}/contracts/fixed/${id}/${description}`;
        console.log('absoluteUrl', absoluteUrl);
        // Update the state with the document URL
        setDocumentUrl(absoluteUrl);

    };


    return (
        <div>
            <Helmet>
                <body class={ClassName}></body>
            </Helmet>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Show Sick Leave</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}leaves/sick_leave/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}leaves/sick/show_sick/${formData.id}`}>Show Sick Leave

                        </a>
                    </li>
                </ol>
            </div>



            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 xxl:col-span-5">
                    <div className="box">
                        <div className="box-header">
                            <div className="flex justify-between items-center">
                                <h5 className="box-title justify-center font-bold text-black !text-lg">Basic Information</h5>
                            </div>
                        </div>
                        <div className="box-body py-3">
                            <div className="xl:overflow-hidden overflow-x-auto">
                                <table className="ti-custom-table border-0">
                                    <tbody>

                                        <tr className="border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Leave Type 
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.leave}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Leave Start Date
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black font-medium">
                                                {formData.start_date}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                               Leave End Date 
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black  font-bold">
                                                {formData.end_date}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Leave Days
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.leave_days}
                                            </td>
                                        </tr>
                                         <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Balance
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.balance_days}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Mobile Number
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.mobile_number}
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-12 xxl:col-span-7">
                    <div className="box">
                        <div className="box-header">
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
                                    role="tabpanel"
                                ><i className="ti ti-user-circle font-semibold"></i>
                                    Employment Particulars
                                </button>
                                <button
                                    type="button"
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-1 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                    id="profile-item-2"
                                    data-hs-tab="#profile-2"
                                    aria-controls="profile-2"
                                    role="tabpanel"
                                ><i className="ti ti-urgent font-semibold"></i>
                                    Leave Summary
                                </button>
                                <button
                                    type="button"
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                    id="profile-item-3"
                                    data-hs-tab="#profile-3"
                                    aria-controls="profile-3"
                                    role="tabpanel"
                                ><i className="ti ti-folders font-semibold"></i>
                                    Documents Center
                                </button>

                            </nav>
                        </div>
                        <div className="box-body">
                            <div
                                id="profile-1"
                                // className="hidden"
                                role="tabpanel"
                                aria-labelledby="profile-item-1"
                            >
                                <div className="xl:overflow-hidden overflow-x-auto">
                                    <table className="ti-custom-table border-0">
                                        <tbody>
                                            <tr className="">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Job Title
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black font-medium">
                                                    {formData.job_title}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Job profile
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.job_profile}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Reporting To
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black text-info">
                                                    {formData.reporting_to}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Staff Classification
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.staff_classfication}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Place of Work
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.work_station}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Place of Recruitment
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.place_recruitment}
                                                </td>
                                            </tr>

                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Commencement Date
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.commencement_date}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Expire Commencement Date
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.end_commencement_date}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Probation Period
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.probation_period}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br />

                            </div>
                            <div
                                id="profile-2"
                                className="hidden"
                                role="tabpanel"
                                aria-labelledby="profile-item-2"
                            >
                                <div className="grid lg:grid-cols-1 gap-6 second-page none" id="new_page">

                                    <div className=" space-y-2">

                                    </div>

                                    {/* Workflow History */}
                                    <h3 className="text-black front-medium font-bold ">Leaves</h3>
                                    <div className="table-bordered rounded-md overflow-auto">

                                        <table className="ti-custom-table ti-custom-table-head" >
                                            <thead className="bg-gray-50 dark:bg-black/20">
                                                <tr>
                                                    <th style={{ backgroundColor: '#ddbff0' }}>S/No</th>
                                                    <th scope="col" colSpan={1} className="py-3 ltr:pl-4 rtl:pr-4" style={{ backgroundColor: '#ddbff0' }}>Name</th>
                                                    <th scope="col" colSpan={1} className="!text-center" style={{ backgroundColor: '#ddbff0' }}>Description</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    <td>1</td>
                                                    <td colSpan={1} className="">Remuneration before <br />Tax and statutory</td>
                                                    <td colSpan={1} className="">{formData.remuneration}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={1} >2</td>
                                                    <td colSpan={1} >Basic Salary</td>
                                                    <td colSpan={1} className="">{formData.basic_salary}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={1} className="">3</td>
                                                    <td colSpan={1} >Housing Allowance</td>
                                                    <td colSpan={1} >{formData.house_allowance}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={1} className="">4</td>
                                                    <td colSpan={1} >Meal Allowance</td>
                                                    <td colSpan={1} >{formData.meal_allowance}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={1} className="">5</td>
                                                    <td colSpan={1} >Transport Allowance</td>
                                                    <td colSpan={1} >{formData.transport_allowance}</td>
                                                </tr>
                                               
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Employment Reference check */}
                                </div>
                            </div>
                            <div
                                id="profile-3"
                                className="hidden text-center"
                                role="tabpanel"
                                aria-labelledby="profile-item-3"
                            >
                                <div className="box">
                                    <div className="box-header">
                                        <h5 className="box-title">Recent Files</h5>
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

                                                <div className="md:ltr:ml-auto md:rtl:mr-auto">

                                                    <Link
                                                        aria-label="anchor"
                                                        to={`${import.meta.env.BASE_URL}contracts/fixed/download_fixed_contract/` + formData.employee_id}
                                                        className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-success w-full"
                                                        style={{ backgroundColor: '#7800ff' }}
                                                    >
                                                        <i className="ti ti-cloud-download"></i>Download Fixed Contract
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="overflow-auto">
                                            <table className="ti-custom-table  table-bordered ti-custom-table-head">
                                                <thead className="bg-gray-50 dark:bg-black/20">
                                                    <tr>
                                                        <th>S/No</th>
                                                        <th scope="col" className="!min-w-[13rem]">Document Name</th>
                                                        {/* <th scope="col">Files</th>
                                                        <th scope="col">Size</th> */}
                                                        <th scope="col">Modified Date</th>
                                                        <th scope="col" className="!text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(employeeDocument).length > 0 ? (
                                                        Object.values(employeeDocument).map((document, index) => (
                                                            <tr key={document.id}>
                                                                <td>{index + 1}</td>
                                                                <td className="font-medium">
                                                                    {document.doc_name}
                                                                </td>

                                                                <td>{document.doc_modified}</td>
                                                                <td>

                                                                    <button type="button" className="ti-btn ti-btn-success text-black" data-hs-overlay="#hs-overlay-top" onClick={() => handlePreviewClick(document.description)}><i className="ti ti-eye-check !text-white"></i>Preview
                                                                    </button>

                                                                    <div id="hs-overlay-top" className="hs-overlay hidden ti-offcanvas ti-offcanvas-top" tabIndex={-2}>
                                                                        <div className="ti-offcanvas-header">
                                                                            <h3 className="ti-offcanvas-title">
                                                                                Employee Person Document
                                                                            </h3>
                                                                            <button type="button" className="ti-btn flex-shrink-0 h-8 w-8 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-white/70 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-top">
                                                                                <span className="sr-only">Close modal</span>
                                                                                <i className="ti ti-x"></i>

                                                                            </button>
                                                                        </div>
                                                                        <div className="ti-offcanvas-body" style={{ width: '100%', height: '1800px' }}>
                                                                            <iframe src={documentUrl} width="100%" height="700px" title="Document Preview"></iframe>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))) : (
                                                        // Handle non-array case (e.g., show an error message)
                                                        <p>No assessed documents available.</p>
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
    );
};

export default ShowPaternity;
