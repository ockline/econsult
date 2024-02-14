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
            .get(`${apiBaseUrl}/hiring/hr_interview/show_assessment/${id}`)
            .then(
                (res) => {
                    setAssessedCandidateData(
                        JSON.parse(res.data.assessed_candidate)
                    );
                    //   console.log(res.data.assessed_candidate)
                },
                [id]
            );
    });
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
                                <div className="flex flex-col lg:flex-row justify-between mb-5 space-y-2">
                                    <div className="flex items-center justify-center">
                                        <h3
                                            className="text-2xl text-primary  uppercase font-semibold"
                                            style={{ textAlign: "center" }}
                                        >
                                            HR COMPETENCY ASSESSMENT FORM
                                        </h3>
                                    </div>
                                </div>
                                {/* <hr className= "pb-5 dark:border-t-white/10"/> */}

                                <div className="sm:grid grid-cols-12 gap-12 pb-5 space-y-5">
                                    <div className="md:col-span-12 col-span-12  my-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap ti-head-primary">
                                            <tbody>
                                                <tr className="!border-0">
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            JOB TITLE{" "}
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        ......................
                                                    </td>
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            {" "}
                                                            DATE
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        ......................
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            COST CENTER NAME{" "}
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        .........................
                                                    </td>
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            {" "}
                                                            COST CENTER NO
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        ......................
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            CANDIDATE NAME{" "}
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        .........................
                                                    </td>
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            INTERVIEWER NAME
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        ......................
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            SOURCE NAME{" "}
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        .........................
                                                    </td>
                                                    <td>
                                                        <div className="text-lg text-black">
                                                            TOTAL YEAR OF
                                                            EXPERIENCE
                                                        </div>
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        ......................
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="table-bordered rounded-md shadow overflow-auto dark:shadow-white/10">
                                    <table className="ti-custom-table border-0 ">
                                        <thead>
                                            <th colSpan={2} rowSpan={2}>
                                                Factor
                                            </th>
                                            <th>N/A (0)</th>
                                            <th>
                                                Below <br />
                                                Average (1)
                                            </th>
                                            <th>Average (2)</th>
                                            <th>Good (3)</th>
                                            <th>V.Good (4)</th>
                                            <th>Outstanding (5)</th>
                                            <th colSpan={2}>Comments</th>
                                        </thead>
                                        <tbody>
                                            <tr className="">
                                                <td colSpan={2}>
                                                    Education & Job Knowledge
                                                    <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse">
                                                        <span>
                                                            (Educational
                                                            qualifications &{" "}
                                                            <br />
                                                            professional related
                                                            knowledge)
                                                        </span>
                                                    </p>
                                                </td>
                                                <td className="text-center">
                                                    {formData.education_knowledge ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none justify-center"
                                                            id="education_knowledge"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.education_knowledge ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="education_knowledge-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.education_knowledge ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="education_knowledge-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {" "}
                                                    {formData.education_knowledge ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="education_knowledge-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {" "}
                                                    {formData.education_knowledge ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="education_knowledge-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {" "}
                                                    {formData.education_knowledge ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="education_knowledge-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td colSpan={2}>
                                                    {
                                                        formData.education_knowledge_remark
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <td colSpan={2}>
                                                    Relevant Job Experience
                                                    <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse">
                                                        <span>
                                                            (Quality & Skills
                                                            gained
                                                            <br /> from past
                                                            experience)
                                                        </span>
                                                    </p>
                                                </td>
                                                <td className="text-center">
                                                    {formData.relevant_experience ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="relevant_experience_remark"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.relevant_experience ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="relevant_experience_remark-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.relevant_experience ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="relevant_experience_remark-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.relevant_experience ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="relevant_experience_remark-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.relevant_experience ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="relevant_experience_remark-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.relevant_experience ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="relevant_experience_remark-6"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td colSpan={2}>
                                                    {
                                                        formData.relevant_experience_remark
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <td colSpan={2}>
                                                    Major Previous Achievements
                                                    <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse">
                                                        <span>
                                                            (the candidate major{" "}
                                                            <br />
                                                            previous
                                                            achievements related{" "}
                                                            <br />
                                                            to the position
                                                            requirements)
                                                        </span>
                                                    </p>
                                                </td>
                                                <td className="text-center">
                                                    {formData.major_achievement ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="major_achievement"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.major_achievement ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="major_achievement-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.major_achievement ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="major_achievement-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.major_achievement ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="major_achievement-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.major_achievement ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="major_achievement-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.major_achievement ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="major_achievement-6"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td colSpan={2}>
                                                    {
                                                        formData.major_achievement_remark
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="">
                                                <td colSpan={2}>
                                                    Language Fluency
                                                    <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse">
                                                        <span>
                                                            (the candidate
                                                            ability to
                                                            <br /> express him
                                                            self in English)
                                                        </span>
                                                    </p>
                                                </td>
                                                <td className="text-center">
                                                    {formData.language_fluency_id ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="language_fluency_id"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.language_fluency_id ===
                                                        "Below Average" && (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="language_fluency_id-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.language_fluency_id ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="language_fluency_id-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.language_fluency_id ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="language_fluency_id-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.language_fluency_id ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="language_fluency_id-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.language_fluency_id ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                            id="language_fluency_id-6"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td colSpan={2}>
                                                    {
                                                        formData.language_fluency_remark
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br />

                                <div className="table-bordered rounded-md shadow overflow-auto dark:shadow-white/10">
                                    <table className="ti-custom-table border-0 ">
                                        <thead className="bg-gray-50 dark:bg-black/20">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    colSpan={2}
                                                    className="py-3 ltr:pl-4 rtl:pr-4"
                                                >
                                                    Competencies
                                                </th>
                                                <th scope="col">N/A (0)</th>
                                                <th scope="col">
                                                    Below Average (1){" "}
                                                </th>
                                                <th scope="col">Average (2)</th>
                                                <th scope="col">Good (3)</th>
                                                <th scope="col">V.Good (4)</th>
                                                <th scope="col">
                                                    Outstanding (5)
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="!text-end"
                                                >
                                                    Comments
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th rowSpan={3}>
                                                    Core Competencies
                                                </th>
                                                <td className="">
                                                    Interactive Communication{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.interactive_communication ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="interactive_communication-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.interactive_communication ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="interactive_communication-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.interactive_communication ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="interactive_communication-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.interactive_communication ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="interactive_communication-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.interactive_communication ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="interactive_communication-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.interactive_communication ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="interactive_communication-6"
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
                                                        placeholder="Remark"
                                                        name="interactive_communication_remark"
                                                        value={
                                                            formData.interactive_communication_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "interactive_communication_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                {/* <td className=""></td> */}
                                                <td className="">
                                                    Accountability
                                                </td>
                                                <td className="text-center">
                                                    {formData.accountability ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="accountability-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.accountability ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="accountability-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.accountability ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="accountability-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.accountability ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="accountability-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.accountability ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="accountability-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.accountability ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="accountability-6"
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
                                                        placeholder="Remark"
                                                        name="accountability_remark"
                                                        value={
                                                            formData.accountability_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "accountability_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Work Excellence{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.work_excellence ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="work_excellence-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.work_excellence ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="work_excellence-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.work_excellence ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="work_excellence-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.work_excellence ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="work_excellence-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.work_excellence ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="work_excellence-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.work_excellence ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="work_excellence-6"
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
                                                        placeholder="Remark"
                                                        name="work_excellence_remark"
                                                        value={
                                                            formData.work_excellence_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "work_excellence_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="" rowSpan={12}>
                                                    Functional Competencies
                                                </th>
                                                <td className="">
                                                    Planning & Organizing
                                                </td>
                                                <td className="text-center">
                                                    {formData.planning_organizing ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="planning_organizing-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.planning_organizing ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="planning_organizing-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.planning_organizing ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="planning_organizing-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.planning_organizing ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="planning_organizing-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.planning_organizing ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="planning_organizing-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.planning_organizing ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="planning_organizing-6"
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
                                                        placeholder="Remark"
                                                        name="planning_organizing_remark"
                                                        value={
                                                            formData.planning_organizing_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "planning_organizing_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                {/* <td className=""></td> */}
                                                <td className="">
                                                    Problem Solving
                                                </td>
                                                <td className="text-center">
                                                    {formData.problem_solving ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="problem_solving-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.problem_solving ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="problem_solving-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.problem_solving ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="problem_solving-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.problem_solving ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="problem_solving-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.problem_solving ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="problem_solving-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.problem_solving ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="problem_solving-6"
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
                                                        placeholder="Remark"
                                                        name="problem_solving_remark"
                                                        value={
                                                            formData.problem_solving_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "problem_solving_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Analytical Ability{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.analytical_ability ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="analytical_ability-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.analytical_ability ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="analytical_ability-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.analytical_ability ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="analytical_ability-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.analytical_ability ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="analytical_ability-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.analytical_ability ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="analytical_ability-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.analytical_ability ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="analytical_ability-6"
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
                                                        placeholder="Remark"
                                                        name="analytical_ability_remark"
                                                        value={
                                                            formData.analytical_ability_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "analytical_ability_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Attention to Details{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.attention_details ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="attention_details-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.attention_details ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="attention_details-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.attention_details ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="attention_details-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.attention_details ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="attention_details-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.attention_details ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="attention_details-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.attention_details ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="attention_details-6"
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
                                                        placeholder="Remark"
                                                        name="attention_details_remark"
                                                        value={
                                                            formData.attention_details_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "attention_details_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Initiative{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.initiative ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="initiative-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.initiative ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="initiative-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.initiative ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="initiative-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.initiative ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="initiative-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.initiative ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="initiative-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.initiative ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="initiative-6"
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
                                                        placeholder="Remark"
                                                        name="initiative_remark"
                                                        value={
                                                            formData.initiative_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "initiative_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Multi-Tasking{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.multi_tasking ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="multi_tasking-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.multi_tasking ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="multi_tasking-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.multi_tasking ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="multi_tasking-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.multi_tasking ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="multi_tasking-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.multi_tasking ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="multi_tasking-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.multi_tasking ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="multi_tasking-6"
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
                                                        placeholder="Remark"
                                                        name="multi_tasking_remark"
                                                        value={
                                                            formData.multi_tasking_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "multi_tasking_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Continuous Improvement{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.continuous_improvement ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="continuous_improvement-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.continuous_improvement ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="continuous_improvement-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.continuous_improvement ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="continuous_improvement-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.continuous_improvement ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="continuous_improvement-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.continuous_improvement ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="continuous_improvement-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.continuous_improvement ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="continuous_improvement-6"
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
                                                        placeholder="Remark"
                                                        name="continuous_improvement_remark"
                                                        value={
                                                            formData.continuous_improvement_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "continuous_improvement_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Compliance{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.compliance ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="compliance-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.compliance ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="compliance-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.compliance ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="compliance-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.compliance ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="compliance-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.compliance ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="compliance-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.compliance ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="compliance-6"
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
                                                        placeholder="Remark"
                                                        name="compliance_remark"
                                                        value={
                                                            formData.compliance_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "compliance_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Creativity & Innovation{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.creativity_innovation ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="creativity_innovation-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.creativity_innovation ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="creativity_innovation-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.creativity_innovation ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="creativity_innovation-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.creativity_innovation ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="creativity_innovation-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.creativity_innovation ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="creativity_innovation-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.creativity_innovation ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="creativity_innovation-6"
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
                                                        placeholder="Remark"
                                                        name="creativity_innovation_remark"
                                                        value={
                                                            formData.creativity_innovation_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "creativity_innovation_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Negotiation{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.negotiation ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="negotiation-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.negotiation ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="negotiation-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.negotiation ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="negotiation-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.negotiation ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="negotiation-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.negotiation ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="negotiation-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.negotiation ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="negotiation-6"
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
                                                        placeholder="Remark"
                                                        name="negotiation_remark"
                                                        value={
                                                            formData.negotiation_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "negotiation_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Team Work{" "}
                                                </td>
                                                <td className="text-center">
                                                    {formData.team_work ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="team_work-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.team_work ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="team_work-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.team_work ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="team_work-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.team_work ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="team_work-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.team_work ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="team_work-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.team_work ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="team_work-6"
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
                                                        placeholder="Remark"
                                                        name="team_work_remark"
                                                        value={
                                                            formData.team_work_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "team_work_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="font-medium">
                                                    Adaptability/Flexibility
                                                </td>
                                                <td className="text-center">
                                                    {formData.adaptability_flexibility ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="adaptability_flexibility-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.adaptability_flexibility ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="adaptability_flexibility-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.adaptability_flexibility ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="adaptability_flexibility-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.adaptability_flexibility ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="adaptability_flexibility-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.adaptability_flexibility ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="adaptability_flexibility-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.adaptability_flexibility ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="adaptability_flexibility-6"
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
                                                        placeholder="Remark"
                                                        name="adaptability_flexibility_remark"
                                                        value={
                                                            formData.adaptability_flexibility_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "adaptability_flexibility_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="" rowSpan={2}>
                                                    "Managerial Competencies/Mid
                                                    Senior Mngt. Level"
                                                </th>
                                                <td className="">Leadership</td>
                                                <td className="text-center">
                                                    {formData.leadership ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="leadership-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.leadership ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="leadership-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.leadership ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="leadership-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.leadership ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="leadership-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.leadership ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="leadership-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.leadership ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="leadership-6"
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
                                                        placeholder="Remark"
                                                        name="leadership_remark"
                                                        value={
                                                            formData.leadership_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "leadership_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                {/* <td className=""></td> */}
                                                <td className="">
                                                    "Delegating, Managing &
                                                    Developing People"
                                                </td>
                                                <td className="text-center">
                                                    {formData.delegating_managing ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="delegating_managing-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.delegating_managing ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="delegating_managing-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.delegating_managing ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="delegating_managing-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.delegating_managing ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="delegating_managing-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.delegating_managing ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="delegating_managing-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.delegating_managing ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="delegating_managing-6"
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
                                                        placeholder="Remark"
                                                        name="delegating_managing_remark"
                                                        value={
                                                            formData.delegating_managing_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "delegating_managing_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="" rowSpan={2}>
                                                    "Managerial Competencies/Top
                                                    Mngt. Level"
                                                </th>
                                                <td className="">
                                                    Managing Change
                                                </td>
                                                <td className="text-center">
                                                    {formData.managing_change ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="managing_change-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.managing_change ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="managing_change-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.managing_change ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="managing_change-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.managing_change ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="managing_change-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.managing_change ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="managing_change-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.managing_change ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="managing_change-6"
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
                                                        placeholder="Remark"
                                                        name="managing_change_remark"
                                                        value={
                                                            formData.managing_change_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "managing_change_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                {/* <td className=""></td> */}
                                                <td className="">
                                                    ""Strategic Conceptual
                                                    Thinking"
                                                </td>

                                                <td className="text-center">
                                                    {formData.strategic_conceptual_thinking ===
                                                    "N/A" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="strategic_conceptual_thinking-1"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.strategic_conceptual_thinking ===
                                                    "Below Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="strategic_conceptual_thinking-2"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.strategic_conceptual_thinking ===
                                                    "Average" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="strategic_conceptual_thinking-3"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.strategic_conceptual_thinking ===
                                                    "Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="strategic_conceptual_thinking-4"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.strategic_conceptual_thinking ===
                                                    "V.Good" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="strategic_conceptual_thinking-5"
                                                            htmlFor="hs-checked-checkbox"
                                                            defaultChecked
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    {formData.strategic_conceptual_thinking ===
                                                    "Outstanding" ? (
                                                        <input
                                                            type="checkbox"
                                                            className="ti-form-checkbox mt-0.5"
                                                            id="strategic_conceptual_thinking-6"
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
                                                        placeholder="Remark"
                                                        name="strategic_conceptual_thinking_remark"
                                                        value={
                                                            formData.strategic_conceptual_thinking_remark
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "strategic_conceptual_thinking_remark",
                                                                e.target.value
                                                            )
                                                        }
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="" colSpan={2}>
                                                    Overall Rating
                                                </th>
                                                <td
                                                    colSpan={6}
                                                    className="text-center"
                                                >
                                                    {formData.overall_rating ===
                                                    "N/A" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-0 focus:ring-red-500 focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                            N/A
                                                            <span className="badge py-0.5 px-1.5 bg-red-800 text-white">
                                                                0
                                                            </span>
                                                        </button>
                                                    ) : formData.overall_rating ===
                                                      "Below Average" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-0 focus:ring-orange-500 focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                            Below Average
                                                            <span className="badge py-0.5 px-1.5 bg-orange-800 text-white">
                                                                1
                                                            </span>
                                                        </button>
                                                    ) : formData.overall_rating ===
                                                      "Average" ? (
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
                                                      "V.Good" ? (
                                                        <button className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10">
                                                            V.Good
                                                            <span className="badge py-0.5 px-1.5 bg-black/50 text-white">
                                                                4
                                                            </span>
                                                        </button>
                                                    ) : formData.overall_rating ===
                                                      "Outstanding" ? (
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

                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <br />
                                <div className="xl:overflow-hidden overflow-x-auto">
                                    <table className="ti-custom-table border-0">
                                        <tbody>
                                            <tr className="">
                                                <td
                                                    className="font-semibold !p-2"
                                                    colSpan={1}
                                                >
                                                    Main Strengths
                                                    <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse">
                                                        <span>
                                                            (The main Candidates
                                                            strength)
                                                        </span>
                                                    </p>
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    {formData.main_strength}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-bold !p-2 ">
                                                    Main Weakness
                                                    <p className="text-gray-500 dark:text-white/70 text-xs my-auto flex space-x-1 rtl:space-x-reverse">
                                                        <span>
                                                            (The main candidate
                                                            weakness)
                                                        </span>
                                                    </p>
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    {formData.main_weakness}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                    Birth Place
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    {formData.birth_place}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                    Residence Place
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    {formData.residence_place}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                    Current Package TZS
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    {formData.current_packages}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                    Agreed Salary
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    {formData.agreed_salary}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                    Required Notice
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    {formData.required_notes}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                    Recommended Job Title
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    {formData.job_title}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="overflow-auto">
                                    <table className="ti-custom-table border-0 whitespace-nowrap ti-head-primary">
                                        <thead>
                                            <tr>
                                                <th
                                                    colSpan={1}
                                                    className="text-center"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    colSpan={1}
                                                    className="text-center"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    colSpan={2}
                                                    className="text-center"
                                                >
                                                    Name/Remark
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="!border-0">
                                                <td
                                                    className="!p-2 font-medium !text-gray-500 dark:!text-white/70 "
                                                    colSpan={1}
                                                >
                                                    Relatibe Inside the Company
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-yes"
                                                        checked={
                                                            formData.relative_inside ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside-no"
                                                        checked={
                                                            formData.relative_inside ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="relative-inside-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>

                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={2}
                                                >
                                                    {formData.relative_name}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td
                                                    className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]"
                                                    colSpan={1}
                                                >
                                                    Do you Suffer from any
                                                    Chronic disease?
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="chronic_disease-yes"
                                                        checked={
                                                            formData.chronic_disease ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="chronic_disease-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="chronic_disease-no"
                                                        checked={
                                                            formData.chronic_disease ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="chronic_disease-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={2}
                                                >
                                                    {formData.chronic_remarks}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td
                                                    className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]"
                                                    colSpan={1}
                                                >
                                                    Did you have any Surgery
                                                    Operation before?
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="surgery_operation-yes"
                                                        checked={
                                                            formData.surgery_operation ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="surgery_operation-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="surgery_operation-no"
                                                        checked={
                                                            formData.surgery_operation ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="surgery_operation-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={2}
                                                >
                                                    {
                                                        formData.surgery_operation_remark
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td
                                                    className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]"
                                                    colSpan={1}
                                                >
                                                    (For Females Only) Are you
                                                    pregnant?
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="pregnant-yes"
                                                        checked={
                                                            formData.pregnant ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="pregnant-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="pregnant-no"
                                                        checked={
                                                            formData.pregnant ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="pregnant-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={2}
                                                >
                                                    {formData.pregnancy_months}
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td
                                                    className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]"
                                                    colSpan={1}
                                                >
                                                    Have you ever been employed
                                                    <br /> by this company
                                                    before?
                                                </td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="employed_before-yes"
                                                        checked={
                                                            formData.employed_before ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="employed_before-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="employed_before-no"
                                                        checked={
                                                            formData.employed_before ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="employed_before-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td>
                                                    {" "}
                                                    Can we do a reference check?
                                                </td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="reference_check-yes"
                                                        checked={
                                                            formData.reference_check ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="reference_check-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="reference_check-no"
                                                        checked={
                                                            formData.reference_check ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="reference_check-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                                {/* <td className="!p-2 !text-gray-500 dark:!text-white/70">Reference Name:  </td> */}
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    {formData.reference_remarks}
                                                </td>
                                            </tr>
                                            <tr></tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <table className="ti-custom-table border-0 whitespace-nowrap ti-head-primary">
                                        <thead>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </thead>
                                        <tbody>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]">
                                                    Recruiter Recommendation
                                                </td>
                                                <td className="!p-2"> :</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                    {/* <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="relative-inside"
                                                        defaultChecked
                                                    />
                                                    <label
                                                        htmlFor="hs-checked-checkbox"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        {
                                                            formData.recruiter_recommendations
                                                        }
                                                    </label> */}
                                                     <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="recruiter_recommendations-Accepted"
                                                        checked={
                                                            formData.recruiter_recommendations ===
                                                            "Accepted"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="recruiter_recommendations-Accepted"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Accepted
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                     <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="recruiter_recommendations-Not-Accepted"
                                                        checked={
                                                            formData.recruiter_recommendations ===
                                                            "Not Accepted"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="recruiter_recommendations-Not-Accepted"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Not Accepted
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="recruiter_recommendations-Waiting-List"
                                                        checked={
                                                            formData.recruiter_recommendations ===
                                                            "Waiting List"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="recruiter_recommendations-Waiting-List"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Waiting List
                                                    </label>
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td
                                                    className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]"
                                                    colSpan={1}
                                                >
                                                    Current Employer Entity
                                                </td>
                                                <td className="!p-2"> :</td>
                                                <td
                                                    className="!p-2 !text-gray-500 dark:!text-white/70"
                                                    colSpan={1}
                                                >
                                                  
                                                      <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="current_employed_entity-Private-Sector"
                                                        checked={
                                                            formData.current_employed_entity ===
                                                            "Private Sector"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="current_employed_entity-Private-Sector"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Private Sector
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="current_employed_entity-Public-Sector"
                                                        checked={
                                                            formData.current_employed_entity ===
                                                            "Public Sector"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="current_employed_entity-Public-Sector"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Public Sector
                                                    </label>
                                                    
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]">
                                                    Social Insurance Status
                                                </td>
                                                <td className="!p-2"> :</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                   
                                                      <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="social_insuarance_status-yes"
                                                        checked={
                                                            formData.social_insuarance_status ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="social_insuarance_status-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="social_insuarance_status-no"
                                                        checked={
                                                            formData.social_insuarance_status ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="social_insuarance_status-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]">
                                                    Ability to work at site
                                                </td>
                                                <td className="!p-2"> :</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                
                                                      <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="work_site-yes"
                                                        checked={
                                                            formData.work_site ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="work_site-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="work_site-no"
                                                        checked={
                                                            formData.work_site ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="work_site-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="!p-2 font-medium  dark:!text-white/70">
                                                    Ability to work out
                                                    <br /> side the Country
                                                </td>
                                                <td className="!p-2"> :</td>
                                                <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                   
                                                      <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="reallocation_place-yes"
                                                        checked={
                                                            formData.reallocation_place ===
                                                            "Yes"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="reallocation_place-yes"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        Yes
                                                    </label>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input
                                                        type="checkbox"
                                                        className="ti-form-checkbox mt-0.5 pointer-events-none"
                                                        id="reallocation_place-no"
                                                        checked={
                                                            formData.reallocation_place ===
                                                            "No"
                                                        }
                                                        disabled
                                                    />
                                                    <label
                                                        htmlFor="reallocation_place-no"
                                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                                    >
                                                        No
                                                    </label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <hr className="pb-5 dark:border-t-white/10" />
                            
                                 <div className= "sm:grid grid-cols-12 gap-6 pb-5 space-y-5">
								<div className= "lg:col-span-4 col-span-12 text-end ">
									<div className= "text-3xl text-primary text-center">...........................</div>
									<h3 className= "font-semibold text-center">Interviewer</h3>
								</div>
								<div className= "lg:col-span-4 col-span-12 text-end ">
									<div className= "text-3xl text-primary text-center">...........................</div>
									<h3 className= "font-semibold text-center">HR Manager</h3>
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
                                        `${
                                            import.meta.env.BASE_URL
                                        }hiring/hrinterview/show_assessment/` +
                                        id
                                    }
                                >
                                    <button
                                        type="button"
                                        className="w-20 !p-1 ti-btn ti-btn-danger"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AssessedCandidate;
