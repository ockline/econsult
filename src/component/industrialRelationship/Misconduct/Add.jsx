import React, { useState, useEffect } from "react";
import { fetchMisconductType } from '/src/common/industrialdata';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import axios from "axios";
import Swal from "sweetalert2";
import CreatableSelect from 'react-select/creatable';



const AddMisconduct = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    let navigate = useNavigate();
    
    
    	async function initialize() {
		// perform request to obtain user details and set to the redux state
		setInitializing(true);
        try {
            const token = await sessionStorage.getItem('token');
            // console.log('CSRF Token:', token);
            // Use the retrieved CSRF token in your request
            const resp = await axios.get(`${apiBaseUrl}/get_user_token`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

			// set user and roles to redux
			
			UserChanger(resp.data.user);
			RolesChanger(resp.data.user_roles.map(r => r.alias));
			setInitializing(false)
		} catch (e) {
			// navigate to login page
			console.log(e)
			navigate('')
		}
	}
    
   
    
    const [misconductTypes, setMisconductTypes] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const misconduct = await fetchMisconductType(); // Fetch the misconduct data
            const formattedMisconduct = misconduct.map(item => ({
                value: item.id,
                label: item.name
            }));
            setMisconductTypes(formattedMisconduct); // Update state with formatted data
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    fetchData();
}, []);

    
    console.log('misconduct', misconductTypes);
    
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
    
     const [isLoading, setIsLoading] = useState(false);
     const [searchQuery, setSearchQuery] = useState(''); // For employee number search

  // Function to fetch employee data based on the employee number (searchQuery)
  const getEmployeeDetail = async (id) => {
    try {
      const res = await axios.get(`${apiBaseUrl}/leaves/retrieve_employee_detail/${id}`);
      const updatedFormData = {
        ...formData,
        ...res.data.employee, // Assuming the response has 'employee' object
      };
      setFormData(updatedFormData);
    } catch (error) {
      console.error('Error fetching employee data:', error.message);
    }
  };

  // Trigger the fetch when search query changes
  useEffect(() => {
    if (searchQuery !== '') {
      getEmployeeDetail(searchQuery); // Pass employee number to the function
    }
  }, [searchQuery]);

  // Handle changes in form input
  
    
     const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        leave_id: '',
        location: '',
        employee_id: '',
        employer_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        misconduct_date: '', 
        misconduct_cause: '',
        investigation_report: '',
        incidence_remarks: '',
        incidence_reported_by: '',
        incidence_reported_date: '',
        investigation_report_attachment: null,
        error_list: [],
    });
    
    

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

    const handleSubmit = async (e) => {
        // Handle form submission logic here
        e.preventDefault();
        // console.log('Form submitted:', formData);
        const DataToSend = {
            employee_id: formData.employee_id,
            misconduct_cause: formData.misconduct_cause,
            employer_id: formData.employer_id,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            location: formData.location,
            misconduct_date: formData.misconduct_date,
            investigation_report: formData.investigation_report,
            incidence_remarks: formData.incidence_remarks,
            incidence_reported_by: formData.incidence_reported_by,
            incidence_reported_date: formData.incidence_reported_date,
            investigation_report_attachment: formData.investigation_report_attachment
           
            
        };
         setIsLoading(true);
    try {
      const resp = await axios.post(`${apiBaseUrl}/industrial_relationship/create_misconduct`, DataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (resp.data.validator_err) {
        const validationErrors = resp.data.validator_err;
        setFormData((prevData) => ({
          ...prevData,
          error_list: validationErrors,
        }));

        const formattedErrors = Object.keys(validationErrors)
          .map((field) => `${validationErrors[field].join(", ")}`)
          .join("\n");

        swal({
          title: "Failed",
          text: formattedErrors,
          icon: "error",
          button: "OK",
        });
      } else if (resp.data.status === 404 || resp.data.status === 500) {
        swal({
          title: "Failed",
          text: resp.data.message,
          icon: "warning",
          button: "OK",
        });
      } else if (resp.data.status === 200) {
        swal({
          title: "Success",
          text: resp.data.message,
          icon: "success",
          button: "OK",
          closeOnClickOutside: false,
        }).then(() => {
          navigate("/industrials/misconducts/");
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    } finally {
      setIsLoading(false); // Ensure loading is stopped after try-catch
    }
  };
    
    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Create Misconduct</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/misconducts/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/misconducts/`}>
                            Add Misconduct Details
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Create Misconduct</h1>
                    <Link to={`${import.meta.env.BASE_URL}industrials/misconducts/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                        {step === 1 && (

                            <div className="grid lg:grid-cols-3 gap-6">

                               
                                 <div className="space-y-2">
                                <div className="relative sm:max-w-xs max-w-[210px]">
                                    <label className="ti-form-label mb-0 font-bold text-lg">
                                        Search <span style={{ color: "red" }}> *</span>
                                    </label>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none h-full top-0">
                                        <i className="ti ti-search mb-0 mt-7"></i>
                                    </div>
                                    <input
                                        type="text"
                                        name="hs-table-search"
                                        id="hs-table-search"
                                        autoComplete="off"
                                        className="p-2 pr-10 ti-form-input"
                                        placeholder="Search by Employee Number"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                                    />
                                </div>
                            </div>

                                <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Misconduct Cause<span style={{ color: "red" }}> *</span></label>
                                    <CreatableSelect
                                        isMulti
                                        classNamePrefix="react-select"
                                        name="misconduct_cause"
                                        options={misconductTypes}
                                        onChange={(selectedOptions) => {
                                            handleInputChange('misconduct_cause', selectedOptions ? selectedOptions.map(option => option.value) : []);
                                        }}
                                        value={misconductTypes.filter(option => formData.misconduct_cause.includes(option.value))}
                                        placeholder="Select Misconduct Causes"
                                    />
                                    <span className="text-danger">{formData.error_list.misconduct_cause}</span>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Investigation report</label>
                                    <textarea 
                                        type="text" 
                                        name="investigation_report" 
                                        className="my-auto ti-form-input text-black border-red-500 text-md" 
                                        value={formData.investigation_report} 
                                        onChange={(e) => handleInputChange('investigation_report', e.target.value)} 
                                        placeholder="Write Comment if any" 
                                    />
                                </div>                                
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">	Investigation report Attachment</label>
                                            <input type="file" accept=".pdf" name="investigation_report_attachment" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('investigation_report_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                          
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
                                    Submit
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
export default AddMisconduct;
