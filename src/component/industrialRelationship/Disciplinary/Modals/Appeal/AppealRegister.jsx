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

export  function AppealRegister({ isOpen, onClose }) {
  if (!isOpen) return null;

     const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
    const token = sessionStorage.getItem('token');
    
    const [form] = Form.useForm();
    const [isLoading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // For employee number search
    const [step, setStep] = useState(1);
    const getEmployeeDetail = async (id) => {
        try {
            const res = await axios.get(
            `${apiBaseUrl}/industrial_relationship/disciplinary/retrieve_employee_details/${id}`,
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
    
     const [formData, setFormData] = useState({
            appeal_remark: '',
            employee_id: '',
            comments: '',
            notice_appeal_attachment: '',
            error_list: [],
        });
    
     const handleFileInputChange = (fieldName, files) => {
        // const file = files[0]; // Assuming single file selection, update accordingly for multiple files

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: files,
        }));
    };
    console.log('mjumbee', formData);

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
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const formDataToSend = new FormData();

            // Append form fields
            formDataToSend.append('misconduct_id', formData.misconduct_id);
            formDataToSend.append('disciplinary_id', formData.disciplinary_id);
            formDataToSend.append('employee_name', formData.employee_name);
            formDataToSend.append('comments', formData.comments || '');
            formDataToSend.append('appeal_remark', formData.appeal_remark);

            // Append the file
            if (formData.notice_appeal_attachment && formData.notice_appeal_attachment.length > 0) {
                formDataToSend.append('notice_appeal_attachment', formData.notice_appeal_attachment[0]);
            }
           
            setLoading(true);
            const response = await axios.post(
                `${apiBaseUrl}/industrial_relationship/disciplinary/initiate_appeal_workflow`,
                formDataToSend,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.status === 200) {
                await swal({
                    title: "Success",
                    text: 'Appeal successfully initiated.',
                    icon: "success",
                    button: "Close",
                });

                form.resetFields();
                onClose();
                fetchData();
            } else {
                swal({
                    title: "Failed",
                    text: response.data.message || '!Sorry, operation failed.',
                    icon: "warning",
                    button: "Close",
                });
            }
        } catch (error) {
            swal({
                title: "Failed",
                text: error.response?.data?.message || error.message || 'Something went wrong.',
                icon: "warning",
                button: "Close",
            });
        } finally {
            setLoading(false);
        }
    }
    
    // Handle Return action
    const handleReturn = async () => {
        try {
            const values = await form.validateFields();
            const hasVerification = (offence.reviews || []).some(
                review => review.review_type === "Verification" && review.action === "Verified"
            );
            const updatedValues = {
                ...values,
               disciplinary_id: formData.id// Approver if Verified, else Verifier
            };
            setLoading(true);
            const response = await returnReviewedFormalOffenceAPI(authToken, updatedValues, offence.disciplinary_id);
            if (response.data.status === 200) {
                await swal({
                    title: "Success",
                    text: 'Appeal successfully initiate.',
                    icon: "success",
                    button: "Close",
                });
                form.resetFields();
                onClose();
            } else {
                await swal({
                    title: "Failed",
                    text: '!Sorry operation failed.',
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
    style={{ maxWidth: "1000px" }}
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

                            <div className="grid lg:grid-cols-2 gap-6">
                               
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
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employee Name <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employee_name" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Employee employee_name"  readOnly value={formData.employee_name}
                                        onChange={(e) => handleInputChange('employee_name', e.target.value)} required />
                                    {/* <span className="text-danger">{formData.error_list.employee_name}</span> */}
                                </div>
                                                                                                          
                            <div className="space-y-2">
                            <label className="ti-form-label mb-0 font-bold text-lg">Misconduct Description</label>
                            <textarea
                                name="comments"
                                className="ti-form-input text-black bg-gray-100 border-red-500 text-md"
                                value={formData.comments}
                                onChange={(e) => handleInputChange('comments', e.target.value)}
                                placeholder="Misconduct Description"
                                rows={4}
                            ></textarea>
                            </div>

                            <div className="space-y-2">
                            <label className="ti-form-label mb-0 font-bold text-lg">
                                Appeal Remark <span style={{ color: "red" }}>*</span>
                            </label>
                            <textarea
                                name="appeal_remark"
                                className="ti-form-input text-black  text-md"
                                value={formData.appeal_remark}
                                onChange={(e) => handleInputChange('appeal_remark', e.target.value)}
                                placeholder="Appeal Description"
                                rows={4}
                                required
                            ></textarea>
                            </div>
                                
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-lg">Notice to Appear Attachment<span style={{ color: "red" }}> *</span></label>
                                            <input type="file" accept=".pdf" name="notice_appeal_attachment" id="small-file-input" 
                                            onChange={(e) => handleFileInputChange('notice_appeal_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" required/>
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

export default AppealRegister;
