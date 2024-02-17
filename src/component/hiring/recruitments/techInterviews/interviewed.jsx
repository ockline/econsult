
import React, { useState, useEffect } from "react";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import { Link } from 'react-router-dom';
import { fetchAssessedCandidate, fetchTechnicalCandidate } from "../../../../common/recruitmentdata";
import Select from 'react-select';
import { Assigned,  SortBy, StatusTask } from "/src/common/select2data";

const Interviewed = () => {
	

	 const [allData, setAllData] = useState([]);
	const [searchQuery, setSearchQuery] = useState(''); // for Searching
	const [currentPage, setCurrentPage] = useState(1);
	const entriesPerPage = 10;
	
  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidateData = await fetchTechnicalCandidate();
        setAllData(candidateData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  function handleRemove(id) {
    const newList = allData.filter((candidate) => candidate.id !== id);
    setAllData(newList);
	}
	
	  // Filter data based on search query
    const filteredData = allData.filter((candidate) =>
        candidate.candidate_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
	
	//*********************Pagination */
	 const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div>
			
			
			<div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Technical Interview</h1>

				<ol className="flex items-center whitespace-nowrap min-w-0 text-end">
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
						Home
						<i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
					</a>
					</li>
					<li className="text-sm">
					<a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`}>
						Technical Interviews
						{/* <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i> */}
					</a>
					</li>
				</ol>
				</div>
			<div className= "box">
				<div className= "box-header lg:flex lg:justify-between">
					<h5 className= "box-title my-auto">Candidate List</h5>
					<Link to={`${import.meta.env.BASE_URL}hiring/recruitments/technical/add_candidate`} className= "ti-btn ti-btn-primary m-0 py-2"><i className= "ri ri-add-line"></i>Add Candidate</Link>
				</div>
				<div className="box-body">
					
							<div className= "grid grid-cols-12 gap-6">
								<div className= "col-span-12 lg:col-span-4">
									<div className= "relative sm:max-w-xs max-w-[210px]">
										<label htmlFor="hs-table-search" className= "sr-only">Search</label>
										<div className= "absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
											<i className= "ti ti-search"></i>
										</div>
										<input type="text" name="hs-table-search" id="hs-table-search" className= "p-2 ltr:pr-10 rtl:pl-10 ti-form-input" value={searchQuery} onChange={(ele) => setSearchQuery(ele.target.value)}
											placeholder="Search by Candidate Number"/>
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
											</div>
										</div>
									</div>
						</div>
					</div>
						<br/>
					<div className="table-bordered whitespace-nowrap rounded-sm overflow-auto">
											<table className="ti-custom-table ti-custom-table-head edit-table">
												<thead className="bg-gray-100 dark:bg-black/20">
												<tr>
													<th scope="col" className="font-bold">
													S/NO
													</th>
													<th scope="col" className="font-bold ">
													Candidate No
													</th>
													<th scope="col" className="">
													Candidate Name
													</th>
													<th scope="col" className="">
													Job title
													</th><th scope="col" className="">
													Recruiter<br/>Recommendation
													</th>
													<th scope="col" className="">
													Interview<br/>Date
													</th>
													<th scope="col" className="font-semibold">
													Status
													</th>
													<th scope="col" className="text-end">
													Action
													</th>
												</tr>
												</thead>
												<tbody>
								      {
									     currentEntries.map((candidate, index) => (
															<tr className="product-list" key={candidate.id}>
															<td>{index + 1 + indexOfFirstEntry}</td>
															<td>{candidate.interview_number}</td>								
															 <td className="font-semibold">{candidate.candidate_name}</td>
															 <td>{candidate.job_title}</td>
															 <td>{candidate.recruiter_recommendations === "Accepted" ? (<span className="badge bg-success text-white">Accepted</span>)
																 : candidate.recruiter_recommendations === "Not Accepted" ? (
													            <span className="badge bg-danger text-white">Not Accepted</span>
																	) : <span className="badge bg-warning text-white">Waiting List</span>
																		}										 
															 </td>
																<td>{candidate.date}</td>
																<td>
																{candidate.status === 0 ? (
																	<span className="badge bg-info text-white">Submitted</span>
																) : candidate.status === 1 ? (
																	<span className="badge bg-secondary text-white">Initiated</span>
																) : candidate.status === 2 ? (
																	<span className="badge bg-warning text-white">Pending</span>
																) : candidate.status === 3 ? (
																	<span className="badge bg-success text-white">Approved</span>
																) : (
																	<span className="badge bg-danger text-white">Rejected</span>
																)}
																</td>
													<td className="text-end font-medium">
														{/* Adjust the links according to your routes and logic */}
														<Link
														aria-label="anchor"
														to={`${import.meta.env.BASE_URL}hiring/recruitments/technical/show_candidate/` + candidate.id}
														className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
														>
														<i className="ti ti-eye"></i>
														</Link>
														<Link
														aria-label="anchor"
														to={`${import.meta.env.BASE_URL}hiring/recruitments/technical/edit_candidate/`+ candidate.id}
														className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
														>
														<i className="ti ti-pencil"></i>
														</Link>
														<button
														aria-label="anchor"
														className="product-btn w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger"
														onClick={() => handleRemove(candidate.id)}
														>
														<i className="ti ti-trash"></i>
														</button>
													</td>
													</tr>
												))}
												</tbody>
												</table>
											</div>
											<br/>
										<nav className="pagination-style-3 flex justify-end">
											<ul className="ti-pagination">
												<li><Link className="page-link" to="#" onClick={() => paginate(currentPage - 1)}>
													Prev
												</Link></li>
												{[...Array(Math.ceil(filteredData.length / entriesPerPage)).keys()].map(number => (
													<li key={number + 1}>
														<Link className={`page-link ${currentPage === number + 1 ? 'active' : ''}`} to="#" onClick={() => paginate(number + 1)}>
															{number + 1}
														</Link>
													</li>
												))}
												<li><Link className="page-link" to="#" onClick={() => paginate(currentPage + 1)}>
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
