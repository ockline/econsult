import React, { useEffect, useState } from "react";
import ALLImages from "../../../../common/imagesData";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import "../../../../../src/assets/css/print-style.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PersonalDetail = () => {
    const print = () => {
        window.print();
    };
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [formData, setEmployeeData] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        const res = axios
            .get(`${apiBaseUrl}/employees/show_employee/${id}`)
            .then(
                (res) => {
                    setEmployeeData(res.data.employee);
                    console.log(res.data.employee)
                },
                [id]
            );
    });
  
    const idToShow = formData.national_id || formData.passport_id || '';

    //block to return Education ****************************************************************
    const [educationData, setEducationHistoryData] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/education_history/${id}`)
            .then((res) => {
                setEducationHistoryData(res.data.education_history); // wrap the object in an array
                // console.log("dataa", ' ', res.data.education_history);
            })
            .catch((error) => {
                console.error('Error fetching practical data:', error);
            });
    }, [id]);

    // block for employement *******************************************************
    const [employmentData, setEmploymentData] = useState([])
    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/edit_employment_employee/${id}`)
            .then((res) => {
               
                setEmploymentData(res.data.employment_history); // Assuming "education_history" is correct
        // console.log("dataa", ' ', res.data.employment_history);
            })
            .catch((error) => {
                console.error('Error fetching practical data:', error);
            });
    }, [id]);

    
    // block for Employmant reference check *************************************************************
    const [referenceCheck, setReferenceCheckData] = useState([]);
       useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/edit_reference_employee/${id}`)
            .then((res) => {
               
                setReferenceCheckData(res.data.reference_check); // Assuming "education_history" is correct
        // console.log("dataa", ' ', res.data.reference_check);
            })
            .catch((error) => {
                console.error('Error fetching practical data:', error);
            });
    }, [id]);

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
            <PageHeader
                currentpage="Download Details"
                activepage="Pages"
                mainpage="Download Details"
            />
            <div className="grid grid-cols-12 gap-6  mx-auto ">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <form className="printable-content">
                                <div className="flex flex-col lg:flex-row justify-between mb-5 space-y-4">
                                    <div>
                                        <div className="mb-2">
                                            <img src={ALLImages('logo')} alt="logo" className="flex dark:hidden" />
                                            <img src={ALLImages('dark')} alt="logo" className="hidden dark:flex" />
                                        </div>
                                        <div className="mt-1">{formData.employer_name}</div>
                                        <div className="mt-1">P.O. Box 283</div>

                                    </div>
                                    <div className="text-center">
                                        <div className="mt-1" ><h1 className="text-2xl text-black uppercase font-semibold">TECHNICAL INTERVIEW</h1> </div>
                                        <div className="mt-1 uppercase font-semibold"><h1 className="text-2xl text-black uppercase font-semibold">ASSESSMENT REPORT</h1></div>
                                    </div>
                                    <div className="text-end">
                                        <div className="mb-2">
                                            <img src={ALLImages('logo')} alt="logo" className="flex dark:hidden" />
                                            <img src={ALLImages('dark')} alt="logo" className="hidden dark:flex" />
                                        </div>
                                        <h3 className="text-2xl text-primary uppercase font-semibold">Invoice</h3>
                                    </div>
                                </div>
                                {/* <hr className="pb-5  font-semibold" /> */}
                                
                                <div className="pb-5 font-semibold">
                                    <hr className="border-t border-black" />
                                </div>
                            {/* <div className="container" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}> */}
                                <div className="sm:grid grid-cols-12 gap-12 pb-5 space-y-5">
                                    <div className="md:col-span-12 col-span-12  my-auto">

                                        <table className="w-full border-collapse !border border-gray-300">
                                            <tbody>
                                                <tr>
                                                    {/* Left Column - Bio Data */}
                                                    <td className="p-4 !border-r border-gray-300">
                                                        <div>
                                                            <h4 className="text-xl text-black font-semibold flex items-center">
                                                                Position Applied for :{' '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <span className="text-md font-medium text-gray-700" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>
                                                                    &nbsp;&nbsp;{formData.job_title}&nbsp;&nbsp;
                                                                </span>
                                                            </h4>
                                                            <br />
                                                            <h4 className="text-xl text-black font-semibold flex items-center">
                                                                Name in English :{' '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <span className="text-md font-medium text-gray-700" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>
                                                                    &nbsp;&nbsp;{formData.employee_name}&nbsp;&nbsp;
                                                                </span>
                                                            </h4>
                                                            <br />
                                                            <h4 className="text-xl text-black font-semibold flex items-center">
                                                                Name in other language :{' '}&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <span className="text-md font-medium text-gray-700" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>
                                                                    &nbsp;&nbsp;{formData.name_language}&nbsp;&nbsp;
                                                                </span>
                                                            </h4>
                                                            <br />
                                                            <h4 className="text-xl text-black font-semibold flex items-center">
                                                                Present Address :{' '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <span className="text-md font-medium text-gray-700" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>
                                                                    &nbsp;&nbsp;{formData.present_address}&nbsp;&nbsp;
                                                                </span>
                                                            </h4>
                                                            <br />
                                                            <h4 className="text-xl text-black font-semibold flex items-center">
                                                                Nationality :{' '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <span className="text-md font-medium text-gray-700" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>
                                                                    &nbsp;&nbsp;{formData.nationality}&nbsp;&nbsp;
                                                                </span>
                                                            </h4>
                                                        </div>




                                                        {/* ... other bio data fields */}
                                                    </td>

                                                    {/* Right Column - Passport Information Frame */}
                                                    <td className="p-4">

                                                        {/* Passport frame */}
                                                        <div className="border border-gray-300 p-4 float-end" style={{ width: '200px', height: '230px', border: '2px solid black' }}>
                                                            {/* Add your passport form fields here */}
                                                            <div className="mb-4">
                                                                <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 text-center">
                                                                    photo
                                                                </label>

                                                            </div>

                                                            {/* ... other passport fields */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <h4 className="text-xl text-black font-semibold flex items-center">
                                    Telephone No:{' '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="text-md font-medium text-gray-700" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>
                                        &nbsp;&nbsp;{formData.telephone_home}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    Office:&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="text-md font-medium text-gray-700" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>
                                        {formData.telephone_office}
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    Mobile:&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="text-md font-medium text-gray-700" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>
                                        {formData.mobile_number}
                                    </span>
                                </h4>

                                <br />
                                {/* <h4 className="text-xl text-black font-semibold flex items-center">
                                    Date of birth:{' '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="text-md font-medium text-gray-700" style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>{formData.dob}</span></h4> */}
                                <br />
                                <div className="grid lg:grid-cols-2 gap-6 space-y-4 lg:space-y-0">
                                    <div className="space-y-2">
                                        <div className="col-span-4 lg:col-span-3 sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 ">
                                            <label className="w-32 ti-form-label mb-0 text-xl text-black font-semibold">Date of birth:</label>
                                            <input type="text" className="ti-form-inpu text-center text-md font-medium text-gray-700" value={formData.dob} style={{ border: '2px solid black' }} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="col-span-8 lg:col-span-3 sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                                            <label className="w-32 ti-form-label mb-0 text-xl text-black font-semibold">National/Passport ID No:</label>
                                            <input
                                                type="text"
                                                className="ti-form-input text-center text-md font-medium text-gray-700"
                                                value={idToShow}
                                                style={{ border: '2px solid black' }}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="overflow-auto">
                                    <table className="ti-custom-table border-0 whitespace-nowrap ti-head-primary">
                                   
                                        
                                        <tbody>
                                             <tr className="!border-0">
                                                <td
                                                    className="!p-2  mb-0 text-bold text-black font-semibold text-lg "
                                                    colSpan={1}
                                                >
                                                    Military Service:
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-yes"
                                                        checked={
                                                            formData.military_service ===
                                                            "Completed"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                      Completed
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-no"
                                                        checked={
                                                            formData.military_service ===
                                                            "Didnt Attend"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Didnt Attend
                                                    </label>
                                                </td>

                                               {formData.military_service == 'Completed' &&
                                                    (<td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}>
                                                    <h3 className="text-bold text-black font-semibold text-lg ">Number: &nbsp;<span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.military_number}</span></h3>
                                                </td>)
                                                }
                                            </tr>
                                             <tr className="!border-0">
                                                <td
                                                    className="!p-2  mb-0 text-bold text-black font-semibold text-lg "
                                                    colSpan={1}
                                                >
                                                    Marital status:
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-yes"
                                                        checked={
                                                            formData.marital ===
                                                            "Married"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                      Married
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-no"
                                                        checked={
                                                            formData.marital ===
                                                            "Single"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Single
                                                    </label>
                                                </td>

                                              {formData.marital === "Married" && (
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">Spause name: <span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.spause_name}</span></h3>  </td>
                                                )
                                                }
                                            </tr>
                                              <tr className="!border-0">
                                                <td
                                                    className="!p-2  mb-0 text-bold text-black font-semibold text-lg "
                                                    colSpan={1}>
                                                Gender
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-yes"
                                                        checked={
                                                            formData.genders ===
                                                            "Male"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Male
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-no"
                                                        checked={
                                                            formData.genders ===
                                                            "Female"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Female
                                                    </label>
                                                </td>

                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={2}
                                                >
                                                 
                                                </td>
                                            </tr>
                                                <tr className="!border-0">
                                                <td
                                                    className="!p-2  mb-0 text-bold text-black font-semibold text-lg "
                                                    colSpan={1}
                                                >
                                                    Do you have Driving license?:
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-yes"
                                                        checked={
                                                            formData.driving ===
                                                            "Light"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                      Light
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-no"
                                                        checked={
                                                            formData.driving ===
                                                            "Heavy"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Heavy
                                                    </label>
                                                     &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-no"
                                                        checked={
                                                            formData.driving ===
                                                            "Equipment"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Equipment
                                                    </label>
                                                     &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-no"
                                                        checked={
                                                            formData.driving ===
                                                            "None"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        None
                                                    </label>
                                                </td>

                                              {formData.driving !== "None" && (
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">place of issue: <span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.place_issued}</span></h3>  </td>
                                                )
                                                }
                                            </tr>
                                          
                                            <tr className="!border-0">
                                                <td
                                                    className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]"
                                                    colSpan={1}
                                                >
                                                    Do you Suffer from any
                                                    Chronic disease?
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="chronic_disease-yes"
                                                        checked={
                                                            formData.chronic_disease ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="chronic_disease-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="chronic_disease-no"
                                                        checked={
                                                            formData.chronic_disease ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="chronic_disease-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                                
                                                 {formData.chronic_disease === "Yes" && (
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">Chronic name:<span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.chronic_remark}</span></h3>  </td>
                                                )
                                                }
                                            </tr>
                                            <tr className="!border-0">
                                                <td
                                                    className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]"
                                                    colSpan={1}
                                                >
                                                    Did you have any Surgery
                                                    Operation before?
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="surgery_operation-yes"
                                                        checked={
                                                            formData.surgery_operation ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="surgery_operation-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="surgery_operation-no"
                                                        checked={
                                                            formData.surgery_operation ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="surgery_operation-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                              
                                                 {formData.surgery_operation === "Yes" && (
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">Name:<span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.surgery_remark}</span></h3>  </td>
                                                )
                                                }
                                            </tr>
                                         
                                            <tr className="!border-0">
                                                <td
                                                    className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]"
                                                    colSpan={1}
                                                >
                                                    Have you ever been employed
                                                    <br /> by this company
                                                    before?
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="employed_before-yes"
                                                        checked={
                                                            formData.employed_before ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="employed_before-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="employed_before-no"
                                                        checked={
                                                            formData.employed_before ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="employed_before-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                                 {formData.employed_before === "Yes" && (
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">From:<span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.from_date}</span></h3>  </td>
                                                )
                                                }
                                            </tr>
                                            {formData.employed_before === "Yes" && (
                                                <tr className="!border-0">
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">To:<span className="!text-gray-500 dark:!text-white/70">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.to_date}</span></h3>
                                                    </td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">Position:<span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.position}</span></h3>
                                                    </td>
                                               </tr> )
                                                }
                                              <tr className="!border-0">
                                                <td
                                                    className="!p-2  mb-0 text-bold text-black font-semibold text-lg "
                                                    colSpan={1}
                                                >
                                                    Relatibe Inside the Company
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-yes"
                                                        checked={
                                                            formData.relative_working ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-no"
                                                        checked={
                                                            formData.relative_working ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>

                                                    {formData.relative_working === "Yes" && (
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">Relative name:<span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.relative_name}</span></h3>  </td>
                                                )
                                                }
                                            </tr>
                                            {formData.relative_working === "Yes" && (
                                                <tr className="!border-0">
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">Relation:<span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.relation}</span></h3>  </td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><h3 className="text-bold text-black font-semibold text-lg ">Department:<span className="!text-gray-500 dark:!text-white/70">&nbsp;{formData.former_department}</span></h3>  </td>
                                                </tr>
                                                    )
                                                }
                                            <tr></tr>
                                        </tbody>
                                    </table>
                                    <br />

                                </div>
                                <br />
                                 <div className="table-bordered rounded-md overflow-auto" >
                                        <h2 className="text-lg text-black font-semibold ">Education history</h2>
                                        <table className="ti-custom-table ti-custom-table-head" >
                                            <thead className="bg-gray-50 dark:bg-black/20" >
                                                <tr style={{ border: '2px solid black' }}>
                                                    <th scope="col" colSpan={1} className="py-3 ltr:pl-4 rtl:pr-4 text-lg text-black font-semibold " style={{ border: '2px solid black' }}> Education Level </th>
                                                    <th scope="col" colSpan={1} className="!text-center text-lg text-black font-semibold " style={{ border: '2px solid black' }}>Institute name</th>
                                                    <th scope="col" colSpan={1} className="!text-center text-lg text-black font-semibold " style={{ border: '2px solid black' }}>Graduation Year</th>
                                                    <th scope="col" colSpan={1} className="!text-center text-lg text-black font-semibold " style={{ border: '2px solid black' }}>Major</th>
                                                    <th scope="col" colSpan={1} className="!text-center text-lg text-black font-semibold " style={{ border: '2px solid black' }}>Based In (Degree in)</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {Array.isArray(educationData) && educationData.map((education, index) => (
                                        
                                                    <tr key={index} style={{ border: '2px solid black' }}>
                                                        <td colSpan={1}  className="text-md font-medium text-gray-700 " style={{ border: '2px solid black' }}>{education.education}</td>
                                                       <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>
                                                            {education.institute_name === "Other" ? (
                                                                <span>{education.other_institute}</span>
                                                            ) : (
                                                                <span>{education.institute_name}</span>
                                                            )}
                                                        </td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{education.graduation_year}</td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{education.major}</td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{education.course}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                <br />
                                <br/>
                                    {/* Employment History */}
                                    <div className="table-bordered rounded-md overflow-auto" >
                                         <h3 className="text-lg text-black font-semibold ">Employment history starting with your most recent employer // Company can conduct reference check</h3>
                                        <table className="ti-custom-table ti-custom-table-head" >
                                            <thead className="bg-gray-50 dark:bg-black/20">
                                                <tr >
                                                     <th className="!text-center text-xl text-black font-semibold " style={{ border: '2px solid black' }}>S/No</th>
                                                    <th scope="col" colSpan={1} className="py-3 ltr:pl-4 rtl:pr-4 text-xl text-black" style={{ border: '2px solid black' }}>
                                                        Company name
                                                    </th>
                                                    <th scope="col" colSpan={1} className="!text-center text-black text-xl" style={{ border: '2px solid black' }}>From</th>
                                                    <th scope="col" colSpan={1} className="!text-center text-xl text-black font-semibold" style={{ border: '2px solid black' }}>To</th>
                                                    <th scope="col" colSpan={1} className="!text-center text-xl text-black font-semibold" style={{ border: '2px solid black' }}>Position</th>
                                                    <th scope="col" colSpan={1} className="!text-center text-xl text-black font-semibold"  style={{ border: '2px solid black' }}>Salary</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(employmentData) && employmentData.map((employment, index) => (
                                        
                                                    <tr key={index}>
                                                        <td className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{index + 1}</td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{employment.company_name}</td>
                                                       <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{employment.from_date}</td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{employment.to_date}</td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{employment.position}</td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{employment.salary}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                </div>
                                <br />
                                <br/>
                                    {/* Employment Reference check */}
                                  
                                    <div className="table-bordered rounded-md overflow-auto">
                                          <h3 className="text-lg text-black font-semibold ">Employment Reference Check / Please Share your Previos Direct MAnager Contact Details</h3>
                                        <table className="ti-custom-table ti-custom-table-head" >
                                            <thead className="bg-gray-50 dark:bg-black/20">
                                                <tr>
                                                     <th className="text-xl text-black font-semibold " style={{ border: '2px solid black' }}>S/No</th>
                                                    <th scope="col" colSpan={1} className="py-3 ltr:pl-4 rtl:pr-4 text-xl text-black font-semibold " style={{ border: '2px solid black' }}>
                                                        Referee name
                                                    </th>
                                                    <th scope="col" colSpan={1} className="!text-center text-xl text-black font-semibold " style={{ border: '2px solid black' }}>Referee Title</th>
                                                    <th scope="col" colSpan={1} className="!text-center text-xl text-black font-semibold " style={{ border: '2px solid black' }}>Referee Address</th>
                                                    <th scope="col" colSpan={1} className="!text-center text-xl text-black font-semibold " style={{ border: '2px solid black' }}>Referee Contact</th>
                                                    <th scope="col" colSpan={1} className="!text-center text-xl text-black font-semibold " style={{ border: '2px solid black' }}>Referee Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(referenceCheck) && referenceCheck.map((reference, index) => (
                                        
                                                    <tr key={index}>
                                                        <td className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{index + 1}</td>
                                                        <td colSpan={1}  className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{reference.referee_name}</td>
                                                       <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}> {reference.referee_title}</td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{reference.referee_address}</td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{reference.referee_contact}</td>
                                                        <td colSpan={1} className="text-md font-medium text-gray-700" style={{ border: '2px solid black' }}>{reference.referee_email}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                <br />
                                


                              

                               
                                <br />


                                {/* <hr className="pb-5 dark:border-t-white/10" /> */}
                                <div className="sm:grid grid-cols-12 gap-6 pb-5 space-y-5">
                                    <div className="lg:col-span-12 col-span-12  ">
                                        <h3 className="font-bold text-center text-2xl text-black " style={{ borderBottom: '2px solid black', paddingBottom: '1px' }}>DECLARATION</h3>
                                        <div className="text-lg text-black ">I hereby declare, under my full responsibility, that all data described in this application are correct, and if any of these statements do not match the facts or incorrect this is a direct cause of dismissal prior notice and without liability</div>
                                    </div>
                                    
                                </div>
                                 <div className= "sm:grid grid-cols-12 gap-6 pb-5 space-y-5">
								<div className= "lg:col-span-4 col-span-12 text-end ">
									<div className= "text-3xl text-primary text-center">...........................</div>
									<h3 className= "font-semibold text-center">Signature of Applicant</h3>
								</div>
								<div className= "lg:col-span-4 col-span-12 text-end ">
									<div className= "text-3xl text-primary text-center">...........................</div>
									<h3 className= "font-semibold text-center">Date</h3>
								</div>
							</div>
                            
                            </form>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="w-20 !p-1 ti-btn ti-btn-primary"
                                    onClick={print}
                                >
                                    {" "}
                                    Print
                                </button>

                                <Link
                                    to={
                                        `${import.meta.env.BASE_URL
                                        }hiring/hrinterview/show_assessment/` +
                                        id
                                    }
                                ></Link>
                                <button
                                    type="button"
                                    className="w-20 !p-1 ti-btn ti-btn-danger"
                                ><a className="flex items-center text-white hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/recruitments/technical/show_candidate/${formData.id}`}> Cancel

                                    </a>

                                </button>

                            </div>
                        
                       
                           
                        </div>
                    </div>
                </div>
            </div>
        </div >
        
    );
};
export default PersonalDetail;
