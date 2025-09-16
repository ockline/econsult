import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ALLImages from "/src/common/imagesdata";
import ProfileService from "/src/common/profileservices";
import { HomeGallery } from "/src/component/advancedUi/filemanager/filedetails/filedetailscarcousel";
import { TagsInput } from "react-tag-input-component";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import ReviewAttachmentModal from "/src/component/industrialRelationship/PerfomanceReview/Modal/ReviewAttachmentModal";

const ShowReview = () => {
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


    const [formData, setEmployeeData] = useState([])

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${apiBaseUrl}/industrial_relationship/show_perfomance_review/${id}`)
            .then((res) => {
                // console.log('API Response:', res.data);  // Log the entire response
                setEmployeeData(res.data.show_perfomance);
                
                if (res.data.status === 404) {
                    Dangersweetalert()
                    navigate('/industrials/perfomance_reviews/'); 
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);


    //report
    const [performanceReviewReport, setPerformanceReviewReport] = useState([]);
    // const  getPerformanceReport = async() => {
    
     useEffect(() => {
        axios.get(`${apiBaseUrl}/industrial_relationship/retrieve_perfomance_review_report/${id}`)
            .then((res) => {
                setPerformanceReviewReport(res.data.performance_report);
                
                if (res.data.status === 404) {
                    Dangersweetalert()
                    navigate('/industrials/perfomance_reviews/'); 
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

    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <Helmet>
                <body class={ClassName}></body>
            </Helmet>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Perfomance Review </h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/perfomance_reviews/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/show_perfomance_review/${formData.employee_id}`}>Show Preformance Review

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
                                                Employee Name
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.employee_name}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Employer Name
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black font-medium">
                                                {formData.employer}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Perfomance Rate
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black text-secondary font-bold">
                                                {formData.overall_rating}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Review Date
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.review_date}
                                            </td>
                                        </tr>
                                         <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Review Status
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.status}
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
                                    role="tab"
                                ><i className="ti ti-user-circle font-semibold"></i>
                                    Employment Particulars
                                </button>
                                <button
                                    type="button"
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-1 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                    id="profile-item-2"
                                    data-hs-tab="#profile-2"
                                    aria-controls="profile-2"
                                    role="tab"
                                ><i className="ti ti-urgent font-semibold"></i>
                                    Performance Assessment
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
                                                    Job Title
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black font-medium">
                                                    {formData.job_title}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Review Number
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.review_number}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Department
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black text-info">
                                                    {formData.departments}
                                                </td>
                                            </tr>
                                             <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Strength 
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.strengths}
                                                </td>
                                            </tr>
                                             <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Area For Improvement
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.improvement_areas}
                                                </td>
                                            </tr>
                                         <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                Goals and Development Plan
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.improvement_plan}
                                                </td>
                                            </tr>
                                            
                                             <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Employee Comments
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.employee_comments}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Final Rating Approval
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.final_rating_approval}
                                                </td>
                                            </tr>
                                            
                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Performance Description
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">
                                                    {formData.review_description}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br />

                            </div>
                          
                            <div id="profile-2"
                              className="hidden text-center"
                                role="tabpanel"
                                aria-labelledby="profile-item-2"
                            >
                                
                                                               
                            
                                <div className="table-bordered rounded-md overflow-auto">
								<table className="ti-custom-table ti-custom-table-head">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr>
											<th scope="col" colSpan={ 1 }  className="py-3 ltr:pl-4 rtl:pr-4">
										       Category
                                                </th>
                                                <th scope="col" colSpan={ 1 }  className="py-3 ltr:pl-4 rtl:pr-4">
										       Criteria
                                                </th>
                                                <th scope="col" colSpan={ 6 }  className="py-3 ltr:pl-4 rtl:pr-4">
										       Rating (1 - 5)
                                                </th>
                                            </tr>
                                            <tr>
											<th scope="col" colSpan={ 2 }  className="py-3 ltr:pl-4 rtl:pr-4"></th>
											<th scope="col">Below Average (1) </th>
											<th scope="col">Average (2)</th>
											<th scope="col">Good (3)</th>
											<th scope="col">V.Good (4)</th>
                                            <th scope="col">Outstanding (5)</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th  rowSpan={3}>
												Job Knowledge & Skills
											</th>
											<td className=" ">Demonstrates necessary skills and expertise</td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-2" name="knowledge_skill_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)} value="1" className="ti-form-radio"
                                                            checked={formData.knowledge_skill_rating === 1}
                                                                                                                                                                                     />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-3" name="knowledge_skill_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                    checked={formData.knowledge_skill_rating === 2}
                                                                    />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-4" name="knowledge_skill_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                    checked={formData.knowledge_skill_rating === 3}
                                                                    />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-5" name="knowledge_skill_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)}
                                                                        checked={formData.knowledge_skill_rating === 4}
                                                                        value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-6" name="knowledge_skill_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                    checked={formData.knowledge_skill_rating === 5}
                                                                    />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
									<td className=" ">Keeps up-to-date with industry trends and
