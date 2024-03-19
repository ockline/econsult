
import React, { useState, useEffect } from "react";
import { EmployerData, JobTitleData, ContractType,DependantTypeData } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";
import Swal from "sweetalert2";



const EditFixedContract = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
           name: '',
           employer_name: '',
           employee_name: '',
           job_title_id: '',
           phone_number: '',
           email: '',
           dob: '',
           job_profile: '',
           reporting_to: '',
           staff_classfication: '',
           place_recruitment: '',
           work_station: '',
           commencement_date: '',
           end_commencement_date: '',
           probation_period: '',
           remuneration: '',
           basic_salary: '',
           house_allowance: '',
           meal_allowance: '',
           transport_allowance: '',
           risk_bush_allowance: '',
           normal_working: '',
           ordinary_working: '',
           working_from: '',
           working_to: '',
           saturday_from: '',
           saturday_to: '',
           covered_statutory: '',
           job_description_doc: null,
           fixed_contract_signed: null,
           error_list: [],
    });
    //fetch contract details data'
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiBaseUrl}/contracts/fixed/edit_fixed_contract/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.fixed_contract,
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


   const handleInputChange = (stepName, value, date) => {
    if (value instanceof File) {
        // Handle file input change
        handleFileInputChange(stepName, [value]);
    } else if (date instanceof Date) {
        // Extract time portion from the date
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        // Update form data
        setFormData(prevData => ({
            ...prevData,
            [stepName]: time,
            error_list: { ...prevData.error_list, [stepName]: null }
        }));
    } else {
        // Handle other input types
        setFormData(prevData => ({
            ...prevData,
            [stepName]: value,
            error_list: { ...prevData.error_list, [stepName]: null }
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
           email: formData.email,
           dob: formData.dob,
           job_profile: formData.job_profile,
           reporting_to: formData.reporting_to,
           staff_classfication: formData.staff_classfication,
           place_recruitment: formData.place_recruitment,
           work_station: formData.work_station,
           commencement_date: formData.commencement_date,
           end_commencement_date: formData.end_commencement_date,
           probation_period: formData.probation_period,
           remuneration: formData.remuneration,
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
           covered_statutory: formData.covered_statutory,
            employee_id: formData.employee_id,
            job_description_doc: formData.job_description_doc,
             fixed_contract_signed: formData.fixed_contract_signed,
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/contracts/fixed/update_fixed_contract/${id}`, DataToSend, {
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
                    title: 'Fixed Contract Updated Successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                })
                .then(() => {

                // This code will be executed after the "ok" button is clicked and the modal is closed
                navigate('/contracts/fixed/fixed_contracts/'); // Call the navigate function to redirect to the specified route
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
                    'Fixed Contract Saved!',
                    'Fixed Contract completed Successfully.',
                    'success'
                ).then(() => {
                    navigate('/employees/socialrecords/details/');
                })

            }
        })
    }


    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Employee Detail For Contract</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/socialrecords/details/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/socialrecords/add_record/${formData.id}`}>
                            Add Contact Details
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Add Employee Detail For Contract</h1>
                    <Link to={`${import.meta.env.BASE_URL}contracts/fixed/fixed_contracts/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Between <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employer_name" className="my-auto ti-form-input text-black text-lg" placeholder="Employer name" value={formData.employer_name}
                                        onChange={(e) => handleInputChange('employer_name', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.employer_name}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">And <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employee_name" className="my-auto ti-form-input text-black text-lg" placeholder="And (Employee name)" value={formData.employee_name}
                                        onChange={(e) => handleInputChange('employee_name', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.employee_name}</span> */}
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Job Title - <span style={{ color: "darkgrey " }}> ({formData.job_title} )</span></label>
                                    <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} />
                                    <span className="text-danger">{formData.error_list.job_title_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Job Profile <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="job_profile" className="my-auto ti-form-input text-black text-lg" value={formData.job_profile} onChange={(e) => handleInputChange('job_profile', e.target.value)} placeholder="Job Profile" required />
                                    <span className="text-danger">{formData.error_list.job_profile}</span>
                                </div>
                                 <div className="space-y-2" id="attachment">
                                            <label className="ti-form-label mb-0 font-bold text-lg ">Job Description Attachment<span style={{ color: "red" }}></span> (if didnt upload)</label>
                                            <input type="file" name="job_description_doc" id="small-file-input" onChange={(e) => handleFileInputChange('job_description_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                        </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Reporting To <span style={{ color: "red" }}> *</span> </label>
                                    <input type="text" name="reporting_to" className="my-auto ti-form-input text-black text-lg" value={formData.reporting_to}
                                        onChange={(e) => handleInputChange('reporting_to', e.target.value)} placeholder="Reporting to" required />

                                </div>
                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Staff Classification<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Staff Classification" name="staff_classfication" value={formData.staff_classfication}
                                        onChange={(e) => handleInputChange('staff_classfication', e.target.value)} />
                                      <span className="text-danger">{formData.error_list.staff_classfication}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Type of Contract <span style={{ color: "red" }}> *</span></label>
                                      <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Staff Classification" name="name" value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)} />
                                </div>
                              
                                  <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Place of Work <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Working station" name="work_station" value={formData.work_station}
                                        onChange={(e) => handleInputChange('work_station', e.target.value)} />
                                </div>
                           
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Place of Recruitment<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Place of recruitment" name="place_recruitment" value={formData.place_recruitment}
                                        onChange={(e) => handleInputChange('place_recruitment', e.target.value)} />
                                </div>
                                    <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Commence Date / Employed <span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="commencement_date" className="my-auto ti-form-input text-black text-lg"
                                            placeholder="" value={new Date(formData.commencement_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('commencement_date', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.commencement_date}</span>
                                    </div>
                                </div>
                               

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Probation Period<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Probation Period" name="probation_period" value={formData.probation_period}
                                        onChange={(e) => handleInputChange('probation_period', e.target.value)} />
                                    <span className="text-danger">{formData.error_list.probation_period}</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Remuneration before tax and statutory<span style={{ color: "red" }}> *</span></label>
                                    <input type="number" className="my-auto ti-form-input text-black text-lg" placeholder="Remuneration before tax and statutory deduction " name="remuneration" value={formData.remuneration}
                                        onChange={(e) => handleInputChange('remuneration', e.target.value)} />
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
                            <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Basic salary <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" className="my-auto ti-form-input text-black text-lg" placeholder="Basic salary " name="basic_salary" value={formData.basic_salary}
                                        onChange={(e) => handleInputChange('basic_salary', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">House allowance <span style={{ color: "red" }}> *</span> 
                                        </label>
                                    <input type="number" name="house_allowance" className="my-auto ti-form-input" value={formData.house_allowance}
                                        onChange={(e) => handleInputChange('house_allowance', e.target.value)} placeholder="House allowance " required />
                                    <span className="text-danger">{formData.error_list.house_allowance}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Meal allowance 
                                        <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="meal_allowance" className="my-auto ti-form-input" value={formData.meal_allowance}
                                        onChange={(e) => handleInputChange('meal_allowance', e.target.value)} placeholder="Meal allowance" required />
                                    <span className="text-danger">{formData.error_list.meal_allowance}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Transport Allowance <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="transport_allowance" className="my-auto ti-form-input" value={formData.transport_allowance}
                                        onChange={(e) => handleInputChange('transport_allowance', e.target.value)} placeholder="Transport Allowance" required />
                                    <span className="text-danger">{formData.error_list.transport_allowance}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Risk or Bush allowance
                                        <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="risk_bush_allowance" className="my-auto ti-form-input" value={formData.risk_bush_allowance}
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Working From <span style={{ color: "red" }}> *</span></label>
                                     <div className="flex rounded-sm overflow-auto">
                                        <div
                                    className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                    <span className="text-sm text-gray-500 dark:text-white/70"><i
                                        className="ri ri-time-line"></i></span>
                                </div>
                                       {/* <DatePicker
    className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
    name="working_from"
    selected={formData.working_from}
    onChange={(date) => handleInputChange('working_from', date)}
    timeCaption="Time"
    dateFormat="h:mm aa" // Use 'h:mm aa' format for displaying time and AM/PM
    showTimeInput
    showTimeSelectOnly
    timeIntervals={15}
    timeFormat="HH:mm aa" // Set the time format to 'HH:mm aa'
/> */}
                                        <input type="text" name="working_from" className="my-auto ti-form-input" value={formData.working_from}
                                        onChange={(e) => handleInputChange('working_from', e.target.value)}  required />

                                        <span className="text-danger">{formData.error_list.working_from}</span>
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
                                      {/* <DatePicker
    className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
    name="working_to"
    selected={formData.working_to}
    onChange={(date) => handleInputChange('working_to', date)}
    timeCaption="Time"
    dateFormat="h:mm aa" // Use 'h:mm aa' format for displaying time and AM/PM
    showTimeInput
    showTimeSelectOnly
    timeIntervals={15}
    timeFormat="HH:mm aa" // Set the time format to 'HH:mm aa'
/> */}
                             <input type="text" name="working_to" className="my-auto ti-form-input" value={formData.working_to}
                                        onChange={(e) => handleInputChange('working_to', e.target.value)}  required />
                                        <span className="text-danger">{formData.error_list.working_to}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">On Saturday from </label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div
                                    className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                    <span className="text-sm text-gray-500 dark:text-white/70"><i
                                        className="ri ri-time-line"></i></span>
                                </div>
                                      {/* <DatePicker
    className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
    name="saturday_from"
    selected={formData.saturday_from}
    onChange={(date) => handleInputChange('saturday_from', date)}
    timeCaption="Time"
    dateFormat="h:mm aa" // Use 'h:mm aa' format for displaying time and AM/PM
    showTimeInput
    showTimeSelectOnly
    timeIntervals={15}
    timeFormat="HH:mm aa" // Set the time format to 'HH:mm aa'
/> */}

                                            <input type="text" name="saturday_from" className="my-auto ti-form-input" value={formData.saturday_from}
                                        onChange={(e) => handleInputChange('saturday_from', e.target.value)} placeholder="Employer ordinary  days" required />
                                        <span className="text-danger">{formData.error_list.saturday_from}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Saturday To <span style={{ color: "red" }}> *</span></label>
                                                               
                                    <div className="flex rounded-sm overflow-auto">
                                        <div
                                    className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                    <span className="text-sm text-gray-500 dark:text-white/70"><i
                                        className="ri ri-time-line"></i></span>
                                </div>
                                       {/* <DatePicker
                                    className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
                                    name="saturday_to"
                                    selected={formData.saturday_to}
                                    onChange={(date) => handleInputChange('saturday_to', date)}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa" // Use 'h:mm aa' format for displaying time and AM/PM
                                    showTimeInput
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeFormat="HH:mm aa" // Set the time format to 'HH:mm aa'
                                        /> */}
                                            <input type="text" name="saturday_to" className="my-auto ti-form-input" value={formData.saturday_to}
                                        onChange={(e) => handleInputChange('saturday_to', e.target.value)} placeholder="Employer ordinary  days" required />

                                        <span className="text-danger">{formData.error_list.saturday_to}</span>
                                    </div>
                                    
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Covered by Statutory <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="covered_statutory" className="my-auto ti-form-input" value={formData.covered_statutory}
                                        onChange={(e) => handleInputChange('covered_statutory', e.target.value)} placeholder="Coverder by Statutory" required />
                                    <span className="text-danger">{formData.error_list.covered_statutory}</span>
                                </div>
                                 <div className="space-y-2" id="attachment">
                                            <label className="ti-form-label mb-0 font-bold text-lg ">Signed Fixed Contract (Max size 2MB)</label>
                                            <input type="file" name="fixed_contract_signed" id="small-file-input" onChange={(e) => handleFileInputChange('fixed_contract_signed', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
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
                                        <i className="ti ti-corner-up-right-double"></i>Update Fixed Contract                                     </button>
                                    {/* <Link to="#" className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-primary m-0 whitespace-nowrap" data-hs-overlay="#task-compose" style={{ backgroundColor: '#619162' }}>
                                        <i className="ti ti-database"></i>Add Relative details
                                    </Link>&nbsp; */}
                                    {/* <Link to="#" className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-success m-0 whitespace-nowrap" id="confirm-btn" onClick={Style2}>
                                        <i className="ri ri-send-plane-2-fill"></i>Submit to Complete
                                    </Link> */}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EditFixedContract;
