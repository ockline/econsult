import React, { useState, useEffect } from 'react'
// import PageHeader from '../../../layout/layoutsection/pageHeader/pageHeader';
// import DatePicker from 'react-datepicker';
import { BankData, BankBranchData, LocationData, RegionData, DistrictData, AllowanceData, ShiftData,WardData,CostCenterSelect} from '/src/common/select2data';
import Creatable from "react-select/creatable";
import Swal from "sweetalert2";
import Select, { components } from 'react-select';
import { MultiSelect } from "react-multi-select-component";
import { Link, useNavigate } from "react-router-dom";
// import { MultiSelect } from "react-multi-select-component";
import 'react-form-wizard-component/dist/style.css';
import axios from "axios";
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';


// Update the Option component to handle clicks correctly
const Option = props => {
    const { isSelected, label, innerProps, getValue } = props;
    return (
        <div
            {...innerProps}
            style={{ 
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
            }}
        >
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {}}
                style={{ marginRight: '8px' }}
            />
            <label>{label}</label>
        </div>
    );
};

const MultiValue = props => (
    <components.MultiValue {...props}>
        <span>{props.data.label}</span>
    </components.MultiValue>
);

const AddClient = () => {
    // const [startDate, setStartDate] = useState(new Date());
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
        const [step, setStep] = useState(1);
        const [formData, setFormData] = useState({
            name: '',
            alias: '',
            email: '',
            postal_address: '',
            contact_person: '',
            contact_person_phone: '',
            bank_id: '',
            bank_branch_id: '',
            account_no: '',
            account_name: '',
            tin: '',
            osha: '',
            wcf: '',
            nhif: '',
            nssf: '',
            phone: '',
            telephone: '',
            vrn: '',
            fax: '',
            region_id: '',
            district_id: '',
            location_type_id: '',
            ward_id: '',
            road: '',
            street: '',
            plot_number: '',
            block_number: '',
            cost_center: '',
            allowance_id: [],
            shift_id: '',
            working_days: '',
            working_hours: '',
            tin_doc: null,
            osha_doc: null,
            wcf_doc: null,
            nhif_doc: null,
            nssf_doc: null,
            vrn_doc: null,
            start_time: '',
            end_time: '',
            error_list: [],
        });
    const handleFileInputChange = (fieldName, files) => {
  setFormData((prevData) => ({
    ...prevData,
    [fieldName]: files, // assuming you only want to handle single file inputs
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

    
const [startDate, setStartDate] = useState(new Date());

    //range data picker

    const [dateRange, setDateRange] = useState([null, null]);
    const [startsDate, endDate] = dateRange;

        // const handleInputChange = (stepName, value) => {
        //     setFormData((prevData) => ({
        //         ...prevData,
        //         [stepName]: value,
        //          error_list: { ...prevData.error_list, [stepName] : null },
        //     }));
        // };

        const handleNextStep = () => {
            setStep((prevStep) => prevStep + 1);
        };

        const handlePreviousStep = () => {
            setStep((prevStep) => prevStep - 1);
        };

        const handleSubmit = async (e) => {
            // Handle form submission logic here
             e.preventDefault();
            console.log('Form submitted:', formData);
            const DataToSend = {
                name: formData?.name,
                alias: formData?.alias,
                email: formData?.email,
                postal_address: formData?.postal_address,
                contact_person: formData?.contact_person,
                contact_person_phone: formData?.contact_person_phone,
                bank_id: formData.bank_id,
                bank_branch_id: formData?.bank_branch_id,
                account_no: formData?.account_no,
                account_name: formData?.account_name,
                tin: formData.tin,
                osha: formData?.osha,
                wcf: formData?.wcf,
                nhif: formData?.nhif,
                nssf: formData?.nssf,
                phone: formData?.phone,
                telephone: formData?.telephone,
                vrn: formData?.vrn,
                fax: formData?.fax,
                region_id: formData?.region_id,
                district_id: formData?.district_id,
                location_type_id: formData?.location_type_id,
                ward_id: formData.ward_id,
                road: formData.road,
                street: formData.street,
                plot_number: formData.plot_number,
                block_number: formData.block_number,
                cost_center: formData?.cost_center,
                allowance_id: formData.allowance_id.join(','),
                shift_id: formData?.shift_id,
                working_days: formData?.working_days,
                working_hours: formData?.working_hours,
                start_time: formData?.start_time,
                end_time: formData?.end_time,
                tin_doc: formData.tin_doc,
                osha_doc: formData.osha_doc,
                wcf_doc: formData.wcf_doc,
                nhif_doc: formData.nhif_doc,
                nssf_doc: formData.nssf_doc,
                vrn_doc: formData.vrn_doc,
                        
            };
            try {
                const resp = await axios.post(`${apiBaseUrl}/employers/add_employer`, DataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                if (resp.data.validator_err) {
                    // Handle validation errors
                    const validationErrors = resp.data.validator_err;

                    // Update component state with validation errors
                    setFormData((prevData) => ({
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
                    title: 'failed',
                    text: formattedErrors,
                    footer: 'Kindly Fill all part with red to Continue '
                    });              
               
                }else if (resp.data.status === 404) {
            swal({
              title: 'failed',
              text: resp.data.message,
              icon: 'warning',
              button: 'ok',
            })
            
            } else if (resp.data.status === 500) {
            swal({
              title: 'failed',
              text: resp.data.message,
              icon: 'warning',
              button: 'ok',
            })
            // Additional logic or state updates after successful update
          } else if(resp.data.status === 200) {
                    swal({
                        title: 'Success',
                        text: resp.data.message,
                        icon: 'success',
                        button: 'ok',
                    }).then(() => {
                        navigate('/employers/registrations/registrations');
                    });
            }
            }
           catch (error) {
            console.error("Unexpected error:", error.message);
        };
    };
      // Banks  *********************

    const [banks, setBanks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bank = await BankData();
                setBanks(bank);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    
      // Branches  *********************

    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const branche = await BankBranchData();
                setBranches(branche);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    
      // Region  *********************
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const region = await RegionData();
                setRegions(region);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
      // District  *********************

    const [districts, setDistricts] = useState([]);
    console.log('district',districts);
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const district = await DistrictData();
    //             setDistricts(district);
    //         } catch (error) {
    //             console.error("Error:", error.message);
    //         }
    //     };

    //     fetchData();
    // }, []);
    
    
  useEffect(() => {
    const fetchDistricts = async () => {
        if (!selectedRegion) {
            setDistricts([]); // Reset districts if no region is selected
            return;
        }

        try {
            const districtData = await DistrictData(selectedRegion); // Fetch districts based on regionId
            setDistricts(districtData);
        } catch (error) {
            console.error("Error fetching districts:", error.message);
        }
    };

    fetchDistricts();
}, [selectedRegion]);
     
    //postcode & ward
     const [wards, setWards] = useState([]);

    console.log('kata', wards);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ward = await WardData();
                setWards(ward);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    
    // location block
     const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const location = await LocationData();
                setLocations(location);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    
    // Allowances 
     const [allowances, setAllowances] = useState([]);

   
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allowance = await AllowanceData();
                setAllowances(allowance);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    
    //  Shifts
      const [shifts, setShifts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shift = await ShiftData();
                setShifts(shift);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    
   const handleRegionChange = (selectedOption) => {
    const regionId = selectedOption ? selectedOption.value : null;
    console.log("Selected Region ID:", regionId); // Debugging
    setSelectedRegion(regionId);
    handleInputChange(["region_id"], regionId);

    setFormData((prevData) => ({
        ...prevData,
        district_id: null, // Reset district when region changes
    }));
};

// Handle district selection
const handleDistrictChange = (selectedOption) => {
    handleInputChange(["district_id"], selectedOption ? selectedOption.value : null);
};
    
    
    
    
const handleDistrictsChange = (selectedOption) => {
    const districtId = selectedOption ? selectedOption.value : null;
    console.log("Selected District ID:", districtId);

    setSelectedDistrict(districtId);
    handleInputChange("district_id", districtId);

    // Reset ward when district changes
    setFormData((prevData) => ({
        ...prevData,
        ward_id: null, 
    }));
};

// Handle ward selection
const handleWardChange = (selectedOption) => {
    handleInputChange("ward_id", selectedOption ? selectedOption.value : null);
};

// Create animated components
const animatedComponents = makeAnimated();

   const handleAllowanceChange = (selectedOptions) => {
    setFormData({
        ...formData,
        allowance_id: selectedOptions.map(option => option.value) // Extract values
    });
};
    
    
    
    
    // Add these state variables at the top with other useState declarations
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    return (
    <div>
      
        
           <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Employer / Client Registration</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employers/registrations/registrations`}>
						Home
						<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
					</a>
					</li>
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employers/registrations/addclients`}>
						Add New Employer
					</a>
					</li>
				</ol>
				</div>
                <div className= "box">
				<div className= "box-header lg:flex lg:justify-between">
					<h1 className= "box-title my-auto">Add New Employer</h1>
					<Link to={`${import.meta.env.BASE_URL}employers/registrations/registrations`} className= "ti-btn ti-btn-primary m-0 py-2"><i className= "ti ti-arrow-left"></i>Back</Link>
				</div>
                    <div className="box-body">
                        <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                                {step === 1 && (
                                    
                                    <div className="grid lg:grid-cols-3 gap-6">

                                     <div className=" space-y-2">                                       
                                        </div>   
                                        <div className=" space-y-2"> 
                                        <h2 className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
								>
                                    First Page
								<span className="badge py-0.5 px-1.5 bg-black/50 text-white">1</span>
							</h2>                                            
                                        </div> 
                                        <div className=" space-y-2">                                       
                                        </div>                                         
                                         <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md" name="name">Employer Name <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="Employer name" name="name" value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)} required />
                                            <span className="text-danger">{formData.error_list.name}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Alias</label>
                                            <input type="text" className="my-auto ti-form-input" placeholder="alias" name="alias"  value={formData.alias}
                                            onChange={(e) => handleInputChange('alias', e.target.value)}  />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">TIN <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="tin" className="ti-form-input" placeholder="Tin"  value={formData.tin}
                                                onChange={(e) => handleInputChange('tin', e.target.value)} required />
                                              <span className="text-danger">{formData.error_list.tin}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Email Address <span style={{ color: "red" }}> *</span></label>
                                            <input type="email" name="email" className="my-auto ti-form-input" placeholder="yourcompany@site.com"  value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)} required />
                                              <span className="text-danger">{formData.error_list.email}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Contact Person <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="contact_person" className="my-auto ti-form-input" placeholder="Contact person"  value={formData.contact_person}
                                                onChange={(e) => handleInputChange('contact_person', e.target.value)} required />
                                              <span className="text-danger">{formData.error_list.contact_person}</span>
                                        </div> <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Contact Person Phone <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="contact_person_phone" className="my-auto ti-form-input"  value={formData.contact_person_phone}
                                                onChange={(e) => handleInputChange('contact_person_phone', e.target.value)} placeholder="Contact person" required />
                                              <span className="text-danger">{formData.error_list.contact_person_phone}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Bank name <span style={{ color: "red" }}> *</span></label>
                                            {/* <input type="number" name="bank_id"  value={formData.bank_id}
                                            onChange={(e) => handleInputChange('bank_id', e.target.value)} className="ti-form-input" placeholder="Bank name" required /> */}
                                            <Creatable classNamePrefix="react-select" name="bank_id" options={banks} onChange={(selectedOption) => handleInputChange(["bank_id"], selectedOption ? selectedOption.value : null)} value={banks.find((option) => option.value === formData.bank_id)} />
                                              <span className="text-danger">{formData.error_list.bank_id}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Bank branch name <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="bank_branch_id" options={branches} onChange={(selectedOption) => handleInputChange(["bank_branch_id"], selectedOption ? selectedOption.value : null)} value={branches.find((option) => option.value === formData.bank_branch_id)} />
                                              <span className="text-danger">{formData.error_list.bank_branch_id}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Bank Account Number <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="account_no"  value={formData.account_no}
                                                onChange={(e) => handleInputChange('account_no', e.target.value)} className="ti-form-input" placeholder="Bank account" required />
                                              <span className="text-danger">{formData.error_list.account_no}</span>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Bank account name <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="account_name" value={formData.account_name} onChange={(e) => handleInputChange('account_name', e.target.value)} className="ti-form-input" placeholder="Bank account name" required />
                                              <span className="text-danger">{formData.error_list.account_name}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Phone <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="phone" className="my-auto ti-form-input"  value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="Phone" required />
                                              <span className="text-danger">{formData.error_list.phone}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Telephone <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="telephone" className="my-auto ti-form-input"  value={formData.telephone}
                                                onChange={(e) => handleInputChange('telephone', e.target.value)} placeholder="Telephone" required />
                                              <span className="text-danger">{formData.error_list.telephone}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Fax number <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="fax" className="my-auto ti-form-input"  value={formData.fax}
                                                onChange={(e) => handleInputChange('fax', e.target.value)} placeholder="Fax" required />
                                              <span className="text-danger">{formData.error_list.fax}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Postal Address <span style={{ color: "red" }}> *</span></label>
                                            <input type="text" name="postal_address" className="my-auto ti-form-input"  value={formData.postal_address}
                                                onChange={(e) => handleInputChange('postal_address', e.target.value)} placeholder="Postal address" required />
                                              <span className="text-danger">{formData.error_list.postal_address}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">WCF Number <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="wcf" className="my-auto ti-form-input"  value={formData.wcf}
                                                onChange={(e) => handleInputChange('wcf', e.target.value)} placeholder="WCF number" required />
                                              <span className="text-danger">{formData.error_list.wcf}</span>
                                        </div>
                                       
                                       
                                    {/* Rest of Step 1 form fields */}
                                </div>
                                )}
                              
                              
                                
                                {step === 2 && (
                                                                        
                                <div className="grid lg:grid-cols-3 gap-6 second-page none" id="new_page">
                                         <div className=" space-y-2">                                       
                                        </div>   
                                        <div className=" space-y-2"> 
                                        <h2 className="relative py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
								>
                                    Second Page
								<span className="badge py-0.5 px-1.5 bg-black/50 text-white">2</span>
							</h2>                                            
                                        </div> 
                                        <div className=" space-y-2">                                       
                                </div>
                                 <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">NSSF Number <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="nssf" className="my-auto ti-form-input"  value={formData.nssf}
                                                onChange={(e) => handleInputChange('nssf', e.target.value)} placeholder="NSSF number" required />
                                              <span className="text-danger">{formData.error_list.nssf}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">OSHA <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="osha" className="my-auto ti-form-input"  value={formData.osha}
                                                onChange={(e) => handleInputChange('osha', e.target.value)} placeholder="Osha " required />
                                              <span className="text-danger">{formData.error_list.osha}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">NHIF </label>
                                            <input type="number" name="nhif" className="my-auto ti-form-input"  value={formData.nhif}
                                                onChange={(e) => handleInputChange('nhif', e.target.value)} placeholder="NHIF Number" required />
                                              {/* <span className="text-danger">{formData.error_list.nhif}</span> */}
                                        </div>
                                         <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">VRN Number </label>
                                            <input type="number" name="vnr" className="my-auto ti-form-input"  value={formData.vrn}
                                                onChange={(e) => handleInputChange('vrn', e.target.value)} placeholder="VNR number" required />
                                              {/* <span className="text-danger">{formData.error_list.vrn}</span> */}
                                        </div>
                                     
                                
                                
                                <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-md">
                                    Region Name <span style={{ color: "red" }}> *</span>
                                </label>
                                <Creatable
                                    classNamePrefix="react-select"
                                    name="region_id"
                                    options={regions}
                                    onChange={handleRegionChange}
                                    value={regions.find((option) => option.value === formData.region_id)}
                                />
                                <span className="text-danger">{formData.error_list.region_id}</span>
                            </div>

                                                    {/* District Dropdown */}
                         <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-md">
                                    District Name <span style={{ color: "red" }}> *</span>
                                </label>
                        <Creatable
                        classNamePrefix="react-select"
                        name="district_id"
                        options={
                            districts.length > 0 
                                ? districts[0].options.filter(district => district.regionId === selectedRegion) 
                                : []
                        }
                        onChange={handleDistrictChange}
                        value={districts.length > 0 ? districts[0].options.find((option) => option.value === formData.district_id) : null}
                        isDisabled={!selectedRegion}
                    />
                    </div>
                                
                                       
                           <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-md">Ward Name</label>

                                <Creatable
                                    classNamePrefix="react-select"
                                    name="ward_id"
                                    options={
                                        wards.length > 0 
                                            ? wards[0].options.filter(ward => ward.districtId === formData.district_id) 
                                            : []
                                    }
                                    onChange={handleWardChange}
                                    value={wards.length > 0 
                                        ? wards[0].options.find(option => option.value === formData.ward_id) 
                                        : null
                                    }
                                    isDisabled={!formData.district_id}
                                />
                            </div>

                                
                                
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Location Type  <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="location_type_id" options={locations} onChange={(selectedOption) => handleInputChange(["location_type_id"], selectedOption ? selectedOption.value : null)} value={locations.find((option) => option.value === formData.location_type_id)} />
                                              <span className="text-danger">{formData.error_list.location_type_id}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Road </label>
                                            <input type="text" name="road" className="my-auto ti-form-input" value={formData.road}
                                            onChange={(e) => handleInputChange('road', e.target.value)} placeholder="Road" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Street</label>
                                            <input type="text" name="street" className="my-auto ti-form-input" value={formData.street}
                                            onChange={(e) => handleInputChange('street', e.target.value)} placeholder="Street" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Plot Number </label>
                                            <input type="text" name="plot_number" className="my-auto ti-form-input" value={formData.plot_number}
                                            onChange={(e) => handleInputChange('plot_number', e.target.value)} placeholder="Plot number" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Block number </label>
                                            <input type="number" name="block_number " className="ti-form-input" value={formData.block_number}
                                            onChange={(e) => handleInputChange('block_number', e.target.value)} placeholder="Block Number" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Cost centre /packages  <span style={{ color: "red" }}> *</span></label>
                                               <Select classNamePrefix='react-select' options={CostCenterSelect}  onChange={(selectedOption) => handleInputChange(["cost_center"], selectedOption ? selectedOption.value : null)} value={CostCenterSelect.find((option) => option.value === formData.cost_center)} placeholder='Open this select menu' />
                                              <span className="text-danger">{formData.error_list.cost_center}</span>
                                        </div>
                                        
                                      
                                       

                                    <div className="space-y-2 multiple-select">
                                        <label className="ti-form-select-label mt-2">Allowances<span style={{ color: "red" }}> *</span></label>
                                        <MultiSelect
                                            classNamePrefix="react-select"
                                            name="allowance_id"
                                            options={allowances.length > 0 ? allowances[0].options : []} // Ensure it's not empty
                                            value={(allowances.length > 0 ? allowances[0].options : []).filter(option =>
                                                formData.allowance_id.includes(option.value)
                                            )}
                                            onChange={handleAllowanceChange}
                                            labelledBy="Select"
                                    />
                                    <span className="text-danger">{formData.error_list.shift_id}</span>
                                    </div>
                                
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Shift <span style={{ color: "red" }}> *</span></label>
                                            <Creatable classNamePrefix="react-select" name="shift_id" options={shifts} onChange={(selectedOption) => handleInputChange(["shift_id"], selectedOption ? selectedOption.value : null)} value={shifts.find((option) => option.value === formData.shift_id)} />
                                              <span className="text-danger">{formData.error_list.shift_id}</span>
                                        </div>
                                       
    
                                    {/* Rest of Step 2 form fields */}
                                </div>
                            )}
                        
                            {step === 3 && (
                                    <div className="grid lg:grid-cols-3 gap-6 second-page none" id="new_page">
                                    <div className=" space-y-2">                                       
                                        </div>   
                                        <div className=" space-y-2"> 
                                        <h2 className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
								>
                                    Last Page
								<span className="badge py-0.5 px-1.5 bg-black/50 text-white">3</span>
							</h2>                                            
                                        </div> 
                                        <div className=" space-y-2">                                       
                                        </div> <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Working hours  <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="working_hours" className="my-auto ti-form-input" value={formData.working_hours}
                                                onChange={(e) => handleInputChange('working_hours', e.target.value)} placeholder="Working hour" required />
                                              <span className="text-danger">{formData.error_list.working_hours}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="ti-form-label mb-0 font-bold text-md">Working Days <span style={{ color: "red" }}> *</span></label>
                                            <input type="number" name="working_days" className="my-auto ti-form-input" value={formData.working_days}
                                                onChange={(e) => handleInputChange('working_days', e.target.value)} placeholder="Working Days" required />
                                              <span className="text-danger">{formData.error_list.working_days}</span>
                                </div>
 

                                  <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-md">Reporting Time <span style={{ color: "red" }}> *</span></label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex-1">
                                            <DatePicker
                                                selected={startTime}
                                                onChange={(time) => {
                                                    setStartTime(time);
                                                    handleInputChange('start_time', time);
                                                }}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                                className="ti-form-input pl-10 w-full"
                                                placeholderText="Start Time"
                                            />
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <i className="ti ti-clock text-gray-400"></i>
                                            </div>
                                        </div>
                                        
                                        <span className="text-gray-500">to</span>
                                        
                                        <div className="relative flex-1">
                                            <DatePicker
                                                selected={endTime}
                                                onChange={(time) => {
                                                    setEndTime(time);
                                                    handleInputChange('end_time', time);
                                                }}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                                className="ti-form-input pl-10 w-full"
                                                placeholderText="End Time"
                                            />
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <i className="ti ti-clock text-gray-400"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-danger">{formData.error_list.start_time || formData.error_list.end_time}</span>
                                </div>
                                
                                <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-md">TIN Attachment  <span style={{ color: "red" }}> *</span></label>
                                    <input type="file" name="tin_doc" id="small-file-input" 
                                        onChange={(e) => handleFileInputChange('tin_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                    <span className="text-danger">{formData.error_list.tin_doc}</span>
                                    {/* value={formData.tin_doc} accept=".pdf"  onChange={(e) => handleInputChange('tin_doc', e.target.files[0])}  */}
                                </div>
                                <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-md">NSSF Attachment <span style={{ color: "red" }}> *</span></label>
                                    <input type="file" name="nssf_doc" id="small-file-input"
                                    onChange={(e) => handleFileInputChange('nssf_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                  <span className="text-danger">{formData.error_list.nssf_doc}</span>
                                </div>
                                <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-md">OSHA Attachment <span style={{ color: "red" }}> *</span></label>
                                    <input type="file" name="osha_doc" id="small-file-input" 
                                    onChange={(e) => handleFileInputChange('osha_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                  <span className="text-danger">{formData.error_list.osha_doc}</span>
                                </div>
                                <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-md">WCF Attachment </label>
                                    <input type="file" name="wcf_doc" id="small-file-input" 
                                    onChange={(e) => handleFileInputChange('wcf_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                  {/* <span className="text-danger">{formData.error_list.wcf_doc}</span> */}
                                </div>
                                <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-md">NHIF Attachment </label>
                                    <input type="file" name="nhif_doc" id="small-file-input" 
                                    onChange={(e) => handleFileInputChange('nhif_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                  {/* <span className="text-danger">{formData.error_list.nhif_doc}</span> */}
                                </div>
                                <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-md">VRN Attachment </label>
                                    <input type="file" name="vrn_doc" id="small-file-input" 
                                    onChange={(e) => handleFileInputChange('vrn_doc', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
                                  {/* <span className="text-danger">{formData.error_list.vrn_doc}</span> */}
                            </div>
                             

                                {/* Rest of Step 3 form fields */}
                            </div>
                            
                                )}
                              <br/>
                                <div>
                                    {step > 1 && step < 3 && (
                             <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
                             <i className="ti ti-arrow-narrow-left"></i>Previous
                            </button>
                            )}
                            {step > 2 && (
                                <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
                                    <i className="ti ti-arrow-narrow-left"></i>Previous
                                </button>
                            )}

                            {step < 3 && (
                                <button type="button" onClick={handleNextStep} className="ti-btn ti-btn-primary first_page justify-center">
                                    <i className="ti ti-arrow-narrow-right"></i>Next
                                </button>
                            )}

                            {step === 3 && (
                               <div className="flex justify-end">
                                <button type="button" onClick={handleSubmit} className="ti-btn ti-btn-success  justify-right">
                                    <i className="ti ti-send"></i>
                                     {isLoading ? (
                <>
                    <span className="ti-spinner text-white" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span><i className="ti ti-send"></i>
                    </span>
                    Loading...
                </>
            ) : (
                'Submit'
            )}
                                </button>
                              </div>  
                                
        //          <button
        //     type="submit" onClick={handleSubmit}
        //     className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ti-btn ti-btn-success  justify-center"
        //     disabled={isLoading} // Disable the button when loading
        // >
        //     {isLoading ? (
        //         <>
        //             <span className="ti-spinner text-white" role="status" aria-label="loading">
        //                 <span className="sr-only">Loading...</span><i className="ti ti-send"></i>
        //             </span>
        //             Loading...
        //         </>
        //     ) : (
        //         'Submit'
        //     )}
        //           </button>
                            )}
                        </div>
                        </form>
                    </div>
                
        </div>
    </div>
);

    
  
    };
export default AddClient;