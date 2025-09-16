import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ALLImages from "/src/common/imagesdata";
import ProfileService from "/src/common/profileservices";
import { HomeGallery } from "/src/component/advancedUi/filemanager/filedetails/filedetailscarcousel";
import { TagsInput } from "react-tag-input-component";
import { Helmet } from "react-helmet";
import axios from "axios";


const ShowApplication = () => {
    // react-tag-input-component
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
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
            })
        });
    }, [location]);


    const [formData, setEmployeeData] = useState([])

    const { id } = useParams();

    console.log(formData)
    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/application/show_application/${id}`)
            .then((res) => {
                // console.log('API Response:', res.data);  // Log the entire response
                setEmployeeData(res.data.personnel_application);
                // console.log('data', res.data.personnel_application);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

  


       // Dependant updateDependanHistory   **********************************************


    const [dependantData, setDependantDetailData] = useState([])
    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/social/edit_dependant_detail/${id}`)
            .then((res) => {

                setDependantDetailData(res.data.dependant_detail); // Assuming "education_history" is correct
                // console.log("dataa", ' ', res.data.dependant_detail);
            })
            .catch((error) => {
                console.error('Error fetching practical data:', error);
            });
    }, [id]);


    
    // /**   Block for document preview  */
    const [employeeDocument, setEmployeeDocument] = useState([]);
    const [documentUrl, setDocumentUrl] = useState('');

    useEffect(() => {
        axios.get(`${apiBaseUrl}/employees/application/get_application_document/${id}`)
            .then((res) => {
                setEmployeeDocument(res.data.personnel_document);
                // console.log(res.data.personnel_document);
            })
            .catch((error) => {
                console.error('Error fetching personnel application  documents:', error);
            });
    }, [id]);

    // const handlePreviewClick = (description) => {
    //     // Assuming the documents are stored in a specific folder on the server      
    //     const absoluteUrl = `${docBaseUrl}/employees/social/${id}/${description}`;
    //       console.log('absoluteUrl', absoluteUrl);
    //     // Update the state with the document URL
    //     setDocumentUrl(absoluteUrl);

    // };
   
// const checkDocumentExists = async (urls) => {
//   for (const url of urls) {
//     try {
//       const response = await axios.head(url);
//       if (response.status === 200) {
//         return url; // Document found, return the URL
//       }
//     } catch (error) {
//       // Document not found at this URL, continue to the next one
//     }
//   }
//   return null; // Document not found at any URL
// };

const checkDocumentExists = async (urls) => {
  for (const url of urls) {
    try {
      // Attempt to fetch the document using a GET request
          const response = await axios.get(url);
      


      // If the GET request is successful (status code 200), return the URL
      if (response.status === 200) {
        return url;
      }
    } catch (error) {
      // Document not found at this URL, continue to the next one
    }
  }

  // Document not found at any URL
  return null;
};


