
import React, { useState, useEffect } from "react";
import { fetchPerfomanceCriterial } from '/src/common/industrialdata';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import axios from "axios";
import Swal from "sweetalert2";



const AddPorfomanceReview = () => {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


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
  
    
     const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        rate_creterial: '',
        department: '',
        employee_id: '',
        employer_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        review_date: '',
        review_description: '',
        strength: '',
        knowledge_skill_rating: '',
        industry_knowledge_rating: '',
        knowledge_effectively_rating: '',
        work_accuracy_rating: '',
        attention_to_detail_rating: '',
        work_standards_rating: '',
        workload_management_rating: '',
        problem_solving_rating: '',
        work_efficiency_rating: '',
        communication_clarity_rating: '',
        listening_skills_rating: '',
        feedback_sharing_rating: '',
        team_contribution_rating: '',
        cooperation_rating: '',
        work_environment_rating: '',
        attendance_rating: '',
        punctuality_rating: '',
        absence_notification_rating: '',
        adaptability_rating: '',
        decision_making_rating: '',
        innovation_rating: '',
        customer_service_rating: '',
        issue_resolution_rating: '',
        customer_satisfaction_rating: '',
        leadership_skills_rating: '',
        team_guidance_rating: '',
        decision_responsibility_rating: '',
        improvement_area: '',
        improvement_plan: '',
        employee_comments: '',
        final_rating_approval: '',
        
        
        perfomance_review_attachment: '',
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
    e.preventDefault();
    setIsLoading(true);

    try {
        const formDataToSend = new FormData();
        
        // Append all form fields dynamically
        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof File || Array.isArray(value)) {
                // Handle file uploads
                value.forEach((file) => formDataToSend.append(key, file));
            } else {
                formDataToSend.append(key, value);
            }
        });

        const resp = await axios.post(`${apiBaseUrl}/industrial_relationship/create_perfomance_review`, formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (resp.data.validator_err) {
            setFormData((prevData) => ({
                ...prevData,
                error_list: resp.data.validator_err,
            }));

            const formattedErrors = Object.values(resp.data.validator_err).flat().join("\n");
            swal({ title: "Failed", text: formattedErrors, icon: "error", button: "OK" });

        } else if ([404, 500].includes(resp.data.status)) {
            swal({ title: "Failed", text: resp.data.message, icon: "warning", button: "OK" });

        } else if (resp.data.status === 200) {
            swal({ title: "Success", text: resp.data.message, icon: "success", button: "OK", closeOnClickOutside: false })
                .then(() => navigate("/industrials/perfomance_reviews/"));
        }

    } catch (error) {
        console.error("Unexpected error:", error.message);
    } finally {
        setIsLoading(false);
    }
};

    
    

//     const handleSubmit = async (e) => {
//         // Handle form submission logic here
//         e.preventDefault();
//         // console.log('Form submitted:', formData);
//         const DataToSend = {
//             employee_id: formData.employee_id,
//             review_remarks: formData.review_remarks,
//             employer_id: formData.employer_id,
//             firstname: formData.firstname,
//             middlename: formData.middlename,
//             lastname: formData.lastname,
//             department: formData.department,
//             review_date: formData.review_date,
//             rate_creterial: formData.rate_creterial,
//             review_description: formData.review_description,
//             perfomance_review_attachment : formData.perfomance_review_attachment
           
            
//         };
//          setIsLoading(true);
//     try {
//       const resp = await axios.post(`${apiBaseUrl}/industrial_relationship/create_perfomance_review`, DataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (resp.data.validator_err) {
//         const validationErrors = resp.data.validator_err;
//         setFormData((prevData) => ({
//           ...prevData,
//           error_list: validationErrors,
//         }));

//         const formattedErrors = Object.keys(validationErrors)
//           .map((field) => `${validationErrors[field].join(", ")}`)
//           .join("\n");

