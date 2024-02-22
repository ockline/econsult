import React, { useState, useEffect } from 'react'
// import PageHeader from '../../../layout/layoutsection/pageHeader/pageHeader';
import DatePicker from 'react-datepicker';
import { DepartmentData,EmployerData,VacancyTypeData,JobTitleData} from '/src/common/select2data';
import Creatable from "react-select/creatable";
import Select from 'react-dropdown-select';
import { Link, useParams} from "react-router-dom";
// import NumberFormat from 'react-number-format';
// import DOMPurify from 'dompurify';
import 'react-form-wizard-component/dist/style.css';
import "../../../../src/assets/css/button-link-style.css";
import axios from "axios";

const ShowJob = () => {
      const [startDate, setStartDate] = useState(new Date());
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
    
        // const history = useHistory();
        const [value, setValue] = useState('');
        const [step, setStep] = useState(1);
    const [formData, setFormData] = useState([])
   
       
    
    const { id } = useParams();
    
        useEffect(() => {
    axios.get(`${apiBaseUrl}/hiring/job/home_job/${id}`).then((res) => {
        setFormData(res.data.formData)
        // console.log(res.data.formData)
    })
  }, [id])
        const handleInputChange = (stepName, value) => {
            setFormData((prevData) => ({
                ...prevData,
                [stepName]: value,
                 error_list: { ...prevData.error_list, [stepName] : null },
            }));
    };
    //block to preview signed  and  job application
       const [jobDocument, setJobDocument] = useState([]);
    const [documentUrl, setDocumentUrl] = useState('');
    const jobDocumentArray = Object.values(jobDocument);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/hiring/job/get_job_document/${id}`)
      .then((res) => {
          setJobDocument(res.data.job_document);
        //   console.log("dataaa",res.data.job_document)
      })
      .catch((error) => {
        console.error('Error fetching job documents:', error);
      });
  }, [id]);
  const handlePreviewClick = (description) => {
    // Assuming the documents are stored in a specific folder on the server      
      const absoluteUrl = `${docBaseUrl}/hiring/vacancies/${description}`;

//   console.log('absoluteUrl', absoluteUrl);

  // Update the state with the document URL
  setDocumentUrl(absoluteUrl);
     
    };
    //************************************************* */
           
    return (
    <div>
       <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Show Job Application Details</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/vacancies/jobs/`}>
						Home
						<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
					</a>
					</li>
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/vacancies/show_job/`}>
						Show Job Application
						{/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
					</a>
					</li>
				</ol>
				</div>
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
                <div className="box">
                        <div className="box-header">
                             <div className="space-y-2">
                                <h5 className="box-title">Job Application Details 
                           
                                     	<Link to={`${import.meta.env.BASE_URL}hiring/vacancies/jobs/`}>
								    <button type="button" className="ti-btn ti-btn-primary float-right">
									<i className="ti ti-arrow-left w-3.5 h-3.5"></i>	 Back							
									</button>
                                    </Link>
                                    <Link to={`${import.meta.env.BASE_URL}hiring/vacancies/download_job/` + id}><button type="button" className="ti-btn ti-btn-success float-end"><i className="ri ri-download-2-fill ltr:mr-1 rtl:ml-1 "></i> Download </button></Link>
                                    
                                    {jobDocumentArray.map((document) => (
                                        <span key={document.id} className={document.vacancy_doc === 'job_request_doc' ? 'job-request' : 'shortlisted'}>
                                        <button type="button" className={`ti-btn ti-btn-secondary float-end text-black ${document.vacancy_doc === 'job_request_doc' ? 'job-request-button' : 'shortlisted-button'}`} data-hs-overlay="#hs-overlay-top" onClick={() => handlePreviewClick(document.description)}><i className="ti ti-eye-check !text-white"></i>{document.vacancy_doc === 'job_request_doc' ? 'Preview Job Application' : 'Preview Shortlisted'}
                                        </button>
                                        </span>
                                    ))
                                    }

                                    </h5>
									</div>
                    </div>
                   <div className="box-body">
                        
                                    
                                    <div className="grid lg:grid-cols-3 gap-6">                                        
                                         <div className="space-y-2">
                                            <label className="ti-form-label mb-0" name="name">Name Of Company </label>
                                            <input type="text" name="employer" className = "ti-form-input" value={formData.employer}
                                                onChange={(e) => handleInputChange('employer', e.target.value)}   readOnly/>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Job Title</label>
                                            <input type="text" name="job_title_id" className = "ti-form-input" value={formData.job_title}
                                                onChange={(e) => handleInputChange('job_title', e.target.value)}   readOnly/>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Department Name </label>
                                               <input type="text" name="department_id" className = "ti-form-input" value={formData.department}
                                                onChange={(e) => handleInputChange('department', e.target.value)}   readOnly/>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Type Of Vacancy </label>
                                           
                                         <input type="text" name="type_vacancy_id" className = "ti-form-input" value={formData.vacancy_type}
                                                onChange={(e) => handleInputChange('vacancy_type', e.target.value)}   readOnly/>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">When The Position Becomes Vacant </label>
                                            <input type="date" name="position_vacant" className="my-auto ti-form-input" placeholder="position Vacant"  value={formData.position_vacant}
                                                onChange={(e) => handleInputChange('position_vacant', e.target.value)} readOnly />
                                          
                                      
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Date Of Application </label>
                                            <input type="date" name="date_application" className="my-auto ti-form-input"  value={formData.date_application}
                                                onChange={(e) => handleInputChange('date_application', e.target.value)} placeholder="Date Of Application " readOnly />
                                              {/* <span className="text-danger">{formData.error_list.date_application}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Deadline date of application </label>
                                        
                                            <input type="date" name="deadline_date" className="my-auto ti-form-input"  value={formData.deadline_date}
                                                onChange={(e) => handleInputChange('deadline_date', e.target.value)} placeholder="Date Of Application " readOnly />
                                              {/* <span className="text-danger">{formData.error_list.deadline_date}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Interview date HR  </label>
                                            <input type="date" name="hr_interview_date" className="my-auto ti-form-input"  value={formData.hr_interview_date}
                                                onChange={(e) => handleInputChange('hr_interview_date', e.target.value)} placeholder="Date Of Application " readOnly />
                                              {/* <span className="text-danger">{formData.error_list.hr_interview_date}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Interview date Technical  </label>
                                            <input type="date" name="tech_interview_date"  value={formData.tech_interview_date}
                                                onChange={(e) => handleInputChange('tech_interview_date', e.target.value)} className="ti-form-input" placeholder="Interview date Technical" readOnly />
                                              {/* <span className="text-danger">{formData.error_list.tech_interview_date}</span> */}
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Date For Appointment  </label>
                                            <input type="date" name="apointment_date" value={formData.apointment_date} onChange={(e) => handleInputChange('apointment_date', e.target.value)} className="ti-form-input" placeholder="Date For Appointment" readOnly />
                                              {/* <span className="text-danger">{formData.error_list.apointment_date}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Work Station  </label>
                                            <input type="text" name="work_station" className="my-auto ti-form-input"  value={formData.work_station}
                                                onChange={(e) => handleInputChange('work_station', e.target.value)} placeholder="Work Station " readOnly />
                                              {/* <span className="text-danger">{formData.error_list.work_station}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Please Give The Reasons For Replacement </label>
                                            <input type="text" name="replacement_reason" className="my-auto ti-form-input"  value={formData.replacement_reason}
                                                onChange={(e) => handleInputChange('replacement_reason', e.target.value)} placeholder="Please Give the Reasons For Replacement" readOnly />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Age </label>
                                            <input type="number" name="age" className="my-auto ti-form-input"  value={formData.age}
                                                onChange={(e) => handleInputChange('age', e.target.value)} placeholder="age" readOnly />
                                              {/* <span className="text-danger">{formData.error_list.age}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Academic </label>
                                            <input type="text" name="accademic" className="my-auto ti-form-input"  value={formData.accademic}
                                                onChange={(e) => handleInputChange('accademic', e.target.value)} placeholder="Academic" readOnly />
                                              {/* <span className="text-danger">{formData.error_list.accademic}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Professional</label>
                                            <input type="text" name="professional" className="my-auto ti-form-input"  value={formData.professional}
                                                onChange={(e) => handleInputChange('professional', e.target.value)} placeholder="Contact person" readOnly />
                                              {/* <span className="text-danger">{formData.error_list.professional}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Salary Range  </label>
                                            <input type="number" name="salary_range" className="my-auto ti-form-input"  value={formData.salary_range}
                                                onChange={(e) => handleInputChange('salary_range', e.target.value)} placeholder="Salary Range " readOnly />
                                            {/* <NumberFormat
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        placeholder={'Enter amount'}
                                        onValueChange={handleInputChange}
                                        /> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Others </label>
                                            <input type="text" name="others" className="my-auto ti-form-input"  value={formData.others}
                                                onChange={(e) => handleInputChange('others', e.target.value)} placeholder="others " readOnly />
                                            
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Additional Comments </label>   
                                    <textarea className = "ti-form-input" name="additional_comment" rows="3"
                                        value={formData.additional_comment}
                                                onChange={(e) => handleInputChange('additional_comment', e.target.value)} placeholder="Additional Comments" ></textarea>
                                            
                                        </div>                                    
                                </div>
                                <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Job Description </label>   
                                    <textarea className = "ti-form-input" name="name" rows="3"
                                        value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)} ></textarea>
                                            
                                        </div>
       
                           
                              
                         
                        </div>
                         <div id="hs-overlay-top" className="hs-overlay hidden ti-offcanvas ti-offcanvas-top" tabIndex={-2}>   
								<div className="ti-offcanvas-header">
									<h3 className="ti-offcanvas-title">
                                        Employer Document
									</h3>
									<button type="button" className="ti-btn flex-shrink-0 h-8 w-8 p-0 transition-none text-gray-500 hover:text-gray-700 focus:ring-gray-400 focus:ring-offset-white dark:text-white/70 dark:hover:text-white/80 dark:focus:ring-white/10 dark:focus:ring-offset-white/10" data-hs-overlay="#hs-overlay-top">
										<span className="sr-only">Close modal</span>
										<i className="ti ti-x"></i>

									</button>
								</div>
								<div className="ti-offcanvas-body" style={{ width: '100%', height: '1800px' }}>
										<iframe src={documentUrl} width="100%" height="700px" title="Document Preview"></iframe>
								</div>
                                                        </div>
                </div>
            </div>
        </div>
    </div>
);
  
};
export default ShowJob;