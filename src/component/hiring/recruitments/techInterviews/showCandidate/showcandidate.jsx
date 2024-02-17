import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ALLImages from "/src/common/imagesdata";
import Select from "react-select";
import { ProfileHomeData } from "/src/common/select2data";
import ProfileService from "/src/common/profileservices";
import { HomeGallery } from "/src/component/advancedUi/filemanager/filedetails/filedetailscarcousel";
import { TagsInput } from "react-tag-input-component";
import { Helmet } from "react-helmet";
import axios from "axios";


const ShowCandidate = () => {
    // react-tag-input-component
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    //URl image


    //toggle button for image
   
    const [ClassName, setClassName] = useState();

    useEffect(() => {
        if (ProfileService.returnImage() != undefined) {
            setImage(ProfileService.returnImage());
        }
        let contactItem = document.querySelectorAll(".main-contact-item");
        contactItem.forEach((ele) => {
            ele.addEventListener("click", () => {
                setClassName("main-content-body-show");
            });
        });
    }, [location]);
    
    
    const [formData, setAssessedCandidateData] = useState([])
    
     const { id } = useParams();
    
        useEffect(() => {
    axios.get(`${apiBaseUrl}/hiring/technical_interview/show_candidate/${id}`)
        .then((res) => {
            // console.log('API Response:', res.data);  // Log the entire response
            setAssessedCandidateData(JSON.parse(res.data.assessed_candidate));

            // setAssessedCandidateData(res.data.assessed_candidate);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}, [id]);

    //block to return Practical test data
    
     const [practicalData, setPracticalData] = useState([]);
          useEffect(() => {
    axios.get(`${apiBaseUrl}/hiring/technical_interview/practical_candidate/${id}`).then((res) => {
        setPracticalData(res.data.practical_candidate)
        console.log(res.data.practical_candidate);
    })
            }, [id])
 
    

    return (
        <div>
            <Helmet>
                <body class={ClassName}></body>
            </Helmet>
            
            <br /><br />
            <h1 style={{ fontWeight: 'bold', fontSize: '2em' }}>Technical Assessed Candidate Details</h1>
            <br/>
            {/* <div className="grid grid-cols-12 gap-6">
				<div className="col-span-12">
					<div className="box">
                        <div className="box-body">
                             */}
                

           
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="col-span-12 xxl:col-span-4">
                        <div className="box">
                            <div className="box-header">
                                <div className="flex justify-between items-center">
                                    <h5 className="box-title justify-center">Basic Information</h5>
                                </div>
                            </div>
                            <div className="box-body py-3">
                                <div className="xl:overflow-hidden overflow-x-auto">
                                    <table className="ti-custom-table border-0">
                                        <tbody>
                                            <tr className="">
                                                <td className="font-medium !p-2">
                                                Job Title                
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    {formData.job_title}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-bold !p-2 ">
                                                  Date                                               
                                            </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                   {formData.date} 
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                               Cost Center Name
                                                <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse"><span>(if any)</span></p> 
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">{formData.cost_center}</td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                               Cost Center No.
                                             <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse"><span>(if have cost center)</span></p>                                                
                                            </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    {formData.cost_number}
                                                </td>
                                        </tr>
                                         <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                               Candidate name.                                                
                                            </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                   {formData.candidate_name}
                                                </td>
                                        </tr>
                                         <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                               Interviewer Name                                                
                                            </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    {formData.interviewer_name}
                                                </td>
                                        </tr>
                                        <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                               Recommended Job Title                                                 
                                            </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-info">
                                                    {formData.recommended_title}
                                                </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-span-12 xxl:col-span-8">
                        <div className="box">
                            <div className="box-header">
                                <nav
                                    className="sm:flex sm:space-x-2 space-y-2 sm:space-y-0 rtl:space-x-reverse block"
                                    aria-label="Tabs"
                                    role="tablist"
                                >
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300 active"
                                        id="profile-item-1"
                                        data-hs-tab="#profile-1"
                                        aria-controls="profile-1"
                                        role="tab"
                                    ><i className="ti ti-user-circle font-semibold"></i>
                                      Candidate Profile
                                    </button>
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-1 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                        id="profile-item-2"
                                        data-hs-tab="#profile-2"
                                        aria-controls="profile-2"
                                        role="tab"
                                    ><i className="ti ti-urgent font-semibold"></i>
                                        Candidate Competencies
                                    </button>
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                        id="profile-item-3"
                                        data-hs-tab="#profile-3"
                                        aria-controls="profile-3"
                                        role="tab"
                                    ><i className="ti ti-folders font-semibold"></i>
                                       Documents Center
                                    </button>
                                   
                                </nav>
                            </div>
                            <div className="box-body">
                                <div
                                    id="profile-1"
                                    className=""
                                    role="tabpanel"
                                    aria-labelledby="profile-item-1"
                                >
                                    <h5 className="box-title mb-3">
                                        
                                    Ranking Creteiral
                                    </h5>
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap ti-head-primary">
                                        <thead>
                                            <th>Ranking</th>
                                            <th></th>
                                            <th>Description</th>
                                            
                                        </thead>
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-bold  dark:!text-white/70"> 
                                               Outstanding
                                                
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                       Exceeding Expectation as Role Model 
                                                </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-bold  dark:!text-black/70">
                                                         V. Good  
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Exceeding expectation 
                                                </td>
                                                
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-bold  dark:!text-white/70">
                                                       Good
                                                
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                   Meet Expectation 
                                                </td>
                                                
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium  dark:!text-white/70">
                                                      Average
                                            
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                         Below Expectation 
                                                </td>
                                                
                                            </tr>
                                            <tr className="!border-0">
                                                    <td className="!p-2 font-medium  dark:!text-white/70">
                                                      Below Average
                                            
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Doesn’t meet Expectation 
                                                </td>
                                                
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                
                                  </div>
                                <div
                                    id="profile-2"
                                    className="hidden"
                                    role="tabpanel"
                                    aria-labelledby="profile-item-2"
                                >
                                      <div className="grid lg:grid-cols-1 gap-6 second-page none" id="new_page">
                                       
                                        <div className=" space-y-2"> 
                                                                                  
                                </div> 
                                {/* <div className="space-y-2"></div> */}
                                
                                  <div className="table-bordered rounded-md overflow-auto">
								<table className="ti-custom-table ti-custom-table-head">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr>
											<th scope="col" colSpan={ 1 }  className="py-3 ltr:pl-4 rtl:pr-4">
										       Factors
											</th>
											<th scope="col" colSpan={ 1 } className="text-center">Ranking Creterial</th>
											<th scope="col" colSpan={ 1 } className="!text-end">Comments</th>
										</tr>
									</thead>
									<tbody>
										<tr>
                                                    <td className="">Technical Skills
                                                    <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse"><span>(Certificates, Courses, Softwares…etc.)</span></p>
                                                    </td>
                                                    <td colSpan={1} className="interactive">
                                                        {/* <div className = "grid sm:grid-cols-3 gap-2"> */}
                                                    <label className = "p-3 flex w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" htmlFor="hs-checked-checkbox" >
                                                    <input type="checkbox" className = "ti-form-checkbox mt-0.5 pointer-events-none" id="hs-checked-checkbox-1" defaultChecked/>
                                                    <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.technical_skill}</span>
                                                    </label>
                                                {/* </div> */}                                          
                                                                                             
                                                </td>
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="interactive_communication_remark" value={formData.skill_remark}
                                                     onChange={(e) => handleInputChange('skill_remark', e.target.value)} ></input>
                                                </td>
											</tr>
										<tr>
                                                    <td className="">Relevant Technical Experience
                                                    
                                                    </td>
                                                    <td colSpan={1} className="interactive">
                                                        {/* <div className = "grid sm:grid-cols-3 gap-2"> */}
                                                    <label className = "p-3 flex w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" htmlFor="hs-checked-checkbox" >
                                                    <input type="checkbox" className = "ti-form-checkbox mt-0.5 pointer-events-none" id="hs-checked-checkbox-1" defaultChecked/>
                                                    <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.relevant_experience}</span>
                                                    </label>
                                                {/* </div> */}                                          
                                                                                             
                                                </td>
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="interactive_communication_remark" value={formData.experience_remark}
                                                     onChange={(e) => handleInputChange('experience_remark', e.target.value)} ></input>
                                                </td>
											</tr>
										<tr>
                                                    <td className="">Knowledge of Tools and Equipment
                                                  
                                                    </td>
                                                    <td colSpan={1} className="interactive">
                                                        {/* <div className = "grid sm:grid-cols-3 gap-2"> */}
                                                    <label className = "p-3 flex w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" htmlFor="hs-checked-checkbox" >
                                                    <input type="checkbox" className = "ti-form-checkbox mt-0.5 pointer-events-none" id="hs-checked-checkbox-1" defaultChecked/>
                                                    <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.knowledge_equipment}</span>
                                                    </label>
                                                {/* </div> */}                                          
                                                                                             
                                                </td>
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="interactive_communication_remark" value={formData.knowledge_equipment_remark}
                                                     onChange={(e) => handleInputChange('equipment_remark', e.target.value)} ></input>
                                                </td>
											</tr>
										<tr>
                                                    <td className="">Quality and Safety awareness
                                                    
                                                    </td>
                                                    <td colSpan={1} className="interactive">
                                                        {/* <div className = "grid sm:grid-cols-3 gap-2"> */}
                                                    <label className = "p-3 flex w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" htmlFor="hs-checked-checkbox" >
                                                    <input type="checkbox" className = "ti-form-checkbox mt-0.5 pointer-events-none" id="hs-checked-checkbox-1" defaultChecked/>
                                                    <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.quality_awareness}</span>
                                                    </label>
                                                {/* </div> */}                                          
                                                                                             
                                                </td>
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="interactive_communication_remark" value={formData.awareness_remark}
                                                     onChange={(e) => handleInputChange('skill_remark', e.target.value)} ></input>
                                                </td>
											</tr>
										<tr>
                                                    <td className="">Physical Capability
                                                    <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse"><span>(Certificates, Courses, Softwares…etc.)</span></p>
                                                    </td>
                                                    <td colSpan={1} className="interactive">
                                                        {/* <div className = "grid sm:grid-cols-3 gap-2"> */}
                                                    <label className = "p-3 flex w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" htmlFor="hs-checked-checkbox" >
                                                    <input type="checkbox" className = "ti-form-checkbox mt-0.5 pointer-events-none" id="hs-checked-checkbox-1" defaultChecked/>
                                                    <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.physical_capability}</span>
                                                    </label>
                                                {/* </div> */}                                          
                                                                                             
                                                </td>
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="interactive_communication_remark" value={formData.capability_remark}
                                                     onChange={(e) => handleInputChange('capability_remark', e.target.value)} ></input>
                                                </td>
											</tr>
										
											
                                       {Array.isArray(practicalData) && practicalData.map((practical, index) => (
                                        
                                                <tr key={index}>
                                
                                                    <th className="">
                                                <span className="font-semibold ">Practical Test {index + 1}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {practical.test_marks}</span>
                                                  
                                                    </th>
                                                    
                                                    <td colSpan={1} className="interactive">
                                                    <label className = "p-3 flex w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" htmlFor="hs-checked-checkbox" >
                                                    <input type="checkbox" className = "ti-form-checkbox mt-0.5 pointer-events-none" id="hs-checked-checkbox-1" defaultChecked/>
                                                    <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{practical.ranking_creterial}</span>
                                                    </label>                                                     
                                                </td>
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="practicl_test_remark" value={practical.practicl_test_remark}
                                                     onChange={(e) => handleInputChange('capability_remark', e.target.value)} ></input>
                                        </td>                                       
									</tr>
                                     ))}      
                                                          
                                           
										
                                        <tr>
                                            <th className="" colSpan={1}>
												Overall Rating
											</th>
                                                    <td colSpan={1} className="text-center">
                                                        
                                                        {formData.overall_rating === "N/A" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-0 focus:ring-red-500 focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                        N/A
                                                    <span className="badge py-0.5 px-1.5 bg-red-800 text-white">0</span>
                                                </button>
                                                        )
                                                            : formData.overall_rating === "Below Average" ? (
                                                               <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-0 focus:ring-orange-500 focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                                Below Average
                                                            <span className="badge py-0.5 px-1.5 bg-orange-800 text-white">1</span>
                                                        </button>
                                                            )
                                                                : formData.overall_rating === "Average" ? (
                                                                   
                                                                <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:ring-yellow-500 focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                                    Average
                                                                <span className="badge py-0.5 px-1.5 bg-yellow-800 text-white">2</span>
                                                            </button>
                                                                )
                                                                    : formData.overall_rating === "Good" ? (
                                                                    <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                                        Good
                                                                    <span className="badge py-0.5 px-1.5 bg-black/50 text-white">3</span>
                                                                </button>
                                                                    )
                                                                        : formData.overall_rating === "V.Good" ? (     
                                                                         <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                                        V.Good
                                                                    <span className="badge py-0.5 px-1.5 bg-black/50 text-white">4</span>
                                                                </button>
                                                                        )
                                                                            : formData.overall_rating === "Outstanding" ? (
                                                                                
                                                                             <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-success text-white hover:bg-secondary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                                        Outstanding
                                                                    <span className="badge py-0.5 px-1.5 bg-black/50 text-white">5</span>
                                                                </button>
                                                                            ) : formData.overall_rating === null}</td>
                                                  
                                                    
                                                </tr>
                                                <tr>
											{/* <td className=""></td> */}
											<td className="">Final Recommendation	
                                            </td>
                                                    <td colSpan={1}>
                                                        <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="final_recommendations-Accepted"
                                                        checked={
                                                            formData.final_recommendation ===
                                                            "true"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="final_recommendations-Accepted"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Accepted
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                     <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="final_recommendations-Not-Accepted"
                                                        checked={
                                                            formData.final_recommendation ===
                                                            "false"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="final_recommendations-Not-Accepted"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Not Accepted
                                                    </label>
                                               
                                                </td>
                                            
                                               
                                            </tr>
									</tbody>
								</table>
							</div>
                             </div> 
                                
                                </div>
                               
                                   
                                <div
                                    id="profile-3"
                                    className="hidden text-center"
                                    role="tabpanel"
                                    aria-labelledby="profile-item-4"
                                ><div className="box">
						<div className="box-header">
							<h5 className="box-title">Recent Files</h5>
						</div>
						<div className="box-body">
							<div className="pb-5">
								<div className="md:flex justify-between space-y-2 md:space-y-0">
									<div className="relative max-w-xs">
										<label htmlFor="hs-table-search" className="sr-only">Search</label>
										<input type="text" onChange={(ele) => { myfunction(ele.target.value) }} name="hs-table-search" id="hs-table-search" className="p-2 ltr:pr-10 rtl:pl-10 ti-form-input" placeholder="Search for items" />
										<div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
											<svg className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
												<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
											</svg>
										</div>
									</div>
									<div className="md:ltr:ml-auto md:rtl:mr-auto">
										<Link to={`${import.meta.env.BASE_URL}hiring/hrinterview/download_assessment/` + formData.id} className="ti-btn  bg-success text-xs m-0 ti-btn-soft p-2 font-semibold !text-gray-500 !text-white/70"><i className="ti ti-download"></i>Download</Link>
									</div>
								</div>
							</div>
							<div className="overflow-auto">
								<table className="ti-custom-table  table-bordered ti-custom-table-head">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr>
											<th scope="col" className="!min-w-[13rem]">Name</th>
											<th scope="col">Files</th>
											<th scope="col">Size</th>
											<th scope="col">Type</th>
											<th scope="col">Modified Date</th>
											<th scope="col" className="!min-w-[13rem]">Members</th>
											<th scope="col" className="!text-end">options</th>
										</tr>
									</thead>
									<tbody>
										{/* {allData.map((formData) => ( */}
											<tr key={Math.random()}>
												<td className="font-medium">
													aa
												</td>
												<td>a</td>
												<td>b</td>
												<td>c</td>
												<td>d</td>
												<td>
													<div className="flex -space-x-2 rtl:space-x-reverse">
														<img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={ALLImages('jpg63')} alt="Image Description" />
														<img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={ALLImages('jpg58')} alt="Image Description" />
													</div>
												</td>
												<td className="!text-end">
													<div className="hs-dropdown ti-dropdown">
														<button aria-label="button" id="hs-dropdown-custom-icon-trigger1" type="button" className="hs-dropdown-toggle p-3 ti-dropdown-toggle">
															<svg className="ti-dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
																<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
																</path>
															</svg>
														</button>
														<div className="hs-dropdown-menu ti-dropdown-menu hidden" aria-labelledby="hs-dropdown-custom-icon-trigger1" >
															<Link className="ti-dropdown-item" to="#">
																<i className="ti ti-eye-check"></i>Preview
															</Link>
															<Link className="ti-dropdown-item" to="#">
																<i className="ti ti-download"></i>Export/Download
															</Link>
															<Link className="ti-dropdown-item" to="#">
																<i className="ti ti-printer"></i>Print
															</Link>
														</div>
													</div>
												</td>
											</tr>
										{/* ))} */}
									</tbody>
								</table>
							</div>
							<div className="py-1 ltr:float-right rtl:float-left">
								<nav className="flex items-center space-x-2 rtl:space-x-reverse">
									<Link className="text-gray-500 dark:text-white/70 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md" to="#">
										<span aria-hidden="true">«</span>
										<span className="sr-only">Previous</span>
									</Link>
									<Link className="w-10 h-10 bg-primary text-white p-4 inline-flex items-center text-sm font-medium rounded-full" to="#" aria-current="page">1</Link>
									<Link className="w-10 h-10 text-gray-500 dark:text-white/70 hover:text-primary p-4 inline-flex items-center text-sm font-medium rounded-full" to="#">2</Link>
									<Link className="w-10 h-10 text-gray-500 dark:text-white/70 hover:text-primary p-4 inline-flex items-center text-sm font-medium rounded-full" to="#">3</Link>
									<Link className="text-gray-500 dark:text-white/70 hover:text-primary p-4 inline-flex items-center gap-2 font-medium rounded-md" to="#">
										<span className="sr-only">Next</span>
										<span aria-hidden="true">»</span>
									</Link>
								</nav>
							</div>
						</div>
					</div>
                                   
                                    {/* <Link
                                        to="#"
                                        className="ti-btn ti-btn-primary py-1 px-2 m-0"
                                    >
                                        View more
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                            
                            
						
			// 		</div>
			// 	</div>
			// </div>
            
          
        // </div>
    );
};

export default ShowCandidate;
