
import React, { useState } from "react";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import { Link } from 'react-router-dom';
import { ProductList } from "../../../../common/EcommerceData";
import Select from 'react-select';
import { Assigned,  SortBy, StatusTask } from "/src/common/select2data";

const Interviewed = () => {
	const [allData, setAllData] = useState(ProductList)
	function handleRemove(id) {
		const newList = allData.filter((idx) => idx.id !== id);
		setAllData(newList);
	  }

	  const [isChecked, setIsChecked] = useState(true);

	  const handleCheckAll = () => {
		const mailListElements = document.querySelectorAll('.mail-list');
		const mailCheckboxInputs = document.querySelectorAll('.mail-checkbox input');
	
		if (isChecked) {
		  mailListElements.forEach((element) => {
			element.classList.add('selected');
		  });
	
		  mailCheckboxInputs.forEach((input) => {
			input.checked = true;
		  });
		} else {
		  mailListElements.forEach((element) => {
			element.classList.remove('selected');
		  });
	
		  mailCheckboxInputs.forEach((input) => {
			input.checked = false;
		  });
		}
	
		setIsChecked(!isChecked);
	  };

	return (
		<div>
		<PageHeader currentpage="HR Interview" activepage="Pages" mainpage="HR Interview" />
			<div className= "box">
				<div className= "box-header lg:flex lg:justify-between">
					<h5 className= "box-title my-auto">Candidate List</h5>
					<Link to={`${import.meta.env.BASE_URL}hiring/recruitments/hr/add_assessment`} className= "ti-btn ti-btn-primary m-0 py-2"><i className= "ri ri-add-line"></i>Add Assessment</Link>
				</div>
				<div className="box-body">
					
							<div className= "grid grid-cols-12 gap-6">
								<div className= "col-span-12 lg:col-span-4">
									<div className= "relative sm:max-w-xs max-w-[210px]">
										<label htmlFor="hs-table-search" className= "sr-only">Search</label>
										<div className= "absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
											<i className= "ti ti-search"></i>
										</div>
										<input type="text" name="hs-table-search" id="hs-table-search" className= "p-2 ltr:pr-10 rtl:pl-10 ti-form-input" onChange={(ele) => { myfunction(ele.target.value) }}
											placeholder="Search Task"/>
									</div>
								</div>
								<div className= "col-span-12 lg:col-span-8">
									<div className= "sm:flex space-y-2 sm:space-y-0 sm:space-x-3 space-x-0 justify-end task-right rtl:space-x-reverse">
									<Select classNamePrefix='react-select' className="task-choice totdolist" options={SortBy} menuPlacement='auto' placeholder='sort By' />

                                    <Select classNamePrefix='react-select' className="task-choice totdolist" options={StatusTask} menuPlacement='auto' placeholder='Status' />
										<div className= "hs-dropdown ti-dropdown">
											<Link aria-label="anchor" to="#"
												className="hs-dropdown-toggle ti-dropdown-toggle inline-flex !p-2 flex-shrink-0 justify-center items-center gap-2 w-full rounded-sm border font-medium bg-white text-gray-500 shadow-sm align-middle focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-white focus:ring-primary transition-all text-xs dark:bg-bgdark dark:border-white/10 dark:text-white/70 dark:focus:ring-offset-white/10">
												<i className= "ri ri-more-2-line text-lg leading-none"></i>
											</Link>
											<div className= "hs-dropdown-menu ti-dropdown-menu">
												<Link className= "ti-dropdown-item" to="#">Select All</Link>
												<Link className= "ti-dropdown-item" to="#">Mark All</Link>
												<Link className= "ti-dropdown-item" to="#">Delete All</Link>
											</div>
										</div>
									</div>
						</div>
					</div>
					<div className= "table-bordered whitespace-nowrap rounded-sm overflow-auto">
						<table className= "ti-custom-table ti-custom-table-head edit-table">
							<thead className= "bg-gray-100 dark:bg-black/20">
								<tr className= "">
									<th scope="col" className= "dark:text-white/70">
										{/* <div className= "flex leading-[0] justify-center">
											<input type="checkbox" className= "border-gray-500 ti-form-checkbox mt-0.5" onClick={handleCheckAll}
												id="hs-default-checkbox"/>
											<label htmlFor="hs-default-checkbox" className= "text-sm text-gray-500 dark:text-white/70"></label>
										</div> */}
										S/NO
									</th>
									<th scope="col" className= "dark:text-white/70">Cancidate No</th>
									<th scope="col" className= "dark:text-white/70">Candidate Name</th>
									<th scope="col" className= "dark:text-white/70">Job title</th>
									<th scope="col" className= "dark:text-white/70">Date</th>
									<th scope="col" className= "dark:text-white/70">Status</th>
									<th scope="col" className= "!text-end dark:text-white/70">Action</th>
								</tr>
							</thead>
							<tbody>
								{allData.map((idx)=>(
								<tr className= "product-list" key={Math.random()}>
									<td className= "">
										{/* <div className= "flex items-center h-5 product-checkbox justify-center">
											<input id="product-check-1" type="checkbox" className= "border-gray-500 ti-form-checkbox"/>
											<label htmlFor="product-check-1" className= "sr-only">Checkbox</label>
										</div> */}
											{idx.id}
									</td>
									<td className= "font-semibold">{idx.PdctID}</td>
									<td>
										Masua Nanguku
									</td>
										<td>{idx.stock}</td>
										<td>{idx.date}</td>
										<td>
										{idx.status === 0 ? (
											<span className="badge bg-info text-white">Submitted</span>
										) : idx.status === 1 ? (
											<span className="badge bg-secondary text-white">Initiated</span>
										) : idx.status === 2 ? (
											<span className="badge bg-warning text-white">Pending</span>
										) : idx.status === 3 ? (
											<span className="badge bg-success text-white">Approved</span>
										) : (
											<span className="badge bg-danger text-white">Rejected</span>
										)}
										</td>
									<td className= "text-end font-medium">
										<Link aria-label="anchor" to={`${import.meta.env.BASE_URL}pagecomponent/Ecommerce/productdetails/`} className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success">
											<i className= "ti ti-eye"></i>
										</Link>
										<Link aria-label="anchor" to={`${import.meta.env.BASE_URL}pagecomponent/Ecommerce/editproduct/`} className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary">
											<i className= "ti ti-pencil"></i>
										</Link>
										<Link aria-label="anchor" to="#" className="product-btn w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger" onClick={() => handleRemove(idx.id)}>
											<i className= "ti ti-trash"></i>
										</Link>
									</td>
								</tr>
								))}
							</tbody>
						</table>
					</div>
					<br/>
					<nav className="pagination-style-3 flex justify-end">
                                <ul className= "ti-pagination">
                                  <li><Link className= "page-link" to="#">
                                   Prev
                                  </Link></li>
                                  <li><Link className= "page-link active" to="#" aria-current="page">1</Link></li>
                                  <li><Link className= "page-link" to="#">2</Link></li>
                                  <li><Link aria-label="anchor" className= "page-link" to="#"><i className= "ri-more-line"></i></Link></li>
                                  <li><Link className= "page-link" to="#">21</Link></li>
                                  <li><Link className= "page-link" to="#">22</Link></li>
                                  <li><Link className= "page-link" to="#">
                                    Next
                                  </Link></li>
                                </ul>
                              </nav>
					
				</div>
			</div>
		</div>
	);
};
export default Interviewed;
