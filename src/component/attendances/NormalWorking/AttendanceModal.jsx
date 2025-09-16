import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobTitleData, PackageData, RegionData, BankData, BankBranchData, UsersData, DepartmentData, NationalityData, RankingCriterialData, CollegesData, yearsData, EducationLevelData, ReferenceCheck } from '/src/common/select2data';
import axios from "axios";
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
 import Swal from "sweetalert2";

const Index = () => {
	
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
	
    const [annualLeave, setAnnualLeave] = useState([]);
    let navigate = useNavigate();


	    
    const [formData, setFormData] = useState({
        employee_id: '',
        employer_id: '',
        employee_name: '',
        time: '',
        attendance_doc: null,
        error_list: [],

    });

    const handleFilesInputChange = (fieldName, files) => {
        // const file = files[0]; // Assuming single file selection, update accordingly for multiple files

        setEducationData((prevData) => ({
            ...prevData,
            [fieldName]: files,
        }));
    };


    const handleEducationInputChange = (stepName, value) => {
        if (value instanceof File) {
            // Handle file input change
            handleFilesInputChange(stepName, [value]);
        } else {
            // Handle other input types
            setEducationData((prevData) => ({
                ...prevData,
                [stepName]: value,
                error_list: { ...prevData.error_list, [stepName]: null },
            }));
        }
    };
    
    const SaveNormalAttendance = async (e) => {
        e.preventDefault();
        const dataToSend = {
        employee_id: formData.employee_id,
        employer_id: formData.employer_id,
        employee_name: formData.employee_name,
        time: formData.time,
        attendance_doc: formData.time,
            
        }

        try {
            const res = await axios.post(`${apiBaseUrl}/attendances/create_attendance`, dataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.data.validator_err) {
                // Handle validation errors
                const validationErrors = res.data.validator_err;

                // Update component state with validation errors
                setEducationData((prevData) => ({
                    ...prevData,
                    error_list: validationErrors,
                }));
            }
            else if (res.data.status === 500) {
                swal({
                    title: 'Sorry! Operation failed',
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

                    navigate('/attendances/normal_attendance');
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

    return (
        <div>
        			
		<div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Attendance Management</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
						Home
						<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
					</a>
					</li>
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}attendances/normal_attendance`}>
						Attendance Management
						{/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
					</a>
					</li>
				</ol>
				</div>
								
			<div className="grid grid-cols-12 gap-x-6">
				<div className="col-span-12">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Employees Attendance</h5>
								<div className="space-y-2">
                                     	<Link to="#" className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-primary m-0 whitespace-nowrap" data-hs-overlay="#task-compose"  >
								    <button type="button" className="ti-btn ti-btn-primary ">
									<i className="ti ti-user-plus w-3.5 h-3.5"></i>	 Create Attendance							
									</button>
                                    </Link>    
                                    
                                    {/* <Link to="#" className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-primary m-0 whitespace-nowrap" data-hs-overlay="#task-compose" style={{ backgroundColor: '#619162' }}>
                                        <i className="ti ti-database"></i>Add Education History
                                    </Link> */}
									</div>
									{/* <div className="space-y-2">
                                         <div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									
									<button type="button" className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">View All <i className="ti ti-chevron-down"></i></button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" to="#">Download</Link>
										<Link className="ti-dropdown-item" to="#">Import</Link>
										<Link className="ti-dropdown-item" to="#">Export</Link>
									</div>
								</div>
                               </div> */}
							</div>
						</div>
						
                        {/* attendance upload block */}
                           <div id="task-compose" className="hs-overlay hidden ti-modal">
                        <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto">
                            <div className="ti-modal-content ">
                                <div className="ti-modal-header">
                                    <h3 className="ti-modal-title font-bold text-lg "> Education History </h3>
                                    <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#task-compose">
                                        <span className="sr-only">Close</span>
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                                <div className="ti-modal-body ">
                                    <div className="grid lg:grid-cols-2 gap-6">
                                       
                                            <div className="space-y-2" id="other">
                                                <label className="ti-form-label mb-0 font-bold text-lg">Institute Name (if any) </label>
                                                <input
                                                    type="text"
                                                    name="other_institute"
                                                    className="my-auto ti-form-input"
                                                    value={formData.other_institute}
                                                    onChange={(e) => handleEducationInputChange('other_institute', e.target.value)}
                                                    placeholder="Institute name out of the list"
                                                    required
                                                />
                                            </div>
                                        
                                       
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Major </label>
                                            <input type="text" name="major" className="my-auto ti-form-input" value={formData.major}
                                                onChange={(e) => handleEducationInputChange('major', e.target.value)} placeholder="Major name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg ">Education Attachment (max size 2MB)<span style={{ color: "red" }}> *</span></label>
                                            <input type="file" name="education_cert" id="small-file-input"
                                                onChange={(e) => handleFilesInputChange('education_cert', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />

                                        </div>
                                      
                                    </div>
                                    <br />
                                    <div className="ti-modal-footer">
                                        <button type="button"
                                            className="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
                                            data-hs-overlay="#task-compose">
                                            Close
                                        </button>
                                        <Link className="ti-btn ti-btn-primary" to="#" onClick={SaveNormalAttendance}>
                                            Create
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
}


export default Index;