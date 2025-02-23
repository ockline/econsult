import React, { useState, useEffect } from "react";
import { JobTitleData, PackageData, RegionData,RankingCriterialData, UsersData, PracticalTest}from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAssessedCandidate } from "/src/common/recruitmentdata";
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import Swal from "sweetalert2";
import axios from "axios";
import moment from 'moment';

	


const EditCandidate = () => {


 
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
   
 let navigate = useNavigate();
        const [step, setStep] = useState(1);
        const [technicalData, setTechnicalData] = useState({
                 job_title_id: '',
                cost_center_id: '',
                cost_number: '',
                date: '',
                firstname: '',
                middlename: '',
                lastname: '',
                interviewer: '',
                technical_skill: '',
                relevant_experience: '', 
                knowledge_equipment: '',
                quality_awareness: '', 
                skill_remark: '', 
                experience_remark: '',
                equipment_remark: '',
                awareness_remark: '',
                physical_capability: '',
                capability_remark: '',
                practical_test_id: '',
                final_recommendation: '',
                recommended_title: '',  
                technical_signed_doc: null,                
                error_list: [],          
                
        });

          const { id } = useParams();
    
            useEffect(() => {
    axios.get(`${apiBaseUrl}/hiring/technical_interview/edit_candidate/${id}`).then((res) => {
        setTechnicalData(res.data.assessed_candidate)
        console.log(res.data.assessed_candidate);
    })
            }, [id])
    
     
    const handleFileInputChange = (fieldName, files) => {
      const file = files[0]; // Assuming single file selection, update accordingly for multiple files
      setTechnicalData((prevData) => ({
      
    ...prevData,
    [fieldName]: file, // assuming you only want to handle single file inputs
  }));
    };
    
    const handleInputChange = (stepName, value) => {
    if (value instanceof File) {
        // Handle file input change
        handleFileInputChange(stepName, [value]);
    } else {
        // Handle other input types
        setTechnicalData((prevData) => ({
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

        const updateAssessment = async (e) => {
            // Handle form submission logic here
             e.preventDefault();
            // console.log('Form submitted:', technicalData);
            const DataToSend = {
                job_title_id: technicalData?.job_title_id,
                cost_center_id: technicalData?.cost_center_id,
                cost_number: technicalData?.cost_number,
                date: technicalData?.date,
                firstname: technicalData?.firstname,
                middlename: technicalData?.middlename,
                lastname: technicalData?.lastname,
                interviewer: technicalData?.interviewer,
                technical_skill: technicalData?.technical_skill,
                relevant_experience: technicalData?.relevant_experience, 
                knowledge_equipment: technicalData?.knowledge_equipment,
                quality_awareness: technicalData.quality_awareness, 
                skill_remark: technicalData?.skill_remark, 
                experience_remark: technicalData.experience_remark,
                equipment_remark: technicalData?.equipment_remark,
                awareness_remark: technicalData.awareness_remark,
                physical_capability: technicalData?.physical_capability,
                capability_remark: technicalData.capability_remark,
                practical_test_id: technicalData?.practical_test_id,
                final_recommendation: technicalData?.final_recommendation,
                recommended_title: technicalData?.recommended_title, 
                technical_signed_doc: technicalData.technical_signed_doc,
                        
            };
    try {
        const resp = await axios.post(`${apiBaseUrl}/hiring/technical_interview/update_candidate/` + id, DataToSend, {
                        headers: {
                        "Content-Type": "multipart/form-data"
                        }
                    });
                //  console.log(resp.data.status);      
                 if (resp.data.status === 500) {
                    swal({
                        title: 'Sorry! Operation failed',
                        text: resp.data.message,
                        icon: 'warning',
                        button: 'ok',
                    })
                    // Additional logic or state updates after successful update
                } else if (resp.data.status === 200) {
                    swal({
                        title: 'Technical Interview Assessed Updated successfully',
                        text: resp.data.message,
                        icon: 'success',
                        button: 'ok',
                        closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                    }).then(() => {
                         console.log('Redirecting...');
                        // This code will be executed after the "ok" button is clicked and the modal is closed
                         navigate('/hiring/recruitments/technical_interviewed/'); // Call the navigate function to redirect to the specified route
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
    
    
    // update Practical test  ************************************************
    // const [practical, setPracticalData] = useState({
            
    //         practical_test_id: '',
    //         test_marks: '',
    //         ranking_creterial_id: '',
    //         practicl_test_remark: '',
    //         error_list: [],
    // });
    const [practicalData, setPracticalData] = useState({
    
        practical_test_id: '',
        test_marks: '',
        ranking_creterial_id: '',
        practicl_test_remark: '',
          
    });
          useEffect(() => {
    axios.get(`${apiBaseUrl}/hiring/technical_interview/practical_candidate/${id}`).then((res) => {
        setPracticalData(res.data.practical_candidate)
        console.log(res.data.practical_candidate);
    })
            }, [id])
 
    
     
    
     const handlePracticalInputChange = (stepName, value) => {
            setPracticalData((prevData) => ({
                ...prevData,
                [stepName]: value,
                 error_list: { ...prevData.error_list, [stepName] : null },
            }));
        };
    
    const SavePracticalTest = async (e, practical) => {
            //   console.log('SavePracticalTest function called');
        e.preventDefault();
       const practicalData = {
           practical_test_id: practical?.practical_test_id,
           test_marks: practical?.test_marks,
           ranking_creterial_id: practical.ranking_creterial_id,
           practicl_test_remark: practical.practicl_test_remark
       }
       
        try {
            const res = await axios.put(`${apiBaseUrl}/hiring/technical_interview/update_practical_candidate/` + id, practicalData);
 
if (res.data.status === 404) {
    swal({
        title: 'Failed',
        text: res.data.message,
        icon: 'warning',
        button: 'ok',
    });
} else if (res.data.status === 200) {
     swal({
         title: 'Success',
         text: res.data.message,
         icon: 'success',
         button: 'ok',
     }).then(() => {
        
        //  clearPracticalData();
     });
   
   
}
} catch (error) {
    console.log('Error occurred:', error);

    if (error.response && error.response.status === 404) {
        console.log('Handling 404 error in catch block');
        swal({
            title: 'Resource Not Found',
            text: 'The requested resource was not found on the server.',
            icon: 'error',
            button: 'ok',
        })
    } else {
        console.error("Unexpected error:", error.message);
    }
}
    }
       

    function Style3() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'ti-btn bg-secondary text-white hover:bg-secondary focus:ring-secondary dark:focus:ring-offset-secondary',
            cancelButton: 'ti-btn bg-danger text-white hover:bg-danger focus:ring-danger dark:focus:ring-offset-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You want to complete this interview?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, complete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Saved!',
                'Your Technical Interview Assessment is Assessed successfully.',
                'success'
            ).then(() => {
                // Make an asynchronous request to your controller
                fetch(`${apiBaseUrl}/hiring/technical_interview/last_candidate`, {
                    method: 'GET', // or 'GET' depending on your API
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any additional headers if needed
                    },
                    // Add any request body if needed
                    // body: JSON.stringify({ key: 'value' })
                })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from your controller
                    // console.log(data);
                     navigate('/hiring/recruitments/technical_interviewed');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            );
        }
    });
}

	return (
		<div>
        
           <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Edit Technical Interview</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`}>
						Home
						<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
					</a>
					</li>
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`}>
						Technical Interviews
						{/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
					</a>
					</li>
				</ol>
				</div>
			<div className= "box">
				<div className= "box-header lg:flex lg:justify-between">
					<h1 className= "box-title my-auto">Technical Assessment Interview</h1>
					<Link to={`${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`} className= "ti-btn ti-btn-primary m-0 py-2"><i className= "ti ti-arrow-left"></i>Back</Link>
				</div>
				 <div className="box-body">
                        <form className="ti-validation" noValidate onSubmit={updateAssessment}>
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
                                            <label className="ti-form-label mb-0 font-bold text-lg">Job Title <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === technicalData.job_title_id)} />
                                             {/* <span className="text-danger">{technicalData.error_list.job_title_id}</span> */}
                                        </div>                                
                               <div className="space-y-2">
                                    <label className="ti-form-label mb-0">Date<span style={{ color: "red" }}> *</span></label>
                                    
                                <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                           <input type="date" name="date" className="my-auto ti-form-input" placeholder=""  value={technicalData.date}
                                                onChange={(e) => handleInputChange('date', e.target.value)} required />

                                    </div>
                                    </div>
                                
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Cost Center Name</label>                              
                                     <Creatable classNamePrefix="react-select" name="cost_center_id" options={packages} onChange={(selectedOption) => handleInputChange(["cost_center_id"], selectedOption ? selectedOption.value : null)} value={packages.find((option) => option.value === technicalData.cost_center_id)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Cost Center Number </label>
                                            <input type="number" name="tin" className="ti-form-input" placeholder="Cost Center Number"  value={technicalData.cost_number}
                                                onChange={(e) => handleInputChange('cost_number', e.target.value)} required />
                                              </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">	Candidate FirstName <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="firstname" className="my-auto ti-form-input" placeholder="Candidate firstname"  value={technicalData.firstname}
                                                onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                              {/* <span className="text-danger">{technicalData.error_list.firstname}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Candidate MiddleName <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="middlename" className="my-auto ti-form-input" placeholder="Middlename"  value={technicalData.middlename}
                                                onChange={(e) => handleInputChange('middlename', e.target.value)} required />
                                              {/* <span className="text-danger">{technicalData.error_list.middlename}</span> */}
                                        </div> <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Candidate LastName <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="lastname" className="my-auto ti-form-input"  value={technicalData.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} placeholder="Candidate Lastname" required />
                                              {/* <span className="text-danger">{technicalData.error_list.lastname}</span> */}
                                        </div> 
                                         <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Interviewer Name <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="interviewer" options={users} onChange={(selectedOption) => handleInputChange(["interviewer"], selectedOption ? selectedOption.value : null)} value={users.find((option) => option.value === technicalData.interviewer)} />
                                              {/* <span className="text-danger">{technicalData.error_list.interviewer}</span> */}
                                </div>
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Technical skills  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="technical_skill" options={rankings} onChange={(selectedOption) => handleInputChange(["technical_skill"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === technicalData.technical_skill)} />
                                              {/* <span className="text-danger">{technicalData.error_list.technical_skill}</span> */}
                                </div>  
                                                                                
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Technical Skill Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Technical skills  Comment" name="skill_remark"  value={technicalData.skill_remark}
                                            onChange={(e) => handleInputChange('skill_remark', e.target.value)}  />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Relevant Technical Experience  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="relevant_experience" options={rankings} onChange={(selectedOption) => handleInputChange(["relevant_experience"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === technicalData.relevant_experience)} />
                                              {/* <span className="text-danger">{technicalData.error_list.relevant_experience}</span> */}
                                </div>  
                                    <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Relevant Technical Experience  Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Relevant Technical Experience  Comment" name="experience_remark"  value={technicalData.experience_remark}
                                            onChange={(e) => handleInputChange('experience_remark', e.target.value)}  />
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
                                            <label className="ti-form-label mb-0 font-bold text-lg">Knowledge of Tools and Equipment  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="knowledge_equipment" options={rankings} onChange={(selectedOption) => handleInputChange(["knowledge_equipment"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === technicalData.knowledge_equipment)} />
                                              {/* <span className="text-danger">{technicalData.error_list.knowledge_equipment}</span> */}
                                </div>  
                                                                                
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Knowledge of Tools and Equipment Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Knowledge of Tools and Equipment  Comment" name="equipment_remark"  value={technicalData.equipment_remark}
                                            onChange={(e) => handleInputChange('equipment_remark', e.target.value)}  />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Quality and Safety awareness <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="quality_awareness" options={rankings} onChange={(selectedOption) => handleInputChange(["quality_awareness"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === technicalData.quality_awareness)} />
                                              {/* <span className="text-danger">{technicalData.error_list.quality_awareness}</span> */}
                                </div>  
                                    <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Quality and Safety awareness Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Quality and Safety awareness Comment" name="awareness_remark"  value={technicalData.awareness_remark}
                                            onChange={(e) => handleInputChange('awareness_remark', e.target.value)}  />
                                </div> 
                                <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Physical Capability  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="physical_capability" options={rankings} onChange={(selectedOption) => handleInputChange(["physical_capability"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === technicalData.physical_capability)} />
                                              {/* <span className="text-danger">{technicalData.error_list.physical_capability}</span> */}
                                </div>  
                                    <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Physical Capability  Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Physical Capability Comment" name="capability_remark"  value={technicalData.capability_remark}
                                            onChange={(e) => handleInputChange('capability_remark', e.target.value)}  />
                                </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Recommended Job Title  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="recommended_title" options={job_titles} onChange={(selectedOption) => handleInputChange(["recommended_title"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === technicalData.recommended_title)} />
                                              {/* <span className="text-danger">{technicalData.error_list.recommended_title}</span> */}
                                </div>  
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Final Recommendation <span style={{ color: "red" }}> *</span></label>
                                    <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" name="final_recommendation" onChange={(e) => handleInputChange('final_recommendation', e.target.value)} value="1" className = "ti-form-radio" id="final_recommendation"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70" >Accepted</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" name="final_recommendation"onChange={(e) => handleInputChange('final_recommendation', e.target.value)} value="0" className = "ti-form-radio" id="final_recommendation-1" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Not Accepted</span>
                                    </label>
                                    </div>                                    
                                </div>  
                                <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Technical Signed Attachment</label>
                                            <input type="file" name="technical_signed_doc" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('technical_signed_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                          
                                        </div>                                
                             </div>    
                            )}
                       
                            
                        <br/>
                                <div>
                                    {step > 1 && step < 2 && (
                             <button  type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
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
                                <button type="button" onClick={updateAssessment} className="ti-btn ti-btn-secondary  justify-center">
                                    <i className="ti ti-send"></i>Save to Draft
                                </button>
                                
                            )}{step === 2 && (<div className="float-end">
                                <button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary" >
                              <Link to={`${import.meta.env.BASE_URL}hiring/recruitments/technical/edit_practical/${technicalData.id}`} className= "">  <i className="ri ri-edit-line"></i> Add Practical Test</Link>
                              </button>
                        </div>)}
                        </div>
                                               
                         </form>
                        {/* Block for Practical test */}
                      
                        
                       
                    </div>
			</div>
		</div>
	);
};
export default EditCandidate;
