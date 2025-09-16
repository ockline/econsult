
import React, { useState, useEffect } from "react";
import { EmployerData, JobTitleData, ContractType,DependantTypeData } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import axios from "axios";
import Swal from "sweetalert2";



const Show = () => {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        shift: '',
        error_list: [],
    });
    
    console.log('waleteee',formData );
    //fetch employee data'
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiBaseUrl}/attendances/retrieve_attendance_detail/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.employee,
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
           shift: formData.shift,
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/attendances/update_attendance/${id}`, DataToSend, {
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
                    title: 'Success',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                })
                .then(() => {
                navigate('/attendances/normal_attendance/'); 
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
                    navigate('/employees/socialrecords/details/');
                })

            }
        })
    }


    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Employee Attendance Management</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}attendances/normal_attendance/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}attendances/edit_normal_attendance/${formData.id}`}>
                            Add Contact Details
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Update employee OverTime</h1>
                    <Link to={`${import.meta.env.BASE_URL}attendances/overtime/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
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
                                     <input type="text" name="employer_name" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" value={formData.employer_name} onChange={(e) => handleInputChange('employer_name', e.target.value)} placeholder="Employer name" required readOnly />
                                    
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Time In <span style={{ color: "red" }}> *</span></label>
                                   <input type="text" name="time_in" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" value={formData.time_in} onChange={(e) => handleInputChange('time_in', e.target.value)} placeholder="Employee time_in" required readOnly />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Time Out <span style={{ color: "red" }}> *</span></label>
                                   <input type="text" name="time_out" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" value={formData.time_out} onChange={(e) => handleInputChange('time_out', e.target.value)} placeholder="Employee time_out" required readOnly />
                                </div>
                               
                              <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Date<span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="date" className="my-auto ti-form-input text-black  bg-gray-100 border-red-500 text-lg"
                                            placeholder="" value={new Date(formData.date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('date', e.target.value)} required readOnly
                                        />
                                        <span className="text-danger">{formData.error_list.date}</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Shift <span style={{ color: "red" }}> *</span></label>
                                   <input type="text" name="shift" className="my-auto ti-form-input text-black border-red-500 text-lg" value={formData.shift} onChange={(e) => handleInputChange('shift', e.target.value)} placeholder="Employee shift" />
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
export default Show;
