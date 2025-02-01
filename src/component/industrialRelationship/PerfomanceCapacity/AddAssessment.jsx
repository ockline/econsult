
import React, { useState, useEffect } from "react";
import { fetchPerfomanceCriterial } from '/src/common/industrialdata';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import { capacityType} from "/src/common/select2data";
import DatePicker from 'react-datepicker';
import axios from "axios";
import Swal from "sweetalert2";



const AddAssessment = () => {

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


    
     const [isLoading, setIsLoading] = useState(false);
     const [searchQuery, setSearchQuery] = useState(''); // For employee number search

  // Function to fetch employee data based on the employee number (searchQuery)
  const getEmployeeCapacityDetail = async (id) => {
    try {
      const res = await axios.get(`${apiBaseUrl}/industrial_relationship/retrieve_employee_capacity_details/${id}`);
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
      getEmployeeCapacityDetail(searchQuery); // Pass employee number to the function
    }
  }, [searchQuery]);

  // Handle changes in form input
  
    
     const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        suffering_from: '',
        suffering_period: '',
        investigation_time: '',
        employee_id: '',
        capacity_type_id: '',
        employee_name: '',
        daily_duties: '',
        subject_matter: '',
        partient_suggestion: '',
        challenge_daily_duties: '',
        alternative_task: '',
        investigator_name: '',
        investigator_designation: '',
        illness_cause : '',
        illness_degree : '',
        occupation_illness : '',
        occupation_justification : '',
        possible_nature_illness : '',
        permanent_alternative_activity : '',
        total_recovery_activity : '',
        suggested_task : '',
        measure_taken : '',
        assessor_recommendation : '',        
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
            capacity_id: formData.performance_capacity_id,
            capacity_type: formData.capacity_type_id,
            suffering_from: formData.suffering_from,
            suffering_period: formData.suffering_period,
            subject_matter: formData.subject_matter,
            daily_duties: formData.daily_duties,
             illness_cause : formData.illness_cause,
            illness_degree : formData.illness_degree,
            occupation_illness : formData.occupation_illness,
            occupation_justification : formData.occupation_justification,
            possible_nature_illness : formData.possible_nature_illness,
            permanent_alternative_activity : formData.permanent_alternative_activity,
            total_recovery_activity : formData.total_recovery_activity,
            suggested_task : formData.suggested_task,
            measure_taken : formData.measure_taken,
            assessor_recommendation : formData.assessor_recommendation,   
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
        console.log('ndugu', DataToSend);
    try {
      const resp = await axios.post(`${apiBaseUrl}/industrial_relationship/create_perfomance_assessment`, DataToSend, {
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

                               <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Capacity Type <span style={{ color: "red" }}> *</span></label>
                                   <input type="text" name="capacity_type" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-lg" value={formData.capacity_type} onChange={(e) => handleInputChange('capacity_type', e.target.value)} placeholder="Capacity Type" required readOnly />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employee Name <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employee_name" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Employee employee_name"  readOnly value={formData.employee_name}
                                        onChange={(e) => handleInputChange('employee_name', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.employee_name}</span> */}
                                </div>
                                                                                                                                        
                                    <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Investigation report</label>
                                    <textarea 
                                        type="text" 
                                        name="investigation_report" 
                                        className="my-auto ti-form-input text-black  bg-gray-100 border-red-500 text-md" 
                                        value={formData.investigation_report} readOnly
                                        onChange={(e) => handleInputChange('investigation_report', e.target.value)} 
                                        placeholder="Write Comment if any" 
                                    />
                                </div> 
                              <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Subject Matter </label>
                                    <input type="text" name="subject_matter" className="my-auto ti-form-input text-black  bg-gray-100 border-red-500 text-md" value={formData.subject_matter} readOnly
                                        onChange={(e) => handleInputChange('subject_matter', e.target.value)} placeholder="subject matter" />
                                </div> 
                                
                            <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are you suffering? </label>
                                    <input type="text" name="suffering_from" className="my-auto ti-form-input text-black  bg-gray-100 border-red-500 text-md" value={formData.suffering_from} readOnly
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
                                        onChange={(e) => handleInputChange('suffering_period', e.target.value)} readOnly
                                        required
                                    />
                                    <span className="text-danger">{formData.error_list.suffering_period}</span>
                                </div>
                                </div>                                 
                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are the cause of illness?  </label>
                                    <input type="text" name="daily_duties" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.daily_duties}
                                        onChange={(e) => handleInputChange('daily_duties', e.target.value)} placeholder="What are your daily duties at working station" />
                                </div>  
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are the degree of illness?   </label>
                                    <input type="text" name="challenge_daily_duties" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.challenge_daily_duties}
                                        onChange={(e) => handleInputChange('challenge_daily_duties', e.target.value)} placeholder="challenges on attending your daily duties" />
                                </div>    
                                                               
                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Does illness/injury result of occupation <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('occupation_illness', e.target.value)} value="1" name="occupation_illness" className="ti-form-radio" id="occupation_illness" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('occupation_illness', e.target.value)} value="2" name="occupation_illness" className="ti-form-radio" id="occupation_illness" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                        </label>
                                    </div>
                                </div>
                                {formData.occupation_illness === '1' && (
                                    <div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">If yes , please justify  </label>
                                            <input type="text" name="occupation_justification" className="my-auto ti-form-input" value={formData.chronic_remark}
                                                onChange={(e) => handleInputChange('occupation_justification', e.target.value)} placeholder="If yes , please justify " required />
                                        </div>
                                    </div>
                                )}
                                                              
                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What is the possible nature of the illness/injury?  <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('possible_nature_illness', e.target.value)} value="1" name="possible_nature_illness" className="ti-form-radio" id="possible_nature_illness" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Permanent</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" onChange={(e) => handleInputChange('possible_nature_illness', e.target.value)} value="2" name="possible_nature_illness" className="ti-form-radio" id="possible_nature_illness" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Temporary</span>
                                        </label>
                                    </div>
                                </div>
                                {formData.possible_nature_illness === '1' && (
                                    <div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">If yes, what are the alternative activity </label>
                                            <input type="text" name="permanent_alternative_activity" className="my-auto ti-form-input" value={formData.chronic_remark}
                                                onChange={(e) => handleInputChange('permanent_alternative_activity', e.target.value)} placeholder="If existing illness is permanent, what are the alternative activity we may provide to patient without affect his/her health? " required />

                                        </div>
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">When do we expect the partied may totally recovery </label>
                                    <input type="text" name="total_recovery_activity" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.total_recovery_activity}
                                        onChange={(e) => handleInputChange('total_recovery_activity', e.target.value)} placeholder="If existing illness is temporary, when do we expect the partied may totally recovery " />
                                </div>  
                                  <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are the Suggested task may patient work during recovery period?  </label>
                                    <input type="text" name="suggested_task" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.suggested_task}
                                        onChange={(e) => handleInputChange('suggested_task', e.target.value)} placeholder="What are the Suggested task may patient work during recovery period? " />
                                </div>  
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are the precaution/ measures to be taken by employer </label>
                                    <input type="text" name="measure_taken" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.measure_taken}
                                        onChange={(e) => handleInputChange('measure_taken', e.target.value)} placeholder="What are the precaution/ measures to be taken by employer/ supervisor during recovery period of patient?  " />
                                </div>  
                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are the recommendation of doctor to employer for this patient  </label>
                                    <input type="text" name="assessor_recommendation" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.assessor_recommendation}
                                        onChange={(e) => handleInputChange('assessor_recommendation', e.target.value)} placeholder="What are the recommendation of doctor to employer for this patient " />
                                </div>  
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Assessor Name </label>
                                    <input type="text" name="assessor_name" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Assessor name" value={formData.assessor_name} readOnly
                                        onChange={(e) => handleInputChange('assessor_name', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.assessor_name}</span>
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
export default AddAssessment;
