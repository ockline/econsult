import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ALLImages from "/src/common/imagesdata";
import Select from "react-select";
import { ProfileHomeData } from "/src/common/select2data";
import ProfileService from "/src/common/profileservices";
import { HomeGallery } from "/src/component/advancedUi/filemanager/filedetails/filedetailscarcousel";
import { TagsInput } from "react-tag-input-component";
import { Helmet } from "react-helmet";
import axios from "axios";


const ShowTraining = () => {
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


    const [formData, setInductionTrainingData] = useState([])

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/induction/show_induction_training/${id}`)
            .then((res) => {
                // console.log('API Response:', res.data);  // Log the entire response
                setInductionTrainingData(res.data.induction_training);
                // console.log('data', res.data.employee);
                // setAssessedCandidateData(res.data.assessed_candidate);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);


    // /**   Block for document preview  */
    const [employeeDocument, setEmployeeDocument] = useState([]);
    const [documentUrl, setDocumentUrl] = useState('');

    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/get_employee_document/${id}`)
            .then((res) => {
                setEmployeeDocument(res.data.employee_document);
                // console.log(res.data.employee_document);
            })
            .catch((error) => {
                console.error('Error fetching candidate documents:', error);
            });
    }, [id]);

    const handlePreviewClick = (description) => {
        // Assuming the documents are stored in a specific folder on the server      
        const absoluteUrl = `${docBaseUrl}/employees/personal/${description}`;
        //   console.log('absoluteUrl', absoluteUrl);
        // Update the state with the document URL
        setDocumentUrl(absoluteUrl);

    };
    //handling spinner
    const [showSpinner, setShowSpinner] = useState(false);

    const handleLinkClick = async () => {
        // Show the spinner
        setShowSpinner(true);

        try {
            // Simulate an asynchronous operation (e.g., fetching the download link)
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Replace this with your actual link logic
            window.location.href = `${import.meta.env.BASE_URL}employees/personal/download_employee/` + formData.id;
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // Hide the spinner when the operation is complete (success or failure)
            setShowSpinner(false);
        }
    };

    
    function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
}
    
    
    return (
        <div>
            <Helmet>
                <body class={ClassName}></body>
            </Helmet>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Show Induction Training Details</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/induction/induction_trainning`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    {/* <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/personal/show_employee/${formData.id}`}>Employee Person Details

                        </a>
                    </li> */}
                </ol>
            </div>



            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 xxl:col-span-4">
                    <div className="box">
                        <div className="box-header">
                            <div className="flex justify-between items-center">
                                <h5 className="box-title justify-center">Basic Information</h5>
                            </div>
                        </div>
                        <div className="box-body py-3">
                            <div className="xl:overflow-hidden overflow-x-auto">
                                <table className="ti-custom-table border-0">
                                    <tbody>
                                        <tr className="">
                                            <td className="font-medium !p-2 text-black">
                                                Position Applied For
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2">
                                                {formData.job_title}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="font-bold !p-2 text-black">
                                                Employer Name
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2">
                                                {formData.employer_name}
                                            </td>
                                        </tr>
                                         <tr className="!border-0">
                                            <td className="font-bold !p-2 text-black">
                                                Employee Name
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2">
                                                {formData.employee_name}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="font-medium !p-2 text-black">
                                                Employer Address
                                                {/* <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse"><span>(if have cost center)</span></p> */}
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2">
                                                {formData.employer_address}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="font-medium !p-2 text-black">
                                                Employer Contact Person
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2">
                                                {formData.contact_personal}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="font-medium !p-2 text-black">
                                               Employer`s Contact Person
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2">
                                                {formData.personal_contacts}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="font-medium !p-2 text-black">
                                                Employer Contact Designation
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2">
                                                {formData.personal_designation}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="font-medium !p-2 text-black">
                                              Employment Start Date
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2">
                                                {formData.employment_date}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="font-medium !p-2 text-black">
                                                Manager / Supervisor
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-secondary">
                                                {formData.reporting_to}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="font-medium !p-2 text-black">
                                              Department / Section
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2">
                                                {formData.department}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-12 xxl:col-span-8">
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
                                    Induction Details
                                </button>
                                {/* <button
                                    type="button"
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-1 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                    id="profile-item-2"
                                    data-hs-tab="#profile-2"
                                    aria-controls="profile-2"
                                    role="tab"
                                ><i className="ti ti-urgent font-semibold"></i>
                                    Employment Histories
                                </button> */}
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
                                <div className="overflow-auto">
                                    <table className="ti-custom-table border-0 whitespace-nowrap ti-head-primary">
                                        <thead>
                                            <tr >
                                                <th colSpan={1} className="text-center text-black font-bold text-medium">Name</th>
                                                <th colSpan={2} className="text-center text-black font-bold text-medium">Status</th>
                                                {/* <th colSpan={2} className="text-center text-black font-bold text-medium">Name/Remark</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                   Explanantion Of the Business
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={1} >
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="relative-inside" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.military_service}</label></td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                    Introduce Key People
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={1}>
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="relative-inside" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.marital}</label></td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                    Employment Condition
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={1}>
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="relative-inside" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.genders}</label></td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}></td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                    Employee Remuneration
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}>
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="relative-inside" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.driving}</label></td> 
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                    Health and Safety 
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={1}>
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="relative-inside" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.chronic_disease}</label></td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                    Show the Environment
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={1}>
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="surgery_operation" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.surgery_operation}</label></td>
                                               
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium " colSpan={1}>
                                                    Apropos Training 
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={1}>
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="relative-inside" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.relative_working}</label></td>
                                                {formData.relative_working === 'Yes' &&
                                                    (
                                                        <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}>Name: &nbsp;{formData.relative_name}</td>
                                                    )
                                                }


                                            </tr>
                                     
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                    Follow-up Review
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={1}>
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="employed_before" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.employed_before}</label></td>
                                               
                                            </tr >
                                           
                                            <tr className="!border-0 text-black font-bold text-medium">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>Comments Follow-Up</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    {formData.comments}
                                                </td>
                                                {/* <td className="!p-2 !text-gray-500 dark:!text-white/70">Reference Name:  </td> */}
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />

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
                                                <div className="text-center" id="spinner" style={{ display: showSpinner ? 'block' : 'none' }}>
                                                    <div
                                                        className="ti-spinner text-primary"
                                                        role="status"
                                                        aria-label="loading"
                                                        style={{ width: '100px', height: '100px' }} // Adjust the size as needed
                                                    >
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </div>

                                                <div className="md:ltr:ml-auto md:rtl:mr-auto">
                                                    <button
                                                        onClick={handleLinkClick}
                                                        className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-success w-full"
                                                        style={{ backgroundColor: '#7800ff' }}
                                                    >
                                                        <i className="ti ti-cloud-download"></i>Download Person Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="overflow-auto">
                                            <table className="ti-custom-table  table-bordered ti-custom-table-head">
                                                <thead className="bg-gray-50 dark:bg-black/20">
                                                    <tr>
                                                        <th>S/No</th>
                                                        <th scope="col" className="!min-w-[13rem]">Document Name</th>
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
                                                                <td>{formatDate(document.doc_modified)}</td>
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

                                {/* <Link
                                        to="#"
                                        className="ti-btn ti-btn-primary py-1 px-2 m-0"
                                    >
                                        View more
                                    </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowTraining;
