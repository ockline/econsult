import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ALLImages from "/src/common/imagesdata";
import ProfileService from "/src/common/profileservices";
import { HomeGallery } from "/src/component/advancedUi/filemanager/filedetails/filedetailscarcousel";
import { TagsInput } from "react-tag-input-component";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";


const ShowContractDetails = () => {
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
        axios.get(`${apiBaseUrl}/contracts/required/show_contract_detail/${id}`)
            .then((res) => {
                // console.log('API Response:', res.data);  // Log the entire response
                setEmployeeData(res.data.contract_detail);
                // console.log('data', res.data.contract_detail);
                if (res.data.status === 404) {
                    Dangersweetalert()

                    // This code will be executed after the "ok" button is clicked and the modal is closed
                    navigate('/contracts/required_details/'); // Call the navigate function to redirect to the specified route

                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);




    // Dependant updateDependanHistory   **********************************************


    const [dependantData, setDependantDetailData] = useState([])
    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/social/edit_dependant_detail/${id}`)
            .then((res) => {

                setDependantDetailData(res.data.dependant_detail); // Assuming "education_history" is correct
                // console.log("dataa", ' ', res.data.dependant_detail);
            })
            .catch((error) => {
                console.error('Error fetching practical data:', error);
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
        axios.get(`${apiBaseUrl}/contracts/required/get_contract_document/${id}`)
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
        const absoluteUrl = `${docBaseUrl}/contracts/details/${id}/${description}`;
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
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Show Contract Details</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/required_details/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/required/show_detail/${formData.id}`}>Show Contract Details

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
                                        <tr className="">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Full Name
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black font-medium">
                                                {formData.employee_name}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Employer / Company Name
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.employer}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Contract Type
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black text-secondary font-bold">
                                                {formData.contract_type}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Birth Place
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.birth_place}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Date of birth
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.dob}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Age
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.age}
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
                                    role="tab"
                                ><i className="ti ti-user-circle font-semibold"></i>
                                    Contract Details
                                </button>
                                <button
                                    type="button"
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-1 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                    id="profile-item-2"
                                    data-hs-tab="#profile-2"
                                    aria-controls="profile-2"
                                    role="tab"
                                ><i className="ti ti-urgent font-semibold"></i>
                                    Next of Kin
                                </button>
                                <button
                                    type="button"
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                    id="profile-item-3"
                                    data-hs-tab="#profile-3"
                                    aria-controls="profile-3"
                                    role="tab"
                                ><i className="ti ti-folders font-semibold"></i>
                                    Documents Center
                                </button>

                            </nav>
                        </div>
                        <div className="box-body">
                            <div
                                id="profile-1"
                                className=""
                                role="tabpanel"
                                aria-labelledby="profile-item-1"
                            >
                                <div className="xl:overflow-hidden overflow-x-auto">
                                    <table className="ti-custom-table border-0">
                                        <tbody>
                                            <tr className="">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Residence Place
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black font-medium">
                                                    {formData.residence_place}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Permanent Residence
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.permanent_residence}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Email Address
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black text-info">
                                                    {formData.email}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Postal Address
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.postal_address}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Phone Number
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.phone_number}
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
                                                    Work Station
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.work_station}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Date Employed
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.date_employed}
                                                </td>

                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Gender
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="relative-inside" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.gender}</label>
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
                                      <h3 className="text-black front-medium font-bold ">Next of Kin Details</h3>
                                    <div className="table-bordered rounded-md overflow-auto">
                                      
                                        <table className="ti-custom-table ti-custom-table-head" >
                                            <thead className="bg-gray-50 dark:bg-black/20">
                                                <tr>
                                                    <th style={{ backgroundColor: '#ddbff0' }}>S/No</th>
                                                    <th scope="col" colSpan={1} className="py-3 ltr:pl-4 rtl:pr-4" style={{ backgroundColor: '#ddbff0' }}>
                                                        Full name
                                                    </th>
                                                    <th scope="col" colSpan={1} className="!text-center" style={{ backgroundColor: '#ddbff0' }}>Recidence Place</th>
                                                    <th scope="col" colSpan={1} className="!text-center" style={{ backgroundColor: '#ddbff0' }}>Phone Number</th>
                                                    <th scope="col" colSpan={1} className="!text-center" style={{ backgroundColor: '#ddbff0' }}>Relationship / Lerativeness</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {Array.isArray(dependantData) && dependantData.map((dependant, index) => ( */}

                                                    <tr >
                                                        <td>1</td>
                                                        <td colSpan={1} className="">{formData.fullname_next1}</td>
                                                    <td colSpan={1} className="">{formData.residence1}</td>
                                                        <td colSpan={1} >{formData.phone_number1}</td>
                                                        <td colSpan={1} >{formData.relationship}</td>
                                                </tr>
                                                      <tr >
                                                        <td>2</td>
                                                        <td colSpan={1} className="">{formData.fullname_next2}</td>
                                                    <td colSpan={1} className="">{formData.residence2}</td>
                                                        <td colSpan={1} >{formData.phone_number2}</td>
                                                        <td colSpan={1} >{formData.relationship2}</td>
                                                </tr>
                                                {/* ))} */}
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
                                aria-labelledby="profile-item-4"
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
                                                    to={`${import.meta.env.BASE_URL}contracts/required/download_contract_detail/` + formData.employee_id}
                                                  className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-success w-full"
                                                        style={{ backgroundColor: '#7800ff' }}
                                                >
                                                    <i className="ti ti-cloud-download"></i>Download Personnel Application
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
                                        {/* <div className="py-1 ltr:float-right rtl:float-left">
                                            <nav className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <Link className="text-gray-500 dark:text-white/70 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md" to="#">
                                                    <span aria-hidden="true">«</span>
                                                    <span className="sr-only">Previous</span>
                                                </Link>
                                                <Link className="w-10 h-10 bg-primary text-white p-4 inline-flex items-center text-sm font-medium rounded-full" to="#" aria-current="page">1</Link>
                                                <Link className="w-10 h-10 text-gray-500 dark:text-white/70 hover:text-primary p-4 inline-flex items-center text-sm font-medium rounded-full" to="#">2</Link>
                                                <Link className="w-10 h-10 text-gray-500 dark:text-white/70 hover:text-primary p-4 inline-flex items-center text-sm font-medium rounded-full" to="#">3</Link>
                                                <Link className="text-gray-500 dark:text-white/70 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md" to="#">
                                                    <span className="sr-only">Next</span>
                                                    <span aria-hidden="true">»</span>
                                                </Link>
                                            </nav>
                                        </div> */}
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

export default ShowContractDetails;
