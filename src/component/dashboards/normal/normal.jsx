import React, { useEffect, useState} from "react";
import { NormalsOverView, NormalsValue, SocialVisitor } from "../../../common/chartData";
import ALLImages from "../../../common/imagesData";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { connect } from "react-redux"
import { Link } from 'react-router-dom';
import axios from 'axios';

const Normal = () => {
	
	  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;
	
	const [employeeData, setEmployeeDetails] = useState([])
    useEffect(() => {
        axios.get(`${apiBaseUrl}/home/normal/show_employees`)
            .then((res) => {

                setEmployeeDetails(res.data.employees); // Assuming "education_history" is correct
                // console.log("dataa", ' ', res.data.dependant_detail);
            })
            .catch((error) => {
                console.error('Error fetching practical data:', error);
            });
    }, []);

	
	return (
		<div>
			<PageHeader currentpage="Dashboard" activepage="Home" mainpage="Dashboard"/>
			
			
			<div className="grid grid-cols-12 gap-x-6">
				<div className="col-span-12">
					<div className="box">
						<div className="box-header">
							<div className="flex">
								<h5 className="box-title my-auto">Employee To Do List</h5>
								<div className="hs-dropdown ti-dropdown block ltr:ml-auto rtl:mr-auto my-auto">
									<button type="button" className="hs-dropdown-toggle ti-dropdown-toggle rounded-sm p-1 px-3 !border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-200  dark:hover:bg-black/30 dark:border-white/10 dark:hover:border-white/20 dark:focus:ring-white/10 dark:focus:ring-offset-white/10">View All <i className="ti ti-chevron-down"></i></button>
									<div className="hs-dropdown-menu ti-dropdown-menu">
										<Link className="ti-dropdown-item" to="#">Download</Link>
										<Link className="ti-dropdown-item" to="#">Import</Link>
										<Link className="ti-dropdown-item" to="#">Export</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="box-body">
							<div className="table-bordered rounded-sm ti-custom-table-head overflow-auto">
								<table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
									<thead className="bg-gray-50 dark:bg-black/20">
										<tr className="">
											<th scope="col" className="dark:text-white/80">S.no</th>
											<th scope="col" className="dark:text-white/80">Employee No</th>
											<th scope="col" className="dark:text-white/80">Employee Name</th>
											<th scope="col" className="dark:text-white/80 min-w-[300px]">Job Title</th>
											<th scope="col" className="dark:text-white/80">Ordered Date</th>
											<th scope="col" className="dark:text-white/80">Status</th>
									    	<th scope="col" className="dark:text-white/80">Action</th>
										</tr>
									</thead>
									
										 <tbody>
                                                {Array.isArray(employeeData) && employeeData.map((employee, index) => (

                                                    <tr key={index}>
														<td>{index + 1}</td>
														<td colSpan={1} className="">{employee.employee_no}</td>
                                                        
                                                        <td colSpan={1} className="">{employee.fixed_employee  ? (
                                                                <span>{employee.fixed_employee}</span>
                                                            ) : (
                                                                <span>{employee.employee_name}</span>
														)}</td>
														<td colSpan={1} className="">{employee.job}</td>
                                                        {/* <td colSpan={1} >{employee.to_date}</td> */}
                                                        <td colSpan={1} >{employee.dob}</td>
                                                        <td colSpan={1} >{employee.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
										
									
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};



 export default Normal
