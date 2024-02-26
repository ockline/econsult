import React, { useEffect, useState } from "react";
import ALLImages from "../../../../common/imagesData";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import "../../../../../src/assets/css/print-style.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AssessedCandidate = () => {
    const print = () => {
        window.print();
    };
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [formData, setAssessedCandidateData] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        const res = axios
            .get(`${apiBaseUrl}/hiring/technical_interview/show_candidate/${id}`)
            .then(
                (res) => {
                    setAssessedCandidateData(
                        JSON.parse(res.data.assessed_candidate)
                    );
                      console.log(res.data.assessed_candidate)
                },
                [id]
            );
    });
     const [practicalData, setPracticalData] = useState([]);
    useEffect(() => {
        axios.get(`${apiBaseUrl}/hiring/technical_interview/practical_candidate/${id}`).then((res) => {
            setPracticalData(res.data.practical_candidate)
            // console.log(res.data.practical_candidate);
        })
    }, [id])
    
    return (
        <div>
            <PageHeader
                currentpage="Download Details"
                activepage="Pages"
                mainpage="Download Details"
            />
            <div className="grid grid-cols-12 gap-6  mx-auto ">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <form className="printable-content">
                                <div className="flex flex-col lg:flex-row justify-between mb-5 space-y-4">
                                    <div>
                                        <div className="mb-2">
                                            <img src={ALLImages('logo')} alt="logo" className="flex dark:hidden" />
                                            <img src={ALLImages('dark')} alt="logo" className="hidden dark:flex" />
                                        </div>
                                        <div className="mt-1">{formData.employer_name}</div>
                                        <div className="mt-1">P.O. Box 283</div>

                                    </div>
                                    <div className="text-center">
                                        <div className="mt-1" ><h1 className="text-2xl text-black uppercase font-semibold">TECHNICAL INTERVIEW</h1> </div>
                                        <div className="mt-1 uppercase font-semibold"><h1 className="text-2xl text-black uppercase font-semibold">ASSESSMENT REPORT</h1></div>
                                    </div>
                                    <div className="text-end">
                                        <div className="mb-2">
                                            <img src={ALLImages('logo')} alt="logo" className="flex dark:hidden" />
                                            <img src={ALLImages('dark')} alt="logo" className="hidden dark:flex" />
                                        </div>
                                        <h3 className="text-2xl text-primary uppercase font-semibold">Invoice</h3>
                                    </div>
                                </div>
                                {/* <hr className="pb-5  font-semibold" /> */}
                                <div className="pb-5 font-semibold">
                                    <hr className="border-t border-black" />
                                </div>

                                <div className="sm:grid grid-cols-12 gap-12 pb-5 space-y-5">
                                    <div className="md:col-span-12 col-span-12  my-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap ti-head-primary">
                                            <tbody>
                                                <tr className="!border-0">
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            JOB TITLE
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td className="text-lg text-black" style={{  borderBottom: '1px solid black', paddingBottom: '1px' }}>
                                                        {formData.job_title} 
                                                    </td>
                                                    <td>
                                                        <div className="text-lg text-black">

                                                            DATE
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td className="text-lg text-black" style={{  borderBottom: '1px solid black', paddingBottom: '1px' }}>
                                                        {formData.date} 
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            COST CENTER NAME
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td className="text-lg text-black" style={{  borderBottom: '1px solid black', paddingBottom: '1px' }}>
                                                        {formData.cost_center} 
                                                    </td>
                                                    <td>
                                                        <div className="text-lg text-black">

                                                            COST CENTER NO
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td className="text-lg text-black" style={{  borderBottom: '1px solid black', paddingBottom: '1px' }}>
                                                        {formData.cost_number} 
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            CANDIDATE NAME
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                        <td className="text-lg text-black" style={{  borderBottom: '1px solid black', paddingBottom: '1px' }}>
                                                        {formData.candidate_name} 
                                                    </td>
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            INTERVIEWER NAME
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td className="text-lg text-black" style={{  borderBottom: '1px solid black', paddingBottom: '1px' }}>
                                                        {formData.interviewer_name} 
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            CANDIDATE NUMBER
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                   <td className="text-lg text-black" style={{  borderBottom: '1px solid black', paddingBottom: '1px' }}>
                                                        {formData.interview_number} 
                                                    </td>
                                                  
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                               
                                <div className="overflow-auto table-bordered-primary rounded-md border-black font-bold">
                                    <table className="ti-custom-table border-black ti-custom-table-head">
                                        <thead >
                                            <tr >
                                                <th className="!p-2 text-lg text-black border-black !text-center font-bold">Ranking</th>
                                                <th className="!p-2 font-bold text-black border-black !text-center">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="font-semibold border-black">
                                                <td className="!p-2 text-2xl !text-center  text-black border-black">
                                                    Outstanding
                                                </td>
                                                <td className="!p-2 !text-center text-black border-black">
                                                    Exceeding Expectation as Role Model
                                                </td>
                                            </tr>
                                            <tr className="font-semibold border-black">
                                                <td className="!p-2 !text-center text-black border-black">
                                                    V. Good
                                                </td>

                                                <td className="!p-2 !text-center text-black border-black">
                                                    Exceeding expectation
                                                </td>

                                            </tr>
                                            <tr className="border-0 border-black">
                                                <td className="!p-2 !text-center text-black border-black">
                                                    Good

                                                </td>

                                                <td className="!p-2 !text-center text-black border-black">
                                                    Meet Expectation
                                                </td>

                                            </tr>
                                            <tr className="border-0 border-black">
                                                <td className="!p-2 !text-center text-black border-black">
                                                    Average

                                                </td>

                                                <td className="!p-2 !text-center text-black border-black">
                                                    Below Expectation
                                                </td>

                                            </tr>
                                            <tr className="border-0 border-black">
                                                <td className="!p-2 !text-center text-black border-black">
                                                    Below Average
                                                </td>

                                                <td className="!p-2 !text-center text-black border-black">
                                                    Doesn’t meet Expectation
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br />

                                <div className="table-bordered-primary rounded-md border-black font-bold">
                                    <table className="ti-custom-table border-black ti-custom-table-head">
                                        <thead className="bg-gray-50 dark:bg-black/20">
                                            <tr>
                                                <th colSpan={1} className="!p-2 text-black border-black">S/NO</th>
                                                <th
                                                    scope="col"
                                                    rowSpan={2}
                                                    className="py-3 ltr:pl-4 rtl:pr-4  text-black border-black  !text-center" >
                                                
                                                    Factor
                                                </th>
                                                <th className="!p-2 text-black border-black !text-center"colSpan={6}>Ranking
                                                    <td scope="col">N/A (0)</td>
                                                    <td scope="col" className="!p-2 text-black border-black" style={{ verticalAlign: 'top' }}>Below <br />Average(1)</td>
                                                    <td scope="col">Average (2)</td>
                                                    <td scope="col">Good(3)</td>
                                                    <td scope="col">V.Good(4)</td>
                                                    <td scope="col">Outstanding (5)</td>
                                                </th>
                                                <th scope="col" rowSpan={2} className="!text-center  text-black border-black"> Comments </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr className="!p-2 text-black border-black">

                                                <td className="">
                                                    1
                                                </td>
                                                <td className="!p-2 text-black border-black">Technical Skills
                                                <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse"><span>(Certificates, Courses, Softwares…etc.)</span></p>
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.technical_skill ===
                                                        "N/A(0)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="technical_skill-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.technical_skill ===
                                                        "Below Average(1)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="technical_skill-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.technical_skill ===
                                                        "Average (2)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="technical_skill-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.technical_skill ===
                                                        "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="technical_skill-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.technical_skill ===
                                                        "V.Good (4)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="technical_skill-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.technical_skill ===
                                                        "Outstanding (5)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="technical_skill-6"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>

                                                <td>
                                                    <input
                                                        className="ti-form-input"
                                                        type="text"
                                                        value={
                                                            formData.skill_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "skill_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    2
                                                </td>
                                                <td className="!p-2 text-black border-black">Relevant Technical Experience</td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.relevant_experience ===
                                                        "N/A (0)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="relevant_experience-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.relevant_experience ===
                                                        "Below Average (1)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="relevant_experience-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.relevant_experience ===
                                                        "Average (2)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="relevant_experience-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.relevant_experience ===
                                                        "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="relevant_experience-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.relevant_experience ===
                                                        "V.Good (4)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="relevant_experience-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                                                    {formData.relevant_experience ===
                                                        "Outstanding (5)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="relevant_experience-6"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>

                                                <td className="">
                                                    <input
                                                        className="ti-form-input"
                                                        type="text"
                                                       
                                                        name="experience_remark"
                                                        value={
                                                            formData.experience_remark
                                                        }
                                                        
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                              <td>3</td>
                                                <td className="!p-2 text-black border-black">
                                                    Knowledge of Tools and Equipment
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.knowledge_equipment ===
                                                        "N/A (0)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.knowledge_equipment ===
                                                        "Below Average (1)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.knowledge_equipment ===
                                                        "Average (2)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.knowledge_equipment ===
                                                        "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.knowledge_equipment ===
                                                        "V.Good (4)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.knowledge_equipment ===
                                                        "Outstanding (5)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-6"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>

                                                <td>
                                                    <input
                                                        className="ti-form-input" type="text" value={formData.planning_organizing_remark }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr className="!p-2 text-black border-black">
                                                <td className="">4</td>
                                                <td className="">
                                                  Quality and Safety awareness
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.quality_awareness ===
                                                        "N/A (1)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="quality_awareness-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.quality_awareness ===
                                                        "Below Average (1)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="quality_awareness-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.quality_awareness ===
                                                        "Average (2)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="quality_awareness-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.quality_awareness ===
                                                        "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="quality_awareness-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.quality_awareness ===
                                                        "V.Good (4)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="quality_awareness-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.quality_awareness ===
                                                        "Outstanding (5)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="quality_awareness-6"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>

                                                <td>
                                                    <input
                                                        className="ti-form-input"
                                                        type="text"  value={formData.awareness_remark }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr className="!p-2 text-black border-black">
                                                <td>5</td>
                                                <td className="font-medium">
                                                    Physical Capability
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.physical_capability ===
                                                        "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="physical_capability-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.physical_capability ===
                                                        "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="physical_capability-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.physical_capability ===
                                                        "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="physical_capability-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.physical_capability ===
                                                        "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="physical_capability-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.physical_capability ===
                                                        "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="physical_capability-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {formData.physical_capability ===
                                                        "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="physical_capability-6"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>

                                                <td className="">
                                                    <input
                                                        className="ti-form-input"
                                                        type="text" value={formData.capability_remark }
                                                        
                                                    ></input>
                                                </td>
                                            </tr>
                                            {/*  block for returnin practial test */}
                                            	
                                       {Array.isArray(practicalData) && practicalData.map((practical, index) => (
                                        
                                                <tr key={index}>
                                                   <td>{index + 6}</td>
                                                    <th className="">
                                                <span className="font-semibold ">Practical Test {index + 1}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {practical.test_marks}</span>
                                                  
                                                    </th>
                                                     <td className="text-center" style={{ width: '50px' }}>
                                                    {practical.ranking_creterial ===
                                                        "N/A (0)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {practical.ranking_creterial ===
                                                        "Below Average (1)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {practical.ranking_creterial ===
                                                        "Average (2)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {practical.ranking_creterial ===
                                                        "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {practical.ranking_creterial ===
                                                        "V.Good (4)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center" style={{ width: '50px' }}>
                                                    {practical.ranking_creterial ===
                                                        "Outstanding (5)" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="knowledge_equipment-6"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                    {/* <td colSpan={1} className="interactive">
                                                    <label className = "p-3 flex w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70" htmlFor="hs-checked-checkbox" >
                                                    <input type="checkbox" className = "ti-form-checkbox mt-0.5 pointer-events-none" id="hs-checked-checkbox-1" defaultChecked/>
                                                    <span className = "text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">{practical.ranking_creterial}</span>
                                                    </label>                                                     
                                                   </td> */}
                                                
                                                <td><input className='ti-form-input' type="text"
                                                 placeholder="Remark"
                                            name="practicl_test_remark" value={practical.practicl_test_remark}
                                                     onChange={(e) => handleInputChange('capability_remark', e.target.value)} ></input>
                                        </td>                                       
									</tr>
                                     ))}      
                                          
                                            
                                            <tr className="!p-2 text-black border-black">
                                                <td rowSpan={3}></td>
                                                <th className="" colSpan={2}>
                                                    Overall Rating
                                                </th>
                                                <td
                                                    colSpan={6}
                                                    className="text-center" style={{ width: '50px' }}
                                                >
                                                    {formData.overall_rating ===
                                                        "N/A (0)" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-0 focus:ring-red-500 focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                            N/A
                                                            <span className="badge py-0.5 px-1.5 bg-red-800 text-white">
                                                                0
                                                            </span>
                                                        </button>
                                                    ) : formData.overall_rating ===
                                                        "Below Average (1)" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-0 focus:ring-orange-500 focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                            Below Average
                                                            <span className="badge py-0.5 px-1.5 bg-orange-800 text-white">
                                                                1
                                                            </span>
                                                        </button>
                                                    ) : formData.overall_rating ===
                                                        "Average (2)" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:ring-yellow-500 focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                            Average
                                                            <span className="badge py-0.5 px-1.5 bg-yellow-800 text-white">
                                                                2
                                                            </span>
                                                        </button>
                                                    ) : formData.overall_rating ===
                                                        "Good" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                            Good
                                                            <span className="badge py-0.5 px-1.5 bg-black/50 text-white">
                                                                3
                                                            </span>
                                                        </button>
                                                    ) : formData.overall_rating ===
                                                        "V.Good (4)" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                            V.Good
                                                            <span className="badge py-0.5 px-1.5 bg-black/50 text-white">
                                                                4
                                                            </span>
                                                        </button>
                                                    ) : formData.overall_rating ===
                                                        "Outstanding (5)" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-success text-white hover:bg-secondary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                            Outstanding
                                                            <span className="badge py-0.5 px-1.5 bg-black/50 text-white">
                                                                5
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        formData.overall_rating ===
                                                        null
                                                    )}
                                                </td>
                                                
                                            </tr>  
                                     <tr>
                                                    {/* <td className=""></td> */}
                                                    <td className="" colSpan={2}>Final Recommendation
                                                    </td>
                                                    <td colSpan={6} className="!text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="final_recommendations-Accepted"
                                                            checked={
                                                                formData.final_recommendation ===
                                                                "Accepted"
                                                            }
                                                            disabled
                                                        />
                                                        <label
                                                            htmlFor="final_recommendations-Accepted"
                                                            className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                        >
                                                            Accepted
                                                        </label>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="final_recommendations-Not-Accepted"
                                                            checked={
                                                                formData.final_recommendation ===
                                                                "Not Accepted"
                                                            }
                                                            disabled
                                                        />
                                                        <label
                                                            htmlFor="final_recommendations-Not-Accepted"
                                                            className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                        >
                                                            Not Accepted
                                                        </label>

                                                    </td>


                                            </tr>   
                                            <tr>
                                                <td colSpan={2}>Recommended Title</td>
                                                <td colSpan={6} className="!text-center">{formData.recommended_title}</td>
                                            </tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                                <br />
                                
                               
                                {/* <hr className="pb-5 dark:border-t-white/10" /> */}
                                <div className="sm:grid grid-cols-12 gap-6 pb-5 space-y-5">
                                    <div className="lg:col-span-4 col-span-12 text-end ">
                                        <h3 className="font-bold text-left text-2xl text-black ">Interviewer</h3>
                                        <div className="text-lg text-black text-center">Name .....................................</div>
                                        
                                    <br/>
                                    <div className="text-lg text-black text-center">Signature .....................................</div>
                                        <h3 className="font-semibold text-center"></h3>
                                    </div>
                                   <div className="lg:col-span-4 col-span-12 text-right ">
                                        <h3 className="font-bold text-left text-2xl text-black ">Department Manager/Project Manager/Packages Manager</h3>
                                        <div className="text-lg text-black text-center">Name .....................................</div>
                                        
                                    <br/>
                                    <div className="text-lg text-black text-center">Signature .....................................</div>
                                        <h3 className="font-semibold text-center"></h3>
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
                                    ><a className="flex items-center text-white hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/recruitments/technical/show_candidate/${formData.id}`}> Cancel
						
					</a>
                                      
                                    </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AssessedCandidate;
