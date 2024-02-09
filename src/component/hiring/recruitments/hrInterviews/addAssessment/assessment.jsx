
import React, { useState, useEffect } from "react";
// import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import { JobTitleData, PackageData, RegionData,RankingCriterialData, UsersData} from '/src/common/select2data';
import { Link, useNavigate } from 'react-router-dom';
import Creatable from "react-select/creatable";
import Select from 'react-dropdown-select';
import SunEditor from 'suneditor-react';
import DatePicker from 'react-datepicker';
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";
    


const Assessment = () => {
	
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    // const [startDate, setStartDate] = useState(new Date());
    
    let navigate = useNavigate();
    // const RouteChange = () => {
    //     let path = `${import.meta.env.BASE_URL}hiring/recruitments/hr_interviewed/`;
    //     navigate(path);
    // }
    
        const [step, setStep] = useState(1);
        const [formData, setFormData] = useState({
                job_title_id: '',
                cost_center_id: '',
                cost_number: '',
                date: '',
                firstname: '',
                middlename: '',
                lastname: '',
                interviewer: '',
                military_service: '',
                military_number: '',
                place_recruitment: '',
                year_experience: '',
                education_knowledge: '',
                relevant_experience: '',
                major_achievement: '',
                language_fluency_id: '',
                education_knowledge_remark: '',
                relevant_experience_remark: '',
                major_achievement_remark: '',
                language_fluency_remark: '',
                overall_rating: '',
                main_strength: '',
                main_weakness: '',
                birth_place: '',
                residence_place: '',
                relative_inside: '',
                relative_name: '',
                chronic_disease: '',
                chronic_remarks: '',
                pregnant: '',
                pregnancy_months: '',
                employed_before: '',
                reference_check: '',
                reference_remarks: '',
                current_packages: '',
                agreed_salary: '',
                required_notes: '',
                current_employed_entity: '',
                social_insuarance_status: '',
                work_site: '',
                reallocation_place: '',
                recruiter_recommendations: '',
                recommended_title: '',
                interactive_communication: '',
                accountability: '',
                work_excellence      : '',   
                planning_organizing: '',         
                problem_solving: '',         
                analytical_ability: '',          
                attention_Details: '',           
                initiative: '',          
                multi_tasking: '',           
                continuous_improvement: '',          
                compliance: '',          
                creativity_innovation: '',           
                negotiation: '',         
                team_work: '',           
                adaptability_flexibility: '',            
                leadership: '',          
                delegating_managing: '',         
                managing_change: '',         
                strategic_conceptual_thinking: '', 
                interactive_communication_remark: '',
                accountability_remark: '',
                work_excellence_remark: '',
                planning_organizing_remark: '',
                problem_solving_remark: '',
                analytical_ability_remark: '',
                attention_Details_remark: '',
                initiative_remark: '',
                multi_tasking_remark: '',
                continuous_improvement_remark: '',
                compliance_remark: '',
                creativity_innovation_remark: '',
                negotiation_remark: '',
                team_work_remark: '',
                adaptability_flexibility_remark: '',
                leadership_remark: '',
                delegating_managing_remark: '',
                managing_change_remark: '',
                strategic_conceptual_thinking_remark: '', 
                surgery_operation: '', 
                surgery_operation_remark: '',                
                error_list: [],
        });

        const handleInputChange = (stepName, value) => {
            setFormData((prevData) => ({
                ...prevData,
                [stepName]: value,
                 error_list: { ...prevData.error_list, [stepName] : null },
            }));
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
            console.log('Form submitted:', formData);
            const DataToSend = {
                job_title_id: formData?.job_title_id,
                cost_center_id: formData?.cost_center_id,
                cost_number: formData?.cost_number,
                date: formData?.date,
                firstname: formData?.firstname,
                middlename: formData.middlename,
                lastname: formData?.lastname,
                interviewer: formData?.interviewer,
                military_service: formData?.military_service,
                military_number: formData.military_number,
                place_recruitment: formData?.place_recruitment,
                year_experience: formData?.year_experience,
                education_knowledge: formData?.education_knowledge,
                relevant_experience: formData?.relevant_experience,
                major_achievement: formData?.major_achievement,
                language_fluency_id: formData?.language_fluency_id,
                education_knowledge_remark: formData?.education_knowledge_remark,
                relevant_experience_remark: formData?.relevant_experience_remark,
                major_achievement_remark: formData?.major_achievement_remark,
                language_fluency_remark: formData?.language_fluency_remark,
                overall_rating: formData?.overall_rating,
                main_strength: formData?.main_strength,
                main_weakness: formData?.main_weakness,
                birth_place: formData?.birth_place,
                residence_place: formData?.residence_place,
                relative_inside: formData?.relative_inside,
                relative_name: formData?.relative_name,
                chronic_disease: formData?.chronic_disease,
                chronic_remarks: formData?.chronic_remarks,
                pregnant: formData?.pregnant,
                pregnancy_months: formData.pregnancy_months,
                employed_before: formData?.employed_before,
                reference_check: formData?.reference_check,
                reference_remarks: formData.reference_remarks,
                current_packages: formData.current_packages,
                agreed_salary: formData?.agreed_salary,
                surgery_operation: formData?.surgery_operation,
                surgery_operation_remark: formData?.surgery_operation_remark,
                required_notes: formData.required_notes,
                current_employed_entity: formData?.current_employed_entity,
                social_insuarance_status: formData?.social_insuarance_status,
                work_site: formData?.work_site,
                reallocation_place: formData?.reallocation_place,
                recruiter_recommendations: formData?.recruiter_recommendations,
                recommended_title: formData?.recommended_title,
                interactive_communication: formData?.interactive_communication,
                accountability: formData?.accountability,
                work_excellence      : formData?.work_excellence,   
                planning_organizing: formData?.planning_organizing,         
                problem_solving: formData?.problem_solving,         
                analytical_ability: formData?.analytical_ability,          
                attention_Details: formData?.attention_Details,           
                initiative: formData?.initiative,          
                multi_tasking: formData?.multi_tasking,           
                continuous_improvement: formData?.continuous_improvement,          
                compliance: formData?.compliance,          
                creativity_innovation: formData?.creativity_innovation,           
                negotiation: formData?.negotiation,         
                team_work: formData?.team_work,           
                adaptability_flexibility: formData?.adaptability_flexibility,            
                leadership: formData?.leadership,          
                delegating_managing: formData?.delegating_managing,         
                managing_change: formData?.managing_change,         
                strategic_conceptual_thinking: formData?.strategic_conceptual_thinking, 
                interactive_communication_remark: formData?.interactive_communication_remark,
                accountability_remark: formData?.accountability_remark,
                work_excellence_remark: formData?.work_excellence_remark,
                planning_organizing_remark: formData?.planning_organizing_remark,
                problem_solving_remark: formData?.problem_solving_remark,
                analytical_ability_remark: formData?.analytical_ability_remark,
                attention_Details_remark: formData?.attention_Details_remark,
                initiative_remark: formData?.initiative_remark,
                multi_tasking_remark: formData?.multi_tasking_remark,
                continuous_improvement_remark: formData?.continuous_improvement_remark,
                compliance_remark: formData?.compliance_remark,
                creativity_innovation_remark: formData?.creativity_innovation_remark,
                negotiation_remark: formData?.negotiation_remark,
                team_work_remark: formData?.team_work_remark,
                adaptability_flexibility_remark: formData?.adaptability_flexibility_remark,
                leadership_remark: formData?.leadership_remark,
                delegating_managing_remark: formData?.delegating_managing_remark,
                managing_change_remark: formData?.managing_change_remark,
                strategic_conceptual_thinking_remark: formData?.strategic_conceptual_thinking_remark,    
                // military_attachment: formData.military_attachment,
                        
            };
            try {
                const resp = await axios.post(`${apiBaseUrl}/hiring/hr_interview/add_assessment`, DataToSend, {
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
                        title: 'HR Competency Interview Assessed successfully submitted',
                        text: resp.data.message,
                        icon: 'success',
                        button: 'ok',
                        closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                    }).then(() => {
                         console.log('Redirecting...');
                        // This code will be executed after the "ok" button is clicked and the modal is closed
                         navigate('/hiring/recruitments/hr_interviewed/'); // Call the navigate function to redirect to the specified route
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

	return (
		<div>
            {/* <PageHeader currentpage="HR Interview" activepage="Pages" mainpage="HR Interview" /> */}
            <br/><br/>
			<div className= "box">
				<div className= "box-header lg:flex lg:justify-between">
					<h1 className= "box-title my-auto">Hr Competency Assessment Interview</h1>
					<Link to={`${import.meta.env.BASE_URL}hiring/recruitments/hr_interviewed`} className= "ti-btn ti-btn-primary m-0 py-2"><i className= "ti ti-arrow-left"></i>Back</Link>
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
                                            <label className="ti-form-label mb-0">Job Title <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} />
                                             <span className="text-danger">{formData.error_list.job_title_id}</span>
                                        </div>                                
                                <div className="space-y-2">
                                     <label className="ti-form-label mb-0">Date<span style={{ color: "red" }}> *</span></label>
                                <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                       <DatePicker className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
                                        name="date" selected={formData.date} onChange={(date) => handleInputChange('date', date)}
                                        timeInputLabel="Time:" dateFormat="dd/MM/yyyy h:mm aa" showTimeInput
                                        />
                                        <span className="text-danger">{formData.error_list.date}</span>
                                    </div>
                                </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Cost Center Name</label>                              
                                     <Creatable classNamePrefix="react-select" name="cost_center_id" options={packages} onChange={(selectedOption) => handleInputChange(["cost_center_id"], selectedOption ? selectedOption.value : null)} value={packages.find((option) => option.value === formData.cost_center_id)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Cost Center Number </label>
                                            <input type="number" name="tin" className="ti-form-input" placeholder="Cost Center Number"  value={formData.cost_number}
                                                onChange={(e) => handleInputChange('cost_number', e.target.value)} required />
                                              {/* <span className="text-danger">{formData.error_list.cost_number}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">	Candidate FirstName <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="firstname" className="my-auto ti-form-input" placeholder="Candidate firstname"  value={formData.firstname}
                                                onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                              <span className="text-danger">{formData.error_list.firstname}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Candidate MiddleName </label>
                                            <input type="text" name="middlename" className="my-auto ti-form-input" placeholder="Middlename"  value={formData.middlename}
                                                onChange={(e) => handleInputChange('middlename', e.target.value)} required />
                                              {/* <span className="text-danger">{formData.error_list.contact_person}</span> */}
                                        </div> <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Candidate LastName <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="lastname" className="my-auto ti-form-input"  value={formData.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} placeholder="Candidate Lastname" required />
                                              <span className="text-danger">{formData.error_list.lastname}</span>
                                        </div> 
                                         <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Interviewer Name <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="interviewer" options={users} onChange={(selectedOption) => handleInputChange(["interviewer"], selectedOption ? selectedOption.value : null)} value={users.find((option) => option.value === formData.interviewer)} />
                                              <span className="text-danger">{formData.error_list.interviewer}</span>
                                        </div>
                                                                                
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">	Military Services<span style={{ color: "red" }}> *</span></label>
                                    <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" name="military_service" onChange={(e) => handleInputChange('military_service', e.target.value)} value="1" className = "ti-form-radio" id="military_service"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70" >Completed</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" name="military_service"onChange={(e) => handleInputChange('military_service', e.target.value)} value="2" className = "ti-form-radio" id="military_service-1" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Didn`t Attend</span>
                                    </label>
                                    </div>                                    
                                    
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Military number </label>
                                            <input type="number" name="military_number" className="my-auto ti-form-input"  value={formData.military_number}
                                                onChange={(e) => handleInputChange('military_number', e.target.value)} placeholder="military_number" required />
                                              
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Place of recruitment (Source)  <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="place_recruitment" className="my-auto ti-form-input"  value={formData.place_recruitment}
                                                onChange={(e) => handleInputChange('place_recruitment', e.target.value)} placeholder="place of recruitment" required />
                                              <span className="text-danger">{formData.error_list.place_recruitment}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Total Years of Experience  <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="year_experience" className="my-auto ti-form-input"  value={formData.year_experience}
                                                onChange={(e) => handleInputChange('year_experience', e.target.value)} placeholder="year of experience" required />
                                              <span className="text-danger">{formData.error_list.year_experience}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Education & Job Knowledge  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="education_knowledge" options={rankings} onChange={(selectedOption) => handleInputChange(["education_knowledge"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.education_knowledge)} />
                                              <span className="text-danger">{formData.error_list.education_knowledge}</span>
                                </div>
                                <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Education Knowledge Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Education Knowledge Comment" name="education_knowledge_remark"  value={formData.education_knowledge_remark}
                                            onChange={(e) => handleInputChange('education_knowledge_remark', e.target.value)}  />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">	Relevant Job Experience  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="relevant_experience" options={rankings} onChange={(selectedOption) => handleInputChange(["relevant_experience"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.relevant_experience)} />
                                              <span className="text-danger">{formData.error_list.relevant_experience}</span>
                                </div>
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Relevant experience Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Relevant Experience Comment" name="relevant_experience_remark"  value={formData.relevant_experience_remark}
                                            onChange={(e) => handleInputChange('relevant_experience_remark', e.target.value)}  />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Major Previous Achievement <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="major_achievement" options={rankings} onChange={(selectedOption) => handleInputChange(["major_achievement"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.major_achievement)} />
                                              <span className="text-danger">{formData.error_list.major_achievement}</span>
                                </div>  
                                    <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Major Previous Achievement Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Major Previous Achievement Comment" name="major_achievement_remark"  value={formData.major_achievement_remark}
                                            onChange={(e) => handleInputChange('major_achievement_remark', e.target.value)}  />
                                        </div>                                
                                                               
                                       
                                    {/* Rest of Step 1 form fields */}
                                </div>
                                )}                             
                                
                                {step === 2 && (
                                                                        
                                <div className="grid lg:grid-cols-1 gap-6 second-page none" id="new_page">
                                         {/* <div className=" space-y-2">                                       
                                        </div>    */}
                                        <div className=" space-y-2"> 
                                        <h2 className="relative py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
								>
                                    Second Page
								<span className="badge py-0.5 px-1.5 bg-black/50 text-white">2</span>
							</h2>                                            
                                </div> 
                                {/* <div className="space-y-2"></div> */}
                                
                                  <div className="table-bordered rounded-md overflow-auto">
								<table className="ti-custom-table ti-custom-table-head">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr>
											<th scope="col" colSpan={ 2 }  className="py-3 ltr:pl-4 rtl:pr-4">
										       Competencies
											</th>
											<th scope="col">N/A (0)</th>
											<th scope="col">Below Average (1) </th>
											<th scope="col">Average (2)</th>
											<th scope="col">Good (3)</th>
											<th scope="col">V.Good (4)</th>
                                            <th scope="col">Outstanding (5)</th>
											<th scope="col" className="!text-end">Comments</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th  rowSpan={3}>
												Core Competencies
											</th>
											<td className="">Interactive Communication <span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6} className="interactive">
                                                    <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="interactive_communication" name="interactive_communication"
                                                                    type="radio" onChange={(e) => handleInputChange('interactive_communication', e.target.value)} value="0"  className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="interactive_communication"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                N/A
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="interactive_communication-2" name="interactive_communication"
                                                                    type="radio" onChange={(e) => handleInputChange('interactive_communication', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="interactive_communication-2"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="interactive_communication-3" name="interactive_communication"
                                                                    type="radio" onChange={(e) => handleInputChange('interactive_communication', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="interactive_communication-3"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="interactive_communication-4" name="interactive_communication"
                                                                    type="radio" onChange={(e) => handleInputChange('interactive_communication', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="interactive_communication-4"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="interactive_communication-5" name="interactive_communication"
                                                                    type="radio" onChange={(e) => handleInputChange('interactive_communication', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="interactive_communication-5"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="interactive_communication-6" name="interactive_communication"
                                                                    type="radio" onChange={(e) => handleInputChange('interactive_communication', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="interactive_communication-6"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="interactive_communication_remark" value={formData.interactive_communication_remark}
                                                     onChange={(e) => handleInputChange('interactive_communication_remark', e.target.value)} ></input>
                                                </td>
											</tr>
										<tr>
											{/* <td className=""></td> */}
											<td className="">Accountability<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="accountability-7" name="accountability"
                                                                type="radio" onChange={(e) => handleInputChange('accountability', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                        </div>
                                                        <label htmlFor="accountability-7"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            N/A
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="accountability-8" name="accountability"
                                                                type="radio" onChange={(e) => handleInputChange('accountability', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="accountability-8"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="accountability-9" name="accountability"
                                                                type="radio" onChange={(e) => handleInputChange('accountability', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="accountability-9"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="accountability-10" name="accountability"
                                                                type="radio" onChange={(e) => handleInputChange('accountability', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="accountability-10"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="accountability-11" name="accountability"
                                                                type="radio" onChange={(e) => handleInputChange('accountability', e.target.value)} value="4" className="ti-form-radio"/>
                                                        </div>
                                                        <label htmlFor="accountability-11"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="accountability-12" name="accountability"
                                                                type="radio" onChange={(e) => handleInputChange('accountability', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="accountability-12"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                <td><input  className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="accountability_remark" value={formData.accountability_remark}
                                                     onChange={(e) => handleInputChange('accountability_remark', e.target.value)} ></input></td>
										</tr>
                                          <tr>
											<td className="font-medium">Work Excellence<span style={{ color: "red" }}> *</span> </td>
                                                <td className="" colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_excellence-13" name="work_excellence"
                                                                    type="radio" onChange={(e) => handleInputChange('work_excellence', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="work_excellence-13"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                N/A
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_excellence-14" name="work_excellence"
                                                                    type="radio" onChange={(e) => handleInputChange('work_excellence', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_excellence-14"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_excellence-15" name="work_excellence"
                                                                    type="radio" onChange={(e) => handleInputChange('work_excellence', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_excellence-15"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_excellence-16" name="work_excellence"
                                                                    type="radio" onChange={(e) => handleInputChange('work_excellence', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_excellence-16"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_excellence-17" name="work_excellence"
                                                                    type="radio" onChange={(e) => handleInputChange('work_excellence', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_excellence-17"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="work_excellence-18" name="work_excellence"
                                                                    type="radio" onChange={(e) => handleInputChange('work_excellence', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="work_excellence-18"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70"> 
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                                <td className=""><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="work_excellence_remark" value={formData.work_excellence_remark}
                                                     onChange={(e) => handleInputChange('work_excellence_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											<th className="" rowSpan={12}>
												Functional Competencies
											</th>
											<td className="">Planning & Organizing<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                            <ul className="flex flex-col sm:flex-row">
                                            <li
                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                            <div className="flex items-center h-5">
                                            <input id="planning_organizing-19" name="planning_organizing"
                                            type="radio" onChange={(e) => handleInputChange('planning_organizing', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                            </div>
                                            <label htmlFor="planning_organizing-19"
                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                            N/A
                                            </label>
                                            </div>
                                            </li>

                                            <li
                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                            <div className="flex items-center h-5">
                                            <input id="planning_organizing-20" name="planning_organizing"
                                            type="radio" onChange={(e) => handleInputChange('planning_organizing', e.target.value)} value="1" className="ti-form-radio" />
                                            </div>
                                            <label htmlFor="planning_organizing-20"
                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                            Below
                                            </label>
                                            </div>
                                            </li>
                                            <li
                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                            <div className="flex items-center h-5">
                                            <input id="planning_organizing-21" name="planning_organizing"
                                            type="radio" onChange={(e) => handleInputChange('planning_organizing', e.target.value)} value="2" className="ti-form-radio" />
                                            </div>
                                            <label htmlFor="planning_organizing-21"
                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                            Average
                                            </label>
                                            </div>
                                            </li>
                                            <li
                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                            <div className="flex items-center h-5">
                                            <input id="planning_organizing-22" name="planning_organizing"
                                            type="radio" onChange={(e) => handleInputChange('planning_organizing', e.target.value)} value="3" className="ti-form-radio" />
                                            </div>
                                            <label htmlFor="planning_organizing-22"
                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                            Good
                                            </label>
                                            </div>
                                            </li>
                                            <li
                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                            <div className="flex items-center h-5">
                                            <input id="planning_organizing-23" name="planning_organizing"
                                            type="radio" onChange={(e) => handleInputChange('planning_organizing', e.target.value)} value="4" className="ti-form-radio" />
                                            </div>
                                            <label htmlFor="planning_organizing-23"
                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                            V.Good
                                            </label>
                                            </div>
                                            </li>

                                            <li
                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                            <div className="relative flex items-start w-full">
                                            <div className="flex items-center h-5">
                                            <input id="planning_organizing-24" name="planning_organizing"
                                            type="radio" onChange={(e) => handleInputChange('planning_organizing', e.target.value)} value="5" className="ti-form-radio" />
                                            </div>
                                            <label htmlFor="planning_organizing-24"
                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                            Outstanding
                                            </label>
                                            </div>
                                            </li>
                                            </ul> 
                                                </td>
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="planning_organizing_remark" value={formData.planning_organizing_remark}
                                                     onChange={(e) => handleInputChange('planning_organizing_remark', e.target.value)} ></input></td>
											</tr>
										<tr>
											{/* <td className=""></td> */}
											<td className="">Problem Solving<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                    <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="problem_solving-25" name="problem_solving"
                                                                    type="radio" onChange={(e) => handleInputChange('problem_solving', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="problem_solving-25"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                N/A
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="problem_solving-26" name="problem_solving"
                                                                    type="radio" onChange={(e) => handleInputChange('problem_solving', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="problem_solving-26"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="problem_solving-27" name="problem_solving"
                                                                    type="radio" onChange={(e) => handleInputChange('problem_solving', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="problem_solving-27"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="problem_solving-28" name="problem_solving"
                                                                    type="radio" onChange={(e) => handleInputChange('problem_solving', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="problem_solving-28"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="problem_solving-29" name="problem_solving"
                                                                    type="radio" onChange={(e) => handleInputChange('problem_solving', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="problem_solving-29"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="problem_solving-30" name="problem_solving"
                                                                    type="radio" onChange={(e) => handleInputChange('problem_solving', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="problem_solving-30"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="problem_solving_remark" value={formData.problem_solving_remark}
                                                     onChange={(e) => handleInputChange('problem_solving_remark', e.target.value)} ></input></td>
										</tr>
                                          <tr>
											<td className="font-medium">Analytical Ability <span style={{ color: "red" }}> *</span></td>
                                                <td className="" colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="analytical_ability-31" name="analytical_ability"
                                                                type="radio" onChange={(e) => handleInputChange('analytical_ability', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                        </div>
                                                        <label htmlFor="analytical_ability-31"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            N/A
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="analytical_ability-32" name="analytical_ability"
                                                                type="radio" onChange={(e) => handleInputChange('analytical_ability', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="analytical_ability-32"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="analytical_ability-33" name="analytical_ability"
                                                                type="radio" onChange={(e) => handleInputChange('analytical_ability', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="analytical_ability-33"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="analytical_ability-34" name="analytical_ability"
                                                                type="radio" onChange={(e) => handleInputChange('analytical_ability', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="analytical_ability-34"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="analytical_ability-35" name="analytical_ability"
                                                                type="radio" onChange={(e) => handleInputChange('analytical_ability', e.target.value)} value="4" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="analytical_ability-35"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="analytical_ability-36" name="analytical_ability"
                                                                type="radio" onChange={(e) => handleInputChange('analytical_ability', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="analytical_ability-36"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                <td className=""><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="analytical_ability_remark" value={formData.analytical_ability_remark}
                                                     onChange={(e) => handleInputChange('analytical_ability_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											
											<td className="font-medium">Attention to Details<span style={{ color: "red" }}> *</span> </td>
                                                <td className="" colSpan={6}>
                                                    <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attention_Details-37" name="attention_Details"
                                                                    type="radio" onChange={(e) => handleInputChange('attention_Details', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="attention_Details-37"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                N/A
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attention_Details-38" name="attention_Details"
                                                                    type="radio" onChange={(e) => handleInputChange('attention_Details', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attention_Details-38"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attention_Details-39" name="attention_Details"
                                                                    type="radio" onChange={(e) => handleInputChange('attention_Details', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attention_Details-39"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attention_Details-40" name="attention_Details"
                                                                    type="radio" onChange={(e) => handleInputChange('attention_Details', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attention_Details-40"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attention_Details-41" name="attention_Details"
                                                                    type="radio" onChange={(e) => handleInputChange('attention_Details', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attention_Details-41"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="attention_Details-42" name="attention_Details"
                                                                    type="radio" onChange={(e) => handleInputChange('attention_Details', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="attention_Details-42"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                <td className=""><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="attention_Details_remark" value={formData.attention_Details_remark}
                                                     onChange={(e) => handleInputChange('attention_Details_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											
											<td className="font-medium">Initiative<span style={{ color: "red" }}> *</span> </td>
                                                <td className="" colSpan={6}>
                                                    <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="initiative-43" name="initiative"
                                                                    type="radio" onChange={(e) => handleInputChange('initiative', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="initiative-43"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                N/A
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="initiative-44" name="initiative"
                                                                    type="radio" onChange={(e) => handleInputChange('initiative', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="initiative-44"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="initiative-45" name="initiative"
                                                                    type="radio" onChange={(e) => handleInputChange('initiative', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="initiative-45"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="initiative-46" name="initiative"
                                                                    type="radio" onChange={(e) => handleInputChange('initiative', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="initiative-46"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="initiative-47" name="initiative"
                                                                    type="radio" onChange={(e) => handleInputChange('initiative', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="initiative-47"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="initiative-48" name="initiative"
                                                                    type="radio" onChange={(e) => handleInputChange('initiative', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="initiative-48"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                               
                                                <td className=""><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="initiative_remark" value={formData.initiative_remark}
                                                     onChange={(e) => handleInputChange('initiative_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											
											<td className="font-medium">Multi-Tasking<span style={{ color: "red" }}> *</span> </td>
											
                                                <td className="" colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="multi_tasking-49" name="multi_tasking"
                                                                type="radio" onChange={(e) => handleInputChange('multi_tasking', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                        </div>
                                                        <label htmlFor="multi_tasking-49"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            N/A
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="multi_tasking-50" name="multi_tasking"
                                                                type="radio" onChange={(e) => handleInputChange('multi_tasking', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="multi_tasking-50"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="multi_tasking-51" name="multi_tasking"
                                                                type="radio" onChange={(e) => handleInputChange('multi_tasking', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="multi_tasking-51"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="multi_tasking-52" name="multi_tasking"
                                                                type="radio" onChange={(e) => handleInputChange('multi_tasking', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="multi_tasking-52"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="multi_tasking-53" name="multi_tasking"
                                                                type="radio" onChange={(e) => handleInputChange('multi_tasking', e.target.value)} value="4" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="multi_tasking-53"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="multi_tasking-54" name="multi_tasking"
                                                                type="radio" onChange={(e) => handleInputChange('multi_tasking', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="multi_tasking-54"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                                </td>
                                                
                                                <td className=""><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="multi_tasking_remark" value={formData.multi_tasking_remark}
                                                     onChange={(e) => handleInputChange('multi_tasking_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											
											<td className="font-medium">Continuous Improvement<span style={{ color: "red" }}> *</span> </td>
											
                                                <td className="" colSpan={6}>
                                                         <ul className="flex flex-col sm:flex-row">
                                                        <li
                                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                            <div className="relative flex items-start w-full">
                                                                <div className="flex items-center h-5">
                                                                    <input id="continuous_improvement-55" name="continuous_improvement"
                                                                        type="radio" onChange={(e) => handleInputChange('continuous_improvement', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                                </div>
                                                                <label htmlFor="continuous_improvement-55"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                    N/A
                                                                </label>
                                                            </div>
                                                        </li>

                                                        <li
                                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                            <div className="relative flex items-start w-full">
                                                                <div className="flex items-center h-5">
                                                                    <input id="continuous_improvement-56" name="continuous_improvement"
                                                                        type="radio" onChange={(e) => handleInputChange('continuous_improvement', e.target.value)} value="1" className="ti-form-radio" />
                                                                </div>
                                                                <label htmlFor="continuous_improvement-56"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                    Below
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li
                                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                            <div className="relative flex items-start w-full">
                                                                <div className="flex items-center h-5">
                                                                    <input id="continuous_improvement-57" name="continuous_improvement"
                                                                        type="radio" onChange={(e) => handleInputChange('continuous_improvement', e.target.value)} value="2" className="ti-form-radio" />
                                                                </div>
                                                                <label htmlFor="continuous_improvement-57"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                    Average
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li
                                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                            <div className="relative flex items-start w-full">
                                                                <div className="flex items-center h-5">
                                                                    <input id="continuous_improvement-58" name="continuous_improvement"
                                                                        type="radio" onChange={(e) => handleInputChange('continuous_improvement', e.target.value)} value="3" className="ti-form-radio" />
                                                                </div>
                                                                <label htmlFor="continuous_improvement-58"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                    Good
                                                                </label>
                                                            </div>
                                                        </li>
                                                        <li
                                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                            <div className="relative flex items-start w-full">
                                                                <div className="flex items-center h-5">
                                                                    <input id="continuous_improvement-59" name="continuous_improvement"
                                                                        type="radio" onChange={(e) => handleInputChange('continuous_improvement', e.target.value)} value="4" className="ti-form-radio" />
                                                                </div>
                                                                <label htmlFor="continuous_improvement-59"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                    V.Good
                                                                </label>
                                                            </div>
                                                        </li>

                                                        <li
                                                            className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                            <div className="relative flex items-start w-full">
                                                                <div className="flex items-center h-5">
                                                                    <input id="continuous_improvement-60" name="continuous_improvement"
                                                                        type="radio" onChange={(e) => handleInputChange('continuous_improvement', e.target.value)} value="5" className="ti-form-radio" />
                                                                </div>
                                                                <label htmlFor="continuous_improvement-60"
                                                                    className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                    Outstanding
                                                                </label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </td>
                                                
                                                <td className=""><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="continuous_improvement_remark" value={formData.continuous_improvement_remark}
                                                     onChange={(e) => handleInputChange('continuous_improvement_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											
											<td className="font-medium">Compliance<span style={{ color: "red" }}> *</span> </td>
											<td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="compliance-61" name="compliance"
                                                                type="radio" onChange={(e) => handleInputChange('compliance', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                        </div>
                                                        <label htmlFor="compliance-61"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            N/A
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="compliance-62" name="compliance"
                                                                type="radio" onChange={(e) => handleInputChange('compliance', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="compliance-62"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="compliance-63" name="compliance"
                                                                type="radio" onChange={(e) => handleInputChange('compliance', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="compliance-63"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="compliance-64" name="compliance"
                                                                type="radio" onChange={(e) => handleInputChange('compliance', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="compliance-64"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="compliance-65" name="compliance"
                                                                type="radio" onChange={(e) => handleInputChange('compliance', e.target.value)} value="4" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="compliance-65"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="compliance-66" name="compliance"
                                                                type="radio" onChange={(e) => handleInputChange('compliance', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="compliance-66"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                            </td>
                                                <td className=""><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="compliance_remark" value={formData.compliance_remark}
                                                     onChange={(e) => handleInputChange('compliance_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											
											<td className="font-medium">Creativity & Innovation<span style={{ color: "red" }}> *</span> </td>
											<td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="creativity_innovation-67" name="creativity_innovation"
                                                            type="radio" onChange={(e) => handleInputChange('creativity_innovation', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                    </div>
                                                    <label htmlFor="creativity_innovation-67"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        N/A
                                                    </label>
                                                </div>
                                            </li>

                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="creativity_innovation-68" name="creativity_innovation"
                                                            type="radio" onChange={(e) => handleInputChange('creativity_innovation', e.target.value)} value="1" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="creativity_innovation-68"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Below
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="creativity_innovation-69" name="creativity_innovation"
                                                            type="radio" onChange={(e) => handleInputChange('creativity_innovation', e.target.value)} value="2" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="creativity_innovation-69"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Average
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="creativity_innovation-70" name="creativity_innovation"
                                                            type="radio" onChange={(e) => handleInputChange('creativity_innovation', e.target.value)} value="3" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="creativity_innovation-70"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Good
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="creativity_innovation-71" name="creativity_innovation"
                                                            type="radio" onChange={(e) => handleInputChange('creativity_innovation', e.target.value)} value="4" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="creativity_innovation-71"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        V.Good
                                                    </label>
                                                </div>
                                            </li>

                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="creativity_innovation-72" name="creativity_innovation"
                                                            type="radio" onChange={(e) => handleInputChange('creativity_innovation', e.target.value)} value="5" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="creativity_innovation-72"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Outstanding
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                            </td>
                                                <td className=""><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="creativity_innovation_remark" value={formData.creativity_innovation_remark}
                                                     onChange={(e) => handleInputChange('creativity_innovation_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											
											<td className="font-medium">Negotiation<span style={{ color: "red" }}> *</span> </td>
											<td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="negotiation-73" name="negotiation"
                                                            type="radio" onChange={(e) => handleInputChange('negotiation', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                    </div>
                                                    <label htmlFor="negotiation-73"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        N/A
                                                    </label>
                                                </div>
                                            </li>

                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="negotiation-74" name="negotiation"
                                                            type="radio" onChange={(e) => handleInputChange('negotiation', e.target.value)} value="1" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="negotiation-74"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Below
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="negotiation-75" name="negotiation"
                                                            type="radio" onChange={(e) => handleInputChange('negotiation', e.target.value)} value="2" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="negotiation-75"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Average
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="negotiation-76" name="negotiation"
                                                            type="radio" onChange={(e) => handleInputChange('negotiation', e.target.value)} value="3" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="negotiation-76"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Good
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="negotiation-77" name="negotiation"
                                                            type="radio" onChange={(e) => handleInputChange('negotiation', e.target.value)} value="4" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="negotiation-77"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        V.Good
                                                    </label>
                                                </div>
                                            </li>

                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="negotiation-78" name="negotiation"
                                                            type="radio" onChange={(e) => handleInputChange('negotiation', e.target.value)} value="5" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="negotiation-78"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Outstanding
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                            </td>
                                                <td className=""><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="negotiation_remark" value={formData.negotiation_remark}
                                                     onChange={(e) => handleInputChange('negotiation_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											
											<td className="font-medium">Team Work<span style={{ color: "red" }}> *</span> </td>
											<td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="team_work-79" name="team_work"
                                                            type="radio" onChange={(e) => handleInputChange('team_work', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                    </div>
                                                    <label htmlFor="team_work-79"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        N/A
                                                    </label>
                                                </div>
                                            </li>

                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="team_work-80" name="team_work"
                                                            type="radio" onChange={(e) => handleInputChange('team_work', e.target.value)} value="1" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="team_work-80"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Below
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="team_work-81" name="team_work"
                                                            type="radio" onChange={(e) => handleInputChange('team_work', e.target.value)} value="2" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="team_work-81"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Average
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="team_work-82" name="team_work"
                                                            type="radio" onChange={(e) => handleInputChange('team_work', e.target.value)} value="3" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="team_work-82"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Good
                                                    </label>
                                                </div>
                                            </li>
                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="team_work-83" name="team_work"
                                                            type="radio" onChange={(e) => handleInputChange('team_work', e.target.value)} value="4" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="team_work-83"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        V.Good
                                                    </label>
                                                </div>
                                            </li>

                                            <li
                                                className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                <div className="relative flex items-start w-full">
                                                    <div className="flex items-center h-5">
                                                        <input id="team_work-84" name="team_work"
                                                            type="radio" onChange={(e) => handleInputChange('team_work', e.target.value)} value="5" className="ti-form-radio" />
                                                    </div>
                                                    <label htmlFor="team_work-84"
                                                        className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                        Outstanding
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                            </td>
                                                <td className=""><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="team_work_remark" value={formData.team_work_remark}
                                                     onChange={(e) => handleInputChange('team_work_remark', e.target.value)} ></input></td>
                                            </tr>
                                            <tr>
											
											<td className="font-medium">Adaptability/Flexibility<span style={{ color: "red" }}> *</span></td>
											<td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="adaptability_flexibility-85" name="adaptability_flexibility"
                                                                type="radio" onChange={(e) => handleInputChange('adaptability_flexibility', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                        </div>
                                                        <label htmlFor="adaptability_flexibility-85"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            N/A
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="adaptability_flexibility-86" name="adaptability_flexibility"
                                                                type="radio" onChange={(e) => handleInputChange('adaptability_flexibility', e.target.value)} value="1" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="adaptability_flexibility-86"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Below
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="adaptability_flexibility-87" name="adaptability_flexibility"
                                                                type="radio" onChange={(e) => handleInputChange('adaptability_flexibility', e.target.value)} value="2" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="adaptability_flexibility-87"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Average
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="adaptability_flexibility-88" name="adaptability_flexibility"
                                                                type="radio" onChange={(e) => handleInputChange('adaptability_flexibility', e.target.value)} value="3" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="adaptability_flexibility-88"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Good
                                                        </label>
                                                    </div>
                                                </li>
                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="adaptability_flexibility-89" name="adaptability_flexibility"
                                                                type="radio" onChange={(e) => handleInputChange('adaptability_flexibility', e.target.value)} value="4" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="adaptability_flexibility-89"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            V.Good
                                                        </label>
                                                    </div>
                                                </li>

                                                <li
                                                    className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                    <div className="relative flex items-start w-full">
                                                        <div className="flex items-center h-5">
                                                            <input id="adaptability_flexibility-90" name="adaptability_flexibility"
                                                                type="radio" onChange={(e) => handleInputChange('adaptability_flexibility', e.target.value)} value="5" className="ti-form-radio" />
                                                        </div>
                                                        <label htmlFor="adaptability_flexibility-90"
                                                            className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                            Outstanding
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                            </td>
                                                <td className=""><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="adaptability_flexibility_remark" value={formData.adaptability_flexibility_remark}
                                                     onChange={(e) => handleInputChange('adaptability_flexibility_remark', e.target.value)} ></input></td>
                                            </tr>
                                             <tr>
											<th className="" rowSpan={2}>
												"Managerial Competencies/Mid Senior Mngt. Level"
											</th>
											<td className="">Leadership<span style={{ color: "red" }}> *</span></td>
                                                <td colSpan={6}>
                                                    <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership-91" name="leadership"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="leadership-91"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                N/A
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership-92" name="leadership"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership-92"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership-93" name="leadership"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership-93"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership-94" name="leadership"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership-94"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership-95" name="leadership"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership-95"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="leadership-96" name="leadership"
                                                                    type="radio" onChange={(e) => handleInputChange('leadership', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="leadership-96"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                <td><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="leadership_remark" value={formData.leadership_remark}
                                                     onChange={(e) => handleInputChange('leadership_remark', e.target.value)} ></input></td>
											</tr>
										<tr>
											{/* <td className=""></td> */}
											<td className="">"Delegating, Managing & Developing People"	<span style={{ color: "red" }}> *</span>
                                            </td>
                                                <td className="" colSpan={6}>
                                                     <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="delegating_managing-97" name="delegating_managing"
                                                                    type="radio" onChange={(e) => handleInputChange('delegating_managing', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="delegating_managing-97"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                N/A
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="delegating_managing-98" name="delegating_managing"
                                                                    type="radio" onChange={(e) => handleInputChange('delegating_managing', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="delegating_managing-98"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="delegating_managing-99" name="delegating_managing"
                                                                    type="radio" onChange={(e) => handleInputChange('delegating_managing', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="delegating_managing-99"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="delegating_managing-100" name="delegating_managing"
                                                                    type="radio" onChange={(e) => handleInputChange('delegating_managing', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="delegating_managing-100"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="delegating_managing-101" name="delegating_managing"
                                                                    type="radio" onChange={(e) => handleInputChange('delegating_managing', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="delegating_managing-101"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="delegating_managing-102" name="delegating_managing"
                                                                    type="radio" onChange={(e) => handleInputChange('delegating_managing', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="delegating_managing-102"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                               
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="delegating_managing_remark" value={formData.delegating_managing_remark}
                                                     onChange={(e) => handleInputChange('delegating_managing_remark', e.target.value)} ></input></td>
                                            </tr>
                                              <tr>
											<th className="" rowSpan={2}>
												"Managerial Competencies/Top Mngt. Level"
											</th>
											<td className="">Managing Change<span style={{ color: "red" }}> *</span></td>
                                           
                                                <td colSpan={6}>
                                                         <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="managing_change-103" name="managing_change"
                                                                    type="radio" onChange={(e) => handleInputChange('managing_change', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="managing_change-103"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                N/A
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="managing_change-104" name="managing_change"
                                                                    type="radio" onChange={(e) => handleInputChange('managing_change', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="managing_change-104"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="managing_change-105" name="managing_change"
                                                                    type="radio" onChange={(e) => handleInputChange('managing_change', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="managing_change-105"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="managing_change-106" name="managing_change"
                                                                    type="radio" onChange={(e) => handleInputChange('managing_change', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="managing_change-106"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="managing_change-107" name="managing_change"
                                                                    type="radio" onChange={(e) => handleInputChange('managing_change', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="managing_change-107"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="managing_change-108" name="managing_change"
                                                                    type="radio" onChange={(e) => handleInputChange('managing_change', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="managing_change-108"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                                <td><input                               className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="managing_change_remark" value={formData.managing_change_remark}
                                                     onChange={(e) => handleInputChange('managing_change_remark', e.target.value)} ></input></td>
											</tr>
										<tr>
											{/* <td className=""></td> */}
											<td className="">""Strategic Conceptual Thinking"<span style={{ color: "red" }}> *</span>		
                                            </td>
                                                <td colSpan={6}>
                                                <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="strategic_conceptual_thinking-109" name="strategic_conceptual_thinking"
                                                                    type="radio" onChange={(e) => handleInputChange('strategic_conceptual_thinking', e.target.value)} value="0" className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="strategic_conceptual_thinking-109"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                N/A
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="strategic_conceptual_thinking-110" name="strategic_conceptual_thinking"
                                                                    type="radio" onChange={(e) => handleInputChange('strategic_conceptual_thinking', e.target.value)} value="1" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="strategic_conceptual_thinking-110"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Below
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="strategic_conceptual_thinking-111" name="strategic_conceptual_thinking"
                                                                    type="radio" onChange={(e) => handleInputChange('strategic_conceptual_thinking', e.target.value)} value="2" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="strategic_conceptual_thinking-111"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Average
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="strategic_conceptual_thinking-112" name="strategic_conceptual_thinking"
                                                                    type="radio" onChange={(e) => handleInputChange('strategic_conceptual_thinking', e.target.value)} value="3" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="strategic_conceptual_thinking-112"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Good
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="strategic_conceptual_thinking-113" name="strategic_conceptual_thinking"
                                                                    type="radio" onChange={(e) => handleInputChange('strategic_conceptual_thinking', e.target.value)} value="4" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="strategic_conceptual_thinking-113"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                V.Good
                                                            </label>
                                                        </div>
                                                    </li>

                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="strategic_conceptual_thinking-114" name="strategic_conceptual_thinking"
                                                                    type="radio" onChange={(e) => handleInputChange('strategic_conceptual_thinking', e.target.value)} value="5" className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="strategic_conceptual_thinking-114"
                                                                className="ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Outstanding
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                                </td>
                                            
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="strategic_conceptual_thinking_remark" value={formData.strategic_conceptual_thinking_remark}
                                                     onChange={(e) => handleInputChange('strategic_conceptual_thinking_remark', e.target.value)} ></input></td>
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
                                            <label className="ti-form-label mb-0">Language Fluency  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="language_fluency_id" options={rankings} onChange={(selectedOption) => handleInputChange(["language_fluency_id"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.language_fluency_id)} />
                                              <span className="text-danger">{formData.error_list.language_fluency_id}</span>
                                </div> 
                              <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Language Fluency Comment</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Language Fluency Comment" name="language_fluency_remark"  value={formData.language_fluency_remark}
                                            onChange={(e) => handleInputChange('language_fluency_remark', e.target.value)}  />
                                        </div> 
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Main Strengths (The Cancidate strength)  <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="main_strength" className="my-auto ti-form-input"  value={formData.main_strength}
                                                onChange={(e) => handleInputChange('main_strength', e.target.value)} placeholder="Main Strength" required />
                                              <span className="text-danger">{formData.error_list.main_strength}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Main Weakness  (The Candidate weakness)<span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="main_weakness" className="my-auto ti-form-input"  value={formData.main_weakness}
                                                onChange={(e) => handleInputChange('main_weakness', e.target.value)} placeholder="Main Weakness" required />
                                              <span className="text-danger">{formData.error_list.main_weakness}</span>
                                </div>
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Birth Place<span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="birth_place" className="my-auto ti-form-input"  value={formData.birth_place}
                                                onChange={(e) => handleInputChange('birth_place', e.target.value)} placeholder="birth place " required />
                                              <span className="text-danger">{formData.error_list.birth_place}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Residence Place  <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="residence_place" className="my-auto ti-form-input"  value={formData.residence_place}
                                                onChange={(e) => handleInputChange('residence_place', e.target.value)} placeholder="year of experience" required />
                                              <span className="text-danger">{formData.error_list.residence_place}</span>
                                </div>
                                   <div className="space-y-2">
                                 <label className="ti-form-label mb-0">Relative inside (Client) <span style={{ color: "red" }}> *</span></label>
                                        <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('relative_inside', e.target.value)} value="1" name="relative_inside" className = "ti-form-radio" id="relative_inside"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('relative_inside', e.target.value)} value="2" name="relative_inside" className = "ti-form-radio" id="relative_inside" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                    </label>
                                    </div>
                                </div>
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Relative name </label>
                                            <input type="text" name="relative_name" className="my-auto ti-form-input"  value={formData.relative_name}
                                                onChange={(e) => handleInputChange('relative_name', e.target.value)} placeholder="Relative name" required />
                                             
                                </div>
                                <div className="space-y-2">
                                 <label className="ti-form-label mb-0">Do you suffer from any chronic disease?  <span style={{ color: "red" }}> *</span></label>
                                        <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('chronic_disease', e.target.value)} value="1" name="chronic_disease" className = "ti-form-radio" id="chronic_disease"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('chronic_disease', e.target.value)} value="2" name="chronic_disease" className = "ti-form-radio" id="chronic_disease" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                    </label>
                                    </div>
                                </div>
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0">If yes, Please specify  </label>
                                            <input type="text" name="chronic_remarks" className="my-auto ti-form-input"  value={formData.chronic_remarks}
                                                onChange={(e) => handleInputChange('chronic_remarks', e.target.value)} placeholder="If yes, Please specify" required />
                                              
                                </div>
                                
                                <div className="space-y-2">
                                 <label className="ti-form-label mb-0">Are you Pregnant?  <span style={{ color: "red" }}> *</span></label>
                                        <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('pregnant', e.target.value)} value="1" name="pregnant" className = "ti-form-radio" id="pregnant"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('pregnant', e.target.value)} value="2" name="pregnant" className = "ti-form-radio" id="pregnant" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                    </label>
                                    </div>
                                </div>
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0">If yes, Please specify in which month </label>
                                            <input type="number" name="pregnancy_months" className="my-auto ti-form-input"  value={formData.pregnancy_months}
                                                onChange={(e) => handleInputChange('pregnancy_months', e.target.value)} placeholder="Please specify in which month" />
                                             
                                </div>
                                
                                <div className="space-y-2">
                                 <label className="ti-form-label mb-0">Did you have any surgery operation before? <span style={{ color: "red" }}> *</span></label>
                                        <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('surgery_operation', e.target.value)} value="1" name="surgery_operation" className = "ti-form-radio" id="surgery_operation"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('surgery_operation', e.target.value)} value="2" name="surgery_operation" className = "ti-form-radio" id="surgery_operation-1" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                    </label>
                                    </div>
                                </div>
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0">If yes, Please specify</label>
                                            <input type="text" name="surgery_operation_remark" className="my-auto ti-form-input"  value={formData.surgery_operation_remark}
                                                onChange={(e) => handleInputChange('surgery_operation_remark', e.target.value)} placeholder="If yes, Please specify" />
                                            
                                </div>
                                
                                <div className="space-y-2">
                                 <label className="ti-form-label mb-0">Have you ever been employed by this employer before?  <span style={{ color: "red" }}> *</span></label>
                                        <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('employed_before', e.target.value)} value="1" name="employed_before" className = "ti-form-radio" id="employed_before"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('employed_before', e.target.value)} value="2" name="employed_before" className = "ti-form-radio" id="employed_before" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                    </label>
                                    </div>
                                </div>
                                 
                                <div className="space-y-2">
                                 <label className="ti-form-label mb-0">Can we do reference check?  <span style={{ color: "red" }}> *</span></label>
                                        <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('reference_check', e.target.value)} value="1" name="reference_check" className = "ti-form-radio" id="reference_check"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('reference_check', e.target.value)} value="2" name="reference_check" className = "ti-form-radio" id="reference_check" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                    </label>
                                    </div>
                                </div>
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0">If yes, Please specify  </label>
                                            <input type="text" name="reference_remarks" className="my-auto ti-form-input"  value={formData.reference_remarks} onChange={(e) => handleInputChange('reference_remarks', e.target.value)} placeholder="If yes, Please specify"  />           
                                </div>
                                
                                
                                    {/* Rest of Step 3 form fields */}
                                </div>
                                )}
                        <br />
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
                                            <label className="ti-form-label mb-0">Current packages  </label>
                                            <input type="number" name="current_packages" className="my-auto ti-form-input"  value={formData.current_packages}
                                        onChange={(e) => handleInputChange('current_packages', e.target.value)} placeholder="Current packages " Required />
                                    {/* <span className="text-danger">{formData.error_list.current_packages}</span>               */}
                                </div>
                                       <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Agreed Salary<span style={{ color: "red" }}> *</span> </label>
                                            <input type="number" name="agreed_salary" className="my-auto ti-form-input"  value={formData.agreed_salary}
                                        onChange={(e) => handleInputChange('agreed_salary', e.target.value)} placeholder="Agreed Salary " Required />
                                    <span className="text-danger">{formData.error_list.agreed_salary}</span>              
                                </div>
                                <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Required Notice  </label>
                                            <input type="text" name="required_notes" className="my-auto ti-form-input"  value={formData.required_notes}
                                        onChange={(e) => handleInputChange('required_notes', e.target.value)} placeholder="Required Notice  "/>
                                    {/* <span className="text-danger">{formData.error_list.required_notes}</span> */}
                                              
                                </div>
                                <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Current Employer Entity <span style={{ color: "red" }}> *</span>  </label>
                                              <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('current_employed_entity', e.target.value)} value="1" name="current_employed_entity" className = "ti-form-radio" id="current_employed_entity"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Public Sector</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('current_employed_entity', e.target.value)} value="2" name="current_employed_entity" className = "ti-form-radio" id="current_employed_entity" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Private Sector</span>
                                    </label>
                                    </div>
                                              
                                </div>
                                <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Social Insurance Status <span style={{ color: "red" }}> *</span> </label>
                                               <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('social_insuarance_status', e.target.value)} value="1" name="social_insuarance_status" className = "ti-form-radio" id="social_insuarance_status"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('social_insuarance_status', e.target.value)} value="2" name="social_insuarance_status" className = "ti-form-radio" id="social_insuarance_status" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                    </label>
                                    </div>
                                              
                                </div>
                                        
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Ability to work at site   <span style={{ color: "red" }}> *</span></label>
                                               <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('work_site', e.target.value)} value="1" name="work_site" className = "ti-form-radio" id="work_site"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('work_site', e.target.value)} value="2" name="work_site" className = "ti-form-radio" id="work_site" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                    </label>
                                    </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Reallocation place of work<span style={{ color: "red" }}> *</span></label>
                                               <div className = "grid sm:grid-cols-2 gap-2">
                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('reallocation_place', e.target.value)} value="1" name="reallocation_place" className = "ti-form-radio" id="reallocation_place"/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Yes</span>
                                    </label>

                                    <label className = "flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                        <input type="radio" onChange={(e) => handleInputChange('reallocation_place', e.target.value)} value="2" name="reallocation_place" className = "ti-form-radio" id="reallocation_place" defaultChecked/>
                                        <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">No</span>
                                    </label>
                                    </div>
                                </div>
                                  <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Recruiter Recommendation <span style={{ color: "red" }}> *</span></label>
                                               <div className = "space-y-2">
                                     <ul className = "flex flex-col sm:flex-row">
                          <li className = "ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                            <div className = "relative flex items-start w-full">
                              <div className = "flex items-center h-5">
                                <input id="recruiter_recommendations-1" name="recruiter_recommendations" type="radio" onChange={(e) => handleInputChange('recruiter_recommendations', e.target.value)} value="1" className = "ti-form-radio" />
                              </div>
                              <label htmlFor="recruiter_recommendations-1" className = "ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                              Accepted
                              </label>
                            </div>
                          </li>

                          <li className = "ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                            <div className = "relative flex items-start w-full">
                              <div className = "flex items-center h-5">
                                <input id="recruiter_recommendations-2" name="recruiter_recommendations" type="radio" onChange={(e) => handleInputChange('recruiter_recommendations', e.target.value)} value="2" className = "ti-form-radio" defaultChecked/>
                              </div>
                              <label htmlFor="recruiter_recommendations-2" className = "ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                               Not Accepted
                              </label>
                            </div>
                          </li>

                          <li className = "ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                            <div className = "relative flex items-start w-full">
                              <div className = "flex items-center h-5">
                                <input id="recruiter_recommendations-3" name="recruiter_recommendations" onChange={(e) => handleInputChange('recruiter_recommendations', e.target.value)} value="3"  type="radio" className = "ti-form-radio"/>
                              </div>
                              <label htmlFor="recruiter_recommendations-3" className = "ltr:ml-2 rtl:mr-2 block w-full text-sm text-gray-600 dark:text-white/70">
                                Waiting List  
                              </label>
                            </div>
                          </li>
                        </ul>
                                    </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Recommended Job Title  <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="recommended_title" options={job_titles} onChange={(selectedOption) => handleInputChange(["recommended_title"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.recommended_title)} /> 
                                              <span className="text-danger">{formData.error_list.recommended_title}</span>
                                </div>                                                                          
                                    {/* Rest of Step 3 form fields */}
                                </div>
                        )}
                        <br/>
                                <div>
                                    {step > 1 && step < 4 && (
                             <button  type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
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
export default Assessment;
