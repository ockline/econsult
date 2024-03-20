import React, { useEffect, useState } from "react";
import ALLImages from "../../../../common/imagesData";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import "../../../../../src/assets/css/print-style.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SpecificTaskContract = () => {
    const print = () => {
        window.print();
    };
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [formData, setEmployeeData] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        const res = axios
            .get(`${apiBaseUrl}/contracts/specific/show_specific_task/${id}`)
            .then(
                (res) => {
                    setEmployeeData(res.data.specific_task);
                    // console.log(res.data.specific_task)
                },
                [id]
            );
    });

    return (
        <div>
            {/* <PageHeader
                currentpage="Download Details"
                activepage="Pages"
                mainpage="Download Details"
            /> */}
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Print Specific Task Contract</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/specific/specific_task_contracts/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/specific/show_specific_task/${formData.id}`}>Print Specific Task Contract

                        </a>
                    </li>
                </ol>
            </div>
            <div className="grid grid-cols-12 gap-6 lg:max-w-4xl mx-auto">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <form className="printable-content">
                                <div className="table-bordered rounded-md overflow-auto"> 
                                    
                                    
                                    </div>

                                <div className="flex flex-col lg:flex-row justify-between mb-5 space-y-4">
                                    {/* <div className="text-end"></div> */}
                                    <div className="text-center">
                                        <h1 className="text-2xl text-black uppercase font-semibold" >Employment Contract – Staff Grade</h1>
                                    </div>
                                </div>


                                <div className="sm:grid grid-cols-12 gap-12 pb-5 space-y-5">
                                    <div className="md:col-span-12 col-span-9  my-auto">

                                        <table className="w-full border-collaps">
                                            <tbody>
                                                <tr>
                                                    <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-xl text-black font-semibold flex text-center">
                                                            The present Employment Contract has today been concluded and agreed

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-xl text-black font-semibold flex items-center" style={{ lineHeight: '1.0' }} >
                                                            BETWEEN:
                                                            <span className="text-md text-black font-semibold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.employer_name}&nbsp;&nbsp;&nbsp;
                                                                </span>
                                                      
                                                        </h4>
                                                        <p className=" text-md font-medium text-black ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Hereinafter referred to as the <label className="text-black font-bold">"Employer"</label>)</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-xl text-black font-semibold flex items-center" style={{ lineHeight: '1.0' }} >
                                                             AND:
                                                            <span className="text-md text-black font-semibold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.employee_name}&nbsp;&nbsp;&nbsp;
                                                                </span>
                                                      
                                                        </h4>
                                                        <p className="text-md font-medium text-black ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Hereinafter referred to as the <label className="text-black font-bold">"Employee"</label>)</p>
                                                    </td>
                                                </tr>
                                              
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-xl text-black font-semibold flex items-center" style={{ lineHeight: '1.0' }} >
                                                            Date of Birth:
                                                            <span className="text-md text-black font-semibold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.dob}&nbsp;&nbsp;&nbsp;

                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-xl text-black font-semibold flex items-center" style={{ lineHeight: '1.0' }} >
                                                            Mobile Number:
                                                            <span className="text-md text-black font-semibold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.phone_number}&nbsp;&nbsp;&nbsp;

                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-xl text-black font-bold " style={{ lineHeight: '1.0' }} >
                                                            WHEREAS
                                                            <span className="text-md text-black font-medium" >&nbsp;
                                                                the Employer desires to engage the services of the Employee <label className="text-black font-bold">AND </label> the Employee is ready and willing to accept the engagement;

                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-xl text-black font-bold flex items-center">
                                                            NOW THEREFORE THE EMPLOYER AND EMPLOYEE HAVE AGREED AS FOLLOWS:
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4 ">
                                                        <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                            1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EMPLOYMENT & RECRUITMENT PARTICULARS
                                                        </h4>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="table-bordered rounded-md overflow-auto">

                                            <table className="ti-custom-table ti-custom-table-head" >
                                                <thead className="bg-gray-50 dark:bg-black/20">
                                                    {/* <tr>
                                                    
                                                    <th scope="col" colSpan={1} className="py-3 ltr:pl-4 rtl:pr-4"></th>
                                                    <th scope="col" colSpan={1} className="!text-center"></th>

                                                </tr> */}
                                                </thead>
                                                <tbody>
                                                    <tr >

                                                        <td colSpan={1} className="" style={{ border: '2px solid black' }}>
                                                            <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                Job Title
                                                            </h4></td>
                                                        <td colSpan={1} className="" style={{ border: '2px solid black' }}>
                                                            <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.job_title}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td colSpan={1} style={{ border: '2px solid black' }}><h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Job Profile
                                                        </h4></td>
                                                        <td colSpan={2} className="" style={{ border: '2px solid black' }}>
                                                            <h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.job_profile}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr >

                                                        <td colSpan={1} className="" style={{ border: '2px solid black' }}>
                                                            <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                Reporting to
                                                            </h4></td>
                                                        <td colSpan={1} className="" style={{ border: '2px solid black' }}>
                                                            <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.reporting_to}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td colSpan={1} style={{ border: '2px solid black' }}><h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Staff Classification
                                                        </h4></td>
                                                        <td colSpan={1} className="" style={{ border: '2px solid black' }}>
                                                            <h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.staff_classfication}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td colSpan={1} style={{ border: '2px solid black' }}><h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Type Of Contract
                                                        </h4></td>
                                                        <td colSpan={1} className="" style={{ border: '2px solid black' }}>
                                                            <h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.name}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td colSpan={1} style={{ border: '2px solid black' }}><h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Place of Work
                                                        </h4></td>
                                                        <td colSpan={1} className="" style={{ border: '2px solid black' }}>
                                                            <h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.work_station}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td colSpan={1} style={{ border: '2px solid black' }}><h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Place of Recruitment
                                                        </h4></td>
                                                        <td colSpan={1} className="" style={{ border: '2px solid black' }}>
                                                            <h4 className="text-xl text-black font-medium flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.place_recruitment}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr className="!border-0">
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <br />
                                        <div>
                                            <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COMMENCEMENT AND DURATION
                                            </h4>
                                            <br />
                                            <h4 className="text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                This employment shall commence on
                                                <span className="text-md text-black font-bold" >&nbsp;{formData.commencement_date}
                                                    <label className="text-black font-medium">and shall expire without notice on </label>{formData.end_commencement_date}<label className="text-black font-medium"> unless extended by mutual agreement before expiry</label>
                                                </span>
                                            </h4>
                                            <></>
                                            <h4 className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	PROBATION PERIOD
                                            </h4>
                                            {/* <br/> */}
                                            <span className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                Employee will undergo <label>{formData.probation_period}</label> probationary period during which either party may terminate the employment contract by giving one month written notice.
                                            </span>
                                            <br />
                                            <h4 className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REMUNERATION
                                            </h4>

                                            <span className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                The agreed gross monthly remuneration before tax and statutory deductions is  <label className="p-4 text-xl text-black font-bold" >TZS {formData.remuneration}/=</label> payables on the last day of the month and made up as follows:
                                            </span>
                                            <br />
                                            <br />
                                            <div className="table-bordered rounded-md overflow-auto">
                                                <table className="ti-custom-table ti-custom-table-head" >
                                                    <thead className="bg-gray-50 dark:bg-black/20">
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-0">
                                                            <td colSpan={1} className="" >
                                                                <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                    Basic Salary:
                                                                </h4></td>
                                                            <td colSpan={1} className="" >
                                                                <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                    {formData.basic_salary}
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1} ><h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                Housing Allowance
                                                            </h4></td>
                                                            <td colSpan={2} className="" >
                                                                <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                    {formData.house_allowance}
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1} className="" >
                                                                <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                    Meal Allowance
                                                                </h4></td>
                                                            <td colSpan={1} className="" >
                                                                <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                    {formData.meal_allowance}
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1} ><h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                Transport Allowance
                                                            </h4></td>
                                                            <td colSpan={1} className="">
                                                                <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                    {formData.transport_allowance}
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1}><h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                Risk / Bush Allowance
                                                            </h4></td>
                                                            <td colSpan={1} className="">
                                                                <h4 className="text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                    {formData.risk_bush_allowance}
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <br />
                                            <span className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                The Employee agrees to all statutory deductions from the salary and is aware that contribution towards the Employee’s National Social Security Fund (NSSF) which will be equally shared between the Employee and the Employer at a rate of 20% of the gross salary.
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	WORKING HOURS
                                            </h4>
                                            {/* <br /> */}
                                            <span className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                Normal working hours per week are 45 as stipulated in the Employment and Labour Relation Act 2004. The Employer's ordinary working week is Monday to Friday from 08:00hrs to 17:00hrs and on Saturday from 08:00hrs to 13hrs which includes a one-hour unpaid lunch break. Where a full hour’s lunch break is taken, the Employer may opt to perform the balance of ½ hour before or after official working hours.
                                                <br /><br />
                                                The nature of the work and responsibilities entrusted to the Employee may from time to time require overtime to meet deadlines or to speed up the project operation, in view of your position which fall in supervisory role, Overtime will be paid to cover extra hours worked as per Tanzania Labour Law.

                                            </span>
                                            <br /><br />
                                            <h4 className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	ANNUAL LEAVE
                                            </h4>
                                            {/* <br /> */}
                                            <span className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                The Employee is entitled to 28 calendar days paid leave for each year of completed service. The timing and length of the leave periods shall be in accordance with the job requirements and as agreed with the Project Management.
                                            </span>
                                            <br /><br />
                                            <h4 className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	BENEFITS
                                            </h4>
                                            <span className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                The Employee is covered by statutory workmen's compensation –WCF
                                            </span>
                                            <br /><br />
                                            <h4 className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ETHICS
                                            </h4>
                                            <span className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                The Employee is to devote all his working time to the service of the company. Without written consent of the Project Manager, employee may not engage in any outside duties including salaried or contracted work that could in any way be inconsistent with his employment with the company
                                            </span>
                                            <br /><br />
                                            <h4 className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CONFIDENTIALITY
                                            </h4>
                                            <label className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9.1&nbsp;&nbsp;&nbsp;&nbsp;The Employee agrees to maintain full confidentiality during his employment and after the termination thereof, the Employee may not disclose to any third party any information on the business affairs of the Employer, including Client’s and business associates, etc., unless such information has been released to the public domain by the Employer or for some other reason may naturally be disclosed to a third party.
                                            </label>
                                            <p className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9.2&nbsp;&nbsp;&nbsp;&nbsp;The duty of confidentiality shall apply to all material, including but not limited to information relating to know-how, software, strategies and concepts, technical designs, descriptions, formulas and models, notwithstanding the form or medium in which they exist.
                                            </p>
                                            <label className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9.3&nbsp;&nbsp;&nbsp;&nbsp;Any breach of the duty of confidentiality shall be deemed a material breach of this Agreement with ensuing severe disciplinary sanctions for the Employee, including but not limited to termination of employment.
                                            </label>
                                            <br /><br />
                                            <h4 className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TERMINATION OF EMPLOYMENT
                                            </h4>
                                            <span className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                Upon completion of probationary period, either party may terminate the employment by giving one calendar months' notice in writing.
                                                However, the Employer may terminate the Employee without notice for cause. For the purpose of this contract, "cause" shall mean:<br/>
                                                <label className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }}>	(a)	Gross misconduct or any serious breach or continued breach after a written warning has been issued on duties and responsibilities;</label><br/>
                                                <label className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }}>	(b)	Any unauthorized disclosure of breach of confidentiality on any matter relating to the Company, its customers or staff not so required by law;</label>
                                                <br/>
                                                <label className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }}>	(c)	Refusal to carry out the lawful instructions of a superior;</label>
                                                <br/>
                                                <label className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }}>	(d)	Un-notified absence from duties</label>
                                                <br/>
                                                <label className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }}>	(e)	If you are discovered to have made or given any false statement or document testifying to your ability or competence or relating to your state of health knowing such statement or documents is false</label>
                                                <br/><br/>
                                                <p>
                                              The exercise by the Company of its right of contract termination under this clause shall not debar it from exercising such other rights or remedies as may be available to it by law or otherwise by reason of any of the matters set out in employee’s conditions and terms of employment contract which form part of this employment contract.
                                                </p>
                                            </span>
                                              <br />
                                            <h4 className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; APPLICATION OF THE LAW
                                            </h4>
                                            <span className="p-4 text-xl text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                This Agreement shall be interpreted and applied in accordance with the prevailing Laws of the United Republic of Tanzania. Where any conflict arises between this Agreement and the Laws, the provisions of the Laws shall apply as if they are terms of this Agreement. 
                                                <br />
                                            	The Employee is required to refer to the condition of his/her employment contract and/or prevailing management notices for issues not specifically addressed in the contract. Such terms and conditions may change from time to time and the latest version will always be available within the Human Resources Department.	The employee shall be entitled to any other benefits stipulated by the Laws even if not stated in this Agreement or as agreed between the parties.
                                               </span>
                                                 <span className="p-4 text-xl text-black font-bold flex items-center">
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; APPENDICES:
                                                   </span>
                                                    <label  className="p-4 text-xl text-black font-medium">
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  A:	Personal Particulars
                                                    <br/>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  B:	Job Description
                                                        </label>
                                                
                                           <br /><br />
                                            <span className="p-4 text-xl text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                &nbsp; 	SIGNATURES<br/>
                                               
                                                </span>
                                            <label className="p-4 text-xl text-black font-medium">	On behalf of the Employer</label>
                                            <br/>  <br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="p-4 text-xl text-black font-medium" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '360px' }}>
                                            {/* Content */}
                                            </span>
                                            <br/>  <br/>
                                           <label className="p-4 text-xl text-black font-bold">Date:</label> <span className="p-4 text-xl text-black font-medium" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '300px' }}></span>
                                            <br/><br/>
                                             <label className="p-4 text-xl text-black font-medium">		The Employee (Read, Understood & Agreed)</label>
                                            <br/> <br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="p-4 text-xl text-black font-medium" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '360px' }}>
                                            {/* Content */}
                                            </span>
                                            <br/><br/>
                                           <label className="p-4 text-xl text-black font-bold">Date:</label>  <span className="p-4 text-xl text-black font-medium" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '300px' }}></span>                                       
                                        
                                        </div>
                                       
                                    </div>
                                </div>
                            </form>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="w-20 !p-1 ti-btn ti-btn-primary"
                                    onClick={print}
                                >
                                    {" "}
                                    Print
                                </button>

                                <Link
                                    to={
                                        `${import.meta.env.BASE_URL
                                        }hiring/hrinterview/show_assessment/` +
                                        id
                                    }
                                ></Link>
                                <button
                                    type="button"
                                    className="w-20 !p-1 ti-btn ti-btn-danger"
                                ><a className="flex items-center text-white hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/required/show_detail/${formData.id}`}> Cancel

                                    </a>

                                </button>

                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};
export default SpecificTaskContract;
