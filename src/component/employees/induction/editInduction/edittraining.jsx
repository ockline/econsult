
import React, { useState, useEffect } from "react";
import { JobTitleData, PackageData, RegionData, EmployerData, UsersData, DepartmentData, NationalityData, RankingCriterialData, CollegesData, yearsData, EducationLevelData, ReferenceCheck, Multiselectcomponent, ExplanationSelectcomponent, FollowUpSelectcomponent, AproposSelectcomponent, EnvironmentSelectcomponent, HealthSelectcomponent, RemunerationSelectcomponent, EmploymentSelectcomponent, KeyPeoplaSelectcomponent } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import { MultiSelect } from "react-multi-select-component";
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";
import Swal from "sweetalert2";



const EditTraining = () => {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


    const [selectedBusiness, setSelectedBusiness] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedEmploymentCondition, setSelectedEmploymentCondition] = useState([]);
    const [selectedRemuneration, setSelectedRemuneration] = useState([]);
    const [selectedHealthSafety, setSelectedHealthSafety] = useState([]);
    const [selectedEnvironment, setSelectedEnvironment] = useState([]);
    const [selectedAproposTraining, setSelectedAproposTraining] = useState([]);
    const [selectedConductFollowUp, setSelectedConductFollowUp] = useState([]);

    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState([]);
    const { id } = useParams();
    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        social_record_id: '',
        employer_id: '',
        employer_address: '',
        contact_personal: '',
        job_title_id: '',
        personal_contacts: '',
        personal_designation: '',
        firstname: '',
        middlename: '',
        lastname: '',
        department_id: '',
        reporting_to: '',
        business: '',
        employment_date: '',
        establishment: '',
        roles_key: '',
        employee_remuneration: '',
        employment_condition: '',
        environment: '',
        apropos_training: '',
        health_safety: '',
        conduct_follow_up: '',
        comments: '',
        notes: '',
        // employee_id: '',
        conducted_date: '',
        induction_attachment: null,
        other_train_attachment: null,
        error_list: [],
    });

    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/induction/edit_induction_training/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.induction_training,
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
        if (Array.isArray(value)) {
            // Handle selected items from dropdown menus
            const selectedValues = value.map(item => item.value);
            setFormData(prevData => ({
                ...prevData,
                [stepName]: selectedValues,
                error_list: { ...prevData.error_list, [stepName]: null },
            }));
        } else {
            // Handle other input types
            setFormData(prevData => ({
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
            social_record_id: id,
            // employee_id: employee_id,
            employer_id: formData.employer_id,
            employer_address: formData.employer_address,
            contact_personal: formData.contact_personal,
            job_title_id: formData.job_title_id,
            personal_contacts: formData.personal_contacts,
            personal_designation: formData.personal_designation,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            department_id: formData.department_id,
            reporting_to: formData.reporting_to,
            business: formData.business,
            employment_date: formData.employment_date,
            establishment: formData.establishment,
            roles_key: formData.roles_key,
            employee_remuneration: formData.employee_remuneration,
            employment_condition: formData.employment_condition,
            environment: formData.environment,
            apropos_training: formData.apropos_training,
            health_safety: formData.health_safety,
            conduct_follow_up: formData.conduct_follow_up,
            comments: formData.comments,
            notes: formData.notes,
            conducted_date: formData.conducted_date,
            induction_attachment: formData.induction_attachment,
            other_train_attachment: formData.other_train_attachment,
        };
        // console.log('data zinazokwenda', DataToSend);
        try {
            const resp = await axios.post(`${apiBaseUrl}/employees/induction/update_induction_training/${id}`, DataToSend, {
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
                    title: 'Sorry!',
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
                    closeOnClickOutside: false, // 
                })
                    .then(() => {
                        navigate('/employees/induction/induction_trainning/'); // Call the navigate function to redirect to the specified route
                    });
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

    // Package or Cost center names block *******************************
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const packages = await PackageData();
                setPackages(packages);
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
    // Banks  *********************


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
    // Nationality or Countries  *********************

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const country = await NationalityData();
                setCountries(country);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);

    //Employer Details 
    //  Employer
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
                    'Employee Saved!',
                    'Employee Personnel Registered Successfully.',
                    'success'
                ).then(() => {
                    navigate('/employees/personal/employee_list/');
                })

            }
        })
    }



    return (
        <div>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Edit Induction Training Details</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/induction/induction_trainning`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/induction/add_induction_training/` + formData.id}>
                            Update Induction Training
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>


            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-md">Update Employee training Details</h1>
                    <Link to={`${import.meta.env.BASE_URL}employees/induction/induction_trainning/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employer / Company Name  <span style={{ color: "red" }}> *</span></label>

                                    <Creatable classNamePrefix="react-select" name="employer_id" options={employers} onChange={(selectedOption) => handleInputChange(["employer_id"], selectedOption ? selectedOption.value : null)} value={employers.find((option) => option.value === formData.employer_id)} required />
                                    {/* <span className="text-danger">{formData.error_list.employer_id}</span> */}

                                </div>
                                <input type="hidden" name="employee_id" className="my-auto ti-form-input" value={formData.employee_id} />
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Employer Address </label>
                                    <input type="text" name="employer_address" className="my-auto ti-form-input" placeholder="employer address" value={formData.employer_address}
                                        onChange={(e) => handleInputChange('employer_address', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.employer_address}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Employer Contact Person </label>
                                    <input type="text" name="contact_personal" className="my-auto ti-form-input" placeholder="employer contact Person" value={formData.contact_personal}
                                        onChange={(e) => handleInputChange('contact_personal', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.contact_personal}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Contact Person Designation  <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="personal_designation" options={job_titles} onChange={(selectedOption) => handleInputChange(["personal_designation"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.personal_designation)} />
                                    {/* <span className="text-danger">{formData.error_list.personal_designation}</span> */}
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Contact Person Contacts </label>
                                    <input type="text" name="personal_contacts" className="my-auto ti-form-input" placeholder="employer contact Person" value={formData.personal_contacts}
                                        onChange={(e) => handleInputChange('personal_contacts', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.personal_contacts}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">FirstName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="firstname" className="my-auto ti-form-input" placeholder="Employee firstname" value={formData.firstname}
                                        onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.firstname}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">MiddleName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="middlename" className="my-auto ti-form-input" placeholder="Middlename" value={formData.middlename}
                                        onChange={(e) => handleInputChange('middlename', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.middlename}</span>
                                </div> <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">LastName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="lastname" className="my-auto ti-form-input" value={formData.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} placeholder="Employee Lastname" required />
                                    {/* <span className="text-danger">{formData.error_list.lastname}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Nature of the Establishment   <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="establishment" className="my-auto ti-form-input" value={formData.establishment}
                                        onChange={(e) => handleInputChange('establishment', e.target.value)} placeholder="Nature of the Establishment" required />
                                    {/* <span className="text-danger">{formData.error_list.establishment}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md"> Employment start date<span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="employment_date" className="my-auto ti-form-input text-black"
                                            placeholder="" value={new Date(formData.employment_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('employment_date', e.target.value)} required
                                        />
                                        {/* <span className="text-danger">{formData.error_list.employment_date}</span> */}
                                    </div>
                                </div>


                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Position / job  <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} />
                                    {/* <span className="text-danger">{formData.error_list.job_title_id}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Manager / supervisor:   <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="reporting_to" className="my-auto ti-form-input" value={formData.reporting_to}
                                        onChange={(e) => handleInputChange('reporting_to', e.target.value)} placeholder="Present address" required />
                                    {/* <span className="text-danger">{formData.error_list.reporting_to}</span> */}
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department Name /Section <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="department_id" options={departments} onChange={(selectedOption) => handleInputChange(["department_id"], selectedOption ? selectedOption.value : null)} value={departments.find((option) => option.value === formData.department_id)} required />
                                    <span className="text-danger">{formData.error_list.department_id}</span>
                                </div>

                                <div className="space-y-2 multiple-select">
                                    <label className="ti-form-select-label mt-2">Explanation of the business:</label>
                                    <MultiSelect
                                        classNamePrefix='react-select'
                                        name="business"
                                        options={ExplanationSelectcomponent}
                                        value={selectedBusiness}
                                        onChange={(value) => {
                                            setSelectedBusiness(value);
                                            handleInputChange("business", value);
                                        }}
                                        labelledBy="Select"
                                    />

                                </div>

                                <div className="space-y-2 multiple-select">
                                    <label className="ti-form-select-label mt-2">List of the key people and their roles:</label>
                                    <MultiSelect classNamePrefix='react-select' name="roles_key" options={KeyPeoplaSelectcomponent} value={selectedRoles}
                                        onChange={(value) => {
                                            setSelectedRoles(value);
                                            handleInputChange("roles_key", value);
                                        }}
                                        labelledBy="Select" />
                                </div>

                                <div className="space-y-2 multiple-select">
                                    <label className="ti-form-select-label mt-2">Employee Employment Conditions:</label>
                                    <MultiSelect classNamePrefix='react-select' name="employment_condition" options={EmploymentSelectcomponent} value={selectedEmploymentCondition} onChange={(value) => {
                                        setSelectedEmploymentCondition(value);
                                        handleInputChange("employment_condition", value);
                                    }} labelledBy="Select" />
                                </div>

                                <div className="space-y-2 multiple-select">
                                    <label className="ti-form-select-label mt-2">Employee Remuneration</label>
                                    <MultiSelect classNamePrefix='react-select' name="employee_remuneration" options={RemunerationSelectcomponent} value={selectedRemuneration} onChange={(value) => {
                                        setSelectedRemuneration(value);
                                        handleInputChange("employee_remuneration", value);
                                    }} labelledBy="Select" />
                                </div>

                                <div className="space-y-2 multiple-select">
                                    <label className="ti-form-select-label mt-2">health and safety administration:</label>
                                    <MultiSelect classNamePrefix='react-select' name="health_safety" options={HealthSelectcomponent} value={selectedHealthSafety} onChange={(value) => {
                                        setSelectedHealthSafety(value);
                                        handleInputChange("health_safety", value);
                                    }} labelledBy="Select" />
                                </div>

                                <div className="space-y-2 multiple-select">
                                    <label className="ti-form-select-label mt-2">Show Environment:</label>
                                    <MultiSelect classNamePrefix='react-select' name="environment" options={EnvironmentSelectcomponent} value={selectedEnvironment} onChange={(value) => {
                                        setSelectedEnvironment(value);
                                        handleInputChange("environment", value);
                                    }} labelledBy="Select" />
                                </div>

                                <div className="space-y-2 multiple-select">
                                    <label className="ti-form-select-label mt-2">Apropos Training</label>
                                    <MultiSelect classNamePrefix='react-select' name="apropos_training" options={AproposSelectcomponent} value={selectedAproposTraining} onChange={(value) => {
                                        setSelectedAproposTraining(value);
                                        handleInputChange("apropos_training", value);
                                    }} labelledBy="Select" />
                                </div>

                                <div className="space-y-2 multiple-select">
                                    <label className="ti-form-select-label mt-2">Conduct Follow-up</label>
                                    <MultiSelect classNamePrefix='react-select' name="conduct_follow_up" options={FollowUpSelectcomponent} value={selectedConductFollowUp} onChange={(value) => {
                                        setSelectedConductFollowUp(value);
                                        handleInputChange("conduct_follow_up", value);
                                    }} labelledBy="Select" />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Comment Follow Up <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="comments" className="my-auto ti-form-input" value={formData.comments}
                                        onChange={(e) => handleInputChange('comments', e.target.value)} placeholder="Comments / Follow up Action" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Notes <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="notes" className="my-auto ti-form-input" value={formData.notes}
                                        onChange={(e) => handleInputChange('notes', e.target.value)} placeholder="Write note" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Conducted Date <span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>

                                        <input
                                            type="date" name="conducted_date" className="my-auto ti-form-input text-black"
                                            placeholder="" value={new Date(formData.conducted_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('conducted_date', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.conducted_date}</span>
                                    </div>
                                </div>
                                <div className="space-y-2" id="attachment">
                                    <label className="ti-form-label mb-0 font-bold text-lg ">Induction Attachment (max size 2MB)</label>
                                    <input type="file" name="induction_attachment" id="small-file-input" onChange={(e) => handleFileInputChange('induction_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                </div>
                                <div className="space-y-2" id="attachments">
                                    <label className="ti-form-label mb-0 font-bold text-lg ">Other Attachment (max size 2MB)</label>
                                    <input type="file" name="other_train_attachment" id="small-file-input" onChange={(e) => handleFileInputChange('other_train_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                </div>

                            </div>

                        )}
                        <br />
                        <div>
                            {step < 2 && (
                                <button type="button" onClick={handleNextStep} className="ti-btn ti-btn-primary first_page justify-center">
                                    <i className="ti ti-arrow-narrow-right"></i>Next
                                </button>
                            )}
                            {step > 1 && (
                                <div className="">
                                    <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center ">
                                        <i className="ti ti-arrow-narrow-left"></i>Previous
                                    </button>
                                    <button type="button" onClick={handleSubmit} className="ti-btn ti-btn-success justify-center float-end">
                                        <i className="ti ti-send"></i>Update
                                    </button>

                                </div>
                            )}
                        </div>
                    </form>
                    {/* Education History */}
                </div>
            </div>
        </div>
    );
};
export default EditTraining;
