
import React, { useState, useEffect } from "react";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import { Link } from 'react-router-dom';
import { fetchAssessedCandidate } from "../../../../common/recruitmentdata";
import Select from 'react-select';
import { Assigned,  SortBy, StatusTask } from "/src/common/select2data";
import TableLoader from "../../../../common/TableLoader";

const Interviewed = () => {
	

	 const [allData, setAllData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState(''); // for Searching
	const [currentPage, setCurrentPage] = useState(1);
	const entriesPerPage = 10;
	
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const assessedData = await fetchAssessedCandidate();
        setAllData(assessedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleRemove(id) {
    const newList = allData.filter((assessed) => assessed.id !== id);
    setAllData(newList);
	}
	
	  // Filter data based on search query
    const filteredData = allData.filter((assessed) =>
		assessed.job_title.toLowerCase().includes(searchQuery.toLowerCase())
			// toLowerCase().includes(searchQuery.toLowerCase())
    );
	
	//*********************Pagination */
	 const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

		function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;
}

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
													<th scope="col" className="dark:text-white/70">
													S/NO
													</th>
													<th scope="col" className="dark:text-white/70">
													Candidate No
													</th>
													<th scope="col" className="dark:text-white/70">
													Candidate Name
													</th>
													<th scope="col" className="dark:text-white/70">
													Job title
													</th><th scope="col" className="dark:text-white/70">
													Recruiter<br/>Recommendation
													</th>
													<th scope="col" className="dark:text-white/70">
													Interview<br/>Date
													</th>
													<th scope="col" className="dark:text-white/70">
													Status
													</th>
													<th scope="col" className="text-end dark:text-white/70">
													Action
													</th>
												</tr>
												</thead>
												<tbody>
													 {isLoading ? (
															<TableLoader colSpan={8} />
														) : (
													 currentEntries.map((assessed, index) => (
															<tr className="product-list" key={assessed.id}>
																<td>{index + 1 + indexOfFirstEntry}</td>
																<td>{assessed.interview_number}</td>
															 <td className="font-semibold">{assessed.candidate_name}</td>
															 <td>{assessed.job_title}</td>
															 <td>{assessed.recruiter_recommendations === "Accepted" ? (<span className="badge bg-success text-white">Accepted</span>)
																 : assessed.recruiter_recommendations === "Not Accepted" ? (
													            <span className="badge bg-danger text-white">Not Accepted</span>
																	) : <span className="badge bg-warning text-white">Waiting List</span>
																		}										 
															 </td>
																<td>{formatDate(assessed.date)}</td>
																<td>
																{assessed.status === 0 ? (
																	<span className="badge bg-info text-white">Submitted</span>
																) : assessed.status === 1 ? (
																	<span className="badge bg-secondary text-white">Initiated</span>
																) : assessed.status === 2 ? (
																	<span className="badge bg-warning text-white">Pending</span>
																) : assessed.status === 3 ? (
																	<span className="badge bg-success text-white">Approved</span>
																) : (
																	<span className="badge bg-danger text-white">Rejected</span>
																)}
																</td>
													<td className="text-end font-medium">
														{/* Adjust the links according to your routes and logic */}
														<Link
														aria-label="anchor"
														to={`${import.meta.env.BASE_URL}hiring/recruitments/hr/show_assessment/` + assessed.id}
														className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
														>
														<i className="ti ti-eye"></i>
														</Link>
														<Link
														aria-label="anchor"
														to={`${import.meta.env.BASE_URL}hiring/recruitments/hr/edit_assessment/`+ assessed.id}
														className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
														>
														<i className="ti ti-pencil"></i>
														</Link>
														<button
														aria-label="anchor"
														className="product-btn w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger"
														onClick={() => handleRemove(assessed.id)}
														>
														<i className="ti ti-trash"></i>
														</button>
													</td>
													</tr>
												))
														)}
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
