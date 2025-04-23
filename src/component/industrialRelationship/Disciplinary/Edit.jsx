
import React, { useState, useEffect } from "react";
import { EmployerData, JobTitleData, ContractType,DependantTypeData } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";
import Swal from "sweetalert2";



const EditDisciplinary = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        
        employee_id: '',
        employer_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        investigation_date: '', 
        suffering_from: '',
        incapacity_type: '',
        suffering_period: '',
        daily_duties: '',
        challenge_daily_duties: '',
        alternative_task: '',
        partient_suggestion: '',
        investigation_report: '',
        perfomance_capacity_attachment: null,
        error_list: [],
    });
    
    
    //fetch employee data'
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiBaseUrl}/industrial_relationship/show_performance_capacity/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.show_capacity,
            };
            setFormData(updatedFormData);
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
            rate_creterial: formData.rate_creterial,
            employer_id: formData.employer_id,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            suffering_from:  formData.suffering_from,
            departments: formData.departments,
            daily_duties:  formData.daily_duties,
            challenge_daily_duties: formData.challenge_daily_duties,
            alternative_task: formData.alternative_task,
            partient_suggestion: formData.partient_suggestion,
            investigation_report: formData.investigation_report,
            investigation_date: formData.investigation_date,
            perfomance_capacity_attachment: formData.perfomance_capacity_attachment,
           
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/industrial_relationship/update_performance_capacity/${id}`, DataToSend, {
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
                    title: 'Failed',
                    text: formattedErrors,
                    icon: 'error',
                    button: 'OK',
                });
            } else if (resp.data.status === 500) {
                swal({
                    title: 'Failed',
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
                navigate('/industrials/perfomance_capacity/'); 
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
                    navigate('/industrials/misconducts/');
                })

            }
        })
    }


    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Industrial Relationship Management</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/perfomance_capacity/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/performance_capacity/edit/${formData.id}`}>
                            Update Perfomance Capacity
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Update Perfomance Capacity</h1>
                    <Link to={`${import.meta.env.BASE_URL}industrials/performance_capacity/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Capacity Type <span style={{ color: "red" }}> *</span></label>
                                   <input type="text" name="capacity_type" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" value={formData.capacity_type} onChange={(e) => handleInputChange('capacity_type', e.target.value)} placeholder="Capacity Type" required readOnly />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department Name <span style={{ color: "red" }}> *</span></label>
                                     <input type="text" name="departments" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" value={formData.departments} onChange={(e) => handleInputChange('departments', e.target.value)} placeholder="Employee department" required readOnly />
                                    
                                </div>
                              <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Investigation Date<span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="investigation_date" className="my-auto ti-form-input text-black  border-red-500 text-lg"
                                            placeholder="" value={new Date(formData.investigation_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('investigation_date', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.investigation_date}</span>
                                    </div>
                                </div>
                                  <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Investigation Report</label>
                                   <input type="textarea" name="investigation_report" className="my-auto ti-form-input text-black  border-red-500 text-lg" value={formData.investigation_report} onChange={(e) => handleInputChange('investigation_report', e.target.value)} placeholder="Review Description "   />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Subject Matter </label>
                                    <input type="text" name="subject_matter" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.subject_matter}
                                        onChange={(e) => handleInputChange('subject_matter', e.target.value)} placeholder="subject matter" />
                                </div> 
                                
                            <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are you suffering? </label>
                                    <input type="text" name="suffering_from" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.suffering_from}
                                        onChange={(e) => handleInputChange('suffering_from', e.target.value)} placeholder="what are you suffering from" />
                                </div>  
                                <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">For how long you have been suffering?   <span style={{ color: "red" }}> *</span></label>
                                <div className="flex rounded-sm overflow-auto">
                                    <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                        <span className="text-sm text-gray-500 dark:text-white/70">
                                            <i className="ri ri-calendar-line"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="date" 
                                        name="suffering_period" 
                                        className="my-auto ti-form-input text-black text-lg"
                                        value={new Date(formData.suffering_period).toLocaleDateString('en-CA')} // Format the date
                                        max={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
                                        onChange={(e) => handleInputChange('suffering_period', e.target.value)} 
                                        required
                                    />
                                    <span className="text-danger">{formData.error_list.suffering_period}</span>
                                </div>
                                </div>                                 
                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are your daily duties at working station  </label>
                                    <input type="text" name="daily_duties" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.daily_duties}
                                        onChange={(e) => handleInputChange('daily_duties', e.target.value)} placeholder="What are your daily duties at working station" />
                                </div>  
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">what are the challenges on attending your daily duties  </label>
                                    <input type="text" name="challenge_daily_duties" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.challenge_daily_duties}
                                        onChange={(e) => handleInputChange('challenge_daily_duties', e.target.value)} placeholder="challenges on attending your daily duties" />
                                </div>    
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are the alternative task </label>
                                    <input type="text" name="alternative_task" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.alternative_task}
                                        onChange={(e) => handleInputChange('alternative_task', e.target.value)} placeholder="What are the alternative task" />
                                </div> 
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Patient suggestions on his/her illness</label>
                                    <input type="text" name="partient_suggestion" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.partient_suggestion}
                                        onChange={(e) => handleInputChange('partient_suggestion', e.target.value)} placeholder="partient suggestion" />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Investigator Name </label>
                                    <input type="text" name="investigator_name" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="investigator name" value={formData.investigator_name} readOnly
                                        onChange={(e) => handleInputChange('investigator_name', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.investigator_name}</span>
                                </div>
                               
                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Investigator Designation <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employer" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" value={formData.employer} readOnly onChange={(e) => handleInputChange('employer', e.target.value)} placeholder="Designantion" required />
                                    {/* <span className="text-danger">{formData.error_list.employer}</span> */}
                                </div> 
                                <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Perfomance Review Attachment (pdf)</label>
                                            <input type="file" accept=".pdf" name="perfomance_review_attachment" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('perfomance_review_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                          
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
export default EditDisciplinary;
