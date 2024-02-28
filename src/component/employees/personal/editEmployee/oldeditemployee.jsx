
import React, { useState, useEffect } from "react";
import { JobTitleData, PackageData, RegionData, BankData, BankBranchData, UsersData, DepartmentData, NationalityData, RankingCriterialData } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";



const EditEmployee = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        job_title_id: '',
        cost_center_id: '',
        cost_number: '',
        firstname: '',
        middlename: '',
        lastname: '',
        employee_name: '',
        interview_number: '',
        military_service: '',
        military_number: '',
        name_language: '',
        gender: '',
        package_id: '',
        department_id: '',
        national_id: '',
        passport_id: '',
        marital_status: '',
        spause_name: '',
        telephone_home: '',
        telephone_office: '',
        mobile_number: '',
        email: '',
        dob: '',
        nationality_id: '',
        driving_licence: '',
        place_issued: '',
        chronic_disease: '',
        chronic_remark: '',
        surgery_operation: '',
        surgery_remark: '',
        employed_before: '',
        from_date: '',
        to_date: '',
        position: '',
        relative_working: '',
        relative_name: '',
        former_department: '',
        transfer_change: '',
        transfer_reasons: '',
        bank_id: '',
        account_number: '',
        bank_branch_id: '',
        account_name: '',
        nssf: '',
        wcf: '',
        tin: '',
        nhif: '',
        company_name: '',
        employer_from_date: '',
        employer_to_date: '',
        readiness_employee: '',
        military_doc: null,
        marriage_cert: null,
        error_list: [],
    });

    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/edit_employee/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.employee,
            };
            setFormData(updatedFormData);
            console.log(updatedFormData);
        });
    }, [id])

    const handleFileInputChange = (fieldName, files) => {
        const file = files[0]; // Assuming single file selection, update accordingly for multiple files

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: file,
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
            job_title_id: formData.job_title_id,
            cost_center_id: formData.cost_center_id,
            cost_number: formData.cost_number,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            employee_name: formData.employee_name,
            interview_number: formData.interview_number,
            military_service: formData.military_service,
            military_number: formData.military_number,
            name_language: formData.name_language,
            gender: formData.gender,
            package_id: formData.package_id,
            department_id: formData.department_id,
            national_id: formData.national_id,
            passport_id: formData.passport_id,
            marital_status: formData.marital_status,
            spause_name: formData.spause_name,
            telephone_home: formData.telephone_home,
            telephone_office: formData.telephone_office,
            mobile_number: formData.mobile_number,
            email: formData?.email,
            dob: formData?.dob,
            nationality_id: formData.nationality_id,
            driving_licence: formData.driving_licence,
            place_issued: formData.place_issued,
            chronic_disease: formData.chronic_disease,
            chronic_remark: formData.chronic_remark,
            surgery_operation: formData.surgery_operation,
            surgery_remark: formData.surgery_remark,
            employed_before: formData.employed_before,
            from_date: formData.from_date,
            to_date: formData.to_date,
            position: formData.position,
            relative_working: formData.relative_working,
            relative_name: formData.relative_name,
            former_department: formData.former_department,
            transfer_change: formData.transfer_change,
            transfer_reasons: formData.transfer_reasons,
            bank_id: formData.bank_id,
            account_number: formData.account_number,
            bank_branch_id: formData.bank_branch_id,
            account_name: formData.account_name,
            nssf: formData.nssf,
            wcf: formData.wcf,
            tin: formData.tin,
            nhif: formData.nhif,
            company_name: formData.company_name,
            employer_from_date: formData.employer_from_date,
            employer_to_date: formData.employer_to_date,
            readiness_employee: formData.readiness_employee,
            // marriage_cert: formData.military_doc, 
            // military_doc: formData.military_doc,
            // hr_attachment: formData.hr_attachment,  

        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/employees/update_employee/${id}`, DataToSend, {
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
                    title: 'Employee Personnel Updated Successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                }).then(() => {

                    // This code will be executed after the "ok" button is clicked and the modal is closed
                    navigate('/employees/personal/employee_list/'); // Call the navigate function to redirect to the specified route
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

    const [banks, setBanks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bank = await BankData();
                setBanks(bank);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);

    // Branches  *********************

    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const branche = await BankBranchData();
                setBranches(branche);
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

    return (
        <div>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>New Employee Person Details</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/personal/employee_list`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/personal/add_employee`}>
                            New Employee
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>


            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Add Employee Person Details</h1>
                    <Link to={`${import.meta.env.BASE_URL}hiring/recruitments/hr_interviewed`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Position Applied for  <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} />
                                    <span className="text-danger">{formData.error_list.job_title_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Name in other language </label>
                                    <input type="text" name="name_language" className="my-auto ti-form-input" placeholder="Candidate name_language" value={formData.name_language}
                                        onChange={(e) => handleInputChange('name_language', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.name_language}</span>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Present Address   <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="present_address" className="my-auto ti-form-input" value={formData.present_address}
                                        onChange={(e) => handleInputChange('present_address', e.target.value)} placeholder="Present address" required />
                                    <span className="text-danger">{formData.error_list.present_address}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Nationality  <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="nationality_id" options={countries} onChange={(selectedOption) => handleInputChange(["nationality_id"], selectedOption ? selectedOption.value : null)} value={countries.find((option) => option.value === formData.nationality_id)} />
                                    <span className="text-danger">{formData.error_list.nationality_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Job code </label>
                                    <input type="number" name="job_code" className="ti-form-input" placeholder="Job Code" value={formData.job_code}
                                        onChange={(e) => handleInputChange('job_code', e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Package Name</label>
                                    <Creatable classNamePrefix="react-select" name="package_id" options={packages} onChange={(selectedOption) => handleInputChange(["package_id"], selectedOption ? selectedOption.value : null)} value={packages.find((option) => option.value === formData.package_id)} />

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department Name <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="department_id" options={departments} onChange={(selectedOption) => handleInputChange(["department_id"], selectedOption ? selectedOption.value : null)} value={departments.find((option) => option.value === formData.department_id)} />
                                    <span className="text-danger">{formData.error_list.department_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Telephone home number <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="telephone_home" className="my-auto ti-form-input" value={formData.telephone_home}
                                        onChange={(e) => handleInputChange('telephone_home', e.target.value)} placeholder="Telephone home number" required />

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Telephone Office number <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="telephone_office" className="my-auto ti-form-input" value={formData.telephone_office}
                                        onChange={(e) => handleInputChange('telephone_office', e.target.value)} placeholder="Telephone office number" required />

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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Telephone Mobile number <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="mobile_number" className="my-auto ti-form-input" value={formData.mobile_number}
                                        onChange={(e) => handleInputChange('mobile_number', e.target.value)} placeholder="Telephone mobile number" required />

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Email Address <span style={{ color: "red" }}> *</span></label>
                                    <input type="email" name="email" className="my-auto ti-form-input" value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)} placeholder="you@site.com" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Date of Birth<span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date"
                                            name="dob"
                                            className="my-auto ti-form-input"
                                            placeholder=""
                                            value={new Date(formData.dob).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('dob', e.target.value)}
                                            required
                                        />


                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">National id <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="national_id" className="my-auto ti-form-input" value={formData.national_id}
                                        onChange={(e) => handleInputChange('national_id', e.target.value)} placeholder="passport id" required />

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Passport id <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="passport_id" className="my-auto ti-form-input" value={formData.passport_id}
                                        onChange={(e) => handleInputChange('passport_id', e.target.value)} placeholder="passport id" required />

                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">	Military Services<span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="military_service" onChange={(e) => handleInputChange('military_service', e.target.value)} value="1" className="ti-form-radio" id="military_service" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70" >Completed</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="military_service" onChange={(e) => handleInputChange('military_service', e.target.value)} value="2" className="ti-form-radio" id="military_service-1" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Didn`t Attend</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Military number </label>
                                    <input type="number" name="military_number" className="my-auto ti-form-input" value={formData.military_number}
                                        onChange={(e) => handleInputChange('military_number', e.target.value)} placeholder="military_number" required />

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg ">Military Attachment</label>
                                    <input type="file" name="military_doc" id="small-file-input"
                                        onChange={(e) => handleFileInputChange('military_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />

                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Marital Ststus<span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="marital_status" onChange={(e) => handleInputChange('marital_status', e.target.value)} value="1" className="ti-form-radio" id="marital_status" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Married</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="marital_status" onChange={(e) => handleInputChange('marital_status', e.target.value)} value="2" className="ti-form-radio" id="marital_status-1" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Single</span>
                                        </label>
                                    </div>

                                </div>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Gender <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="gender" value="1" className="ti-form-radio" id="gender" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Male</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="gender" value="2" className="ti-form-radio" id="hs-radio-checked-in-form" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Female</span>
                                        </label>
                                    </div>
                                    <span className="text-danger">{formData.error_list.gender}</span>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="grid lg:grid-cols-3 gap-6 second-page none" id="new_page">
                                <div className=" space-y-2">
                                </div>
                                <div className=" space-y-2">
                                    <h2 className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                                    >
                                        Third Page
                                        <span className="badge py-0.5 px-1.5 bg-black/50 text-white">3</span>
                                    </h2>
                                </div>
                                <div className=" space-y-2">
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">	Do you have driving licence?<span style={{ color: "red" }}> *</span></label>
                                    <ul className="flex flex-col sm:flex-row">
                                        <li className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                                <div className="flex items-center h-5">
                                                    <input id="driving_licence-1" name="driving_licence" type="radio" className="ti-form-radio" />
                                                </div>
                                                <label htmlFor="driving_licence-1" className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                    Light
                                                </label>
                                            </div>
                                        </li>

                                        <li className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                                <div className="flex items-center h-5">
                                                    <input id="driving_licence-2" name="driving_licence" type="radio" className="ti-form-radio" />
                                                </div>
                                                <label htmlFor="driving_licence-2" className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                    Heavy
                                                </label>
                                            </div>
                                        </li>

                                        <li className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                                <div className="flex items-center h-5">
                                                    <input id="driving_licence-3" name="driving_licence" type="radio" className="ti-form-radio" />
                                                </div>
                                                <label htmlFor="driving_licence-3" className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                    Equipment
                                                </label>
                                            </div>
                                        </li>
                                        <li className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                                <div className="flex items-center h-5">
                                                    <input id="driving_licence-4" name="driving_licence" type="radio" className="ti-form-radio" defaultChecked />
                                                </div>
                                                <label htmlFor="driving_licence-3" className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                    None
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Place of Issued</label>
                                    <input type="text" className="my-auto ti-form-input" placeholder="Place issued" name="place_issued" value={formData.place_issued}
                                        onChange={(e) => handleInputChange('place_issued', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Do you suffer from any chronic disease?  <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('chronic_disease', e.target.value)} value="1" name="chronic_disease" className="ti-form-radio" id="chronic_disease" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('chronic_disease', e.target.value)} value="2" name="chronic_disease" className="ti-form-radio" id="chronic_disease" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">If yes, Please specify  </label>
                                    <input type="text" name="chronic_remarks" className="my-auto ti-form-input" value={formData.chronic_remarks}
                                        onChange={(e) => handleInputChange('chronic_remarks', e.target.value)} placeholder="If yes, Please specify" required />

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Did you have any surgery operation before? <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('surgery_operation', e.target.value)} value="1" name="surgery_operation" className="ti-form-radio" id="surgery_operation" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('surgery_operation', e.target.value)} value="2" name="surgery_operation" className="ti-form-radio" id="surgery_operation-1" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">If yes, Please specify</label>
                                    <input type="text" name="surgery_operation_remark" className="my-auto ti-form-input" value={formData.surgery_operation_remark}
                                        onChange={(e) => handleInputChange('surgery_operation_remark', e.target.value)} placeholder="If yes, Please specify" />

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Have you ever been employed before?  <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('employed_before', e.target.value)} value="1" name="employed_before" className="ti-form-radio" id="employed_before" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('employed_before', e.target.value)} value="2" name="employed_before" className="ti-form-radio" id="employed_before" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">If yes, From  </label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date"
                                            name="from_date"
                                            className="my-auto ti-form-input"
                                            placeholder=""
                                            value={new Date(formData.from_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('from_date', e.target.value)}
                                            required
                                        />

                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">If yes, to</label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date"
                                            name="to_date"
                                            className="my-auto ti-form-input"
                                            placeholder=""
                                            value={new Date(formData.to_date).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('to_date', e.target.value)}
                                            required
                                        />

                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Position </label>
                                    <input type="text" name="position" className="my-auto ti-form-input" value={formData.position}
                                        onChange={(e) => handleInputChange('position', e.target.value)} placeholder="Position" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Relative inside (Client) <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('relative_inside', e.target.value)} value="1" name="relative_inside" className="ti-form-radio" id="relative_inside" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('relative_inside', e.target.value)} value="2" name="relative_inside" className="ti-form-radio" id="relative_inside" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">If yes: Relative name </label>
                                    <input type="text" name="relative_name" className="my-auto ti-form-input" value={formData.relative_name}
                                        onChange={(e) => handleInputChange('relative_name', e.target.value)} placeholder="Relative name" required />

                                </div>

                                {/* Rest of Step 3 form fields */}
                            </div>
                        )}
                        {step === 4 && (
                            <div className="grid lg:grid-cols-3 gap-6 second-page none" id="new_page">
                                <div className=" space-y-2">
                                </div>
                                <div className=" space-y-2">
                                    <h2 className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                                    >
                                        Last Page
                                        <span className="badge py-0.5 px-1.5 bg-black/50 text-white">4</span>
                                    </h2>
                                </div>
                                <div className=" space-y-2">
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Relationship </label>
                                    <input type="text" name="relationship" className="my-auto ti-form-input" value={formData.relationship}
                                        onChange={(e) => handleInputChange('relationship', e.target.value)} placeholder="Relationship" required />

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department name </label>
                                    <input type="text" name="former_department" className="my-auto ti-form-input" value={formData.former_department}
                                        onChange={(e) => handleInputChange('former_department', e.target.value)} placeholder="Department name" required />

                                </div>


                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Transfer / change date </label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date"
                                            name="transfer_change"
                                            className="my-auto ti-form-input"
                                            placeholder=""
                                            value={new Date(formData.transfer_change).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('transfer_change', e.target.value)}
                                            required
                                        />

                                        {/* <span className="text-danger">{formData.error_list.transfer_change}</span> */}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Transfer reasons </label>
                                    <input type="text" name="transfer_reasons" className="my-auto ti-form-input" value={formData.transfer_reasons}
                                        onChange={(e) => handleInputChange('transfer_reasons', e.target.value)} placeholder="Transfer reasons " required />

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Bank Name <span style={{ color: "red" }}> *</span> </label>
                                    <Creatable classNamePrefix="react-select" name="bank_id" options={banks} onChange={(selectedOption) => handleInputChange(["bank_id"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.bank_id)} />
                                    <span className="text-danger">{formData.error_list.bank_id}</span>

                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Bank Branch  <span style={{ color: "red" }}> *</span> </label>
                                    <Creatable classNamePrefix="react-select" name="bank_branch_id" options={branches} onChange={(selectedOption) => handleInputChange(["bank_branch_id"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.bank_branch_id)} />
                                    <span className="text-danger">{formData.error_list.bank_id}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Bank Account number <span style={{ color: "red" }}> *</span> </label>
                                    <input type="number" name="account_number" className="my-auto ti-form-input" value={formData.account_number}
                                        onChange={(e) => handleInputChange('account_number', e.target.value)} placeholder="Bank number  " />
                                    <span className="text-danger">{formData.error_list.account_number}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Bank Account Name <span style={{ color: "red" }}> *</span> </label>
                                    <input type="text" name="account_name" className="my-auto ti-form-input" value={formData.account_name}
                                        onChange={(e) => handleInputChange('account_name', e.target.value)} placeholder="Bank Account Name  " />
                                    <span className="text-danger">{formData.error_list.account_name}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Nssf Number<span style={{ color: "red" }}> *</span>  </label>
                                    <input type="number" name="nssf" className="my-auto ti-form-input" value={formData.nssf}
                                        onChange={(e) => handleInputChange('nssf', e.target.value)} placeholder="Nssf Number  " />
                                    <span className="text-danger">{formData.error_list.nssf}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">WCF Number <span style={{ color: "red" }}> *</span> </label>
                                    <input type="number" name="wcf" className="my-auto ti-form-input" value={formData.wcf}
                                        onChange={(e) => handleInputChange('wcf', e.target.value)} placeholder="WCF Number  " />
                                    <span className="text-danger">{formData.error_list.wcf}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Tin Number<span style={{ color: "red" }}> *</span>  </label>
                                    <input type="number" name="tin" className="my-auto ti-form-input" value={formData.tin}
                                        onChange={(e) => handleInputChange('tin', e.target.value)} placeholder="tin Number  " />
                                    <span className="text-danger">{formData.error_list.tin}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Nhif Number<span style={{ color: "red" }}> *</span>  </label>
                                    <input type="number" name="nhif" className="my-auto ti-form-input" value={formData.nhif}
                                        onChange={(e) => handleInputChange('nhif', e.target.value)} placeholder="Nhif Number  " />
                                    <span className="text-danger">{formData.error_list.nhif}</span>

                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">When would you be able to start work<span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date"
                                            name="readiness_employee"
                                            className="my-auto ti-form-input"
                                            placeholder=""
                                            value={new Date(formData.readiness_employee).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('readiness_employee', e.target.value)}
                                            required
                                        />


                                    </div>
                                </div>


                                {/* Rest of Step 3 form fields */}
                            </div>
                        )}
                        <br />
                        <div>
                            {step > 1 && step < 4 && (
                                <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
                                    <i className="ti ti-arrow-narrow-left"></i>Previous
                                </button>
                            )}
                            {step > 3 && (
                                <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
                                    <i className="ti ti-arrow-narrow-left"></i>Previous
                                </button>
                            )}

                            {step < 4 && (
                                <button type="button" onClick={handleNextStep} className="ti-btn ti-btn-primary first_page justify-center">
                                    <i className="ti ti-arrow-narrow-right"></i>Next
                                </button>
                            )}

                            {step === 4 && (
                                <button type="button" onClick={handleSubmit} className="ti-btn ti-btn-success  justify-center">
                                    <i className="ti ti-send"></i>Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EditEmployee;
