
import React, { useState, useEffect } from "react";
import { EmployerData, JobTitleData, ContractType,DependantTypeData } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";
import Swal from "sweetalert2";



const EditContractDetail = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        employee_id: '',
        contract_id: '',
        employer_id: '',
        job_title_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        gender: '',
        phone_number: '',
        email: '',
        birth_place: '',
        dob: '',
        age: '',
        postal_address: '',
        residence_place: '',
        permanent_residence: '',
        place_recruitment: '',
        work_station: '',
        date_employed: '',
        fullname_next1: '',
        residence1: '',
        phone_number1: '',
        relationship1: '',
        fullname_next2: '',
        residence2: '',
        phone_number2: '',
        relationship2: '',
        job_description_doc: null,
        contract_detail_signed: null,
        passport_attachment: null,
        error_list: [],
    });
    //fetch contract_detail data'
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${apiBaseUrl}/contracts/required/edit_contract_detail/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatedFormData = {
                ...formData,
                ...res.data.contract_detail,
                
            };
            setFormData(updatedFormData);
            console.log(updatedFormData);
            if (res.data.status === 404) {
                Dangersweetalert()  
                
                // This code will be executed after the "ok" button is clicked and the modal is closed
                navigate('/contracts/required_details/'); // Call the navigate function to redirect to the specified route
               
            }
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

    const handleUpdate = async (e) => {
        // Handle form submission logic here
        e.preventDefault();
        // console.log('Form submitted:', formData);
        const DataToSend = {
            // employee_id: formData.,
            contract_id: formData.contract_id,
            employer_id: formData.employer_id,
            job_title_id: formData.job_title_id,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            gender: formData.gender,
            phone_number: formData.phone_number,
            email: formData.email,
            birth_place: formData.birth_place,
            dob: formData.dob,
            age: formData.age,
            postal_address: formData.postal_address,
            residence_place: formData.residence_place,
            permanent_residence: formData.permanent_residence,
            place_recruitment: formData.place_recruitment,
            work_station: formData.work_station,
            date_employed: formData.date_employed,
            fullname_next1: formData.fullname_next1,
            residence1: formData.residence1,
            phone_number1: formData.phone_number1,
            relationship1: formData.relationship1,
            fullname_next2: formData.fullname_next2,
            residence2: formData.residence2,
            phone_number2: formData.phone_number2,
            relationship2: formData.relationship2,
            employee_id: formData.id,
            job_description_doc: formData.job_description_doc,
            contract_detail_signed: formData.contract_detail_signed,
            passport_attachment: formData.passport_attachment,
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/contracts/required/update_contract_detail/${id}`, DataToSend, {
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

                // This code will be executed after the "ok" button is clicked and the modal is closed
                navigate('/contracts/required_details/'); // Call the navigate function to redirect to the specified route
                });
            }
        }
        catch (error) {
            console.error("Unexpected error:", error.message);
        };
    };
	function Dangersweetalert() {
		Swal.fire({
			// text: " Welcome to Your Admin Page",
			allowOutsideClick: false,
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: '<a href="">No data found, Kindly add, then  you may edit </a>'
		});
	}

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
                    'Contract details Saved!',
                    'Contract details completed Successfully.',
                    'success'
                ).then(() => {
                    navigate('/contracts/required_details/');
                })

            }
        })
    }


    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Edit Employee Detail For Contract</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/required_details/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/required/edit_details/${formData.id}`}>
                            Edit Contact Details
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-xl">Update Employee Detail For Contract</h1>
                    <Link to={`${import.meta.env.BASE_URL}contracts/required_details/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleUpdate}>
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
                                    <input type="text" name="firstname" className="my-auto ti-form-input text-black text-lg" placeholder="Employee firstname" value={formData.firstname}
                                        onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.firstname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">MiddleName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="middlename" className="my-auto ti-form-input text-black text-lg" placeholder="Middlename" value={formData.middlename}
                                        onChange={(e) => handleInputChange('middlename', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.middlename}</span>
                                </div> <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">LastName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="lastname" className="my-auto ti-form-input text-black text-lg" value={formData.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} placeholder="Employee Lastname" required />
                                    <span className="text-danger">{formData.error_list.lastname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employer Name <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="employer_id" options={employers} onChange={(selectedOption) => handleInputChange(["employer_id"], selectedOption ? selectedOption.value : null)} value={employers.find((option) => option.value === formData.employer_id)} />
                                    <span className="text-danger">{formData.error_list.employer_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Contract Type <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="contract_id" options={ContractType} onChange={(selectedOption) => handleInputChange(["contract_id"], selectedOption ? selectedOption.value : null)} value={ContractType.find((option) => option.value === formData.contract_id)} />
                                    <span className="text-danger">{formData.error_list.contract_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Job Title<span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} />
                                    <span className="text-danger">{formData.error_list.job_title_id}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Birth place <span style={{ color: "red" }}> *</span> </label>
                                    <input type="text" name="birth_place" className="my-auto ti-form-input text-black text-lg" value={formData.birth_place}
                                        onChange={(e) => handleInputChange('birth_place', e.target.value)} placeholder="Present address" required />

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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Gender<span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="gender" onChange={(e) => handleInputChange('gender', e.target.value)} value="1" className="ti-form-radio" id="gender" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Male</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="gender" onChange={(e) => handleInputChange('gender', e.target.value)} value="2" className="ti-form-radio" id="gender-1" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Female</span>
                                        </label>
                                    </div>

                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Residence area<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Residence area" name="residence_place" value={formData.residence_place}
                                        onChange={(e) => handleInputChange('residence_place', e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Permanent Residence<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Permanent Residence" name="permanent_residence" value={formData.permanent_residence}
                                        onChange={(e) => handleInputChange('permanent_residence', e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Email Address<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Email Address" name="email" value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Postal Address<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Postal Address" name="postal_address" value={formData.postal_address}
                                        onChange={(e) => handleInputChange('postal_address', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Phone number<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Phone number" name="phone_number" value={formData.phone_number}
                                        onChange={(e) => handleInputChange('phone_number', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Place of Recruitment<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Place of recruitment" name="place_recruitment" value={formData.place_recruitment}
                                        onChange={(e) => handleInputChange('place_recruitment', e.target.value)} />
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Work station <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" className="my-auto ti-form-input text-black text-lg" placeholder="Working station" name="work_station" value={formData.work_station}
                                        onChange={(e) => handleInputChange('work_station', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Date Employed <span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="date_employed" className="my-auto ti-form-input text-black text-lg"
                                            placeholder="" value={new Date(formData.date_employed).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('date_employed', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.date_employed}</span>
                                    </div>
                                </div>
                                <div className="space-y-2" id="attachment">
                                            <label className="ti-form-label mb-0 font-bold text-lg ">Job Description Attachment<span style={{ color: "red" }}> *</span> (max size 2MB)</label>
                                            <input type="file" name="job_description_doc" id="small-file-input" onChange={(e) => handleFileInputChange('job_description_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                        </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Next of kin full name1
                                        <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="fullname_next1" className="my-auto ti-form-input" value={formData.fullname_next1}
                                        onChange={(e) => handleInputChange('fullname_next1', e.target.value)} placeholder="First next of kin name" required />
                                    <span className="text-danger">{formData.error_list.fullname_next1}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Next of kin residence name1
                                        <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="residence1" className="my-auto ti-form-input" value={formData.residence1}
                                        onChange={(e) => handleInputChange('residence1', e.target.value)} placeholder="First kin Residence" required />
                                    <span className="text-danger">{formData.error_list.residence1}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Mobile number1 <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="phone_number1" className="my-auto ti-form-input" value={formData.phone_number1}
                                        onChange={(e) => handleInputChange('phone_number1', e.target.value)} placeholder="Phone  number" required />
                                    <span className="text-danger">{formData.error_list.phone_number1}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Relationship1 <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="relationship1" options={relationships} onChange={(selectedOption) => handleInputChange(["relationship1"], selectedOption ? selectedOption.value : null)} value={relationships.find((option) => option.value === formData.relationship1)} />
                                    <span className="text-danger">{formData.error_list.relationship1}</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Next of kin full name2
                                        <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="fullname_next2" className="my-auto ti-form-input" value={formData.fullname_next2}
                                        onChange={(e) => handleInputChange('fullname_next2', e.target.value)} placeholder="Second next of kin name" required />
                                    <span className="text-danger">{formData.error_list.fullname_next2}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Next of kin residence name2
                                        <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="residence2" className="my-auto ti-form-input" value={formData.residence2}
                                        onChange={(e) => handleInputChange('residence2', e.target.value)} placeholder="First kin Residence" required />
                                    <span className="text-danger">{formData.error_list.residence2}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Mobile number2 <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="phone_number2" className="my-auto ti-form-input" value={formData.phone_number2}
                                        onChange={(e) => handleInputChange('phone_number2', e.target.value)} placeholder="Phone  number" required />
                                    <span className="text-danger">{formData.error_list.phone_number2}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Relationship2 <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="relationship2" options={relationships} onChange={(selectedOption) => handleInputChange(["relationship2"], selectedOption ? selectedOption.value : null)} value={relationships.find((option) => option.value === formData.relationship2)} />
                                    <span className="text-danger">{formData.error_list.relationship2}</span>
                                </div>
                                <div className="space-y-2" id="attachment">
                                            <label className="ti-form-label mb-0 font-bold text-lg ">Signed Contract Details<span style={{ color: "red" }}> *</span> (max size 2MB)</label>
                                            <input type="file" name="contract_detail_signed" id="small-file-input" onChange={(e) => handleFileInputChange('contract_detail_signed', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                </div>
                                
                                <div className="space-y-2" id="attachment">
                                            <label className="ti-form-label mb-0 font-bold text-lg ">Passport Attachment<span style={{ color: "red" }}> *</span> (max size 2MB)</label>
                                            <input type="file" name="passport_attachment" id="small-file-input" onChange={(e) => handleFileInputChange('passport_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
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
                                    <button type="button" onClick={handleUpdate} className="ti-btn ti-btn-success  justify-center">
                                        <i className="ti ti-corner-up-right-double"></i>Update Contract Details                                    </button>
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
export default EditContractDetail;
