
import React, { useState, useEffect } from "react";
import { JobTitleData, PackageData, RegionData, RankingCriterialData, UsersData, PracticalTest } from '/src/common/select2data';
import { Link, useNavigate } from 'react-router-dom';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import Swal from "sweetalert2";
// import { RecruitmentData,DataToSubmit } from "/src/common/recruitmentdata";
import axios from "axios";



const AddCandidate = () => {

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        job_title_id: '',
        cost_center_id: '',
        cost_number: '',
        date: '',
        firstname: '',
        middlename: '',
        lastname: '',
        interviewer: '',
        technical_skill: '',
        relevant_experience: '',
        knowledge_equipment: '',
        quality_awareness: '',
        skill_remark: '',
        experience_remark: '',
        equipment_remark: '',
        awareness_remark: '',
        physical_capability: '',
        capability_remark: '',
        practical_test_id: '',
        final_recommendation: '',
        recommended_title: '',
        error_list: [],

    });

    const handleInputChange = (stepName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [stepName]: value,
            error_list: { ...prevData.error_list, [stepName]: null },
        }));
    };

    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        // Handle form submission logic here
        e.preventDefault();
        // console.log('Form submitted:', formData);
        const DataToSend = {
            job_title_id: formData?.job_title_id,
            cost_center_id: formData?.cost_center_id,
            cost_number: formData?.cost_number,
            date: formData?.date,
            firstname: formData?.firstname,
            middlename: formData?.middlename,
            lastname: formData?.lastname,
            interviewer: formData?.interviewer,
            technical_skill: formData?.technical_skill,
            relevant_experience: formData?.relevant_experience,
            knowledge_equipment: formData?.knowledge_equipment,
            quality_awareness: formData.quality_awareness,
            skill_remark: formData?.skill_remark,
            experience_remark: formData.experience_remark,
            equipment_remark: formData?.equipment_remark,
            awareness_remark: formData.awareness_remark,
            physical_capability: formData?.physical_capability,
            capability_remark: formData.capability_remark,
            practical_test_id: formData?.practical_test_id,
            final_recommendation: formData?.final_recommendation,
            recommended_title: formData?.recommended_title,

        };
        try {
            const resp = await axios.post(`${apiBaseUrl}/hiring/technical_interview/add_candidate`, DataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (resp.data.validator_err) {
                // Handle validation errors
                const validationErrors = resp.data.validator_err;

                // Update component state with validation errors
                setFormData((prevData) => ({
                    ...prevData,
                    error_list: validationErrors,
                }));
                // Format validation errors for display in SweetAlert
                const formattedErrors = Object.keys(validationErrors).map((field) => (
                    `${validationErrors[field].join(', ')}`
                )).join('\n\n');
                Swal.fire({
                    // text: " Welcome to Your Admin Page",
                    allowOutsideClick: false,
                    icon: 'error',
                    title: 'Oops...',
                    text: formattedErrors,
                    footer: 'Kindly Fill all part with red to Continue '
                });

            } else if (resp.data.status === 500) {
                swal({
                    title: 'Sorry! Operation failed',
                    text: resp.data.message,
                    icon: 'warning',
                    button: 'ok',
                })
                // Additional logic or state updates after successful update
            } else if (resp.data.status === 200) {
                swal({
                    title: 'Technical Interview Assessment is Assessed successfully',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false, // Ensure that the modal doesn't close when clicking outside
                })
                console.log(resp.data.id);
            }
        }
        catch (error) {
            console.error("Unexpected error:", error.message);
        };
    };
    // Job title  *********************
    const [job_titles, setJobTitles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const job_title = await JobTitleData();
                setJobTitles(job_title);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };
        fetchData();
    }, []);

    // Region  *********************

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const region = await RegionData();
                setRegions(region);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);

    // Package or Cost center names block *******************************
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const packages = await PackageData();
                setPackages(packages);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);

    // RankingCriterialData block *******************************
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rankings = await RankingCriterialData();
                setRankings(rankings);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    // Users names block *******************************
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await UsersData();
                setUsers(users);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);


    // Save Practical test  ************************************************

    const clearPracticalData = () => {
        setPracticalData({
            practical_test_id: '',
            test_marks: '',
            ranking_creterial_id: '',
            practicl_test_remark: '',
            error_list: {},
        });
    }

    const [practical, setPracticalData] = useState({

        practical_test_id: '',
        test_marks: '',
        ranking_creterial_id: '',
        practicl_test_remark: '',
        error_list: [],
    });

    const handlePracticalInputChange = (stepName, value) => {
        setPracticalData((prevData) => ({
            ...prevData,
            [stepName]: value,
            error_list: { ...prevData.error_list, [stepName]: null },
        }));
    };

    const SavePracticalTest = async (e, practical) => {
        e.preventDefault();
        const practicalData = {
            practical_test_id: practical?.practical_test_id,
            test_marks: practical?.test_marks,
            ranking_creterial_id: practical.ranking_creterial_id,
            practicl_test_remark: practical.practicl_test_remark
        }

        try {
            const res = await axios.post(`${apiBaseUrl}/hiring/technical_interview/practical_test`, practicalData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.data.validator_err) {
                // Handle validation errors
                const validationErrors = res.data.validator_err;

                // Update component state with validation errors
                setPracticalData((prevData) => ({
                    ...prevData,
                    error_list: validationErrors,
                }));
            }
            else if (res.data.status === 404) {
                swal({
                    title: 'Sorry! Operation failed',
                    text: res.data.message,
                    icon: 'warning',
                    button: 'ok',
                });
            } else if (res.data.status === 200) {
                swal({
                    title: 'Practical Test added Successfully',
                    text: res.data.message,
                    icon: 'success',
                    button: 'ok',
                }).then(() => {

                    clearPracticalData();
                });


            }
        } catch (error) {
            console.log('Error occurred:', error);

            if (error.response && error.response.status === 404) {
                console.log('Handling 404 error in catch block');
                swal({
                    title: 'Resource Not Found',
                    text: 'The requested resource was not found on the server.',
                    icon: 'error',
                    button: 'ok',
                })
            } else {
                console.error("Unexpected error:", error.message);
            }
        }
    }


    //  function Style3() {
    // 		const swalWithBootstrapButtons = Swal.mixin({
    // 			customClass: {
    // 			  confirmButton: 'ti-btn bg-secondary text-white hover:bg-secondary focus:ring-secondary dark:focus:ring-offset-secondary',
    // 			  cancelButton: 'ti-btn bg-danger text-white hover:bg-danger focus:ring-danger dark:focus:ring-offset-danger'
    // 			},
    // 			buttonsStyling: false
    // 		  })

    // 		  swalWithBootstrapButtons.fire({
    // 			title: 'Are you sure?',
    // 			text: "You want to complete this interview?",
    // 			icon: 'warning',
    // 			showCancelButton: true,
    // 			confirmButtonText: 'Yes, complete it!',
    // 			cancelButtonText: 'No, cancel!',
    // 			reverseButtons: true
    // 		  }).then((result) => {
    // 			if (result.isConfirmed) {
    // 			  swalWithBootstrapButtons.fire(
    // 				'Saved!',
    // 				'Your Technical Interview Assessment is Assessed successfully.',
    // 				'success'
    // 			  ).then(() => {
    //                     navigate('/hiring/recruitments/technical_interviewed');
    //            });
    // 			} else if (
    // 			  /* Read more about handling dismissals below */
    // 			  result.dismiss === Swal.DismissReason.cancel
    // 			) {
    // 			  swalWithBootstrapButtons.fire(
    // 				'Cancelled',
    // 				'Your imaginary file is safe :)',
    // 				'error'
    // 			  )
    // 			}
    // 		  })
    // 	 }
    function Style3() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'ti-btn bg-secondary text-white hover:bg-secondary focus:ring-secondary dark:focus:ring-offset-secondary',
                cancelButton: 'ti-btn bg-danger text-white hover:bg-danger focus:ring-danger dark:focus:ring-offset-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You want to complete this interview?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, complete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Saved!',
                    'Your Technical Interview Assessment is Assessed successfully.',
                    'success'
                ).then(() => {
                    // Make an asynchronous request to your controller
                    fetch(`${apiBaseUrl}/hiring/technical_interview/last_candidate`, {
                        method: 'GET', // or 'GET' depending on your API
                        headers: {
                            'Content-Type': 'application/json',
                            // Add any additional headers if needed
                        },
                        // Add any request body if needed
                        // body: JSON.stringify({ key: 'value' })
                    })
                        .then(response => response.json())
                        .then(data => {
                            // Handle the response from your controller
                            // console.log(data);
                            navigate('/hiring/recruitments/technical_interviewed');
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                );
            }
        });
    }

    return (
        <div>

            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Technical Interview</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`}>
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
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto">Technical Assessment Interview</h1>
                    <Link to={`${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={handleSubmit}>
                        {step === 1 && (

                            <div className="grid lg:grid-cols-3 gap-6">

                                <div className=" space-y-2">
                                </div>
                                <div className=" space-y-2">
                                    <h2 className="relative py-2 px-3 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                                    >
                                        First Page
                                        <span className="badge py-0.5 px-1.5 bg-black/50 text-white">1</span>
                                    </h2>
                                </div>
                                <div className=" space-y-2">
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Job Title <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="job_title_id" options={job_titles} onChange={(selectedOption) => handleInputChange(["job_title_id"], selectedOption ? selectedOption.value : null)} value={job_titles.find((option) => option.value === formData.job_title_id)} />
                                    <span className="text-danger">{formData.error_list.job_title_id}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Date<span style={{ color: "red" }}> *</span></label>
                                    <div className="flex rounded-sm overflow-auto">
                                        <div className="px-4 inline-flex items-center min-w-fit ltr:rounded-l-sm rtl:rounded-r-sm border ltr:border-r-0 rtl:border-l-0 border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10">
                                            <span className="text-sm text-gray-500 dark:text-white/70"><i
                                                className="ri ri-calendar-line"></i></span>
                                        </div>
                                        <DatePicker className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
                                            name="date" selected={formData.date} onChange={(date) => handleInputChange('date', date)}
                                            timeInputLabel="Time:" dateFormat="dd/MM/yyyy h:mm" showTimeInput
                                        />
                                        <span className="text-danger">{formData.error_list.date}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Cost Center Name</label>
                                    <Creatable classNamePrefix="react-select" name="cost_center_id" options={packages} onChange={(selectedOption) => handleInputChange(["cost_center_id"], selectedOption ? selectedOption.value : null)} value={packages.find((option) => option.value === formData.cost_center_id)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Cost Center Number </label>
                                    <input type="number" name="tin" className="ti-form-input" placeholder="Cost Center Number" value={formData.cost_number}
                                        onChange={(e) => handleInputChange('cost_number', e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">	Candidate FirstName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="firstname" className="my-auto ti-form-input" placeholder="Candidate firstname" value={formData.firstname}
                                        onChange={(e) => handleInputChange('firstname', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.firstname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Candidate MiddleName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="middlename" className="my-auto ti-form-input" placeholder="Middlename" value={formData.middlename}
                                        onChange={(e) => handleInputChange('middlename', e.target.value)} required />
                                    <span className="text-danger">{formData.error_list.middlename}</span>
                                </div> <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Candidate LastName <span style={{ color: "red" }}> *</span></label>
                                    <input type="text" name="lastname" className="my-auto ti-form-input" value={formData.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} placeholder="Candidate Lastname" required />
                                    <span className="text-danger">{formData.error_list.lastname}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Interviewer Name <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="interviewer" options={users} onChange={(selectedOption) => handleInputChange(["interviewer"], selectedOption ? selectedOption.value : null)} value={users.find((option) => option.value === formData.interviewer)} />
                                    <span className="text-danger">{formData.error_list.interviewer}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Technical skills  <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="technical_skill" options={rankings} onChange={(selectedOption) => handleInputChange(["technical_skill"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.technical_skill)} />
                                    <span className="text-danger">{formData.error_list.technical_skill}</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Technical Skill Comment</label>
                                    <input type="text" className="my-auto ti-form-input" placeholder="Technical skills  Comment" name="skill_remark" value={formData.skill_remark}
                                        onChange={(e) => handleInputChange('skill_remark', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Relevant Technical Experience  <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="relevant_experience" options={rankings} onChange={(selectedOption) => handleInputChange(["relevant_experience"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.relevant_experience)} />
                                    <span className="text-danger">{formData.error_list.relevant_experience}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Relevant Technical Experience  Comment</label>
                                    <input type="text" className="my-auto ti-form-input" placeholder="Relevant Technical Experience  Comment" name="experience_remark" value={formData.experience_remark}
                                        onChange={(e) => handleInputChange('experience_remark', e.target.value)} />
                                </div>


                                {/* Rest of Step 1 form fields */}
                            </div>
                        )}

                        {step === 2 && (

                            <div className="grid lg:grid-cols-3 gap-6 second-page none" id="new_page">
                                <div className=" space-y-2">
                                </div>
                                <div className=" space-y-2">
                                    <h2 className="relative py-1 px-2 inline-flex justify-center items-center gap-1 rounded-md border border-transparent font-semibold bg-secondary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                                    >
                                        Second Page
                                        <span className="badge py-0.5 px-1.5 bg-black/50 text-white">2</span>
                                    </h2>
                                </div>

                                <div className="space-y-2"></div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Knowledge of Tools and Equipment  <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="knowledge_equipment" options={rankings} onChange={(selectedOption) => handleInputChange(["knowledge_equipment"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.knowledge_equipment)} />
                                    <span className="text-danger">{formData.error_list.knowledge_equipment}</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Knowledge of Tools and Equipment Comment</label>
                                    <input type="text" className="my-auto ti-form-input" placeholder="Knowledge of Tools and Equipment  Comment" name="equipment_remark" value={formData.equipment_remark}
                                        onChange={(e) => handleInputChange('equipment_remark', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Quality and Safety awareness <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="quality_awareness" options={rankings} onChange={(selectedOption) => handleInputChange(["quality_awareness"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.quality_awareness)} />
                                    <span className="text-danger">{formData.error_list.quality_awareness}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Quality and Safety awareness Comment</label>
                                    <input type="text" className="my-auto ti-form-input" placeholder="Quality and Safety awareness Comment" name="awareness_remark" value={formData.awareness_remark}
                                        onChange={(e) => handleInputChange('awareness_remark', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Physical Capability  <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="physical_capability" options={rankings} onChange={(selectedOption) => handleInputChange(["physical_capability"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.physical_capability)} />
                                    <span className="text-danger">{formData.error_list.physical_capability}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Physical Capability  Comment</label>
                                    <input type="text" className="my-auto ti-form-input" placeholder="Physical Capability Comment" name="capability_remark" value={formData.capability_remark}
                                        onChange={(e) => handleInputChange('capability_remark', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Recommended Job Title  <span style={{ color: "red" }}> *</span></label>
                                    <Creatable classNamePrefix="react-select" name="recommended_title" options={job_titles} onChange={(selectedOption) => handleInputChange(["recommended_title"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === formData.recommended_title)} />
                                    <span className="text-danger">{formData.error_list.recommended_title}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="ti-form-label mb-0 font-bold text-lg">Final Recommendation <span style={{ color: "red" }}> *</span></label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="final_recommendation" onChange={(e) => handleInputChange('final_recommendation', e.target.value)} value="1" className="ti-form-radio" id="final_recommendation" />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70" >Accepted</span>
                                        </label>

                                        <label className="flex p-3 w-full bg-white border border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70">
                                            <input type="radio" name="final_recommendation" onChange={(e) => handleInputChange('final_recommendation', e.target.value)} value="0" className="ti-form-radio" id="final_recommendation-1" defaultChecked />
                                            <span className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70">Not Accepted</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}


                        <br />
                        <div>
                            {step > 1 && step < 2 && (
                                <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
                                    <i className="ti ti-arrow-narrow-left"></i>Previous
                                </button>
                            )}
                            {step > 1 && (
                                <button type="button" onClick={handlePreviousStep} className="ti-btn ti-btn-warning first_page justify-center">
                                    <i className="ti ti-arrow-narrow-left"></i>Previous
                                </button>
                            )}

                            {step < 2 && (
                                <button type="button" onClick={handleNextStep} className="ti-btn ti-btn-primary first_page justify-center">
                                    <i className="ti ti-arrow-narrow-right"></i>Next
                                </button>
                            )}

                            {step === 2 && (
                                <button type="button" onClick={handleSubmit} className="ti-btn ti-btn-secondary  justify-center">
                                    <i className="ti ti-send"></i>Save to Draft
                                </button>

                            )}{step === 2 && (<div className="float-end">
                                <button to="#" type="button" className="hs-dropdown-toggle py-2 px-3 ti-btn ti-btn-primary m-0 whitespace-nowrap" data-hs-overlay="#task-compose"><i className="ri ri-edit-line"></i> Add Practical Test</button>
                            </div>)}

                        </div>
                        <div id="task-compose" className="hs-overlay hidden ti-modal">
                            <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                                <div className="ti-modal-content">
                                    <div className="ti-modal-header">
                                        <h3 className="ti-modal-title font-bold text-lg"> Practical Test</h3>
                                        <button type="button" className="hs-dropdown-toggle ti-modal-close-btn" data-hs-overlay="#task-compose">
                                            <span className="sr-only">Close</span>
                                            <i className="ri-close-line"></i>
                                        </button>
                                    </div>
                                    <div className="ti-modal-body">
                                        <div className="space-y-3">
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0 font-bold text-lg">Test Number <span style={{ color: "red" }}> *</span></label>
                                                <Creatable classNamePrefix="react-select" name="practical_test_id" options={PracticalTest} onChange={(selectedOption) => handlePracticalInputChange(["practical_test_id"], selectedOption ? selectedOption.value : null)} value={PracticalTest.find((option) => option.value === practical.practical_test_id)} />
                                                <span className="text-danger">{formData.error_list.practical_test_id}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0 font-bold text-lg">Test Marks</label>
                                                <input type="number" className="my-auto ti-form-input" placeholder="Marks" name="test_marks" value={practical.test_marks}
                                                    onChange={(e) => handlePracticalInputChange('test_marks', e.target.value)} />
                                                <span className="text-danger">{practical.error_list.test_marks}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0 font-bold text-lg">Test Ranking  <span style={{ color: "red" }}> *</span></label>
                                                <Creatable classNamePrefix="react-select" name="ranking_creterial_id" options={rankings} onChange={(selectedOption) => handlePracticalInputChange(["ranking_creterial_id"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === practical.ranking_creterial_id)} />
                                                <span className="text-danger">{practical.error_list.ranking_creterial_id}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0 font-bold text-lg">Test Comment</label>
                                                <input type="text" className="my-auto ti-form-input" placeholder="Relevant Technical Experience  Comment" name="practicl_test_remark" value={practical.practicl_test_remark}
                                                    onChange={(e) => handlePracticalInputChange('practicl_test_remark', e.target.value)} />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="ti-modal-footer">
                                        <button type="button"
                                            className="hs-dropdown-toggle ti-btn ti-border font-medium bg-warning text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
                                            data-hs-overlay="#task-compose">
                                            Close
                                        </button>

                                        <button
                                            type="button"
                                            className="ti-btn ti-btn-primary show-example-btn"
                                            aria-label="Save Changes! Example: End of contract"
                                            id="ajax-btn"
                                            onClick={(e) => SavePracticalTest(e, practical)}><i className="ti ti-send"></i>save
                                        </button>

                                        <button
                                            type="button"
                                            className="ti-btn ti-btn-success show-example-btn"
                                            aria-label="Save Changes! Example: End of contract"
                                            id="ajax-btn-1"
                                            onClick={Style3}><i className="ti ti-send"></i>Submit to Complete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    {/* Block for Practical test */}



                </div>
            </div>
        </div>
    );
};
export default AddCandidate;
