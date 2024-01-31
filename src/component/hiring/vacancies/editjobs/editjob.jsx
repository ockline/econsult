import React, { useState, useEffect } from 'react'
// import PageHeader from '../../../layout/layoutsection/pageHeader/pageHeader';
import DatePicker from 'react-datepicker';
import { DepartmentData,EmployerData,VacancyTypeData,JobTitleData} from '/src/common/select2data';
import Creatable from "react-select/creatable";
import Select from 'react-dropdown-select';
import { Link, useParams} from "react-router-dom";
// import { MultiSelect } from "react-multi-select-component";
import 'react-form-wizard-component/dist/style.css';
import SunEditor from 'suneditor-react';
import axios from "axios";

const EditJob = () => {
      const [startDate, setStartDate] = useState(new Date());
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    
        // const history = useHistory();
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
            error_list: [],
        });
    
const { id } = useParams();
        useEffect(() => {
    axios.get(`${apiBaseUrl}/hiring/job/edit_job/${id}`).then((res) => {
      setFormData(res.data.vacancy)
    })
  }, [id])
        // const handleInputChange = (stepName, value) => {
        //     setFormData((prevData) => ({
        //         ...prevData,
        //         [stepName]: value,
        //          error_list: { ...prevData.error_list, [stepName] : null },
        //     }));
    // };
   const handleInputChange = (stepName, value) => {
  setFormData((prevData) => {
    if (prevData && prevData.error_list) {
      console.log("prevData:", prevData);
      console.log("prevData.error_list:", prevData.error_list);

      return {
        ...prevData,
        [stepName]: value,
        error_list: { ...prevData.error_list, [stepName]: null },
      };
    } else {
      return {
        ...prevData,
        [stepName]: value,
      };
    }
  });
};


        const handleNextStep = () => {
            setStep((prevStep) => prevStep + 1);
        };

       

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
                        
            };
             try {
        const resp = await axios.put(`${apiBaseUrl}/hiring/job/update_job/` + id, DataToSend);

        // Handle validation errors
        if (resp.data.validator_err) {
            const validationErrors = resp.data.validator_err;

            // Update component state with validation errors
            setFormData((prevData) => ({
                ...prevData,
                error_list: validationErrors,
            }));
        } else {
            // Additional logic or state updates after a successful update

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
                // Use the useHistory hook to navigate to the home page
                // const history = useHistory();
                // history.push('/employers/registrations/registrations');
                // Additional logic or state updates after a successful update
            }
        }
    } catch (error) {
        console.error("Unexpected error:", error.message);
    }
    };
    
    
    
      // Banks  *********************
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
        {/* <PageHeader currentpage="Employer Registration" activepage="Add" mainpage="Add new Employer" /> */}
        <br/><br/>
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
                                            <label className="ti-form-label mb-0" name="name">Name Of Company <span style={{ color: "red" }}> *</span></label>
                                             <Creatable classNamePrefix="react-select" name="bank_id" options={employers} onChange={(selectedOption) => handleInputChange(["employer_id"], selectedOption ? selectedOption.value : null)} value={employers.find((option) => option.value === formData.employer_id)} />
                                            <span className="text-danger">{formData.error_list.employer_id}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Job Title</label>
                                            <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} />
                                             <span className="text-danger">{formData.error_list.job_title_id}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Department Name <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="department_id" options={departments} onChange={(selectedOption) => handleInputChange(["department_id"], selectedOption ? selectedOption.value : null)} value={departments.find((option) => option.value === formData.department_id)} />
                                              <span className="text-danger">{formData.error_list.department_id}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Type Of Vacancy <span style={{ color: "red" }}> *</span></label>
                                           <Creatable classNamePrefix="react-select" name="type_vacancy_id" options={vacancies} onChange={(selectedOption) => handleInputChange(["type_vacancy_id"], selectedOption ? selectedOption.value : null)} value={vacancies.find((option) => option.value === formData.type_vacancy_id)} />
                                              <span className="text-danger">{formData.error_list.email}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">When The Position Becomes Vacant <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="position_vacant" className="my-auto ti-form-input" placeholder="position Vacant"  value={formData.position_vacant}
                                                onChange={(e) => handleInputChange('position_vacant', e.target.value)} required />
                                          
                                        {/* <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <DatePicker className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10" name="position_vacant" selected={startDate} onChange={(date) => setStartDate(date)} timeInputLabel="Time:" dateFormat="dd/MM/yyyy h:mm aa" showTimeInput />

                                    </div>       */}
                                    <span className="text-danger">{formData.error_list.position_vacant}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Date Of Application <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="date_application" className="my-auto ti-form-input"  value={formData.date_application}
                                                onChange={(e) => handleInputChange('date_application', e.target.value)} placeholder="Date Of Application " required />
                                              <span className="text-danger">{formData.error_list.date_application}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Deadline date of application <span style={{ color: "red" }}> *</span></label>
                                        
                                            <input type="date" name="deadline_date" className="my-auto ti-form-input"  value={formData.deadline_date}
                                                onChange={(e) => handleInputChange('deadline_date', e.target.value)} placeholder="Date Of Application " required />
                                              <span className="text-danger">{formData.error_list.deadline_date}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Interview date HR  <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="hr_interview_date" className="my-auto ti-form-input"  value={formData.hr_interview_date}
                                                onChange={(e) => handleInputChange('hr_interview_date', e.target.value)} placeholder="Date Of Application " required />
                                              <span className="text-danger">{formData.error_list.hr_interview_date}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Interview date Technical  <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="tech_interview_date"  value={formData.tech_interview_date}
                                                onChange={(e) => handleInputChange('tech_interview_date', e.target.value)} className="ti-form-input" placeholder="Interview date Technical" required />
                                              <span className="text-danger">{formData.error_list.tech_interview_date}</span>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Date For Appointment  <span style={{ color: "red" }}> *</span></label>
                                            <input type="date" name="apointment_date" value={formData.apointment_date} onChange={(e) => handleInputChange('apointment_date', e.target.value)} className="ti-form-input" placeholder="Date For Appointment" required />
                                              <span className="text-danger">{formData.error_list.apointment_date}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Work Station  <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="work_station" className="my-auto ti-form-input"  value={formData.work_station}
                                                onChange={(e) => handleInputChange('work_station', e.target.value)} placeholder="Work Station " required />
                                              <span className="text-danger">{formData.error_list.work_station}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Please Give The Reasons For Replacement <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="replacement_reason" className="my-auto ti-form-input"  value={formData.replacement_reason}
                                                onChange={(e) => handleInputChange('replacement_reason', e.target.value)} placeholder="Please Give the Reasons For Replacement" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Age <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="age" className="my-auto ti-form-input"  value={formData.age}
                                                onChange={(e) => handleInputChange('age', e.target.value)} placeholder="age" required />
                                              <span className="text-danger">{formData.error_list.age}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Academic <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="accademic" className="my-auto ti-form-input"  value={formData.accademic}
                                                onChange={(e) => handleInputChange('accademic', e.target.value)} placeholder="Academic" required />
                                              <span className="text-danger">{formData.error_list.accademic}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Professional<span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="professional" className="my-auto ti-form-input"  value={formData.professional}
                                                onChange={(e) => handleInputChange('professional', e.target.value)} placeholder="Contact person" required />
                                              <span className="text-danger">{formData.error_list.professional}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Salary Range  <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="salary_range" className="my-auto ti-form-input"  value={formData.salary_range}
                                                onChange={(e) => handleInputChange('salary_range', e.target.value)} placeholder="Salary Range " required />
                                              <span className="text-danger">{formData.error_list.salary_range}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Others <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="others" className="my-auto ti-form-input"  value={formData.others}
                                                onChange={(e) => handleInputChange('others', e.target.value)} placeholder="others " required />
                                              <span className="text-danger">{formData.error_list.others}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0">Additional Comments <span style={{ color: "red" }}> *</span></label>   
                                    <textarea className = "ti-form-input" name="additional_comment" rows="3"
                                        value={formData.additional_comment}
                                                onChange={(e) => handleInputChange('additional_comment', e.target.value)} placeholder="Additional Comments" ></textarea>
                                             <span className="text-danger">{formData.error_list.additional_comment}</span>
                                        </div>
                                       
                                    {/* Rest of Step 1 form fields */}
                                </div>
                                )}
                                <br/>
                              
                          {step === 1 && (
                            <div>
                            <button type="submit" onClick={updateJobVacancy} className="ti-btn ti-btn-primary justify-center float-left">
                                            <i className="ti ti-transfer-in"></i> 
                                            
                                            Add
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
											<h3 className="ti-modal-title">
                          Add Job Descriptions For Vacancy
											</h3>
											<button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-large-modal">
												<span className="sr-only">Close</span>
												<svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
												</svg>
											</button>
										</div>
										<div className="ti-modal-body">
											<label htmlFor="input-label" className="ti-form-label">Job Description</label>
											  <SunEditor  name="name" setContents={value} onChange={(value) => setJobData({ ...jobData, name: value })} setOptions={{ buttonList: [
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
											onClick={(e) => SaveDescription(e)}
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