import React, { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { modeofPayment, PaymentStatus } from "../../../common/select2data";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import axios from "axios";
 import Swal from "sweetalert2";


const Index = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    let navigate = useNavigate();
    
    
	const [startDate, setStartDate] = useState(new Date());
	 const [selectedItems, setSelectedItems] = useState([]); // To track selected checkboxes
    const [selectAll, setSelectAll] = useState(false);
	const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/attendances/retrieve_monthly_overtime`);
        setAllData(res.data.attendance);
      } catch (error) {
        throw new Error('Failed to fetch annual leave: ' + error.message);
      }
    };

    fetchAttendance();
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

	
	// function handleRemove(id) {
	// 	const newList = allData.filter((idx) => idx.id !== id);
	// 	setAllData(newList);
	//   }

	  function dec(el) {
		let unit = el.currentTarget.parentElement.querySelector("input").value;
	
		if (Number(unit) === 0) {
			return false;
		} else {
			el.currentTarget.parentElement.querySelector("input").value--;
		}
	}
	function inc(el) {
		el.currentTarget.parentElement.querySelector("input").value++;
    }
    
    // starting block for handling upload 
    


    const [isLoading, setIsLoading] = useState(false);  
    
    const [formData, setFormData] = useState({
       attendance_attachment: null,
        error_list: [],

    });

  const handleFilesInputChange = (fieldName, files) => {
    // Assuming single file upload, you can access files[0]
    setFormData((prevData) => ({
        ...prevData,
        [fieldName]: files[0],  // Only store the first file if you're uploading one file
    }));
};
//by uploading overtime
const SaveOvertimeUpload = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    // Append the file to FormData
    if (formData.overtime_attachment) {
        dataToSend.append('overtime_attachment', formData.overtime_attachment);
    }

    try {
        const resp = await axios.post(`${apiBaseUrl}/attendances/create_overtime`, dataToSend, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

      if (resp.data.validator_err) {
        const validationErrors = resp.data.validator_err;
        setFormData((prevData) => ({
          ...prevData,
          error_list: validationErrors,
        }));

        const formattedErrors = Object.keys(validationErrors)
          .map((field) => `${validationErrors[field].join(", ")}`)
          .join("\n");

        swal({
          title: "Failed",
          text: formattedErrors,
          icon: "error",
          button: "OK",
        });
      } else if (resp.data.status === 404 || resp.data.status === 500) {
        swal({
          title: "Failed",
          text: resp.data.message,
          icon: "warning",
          button: "OK",
        });
      } else if (resp.data.status === 200) {
        swal({
          title: "Success",
          text: resp.data.message,
          icon: "success",
          button: "OK",
          closeOnClickOutside: false,
        })
        //     .then(() => {
        //   navigate("/leaves/annual/");
        // });
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    } finally {
      setIsLoading(false); // Ensure loading is stopped after try-catch
    }
	};
//normal creation of overtime	
// const SaveOvertimeRequest = async (e) => {
//     e.preventDefault();

//     const dataToSend = new FormData();
//     // Append the file to FormData
// 	if (formData.attendance_attachment) {
		
//         dataToSend.append('attendance_attachment', formData.attendance_attachment);
//     }

//     try {
//         const resp = await axios.post(`${apiBaseUrl}/attendances/create_overtime`, dataToSend, {
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             }
//         });

//       if (resp.data.validator_err) {
//         const validationErrors = resp.data.validator_err;
//         setFormData((prevData) => ({
//           ...prevData,
//           error_list: validationErrors,
//         }));

//         const formattedErrors = Object.keys(validationErrors)
//           .map((field) => `${validationErrors[field].join(", ")}`)
//           .join("\n");

//         swal({
//           title: "Failed",
//           text: formattedErrors,
//           icon: "error",
//           button: "OK",
//         });
//       } else if (resp.data.status === 404 || resp.data.status === 500) {
//         swal({
//           title: "Failed",
//           text: resp.data.message,
//           icon: "warning",
//           button: "OK",
//         });
//       } else if (resp.data.status === 200) {
//         swal({
//           title: "Success",
//           text: resp.data.message,
//           icon: "success",
//           button: "OK",
//           closeOnClickOutside: false,
//         })
//         //     .then(() => {
//         //   navigate("/leaves/annual/");
//         // });
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error.message);
//     } finally {
//       setIsLoading(false); // Ensure loading is stopped after try-catch
//     }
//   };	
	
const handleCheckboxChange = (id) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(id)) {
                return prevSelectedItems.filter(item => item !== id); // Unselect item
            } else {
                return [...prevSelectedItems, id]; // Select item
            }
        });
    };

    // Handle select/deselect all checkboxes
    const handleMasterCheckboxChange = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        if (checked) {
            setSelectedItems(allData.map(item => item.id)); // Select all data
        } else {
            setSelectedItems([]); // Deselect all data
        }
    };
	const handleRemove = (id) => {
        const newList = allData.filter((idx) => idx.id !== id);
        setAllData(newList);
    };
   const isAnySelected = selectedItems.length > 0;
    
    
	  const [searchQuery, setSearchQuery] = useState(''); // For employee number search

  // Function to fetch employee data based on the employee number (searchQuery)
  const getEmployeeDetail = async (id) => {
    try {
      const res = await axios.get(`${apiBaseUrl}/leaves/retrieve_employee_detail/${id}`);
      const updatedFormData = {
		  ...formData,
		  ...formOverTimeData,
        ...res.data.employee, // Assuming the response has 'employee' object
      };
		setFormData(updatedFormData);
		setFormOverTimeData(updatedFormData);
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

  // Handle changes in form input
  
    
     const [step, setStep] = useState(1);
    const [formOverTimeData, setFormOverTimeData] = useState({
        employee_id: '',
        employer_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        start_date: '', 
        end_date: '',
        remarks: '',
        error_list: [],
    });
    
    

    const handleFileInputChange = (fieldName, files) => {
        // const file = files[0]; // Assuming single file selection, update accordingly for multiple files
        setFormOverTimeData((prevData) => ({
            ...prevData,
            [fieldName]: files,
        }));
    };


    const handleInputOvertimeChange = (stepName, value) => {
        if (value instanceof File) {
            // Handle file input change
            handleFileInputChange(stepName, [value]);
        } else {
            // Handle other input types
            setFormOverTimeData((prevData) => ({
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

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const DataToSend = {
            employee_id: formOverTimeData.employee_id,
            employer_id: formOverTimeData.employer_id,
            firstname: formOverTimeData.firstname,
            middlename: formOverTimeData.middlename,
            lastname: formOverTimeData.lastname,
            overtime_date: formOverTimeData.overtime_date,
            ot_hours: formOverTimeData.ot_hours,
            remarks: formOverTimeData.remarks
           
            
        };
         setIsLoading(true);
    try {
      const resp = await axios.post(`${apiBaseUrl}/attendances/create_overtime_request`, DataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (resp.data.validator_err) {
        const validationErrors = resp.data.validator_err;
        setFormOverTimeData((prevData) => ({
          ...prevData,
          error_list: validationErrors,
        }));

        const formattedErrors = Object.keys(validationErrors)
          .map((field) => `${validationErrors[field].join(", ")}`)
          .join("\n");

        swal({
          title: "Failed",
          text: formattedErrors,
          icon: "error",
          button: "OK",
        });
      } else if (resp.data.status === 404 || resp.data.status === 500) {
        swal({
          title: "Failed",
          text: resp.data.message,
          icon: "warning",
          button: "OK",
        });
      } else if (resp.data.status === 200) {
        swal({
          title: "Success",
          text: resp.data.message,
          icon: "success",
          button: "OK",
          closeOnClickOutside: false,
		})
		// 	.then(() => {
        //   navigate("/leaves/annual/");
        // });
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    } finally {
      setIsLoading(false); // Ensure loading is stopped after try-catch
    }
  };
	
	
	
    
	return (
		<div>
            {/* <PageHeader currentpage="Invoice " activepage="Pages" mainpage="Invoice " /> */}
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
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}employers/registrations/registrations`}>
						Attendance Management
						{/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
					</a>
					</li>
				</ol>
				</div>
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-12">
					<div className="box">
						<div className="box-header lg:flex lg:justify-between">
							<h5 className="box-title my-auto">Overtime List</h5>
							<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary" data-hs-overlay="#hs-basic-modal"><i className="ti ti-cloud-upload"></i> Upload Overtime</button>&nbsp;&nbsp;
							<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary" data-hs-overlay="#hs-basic-modal_create"><i className="ri ri-add-line"></i> Create Overtime</button>

							<div id="hs-basic-modal" className="hs-overlay ti-modal hidden">
								<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out sm:!max-w-6xl">
									<div className="ti-modal-content">
										<div className="ti-modal-header">
											<h3 className="ti-modal-title invoice-title font-bold text-lg"> Upload Employee List <span style={{ color: "red" }}> *</span></h3>
											<button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-basic-modal">
												<span className="sr-only">Close</span>
												<svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" /> </svg>
											</button>
										</div>
										<div className="ti-modal-body p-6">
										<div className="grid lg:grid-cols-2 gap-6">
											<div className="space-y-6">										
																			
                                      
                                            <input type="file" accept=".xlsx" name="overtime_attachment" id="small-file-input"
                                                onChange={(e) => handleFilesInputChange('overtime_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
												<span className="text-danger">{formData.error_list.overtime_attachment}</span>
                                                </div>
												
											</div>
										</div> 
										<div className="ti-modal-footer sm:flex !block space-y-2 text-end">
											<Link className="ti-btn ti-btn-primary" to="#" onClick={SaveOvertimeUpload}>
												<i className="ti ti-cloud-upload"></i>Upload 
											</Link>
											
											<Link className="ti-btn ti-btn-danger " to="#">
												<i className="ti ti-pills"></i> Close
											</Link>
										</div>
									</div>
								</div>
							</div>

							<div id="hs-basic-modal_create" className="hs-overlay ti-modal hidden">
								<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out sm:!max-w-6xl">
									<div className="ti-modal-content">
										<div className="ti-modal-header">
											<h3 className="ti-modal-title invoice-title font-bold text-lg"> Create Individual Overtime </h3>
											<button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-basic-modal">
												<span className="sr-only">Close</span>
												<svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" /> </svg>
											</button>
										</div>
										<div className="ti-modal-body p-6">							
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
                                        className="p-2 pr-10 ti-form-input"
                                        placeholder="Search by Employee Number"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                                    />
                                </div>
                            </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">FirstName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="firstname" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Employee firstname"  readOnly value={formOverTimeData.firstname}
                                        onChange={(e) => handleInputOvertimeChange('firstname', e.target.value)} required />
                                    {/* <span className="text-danger">{formOverTimeData.error_list.firstname}</span> */}
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">MiddleName </label>
                                    <input type="text" name="middlename" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" placeholder="Middlename" value={formOverTimeData.middlename} readOnly
                                        onChange={(e) => handleInputOvertimeChange('middlename', e.target.value)} required />
                                    <span className="text-danger">{formOverTimeData.error_list.middlename}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">LastName <span style={{ color: "red" }}> *</span></label>
                                    <input 
                                        type="text" 
                                        name="lastname" 
                                        className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" 
                                        value={formOverTimeData.lastname} 
                                        readOnly 
                                        onChange={(e) => handleInputOvertimeChange('lastname', e.target.value)} 
                                        placeholder="Employee Lastname" 
                                        required 
                                    />
                                </div>

                                 <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Employer <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="employer" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" value={formOverTimeData.employer} readOnly onChange={(e) => handleInputOvertimeChange('employer', e.target.value)} placeholder="Employer" required />
                                    {/* <span className="text-danger">{formOverTimeData.error_list.employer}</span> */}
                                </div>
                                       <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Department <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="departments" className="my-auto ti-form-input text-black bg-gray-100 border-red-500 text-md" value={formOverTimeData.departments}
                                        onChange={(e) => handleInputOvertimeChange('departments', e.target.value)} placeholder="Present address" readOnly />

                                </div>                 
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Ot Hours <span style={{ color: "red" }}> *</span></label>
                                    <input type="number" min={1} name="ot_hours" className="my-auto ti-form-input text-black  border-red-500 text-md" value={formOverTimeData.ot_hours}
                                        onChange={(e) => handleInputOvertimeChange('ot_hours', e.target.value)} placeholder="Requesting hours"  />

                                </div>
                               <div className="space-y-2">
                                <label className="ti-form-label mb-0 font-bold text-lg">Date <span style={{ color: "red" }}> *</span></label>
                                <div className="flex rounded-sm overflow-auto">
                                    <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                        <span className="text-sm text-gray-500 dark:text-white/70">
                                            <i className="ri ri-calendar-line"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="date" 
                                        name="overtime_date" 
                                        className="my-auto ti-form-input text-black text-lg"
                                        value={new Date(formOverTimeData.overtime_date).toLocaleDateString('en-CA')} // Format the date
                                        min={new Date().toISOString().split('T')[0]} // Set today's date as the minimum
                                        onChange={(e) => handleInputOvertimeChange('overtime_date', e.target.value)} 
                                        required
                                    />
                                    <span className="text-danger">{formOverTimeData.error_list.overtime_date}</span>
                                </div>
                            </div>

                                    <div className="space-y-3">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Admin Remarks</label>
                                    <textarea 
                                        type="text" 
                                        name="remarks" 
                                        className="my-auto ti-form-input text-black border-red-500 text-md" 
                                        value={formOverTimeData.remarks} 
                                        onChange={(e) => handleInputOvertimeChange('remarks', e.target.value)} 
                                        placeholder="Write Comment if any" 
                                    />
                                </div>                                
                                 
                            </div>
                    
                        <br />
                        <div>
               	
											</div>
										</div> 
										<div className="ti-modal-footer sm:flex !block space-y-2 text-end">
											
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
                                    <i className="ti ti-corner-up-right-double"></i>
                                    Submit 
                                    </>
                                )}
                                </button>
											
											<Link className="ti-btn ti-btn-danger " to="#">
												<i className="ti ti-pills"></i> Close
											</Link>
										</div>
									</div>
								</div>
							</div>
							
						</div>
						<div className="box-body">
							<div className="xl:flex xl:justify-between space-y-3 xl:space-y-0">
								<div className="sm:flex sm:space-x-3 space-y-3 sm:space-y-0 rtl:space-x-reverse">
									<div className="relative max-w-xs">
										<label htmlFor="hs-table-search" className="sr-only">Search</label>
										<input type="text" name="hs-table-search" id="hs-table-search"
											className="px-3 py-2 ltr:pr-10 rtl:pl-10 ti-form-input" placeholder="Search for items" />
										<div
											className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
											<i className="ri-search-line text-gray-500 dark:text-white/70"></i>
										</div>
									</div>
									<button aria-label="button" type="button"
										className="ltr:mr-1 rtl:ml-1 ti-btn px-3 py-2 ti-btn-outline border-gray-200 text-gray-500 dark:text-white/70 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10 m-0">
										<i className="ri-refresh-line leading-none text-lg "></i>
									</button>
								</div>
								<div className="sm:space-x-3 sm:flex space-y-3 sm:space-y-0 rtl:space-x-reverse">
								
									<div className="hs-dropdown ti-dropdown">
										<button 
                                id="hs-dropdown-transform-style" 
                                type="button" 
                                className={`px-3 py-2 hs-dropdown-toggle ti-dropdown-toggle bg-green-300 ${isAnySelected ? '' : 'invisible'}`}>
                                <i className="ti ti-send"></i>
                                Initiate Workflow
                            </button>
									</div>
								</div>
							</div>
							<div className="mt-5 table-bordered rounded-sm ti-custom-table-head overflow-scroll xxl:overflow-hidden">
								<table className="ti-custom-table ti-custom-table-head edit-table whitespace-nowrap text-center">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr className="cart-box">
											<th scope="col" className="dark:text-white/70">
												<div className="flex leading-[0] justify-center">
												<input 
                                            type="checkbox"
                                            className="border-gray-500 ti-form-checkbox mt-0.5 check-all"
                                            id="hs-default-checkbox"
                                            checked={selectAll}
                                            onChange={handleMasterCheckboxChange} // Handle master checkbox
                                        />
												</div>
											</th>
											<th scope="col" className="dark:text-white/70">S/N</th>
											<th scope="col" className="dark:text-white/70">Employee Id</th>
											<th scope="col" className="dark:text-white/70">Employee Name</th>
                                            <th scope="col" className="dark:text-white/70">Ot Hour</th>
                                            <th scope="col" className="dark:text-white/70">Date</th>
										 <th scope="col" className="dark:text-white/70">Status</th>
											<th scope="col" className="dark:text-white/70">Action</th>
										</tr>
									</thead>
									<tbody>
										{allData.map((attend, index)=>(
										<tr className="invoice-list" key={Math.random()}>
											<td className="">
												<div className="flex items-center h-5 invoice-checkbox justify-center">
												 <input 
                                                id={`invoice-check-${attend.id}`} 
                                                type="checkbox"
                                                className="border-gray-500 ti-form-checkbox"
                                                checked={selectedItems.includes(attend.id)}
                                                onChange={() => handleCheckboxChange(attend.id)} // Handle individual checkbox
                                            />
												</div>
											</td>
											<td key={index}>{ index + 1}</td>
											<td>
												{attend.employee_id}
											</td>
											<td>{attend.employee_name}</td>
											<td>{attend.ot_hours}</td>
											<td>{attend.overtime_date}</td>
											<td>{attend.status}</td>
											<td className="font-medium space-x-2 rtl:space-x-reverse">
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#"
														className="m-0 hs-tooltip-toggle relative  w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary">
														<i className="ti ti-send"></i>
														<span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
															Send
														</span>
													</Link>
												</div>
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#" onClick="changeTheInfo('Edit Invoice','Socrates Itumay','P.O. Box 283 8562 Fusce Rd., 20620','socratesitumany@abc.com','#IN5252155','25-10-2022','25-11-2022')"
														data-hs-overlay="#invoice-modal" className="invoice-edit m-0 hs-tooltip-toggle relative  w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary">
														<i className="ti ti-pencil"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
															Edit
														</span>
													</Link>
												</div>
												<div className="hs-tooltip ti-main-tooltip">
													<Link to="#" onClick={() => handleRemove(idx.id)}
														className="invoice-btn m-0 hs-tooltip-toggle relative  w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger">
														<i className="ti ti-trash"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
															Delete
														</span>
													</Link>
												</div>
											</td>
										</tr>
										))}
									</tbody>
								</table>
							</div>
							<nav className="flex justify-end items-center space-x-2 rtl:space-x-reverse mt-5">
								<Link className="w-10 h-10 bg-white dark:bg-black/20 text-gray-500 hover:bg-primary hover:text-white p-2 inline-flex justify-center text-sm font-medium items-center gap-2 rounded-full" to="#">
									<span aria-hidden="true">«</span>
									<span className="sr-only">Previous</span>
								</Link>
								<Link className="w-10 h-10 bg-primary text-white p-2 inline-flex items-center justify-center text-sm font-medium rounded-full" to="#" aria-current="page">1</Link>
								<Link className="w-10 h-10 bg-white dark:bg-black/20 text-gray-500 hover:bg-primary hover:text-white p-2 inline-flex justify-center items-center text-sm font-medium rounded-full" to="#">2</Link>
								<Link className="w-10 h-10 bg-white dark:bg-black/20 text-gray-500 hover:bg-primary hover:text-white p-2 inline-flex justify-center items-center text-sm font-medium rounded-full" to="#">3</Link>
								<Link className="w-10 h-10 bg-white dark:bg-black/20 text-gray-500 hover:bg-primary hover:text-white p-2 inline-flex justify-center text-sm font-medium items-center gap-2 rounded-full" to="#">
									<span className="sr-only">Next</span>
									<span aria-hidden="true">»</span>
								</Link>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Index;