const handlePreviewClick = async (description) => {
//   console.log('wazungu', employeeDocument);

  // Convert the object values to an array
  const documentArray = Object.values(employeeDocument);

  // Find the document based on the provided description
  const foundDocument = documentArray.find(
    (document) => document.description === description
  );

  if (foundDocument) {
    const { employee_id } = foundDocument;
    
    const possibleUrls = [
      `${docBaseUrl}/employees/social/${employee_id}/${description}`,
      `${docBaseUrl}/employees/personal/${description}`,
      `${docBaseUrl}/employees/documentation/${employee_id}/${description}`,
      `${docBaseUrl}/employees/hiring/technical/${description}`,
    ];

    const foundUrl = await checkDocumentExists(possibleUrls);

    if (foundUrl) {
      // Document found, update the state with the document URL
      setDocumentUrl(foundUrl);
    } else {
      // Document not found at any URL
      console.log('Document not found.');
    }
  } else {
    // Document not found in the employeeDocument object
    console.log('Document not found in employeeDocument.');
  }
};
    // console.log('datata', formData);

    return (
        <div>
            <Helmet>
                <body class={ClassName}></body>
            </Helmet>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Personnel ID Application Details</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/applications/all_id_application/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employees/applications/show_application/${formData.id}`}>Employee Person ID

                        </a>
                    </li>
                </ol>
            </div>



            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 xxl:col-span-4">
                    <div className="box">
                        <div className="box-header">
                            <div className="flex justify-between items-center">
                                <h5 className="box-title justify-center font-bold text-black !text-lg">Basic Information</h5>
                            </div>
                        </div>
                        <div className="box-body py-3">
                            <div className="xl:overflow-hidden overflow-x-auto">
                                <table className="ti-custom-table border-0">
                                    <tbody>
                                        <tr className="">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Full Name
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black font-medium">
                                                {formData?.employee_name}
                                            </td>
                                        </tr>
                                          <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Employer / Company Name
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData?.employer}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Title
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData?.job_title}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Depertment Name
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData?.department}
                                            </td>
                                        </tr>
                                        { formData.section !== '' && (

                                            <tr className="!border-0">
                                                <td className="!p-2 !text-lg font-bold text-black">
                                                    Section
                                                    <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse"><span>(if any)</span></p>
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 text-black">{formData.section}</td>
                                            </tr>

                                        )}

                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                National ID Number
                                                {/* <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse"><span>(if have cost center)</span></p> */}
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.national_id}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                               Birth Place
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.birth_place}
                                            </td>
                                        </tr>


                                        {/* <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Mobile number
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.mobile_number}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Home Phone Number
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-black">
                                                {formData.telephone_home}
                                            </td>
                                        </tr>
                                        <tr className="!border-0">
                                            <td className="!p-2 !text-lg font-bold text-black">
                                                Personal Email Address
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 text-secondary">
                                                {formData.personal_email}
                                            </td>
                                        </tr> */}
                                        {/* <tr className="!border-0">
                                            <td className="font-medium !p-2 text-black">
                                                Tin No
                                            </td>
                                            <td className="!p-2">:</td>
                                            <td className="!p-2 ">
                                                {formData.tin}
                                            </td>
                                        </tr> */}
                                       


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
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300 active"
                                    id="profile-item-1"
                                    data-hs-tab="#profile-1"
                                    aria-controls="profile-1"
                                    role="tab"
                                ><i className="ti ti-user-circle font-semibold"></i>
                                    Personnel ID Details
                                </button>
                                <button
                                    type="button"
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-1 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                    id="profile-item-2"
                                    data-hs-tab="#profile-2"
                                    aria-controls="profile-2"
                                    role="tab"
                                ><i className="ti ti-urgent font-semibold"></i>
                                    Workflow Histories
                                </button>
                                <button
                                    type="button"
                                    className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
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

                                <div className="overflow-auto">
                                    <table className="ti-custom-table border-0 whitespace-nowrap ti-head-primary">
                                        <thead>
                                            <tr >
                                                <th colSpan={1} className="text-center text-black font-bold text-medium">Name</th>
                                                <th colSpan={1} className="text-center text-black font-bold text-medium">Status</th>
                                                <th colSpan={2} className="text-center text-black font-bold text-medium">Name/Remark</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-lg" colSpan={1}>
                                                    Personnel Type
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={1}>
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="relative-inside" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.personal_type}</label></td>
                                                {formData.personal_type == 'Transfer' &&
                                                    (<td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><span className="text-black font-bold text-medium" >From Campany:</span>&nbsp;&nbsp;&nbsp;{formData.transfer_from}</td>)
                                                }


                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                    Id/Site Pass Type
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={1}>
                                                    <input type="checkbox" className="ti-form-checkbox mt-0.5 pointer-events-none" id="relative-inside" defaultChecked />
                                                    <label htmlFor="hs-checked-checkbox" className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{formData.site_pass_type}</label></td>
                                                {formData.site_pass_type === "Temporary" && (
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70" colSpan={2}><span className="text-black font-bold text-medium">From:</span>&nbsp;&nbsp;{formData.from_date} &nbsp;- &nbsp; {formData.end_date}</td>
                                                )
                                                }
                                            </tr>
                                           
                                    </tbody>
                                    </table>
                                           <br/><br/>
                                    <table className="ti-custom-table border-0 whitespace-nowrap ti-head-success">
                                        <thead>
                                            <tr >
                                                <th colSpan={1} className="text-center text-black font-bold text-medium"></th>
                                                <th className=" text-black font-bold text-medium"></th>
                                                <th colSpan={1} className="text-center text-black font-bold text-medium"></th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                  Duration of Deployment
                                                </td>
                                                <td className="text-black font-bold text-medium" >
                                                :</td>
                                                <td className="  text-black font-bold text-medium" colSpan={1}>
                                                    {formData.duration_deployment}</td>
                                            </tr>
                                               <tr className="!border-0">
                                                <td className="!p-2 text-black font-bold text-medium" colSpan={1}>
                                                  Purpose of Id
                                                </td>
                                                <td className=" text-black font-bold text-medium">
                                                :</td>
                                                <td className="text-black font-bold text-medium" colSpan={1}>
                                                    {formData.purpose}</td>
                                            </tr>
                                         
                                        </tbody>
                                    </table>
                                    <br />

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
                                  
                                    {/* Workflow History */}
                                    <div className="table-bordered rounded-md overflow-auto">
                                        <h3 className="text-black front-medium font-bold ">Workflow hsitory</h3>
                                        <table className="ti-custom-table ti-custom-table-head" >
                                            <thead className="bg-gray-50 dark:bg-black/20">
                                                <tr>
                                                    <th style={{ backgroundColor: '#ddbff0' }}>S/No</th>
                                                    <th scope="col" colSpan={1} className="py-3 ltr:pl-4 rtl:pr-4" style={{ backgroundColor: '#ddbff0' }}>
                                                        Dependant  name
                                                    </th>
                                                    <th scope="col" colSpan={1} className="!text-center" style={{ backgroundColor: '#ddbff0' }}>Relationship / Lerativeness</th>
                                                    <th scope="col" colSpan={1} className="!text-center" style={{ backgroundColor: '#ddbff0' }}>Birthday</th>
                                                    <th scope="col" colSpan={1} className="!text-center" style={{ backgroundColor: '#ddbff0' }}>Note / Remark</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(dependantData) && dependantData.map((dependant, index) => (

                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td colSpan={1} className="">{dependant.dependant_name}</td>
                                                        <td colSpan={1} className="">{dependant.relationship_id === 16 ? (
                                                                <span>{dependant.other_relationship}</span>
                                                            ) : (
                                                                <span>{dependant.relationship}</span>
                                                            )}</td>
                                                        {/* <td colSpan={1} >{dependant.to_date}</td> */}
                                                        <td colSpan={1} >{dependant.dob}</td>
                                                        <td colSpan={1} >{dependant.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Employment Reference check */}                                   
                                </div>

                            </div>


                            <div
                                id="profile-3"
                                className="hidden text-center"
                                role="tabpanel"
                                aria-labelledby="profile-item-4"
                            >
                                <div className="box">
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
                                            
                                                {/* <div className="md:ltr:ml-auto md:rtl:mr-auto">
                                                   
                                                     <Link
                                                    aria-label="anchor"
                                                    to={`${import.meta.env.BASE_URL}employees/socialrecords/download_social_record/` + formData.employee_id}
                                                  className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-success w-full"
                                                        style={{ backgroundColor: '#7800ff' }}
                                                >
                                                    <i className="ti ti-cloud-download"></i>Download Personnel Application
                                                </Link>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="overflow-auto">
                                            <table className="ti-custom-table  table-bordered ti-custom-table-head">
                                                <thead className="bg-gray-50 dark:bg-black/20">
                                                    <tr>
                                                        <th>S/No</th>
                                                        <th scope="col" className="!min-w-[13rem]">Document Name</th>
                                                        <th scope="col">Files</th>
                                                        <th scope="col">Size</th>
                                                        <th scope="col">Modified Date</th>
                                                        <th scope="col" className="!text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(employeeDocument).length > 0 ? (
                                                        Object.values(employeeDocument).map((document, index) => (
                                                            <tr key={document.id}>
                                                                <td>{index + 1}</td>
                                                                <td className="font-medium">
                                                                    {document.doc_name}
                                                                </td>
                                                                <td>1</td>
                                                                <td>2MB</td>
                                                                <td>{document.doc_modified}</td>
                                                                <td>

                                                                    <button type="button" className="ti-btn ti-btn-success text-black" data-hs-overlay="#hs-overlay-top" onClick={() => handlePreviewClick(document.description)}><i className="ti ti-eye-check !text-white"></i>Preview
                                                                    </button>

                                                                    <div id="hs-overlay-top" className="hs-overlay hidden ti-offcanvas ti-offcanvas-top" tabIndex={-2}>
                                                                        <div className="ti-offcanvas-header">
                                                                            <h3 className="ti-offcanvas-title">
                                                                                Employee Person Document
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
                                                                </td>
                                                            </tr>
                                                        ))) : (
                                                        // Handle non-array case (e.g., show an error message)
                                                        <p>No assessed documents available.</p>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <div className="py-1 ltr:float-right rtl:float-left">
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
                                        </div> */}
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

export default ShowApplication;