job knowledge.</td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="industry_knowledge_rating-1" name="industry_knowledge_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                     checked={formData.industry_knowledge_rating === 1}
                                                                    />
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-1"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                                    <input id="industry_knowledge_rating-2" name="industry_knowledge_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                     checked={formData.industry_knowledge_rating === 2}
                                                                    />
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-2"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="industry_knowledge_rating-3" name="industry_knowledge_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                    checked={formData.industry_knowledge_rating === 3}
                                                                    />
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-3"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="industry_knowledge_rating-4" name="industry_knowledge_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.industry_knowledge_rating === 4}
                                                                    />
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-4"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="industry_knowledge_rating-5" name="industry_knowledge_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                   checked={formData.industry_knowledge_rating === 5} 
                                                                    />
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-5"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
										<td className="font-medium">Applies knowledge effectively in the
workplace. </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-14" name="knowledge_effectively_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                    checked={formData.knowledge_effectively_rating === 1}
                                                                    />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-15" name="knowledge_effectively_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="2" className="ti-form-radio"
                                                             checked={formData.knowledge_effectively_rating === 2}       
                                                                    />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-16" name="knowledge_effectively_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                    checked={formData.knowledge_effectively_rating === 3}
                                                                    />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-17" name="knowledge_effectively_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.knowledge_effectively_rating === 4}
                                                                    />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-18" name="knowledge_effectively_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                    checked={formData.knowledge_effectively_rating === 5}
                                                                    />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>  
                                            </tr>
                                            {/* second */}
                                            <tr>
											<th  rowSpan={3}>
												Quality of Work
											</th>
											<td className=" ">Produces accurate and high-quality work.</td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-1" name="work_accuracy_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                    checked={formData.work_accuracy_rating === 1}
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-2" name="work_accuracy_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)}
                                                            checked={formData.work_accuracy_rating === 2}        
                                                                        value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-3" name="work_accuracy_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                    checked={formData.work_accuracy_rating === 2}
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-5" name="work_accuracy_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.work_accuracy_rating === 4}
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-6" name="work_accuracy_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                 checked={formData.work_accuracy_rating === 5}   
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Pays attention to detail and minimizes
errors</td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-1" name="attention_to_detail_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="1" className="ti-form-radio"
                                               checked={formData.attention_to_detail_rating === 1}                     
                                                                    />
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-1"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-2" name="attention_to_detail_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                    checked={formData.attention_to_detail_rating === 2}  
                                                                    />
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-2"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-3" name="attention_to_detail_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="3" className="ti-form-radio"
                                                          checked={formData.attention_to_detail_rating === 3}            
                                                                    />
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-3"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-4" name="attention_to_detail_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.attention_to_detail_rating === 4}  
                                                                    />
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-4"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-5" name="attention_to_detail_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="5" className="ti-form-radio"
                                                          checked={formData.attention_to_detail_rating === 5}            
                                                                    />
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-5"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Completes tasks to the required standard. </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_standards_rating-1" name="work_standards_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="1" className="ti-form-radio"
                                                      checked={formData.work_standards_rating === 1}                
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_standards_rating-2" name="work_standards_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="2" className="ti-form-radio"
checked={formData.work_standards_rating === 2} 
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_standards_rating-3" name="work_standards_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="3" className="ti-form-radio"
                                                       checked={formData.work_standards_rating === 3}              
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_standards_rating-4" name="work_standards_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="4" className="ti-form-radio"
                                                         checked={formData.work_standards_rating === 4}            
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                    <input id="work_standards_rating-5" name="work_standards_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                   checked={formData.work_standards_rating === 5}     
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-5"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>                                               
                                            </tr>
                                            {/* third */}
                                            <tr>
											<th  rowSpan={3}>
												Productivity & Efficiency
											</th>
											<td className=" ">Completes work on time and manages
