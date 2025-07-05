import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Row, Col, Card, Timeline, Tag, Form, Select, Input, Button } from "antd";
import Creatable from "react-select/creatable";
import { capacityType} from "/src/common/select2data";
import DatePicker from 'react-datepicker';
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const { Option } = Select;

function toTitleCase(str) {
  return str
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export  function AppealInvitationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

     const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
    
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // For employee number search
    const [step, setStep] = useState(1);
    
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
    
      const handleSubmit  = async () => {
        try {
            const values = await form.validateFields();
            const updatedValues = {
                ...values,
                grievance_id: formData.id, 
            };
    
            setLoading(true);
    
            const token = sessionStorage.getItem('token');
            axios.post(`${apiBaseUrl}/industrial_relationship/grievances/review_grievance_workflow`,updatedValues,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            if (response.success) {
                await swal({
                    title: "Success",
                    text: response.message,
                    icon: "success",
                    button: "Close",
                });
    
                form.resetFields();
                onClose(); // Close modal
    
                fetchData(); // Fetch updated data after closing the modal
            } else {
                swal({
                    title: "Failed",
                    text: response.message,
                    icon: "warning",
                    button: "Close",
                });
            }
        } catch (error) {
            swal({
                title: "Failed",
                text: error.message,
                icon: "warning",
                button: "Close",
            });
        } finally {
            setLoading(false);
        }
    };
    
    // Handle Return action
    const handleReturn = async () => {
        try {
            const values = await form.validateFields();
            const hasVerification = (offence.reviews || []).some(
                review => review.review_type === "Verification" && review.action === "Verified"
            );
            const updatedValues = {
                ...values,
               offence_id: offence.offence_id// Approver if Verified, else Verifier
            };
            setLoading(true);
            const response = await returnReviewedFormalOffenceAPI(authToken, updatedValues, offence.offence_id);
            if (response.success) {
                await swal({
                    title: "Success",
                    text: response.message,
                    icon: "success",
                    button: "Close",
                });
                form.resetFields();
                onClose();
            } else {
                await swal({
                    title: "Failed",
                    text: response.message,
                    icon: "warning",
                    button: "Close",
                });
            }
        } catch (error) {
            swal({
                title: "Failed",
                text: error.message,
                icon: "warning",
                button: "Close",
            });
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
      
       
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div
    className="bg-white dark:bg-bgdark rounded-lg shadow-lg w-full p-6"
    style={{ maxWidth: "1300px" }}
  >
    <div className="flex justify-between items-center border-b pb-3 mb-4">
      <h3 className="text-lg font-semibold">Appeal Register</h3>
      <button onClick={onClose} className="text-gray-600 hover:text-black">
        &times;
      </button>
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Subject Matter </label>
                                    <input type="text" name="subject_matter" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.subject_matter}
                                        onChange={(e) => handleInputChange('subject_matter', e.target.value)} placeholder="subject matter" />
                                </div> 
                                
                           
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">What are the alternative task </label>
                                    <input type="text" name="alternative_task" className="my-auto ti-form-input text-black border-red-500 text-md" value={formData.alternative_task}
                                        onChange={(e) => handleInputChange('alternative_task', e.target.value)} placeholder="What are the alternative task" />
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
                                            <label className="ti-form-label mb-0 font-bold text-lg">Notice to Appear Attachment</label>
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
                                    <i className="ti ti-geometry"></i>
                                    Appeal
                                    </>
                                )}
                                    </button>
                                    <button
            onClick={onClose}
            className="ti-btn ti-border bg-white text-gray-700 hover:bg-gray-50"
          >
            Close
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

export default AppealInvitationModal;