//         swal({
//           title: "Failed",
//           text: formattedErrors,
//           icon: "error",
//           button: "OK",
//         });
//       } else if (resp.data.status === 404 || resp.data.status === 500) {
//         swal({
//           title: "Failed",
//           text: resp.data.message,
//           icon: "warning",
//           button: "OK",
//         });
//       } else if (resp.data.status === 200) {
//         swal({
//           title: "Success",
//           text: resp.data.message,
//           icon: "success",
//           button: "OK",
//           closeOnClickOutside: false,
//         }).then(() => {
//           navigate("/industrials/perfomance_reviews/");
//         });
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error.message);
//     } finally {
//       setIsLoading(false); // Ensure loading is stopped after try-catch
//     }
//   };
    
    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Perfomance Review</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/perfomance_reviews/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}industrials/perfomance_reviews/`}>
                            Add Review Details
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Create Review</h1>
                    <Link to={`${import.meta.env.BASE_URL}industrials/perfomance_reviews/`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                        {step === 1 && (

                            <div className="grid lg:grid-cols-3 gap-6">
                                      <div className=" space-y-2">                                       
                                        </div>   
                                        <div className=" space-y-2"> 
                                        <h2 className="relative py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
								>
                                    First Page
								<span className="badge py-0.5 px-1.5 bg-black/50 text-white">1</span>
							</h2>                                            
                                </div> 
                                <div className="space-y-2"></div>
                               
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

                                {/* <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Rate Criterial<span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="rate_creterial" options={perfomanceCriterial} onChange={(selectedOption) => handleInputChange(["rate_creterial"], selectedOption ? selectedOption.value : null)} value={perfomanceCriterial.find((option) => option.value === formData.id)} />
                                    <span className="text-danger">{formData.error_list.id}</span>
                                </div> */}
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">First Name <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="firstname" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Employee firstname"  readOnly value={formData.firstname}
                                        onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.firstname}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Middle Name </label>
                                    <input type="text" name="middlename" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Middlename" value={formData.middlename} readOnly
                                        onChange={(e) => handleInputChange('middlename', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.middlename}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Last Name <span style={{ color: "red" }}> *</span></label>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department </label>
                                    <input type="text" name="department" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" value={formData.department}
                                        onChange={(e) => handleInputChange('department', e.target.value)} placeholder="Present address" readOnly />

                                </div>
                               <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Review Date  <span style={{ color: "red" }}> *</span></label>
                                <div className="flex rounded-sm overflow-auto">
                                    <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                        <span className="text-sm text-gray-500 dark:text-white/70">
                                            <i className="ri ri-calendar-line"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="date" 
                                        name="review_date" 
                                        className="my-auto ti-form-input text-black text-lg"
                                        value={new Date(formData.review_date).toLocaleDateString('en-CA')} // Format the date
                                        max={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
                                        onChange={(e) => handleInputChange('review_date', e.target.value)} 
                                        required
                                    />
                                    <span className="text-danger">{formData.error_list.review_date}</span>
                                </div>
                            </div>  
                                    <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Review Description</label>
                                    <textarea 
                                        type="text" 
                                        name="review_description" 
                                        className="my-auto ti-form-input text-black border-red-500 text-md" 
                                        value={formData.review_description} 
                                        onChange={(e) => handleInputChange('review_description', e.target.value)} 
                                        placeholder="Write Comment if any" 
                                    />
                                </div>                                
                               
                            </div>
                        )}
                        
                        {step === 2 && (
                                                                        
                                <div className="grid lg:grid-cols-1 gap-6 second-page none" id="new_page">
                                         <div className=" space-y-2">  </div>   
                                        <div className=" space-y-2"> 
                                        <h2 className="relative py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
								>
                                    Second Page
								<span className="badge py-0.5 px-1.5 bg-black/50 text-white">2</span>
							</h2>                                            
                                </div> 
                                <div className="space-y-2"></div>
                            
                                  <div className="table-bordered rounded-md overflow-auto">
								<table className="ti-custom-table ti-custom-table-head">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr>
											<th scope="col" colSpan={ 1 }  className="py-3 ltr:pl-4 rtl:pr-4">
										       Category
                                                </th>
                                                <th scope="col" colSpan={ 1 }  className="py-3 ltr:pl-4 rtl:pr-4">
										       Criteria
                                                </th>
                                                <th scope="col" colSpan={ 6 }  className="py-3 ltr:pl-4 rtl:pr-4">
										       Rating (1 - 5)
                                                </th>
                                            </tr>
                                            <tr>
											<th scope="col" colSpan={ 2 }  className="py-3 ltr:pl-4 rtl:pr-4"></th>
											<th scope="col">Below Average (1) </th>
											<th scope="col">Average (2)</th>
											<th scope="col">Good (3)</th>
											<th scope="col">V.Good (4)</th>
                                            <th scope="col">Outstanding (5)</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th  rowSpan={3}>
												Job Knowledge & Skills
											</th>
											<td className=" ">Demonstrates necessary skills and expertise<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-2" name="knowledge_skill_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-3" name="knowledge_skill_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-4" name="knowledge_skill_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-5" name="knowledge_skill_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_skill_rating-6" name="knowledge_skill_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_skill_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_skill_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
									<td className=" ">Keeps up-to-date with industry trends and
job knowledge.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="industry_knowledge_rating-1" name="industry_knowledge_rating"
                                                                type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-1"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="industry_knowledge_rating-2" name="industry_knowledge_rating"
                                                                type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-2"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="industry_knowledge_rating-3" name="industry_knowledge_rating"
                                                                type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-3"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="industry_knowledge_rating-4" name="industry_knowledge_rating"
                                                                type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-4"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="industry_knowledge_rating-5" name="industry_knowledge_rating"
                                                                type="radio" onChange={(e) => handleInputChange('industry_knowledge_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="industry_knowledge_rating-5"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
										<td className="font-medium">Applies knowledge effectively in the
workplace. <span style={{ color: "red" }}> *</span> </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-14" name="knowledge_effectively_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-15" name="knowledge_effectively_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-16" name="knowledge_effectively_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-17" name="knowledge_effectively_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="knowledge_effectively_rating-18" name="knowledge_effectively_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('knowledge_effectively_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="knowledge_effectively_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>  
                                            </tr>
                                            {/* second */}
                                            <tr>
											<th  rowSpan={3}>
												Quality of Work
											</th>
											<td className=" ">Produces accurate and high-quality work.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-1" name="work_accuracy_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-2" name="work_accuracy_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-3" name="work_accuracy_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-5" name="work_accuracy_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_accuracy_rating-6" name="work_accuracy_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_accuracy_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_accuracy_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Pays attention to detail and minimizes
errors<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-1" name="attention_to_detail_rating"
                                                                type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-1"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-2" name="attention_to_detail_rating"
                                                                type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-2"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-3" name="attention_to_detail_rating"
                                                                type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-3"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-4" name="attention_to_detail_rating"
                                                                type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-4"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="attention_to_detail_rating-5" name="attention_to_detail_rating"
                                                                type="radio" onChange={(e) => handleInputChange('attention_to_detail_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="attention_to_detail_rating-5"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Completes tasks to the required standard. <span style={{ color: "red" }}> *</span> </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_standards_rating-1" name="work_standards_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_standards_rating-2" name="work_standards_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_standards_rating-3" name="work_standards_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_standards_rating-4" name="work_standards_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_standards_rating-5" name="work_standards_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_standards_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_standards_rating-5"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>                                               
                                            </tr>
                                            {/* third */}
                                            <tr>
											<th  rowSpan={3}>
												Productivity & Efficiency
											</th>
											<td className=" ">Completes work on time and manages
workload effectively<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="workload_management_rating-1" name="workload_management_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="workload_management_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="workload_management_rating-2" name="workload_management_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="workload_management_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="workload_management_rating-3" name="workload_management_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="workload_management_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="workload_management_rating-4" name="workload_management_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="workload_management_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="workload_management_rating-5" name="workload_management_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('workload_management_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="workload_management_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Demonstrates initiative and problemsolving ability<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-1" name="problem_solving_rating"
                                                                type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-1"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-2" name="problem_solving_rating"
                                                                type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-2"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-3" name="problem_solving_rating"
                                                                type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-3"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-4" name="problem_solving_rating"
                                                                type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-4"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="problem_solving_rating-5" name="problem_solving_rating"
                                                                type="radio" onChange={(e) => handleInputChange('problem_solving_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="problem_solving_rating-5"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Works efficiently with minimal supervision <span style={{ color: "red" }}> *</span> </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-1" name="work_efficiency_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-2" name="work_efficiency_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-3" name="work_efficiency_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-4" name="work_efficiency_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_efficiency_rating-5" name="work_efficiency_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_efficiency_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_efficiency_rating-5"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            <tr>
											<th  rowSpan={3}>
											Communication Skills
											</th>
											<td className=" ">Clearly and effectively communicates with colleagues and clients.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-1" name="communication_clarity_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-2" name="communication_clarity_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-3" name="communication_clarity_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-4" name="communication_clarity_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="communication_clarity_rating-5" name="communication_clarity_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('communication_clarity_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="communication_clarity_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Listens actively and responds appropriately.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-1" name="listening_skills_rating"
                                                                type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-2"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-9" name="listening_skills_rating"
                                                                type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-10" name="listening_skills_rating"
                                                                type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-11" name="listening_skills_rating"
                                                                type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="listening_skills_rating-12" name="listening_skills_rating"
                                                                type="radio" onChange={(e) => handleInputChange('listening_skills_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="listening_skills_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Provides constructive feedback and shares
information effectively <span style={{ color: "red" }}> *</span> </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-1" name="feedback_sharing_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-1"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-2" name="feedback_sharing_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-3" name="feedback_sharing_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-4" name="feedback_sharing_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="feedback_sharing_rating-5" name="feedback_sharing_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('feedback_sharing_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="feedback_sharing_rating-5"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            <tr>
											<th  rowSpan={3}>
											Teamwork & Collaboration 
											</th>
											<td className=" ">Works well with colleagues and contributes
to team success.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-2" name="team_contribution_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-3" name="team_contribution_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-4" name="team_contribution_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-5" name="team_contribution_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="team_contribution_rating-6" name="team_contribution_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('team_contribution_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="team_contribution_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Shows respect and cooperation within the
team.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-8" name="cooperation_rating"
                                                                type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="cooperation_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-9" name="cooperation_rating"
                                                                type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="cooperation_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-10" name="cooperation_rating"
                                                                type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="cooperation_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-11" name="cooperation_rating"
                                                                type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="cooperation_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="cooperation_rating-12" name="cooperation_rating"
                                                                type="radio" onChange={(e) => handleInputChange('cooperation_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="cooperation_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Supports others and encourages a positive
work environment <span style={{ color: "red" }}> *</span> </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-14" name="work_environment_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-15" name="work_environment_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-16" name="work_environment_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-17" name="work_environment_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_environment_rating-18" name="work_environment_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('work_environment_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_environment_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                                <tr>
											<th  rowSpan={3}>
											Attendance & Punctuality
											</th>
											<td className=" ">Regularly attends work and adheres to
company schedule<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-2" name="attendance_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attendance_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-3" name="attendance_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attendance_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-4" name="attendance_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attendance_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-5" name="attendance_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attendance_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attendance_rating-6" name="attendance_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('attendance_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attendance_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Arrives on time and meets deadlines.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-8" name="punctuality_rating"
                                                                type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="punctuality_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-9" name="punctuality_rating"
                                                                type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="punctuality_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-10" name="punctuality_rating"
                                                                type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="punctuality_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-11" name="punctuality_rating"
                                                                type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="punctuality_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="punctuality_rating-12" name="punctuality_rating"
                                                                type="radio" onChange={(e) => handleInputChange('punctuality_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="punctuality_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Notifies supervisor promptly about
absences. <span style={{ color: "red" }}> *</span> </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-14" name="absence_notification_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-15" name="absence_notification_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-16" name="absence_notification_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-17" name="absence_notification_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="absence_notification_rating-18" name="absence_notification_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('absence_notification_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="absence_notification_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            <tr>
											<th  rowSpan={3}>
											Adaptability & Problem-Solving
											</th>
											<td className=" ">Adjusts well to changes and challenges.
<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-2" name="adaptability_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-3" name="adaptability_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-4" name="adaptability_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-5" name="adaptability_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="adaptability_rating-6" name="adaptability_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('adaptability_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="adaptability_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>   
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Displays critical thinking and decision making abilities.
                                            <span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-8" name="decision_making_rating"
                                                                type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="decision_making_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-9" name="decision_making_rating"
                                                                type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="decision_making_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-10" name="decision_making_rating"
                                                                type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="decision_making_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-11" name="decision_making_rating"
                                                                type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="decision_making_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="decision_making_rating-12" name="decision_making_rating"
                                                                type="radio" onChange={(e) => handleInputChange('decision_making_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="decision_making_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Finds innovative solutions to work-related
problems <span style={{ color: "red" }}> *</span> </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-14" name="innovation_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="innovation_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-15" name="innovation_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="innovation_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-16" name="innovation_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="innovation_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-17" name="innovation_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="innovation_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="innovation_rating-18" name="innovation_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('innovation_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="innovation_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            <tr>
											<th  rowSpan={3}>
											Customer Service (if applicable)
											</th>
											<td className=" ">Provides excellent service to clients/customers.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-2" name="customer_service_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-3" name="customer_service_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-4" name="customer_service_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-5" name="customer_service_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_service_rating-6" name="customer_service_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_service_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_service_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Addresses client concerns professionally and efficiently.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-8" name="issue_resolution_rating"
                                                                type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-9" name="issue_resolution_rating"
                                                                type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-10" name="issue_resolution_rating"
                                                                type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-11" name="issue_resolution_rating"
                                                                type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="issue_resolution_rating-12" name="issue_resolution_rating"
                                                                type="radio" onChange={(e) => handleInputChange('issue_resolution_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="issue_resolution_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Strives to improve client satisfaction<span style={{ color: "red" }}> *</span> </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                   

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-14" name="customer_satisfaction_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-15" name="customer_satisfaction_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-16" name="customer_satisfaction_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-17" name="customer_satisfaction_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="customer_satisfaction_rating-18" name="customer_satisfaction_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('customer_satisfaction_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="customer_satisfaction_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            </tr>
                                            
                           										<tr>
											<th  rowSpan={3}>
											Leadership & Initiative (For Supervisory Roles)
											</th>
											<td className=" ">Demonstrates strong leadership skills.<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="knowledge">
                                                    <ul className="flex flex-col sm:flex-row">
                                                   
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-2" name="leadership_skills_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-3" name="leadership_skills_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-4" name="leadership_skills_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-5" name="leadership_skills_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership_skills_rating-6" name="leadership_skills_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership_skills_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership_skills_rating-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                               
										</tr>
										<tr>
											{/* <td className=" "></td> */}
											<td className=" ">Motivates and guides team members effectively<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-8" name="team_guidance_rating"
                                                                type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-9" name="team_guidance_rating"
                                                                type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-10" name="team_guidance_rating"
                                                                type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-11" name="team_guidance_rating"
                                                                type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="team_guidance_rating-12" name="team_guidance_rating"
                                                                type="radio" onChange={(e) => handleInputChange('team_guidance_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="team_guidance_rating-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                
                                            </tr>
                                            {/* second */}
                                            
                                          <tr>
											<td className="font-medium">Takes responsibility and makes sound decisions.<span style={{ color: "red" }}> *</span> </td>
                                                <td className=" " colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-14" name="decision_responsibility_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-15" name="decision_responsibility_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-16" name="decision_responsibility_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-17" name="decision_responsibility_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="decision_responsibility_rating-18" name="decision_responsibility_rating"
                                                                    type="radio" onChange={(e) => handleInputChange('decision_responsibility_rating', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="decision_responsibility_rating-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                          </tr>                                         
                                           
                                        <tr>
                                            <th className="" colSpan={2}>
												Overall Rating
											</th>
                                            <td colSpan={6}></td>
                                            <td></td>
											</tr>
									</tbody>
								</table>
							</div>
                             </div>    
                        )}
                         {step === 3 && (

                            <div className="grid lg:grid-cols-3 gap-6">
                                      <div className=" space-y-2">                                       
                                        </div>   
                                        <div className=" space-y-2"> 
                                        <h2 className="relative py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
								>
                                    Three Page
								<span className="badge py-0.5 px-1.5 bg-black/50 text-white">3</span>
							</h2>                                            
                                </div> 
                                <div className="space-y-2"></div>
                               {/* <h3>STRENGTHS & AREAS FOR IMPROVEMENT </h3> */}
                                 
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Strength and Area For Improvement </label>
                                    <textarea type="textarea" name="strength" className="my-auto ti-form-input text-black border-red-500 text-md" placeholder="strength" value={formData.strength} 
                                        onChange={(e) => handleInputChange('strength', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.strength}</span>
                                </div>
                          

                              
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Areas for Improvement: <span style={{ color: "red" }}> *</span></label>
                                    <textarea type="text" name="improvement_area" className="my-auto ti-form-input text-black  border-red-500 text-md" placeholder="Employee improvement_area"  value={formData.improvement_area}
                                        onChange={(e) => handleInputChange('improvement_area', e.target.value)}  />
                                    {/* <span className="text-danger">{formData.error_list.improvement_area}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Goals and Improvement Plan </label>
                                    <textarea type="text" name="improvement_plan" className="my-auto ti-form-input text-black  border-red-500 text-md" placeholder="Outline key goals and improvement plans for the next review period" value={formData.improvement_plan} 
                                        onChange={(e) => handleInputChange('improvement_plan', e.target.value)}  />
                                    {/* <span className="text-danger">{formData.error_list.improvement_plan}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employee Comments <span style={{ color: "red" }}> *</span></label>
                                    <textarea 
                                        type="text" 
                                        name="employee_comments" 
                                        className="my-auto ti-form-input text-black  border-red-500 text-md" 
                                        value={formData.employee_comments} 
                                         
                                        onChange={(e) => handleInputChange('employee_comments', e.target.value)} 
                                        placeholder="Employee may provide any additional comments or feedback" 
                                        required 
                                    />
                                </div>

                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Final Rating Approval <span style={{ color: "red" }}> *</span></label>
                                    <textarea type="text" name="final_rating_approval" className="my-auto ti-form-input text-black  border-red-500 text-md" value={formData.final_rating_approval}  onChange={(e) => handleInputChange('final_rating_approval', e.target.value)} placeholder="Overall Performance Rating (Average Score):" required />
                                    {/* <span className="text-danger">{formData.error_list.final_rating_approval}</span> */}
                                </div>                                      
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Review Report  Attachment</label>
                                            <input type="file" accept=".pdf" name="perfomance_review_attachment" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('perfomance_review_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                        </div>
                            </div>
                        )}
                        
                        <br />
                        <div>
                          {step > 1 && (
                        <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
                            <i className="ti ti-arrow-narrow-left"></i> Previous
                        </button>
                    )}

                    {step < 3 && (
                        <button type="button" onClick={handleNextStep} className="ti-btn ti-btn-primary first_page justify-center">
                            <i className="ti ti-arrow-narrow-right"></i> Next
                        </button>
                    )}

                    {step === 3 && (
                        <div className="float-end">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="ti-btn ti-btn-success justify-center"
                                disabled={isLoading}
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
export default AddPorfomanceReview;
