
import React, { useState, useEffect } from "react";
import { fetchPerfomanceCriterial } from '/src/common/industrialdata';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import { capacityType} from "/src/common/select2data";
import DatePicker from 'react-datepicker';
import axios from "axios";
import Swal from "sweetalert2";



const AddInCapacity = () => {

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
    
   
    
    const [perfomanceCriterial, setPerfomanceCriterial] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const criterials = await fetchPerfomanceCriterial(); // Fetch the criterials data
            const formattedCriterial = criterials.map(item => ({
                value: item.rate,
                label: item.name
            }));
            setPerfomanceCriterial(formattedCriterial); // Update state with formatted data
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    fetchData();
}, []);

    
    console.log('perfomance', perfomanceCriterial);
    
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
     const [step, setStep] = useState(1);
  // Function to fetch employee data based on the employee number (searchQuery)
    const getEmployeeDetail = async (id) => {
        try {
            const res = await axios.get(
            `${apiBaseUrl}/industrial_relationship/retrieve_employee_details/${id}`,
            {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                },
            }
            );
            const updatedFormData = {
            ...formData,
            ...res.data.employee, // Assuming response includes 'employee' object
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
  
    
    
    const [formData, setFormData] = useState({
        suffering_from: '',
        suffering_period: '',
        investigation_time: '',
        employee_id: '',
        incapacity_type: '',
        daily_duties: '',
        subject_matter: '',
        partient_suggestion: '',
        challenge_daily_duties: '',
        alternative_task: '',
        investigator_name: '',
        investigator_designation: '',
        investigation_date: '', 
        investigation_report: '',
        investigation_report_attachment: '',
        investigator_signature: '',
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
            incapacity_type: formData.incapacity_type,
            suffering_from: formData.suffering_from,
            suffering_period: formData.suffering_period,
            subject_matter: formData.subject_matter,
            daily_duties: formData.daily_duties,
            challenge_daily_duties: formData.challenge_daily_duties,
            alternative_task: formData.alternative_task,
            investigator_name: formData.investigator_name,
            partient_suggestion: formData.partient_suggestion,
            investigator_designation: formData.investigator_designation,
            investigation_time: formData.investigation_time,
            investigation_date: formData.investigation_date,
            rate_creterial: formData.rate_creterial,
            investigation_report: formData.investigation_report,
            investigation_report_attachment: formData.investigation_report_attachment,
            investigator_signature: formData.investigator_signature
            
           
            
        };
         setIsLoading(true);
    try {
      const resp = await axios.post(`${apiBaseUrl}/industrial_relationship/create_perfomance_capacity`, DataToSend, {
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
            navigate("/industrials/perfomance_capacity/");
            
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
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Perfomance Capacity</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/perfomance_capacity/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/perfomance_capacity/`}>
                            Add Capacity Details
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Create Capacity</h1>
                    <Link to={`${import.meta.env.BASE_URL}industrials/perfomance_capacity/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
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
                                        className="p-2 pr-10 ti-form-input form-control"
                                        placeholder="Search by Employee Number"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                                    />
                                </div>
                            </div>

                                <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Incapacity Type<span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="incapacity_type" options={capacityType} onChange={(selectedOption) => handleInputChange(["incapacity_type"], selectedOption ? selectedOption.value : null)} value={capacityType.find((option) => option.value === formData.id)} />
                                    <span className="text-danger">{formData.error_list.id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employee Name <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="firstname" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Employee firstname"  readOnly value={formData.firstname}
                                        onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.firstname}</span> */}
                                </div>
                                                                              
                              
                               <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Investigation Date  <span style={{ color: "red" }}> *</span></label>
                                <div className="flex rounded-sm overflow-auto">
                                    <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                        <span className="text-sm text-gray-500 dark:text-white/70">
                                            <i className="ri ri-calendar-line"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="date" 
                                        name="investigation_date" 
                                        className="my-auto ti-form-input text-black text-lg"
                                        value={new Date(formData.investigation_date).toLocaleDateString('en-CA')} // Format the date
                                        max={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
                                        onChange={(e) => handleInputChange('investigation_date', e.target.value)} 
                                        required
                                    />
                                    <span className="text-danger">{formData.error_list.investigation_date}</span>
                                </div>
                                </div> 
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Investigation Time </label>
                                    <input type="text" name="investigation_time" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.investigation_time}
                                        onChange={(e) => handleInputChange('investigation_time', e.target.value)} placeholder="Investigation time" />
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
                                            <label className="ti-form-label mb-0 font-bold text-lg">Investigator signature Attachment</label>
                                            <input type="file" accept=".pdf" name="investigator_signature" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('investigator_signature', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                </div>
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Investigation Report Attachment</label>
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
export default AddInCapacity;
