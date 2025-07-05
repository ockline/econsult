import React, { useState, useEffect } from "react";
import { EmployerData, JobTitleData, ContractType,DependantTypeData } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";
import Swal from "sweetalert2";
import CreatableSelect from 'react-select/creatable';



const Edit = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const token = sessionStorage.getItem('token');


    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        employee_id: '',
        employer_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        misconduct_date: '', 
        dismiss_date: '',
        dismiss_remarks: '',
        incidence_remarks: '',
        incidence_reported_by: '',
        incidence_reported_date: '',
        show_cause_letter_attachment: null,
        investigation_report_attachment: null,
        notice_appear_attachment: null,
        error_list: [],
    });
    
    console.log('waleteee',formData );
    //fetch employee data'
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiBaseUrl}/industrial_relationship/show_misconduct/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.misconduct,
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
 const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        // Handle form submission logic here
        e.preventDefault();
        // console.log('Form submitted:', formData);
        const DataToSend = {
            employee_id: formData.employee_id,
            leave_type: formData.leave_type,
            employer_id: formData.employer_id,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            location: formData.location,
            misconduct_date: formData.misconduct_date,
            dismiss_date: formData.dismiss_date,
            dismiss_remarks: formData.dismiss_remarks,
             incidence_remarks: formData.incidence_remarks,
            incidence_reported_by: formData.incidence_reported_by,
            incidence_reported_date: formData.incidence_reported_date,
            show_cause_letter_attachment: formData.show_cause_letter_attachment,
            investigation_report_attachment: formData.investigation_report_attachment,
            notice_appear_attachment: formData.notice_appear_attachment,
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/industrial_relationship/update_misconduct/${id}`,DataToSend, {
          headers: {
                    'Authorization': `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                },
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
                    title: 'Success',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                })
                .then(() => {
                navigate('/industrials/misconducts/'); 
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
                    'Disciplinary Saved!',
                    'Disciplinary  completed Successfully.',
                    'success'
                ).then(() => {
                    navigate('/industrials/misconducts/');
                })

            }
        })
    }

    // Define options for the select input
    const misconductOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        // Add more options as needed
    ];

    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Industrial Relationship Management</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/misconducts/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/edit_misconduct/${formData.id}`}>
                            Update Misconduct
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Update Employee Misconduct</h1>
                    <Link to={`${import.meta.env.BASE_URL}industrials/misconducts/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                        {step === 1 && (

                            <div className="grid lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">FirstName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="firstname" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" placeholder="Employee firstname" value={formData.firstname} readOnly
                                        onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.firstname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">MiddleName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="middlename" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" placeholder="Middlename" value={formData.middlename}
                                        onChange={(e) => handleInputChange('middlename', e.target.value)} required readOnly  />
                                    <span className="text-danger">{formData.error_list.middlename}</span>
                                </div> <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">LastName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="lastname" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" value={formData.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} placeholder="Employee Lastname" required readOnly />
                                    <span className="text-danger">{formData.error_list.lastname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employer Name <span style={{ color: "red" }}> *</span></label>
                                     <input type="text" name="employer" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" value={formData.employer} onChange={(e) => handleInputChange('employer', e.target.value)} placeholder="Employee employer" required readOnly />
                                    
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Misconduct Cause <span style={{ color: "red" }}> *</span></label>
                                    <CreatableSelect
                                        isMulti
                                        name="misconduct"
                                        options={misconductOptions}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        value={formData.misconduct}
                                        onChange={(selectedOptions) => {
                                            handleInputChange('misconduct', selectedOptions);
                                        }}
                                        placeholder="Select Misconduct Causes"
                                        required
                                        isDisabled={false}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Incident Reported By </label>
                                    <input type="text" name="incidence_reported_by" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" value={formData.incidence_reported_by}
                                        onChange={(e) => handleInputChange('incidence_reported_by', e.target.value)} placeholder="Reported by"  />

                                </div>
                               <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Incident Reported Date <span style={{ color: "red" }}> *</span></label>
                                <div className="flex rounded-sm overflow-auto">
                                    <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                        <span className="text-sm text-gray-500 dark:text-white/70">
                                            <i className="ri ri-calendar-line"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="date" 
                                        name="incidence_reported_date" 
                                        className="my-auto ti-form-input text-black text-lg"
                                        value={new Date(formData.incidence_reported_date).toLocaleDateString('en-CA')} // Format the date
                                        min="1970-01-01" // Set a minimum date (you can adjust this as needed)
                                        max={new Date().toISOString().split('T')[0]} // Set today's date as the maximum
                                        onChange={(e) => handleInputChange('incidence_reported_date', e.target.value)} 
                                        required
                                    />
                                    <span className="text-danger">{formData.error_list.incidence_reported_date}</span>
                                </div>
                            </div>  
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Misconduct Date <span style={{ color: "red" }}> *</span></label>
                                <div className="flex rounded-sm overflow-auto">
                                    <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                        <span className="text-sm text-gray-500 dark:text-white/70"><i
                                            className="ri ri-calendar-line"></i></span>
                                    </div>
                                    <input
                                        type="date" 
                                        name="misconduct_date" 
                                        className="my-auto ti-form-input text-black border-red-500 text-lg"
                                        placeholder="" 
                                        value={new Date(formData.misconduct_date).toLocaleDateString('en-CA')} // Format the date
                                        min="1970-01-01" // Set a minimum date (you can adjust this as needed)
                                        max={new Date().toISOString().split('T')[0]} // Set today's date as the maximum
                                        onChange={(e) => handleInputChange('misconduct_date', e.target.value)} // Corrected the field name
                                        required
                                    />
                                    <span className="text-danger">{formData.error_list.misconduct_date}</span>
                                </div>
                            </div>
                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Incident Remarks</label>
                                    <textarea 
                                        type="text" 
                                        name="incidence_remarks" 
                                        className="my-auto ti-form-input text-black border-red-500 text-md" 
                                        value={formData.incidence_remarks} 
                                        onChange={(e) => handleInputChange('incidence_remarks', e.target.value)} 
                                        placeholder="Write Comment if any" 
                                    />
                                </div> 
                                  <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Dismiss Remarks</label>
                                   <input type="textarea" name="dismiss_remarks" className="my-auto ti-form-input text-black  border-red-500 text-lg" value={formData.dismiss_remarks} onChange={(e) => handleInputChange('dismiss_remarks', e.target.value)} placeholder="Dismis Remarks"   />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Dismiss Date<span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="dismiss_date" className="my-auto ti-form-input text-black  border-red-500 text-lg"
                                            placeholder="" value={new Date(formData.dismiss_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('dismiss_date', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.dismiss_date}</span>
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Investigation Report (pdf)</label>
                                            <input type="file" accept=".pdf" name="investigation_report_attachment" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('investigation_report_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                          
                                </div>
                                <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Show Cause Letter (pdf)</label>
                                            <input type="file" accept=".pdf" name="show_cause_letter_attachment" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('show_cause_letter_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                          
                                </div>
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Notice to Appear (pdf)</label>
                                            <input type="file" accept=".pdf" name="notice_appear_attachment" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('notice_appear_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                          
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
                          
                            {step === 1 && (
                                <div className="float-end">
                                  <button
                                type="button"
                                onClick={handleSubmit}
                                className="ti-btn ti-btn-success justify-center"
                                disabled={isLoading} // Disable the button when loading
                                >
                                {isLoading ? (
                                    <>
                                    <span className="ti-spinner text-white" role="status" aria-label="loading">
                                        <span className="sr-only">Loading...</span>
                                    </span>
                                    Loading...
                                    </>
                                ) : (
                                    <>
                                    <i className="ti ti-corner-up-right-double"></i>
                                    Update
                                    </>
                                )}
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
export default Edit;
