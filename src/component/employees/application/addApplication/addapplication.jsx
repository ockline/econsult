
import React, { useState, useEffect } from "react";
import { JobTitleData, EmployerData,  DepartmentData,  EmployeeDependent,  DependantTypeData } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";
import Swal from "sweetalert2";



const AddApplication = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;


    let navigate = useNavigate();
   
    
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
    
    
    const [isDocumentChecked, setIsDocumentChecked] = useState({});

  
    // Function to handle checkbox changes
    const handleDocumentCheckboxChange = (documentId) => {
        // Update the state with the new checked state for the specific documentId
        setIsDocumentChecked(prevState => ({
            ...prevState,
            [documentId]: !prevState[documentId] // Toggle the checked state
        }));
    };
    
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        employee_id: '',
        employer_id: '',
        department_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        national_id: '',
        section: '',
        personal_type: '',
        transfer_from: '',
        site_pass_type: '',
        from_date: '',
        end_date: '',
        duration_deployment: '',
        birth_place: '',
        job_title_id: '',
        purpose: '',
        supportiveDocumentAttached: '',
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

    // console.log('form... ', formData);
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
        console.log('Supportive Documents Checked State:', isDocumentChecked);
        const DataToSend = {
            // employee_id: formData.employee_id,
            employee_id: formData.employee_id,
            department_id: formData.department_id,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            national_id: formData.national_id,
            employer_id: formData.employer_id,
            section: formData.section,
            personal_type: formData.personal_type,
            transfer_from: formData.transfer_from,
            site_pass_type: formData.site_pass_type,
            from_date: formData.from_date,
            end_date: formData.end_date,
            duration_deployment: formData.duration_deployment,
            birth_place: formData.birth_place,
            job_title_id: formData.job_title_id,
            purpose: formData.purpose,
            document_verified: isDocumentChecked
        };
        // console.log('datatata',DataToSend)
        try {
            const resp = await axios.post(`${apiBaseUrl}/employees/application/add_application_record`, DataToSend, {
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
                    title: 'Personnel ID Application Created Successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                })
                    .then(() => {

                        // This code will be executed after the "ok" button is clicked and the modal is closed
                        navigate('/employees/applications/all_id_application/'); // Call the navigate function to redirect to the specified route
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
    
  

    

   
    // update document if uploaded   **********************************************
    

    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/application/get_application_document/${id}`).then((res) => {
            // Ensure that all properties are present in the API response
            const updatePersonnelDocData = {
                ...personnelDoc,
                ...res.data.personnel_document,
            };
            setPersonnelData(updatePersonnelDocData);
            // console.log('agaaa', updatePersonnelDocData);
            // console.log(res.data.employee_document);
        })
            .catch((error) => {
                console.error('Error fetching candidate documents:', error);
            });
    }, [id]);


    const handleFileDependantInputChange = (fieldName, files) => {
        setPersonnelData((prevData) => ({
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
            setPersonnelData((prevData) => ({
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

    // const saveDependantDetail = async (e) => {
    //     e.preventDefault();
    //     const DependantData = {

    //         dependant_name: dependantData.dependant_name,
    //         employee_id: formData.id,
    //         dependent_id: dependantData.dependent_id,
    //         other_relationship: dependantData.other_relationship,
    //         dob: dependantData.dob,
    //         dependant_type_id: dependantData.dependant_type_id,
    //         description: dependantData.description

    //     }
    //     try {
    //         const res = await axios.post(`${apiBaseUrl}/employees/social/add_dependant`, DependantData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         });
    //         if (res.data.validator_err) {
    //             // Handle validation errors
    //             const validationErrors = res.data.validator_err;

    //             // Update component state with validation errors
    //             setPersonnelData((prevData) => ({
    //                 ...prevData,
    //                 error_list: validationErrors,
    //             }));
    //         }
    //         else if (res.data.status === 500) {
    //             swal({
    //                 title: 'Sorry! Operation failed',
    //                 text: res.data.message,
    //                 icon: 'warning',
    //                 button: 'ok',
    //             });
    //         } else if (res.data.status === 200) {
    //             swal({
    //                 title: 'Dependant Detail added Successfully',
    //                 text: res.data.message,
    //                 icon: 'success',
    //                 button: 'ok',
    //             }).then(() => {

                    
    //             });
    //         }
    //     } catch (error) {
    //         console.log('Error occurred:', error);

    //         if (error.response && error.response.status === 404) {
    //             console.log('Handling 404 error in catch block');
    //             swal({
    //                 title: 'Resource Not Found',
    //                 text: 'The requested resource was not found on the server.',
    //                 icon: 'error',
    //                 button: 'ok',
    //             })
    //         } else {
    //             console.error("Unexpected error:", error.message);
    //         }
    //     }
    // }

    // /**   Block for document preview  */
   


    const [personnelDoc, setPersonnelData] = useState([]);
    const [documentUrl, setDocumentUrl] = useState('');

    
    
    
    
    
    const handlePreviewClick = (description) => {
        // Assuming the documents are stored in a specific folder on the server      
        const absoluteUrl = `${docBaseUrl}/employees/personal/${description}`;
        console.log('absoluteUrl', absoluteUrl);
        // Update the state with the document URL
        setDocumentUrl(absoluteUrl);

    };

    return (
        <div>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Create Personnel ID Application</h1>
                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/applications/all_id_application/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/applications/create_application/${formData.id}`}>
                            Add Personnel ID Application

                        </a>
                    </li>
                </ol>
            </div>


            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Add Personnel ID Application Details</h1>
                    <Link to={`${import.meta.env.BASE_URL}employees/applications/all_id_application/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                        {step === 1 && (

                            <div className="grid lg:grid-cols-3 gap-6">

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">ID Tpye</label>
                                    <input type="text" className="my-auto ti-form-input" placeholder="Employee" name="id_type" value="Employee"
                                        onChange={(e) => handleInputChange('id_type', e.target.value)} readOnly />
                                </div>
                                
 
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">FirstName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="firstname" className="my-auto ti-form-input text-medium text-black" placeholder="Employee firstname" value={formData.firstname}
                                        onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.firstname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">MiddleName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="middlename" className="my-auto ti-form-input text-md text-black" placeholder="Middlename" value={formData.middlename}
                                        onChange={(e) => handleInputChange('middlename', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.middlename}</span>
                                </div> <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">LastName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="lastname" className="my-auto ti-form-input text-md text-black" value={formData.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} placeholder="Employee Lastname" required />
                                    <span className="text-danger">{formData.error_list.lastname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Title Name <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="department_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} required />
                                    <span className="text-danger">{formData.error_list.job_title_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Phone Number <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="phone_number" className="my-auto ti-form-input  text-black" value={formData.phone_number}
                                        onChange={(e) => handleInputChange('phone_number', e.target.value)} placeholder="Birth place" required />
                                    <span className="text-danger">{formData.error_list.phone_number}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Email Address <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="email_address" className="my-auto ti-form-input  text-black" value={formData.email_address}
                                        onChange={(e) => handleInputChange('email_address', e.target.value)} placeholder="Birth place" required />
                                    <span className="text-danger">{formData.error_list.email_address}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department Name <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="department_id" options={departments} onChange={(selectedOption) => handleInputChange(["department_id"], selectedOption ? selectedOption.value : null)} value={departments.find((option) => option.value === formData.department_id)} required />
                                    <span className="text-danger">{formData.error_list.department_id}</span>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">National id number(NIDA)/Passport<span style={{ color: "red" }}> *</span></label>
                                    <input type="number" name="national_id" className="my-auto ti-form-input text-black" value={formData.national_id}
                                        onChange={(e) => handleInputChange('national_id', e.target.value)} placeholder="nida or passport" required />
                                    <span className="text-danger">{formData.error_list.national_id}</span>
                                </div>
                                <div className="space-y-2" id="attachment">
                                    <label className="ti-form-label mb-0 font-bold text-lg ">NIDA or Passport Attachment <span style={{ color: "red" }}></span> (if didn`t upload)</label>
                                    <input type="file" name="nida_passport_doc" id="small-file-input" onChange={(e) => handleFileInputChange('nida_passport_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employer / Company name  <span style={{ color: "red" }}> *</span></label>
                                   
                                    <Creatable classNamePrefix="react-select" name="employer_id" options={employers} onChange={(selectedOption) => handleInputChange(["employer_id"], selectedOption ? selectedOption.value : null)} value={employers.find((option) => option.value === formData.employer_id)} required />
                                    <span className="text-danger">{formData.error_list.employer_id}</span>

                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employment Start Date:</label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <input
                                            type="date" name="duration_deployment" className="my-auto ti-form-input text-black"
                                            placeholder="" value={new Date(formData.duration_deployment).toLocaleDateString('en-CA')} // Format the date
                                            onChange={(e) => handleInputChange('duration_deployment', e.target.value)} required
                                        />
                                        <span className="text-danger">{formData.error_list.duration_deployment}</span>
                                    </div>
                                </div>
                                <div className="space-y-2" id="safety-induction">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Site Pass TypeHave you attended site safety induction? <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="safety_induction" onChange={(e) => handleInputChange('safety_induction', e.target.value)} value="1" className="ti-form-radio" id="safety_induction" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70" >Yes</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="safety_induction" onChange={(e) => handleInputChange('safety_induction', e.target.value)} value="2" className="ti-form-radio" id="safety_induction-1" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Emergency Contact Name <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="emergency_contact_name" className="my-auto ti-form-input text-black" value={formData.emergency_contact_name}
                                        onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)} placeholder="Emergency contact name" required />
                                    <span className="text-danger">{formData.error_list.emergency_contact_name}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Emergency Contact Number  <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="emergency_contact_number" className="my-auto ti-form-input text-black" value={formData.emergency_contact_number}
                                        onChange={(e) => handleInputChange('emergency_contact_number', e.target.value)} placeholder="Emergency contact number" required />
                                    <span className="text-danger">{formData.error_list.emergency_contact_number}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Purpose  <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="purpose" className="my-auto ti-form-input text-black" value={formData.purpose}
                                        onChange={(e) => handleInputChange('purpose', e.target.value)} placeholder="Purpose of this application" required />
                                    <span className="text-danger">{formData.error_list.purpose}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Supervisor Name </label>
                                    <input type="text" name="supervisor_name" className="my-auto ti-form-input text-black" value={formData.supervisor_name}
                                        onChange={(e) => handleInputChange('section', e.target.value)} placeholder="Section name" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Check if supportive document attached <span style={{ color: "red" }}> *</span></label>
                                    <Link to="#" className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-primary m-0 whitespace-nowrap" data-hs-overlay="#supportive-document" >
                                        <i className="ti ti-eye"></i>Update Supportive document
                                    </Link>&nbsp;
                                </div>
                            </div>
                        )}

                        <br />
                        <div>

                            {step === 1 && (
                                <div className="float-end">
                                    <button type="button" onClick={handleSubmit} className="ti-btn ti-btn-success  justify-center">
                                        <i className="ti ti-layout-grid-add"></i>Submit Request
                                    </button>
                                    <Link to={`${import.meta.env.BASE_URL}employees/applications/all_id_application/`} className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-danger m-0 whitespace-nowrap" data-hs-overlay="#task-compose" >
                                        <i className="ti ti-x"></i>Cancel
                                    </Link>&nbsp;
                                   
                                  
                                </div>
                            )}
                        </div>
                        <div id="supportive-document" className="hs-overlay hidden ti-modal">
                            <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out sm:!max-w-6xl">
                                <div className="ti-modal-content">
                                    <div className="ti-modal-header">
                                        <h3 className="ti-modal-title  mb-0 font-bold text-lg justify-center" >Check all  supportive document Details</h3>
                                        <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#supportive-document">
                                            <span className="sr-only">Close</span>
                                            <i className="ri-close-line"></i>
                                        </button>
                                    </div>
                                    <div className="ti-modal-body">
                                        <div className="overflow-auto">
                                            <table className="ti-custom-table  table-bordered ti-custom-table-head">
                                                <thead className="bg-gray-50 dark:bg-black/20">
                                                    <tr>
                                                        <th>S/No</th>
                                                        <th scope="col" className="!min-w-[13rem]">Document Name</th>
                                                        <th scope="col">Files</th>
                                                        <th scope="col">Size</th>
                                                        <th scope="col">Modified Date</th>
                                                        <th scope="col" className="!text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(personnelDoc).length > 0 ? (
                                                        Object.values(personnelDoc).map((document, index) => (
                                                            <tr key={document.id}>
                                                                <td>{index + 1}</td>
                                                                <td className="font-medium">
                                                                    {document.doc_name}
                                                                </td>
                                                                <td>1</td>
                                                                <td>2MB</td>
                                                                <td>{document.doc_modified}</td>
                                                                <td>
                                                                    <td className="text-center">
                                                                        <div className="flex items-center h-5 invoice-checkbox justify-center" key={document.id}>
                                                                            <input
                                                                                id={`supportive-document-${document.document_id}`}
                                                                                type="checkbox"
                                                                                className="border-gray-500 ti-form-checkbox"
                                                                                checked={isDocumentChecked[document.document_id] || false}
                                                                                onChange={() => handleDocumentCheckboxChange(document.document_id)}
                                                                            />
                                                                            <label htmlFor={`supportive-document-${document.document_id}`} className="sr-only">
                                                                                Checkbox
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                                                                                                            
                                                                </td>
                                                            </tr>
                                                        ))) : (
                                                        // Handle non-array case (e.g., show an error message)
                                                        <p>No assessed documents available.</p>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    
                                        <div className="ti-modal-footer-1 sm:flex !block space-y-2 text-end float-end">
                                            <button type="button"
                                                className="hs-dropdown-toggle ti-btn ti-border font-medium bg-warning text-gray-600 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10 float-left"
                                                data-hs-overlay="#supportive-document">
                                                Cancel
                                            </button>
                                            <button type="button"
                                                className="hs-dropdown-toggle ti-btn ti-border font-medium bg-success text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10 float-left"
                                                data-hs-overlay="#supportive-document">
                                                Update Document
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {/* block to cross check Document uploaded   */}
                </div>
            </div>
        </div>
    );
};
export default AddApplication;
