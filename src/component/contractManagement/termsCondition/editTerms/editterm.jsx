
import React, { useState, useEffect } from "react";
import { EmployerData, JobTitleData, DepartmentData, Banking } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import axios from "axios";
import Swal from "sweetalert2";



const EditTermCondition = () => {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        employee_id: '',
        employer_name: '',
        employee_name: '',
        job_title_id: '',
        department_id: '',
        reg_number: '',
        date_contracted: '',
        job_description_doc: null,
        error_list: [],
    });
    //fetch contract details data'
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiBaseUrl}/contracts/terms/edit_term_condition/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.term_condition,
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

    const handleSubmit = async (e) => {
        // Handle form submission logic here
        e.preventDefault();
        // console.log('Form submitted:', formData);
        const DataToSend = {
            employer_name: formData.employer_name,
            employee_name: formData.employee_name,
            job_title_id: formData.job_title_id,
            employee_id: formData.employee_id,
            department_id: formData.department_id,
            reg_number: formData.reg_number,
            date_contracted: formData.date_contracted,
            job_description_doc: formData.job_description_doc,
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/contracts/terms/add_term_condition`, DataToSend, {
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
                    title: 'Term Condition Contract Updated Successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                })
                    .then(() => {

                        // This code will be executed after the "ok" button is clicked and the modal is closed
                        navigate('/contracts/terms/term_conditions/'); // Call the navigate function to redirect to the specified route
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


    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Edit Employee Terms and Conditions</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/terms/term_conditions/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/terms/add_term_condition/${formData.id}`}>
                            Edit Terms and Conditions

                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Edit Terms and Conditions</h1>
                    <Link to={`${import.meta.env.BASE_URL}contracts/terms/term_conditions/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                        {step === 1 && (

                            <div className="grid lg:grid-cols-2 gap-6">

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Registration Number <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="reg_number" className="my-auto ti-form-input text-black text-lg" placeholder="Employee registration number" value={formData.reg_number}
                                        onChange={(e) => handleInputChange('reg_number', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.reg_number}</span>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department Name - <span style={{ color: "darkgrey " }}> ({formData.department} )</span></label>
                                    <Creatable classNamePrefix="react-select" name="department_id" options={departments} onChange={(selectedOption) => handleInputChange(["department_id"], selectedOption ? selectedOption.value : null)} value={departments.find((option) => option.value === formData.department_id)} />
                                    <span className="text-danger">{formData.error_list.department_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Date  <span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="date_contracted" className="my-auto ti-form-input text-black text-lg"
                                            placeholder="" value={new Date(formData.date_contracted).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('date_contracted', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.date_contracted}</span>
                                    </div>
                                </div>

                                {/* Rest of Step 1 form fields */}
                            </div>
                        )}
                        <br />
                        <div>
                            {step === 1 && (
                                <div className="float-end">
                                    <button type="button" onClick={handleSubmit} className="ti-btn ti-btn-success  justify-center">
                                        <i className="ti ti-corner-up-right-double"></i>Submit Terms and Condition
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
export default EditTermCondition;