workload effectively</td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="workload_management_rating-1" name="workload_management_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="1" className="ti-form-radio"
                                                            checked={formData.workload_management_rating === 1}        
                                                                    />
                                                            </div>
                                                            <label htmlFor="workload_management_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="workload_management_rating-2" name="workload_management_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="2" className="ti-form-radio"
                                                               checked={formData.workload_management_rating === 2}     
                                                                    />
                                                            </div>
                                                            <label htmlFor="workload_management_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="workload_management_rating-3" name="workload_management_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="3" className="ti-form-radio" 
checked={formData.workload_management_rating === 3}/>
                                                            </div>
                                                            <label htmlFor="workload_management_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                    <input id="workload_management_rating-4" name="workload_management_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                        checked={formData.workload_management_rating === 4} />
                                                            </div>
                                                            <label htmlFor="workload_management_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="workload_management_rating-5" name="workload_management_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="5" className="ti-form-radio" 
checked={formData.workload_management_rating === 5}/>
                                                            </div>
                                                            <label htmlFor="workload_management_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Demonstrates initiative and problemsolving ability</td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-1" name="problem_solving_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="1" className="ti-form-radio"
                                                       checked={formData.problem_solving_rating === 1 }          
                                                                    />
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-1"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-2" name="problem_solving_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="2"
                                                                        checked={formData.problem_solving_rating === 2}
                                                                        className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-2"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-3" name="problem_solving_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="3" className="ti-form-radio"
