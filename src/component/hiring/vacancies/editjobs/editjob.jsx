import React, { useState, useEffect } from 'react'
// import PageHeader from '../../../layout/layoutsection/pageHeader/pageHeader';
import DatePicker from 'react-datepicker';
import { DepartmentData,EmployerData,VacancyTypeData,JobTitleData} from '/src/common/select2data';
import Creatable from "react-select/creatable";
import Select from 'react-dropdown-select';
import { Link, useParams, useNavigate} from "react-router-dom";
// import { MultiSelect } from "react-multi-select-component";
import 'react-form-wizard-component/dist/style.css';
import SunEditor from 'suneditor-react';
import axios from "axios";

const EditJob = () => {
      const [startDate, setStartDate] = useState(new Date());
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    
        let navigate = useNavigate();
        const [value, setValue] = useState('');
        const [step, setStep] = useState(1);
        const [formData, setFormData] = useState({
            employer_id: '',
            job_title_id: '',
            department_id: '',
            type_vacancy_id: '',
            position_vacant: '',
            date_application: '',
            deadline_date: '',
            hr_interview_date: '',
            tech_interview_date: '',
            apointment_date: '',
            work_station: '',
            replacement_reason: '',
            age: '',
            accademic: '',
            professional: '',
            salary_range: '',
            others: '',
            additional_comment: '',
            shortlisted_doc: null,
            job_request_doc: null,
            error_list: [],
        });
    
const { id } = useParams();
        useEffect(() => {
    axios.get(`${apiBaseUrl}/hiring/job/edit_job/${id}`).then((res) => {
      setFormData(res.data.vacancy)
    })
        }, [id])
    
        //     const handleFileInputChange = (fieldName, files) => {
        // setFormData((prevData) => ({
        //     ...prevData,
        //     [fieldName]: files, // assuming you only want to handle single file inputs
        // }));
        //     };
    
const handleFileInputChange = (fieldName, files) => {
  const file = files[0]; // Assuming single file selection, update accordingly for multiple files

  setFormData((prevData) => ({
    ...prevData,
    [fieldName]: file,
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

    
    //     const handleInputChange = (stepName, value) => {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [stepName]: value,
    //              error_list: { ...prevData.error_list, [stepName] : null },
    //         }));
    // };
       const updateJobVacancy = async (e) => {
            // Handle form submission logic here
           e.preventDefault();
               
console.log('Form submitted:', formData);
    const DataToSend = {
                employer_id: formData?.employer_id,
                job_title_id: formData?.job_title_id,
                department_id: formData?.department_id,
                type_vacancy_id: formData?.type_vacancy_id,
                position_vacant: formData?.position_vacant,
                date_application: formData?.date_application,
                deadline_date: formData?.deadline_date,
                hr_interview_date: formData.hr_interview_date,
                tech_interview_date: formData.tech_interview_date,
                apointment_date: formData.apointment_date,
                work_station: formData.work_station,
                replacement_reason: formData.replacement_reason,
                age: formData.age,
                accademic: formData.accademic,
                professional: formData.professional,
                salary_range: formData.salary_range,
                others: formData.others,
                additional_comment: formData.additional_comment,
                shortlisted_doc: formData.shortlisted_doc,
                job_request_doc: formData.job_request_doc,
   };

  
             try {
               const resp = await axios.post(`${apiBaseUrl}/hiring/job/update_job/` + id,
DataToSend,  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
);

        // Handle validation errors
       
            // Check response status and show SweetAlert
            if (resp.data.status === 500) {
                swal({
                    title: 'Internal Server Error',
                    text: resp.data.message,
                    icon: 'warning',
                    button: 'ok',
                });
            } else if (resp.data.status === 200) {
                swal({
                    title: 'Updated Successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                });
                // .then(() => {
                //      navigate('/hiring/vacancies/jobs');
                // });
        }
    } catch (error) {
        console.error("Unexpected error:", error.message);
    }
    };
    //update Job Description
    // job/update_job_description/
     // Save Job Description 
    const [jobData, setJobData] = useState({
        name: '',
        
    });
       const updateJobDescription = async (e) => {
            // Handle form submission logic here
             e.preventDefault();
            console.log('Form submitted:', jobData);
           const JobDescSend = {
               name: jobData.name,
           };
    
        try {
        const resp = await axios.put(`${apiBaseUrl}/hiring/job/update_job_description/` + id, JobDescSend);

        // Handle validation errors            // Check response status and show SweetAlert
            if (resp.data.status === 500) {
                swal({
                    title: 'Internal Server Error',
                    text: resp.data.message,
                    icon: 'warning',
                    button: 'ok',
                });
            } else if (resp.data.status === 200) {
                swal({
                    title: 'Updated Successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                }).then(() => {
                    navigate('/hiring/vacancies/jobs');
                });
                
        }
    } catch (error) {
        console.error("Unexpected error:", error.message);
    }
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
    
         
   
    //Departments
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
     
    
    // Vacancies 
     const [vacancies, setVacancies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vacancies = await VacancyTypeData();
                setVacancies(vacancies);
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
    
 
    
    return (
    <div>
         <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Edit Job Application</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/vacancies/jobs/`}>
						Home
						<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
					</a>
					</li>
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/vacancies/edit_job/`}>
						Edit Job Application
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
                            <h5 className="box-title">Update Job Vacancy Details
                                     	<Link to={`${import.meta.env.BASE_URL}hiring/vacancies/jobs/`}>
								    <button type="button" className="ti-btn ti-btn-primary float-end">
									<i className="ti ti-arrow-left w-3.5 h-3.5"></i>	 Back							
									</button>
							   </Link>   </h5> 
									</div>
                    </div>
                   <div className="box-body">
                        <form className="ti-validation" noValidate onSubmit={updateJobVacancy}>
                                {step === 1 && (
                                    
                                    <div className="grid lg:grid-cols-3 gap-6">                                        
                                         <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md" name="name">Name Of Company <span style={{ color: "red" }}> *</span></label>
                                             <Creatable classNamePrefix="react-select" name="bank_id" options={employers} onChange={(selectedOption) => handleInputChange(["employer_id"], selectedOption ? selectedOption.value : null)} value={employers.find((option) => option.value === formData.employer_id)} />
                                            {/* <span className="text-danger">{formData.error_list.employer_id}</span> */}
                                        </div>
                                          {/* <input type="hidden" name="_method" value="PUT"></input> */}
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Job Title</label>
                                            <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} />
                                             {/* <span className="text-danger">{formData.error_list.job_title_id}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Department Name <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="department_id" options={departments} onChange={(selectedOption) => handleInputChange(["department_id"], selectedOption ? selectedOption.value : null)} value={departments.find((option) => option.value === formData.department_id)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Type Of Vacancy <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="type_vacancy_id" options={vacancies} onChange={(selectedOption) => handleInputChange(["type_vacancy_id"], selectedOption ? selectedOption.value : null)} value={vacancies.find((option) => option.value === formData.type_vacancy_id)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">When The Position Becomes Vacant <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="position_vacant" className="my-auto ti-form-input" placeholder="position Vacant"  value={formData.position_vacant}
                                                onChange={(e) => handleInputChange('position_vacant', e.target.value)} required />
                                          
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Date Of Application <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="date_application" className="my-auto ti-form-input"  value={formData.date_application}
                                                onChange={(e) => handleInputChange('date_application', e.target.value)} placeholder="Date Of Application " required />
                                              {/* <span className="text-danger">{formData.error_list.date_application}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Deadline date of application <span style={{ color: "red" }}> *</span></label>
                                        
                                            <input type="date" name="deadline_date" className="my-auto ti-form-input"  value={formData.deadline_date}
                                                onChange={(e) => handleInputChange('deadline_date', e.target.value)} placeholder="Date Of Application " required />
                                              {/* <span className="text-danger">{formData.error_list.deadline_date}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Interview date HR  <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="hr_interview_date" className="my-auto ti-form-input"  value={formData.hr_interview_date}
                                                onChange={(e) => handleInputChange('hr_interview_date', e.target.value)} placeholder="Date Of Application " required />
                                              {/* <span className="text-danger">{formData.error_list.hr_interview_date}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Interview date Technical  <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="tech_interview_date"  value={formData.tech_interview_date}
                                                onChange={(e) => handleInputChange('tech_interview_date', e.target.value)} className="ti-form-input" placeholder="Interview date Technical" required />
                                              {/* <span className="text-danger">{formData.error_list.tech_interview_date}</span> */}
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Date For Appointment  <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="apointment_date" value={formData.apointment_date} onChange={(e) => handleInputChange('apointment_date', e.target.value)} className="ti-form-input" placeholder="Date For Appointment" required />
                                              {/* <span className="text-danger">{formData.error_list.apointment_date}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Work Station  <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="work_station" className="my-auto ti-form-input"  value={formData.work_station}
                                                onChange={(e) => handleInputChange('work_station', e.target.value)} placeholder="Work Station " required />
                                              {/* <span className="text-danger">{formData.error_list.work_station}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Please Give The Reasons For Replacement </label>
                                            <input type="text" name="replacement_reason" className="my-auto ti-form-input"  value={formData.replacement_reason}
                                                onChange={(e) => handleInputChange('replacement_reason', e.target.value)} placeholder="Please Give the Reasons For Replacement" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Age <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="age" className="my-auto ti-form-input"  value={formData.age}
                                                onChange={(e) => handleInputChange('age', e.target.value)} placeholder="age" required />
                                              {/* <span className="text-danger">{formData.error_list.age}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Academic <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="accademic" className="my-auto ti-form-input"  value={formData.accademic}
                                                onChange={(e) => handleInputChange('accademic', e.target.value)} placeholder="Academic" required />
                                              {/* <span className="text-danger">{formData.error_list.accademic}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Professional<span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="professional" className="my-auto ti-form-input"  value={formData.professional}
                                                onChange={(e) => handleInputChange('professional', e.target.value)} placeholder="Contact person" required />
                                              {/* <span className="text-danger">{formData.error_list.professional}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Salary Range  <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="salary_range" className="my-auto ti-form-input"  value={formData.salary_range}
                                                onChange={(e) => handleInputChange('salary_range', e.target.value)} placeholder="Salary Range " required />
                                              {/* <span className="text-danger">{formData.error_list.salary_range}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Others <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="others" className="my-auto ti-form-input"  value={formData.others}
                                                onChange={(e) => handleInputChange('others', e.target.value)} placeholder="others " required />
                                              {/* <span className="text-danger">{formData.error_list.others}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Additional Comments </label>   
                                    <textarea className = "ti-form-input" name="additional_comment" rows="3"
                                        value={formData.additional_comment}
                                                onChange={(e) => handleInputChange('additional_comment', e.target.value)} placeholder="Additional Comments" ></textarea>
                                             {/* <span className="text-danger">{formData.error_list.additional_comment}</span> */}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Job Application Attachment</label>
                                            <input type="file" name="job_request_doc" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('job_request_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                          
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">ShortListed Attachment</label>
                                            <input type="file" name="shortlisted_doc" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('shortlisted_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                          
                                        </div>
                                    {/* Rest of Step 1 form fields */}
                                </div>
                                )}
                                <br/>
                              
                          {step === 1 && (
                            <div>
                            <button type="submit" onClick={updateJobVacancy} className="ti-btn ti-btn-primary justify-center float-left">
                                            <i className="ti ti-transfer-in"></i> 
                                            
                                            Save to Draft
                            </button>
                            
                            <button type="button"  className="hs-dropdown-toggle  ti-btn ti-btn-success justify-center float-end" data-hs-overlay="#hs-large-modal">
                                <i className="ti ti-send"></i> Complete with Job Description to Submit
                            </button>
                            </div>
                        )}
                            </form>
                            
                            
                            {/* starting of adding  Job Description data */}
                            
                            	<div id="hs-large-modal" className="hs-overlay hidden ti-modal">
								<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto">
									<div className="ti-modal-content">
										<div className="ti-modal-header">
											<h3 className="ti-modal-title">Add Job Descriptions For Vacancy	</h3>
											<button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-large-modal">
												<span className="sr-only">Close</span>
												<i className="ti ti-x"></i>
											</button>
										</div>
										<div className="ti-modal-body">
											<label htmlFor="input-label" className="ti-form-label">Job Description</label>
											  <SunEditor  name="name" setContents={value} onChange={(value) => {
    
    setJobData({ ...jobData, name: value });
  }} setOptions={{ buttonList: [
                                                                                                    ["undo", "redo"],
                                                                                                    ["font", "fontSize"],
                                                                                                    ['paragraphStyle', 'blockquote'],
                                                                                                    [
                                                                                                      "bold",
                                                                                                      "underline",
                                                                                                      "italic",
                                                                                                      "strike",
                                                                                                      "subscript",
                                                                                                      "superscript"
                                                                                                    ],
                                                                                                    ["fontColor", "hiliteColor"],
                                                                                                    ["align", "list", "lineHeight"],
                                                                                                    ["outdent", "indent"],
                                                                                                    ["table", "horizontalRule", "link", "image", "video"],
                                                                                                    ["preview", "print"],
                                                                                                    ["removeFormat"]
                                                                                                    ],
                                                                                                    defaultTag: "div",
                                                                                                    minHeight: "300px",
                                                                                                    showPathLabel: false,
                                                                                                    attributesWhitelist: {
                                                                                                      all: "style",
                                                                                                      table: "cellpadding|width|cellspacing|height|style",
                                                                                                      tr: "valign|style",
                                                                                                      td: "styleinsert|height|style",
                                                                                                      img: "title|alt|src|style"
                                                                                                    }
                                                                                                    }}
                                                                                                    />
										</div>
										<div className="ti-modal-footer">
											<button type="button" className="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10" data-hs-overlay="#hs-large-modal">
                          Close
											</button>
											<Link className="ti-btn ti-btn-primary" to="#">
                                               
                                         <button
											type="button"
											className="ti-btn ti-btn-primary show-example-btn"
											aria-label="Save Changes! Example: End of contract"
											id="ajax-btn"
											onClick={(e) => updateJobDescription(e)}
										>
											 Save to Complete
										</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
                        </div>
                </div>
            </div>
        </div>
    </div>
);
  
};
export default EditJob;