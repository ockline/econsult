import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ALLImages from "../../../../common/imagesdata";
import Select from "react-select";
import { ProfileHomeData } from "../../../../common/select2data";
import ProfileService from "../../../../common/profileservices";
import { HomeGallery } from "../../../advancedUi/filemanager/filedetails/filedetailscarcousel";
import { TagsInput } from "react-tag-input-component";
import { Helmet } from "react-helmet";
import axios from "axios";


const ShowClient = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
   
    //URl image
    const [UrlImage, setUrlImage] = useState(ALLImages("png106"));
    //Disabling input feild
    const [UrlDisabled, setUrlDisabled] = useState(true);

    const [fileDisabled, setfileDisabled] = useState(false);
    //Default image
    const [Image, setImage] = useState(ALLImages("png106"));

    let location = useLocation();

    const putImage = () => {
        setImage(ProfileService.returnImage());
        if (UrlImage != Image) {
            ProfileService.handleChangeUrl(UrlImage);
            setImage(ProfileService.returnImage());
        }
        // setSmShow(false)
    };

    //toggle button for image
    const toggleImage = (type) => {
        if (type == "fileDisabled") {
            setfileDisabled(false);
            setUrlDisabled(true);
        }
        if (type == "UrlDisabled") {
            setUrlDisabled(false);
            setfileDisabled(true);
        }
    };
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
    //Employer data 
   
	
	 const [employer, setEmployerData] = useState([]);
    const { id } = useParams();
      useEffect(() => {
    axios.get(`${apiBaseUrl}/employers/show_employer/${id}`).then((res) => {
        setEmployerData(res.data.employer)
        // console.log(res.data.employer)
    })
        }, [id])
	
    console.log('e',employer)
       
  const [employerDocument, setEmployerDocument] = useState([]);
  const [documentUrl, setDocumentUrl] = useState('');

  useEffect(() => {
    axios.get(`${apiBaseUrl}/employers/get_employer_document/${id}`)
      .then((res) => {
        setEmployerDocument(res.data.employer_document);
      })
      .catch((error) => {
        console.error('Error fetching employer documents:', error);
      });
  }, [id]);

  const handlePreviewClick = (description) => {
    // Assuming the documents are stored in a specific folder on the server      
      const absoluteUrl = `${docBaseUrl}/employers/${description}`;

//   console.log('absoluteUrl', absoluteUrl);

  // Update the state with the document URL
  setDocumentUrl(absoluteUrl);
     
  };

    return (
        <div>
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Employer Details</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
						Home
						<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
					</a>
					</li>
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employers/registrations/registrations`}>
						Employer Registration
						{/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
					</a>
					</li>
				</ol>
				</div>
            <Helmet>
                <body class={ClassName}></body>
            </Helmet>
            <div className="flex relative before:bg-black/50 before:absolute before:w-full before:h-full">
                <img
                    src={Image}
                    alt=""
                    className="h-[500px] w-full rounded-sm"
                    id="profile-img2"
                />

                {/* <button
                    type="button"
                    className="absolute top-5 ltr:right-5 rtl:left-5 flex p-3 rounded-sm ring-1 ring-black/10 text-white bg-black/10 leading-none"
                    data-hs-overlay="#hs-small-modal"
                >
                    <i className="ri ri-pencil-line ltr:mr-2 rtl:ml-2"></i>{" "}
                    <span>Change Profile Pic</span>
                </button> */}

                <div id="hs-small-modal" className="hs-overlay hidden ti-modal">
                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                        <div className="ti-modal-content">
                            <div className="ti-modal-body">
                                <div
                                    onClick={() => {
                                        toggleImage("fileDisabled");
                                    }}
                                >
                                    <label
                                        htmlFor="file-input"
                                        className="sr-only"
                                    >
                                        Choose file
                                    </label>
                                    <input
                                        type="file"
                                        name="file-input"
                                        id="file-input"
                                        disabled={fileDisabled}
                                        onChange={(ele) =>
                                            ProfileService.handleChange(ele)
                                        }
                                        className=" inset-0 block w-full h-full cursor-pointer border my-2 border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-3 file:px-4 dark:file:bg-black/20 dark:file:text-white/70"
                                    />
                                </div>
                                <div
                                    onClick={() => {
                                        toggleImage("UrlDisabled");
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="my-auto ti-form-input"
                                        name="basic-input"
                                        id="basic-input"
                                        disabled={UrlDisabled}
                                        onChange={(ele) => {
                                            setUrlImage(ele.target.value);
                                        }}
                                        placeholder="Paste the URL"
                                    />
                                </div>
                                <br />
                                <button
                                    type="button"
                                    onClick={() => {
                                        putImage();
                                    }}
                                    className="py-1 px-3 ti-btn ti-btn-primary text-sm m-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-28 inset-x-0 text-center space-y-3">
                <div className="flex justify-center w-full">
                    <div className="relative cursor-pointer">
                        <img
                            src={ALLImages("jpg57")}
                            className="w-24 h-24 rounded-full ring-4 ring-white/10 mx-auto"
                            id="profile-img"
                            alt="profile-img"
                        />

                        <span className="absolute bottom-0 ltr:right-0 rtl:left-0 block p-1 rounded-full ring-2 ring-white/10 text-white bg-white/10 dark:bg-bgdark leading-none cursor-pointer">
                            <i className="ri ri-pencil-line cursor-pointer"></i>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id="profile-change"
                            ></input>
                        </span>
                    </div>
                </div>
                <div className="text-white">
                    <h2 className="text-base font-semibold">{employer.employer_name}</h2>
                    <p className="text-xs text-white/50">
                        employer logo
                    </p>
                </div>               
            </div>

            <div className="main-content -mt-28">
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="col-span-4 xxl:col-span-3">
                        <div className="box">
                            <div className="box-header">
                                <div className="flex justify-between">
                                    <h5 className="box-title">About Me</h5>
                                </div>
                            </div>
                            <div className="box-body space-y-4">
                                <div className="space-y-3">
                                    <p>
                                       
                                        {employer.employer_name}
                                    </p>
                                    <p>
                                       Our company dealing with software development
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 xxl:col-span-4">
                        <div className="box">
                            <div className="box-header">
                                <div className="flex justify-between">
                                    <h5 className="box-title">General Info (Membership)</h5>
                                </div>
                            </div>
                            <div className="box-body py-3">
                                <div className="xl:overflow-hidden overflow-x-auto">
                                    <table className="ti-custom-table border-0">
                                        <tbody>
                                            <tr className="">
                                                <td className="font-medium !p-2">
                                                    OSHA Number
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    {employer.osha}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                                    NSSF Number
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    {employer.nssf}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                                    WCF Number
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">{employer.wcf}</td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                                    NHIF Number
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    {employer.nhif}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                                    VRN Number
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    {employer.vrn}
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                            </div>

                        <div className="col-span-12 xxl:col-span-4">
                            <div className="box">
                                <div className="box-header">
                                    <h5 className="box-title"> Contact Person Information</h5>
                                </div>
                                
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap">
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                      Contact Personal 
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.contact_person}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Personal Contact
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.contact_person_phone}
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
                                    >
                                      Profile
                                    </button>
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                        id="profile-item-2"
                                        data-hs-tab="#profile-2"
                                        aria-controls="profile-2"
                                        role="tab"
                                    ><i className="ti ti-package"></i>
                                         Package
                                    </button>
                                         <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                        id="profile-item-3"
                                        data-hs-tab="#profile-3"
                                        aria-controls="profile-3"
                                        role="tab"
                                    ><i className="ti ti-package"></i>
                                         Remunoration
                                    </button>
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                        id="profile-item-4"
                                        data-hs-tab="#profile-4"
                                        aria-controls="profile-4"
                                        role="tab"
                                    ><i className="ti ti-folders"></i>
                                        Document Center
                                    </button>
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                        id="profile-item-5"
                                        data-hs-tab="#profile-5"
                                        aria-controls="profile-5"
                                        role="tab"
                                    >
                                        Projects
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
                                        Basic Information
                                    </h5>
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap ti-head-success">
                                            <thead>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </thead>
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-semibold !text-gray-500 dark:!text-white/70">
                                                    Employer Name 
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.employer_name}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibold">
                                                       Alias
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.alia}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibold ">
                                                        Employer number 
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.reg_no}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibol">
                                                       Tin Number
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.tin}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibold !text-gray-500 dark:!text-white/70">
                                                        Email
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.email}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <h5 className="box-title my-3">
                                        Contact Information
                                    </h5>
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap ti-head-info">
                                              <thead>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </thead>
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                     Phone  Number 
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.phone}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                      Telephone Number
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.telephone}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Fax Number
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.fax}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                       Region
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.region}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        District
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.district}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                       Postal Address
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.postal_address}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                    
                                                    Location Type
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.location}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                       Ward Name
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.ward}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                    
                                                    Street name
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.street}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                       Road
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.road}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                    
                                                    Plot Number
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.plot_number}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                       Block Number
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.block_number}
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
                                    <h5 className="box-title mb-3">
                                        Bank Information
                                    </h5>
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap ti-head-info">
                                              <thead>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </thead>
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-semibold !text-gray-500 dark:!text-white/70">
                                                   Bank Name 
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.bank}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibold">
                                                       Bank Branch
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.bank_branch}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibold ">
                                                    Bank Account Number  
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.account_no}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibol">
                                                       Bank Account Name
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.account_name}
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <br/>                                  
                                </div>
                                
                                  <div
                                    id="profile-3"
                                    className="hidden"
                                    role="tabpanel"
                                    aria-labelledby="profile-item-3"
                                >
                                  
                                      <h5 className="box-title mb-3">
                                       Employer Package
                                    </h5>
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap ti-head-success">
                                            <thead>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </thead>
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-semibold !text-gray-500 dark:!text-white/70">
                                                  Working hours  
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.working_hours}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibold">
                                                       Working days 
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.working_days}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibold ">
                                                   Shift   
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.shift_name}
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-semibol">
                                                       Allowance Name
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        {employer.allowance}
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div
                                    id="profile-4"
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
											{/* <th scope="col" className="!min-w-[10rem]">Members</th> */}
											<th scope="col" className="!text-end">Action</th>
										</tr>
									</thead>
									<tbody>
										{ employerDocument?.map((document, index) => (
                                            <tr key={document.id}>
                                                <td>{index + 1}</td>
												<td className="font-medium">
													{document.doc_name}
												</td>
												<td>1</td>
												<td>2MB</td>
												<td>{document.doc_updated}</td>
                                                <td>
                          
                                                    <button type="button" className="ti-btn ti-btn-success text-black" data-hs-overlay="#hs-overlay-top" onClick={() => handlePreviewClick(document.description)}><i className="ti ti-eye-check !text-white"></i>
Preview 
                                                        {/* {document.doc_name} */}
                                                    </button>
            
				
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
                                                   
                                                   
                                                </td>
                                                
                                                
                                                
                                                
												{/* <td className="!text-end">
													<div className="hs-dropdown ti-dropdown">
														<button aria-label="button" id="hs-dropdown-custom-icon-trigger1" type="button" className="hs-dropdown-toggle p-3 ti-dropdown-toggle bg-success" onClick={() => handlePreviewClick(document.description)}>
															<i className="ti ti-eye-check"></i>Preview
														</button>
														<div className="hs-dropdown-menu ti-dropdown-menu hidden" aria-labelledby="hs-dropdown-custom-icon-trigger1" >
															 

                                                           <Link  className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto " to="#"
                                                            onClick={() => handlePreviewClick(document.description)}
                                                            >
                                                          {document.doc_name}
                                                            </Link>
                                                           
                                                            <iframe src={documentUrl} width="100%" height="500px" title="Document Preview"></iframe>

      
                                                            
														</div>
													</div>
												</td> */}
                                                
                                            </tr>
                                            
										 ))} 
									</tbody>
								</table>

							</div>
						{/* <iframe src={documentUrl} width="100%" height="500px" title="Document Preview"></iframe> */}
						</div>
					</div>
                           
                                    
                                </div>
                               
                               
                                {/* <div
                                    id="profile-4"
                                    className="hidden text-center"
                                    role="tabpanel"
                                    aria-labelledby="profile-item-4"
                                >
                                    <div className="sm:grid grid-cols-12 gap-x-6 space-y-6 sm:space-y-0 text-start">
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png69"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Tailwind Ui Web
                                                                Application
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        2+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-success/10 text-success rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-success/40 rounded-full"></span>
                                                            Completed
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            15-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png68"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Synto Ui Mobile
                                                                Application
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-warning/10 text-warning rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-warning/40 rounded-full"></span>
                                                            Inprogress
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            10-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png70"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Valex Laravel
                                                                Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-warning/10 text-warning rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-warning/40 rounded-full"></span>
                                                            Inprogress
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            10-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png71"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Zanex Laravel
                                                                Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-primary/10 text-primary rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-primary/40 rounded-full"></span>
                                                            New Project
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png72"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Adminor Laravel
                                                                Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-primary/10 text-primary rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-primary/40 rounded-full"></span>
                                                            New Project
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png73"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Client Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-danger/10 text-danger rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-danger/40 rounded-full"></span>
                                                            Aborted
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png74"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                React Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        5+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-info/10 text-info rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-info/40 rounded-full"></span>
                                                            Approved
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png75"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Angular Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        5+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-primary/10 text-primary rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-primary/40 rounded-full"></span>
                                                            New Project
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png76"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Vue Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        5+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-success/10 text-success rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-success/40 rounded-full"></span>
                                                            Completed
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png77"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Nextjs Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        5+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-warning/10 text-warning rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-warning/40 rounded-full"></span>
                                                            Inprogress
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        to="#"
                                        className="ti-btn ti-btn-primary py-1 px-2 m-0"
                                    >
                                        View more
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowClient;
