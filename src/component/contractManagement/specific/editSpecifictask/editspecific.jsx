
import React, { useState, useEffect } from "react";
import { EmployerData, JobTitleData, DepartmentData, Banking } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import axios from "axios";
import Swal from "sweetalert2";
import moment from 'moment';
import TimePicker from 'rc-time-picker';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';



const EditSpecifiTaskContract = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    const formatTime = (dateString) => {
        // Check if the dateString is a valid date string
        if (!dateString || isNaN(new Date(dateString))) {
            return ''; // Return an empty string or handle the error as needed
        }
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        employee_id: '',
        employer_name: '',
        employee_name: '',
        job_title_id: '',
        department_id: '',
        reg_number: '',
        phone_number: '',
        email: '',
        bank_name: '',
        bank_account_no: '',
        bank_account_name: '',
        residence_place: '',
        nssf_number: '',
        dob: '',
        gender: '',
        supervisor: '',
        place_recruitment: '',
        work_station: '',
        start_date: '',
        expected_end_date: '',
        monthly_salary: '',
        basic_salary: '',
        house_allowance: '',
        meal_allowance: '',
        transport_allowance: '',
        risk_bush_allowance: '',
        normal_working: '',
        ordinary_working: '',
        working_from: new Date(),
        working_to: '',
        saturday_from: '',
        saturday_to: '',
        night_shift: '',
        night_working_from: '',
        night_working_to: '',
        night_shift_hours: '',
        job_description_doc: null,
        specific_contract_signed: null,
        error_list: [],
    });
    //fetch contract details data'
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiBaseUrl}/contracts/specific/edit_specific_task/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.specific_task,
            };
            setFormData(updatedFormData);
            console.log(updatedFormData);
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
            name: formData.name,
            employer_name: formData.employer_name,
            employee_name: formData.employee_name,
            job_title_id: formData.job_title_id,
            phone_number: formData.phone_number,
            reg_number: formData.reg_number,
            email: formData.email,
            dob: formData.dob,
            place_recruitment: formData.place_recruitment,
            work_station: formData.work_station,
            start_date: formData.start_date,
            end_start_date: formData.end_start_date,
            basic_salary: formData.basic_salary,
            house_allowance: formData.house_allowance,
            meal_allowance: formData.meal_allowance,
            transport_allowance: formData.transport_allowance,
            risk_bush_allowance: formData.risk_bush_allowance,
            normal_working: formData.normal_working,
            ordinary_working: formData.ordinary_working,
            working_from: formData.working_from,
            working_to: formData.working_to,
            saturday_from: formData.saturday_from,
            saturday_to: formData.saturday_to,
            employee_id: formData.employee_id,
            night_shift: formData.night_shift,
            night_working_from: formData.night_working_from,
            night_working_to: formData.night_working_to,
            night_shift_hours: formData.night_shift_hours,
            bank_name: formData.bank_name,
            bank_account_no: formData.bank_account_no,
            bank_account_name: formData.bank_account_name,
            gender: formData.gender,
            supervisor: formData.supervisor,
            residence_place: formData.residence_place,
            nssf_number: formData.nssf_number,
            expected_end_date: formData.expected_end_date,
            department_id: formData.department_id,
            monthly_salary: formData.monthly_salary,
            job_description_doc: formData.job_description_doc,
            specific_contract_signed: formData.specific_contract_signed,
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/contracts/specific/update_specific_task/${id}`, DataToSend, {
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
                    title: 'Specific Task Contract Updated Successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                })
                    .then(() => {
                        // This code will be executed after the "ok" button is clicked and the modal is closed
                        // navigate('/contracts/specific/specific_task_contracts/'); // Call the navigate function to redirect to the specified route
                    });
            }
        }
        catch (error) {
            console.error("Unexpected error:", error.message);
        };
    };


    // employers  *********************
    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employer = await EmployerData();
                setEmployers(employer);
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

    // // Parse the string into a Date object


    // // Function to format time
    // const formatTime = (dateString) => {
    //   // Check if the dateString is a valid date string
    //   if (!dateString || isNaN(new Date(dateString))) {
    //     return ''; // Return an empty string or handle the error as needed
    //   }
    //   const date = new Date(dateString);
    //   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    // };




    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Edit Employee Specific Task Contract</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/specific/specific_task/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/specific/edit_specific_task/${formData.employee_id}`}>
                            Update Specitic Task
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Update Specific Task Contract</h1>
                    <Link to={`${import.meta.env.BASE_URL}contracts/specific/specific_task/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Name of Employee  <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employee_name" className="my-auto ti-form-input text-black text-lg" placeholder="And (Employee name)" value={formData.employee_name}
                                        onChange={(e) => handleInputChange('employee_name', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.employee_name}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Position - <span style={{ color: "darkgrey " }}> ({formData.job_title} )</span></label>
                                    <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} />
                                    <span className="text-danger">{formData.error_list.job_title_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Registration Number <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="reg_number" className="my-auto ti-form-input text-black text-lg" placeholder="Employee registration number" value={formData.reg_number}
                                        onChange={(e) => handleInputChange('reg_number', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.reg_number}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Residence Place <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="residence_place" className="my-auto ti-form-input text-black text-lg" placeholder="Employer name" value={formData.residence_place}
                                        onChange={(e) => handleInputChange('residence_place', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.residence_place}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Nssf Number <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="nssf_number" className="my-auto ti-form-input text-black text-lg" placeholder="Employee nssf number" value={formData.nssf_number}
                                        onChange={(e) => handleInputChange('nssf_number', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.nssf_number}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Bank Name - <span style={{ color: "darkgrey " }}> ({formData.bank_name} )</span></label>
                                    <Creatable classNamePrefix="react-select" name="bank_name" options={Banking} onChange={(selectedOption) => handleInputChange(["bank_name"], selectedOption ? selectedOption.value : null)} value={Banking.find((option) => option.value === formData.bank_name)} />
                                    <span className="text-danger">{formData.error_list.bank_name}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Bank Account Number  <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="bank_account_no" className="my-auto ti-form-input text-black text-lg" placeholder="Employer Account Number" value={formData.bank_account_no}
                                        onChange={(e) => handleInputChange('bank_account_no', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.bank_account_no}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Bank Account Name <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="bank_account_name" className="my-auto ti-form-input text-black text-lg" placeholder="Employer name" value={formData.bank_account_name}
                                        onChange={(e) => handleInputChange('bank_account_name', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.bank_account_name}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employer Name <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employer_name" className="my-auto ti-form-input text-black text-lg" placeholder="Employer name" value={formData.employer_name}
                                        onChange={(e) => handleInputChange('employer_name', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.employer_name}</span> */}
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Date of Birth <span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="dob" className="my-auto ti-form-input text-black text-lg"
                                            placeholder="" value={new Date(formData.dob).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('dob', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.dob}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Mobile Number<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Mobile number" name="phone_number" value={formData.phone_number}
                                        onChange={(e) => handleInputChange('phone_number', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Gender <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="gender" value="Male" className="ti-form-radio" id="gender" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Male</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="gender" value="Female" className="ti-form-radio" id="hs-radio-checked-in-form" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Female</span>
                                        </label>
                                    </div>
                                    <span className="text-danger">{formData.error_list.gender}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Start Date <span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="start_date" className="my-auto ti-form-input text-black text-lg"
                                            placeholder="" value={new Date(formData.start_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('start_date', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.start_date}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Expected Date to End <span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="expected_end_date" className="my-auto ti-form-input text-black text-lg"
                                            placeholder="" value={new Date(formData.expected_end_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('expected_end_date', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.expected_end_date}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Place of Recruitment<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Place of recruitment" name="place_recruitment" value={formData.place_recruitment}
                                        onChange={(e) => handleInputChange('place_recruitment', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Place of Work <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Working station" name="work_station" value={formData.work_station}
                                        onChange={(e) => handleInputChange('work_station', e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department - <span style={{ color: "darkgrey " }}> ({formData.department_id} )</span></label>
                                    <Creatable classNamePrefix="react-select" name="department_id" options={departments} onChange={(selectedOption) => handleInputChange(["department_id"], selectedOption ? selectedOption.value : null)} value={departments.find((option) => option.value === formData.department_id)} />
                                    <span className="text-danger">{formData.error_list.department_id}</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Supervisor<span style={{ color: "red" }}> *</span> </label>
                                    <input type="text" name="supervisor" className="my-auto ti-form-input text-black text-lg" value={formData.supervisor}
                                        onChange={(e) => handleInputChange('supervisor', e.target.value)} placeholder="Reporting to" required />

                                </div>



                                {/* Rest of Step 1 form fields */}
                            </div>
                        )}
                        {step === 2 && (

                            <div className="grid lg:grid-cols-3 gap-6 second-page none" id="new_page">
                                <div className=" space-y-2">
                                </div>
                                <div className=" space-y-2">
                                    <h2 className="relative py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10" >
                                        Second Page
                                        <span className="badge py-0.5 px-1.5 bg-black/50 text-white">2</span>
                                    </h2>
                                </div>
                                <div className="space-y-2"></div>

                                <div className="space-y-2" id="attachment">
                                    <label className="ti-form-label mb-0 font-bold text-lg ">Job Description <span style={{ color: "red" }}></span> (if didn`t upload)</label>
                                    <input type="file" name="job_description_doc" id="small-file-input" onChange={(e) => handleFileInputChange('job_description_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Monthly salary <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" className="my-auto ti-form-input text-black text-lg" placeholder="Monthly salary " name="monthly_salary" value={formData.monthly_salary}
                                        onChange={(e) => handleInputChange('monthly_salary', e.target.value)} />
                                    <span className="text-danger">{formData.error_list.monthly_salary}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Basic salary <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" className="my-auto ti-form-input text-black text-lg" placeholder="Basic salary " name="basic_salary" value={formData.basic_salary}
                                        onChange={(e) => handleInputChange('basic_salary', e.target.value)} />
                                    <span className="text-danger">{formData.error_list.basic_salary}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">House allowance <span style={{ color: "red" }}> *</span>
                                    </label>
                                    <input type="text" name="house_allowance" className="my-auto ti-form-input" value={formData.house_allowance}
                                        onChange={(e) => handleInputChange('house_allowance', e.target.value)} placeholder="House allowance " required />
                                    <span className="text-danger">{formData.error_list.house_allowance}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Meal allowance
                                        <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="meal_allowance" className="my-auto ti-form-input" value={formData.meal_allowance}
                                        onChange={(e) => handleInputChange('meal_allowance', e.target.value)} placeholder="Meal allowance" required />
                                    <span className="text-danger">{formData.error_list.meal_allowance}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Transport Allowance <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="transport_allowance" className="my-auto ti-form-input" value={formData.transport_allowance}
                                        onChange={(e) => handleInputChange('transport_allowance', e.target.value)} placeholder="Transport Allowance" required />
                                    <span className="text-danger">{formData.error_list.transport_allowance}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Risk or Bush allowance
                                        <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="risk_bush_allowance" className="my-auto ti-form-input" value={formData.risk_bush_allowance}
                                        onChange={(e) => handleInputChange('risk_bush_allowance', e.target.value)} placeholder=" Risk or Bush Allowance" required />
                                    <span className="text-danger">{formData.error_list.risk_bush_allowance}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Normal Working hours per week
                                        <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="normal_working" className="my-auto ti-form-input" value={formData.normal_working}
                                        onChange={(e) => handleInputChange('normal_working', e.target.value)} placeholder="Normal Working hours per week " required />
                                    <span className="text-danger">{formData.error_list.normal_working}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employer ordinary Working week  <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="ordinary_working" className="my-auto ti-form-input" value={formData.ordinary_working}
                                        onChange={(e) => handleInputChange('ordinary_working', e.target.value)} placeholder="Employer ordinary  days" required />
                                    <span className="text-danger">{formData.error_list.ordinary_working}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">
                                        Working From <span style={{ color: "red" }}> *</span>
                                    </label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div
                                            className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10"
                                        >
                                            <span className="text-sm text-gray-500 dark:text-white/70">
                                                <i className="ri ri-time-line"></i>
                                            </span>
                                        </div>
                                        <input type="text" name="working_from" className="my-auto ti-form-input" value={formData.working_from}
                                            onChange={(e) => handleInputChange('working_from', e.target.value)} placeholder="08:20 PM " required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Working To <span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div
                                            className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-time-line"></i></span>
                                        </div>
                                        <input type="text" name="working_to" className="my-auto ti-form-input" value={formData.working_to}
                                            onChange={(e) => handleInputChange('working_to', e.target.value)} placeholder="08:20 PM " required />

                                    </div>
                                </div>
                                {/*   yes or No     if yes display from */}
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Night Working Shift <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="night_shift" value="Yes" className="ti-form-radio" id="night_shift" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="night_shift" value="No" className="ti-form-radio" id="hs-radio-checked-in-form" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                        </label>
                                    </div>
                                    <span className="text-danger">{formData.error_list.night_shift}</span>
                                </div>
                                { formData.night_shift === "Yes" && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Night Working From <span style={{ color: "red" }}> *</span></label>
                                            <div className="flex rounded-sm overflow-auto">
                                                <div
                                                    className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                                    <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                        className="ri ri-time-line"></i></span>
                                                </div>

                                                <input type="text" name="night_working_from" className="my-auto ti-form-input" value={formData.night_working_from} onChange={(e) => handleInputChange('night_working_from', e.target.value)} placeholder="Night working From ie 08:00 AM " required />

                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Night Working To <span style={{ color: "red" }}> *</span></label>
                                            <div className="flex rounded-sm overflow-auto">
                                                <div
                                                    className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                                    <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                        className="ri ri-time-line"></i></span>
                                                </div>
                                                <input type="text" name="night_working_to" className="my-auto ti-form-input" value={formData.night_working_to} onChange={(e) => handleInputChange('night_working_to', e.target.value)} placeholder="Night working To 17:00 PM " required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Night Working Shift hours  <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="night_shift_hours" className="my-auto ti-form-input" value={formData.night_shift_hours}
                                                onChange={(e) => handleInputChange('night_shift_hours', e.target.value)} placeholder="Night Working Shift hours per week ie 6" required />
                                            <span className="text-danger">{formData.error_list.night_shift_hours}</span>
                                        </div>
                                    </>
                                )}
                                {/* End of   Night shift */}
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">On Saturday from <span>({formatTime(formData.saturday_from)})</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div
                                            className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-time-line"></i></span>
                                        </div>
                                        <input type="text" name="saturday_from" className="my-auto ti-form-input" value={formData.saturday_from} onChange={(e) => handleInputChange('saturday_from', e.target.value)} placeholder="Employer ordinary days" required />

                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Saturday To <span style={{ color: "red" }}> *</span>({formatTime(formData.saturday_to)})</label>

                                    <div className="flex rounded-sm overflow-auto">
                                        <div
                                            className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-time-line"></i></span>
                                        </div>
                                        <input type="text" name="saturday_to" className="my-auto ti-form-input" value={formData.saturday_to} onChange={(e) => handleInputChange('saturday_to', e.target.value)} placeholder="Employer ordinary days" required />
                                    </div>
                                </div>
                                <div className="space-y-2" id="attachment">
                                    <label className="ti-form-label mb-0 font-bold text-lg ">Signed Specific Doc <span style={{ color: "red" }}></span> (Max size 2MB)</label>
                                    <input type="file" name="specific_contract_signed" id="small-file-input" onChange={(e) => handleFileInputChange('specific_contract_signed', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
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
                                    <button type="button" onClick={handleSubmit} className="ti-btn ti-btn-success  justify-center">
                                        <i className="ti ti-corner-up-right-double"></i>Update Specific Contract
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EditSpecifiTaskContract;