checked={formData.problem_solving_rating === 3 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-3"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-4" name="problem_solving_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.problem_solving_rating === 4 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-4"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-5" name="problem_solving_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                  checked={formData.problem_solving_rating === 5 }  
                                                                    />
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-5"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Works efficiently with minimal supervision </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-1" name="work_efficiency_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="1" className="ti-form-radio"
                                                             checked={formData.work_efficiency_rating === 1 } 
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-2" name="work_efficiency_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="2" className="ti-form-radio"
                                                               checked={formData.work_efficiency_rating === 2 }     
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-3" name="work_efficiency_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="3" className="ti-form-radio"
                                       checked={formData.work_efficiency_rating === 3 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-4" name="work_efficiency_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="4" className="ti-form-radio"
                                                        checked={formData.work_efficiency_rating === 4 }            
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-5" name="work_efficiency_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="5" className="ti-form-radio"
checked={formData.work_efficiency_rating === 5 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-5"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            <tr>
											<th  rowSpan={3}>
											Communication Skills
											</th>
											<td className=" ">Clearly and effectively communicates with colleagues and clients.</td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-1" name="communication_clarity_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="1" className="ti-form-radio"
                                                            checked={formData.communication_clarity_rating === 1 }     
                                                                    />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-2" name="communication_clarity_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="2" className="ti-form-radio"
                                            checked={formData.communication_clarity_rating === 2 }                  
                                                                    />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-3" name="communication_clarity_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="3" className="ti-form-radio"
                                            checked={formData.communication_clarity_rating === 3 }     
                                                                    />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-4" name="communication_clarity_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="4" className="ti-form-radio"
checked={formData.communication_clarity_rating === 4 }     
                                                                    />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-5" name="communication_clarity_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="5" className="ti-form-radio"
                                            checked={formData.communication_clarity_rating === 5 }                   
                                                                    />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Listens actively and responds appropriately.</td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-1" name="listening_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="1" className="ti-form-radio"
                                                       checked={formData.listening_skills_rating === 1 }               
                                                                    />
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-2"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-9" name="listening_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="2" className="ti-form-radio"
                                                         checked={formData.listening_skills_rating === 2 }           
                                                                    />
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-10" name="listening_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="3" className="ti-form-radio"
                                                  checked={formData.listening_skills_rating === 3 }                  
                                                                    />
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-11" name="listening_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="4" className="ti-form-radio"
                                                      checked={formData.listening_skills_rating === 4 }              
                                                                    />
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-12" name="listening_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="5" className="ti-form-radio"
                                                   checked={formData.listening_skills_rating === 5 }                 
                                                                    />
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Provides constructive feedback and shares
information effectively </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-1" name="feedback_sharing_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="1" className="ti-form-radio"
                                                   checked={formData.feedback_sharing_rating === 1 }                 
                                                                    />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-2" name="feedback_sharing_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="2" className="ti-form-radio"
                                                      checked={formData.feedback_sharing_rating === 2 }              
                                                                    />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-3" name="feedback_sharing_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="3" className="ti-form-radio"
                                                  checked={formData.feedback_sharing_rating === 3 }                  
                                                                    />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-4" name="feedback_sharing_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="4" className="ti-form-radio"
                                                       checked={formData.feedback_sharing_rating === 4 }             
                                                                    />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-5" name="feedback_sharing_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="5" className="ti-form-radio"
                                                             checked={formData.feedback_sharing_rating === 5 }       
                                                                    />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-5"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            <tr>
											<th  rowSpan={3}>
											Teamwork & Collaboration 
											</th>
											<td className=" ">Works well with colleagues and contributes
to team success.</td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-2" name="team_contribution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                    checked={formData.team_contribution_rating === 1 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-3" name="team_contribution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="2" className="ti-form-radio"
                                                       checked={formData.team_contribution_rating === 2 }             
                                                                    />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-4" name="team_contribution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="3" className="ti-form-radio"
checked={formData.team_contribution_rating === 3 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-5" name="team_contribution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="4" className="ti-form-radio"
                                                           checked={formData.team_contribution_rating === 4 }         
                                                                    />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-6" name="team_contribution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="5" className="ti-form-radio"
                                                     checked={formData.team_contribution_rating === 5 }               
                                                                    />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Shows respect and cooperation within the
team.</td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-8" name="cooperation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                checked={formData.cooperation_rating === 1 }

                                                                    />
                                                        </div>
                                                        <label htmlFor="cooperation_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-9" name="cooperation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="2" className="ti-form-radio"
                                                             checked={formData.cooperation_rating === 2 }       
                                                                    />
                                                        </div>
                                                        <label htmlFor="cooperation_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-10" name="cooperation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="3" className="ti-form-radio"
                                                      checked={formData.cooperation_rating === 3 }              
                                                                    />
                                                        </div>
                                                        <label htmlFor="cooperation_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-11" name="cooperation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="4" className="ti-form-radio"
                                                 checked={formData.cooperation_rating === 4 }                   
                                                                    />
                                                        </div>
                                                        <label htmlFor="cooperation_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-12" name="cooperation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="5" className="ti-form-radio"
                                                   checked={formData.cooperation_rating === 5 }                 
                                                                    />
                                                        </div>
                                                        <label htmlFor="cooperation_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Supports others and encourages a positive
work environment </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-14" name="work_environment_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="1" className="ti-form-radio"
                                                       checked={formData.work_environment_rating === 1 }             
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-15" name="work_environment_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="2" className="ti-form-radio"
                                                         checked={formData.work_environment_rating === 2 }             
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-16" name="work_environment_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="3" className="ti-form-radio"
checked={formData.work_environment_rating === 3 }  
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-17" name="work_environment_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="4" className="ti-form-radio"
                                                          checked={formData.work_environment_rating === 4 }            
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-18" name="work_environment_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="5" className="ti-form-radio"
                                                            checked={formData.work_environment_rating === 5 }          
                                                                    />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                                <tr>
											<th  rowSpan={3}>
											Attendance & Punctuality
											</th>
											<td className=" ">Regularly attends work and adheres to
company schedule</td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-2" name="attendance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                    checked={formData.attendance_rating === 1 }  
                                                                    />
                                                            </div>
                                                            <label htmlFor="attendance_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-3" name="attendance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="2" className="ti-form-radio"
                                                              checked={formData.attendance_rating === 2 }       
                                                                    />
                                                            </div>
                                                            <label htmlFor="attendance_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-4" name="attendance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                checked={formData.attendance_rating === 3 }     
                                                                    />
                                                            </div>
                                                            <label htmlFor="attendance_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-5" name="attendance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="4" className="ti-form-radio"
                                                          checked={formData.attendance_rating === 4 }           
                                                                    />
                                                            </div>
                                                            <label htmlFor="attendance_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-6" name="attendance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="5" className="ti-form-radio"
                                                            checked={formData.attendance_rating === 5 }         
                                                                    />
                                                            </div>
                                                            <label htmlFor="attendance_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Arrives on time and meets deadlines.</td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-8" name="punctuality_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="1" className="ti-form-radio"
                                                              checked={formData.punctuality_rating === 1 }       
                                                                    />
                                                        </div>
                                                        <label htmlFor="punctuality_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-9" name="punctuality_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="2" className="ti-form-radio"
                                                             checked={formData.punctuality_rating === 2 }         
                                                                    />
                                                        </div>
                                                        <label htmlFor="punctuality_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-10" name="punctuality_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="3" className="ti-form-radio"
                                                        checked={formData.punctuality_rating === 3 }              
                                                                    />
                                                        </div>
                                                        <label htmlFor="punctuality_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-11" name="punctuality_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="4" className="ti-form-radio"
                                                            checked={formData.punctuality_rating === 4 }          
                                                                    />
                                                        </div>
                                                        <label htmlFor="punctuality_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-12" name="punctuality_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                    checked={formData.punctuality_rating === 5 }  
                                                                    />
                                                        </div>
                                                        <label htmlFor="punctuality_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Notifies supervisor promptly about
absences. </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-14" name="absence_notification_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                  checked={formData.absence_notification_rating === 1 }    
                                                                    />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-15" name="absence_notification_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="2" className="ti-form-radio"
                                                              checked={formData.absence_notification_rating === 2 }       
                                                                    />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-16" name="absence_notification_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                  checked={formData.absence_notification_rating === 3 }   
                                                                    />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-17" name="absence_notification_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.absence_notification_rating === 4 } 
                                                                    />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-18" name="absence_notification_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                checked={formData.absence_notification_rating === 5 }     
                                                                    />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            <tr>
											<th  rowSpan={3}>
											Adaptability & Problem-Solving
											</th>
											<td className=" ">Adjusts well to changes and challenges.
</td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-2" name="adaptability_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                  checked={formData.adaptability_rating === 1 }   
                                                                    />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-3" name="adaptability_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                   checked={formData.adaptability_rating === 2 }  
                                                                    />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-4" name="adaptability_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                   checked={formData.adaptability_rating === 3 }  
                                                                    />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-5" name="adaptability_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.adaptability_rating === 4 } 
                                                                    />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-6" name="adaptability_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                    checked={formData.adaptability_rating === 6 } 
                                                                    />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>   
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Displays critical thinking and decision making abilities.
                                            </td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-8" name="decision_making_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                    checked={formData.decision_making_rating === 1 } 
                                                                    />
                                                        </div>
                                                        <label htmlFor="decision_making_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-9" name="decision_making_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                    checked={formData.decision_making_rating === 2 } />
                                                        </div>
                                                        <label htmlFor="decision_making_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-10" name="decision_making_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                    checked={formData.decision_making_rating === 3 } 
                                                                    />
                                                        </div>
                                                        <label htmlFor="decision_making_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-11" name="decision_making_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="4" className="ti-form-radio"
                                                              checked={formData.decision_making_rating === 4 }       
                                                                    />
                                                        </div>
                                                        <label htmlFor="decision_making_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-12" name="decision_making_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                    checked={formData.decision_making_rating === 5 } 
                                                                    />
                                                        </div>
                                                        <label htmlFor="decision_making_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Finds innovative solutions to work-related
problems </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-14" name="innovation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                    checked={formData.innovation_rating === 1 } 
                                                                    />
                                                            </div>
                                                            <label htmlFor="innovation_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-15" name="innovation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                   checked={formData.innovation_rating === 2 } 
                                                                    />
                                                            </div>
                                                            <label htmlFor="innovation_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-16" name="innovation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="3" className="ti-form-radio"
checked={formData.innovation_rating === 3 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="innovation_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-17" name="innovation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.innovation_rating === 4 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="innovation_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-18" name="innovation_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                    checked={formData.innovation_rating === 5 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="innovation_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            <tr>
											<th  rowSpan={3}>
											Customer Service (if applicable)
											</th>
											<td className=" ">Provides excellent service to clients/customers.</td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-2" name="customer_service_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                    checked={formData.customer_service_rating === 1 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-3" name="customer_service_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                     checked={formData.customer_service_rating === 2 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-4" name="customer_service_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                   checked={formData.customer_service_rating === 3 }  
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-5" name="customer_service_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                     checked={formData.customer_service_rating === 4 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-6" name="customer_service_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="5" className="ti-form-radio"
 checked={formData.customer_service_rating === 5 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Addresses client concerns professionally and efficiently.</td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-8" name="issue_resolution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                     checked={formData.issue_resolution_rating === 1 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-9" name="issue_resolution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                     checked={formData.issue_resolution_rating === 2 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-10" name="issue_resolution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                     checked={formData.issue_resolution_rating === 3 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-11" name="issue_resolution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                     checked={formData.issue_resolution_rating === 4 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-12" name="issue_resolution_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                     checked={formData.issue_resolution_rating === 5 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Strives to improve client satisfaction</td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-14" name="customer_satisfaction_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                     checked={formData.customer_satisfaction_rating === 1 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-15" name="customer_satisfaction_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                     checked={formData.customer_satisfaction_rating === 2 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-16" name="customer_satisfaction_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                     checked={formData.customer_satisfaction_rating === 3 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-17" name="customer_satisfaction_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                     checked={formData.customer_satisfaction_rating === 4 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-18" name="customer_satisfaction_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                     checked={formData.customer_satisfaction_rating === 5 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            
                           										<tr>
											<th  rowSpan={3}>
											Leadership & Initiative (For Supervisory Roles)
											</th>
											<td className=" ">Demonstrates strong leadership skills.</td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-2" name="leadership_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                     checked={formData.leadership_skills_rating === 1 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-3" name="leadership_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                    checked={formData.leadership_skills_rating === 2 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-4" name="leadership_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                    checked={formData.leadership_skills_rating === 3 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-5" name="leadership_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.leadership_skills_rating === 4 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-6" name="leadership_skills_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                    checked={formData.leadership_skills_rating === 5 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Motivates and guides team members effectively</td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-8" name="team_guidance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                    checked={formData.team_guidance_rating === 1 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-9" name="team_guidance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                    checked={formData.team_guidance_rating === 2 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-10" name="team_guidance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                    checked={formData.team_guidance_rating === 3}
                                                                    />
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-11" name="team_guidance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                    checked={formData.team_guidance_rating === 4 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-12" name="team_guidance_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                    checked={formData.team_guidance_rating === 5 }
                                                                    />
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Takes responsibility and makes sound decisions.</td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-14" name="decision_responsibility_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="1" className="ti-form-radio"
                                                                    checked={formData.decision_responsibility_rating === 1 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-15" name="decision_responsibility_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="2" className="ti-form-radio"
                                                                     checked={formData.decision_responsibility_rating === 2 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-16" name="decision_responsibility_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="3" className="ti-form-radio"
                                                                     checked={formData.decision_responsibility_rating === 3 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-17" name="decision_responsibility_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="4" className="ti-form-radio"
                                                                     checked={formData.decision_responsibility_rating === 4 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-18" name="decision_responsibility_rating"
                                                                        type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="5" className="ti-form-radio"
                                                                     checked={formData.decision_responsibility_rating === 5 }
                                                                    />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                          </tr>                                         
                                           
                                        <tr>
                                            <th className="" colSpan={2}>
												Overall Rating
											</th>
                                                <td colSpan={6} className="!p-2 text-black text-secondary font-bold">{ formData.overall_rating}</td>
                                               
											</tr>
									</tbody>
								</table>
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
                                                <button 
                                                    type="button" 
                                                    className="ti-btn ti-btn-success text-black" 
                                                    onClick={() => setShowModal(true)}
                                                >
                                                    <i className="ti ti-cloud-download !text-white"></i> Download Performance Review
                                                </button>

                                                <ReviewAttachmentModal 
                                                    showModal={showModal} 
                                                    onClose={() => setShowModal(false)} 
                                                    performanceReviewReport={performanceReviewReport} 
                                                />
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

export default ShowReview;
