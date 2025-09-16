import React, { useState, useEffect } from "react";
import ALLImages from "../../../../common/imagesData";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
// import { LightboxGallery, SpacebetweenSwiper } from "./filedetailscarcousel";

const FileDetails = () => {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;



    const { id, file_id } = useParams();

    // /**   Block for file / document preview  */
    const [employeeFile, setEmployeeFiles] = useState([]);
    const [documentUrl, setDocumentUrl] = useState('');


useEffect(() => {
    axios.get(`${apiBaseUrl}/employees/document/get_employee_files/${id}/${file_id}`)
        .then((res) => {
            setEmployeeFiles(res.data.employee_file);
            // console.log(res.data.employee_file);
        })
        .catch((error) => {
            console.error('Error fetching employee documents:', error);
        });
}, [id]);

    const handlePreviewClick = (description) => {
        // Assuming the documents are stored in a specific folder on the server      
        const absoluteUrl = `${docBaseUrl}/employees/documentation/${id}/${description}`;
        //   console.log('absoluteUrl', absoluteUrl);
        // Update the state with the document URL
        setDocumentUrl(absoluteUrl);

    };
    
    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Employee File Details</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/document/file_manager_list/${id}`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/document/file_detail/`}>File Details

                        </a>
                    </li>
                </ol>
            </div>


            <div className="grid grid-cols-12 xl:gap-6">
                <div className="col-span-12 xl:col-span-8">
                    <div className="box">
                        <div className="box-body space-y-4">
                            <button className="ti-btn ti-btn-success text-black" onClick={() => handlePreviewClick(employeeFile.description)}> <i className="ti ti-eye-check !text-white font-semibold text-medium" ></i>View file</button>
                            <Link to={`${import.meta.env.BASE_URL}employees/document/file_manager_list/${id}`} className="ti-btn ti-btn-primary m-0 py-2 float-end"><i className="ti ti-arrow-left"></i>Back</Link>
                            {/* <img className="rounded-md" src={ALLImages('jpg17')} alt="Image Description" /> */}
                            <iframe src={documentUrl} width="100%" height="700px" title="Document Preview"></iframe>
                            <div className="sm:flex justify-between space-y-2 sm:space-y-0">
                                <div className="flex space-x-2 rtl:space-x-reverse"><i className="ri ri-image-line text-primary p-2 leading-none bg-primary/20 rounded-md"></i><h3 className="my-auto font-bold">{employeeFile.doc_name}</h3></div>
                                {/* <div className="flex space-x-3 rtl:space-x-reverse">
                                    <i className="ri ri-edit-2-line p-2 leading-none bg-gray-200 text-gray-500 dark:text-white/70 dark:bg-black/20 rounded-md"></i>
                                    <i className="ri ri-star-line p-2 leading-none bg-gray-200 text-gray-500 dark:text-white/70 dark:bg-black/20 rounded-md"></i>
                                    <i className="ri ri-share-line p-2 leading-none bg-gray-200 text-gray-500 dark:text-white/70 dark:bg-black/20 rounded-md"></i>
                                    <i className="ri ri-download-2-line p-2 leading-none bg-gray-200 text-gray-500 dark:text-white/70 dark:bg-black/20 rounded-md"></i>
                                    <i className="ri ri-delete-bin-6-line p-2 leading-none bg-gray-200 text-gray-500 dark:text-white/70 dark:bg-black/20 rounded-md"></i>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="box">
						<div className="box-header">
							<h5 className="box-title">Related Files</h5>
						</div>
						<div className="box-body">
							<SpacebetweenSwiper />
						</div>
					</div> */}
                </div>
                <div className="col-span-12 xl:col-span-4">
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">File Details</h5>
                        </div>
                        <div className="box-body p-0">
                            <div className="rounded-lg overflow-auto">
                                <table className="ti-custom-table ti-custom-table-head">
                                    <tbody>
                                        {employeeFile && Object.keys(employeeFile).length > 0 ? (
                                            <>
                                                 <tr className="divide-x divide-gray-200 dark:divide-white/10">
                                                    <td className="font-medium">Employee Name</td>
                                                    <td>{employeeFile.employee}</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-200 dark:divide-white/10">
                                                    <td className="font-medium">Document Group</td>
                                                    <td>{employeeFile.document_group}</td>
                                                </tr>
                                                 <tr className="divide-x divide-gray-200 dark:divide-white/10">
                                                    <td className="font-medium">Document Group</td>
                                                    <td>{employeeFile.doc_name}</td>
                                                </tr>
                                                <tr className="divide-x divide-gray-200 dark:divide-white/10">
                                                    <td className="font-medium">Type</td>
                                                    <td>pdf</td>
                                                </tr>

                                                {/* <tr className="divide-x divide-gray-200 dark:divide-white/10">
                                                    <td className="font-medium">Location</td>
                                                    <td>file/gallery</td>
                                                </tr> */}

                                                {/* Uncomment the next lines when you have the actual data */}
                                                {/* <tr className="divide-x divide-gray-200 dark:divide-white/10">
        <td className="font-medium">Size</td>
        <td>909KB</td>
      </tr> */}

                                                <tr className="divide-x divide-gray-200 dark:divide-white/10">
                                                    <td className="font-medium">Created Date</td>
                                                    <td>{employeeFile.created_at}</td>
                                                </tr>

                                                <tr className="divide-x divide-gray-200 dark:divide-white/10">
                                                    <td className="font-medium">Modified Date</td>
                                                    <td>{employeeFile.updated_at}</td>
                                                </tr>

                                                {/* <tr className="divide-x divide-gray-200 dark:divide-white/10">
                                                    <td className="font-medium">Dimensions</td>
                                                    <td>7360 * 4912</td>
                                                </tr>

                                                <tr className="divide-x divide-gray-200 dark:divide-white/10">
                                                    <td className="font-medium">File Location</td>
                                                    <td>Device/Storage/Archives/AMB-2012.zip</td>
                                                </tr> */}
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan="2">No data</td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box-header">
                            <h5 className="box-title">File Description</h5>
                        </div>
                        <div className="box-body">
                            <p className="mb-3">
                                {employeeFile.description}
                            </p>                            
                        </div>
                    </div>
                    {/* <div className="box">
						<div className="box-header">
							<h5 className="box-title">Recent Files</h5>
						</div>
						<div className="box-body">
							<div className="relative">
								<div className="sm:grid grid-cols-12 gap-6 sm:space-y-0 space-y-6">
									<LightboxGallery />
								</div>
								
							</div>
						</div>
					</div> */}
                </div>
            </div>

        </div>
    );
};

export default FileDetails;
