import React, { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { modeofPayment, PaymentStatus } from "../../../common/select2data";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import axios from "axios";
 import Swal from "sweetalert2";


const NormalAttendance = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    let navigate = useNavigate();
    
    
    const [startDate, setStartDate] = useState(new Date());
	const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/attendances/retrieve_monthly_attendance`);
        setAllData(res.data.attendance);
      } catch (error) {
        throw new Error('Failed to fetch annual leave: ' + error.message);
      }
    };

    fetchAttendance();
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

	
	function handleRemove(id) {
		const newList = allData.filter((idx) => idx.id !== id);
		setAllData(newList);
	  }

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

const SaveNormalAttendance = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    // Append the file to FormData
    if (formData.attendance_attachment) {
        dataToSend.append('attendance_attachment', formData.attendance_attachment);
    }

    try {
        const resp = await axios.post(`${apiBaseUrl}/attendances/create_attendance`, dataToSend, {
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
							<h5 className="box-title my-auto">Attendance List</h5>
							<button type="button" className="hs-dropdown-toggle ti-btn ti-btn-primary" data-hs-overlay="#hs-basic-modal"><i className="ri ri-add-line"></i> Create Attendance</button>

							<div id="hs-basic-modal" className="hs-overlay ti-modal hidden">
								<div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out sm:!max-w-6xl">
									<div className="ti-modal-content">
										<div className="ti-modal-header">
											<h3 className="ti-modal-title invoice-title font-bold text-lg"> Upload Attendance  Attachment <span style={{ color: "red" }}> *</span></h3>
											<button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#hs-basic-modal">
												<span className="sr-only">Close</span>
												<svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" /> </svg>
											</button>
										</div>
										<div className="ti-modal-body p-6">
										<div className="grid lg:grid-cols-2 gap-6">
											<div className="space-y-6">										
																			
                                      
                                            <input type="file" accept=".xlsx" name="attendance_attachment" id="small-file-input"
                                                onChange={(e) => handleFilesInputChange('attendance_attachment', e.target.files)} className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 dark:file:bg-black/20 dark:file:text-white/70" />
												<span className="text-danger">{formData.error_list.attendance_attachment}</span>
                                                </div>
												
											</div>
										</div> 
										<div className="ti-modal-footer sm:flex !block space-y-2 text-end">
											<Link className="ti-btn ti-btn-primary" to="#" onClick={SaveNormalAttendance}>
												<i className="ti ti-cloud-upload"></i>Upload 
											</Link>
											
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
									<div className="inline-flex">
										<div
											className="px-4 py-2 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
											<span className="text-sm text-gray-500 dark:text-white/70"><i
												className="ri ri-calendar-line"></i></span>
										</div>

										
										<DatePicker className="px-3 py-2 ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10 flatpickr-input" showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
									</div>
									<div className="hs-dropdown ti-dropdown">
										<button id="hs-dropdown-transform-style" type="button"
											className="px-3 py-2 hs-dropdown-toggle ti-dropdown-toggle">
											All Invoices
											<svg className="hs-dropdown-open:rotate-180 ti-dropdown-caret" width="16"
												height="16" viewBox="0 0 16 16" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
													stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
											</svg>
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
													<input type="checkbox"
														className="border-gray-500 ti-form-checkbox mt-0.5 check-all"
														id="hs-default-checkbox" />
													<label htmlFor="hs-default-checkbox"
														className="text-sm text-gray-500 dark:text-white/70"></label>
												</div>
											</th>
											<th scope="col" className="dark:text-white/70">S/N</th>
											<th scope="col" className="dark:text-white/70">Employee Id</th>
											<th scope="col" className="dark:text-white/70">Employee Name</th>
                                            <th scope="col" className="dark:text-white/70">Time In</th>
                                            <th scope="col" className="dark:text-white/70">Time Out</th>
                                            <th scope="col" className="dark:text-white/70">Date</th>
																					
											<th scope="col" className="dark:text-white/70">Action</th>
										</tr>
									</thead>
									<tbody>
										{allData.map((attend, index)=>(
										<tr className="invoice-list" key={Math.random()}>
											<td className="">
												<div className="flex items-center h-5 invoice-checkbox justify-center">
													<input id="invoice-check-1" type="checkbox"
														className="border-gray-500 ti-form-checkbox" />
													<label htmlFor="invoice-check-1" className="sr-only">Checkbox</label>
												</div>
											</td>
											<td key={index}>{ index + 1}</td>
											<td>
												{attend.employee_id}
											</td>
											<td>{attend.employee_name}</td>
											<td>{attend.time_in}</td>
											<td>{attend.time_out}</td>
											<td>{attend.date}</td>
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
export default NormalAttendance;