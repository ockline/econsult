import React, { useState, useEffect } from "react";
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
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState([]);


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


	useEffect(() => {
		if (searchTerm) {
			const filtered = allData.filter(item =>
				item.employee_id.toString().includes(searchTerm)
			);
			setFilteredData(filtered);
		} else {
			setFilteredData(allData); // If searchTerm is empty, show all data
		}
	}, [searchTerm, allData]);

	// Handle search input change
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};


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


	const [startingDate, setStartingDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	
// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formattedStartingDate = startingDate ? startingDate.toISOString().split('T')[0] : null;
//     const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

//     const url = `${apiBaseUrl}/attendances/generate_monthly_attendance?startingDate=${formattedStartingDate}&endDate=${formattedEndDate}`;

//     try {
//         const resp = await axios.get(url, {
//             responseType: 'blob', // Important for downloading the file
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });

//         if (resp.data.status === 404 || resp.data.status === 500) {
//             swal({
//                 title: "Failed",
//                 text: resp.data.message,
//                 icon: "warning",
//                 button: "OK",
//             });
//         } else if (resp.status === 200) {
//             // Handle Excel file download
//             const link = document.createElement('a');
//             const blob = new Blob([resp.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//             link.href = URL.createObjectURL(blob);
//             link.download = 'attendance_details.csv'; // File name
//             link.click();

//             swal({
//                 title: "Success",
//                 text: "The Excel file has been generated and downloaded.",
//                 icon: "success",
//                 button: "OK",
//                 closeOnClickOutside: false,
//             });
//         }
//     } catch (error) {
//         console.error("Unexpected error:", error.message);
//     } finally {
//         setIsLoading(false); // Ensure loading is stopped after try-catch
//     }
// };

	const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartingDate = startingDate ? startingDate.toISOString().split('T')[0] : null;
    const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

    const url = `${apiBaseUrl}/attendances/generate_monthly_attendance?startingDate=${formattedStartingDate}&endDate=${formattedEndDate}`;

    try {
        const resp = await axios.get(url, {
            responseType: 'json', // Ensure the response is parsed as JSON
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (resp.data.status === 404 || resp.data.status === 500) {
            swal({
                title: "Failed",
                text: resp.data.message,
                icon: "warning",
                button: "OK",
            });
        } else if (resp.data.status === 200) {
            const data = resp.data.attendance ? [resp.data.attendance] : []; // Ensure `attendance` is in an array

            if (data.length === 0) {
                swal({
                    title: "No Data",
                    text: "No attendance data available for the selected date range.",
                    icon: "warning",
                    button: "OK",
                });
                return;
            }

            // Prepare headers (column names)
            const headers = Object.keys(data[0]); // Get headers from the first object (assumes all objects have the same keys)

            // Prepare CSV content
            const csvContent = [];

            // Add the headers as the first row
            csvContent.push(headers.join(',')); // Join headers with commas

            // Add data rows
            data.forEach(row => {
                const rowData = headers.map(header => row[header] || ''); // Map each row to its corresponding values, handling missing values
                csvContent.push(rowData.join(',')); // Join row data with commas
            });

            // Join the CSV content with new lines
            const csvBlob = new Blob([csvContent.join('\n')], { type: 'text/csv' });

            // Create a temporary link and trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(csvBlob);
            link.download = 'attendance_details.csv'; // File name
            link.click();

            swal({
                title: "Success",
                text: "The CSV file has been generated and downloaded.",
                icon: "success",
                button: "OK",
                closeOnClickOutside: false,
            });
        }
    } catch (error) {
        console.error("Unexpected error:", error.message);
        swal({
            title: "Error",
            text: "An unexpected error occurred while processing the data.",
            icon: "error",
            button: "OK",
        });
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
												<i className="ti ti-cancel">x</i>
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

											<Link type="button" className="ti-btn ti-btn-danger " to="#" data-hs-overlay="#hs-basic-modal">
												<i className="ti ti-pills"></i> Close
											</Link>
											{/* <button type="button" className="hs-dropdown-toggle ti-modal-close-btn ti-btn-danger" data-hs-overlay="#hs-basic-modal">
												<span className="sr-only">Close</span>
											
											</button> */}
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
										<input
											type="text"
											name="hs-table-search"
											id="hs-table-search"
											className="px-3 py-2 ltr:pr-10 rtl:pl-10 ti-form-input"
											placeholder="Search for employee ID"
											value={searchTerm}
											onChange={handleSearchChange}
										/>
										<div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
											<i className="ri-search-line text-gray-500 dark:text-white/70 mb-12"></i>
										</div>
									</div>
								</div>
								<div className="sm:space-x-3 sm:flex space-y-3 sm:space-y-0 rtl:space-x-reverse">
									<div className="box-body">
										<div className="flex rounded-sm overflow-auto">
											<label htmlFor="fromDate" className="text-sm text-gray-500 dark:text-white/70 mr-2">From Date:</label>
											<div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
												<span className="text-sm text-gray-500 dark:text-white/70">
													<i className="ri ri-calendar-line"></i>
												</span>
											</div>
											<DatePicker
												id="fromDate"
												className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
												showIcon
												selected={startingDate}
												onChange={(date) => setStartingDate(date)}
											/>
										</div>
									</div>
									<div className="box-body">
										<div className="flex rounded-sm overflow-auto">
											<label htmlFor="toDate" className="text-sm text-gray-500 dark:text-white/70 mr-2">To Date:</label>
											<div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
												<span className="text-sm text-gray-500 dark:text-white/70">
													<i className="ri ri-calendar-line"></i>
												</span>
											</div>
											<DatePicker
												id="toDate"
												className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
												showIcon
												selected={endDate}
												onChange={(date) => setEndDate(date)}
												maxDate={new Date()}  // Restricting the date picker to today's date
											/>
										</div>
									</div>


									<div className="flex items-center justify-start">
										<button
											type="button"
											className="px-4 py-2 bg-green-700 text-white rounded-md"
											onClick={handleSubmit}
										>
											Export Attendance
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
										{allData.map((attend, index) => (
											<tr className="invoice-list" key={Math.random()}>
												<td className="">
													<div className="flex items-center h-5 invoice-checkbox justify-center">
														<input id="invoice-check-1" type="checkbox"
															className="border-gray-500 ti-form-checkbox" />
														<label htmlFor="invoice-check-1" className="sr-only">Checkbox</label>
													</div>
												</td>
												<td key={index}>{index + 1}</td>
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
														{/* <Link to="{`${import.meta.env.BASE_URL}attendances/normal/edit_normal_attendance/{attend.id}`}" onClick="changeTheInfo('Edit Invoice','Socrates Itumay','P.O. Box 283 8562 Fusce Rd., 20620','socratesitumany@abc.com','#IN5252155','25-10-2022','25-11-2022')"
														data-hs-overlay="#invoice-modal" className="invoice-edit m-0 hs-tooltip-toggle relative  w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary">
														<i className="ti ti-pencil"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
															Edit
														</span>
														</Link> */}
														<button
															aria-label="anchor"
															className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
															onClick={() => {
																navigate(`${import.meta.env.BASE_URL}attendances/normal/edit_normal_attendance/${attend.id}`);
															}}
														>
															<i className="ti ti-pencil"></i>
														</button>
													</div>
													{/* <div className="hs-tooltip ti-main-tooltip">
													<Link to="#" onClick={() => handleRemove(idx.id)}
														className="invoice-btn m-0 hs-tooltip-toggle relative  w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger">
														<i className="ti ti-trash"></i>
														<span
															className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
															role="tooltip">
															Delete
														</span>
													</Link>
												</div> */}
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