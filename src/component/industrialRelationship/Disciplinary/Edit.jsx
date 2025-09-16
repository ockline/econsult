
import React, { useState, useEffect } from "react";
import { EmployerData, JobTitleData, ContractType,DependantTypeData } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";
import Swal from "sweetalert2";



const EditDisciplinary = () => {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const token = sessionStorage.getItem('token');


    let navigate = useNavigate();
    
     
    
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        
        employee_id: '',
        employer_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        disciplinary_remark: '',
        disciplinary_date: '',
        disciplinary_comment: '',
        charge_sheet_doc: null,
        error_list: [],
    });
        const { id } = useParams();
    useEffect(() => {
    axios.get(`${apiBaseUrl}/industrial_relationship/disciplinary/show_disciplinary_details/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then((res) => {
        if (res.data.status === 404) {
            Dangersweetalert();
            navigate('/industrials/disciplinaries/');
        } else {
            const updatedFormData = {
                ...formData,
                ...res.data.disciplinary,
            };
            setFormData(updatedFormData);
        }
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}, [id]);

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
            disciplinary_id: id,
            employee_id: formData.employee_id,
            rate_creterial: formData.rate_creterial,
            employer_id: formData.employer_id,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            disciplinary_remark:  formData.disciplinary_remark,
            disciplinary_date: formData.initiated_date,
            disciplinary_comment: formData.disciplinary_comment,
            charge_sheet_doc: formData.charge_sheet_doc,
           
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/industrial_relationship/disciplinary/update_disciplinary`, DataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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
                navigate('/industrials/disciplinaries/'); 
                });
            }
        }
        catch (error) {
            console.error("Unexpected error:", error.message);
        };
    };


   const [searchQuery, setSearchQuery] = useState('');
   useEffect(() => {
        if (searchQuery !== '') {
          getEmployeeDetail(searchQuery); // Pass employee number to the function
        }
     }, [searchQuery]);

 
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
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/disciplinaries/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/disciplinaries/edit_disciplinary/${formData.id}`}>
                           Update Disciplinary Details
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Update Disciplinary Details</h1>
                    <Link to={`${import.meta.env.BASE_URL}industrials/disciplinaries/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                        {step === 1 && (

                            <div className="grid lg:grid-cols-3 gap-6">

                               
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employee Number<span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employer" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" value={formData.employee_id} readOnly onChange={(e) => handleInputChange('employee_id', e.target.value)} placeholder="Employer"  />
                                    {/* <span className="text-danger">{formData.error_list.employer}</span> */}
                                </div>

                              
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">FirstName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="firstname" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Employee firstname"  readOnly value={formData.firstname}
                                        onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.firstname}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">MiddleName </label>
                                    <input type="text" name="middlename" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Middlename" value={formData.middlename} readOnly
                                        onChange={(e) => handleInputChange('middlename', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.middlename}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">LastName <span style={{ color: "red" }}> *</span></label>
                                    <input 
                                        type="text" 
                                        name="lastname" 
                                        className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" 
                                        value={formData.lastname} 
                                        readOnly 
                                        onChange={(e) => handleInputChange('lastname', e.target.value)} 
                                        placeholder="Employee Lastname" 
                                        required 
                                    />
                                </div>

                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employer <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employer" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" value={formData.employer} readOnly onChange={(e) => handleInputChange('employer', e.target.value)} placeholder="Employer" required />
                                    {/* <span className="text-danger">{formData.error_list.employer}</span> */}
                                </div>
                                       <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Case Decision </label>
                                    <input 
                                        type="text" 
                                        name="case_decision" 
                                        className="my-auto ti-form-input text-black bg-gray-100 border-red-500  text-md" 
                                        value={formData.case_decision} 
                                        onChange={(e) => handleInputChange('case_decision', e.target.value)} 
                                        placeholder="Sababu ya malalamiko" readOnly
                                    />
                                </div>    
                                    <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Disciplinary Reason</label>
                                    <textarea 
                                        type="text" 
                                        name="disciplinary_comment" 
                                        className="my-auto ti-form-input text-black  bg-gray-100 border-red-500 text-md" 
                                        value={formData.disciplinary_comment} 
                                        onChange={(e) => handleInputChange('disciplinary_comment', e.target.value)} 
                                        placeholder="Suluhisho lililotafutwa" readOnly
                                    />
                                </div>  
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Disciplinary Comment</label>
                                    <textarea 
                                        type="text" 
                                        name="disciplinary_remark" 
                                        className="my-auto ti-form-input text-black border-red-500 text-md" 
                                        value={formData.disciplinary_remark} 
                                        onChange={(e) => handleInputChange('disciplinary_remark', e.target.value)} 
                                        placeholder="Reason for Disciplinary" 
                                    />
                                </div>                                 
                                
                              <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">
                                    Disciplinary Date <span style={{ color: "red" }}> *</span>
                                </label>
                                <div className="flex rounded-sm overflow-auto">
                                    <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                    <span className="text-sm text-gray-500 dark:text-white/70">
                                        <i className="ri ri-calendar-line"></i>
                                    </span>
                                    </div>
                                    <input 
                                    type="date"
                                    name="initiated_date"
                                    className="my-auto ti-form-input text-black text-lg"
                                    value={new Date(formData.initiated_date).toLocaleDateString('en-CA')}
                                    max={new Date().toISOString().split('T')[0]} 
                                    onChange={(e) => handleInputChange('initiated_date', e.target.value)}
                                    required
                                    />
                                    <span className="text-danger">{formData.error_list.initiated_date}</span>
                                </div>
                                </div>
                                                         
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Charge Sheet Attachment <span style={{ color: "red" }}> *</span></label>
                                            <input type="file" accept=".pdf" name="charge_sheet_doc" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('charge_sheet_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" required/>
                                          
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
                                    Update Disciplinary
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
