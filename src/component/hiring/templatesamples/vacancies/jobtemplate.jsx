import React, {useEffect, useState} from "react";
import ALLImages from "../../../../common/imagesData";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import "../../../../../src/assets/css/print-style.css";
import { Link, useParams} from "react-router-dom";
import axios from "axios";



const JobVacancies = () => {
	const print = () => {
		window.print();
  }
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const [vacancy, setVacancies] = useState([]);

  const { id } = useParams();
  useEffect(() => {
  
    const res = axios.get(`${apiBaseUrl}/hiring/job/download_job/${id}`).then((res) => {
      setVacancies(res.data.vacancy)
      // console.log(res.data.vacancy)
    }, [id])
     
  });
	return (
		<div >
			<PageHeader currentpage="Download Details" activepage="Pages" mainpage="Download Details" />
			<div className= "grid grid-cols-12 gap-6 lg:max-w-4xl mx-auto ">
				<div className= "col-span-12">
					<div className= "box">
                        <div className="box-body">
                            <form className="printable-content">
							<div className= "flex flex-col lg:flex-row justify-between mb-5 space-y-2">

								<div className= "">
									<h3 className= "text-2xl text-primary text-center uppercase font-semibold">JOB APPLICATION FORM</h3>
								</div>
							</div>
							{/* <hr className= "pb-5 dark:border-t-white/10"/> */}
							
							<div className= "py-5">
								<div className= "overflow-auto lg:overflow-hidden">
									<table className= "ti-custom-table table-bordered rounded-md  !border dark:bg-black/50">
										<thead className= "bg-gray-100 dark:bg-black/20 overflow-hidden">
											<tr>
												 <th colSpan={4} className="font-bold text-3xl">
                        {/* <span className="font-bold">Necessary Particulars</span> */}
                      </th>
                                                
											</tr>
										</thead>
										<tbody className= "">
									
                        <tr>
                      <td colSpan={1} className="">
                        <span className="font-bold">NAME OF COMPANY:</span>
                      </td>
                      <td colSpan={1} className="font-semibold">{vacancy.employer}</td>
                      <td colSpan={1} className="">
                        <span className="font-bold">DATE OF <br/>APPLICATION:</span>
                      </td>
                      <td colSpan={1} className="text-end font-medium">{vacancy.date_application}</td>
                    </tr>
											<tr>
                      <td className="" colSpan={1}>
                      <span className= "font-bold">TYPE OF VACANCY: </span>
                      </td>
												<td colSpan={1} className= "">
													<span className= "">{vacancy.vacancy_type}</span>	
												</td>
                       <td colSpan={1}  className="">
                        <span className= "font-bold">DEADLINE DATE:</span>
                        </td>
                        <td colSpan={1} className="">{vacancy.deadline_date}</td>
                       </tr>
                        <tr>
                           <td colSpan={1}  className="">
                        <span className= "font-bold">DEPARTMENT:</span>
                        </td>
                        <td colSpan={1} className="">{vacancy.department}</td>
                        <td colSpan={1}  className="">
                          <span className= "font-bold">WHEN THE POSITION<br/> BECOMES VACANT:</span>
                         </td>
                          <td colSpan={1}  className="">{vacancy.position_vacant}</td>
                           
                          
                        </tr>
                        <tr>
                           <td colSpan={1}  className="">
                        <span className= "font-bold">HR<br/> INTERVIEW DATE:</span>
                        </td>
                        <td colSpan={1} className="">{vacancy.hr_interview_date}</td>
                        <td colSpan={1}  className="">
                          <span className= "font-bold">TECHNICAL<br/> INTERVIEW DATE:</span>
                         </td>
                          <td colSpan={1}  className="">{vacancy.tech_interview_date}</td>
                          
                          
                      </tr>
                        
                        <tr>
                          <td colSpan={1} className="">
                          <span className= "font-bold">WORK STATION:</span>
                          </td>
                          <td colSpan={1} className="">{vacancy.work_station}</td>
                         <td colSpan={1} className="">
                          <span className= "font-bold">APPOINTMENT DATE:</span>
                          </td>
                          <td colSpan={1} className="">{vacancy.apointment_date}</td>
                        </tr>
                        
                        
                        <tr className="!border-b-0">
                          
                        <td colSpan={1} className="">
                          <span className= "font-bold">IF IT IS A REPLACEMENT<br/> POSITION, PLEASE GIVE THE <br/>REASONS FOR REPLACEMENT:</span>
                          </td>
                          <td colSpan={1} className="" >{vacancy.replacement_reason}</td>
                        
                      </tr>
											<tr className= "!border-b-0">
												<td colSpan={1} className= "ltr:border-r rtl:border-l border-gray-200 dark:border-white/10">
                          <h3 className="font-bold text-xl">Job Desciption</h3>
                          <span className= "font-bold"></span>
												</td>
												<td colSpan={1} className= "">{vacancy.name}<br/></td>
                                            
											</tr>
                      <tr>
                        <td colSpan={1} className="">
                          <span className= "font-bold">AGE:</span>
                          </td>
                          <td  colSpan={1} className="">{vacancy.age}</td>
                            <td colSpan={1}  className="">
                          <span className= "font-bold">ACADEMIC:</span>
                          </td>
                          <td colSpan={1}  className="">{vacancy.accademic}</td>
                        
                      </tr>
                      <tr>
                        <td  colSpan={1} className="">
                          <span className= "font-bold">PROFESSIONAL:</span>
                          </td>
                          <td  colSpan={1} className="">{vacancy.professional}</td>
                            <td colSpan={1}  className="">
                          <span className= "font-bold">OTHERS:</span>
                          </td>
                          <td  colSpan={1} className="">{vacancy.others}</td>
                      </tr>
                        <tr className="!border-b-0">
                        <td  colSpan={1} className="">
                          <span className= "font-bold">SALARY RANGE:</span>
                          </td>
                          <td colSpan={1} className="" >{ vacancy.salary_range}</td>
                           
                      </tr>
                      <tr className="!border-b-0">
                        <td colSpan={1}  className="">
                          <span className= "font-bold">ADDITIONAL COMMENTS:</span>
                          </td>
                          <td className="" colSpan={1}>{vacancy.additional_comment}</td>
                           </tr>
                       
										</tbody>
									</table>
								</div>
                                </div>
                <div className= "sm:grid grid-cols-12 gap-6 pb-5 space-y-5">
								<div className= "md:col-span-12 col-span-12  my-auto">
									<div className= "text-lg text-black">APPOINTING MANAGER: &nbsp;&nbsp;&nbsp; .................... &nbsp; &nbsp;&nbsp;NAME: &nbsp; &nbsp;&nbsp; .................... &nbsp; &nbsp;&nbsp;DATE: &nbsp; &nbsp; .................... </div>
									
								<br/>
									<div className= "text-lg text-black">AUTHORIZED BY: &nbsp;&nbsp;&nbsp; .................... &nbsp; &nbsp;&nbsp;NAME: &nbsp; &nbsp;&nbsp; .................... &nbsp; &nbsp;&nbsp;DATE: &nbsp; &nbsp; .................... </div>
									
								</div>
							</div>					
								
                                <hr className="pb-5 dark:border-t-white/10" />
                                 </form>
							<div className= "flex justify-end">
								<button type="button" className= "w-20 !p-1 ti-btn ti-btn-primary" onClick={print}> Print</button>
                {/* <button type="button" className= "w-20 !p-1 ti-btn ti-btn-secondary">Save</button> */}
                <Link to={`${import.meta.env.BASE_URL}hiring/vacancies/show_job/`+ id}>
                <button type="button" className="w-20 !p-1 ti-btn ti-btn-danger">Cancel</button>
                </Link>
                            </div>
                           
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default JobVacancies;
