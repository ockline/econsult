import React, { useState, useEffect } from "react";
import { JobTitleData, PackageData, RegionData, RankingCriterialData, UsersData, PracticalTest } from '/src/common/select2data';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAssessedCandidate } from "/src/common/recruitmentdata";
import Creatable from "react-select/creatable";
import Swal from "sweetalert2";
import axios from "axios";
import moment from 'moment';




const EditPracticalTest = () => {



    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    let navigate = useNavigate();
    const { id } = useParams();

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


    // update Practical test  ************************************************

    const [practicalData, setPracticalData] = useState([

        // practical_test_id = '',
        // test_marks = '',
        // ranking_creterial_id = '',
        // practicl_test_remark = '',
     

    ]);
    // useEffect(() => {
    //     axios.get(`${apiBaseUrl}/hiring/technical_interview/practical_candidate/${id}`).then((res) => {
    //         setPracticalData(res.data.practical_candidate)
    //         console.log(res.data.practical_candidate);
    //     })
    // }, [id])
    
    console.log('practicalData:', practicalData)

useEffect(() => {
    axios.get(`${apiBaseUrl}/hiring/technical_interview/practical_candidate/${id}`)
        .then((res) => {
            setPracticalData(res.data.practical_candidate); // wrap the object in an array
            console.log(res.data.practical_candidate);
        })
        .catch((error) => {
            console.error('Error fetching practical data:', error);
        });
}, [id]);
const handlePracticalInputChange = (index, field, value) => {
    setPracticalData((prevData) => {
        // Make sure prevData[index] exists before accessing its properties
        if (prevData[index]) {
            return prevData.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        [field]: value,
                        error_list: { ...item.error_list, [field]: null },
                    };
                }
                return item;
            });
        }
        // If prevData[index] doesn't exist, return the original state
        return prevData;
    });
};


    const updatePracticalTest = async (e, practical) => {
      
        e.preventDefault();
           
            const practicalData = {
                practical_test_id: practical?.practical_test_id,
                test_marks: practical?.test_marks,
                ranking_creterial_id: practical.ranking_creterial_id,
                practicl_test_remark: practical.practicl_test_remark,
                technical_interview_id: practical.technical_interview_id
            }
//  console.log('called',practicalData);
            try {
                const res = await axios.put(`${apiBaseUrl}/hiring/technical_interview/update_practical_candidate/` + id, practicalData);

                if (res.data.status === 500) {
                    swal({
                        title: 'Sorry! Operation failed',
                        text: res.data.message,
                        icon: 'warning',
                        button: 'ok',
                    });
                } else if (res.data.status === 200) {
                    swal({
                        title: 'Practical Test Updated Successfully',
                        text: res.data.message,
                        icon: 'success',
                        button: 'ok',
                    }).then(() => {

                        //  clearPracticalData();
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
            text: "You want to complete this technical interview?",
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
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Edit Technical Interview</h1>

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
                        </a>
                    </li>
                </ol>
            </div>
            <div className="box">
                <div className="box-header lg:flex lg:justify-between">
                    <h1 className="box-title my-auto">Update Practical Test Details</h1>
                    <Link to={`${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`} className="ti-btn ti-btn-primary m-0 py-2"><i className="ti ti-arrow-left"></i>Back</Link>
                </div>
                <div className="box-body">
                    <form className="ti-validation" noValidate onSubmit={updatePracticalTest}>
                        {Array.isArray(practicalData) && practicalData.map((practical, index) => (
                            <div key={index}>
                                {/* Update the 'practical' references to use the current array item */}
                                <div className="grid lg:grid-cols-2 gap-6" >
                                    <h3 className="font-semibold text-lg">Practical Test {index + 1}:</h3>
                                    <br />
                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0 font-bold text-lg">Test Number <span style={{ color: "red" }}> *</span></label>
                                        <Creatable classNamePrefix="react-select" name="practical_test_id" options={PracticalTest} onChange={(selectedOption) => handlePracticalInputChange(["practical_test_id"], selectedOption ? selectedOption.value : null)} value={PracticalTest.find((option) => option.value === practical.practical_practical_id)} />
                                        {/* <span className="text-danger">{technicalData.error_list.practical_test_id}</span> */}
                                    </div>
                                     <input type="hidden" className="my-auto ti-form-input"  name="technical_interview_id" value={practical.technical_interview_id}/>
                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0 font-bold text-lg">Test Marks</label>
                                        <input type="number" className="my-auto ti-form-input" placeholder="Marks" name="test_marks" value={practical.test_marks}
                                            onChange={(e) => handlePracticalInputChange(index,'test_marks', e.target.value)} />
                                        {/* <span className="text-danger">{test.error_list.test_marks}</span> */}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0 font-bold text-lg">Test Ranking  <span style={{ color: "red" }}> *</span></label>
                                        <Creatable classNamePrefix="react-select" name="ranking_creterial_id" options={rankings} onChange={(selectedOption) => handlePracticalInputChange(["ranking_creterial_id"], selectedOption ? selectedOption.value : null)} value={rankings.find((option) => option.value === practical.ranking_creterial_id)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0 font-bold text-lg">Test Comment</label>
                                        <input type="text" className="my-auto ti-form-input" placeholder="Relevant Technical Experience  Comment" name="practicl_test_remark" value={practical.practicl_test_remark}
                                            onChange={(e) => handlePracticalInputChange(index, 'practicl_test_remark', e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
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
            onClick={(e) => updatePracticalTest(e, practical)}
          >
            <i className="ti ti-send"></i> Save
          </button>
                                    </div>

                                </div>
                                <hr className="pb-5 dark:border-t-white/10" />
                            </div>

                            // <hr className="pb-5 dark:border-t-white/10" />

                        ))}
                        <div className="ti-modal-footer-1 sm:flex !block space-y-2 text-end">
                            <button type="button"
                                className="hs-dropdown-toggle ti-btn ti-border font-medium bg-danger text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
                                data-hs-overlay="#task-compose">
                                Close
                            </button>
                            <button
                                type="button"
                                className="ti-btn ti-btn-success show-example-btn"
                                aria-label="Save Changes! Example: End of contract"
                                id="ajax-btn-1"
                                onClick={Style3}><i className="ri-save-line"></i>Submit to Complete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EditPracticalTest;
