
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
import { color } from "echarts";



const UploadDocument = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    let navigate = useNavigate();

    const [formData, setUploadDocumentData] = useState({
        passport_doc: null,
        id_copy: null,
        cv_doc: null,
        nssf_membership: null,
        induction_doc: null,
        guarantors: null,
        referenc_doc: null,
        certificate_service: null,
        police_doc: null,
        osha_checkup: null,
        combined_certificate: null,
        bank_detail_doc: null,
        error_list: [],

    });


    const { id } = useParams();

    //         useEffect(() => {
    // axios.get(`${apiBaseUrl}/hiring/technical_interview/edit_candidate/${id}`).then((res) => {
    //     setUploadDocumentData(res.data.assessed_candidate)
    //     console.log(res.data.assessed_candidate);
    // })
    //         }, [id])


    // const handleFileInputChange = (fieldName, files) => {
    //     // const file = files[0]; // Assuming single file selection, update accordingly for multiple files
    //     setUploadDocumentData((prevData) => ({

    //         ...prevData,
    //         [fieldName]: files, // assuming you only want to handle single file inputs
    //     }));
    // };

    // const handleInputChange = (stepName, value) => {
    //     if (value instanceof File) {
    //         // Handle file input change
    //         handleFileInputChange(stepName, [value]);
    //     } else {
    //         // Handle other input types
    //         setUploadDocumentData((prevData) => ({
    //             ...prevData,
    //             [stepName]: value,
    //             error_list: { ...prevData.error_list, [stepName]: null },
    //         }));
    //     }
    // };
    const [isSubmitting, setIsSubmitting] = useState(false);
    //Block to check  size of pdf
    const handleFileInputChange = (fieldName, files) => {
        // Assuming you want to handle multiple files for the same field
        setUploadDocumentData((prevData) => ({
            ...prevData,
            [fieldName]: files,
        }));

        // Add validation logic here if needed
    //     const allowedTypes = ['application/pdf'];
    //     const maxFileSize = 3 * 1024 * 1024; // 3MB

    //     files.forEach((file) => {
    //         // Check if the file is not empty
    //         if (!file) {
    //             setUploadDocumentData({
    //                 ...formData,
    //                 error_list: {
    //                     ...formData.error_list,
    //                     [fieldName]: 'Please select a file.',
    //                 },
    //             });
    //             return;
    //         }

    //         // Check file type
    //         if (!allowedTypes.includes(file.type)) {
    //             setUploadDocumentData({
    //                 ...formData,
    //                 error_list: {
    //                     ...formData.error_list,
    //                     [fieldName]: 'File must be a PDF.',
    //                 },
    //             });
    //             return;
    //         }

    //         // Check file size
    //         if (file.size > maxFileSize) {
    //             setUploadDocumentData({
    //                 ...formData,
    //                 error_list: {
    //                     ...formData.error_list,
    //                     [fieldName]: 'File size exceeds 3MB limit.',
    //                 },
    //             });
    //             return;
    //         }
    //     });

    //     // Clear any previous errors for this field
    //     setUploadDocumentData({
    //         ...formData,
    //         error_list: {
    //             ...formData.error_list,
    //             [fieldName]: '',
    //         },
    //     });
    };



    const handleSubmit = async (e) => {
        // Handle form submission logic here
        e.preventDefault();
        setIsSubmitting(true);
        const DataToSend = {
            passport_doc: formData?.passport_doc,
            id_copy: formData?.id_copy,
            cv_doc: formData?.cv_doc,
            nssf_membership: formData?.nssf_membership,
            induction_doc: formData?.induction_doc,
            guarantors: formData?.guarantors,
            referenc_doc: formData?.referenc_doc,
            certificate_service: formData?.certificate_service,
            police_doc: formData?.police_doc,
            osha_checkup: formData?.osha_checkup,
            combined_certificate: formData?.combined_certificate,
            bank_detail_doc: formData?.bank_detail_doc,
        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/employees/document/upload_document/${id}`, DataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (resp.data.validator_err) {
                // Handle validation errors
                const validationErrors = resp.data.validator_err;

                // Update component state with validation errors
                setUploadDocumentData((prevData) => ({
                    ...prevData,
                    error_list: validationErrors,
                }));
                // Format validation errors for display in SweetAlert
                const formattedErrors = Object.keys(validationErrors).map((field) => (
                    `${validationErrors[field].join(', ')}`
                )).join('\n\n');
                Swal.fire({
                    // text: " Welcome to Your Admin Page",
                    allowOutsideClick: false,
                    icon: 'error',
                    title: 'Oops...',
                    text: formattedErrors,
                    footer: 'Kindly select file with red to Continue '
                });

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
                    title: 'New Employee Required Document uploaded successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                }).then(() => {
                    navigate('/employees/document/uploaded');
                });
               
            }
        }
        catch (error) {
            console.error("Unexpected error:", error.message);
        } finally {
            setIsSubmitting(false); // Enable the submit button back
        }
    };



    return (
        <div>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>New Employee Required Documentation</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/document/uploaded`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/document/uploaded_document/${formData.id}`}>
                            Required Documentation
                            {/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto font-bold text-lg">Local Staff Documents Requirements <span className="text-danger">(pdf format)</span></h1>
                    <Link to={`${import.meta.env.BASE_URL}employees/personal/employee_list`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                        <div className="grid lg:grid-cols-3 gap-6">


                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">ID Copy  (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">Passport, Voters, Driving license, National Id</span>
                                <input type="file" accept=".pdf" name="id_copy" id="small-file-input"
                                    onChange={(e) => handleFileInputChange('id_copy', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.id_copy}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Passport size Photo (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">White Background, Blue background</span>
                                <input type="file" accept=".pdf" name="passport_doc" id="small-file-input-1"
                                    onChange={(e) => handleFileInputChange('passport_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.passport_doc}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Combined Accademic (max 3MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">Combined Copies of accademic Proffessional certificate & transcipt </span>
                                <input type="file" accept=".pdf" name="combined_certificate" id="small-file-input-2"
                                    onChange={(e) => handleFileInputChange('combined_certificate', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.combined_certificate}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Curriculum Vitae (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">Detailed</span>
                                <input type="file" accept=".pdf" name="cv_doc" id="small-file-input-3"
                                    onChange={(e) => handleFileInputChange('cv_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.cv_doc}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Copy of NSSf  (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">Copy of social security membership card / number </span>
                                <input type="file" accept=".pdf" name="nssf_membership" id="small-file-input-4"
                                    onChange={(e) => handleFileInputChange('nssf_membership', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.nssf_membership}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Introduction Letter  (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">Introduction letter from the local Municipal</span>
                                <input type="file" accept=".pdf" name="induction_doc" id="small-file-input-6"
                                    onChange={(e) => handleFileInputChange('induction_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.induction_doc}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Combined Guarantors Letter (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">A letter from a reputed person quarantying you in case of any financial liability </span>
                                <input type="file" accept=".pdf" name="guarantors" id="small-file-input-7"
                                    onChange={(e) => handleFileInputChange('guarantors', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.guarantors}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Reference letter  (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">From a recognized person with a recognized address </span>
                                <input type="file" accept=".pdf" name="referenc_doc" id="small-file-input-8"
                                    onChange={(e) => handleFileInputChange('referenc_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.referenc_doc}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Certificate of Cervice (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">From Previous formData </span>
                                <input type="file" accept=".pdf" name="certificate_service" id="small-file-input-9"
                                    onChange={(e) => handleFileInputChange('certificate_service', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.certificate_service}</span>
                            </div>

                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Bank Details / Bank Verification Form  (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">Preferably CRDB </span>
                                <input type="file" accept=".pdf" name="bank_detail_doc" id="small-file-input-10"
                                    onChange={(e) => handleFileInputChange('bank_detail_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.bank_detail_doc}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Criminal Bureau verification (max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">Police clearence form</span>
                                <input type="file" accept=".pdf" name="police_doc" id="small-file-input-11"
                                    onChange={(e) => handleFileInputChange('police_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.police_doc}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Occupational check-up (OSHA)(max 2MB)</label>
                                <span className="block text-xs text-gray-700 dark:text-white/80 !font-normal my-auto">	Pre-employment occupational Medical check-up form (OSHA)</span>
                                <input type="file" accept=".pdf" name="osha_checkup" id="small-file-input-12"
                                    onChange={(e) => handleFileInputChange('osha_checkup', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                <span className="text-danger">{formData.error_list.osha_checkup}</span>
                            </div>
                        </div>

                        <div>
                        </div>
                        <br /><br />
                        {/* <button type="submit" className="ti-btn ti-btn-primary w-full font-bold text-lg" style={{ backgroundColor: '#285f29' }}><i className="ti ti-cloud-upload"></i>Upload Document</button> */}
                        <button type="submit" className="ti-btn ti-btn-primary w-full font-bold text-lg"
                            style={{ backgroundColor: '#285f29' }} disabled={isSubmitting} // Disable the button if isSubmitting is true
                        >     <i className="ti ti-cloud-upload"></i>Upload Document
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default UploadDocument;
