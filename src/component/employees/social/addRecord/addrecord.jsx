
import React, { useState, useEffect } from "react";
import { JobTitleData, RegionData, DistrictData, UsersData, WardData, DepartmentData, RankingCriterialData, EmployeeDependent, EmployeeRelative, DependantTypeData } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";
import Swal from "sweetalert2";



const AddSocialRecord = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        employee_id: '',
        district_id: '',
        department_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        national_id: '',
        expiration_date: '',
        passport_id: '',
        military_service: '',
        military_number: '',
        marital_status: '',
        children_no: '',
        gender: '',
        telephone_home: '',
        mobile_number: '',
        person_email: '',
        employee_street: '',
        postal_address: '',
        tin: '',
        section: '',
        city_id: '',
        ward_id: '',
        remark: '',
        military_attach: null,
        osha_report_doc: null,
        marriage_cert: null,
        children_certificate: null,
        error_list: [],
    });
    //fetch employee data'
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/social/get_social_record/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.employee,
            };
            setFormData(updatedFormData);
            // console.log(updatedFormData);
        });
    }, [id])

    const handleFileInputChange = (fieldName, files) => {
        // const file = files[0]; // Assuming single file selection, update accordingly for multiple files

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: files,
        }));
    };


    const handleInputChange = (stepName, value) => {
        if (value instanceof File) {
            // Handle file input change
            handleFileInputChange(stepName, [value]);
        } else {
            // Handle other input types
            setFormData((prevData) => ({
                ...prevData,
                [stepName]: value,
                error_list: { ...prevData.error_list, [stepName]: null },
            }));
        }
    };

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        // Handle form submission logic here
        e.preventDefault();
        // console.log('Form submitted:', formData);
        const DataToSend = {
            // employee_id: formData.employee_id,
            district_id: formData.district_id,
            department_id: formData.department_id,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            national_id: formData.national_id,
            expiration_date: formData.expiration_date,
            military_service: formData.military_service,
            military_number: formData.military_number,
            marital_status: formData.marital_status,
            children_no: formData.children_no,
            gender: formData.gender,
            telephone_home: formData.telephone_home,
            mobile_number: formData.mobile_number,
            person_email: formData.person_email,
            employee_street: formData.employee_street,
            postal_address: formData.postal_address,
            tin: formData.tin,
            section: formData.section,
            city_id: formData.city_id,
            ward_id: formData.ward_id,
            remark: formData.remark,
            employee_id: formData.id,
            military_attach: formData.military_attach,
            osha_report_doc: formData.osha_report_doc,
            children_certificate: formData.children_certificate,
            marriage_cert: formData.marriage_cert,
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/employees/social/add_social_record`, DataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (resp.data.validator_err) {
                // Handle validation errors
                const validationErrors = resp.data.validator_err;

                // Update component state with validation errors
                setFormData((prevData) => ({
                    ...prevData,
                    error_list: validationErrors,
                }));
                // Format validation errors for display in SweetAlert
                const formattedErrors = Object.keys(validationErrors).map((field) => (
                    `${validationErrors[field].join(', ')}`
                )).join('\n');

                swal({
                    title: 'Sorry! Operation failed',
                    text: formattedErrors,
                    icon: 'error',
                    button: 'OK',
                });
            } else if (resp.data.status === 500) {
                swal({
                    title: 'Sorry! Operation failed',
                    text: resp.data.message,
                    icon: 'warning',
                    button: 'ok',
                })
                // Additional logic or state updates after successful update
            } else if (resp.data.status === 200) {
                swal({
                    title: 'Social Record Created Successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                });
                // .then(() => {

                // This code will be executed after the "ok" button is clicked and the modal is closed
                // navigate('/employees/personal/employee_list/'); // Call the navigate function to redirect to the specified route
                // });
            }
        }
        catch (error) {
            console.error("Unexpected error:", error.message);
        };
    };
    // Job title  *********************
    const [job_titles, setJobTitles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const job_title = await JobTitleData();
                setJobTitles(job_title);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };
        fetchData();
    }, []);

    // Region  *********************

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const region = await RegionData();
                setRegions(region);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);


    // District  *********************

    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const district = await DistrictData();
                setDistricts(district);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);

    //postcode & ward
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ward = await WardData();
                setWards(ward);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    // RankingCriterialData block *******************************
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rankings = await RankingCriterialData();
                setRankings(rankings);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    // Users names block *******************************
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await UsersData();
                setUsers(users);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);

    //Departments  ******************************
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dept = await DepartmentData();
                setDepartments(dept);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    //Dependanttpye or relativeness  ******************************
    const [relationships, setDependantType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const relative = await DependantTypeData();
                setDependantType(relative);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);


    function Style2() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Complete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5e76a6',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Save it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Social Record Saved!',
                    'Social Record completed Successfully.',
                    'success'
                ).then(() => {
                    navigate('/employees/socialrecords/details/');
                })

            }
        })
    }

    //Block to update Education && Employement history && Reference check

    const [relativeData, setRelativeDetailData] = useState({

        relative_id: '',
        relative_name: '',
        relative_number: '',
        relationship_id: '',
        other_relationship: '',
        relative_address: '',

    });
    const clearRelativeData = () => {
        setRelativeDetailData({
            relative_id: '',
            relative_name: '',
            relative_number: '',
            relationship_id: '',
            other_relationship: '',
            relative_address: '',
        });
    };


    const handleFileRelativeInputChange = (fieldName, files) => {
        setRelativeDetailData((prevData) => ({
            ...prevData,
            [fieldName]: files, // assuming you only want to handle single file inputs
        }));
    };

    const handleRelativeInputChange = (fieldName, value) => {
        if (value instanceof File) {
            // Handle file input change
            handleFileRelativeInputChange(fieldName, [value]);
        } else {
            // Handle other input types
            setRelativeDetailData((prevData) => ({
                ...prevData,
                [fieldName]: value,
                error_list: { ...prevData.error_list, [fieldName]: null },
            }));

            // Assuming 'relative_id' is the field for the ID
            if (fieldName === 'relative_id') {
                // Do something with the captured ID, for example, update the form state
                updateFormState({ relative_id: value });
            }
        }
    };


    const SaveRelativeDetail = async (e) => {
        e.preventDefault();

        const relativeDetail = {
            employee_id: formData.id,

            relative_id: relativeData?.relative_id,
            relative_number: relativeData?.relative_number,
            relationship_id: relativeData?.relationship_id,
            other_relationship: relativeData.other_relationship,
            relative_name: relativeData?.relative_name,
            relative_address: relativeData?.relative_address,

        }
        console.log('dataaa', relativeDetail);

        try {
            const res = await axios.post(`${apiBaseUrl}/employees/social/add_relative`, relativeDetail, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.data.validator_err) {
                // Handle validation errors
                const validationErrors = res.data.validator_err;

                // Update component state with validation errors
                setRelativeDetailData((prevData) => ({
                    ...prevData,
                    error_list: validationErrors,
                }));
            }
            else if (res.data.status === 500) {
                swal({
                    title: 'Sorry! Operation failed',
                    text: res.data.message,
                    icon: 'warning',
                    button: 'ok',
                });
            } else if (res.data.status === 200) {
                swal({
                    title: 'Relative details added Successfully',
                    text: res.data.message,
                    icon: 'success',
                    button: 'ok',
                }).then(() => {

                    clearRelativeData();
                });
            }
        } catch (error) {
            console.log('Error occurred:', error);

            if (error.response && error.response.status === 404) {
                console.log('Handling 404 error in catch block');
                swal({
                    title: 'Resource Not Found',
                    text: 'The requested resource was not found on the server.',
                    icon: 'error',
                    button: 'ok',
                })
            } else {
                console.error("Unexpected error:", error.message);
            }
        }
    }
    // Employemnt History saveEmploymentHistory   **********************************************


    const [dependantData, setDependantDetailData] = useState(
        {
            dependant_name: '',
            dependent_id: '',
            other_relationship: '',
            dob: '',
            dependant_type_id: '',
            description: '',


        }
    )



    const clearDependantData = () => {
        setDependantDetailData({
            dependant_name: '',
            dependent_id: '',
            other_relationship: '',
            dob: '',
            dependant_type_id: '',
            description: '',
            
        });
    };



    const handleFileDependantInputChange = (fieldName, files) => {
        setDependantDetailData((prevData) => ({
            ...prevData,
            [fieldName]: files, // assuming you only want to handle single file inputs
        }));
    };

    const handleDependantInputChange = (fieldName, value) => {
        if (value instanceof File) {
            // Handle file input change
            handleFileDependantInputChange(fieldName, [value]);
        } else {
            // Handle other input types
            setDependantDetailData((prevData) => ({
                ...prevData,
                [fieldName]: value,
                error_list: { ...prevData.error_list, [fieldName]: null },
            }));

            // Assuming 'relative_id' is the field for the ID
            if (fieldName === 'relative_id') {
                // Do something with the captured ID, for example, update the form state
                updateFormState({ relative_id: value });
            }
        }
    };

    const saveDependantDetail = async (e) => {
        e.preventDefault();
        const DependantData = {

            dependant_name: dependantData.dependant_name,
            employee_id: formData.id,
            dependent_id: dependantData.dependent_id,
            other_relationship: dependantData.other_relationship,
            dob: dependantData.dob,
            dependant_type_id: dependantData.dependant_type_id,
            description: dependantData.description

        }
        try {
            const res = await axios.post(`${apiBaseUrl}/employees/social/add_dependant`, DependantData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.data.validator_err) {
                // Handle validation errors
                const validationErrors = res.data.validator_err;

                // Update component state with validation errors
                setDependantDetailData((prevData) => ({
                    ...prevData,
                    error_list: validationErrors,
                }));
            }
            else if (res.data.status === 500) {
                swal({
                    title: 'Sorry! Operation failed',
                    text: res.data.message,
                    icon: 'warning',
                    button: 'ok',
                });
            } else if (res.data.status === 200) {
                swal({
                    title: 'Dependant Detail added Successfully',
                    text: res.data.message,
                    icon: 'success',
                    button: 'ok',
                }).then(() => {

                    clearDependantData();
                });
            }
        } catch (error) {
            console.log('Error occurred:', error);

            if (error.response && error.response.status === 404) {
                console.log('Handling 404 error in catch block');
                swal({
                    title: 'Resource Not Found',
                    text: 'The requested resource was not found on the server.',
                    icon: 'error',
                    button: 'ok',
                })
            } else {
                console.error("Unexpected error:", error.message);
            }
        }
    }



    return (
        <div>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Add Social Record Details</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/socialrecords/details/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/socialrecords/add_record/${formData.id}`}>
                            Edit Employee Details
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>


            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Add Employee Social Record</h1>
                    <Link to={`${import.meta.env.BASE_URL}employees/socialrecords/details/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                        {step === 1 && (

                            <div className="grid lg:grid-cols-3 gap-6">

                                <div className=" space-y-2">
                                </div>
                                <div className=" space-y-2">
                                    <h2 className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                                    >
                                        First Page
                                        <span className="badge py-0.5 px-1.5 bg-black/50 text-white">1</span>
                                    </h2>
                                </div>
                                <div className=" space-y-2">
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">FirstName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="firstname" className="my-auto ti-form-input" placeholder="Employee firstname" value={formData.firstname}
                                        onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.firstname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">MiddleName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="middlename" className="my-auto ti-form-input" placeholder="Middlename" value={formData.middlename}
                                        onChange={(e) => handleInputChange('middlename', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.middlename}</span>
                                </div> <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">LastName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="lastname" className="my-auto ti-form-input" value={formData.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} placeholder="Employee Lastname" required />
                                    <span className="text-danger">{formData.error_list.lastname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department Name <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="department_id" options={departments} onChange={(selectedOption) => handleInputChange(["department_id"], selectedOption ? selectedOption.value : null)} value={departments.find((option) => option.value === formData.department_id)} required />
                                    <span className="text-danger">{formData.error_list.department_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Section </label>
                                    <input type="text" name="section" className="my-auto ti-form-input" value={formData.section}
                                        onChange={(e) => handleInputChange('section', e.target.value)} placeholder="Present address" required />

                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Marital Status<span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="marital_status" onChange={(e) => handleInputChange('marital_status', e.target.value)} value="1" className="ti-form-radio" id="marital_status" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Married</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="marital_status" onChange={(e) => handleInputChange('marital_status', e.target.value)} value="2" className="ti-form-radio" id="marital_status-1" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Single</span>
                                        </label>
                                    </div>

                                </div>
                                {formData.marital_status === '1' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Name of spouse</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Name of spouse" name="spause_name" value={formData.spause_name}
                                                onChange={(e) => handleInputChange('spause_name', e.target.value)} />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg ">Certificate of marriage</label>
                                            <input type="file" name="marriage_cert" id="small-file-input"
                                                onChange={(e) => handleFileInputChange('marriage_cert', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />

                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Number of children</label>
                                            <input type="number" className="my-auto ti-form-input" placeholder="Number of children" name="children_no" value={formData.children_no}
                                                onChange={(e) => handleInputChange('children_no', e.target.value)} />
                                        </div>
                                        <div className="space-y-2" id="attachment">
                                            <label className="ti-form-label mb-0 font-bold text-lg ">Child Certificate combined (max size 2MB)</label>
                                            <input type="file" name="children_certificate" id="small-file-input" onChange={(e) => handleFileInputChange('children_certificate', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                        </div>
                                    </>
                                )}
                                <div className="space-y-2" id="military-sevice">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Military Services<span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="military_service" onChange={(e) => handleInputChange('military_service', e.target.value)} value="1" className="ti-form-radio" id="military_service" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70" >Completed</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="military_service" onChange={(e) => handleInputChange('military_service', e.target.value)} value="2" className="ti-form-radio" id="military_service-1" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Didn't Attend</span>
                                        </label>
                                    </div>
                                </div>

                                {formData.military_service === '1' && (
                                    <>
                                        <div className="space-y-2" id="military-number">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Military number </label>
                                            <input type="number" name="military_number" className="my-auto ti-form-input" value={formData.military_number} onChange={(e) => handleInputChange('military_number', e.target.value)} placeholder="Military number" required />
                                        </div>

                                        <div className="space-y-2" id="attachment">
                                            <label className="ti-form-label mb-0 font-bold text-lg ">Military Attachment (max size 2MB)</label>
                                            <input type="file" name="military_attach" id="small-file-input" onChange={(e) => handleFileInputChange('military_attach', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                        </div>
                                    </>
                                )}

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">National id number(NIDA)  <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="national_id" className="my-auto ti-form-input" value={formData.national_id}
                                        onChange={(e) => handleInputChange('national_id', e.target.value)} placeholder="passport id" required />
                                    <span className="text-danger">{formData.error_list.national_id}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">National ID Expiration Date  </label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="expiration_date" className="my-auto ti-form-input"
                                            placeholder="" value={new Date(formData.expiration_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('expiration_date', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.expiration_date}</span>
                                    </div>

                                </div>

                                {/* Rest of Step 1 form fields */}
                            </div>
                        )}

                        {step === 2 && (

                            <div className="grid lg:grid-cols-3 gap-6 second-page none" id="new_page">
                                <div className=" space-y-2">
                                </div>
                                <div className=" space-y-2">
                                    <h2 className="relative py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                                    >
                                        Second Page
                                        <span className="badge py-0.5 px-1.5 bg-black/50 text-white">2</span>
                                    </h2>
                                </div>
                                <div className="space-y-2"></div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">
                                        TIN No                                        number <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="tin" className="my-auto ti-form-input" value={formData.tin}
                                        onChange={(e) => handleInputChange('tin', e.target.value)} placeholder="Telephone mobile number" required />
                                    <span className="text-danger">{formData.error_list.tin}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Personal E-mail Address <span style={{ color: "red" }}> *</span></label>
                                    <input type="email" name="person_email" className="my-auto ti-form-input" value={formData.person_email}
                                        onChange={(e) => handleInputChange('person_email', e.target.value)} placeholder="you@site.com" required />
                                    <span className="text-danger">{formData.error_list.person_email}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Mobile number <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="mobile_number" className="my-auto ti-form-input" value={formData.mobile_number}
                                        onChange={(e) => handleInputChange('mobile_number', e.target.value)} placeholder="Telephone mobile number" required />
                                    <span className="text-danger">{formData.error_list.mobile_number}</span>

                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Home Phone number <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="telephone_home" className="my-auto ti-form-input" value={formData.telephone_home}
                                        onChange={(e) => handleInputChange('telephone_home', e.target.value)} placeholder="Telephone home number" required />
                                    <span className="text-danger">{formData.error_list.telephone_home}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">City <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="city_id" options={regions} onChange={(selectedOption) => handleInputChange(["city_id"], selectedOption ? selectedOption.value : null)} value={regions.find((option) => option.value === formData.city_id)} />
                                    <span className="text-danger">{formData.error_list.city_id}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">District <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="district_id" options={districts} onChange={(selectedOption) => handleInputChange(["district_id"], selectedOption ? selectedOption.value : null)} value={districts.find((option) => option.value === formData.district_id)} />
                                    <span className="text-danger">{formData.error_list.district_id}</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Ward Name</label>
                                    <Creatable classNamePrefix="react-select" name="ward_id" options={wards} onChange={(selectedOption) => handleInputChange(["ward_id"], selectedOption ? selectedOption.value : null)} value={wards.find((option) => option.value === formData.ward_id)} />
                                    <span className="text-danger">{formData.error_list.ward_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Postal Address <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="postal_address" className="my-auto ti-form-input" value={formData.postal_address}
                                        onChange={(e) => handleInputChange('postal_address', e.target.value)} placeholder="Postal address" required />
                                    <span className="text-danger">{formData.error_list.postal_address}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Street name <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employee_street" className="my-auto ti-form-input" value={formData.employee_street}
                                        onChange={(e) => handleInputChange('employee_street', e.target.value)} placeholder="street name" required />
                                    <span className="text-danger">{formData.error_list.employee_street}</span>
                                </div>
                                <div className="space-y-2" id="attachment">
                                    <label className="ti-form-label mb-0 font-bold text-lg ">Osha Report Attachment (max size 2MB)</label>
                                    <input type="file" name="osha_report_doc" id="small-file-input" onChange={(e) => handleFileInputChange('osha_report_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                    <span className="text-danger">{formData.error_list.osha_report_doc}</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Any Other Information for emergence </label>
                                    <input type="text" name="remark" className="my-auto ti-form-input" value={formData.remark}
                                        onChange={(e) => handleInputChange('remark', e.target.value)} placeholder="ny Other Information for emergence" required />

                                </div>
                            </div>
                        )}

                        <br />
                        <div>
                            {step > 1 && step < 2 && (
                                <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
                                    <i className="ti ti-arrow-narrow-left"></i>Previous
                                </button>
                            )}
                            {step > 1 && (
                                <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
                                    <i className="ti ti-arrow-narrow-left"></i>Previous
                                </button>
                            )}

                            {step < 2 && (
                                <button type="button" onClick={handleNextStep} className="ti-btn ti-btn-primary first_page justify-center">
                                    <i className="ti ti-arrow-narrow-right"></i>Next
                                </button>
                            )}

                            {step === 2 && (
                                <div className="float-end">
                                    <button type="button" onClick={handleSubmit} className="ti-btn ti-btn-secondary  justify-center">
                                        <i className="ti ti-layout-grid-add"></i>save Social record
                                    </button>
                                    <Link to="#" className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-primary m-0 whitespace-nowrap" data-hs-overlay="#task-compose" style={{ backgroundColor: '#619162' }}>
                                        <i className="ti ti-database"></i>Add Relative details
                                    </Link>&nbsp;
                                    <Link to="#" className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-primary m-0 whitespace-nowrap" data-hs-overlay="#dependent-people" >
                                        <i className="ti ti-user-check"></i>Add Dependent
                                    </Link>&nbsp;
                                    <Link to="#" className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-success m-0 whitespace-nowrap" id="confirm-btn" onClick={Style2}>
                                        <i className="ri ri-send-plane-2-fill"></i>Submit to Complete
                                    </Link>
                                </div>
                            )}
                        </div>
                    </form>

                    {/* Relative block */}
                    <div id="task-compose" className="hs-overlay hidden ti-modal">
                        <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out sm:!max-w-6xl">
                            <div className="ti-modal-content">
                                <div className="ti-modal-header">
                                    <h3 className="ti-modal-title  mb-0 font-bold text-lg justify-center" > Employee Relative Details</h3>
                                    <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#task-compose">
                                        <span className="sr-only">Close</span>
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                                <div className="ti-modal-body">
                                    <div className="grid lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Relative number <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="relative_id" options={EmployeeRelative} onChange={(selectedOption) => handleRelativeInputChange(["relative_id"], selectedOption ? selectedOption.value : null)} value={EmployeeRelative.find((option) => option.value === relativeData.relative_id)} required/>
                                             {/* <span className="text-danger">{relativeData.error_list.relative_id}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Relative Name</label>
                                            <input type="text" name="relative_name" className="ti-form-input" placeholder="Relative Name" value={relativeData.relative_name}
                                                onChange={(e) => handleRelativeInputChange('relative_name', e.target.value)} required />
                                            {/* <span className="text-danger">{relativeData.error_list.relative_name}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Relative Phone Mobile Number<span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="relative_number" className="ti-form-input" placeholder="Relative Mobile Number" value={relativeData.relative_number}
                                                onChange={(e) => handleRelativeInputChange('relative_number', e.target.value)} required />
                                             {/* <span className="text-danger">{relativeData.error_list.relative_number}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Relationship<span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="relationship_id" options={relationships} onChange={(selectedOption) => handleRelativeInputChange(["relationship_id"], selectedOption ? selectedOption.value : null)} value={relationships.find((option) => option.value === relativeData.relationship_id)} />
                                            {/* <span className="text-danger">{relativeData.error_list.relationship_id}</span> */}
                                        </div>
                                        {relativeData.relationship_id === 16 &&
                                            (<div className="space-y-2">
                                                <label className="ti-form-label mb-0 font-bold text-lg">Other Relationship</label>
                                                <input type="text" name="other_relationship" className="ti-form-input" placeholder="write Other if not listed" value={relativeData.other_relationship}
                                                    onChange={(e) => handleRelativeInputChange('other_relationship', e.target.value)} required />
                                            </div>)

                                        }
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Relatives Address<span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="relative_address" className="ti-form-input" placeholder="p.o.box 2xxx" value={relativeData.relative_address}
                                                onChange={(e) => handleRelativeInputChange('relative_address', e.target.value)} required />
                                            {/* <span className="text-danger">{relativeData.error_list.relative_address}</span> */}
                                        </div>

                                        <br />
                                        <div className="ti-modal-footer">
                                            <button type="button"
                                                className="hs-dropdown-toggle ti-btn ti-border font-medium bg-warning text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10 float-end"
                                                data-hs-overlay="#task-compose">
                                                Close
                                            </button>
                                            <Link className="ti-btn ti-btn-primary float-right" to="#" onClick={(e) => SaveRelativeDetail(e)}>
                                                Create
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Dependent people */}
                    <div id="dependent-people" className="hs-overlay hidden ti-modal">
                        <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out sm:!max-w-6xl">
                            <div className="ti-modal-content">
                                <div className="ti-modal-header">
                                    <h3 className="ti-modal-title  mb-0 font-bold text-lg justify-center" > Employee Dependent Details</h3>
                                    <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#dependent-people">
                                        <span className="sr-only">Close</span>
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                                <div className="ti-modal-body">
                                    <div className="grid lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Dependent number <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="dependent_id" options={EmployeeDependent} onChange={(selectedOption) => handleDependantInputChange(["dependent_id"], selectedOption ? selectedOption.value : null)} value={EmployeeDependent.find((option) => option.value === dependantData.dependent_id)} />
                                                         {/* <span className="text-danger">{dependantData.error_list.dependent_id}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Dependent Name<span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="dependant_name" className="ti-form-input" placeholder="Dependent Name" value={dependantData.dependant_name}
                                                onChange={(e) => handleDependantInputChange('dependant_name', e.target.value)} required />
                                            {/* <span className="text-danger">{dependantData.error_list.dependant_name}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Dependent Relationship<span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="dependant_type_id" options={relationships} onChange={(selectedOption) => handleDependantInputChange(["dependant_type_id"], selectedOption ? selectedOption.value : null)} value={relationships.find((option) => option.value === dependantData.dependant_type_id)} />
                                            {/* <span className="text-danger">{dependantData.error_list.dependant_type_id}</span> */}
                                        </div>
                                        {dependantData.dependant_type_id === 16 && (
                                    <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Dependent Relation name</label>
                                            <input type="text" name="other_relationship" className="ti-form-input" placeholder="Dependent relation if not listed" value={dependantData.other_relationship}
                                                onChange={(e) => handleDependantInputChange('other_relationship', e.target.value)} required />
                                        </div>
)}
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Date of birth<span style={{ color: "red" }}> *</span></label>
                                            <div className="flex rounded-sm overflow-auto">
                                                <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                                    <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                        className="ri ri-calendar-line"></i></span>
                                                </div>
                                                <input
                                                    type="date" name="dob" className="my-auto ti-form-input"
                                                    placeholder="" value={new Date(dependantData.dob).toLocaleDateString('en-CA')} // Format the date
                                                    onChange={(e) => handleDependantInputChange('dob', e.target.value)} required
                                                />
                                                {/* <span className="text-danger">{dependantData.error_list.dob}</span> */}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Note or Remark</label>
                                            <input type="text" name="description" className="ti-form-input" placeholder="Note or Remark " value={dependantData.description}
                                                onChange={(e) => handleDependantInputChange('description', e.target.value)} required />
                                        </div>

                                        <br />
                                        <div className="ti-modal-footer">
                                            <button type="button"
                                                className="hs-dropdown-toggle ti-btn ti-border font-medium bg-warning text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
                                                data-hs-overlay="#dependent-people">
                                                Close
                                            </button>
                                            <Link className="ti-btn ti-btn-primary" to="#" onClick={(e) => saveDependantDetail(e)}>
                                                Create
                                            </Link>
                                        </div>
                                    </div>


                                    <div className="ti-modal-footer-1 sm:flex !block space-y-2 text-end">
                                        <button type="button"
                                            className="hs-dropdown-toggle ti-btn ti-border font-medium bg-success text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10 float-left"
                                            data-hs-overlay="#dependent-people">
                                            Finish Dependent
                                        </button>

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
export default AddSocialRecord;
