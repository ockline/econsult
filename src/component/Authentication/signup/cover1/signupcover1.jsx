import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import ALLImages from '../../../../common/imagesData';
import { Helmet } from 'react-helmet';
import { DepartmentData,GroupSectionData, GroupDesignation, RegionData, EmployerData} from '/src/common/select2data';
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import axios from 'axios';
import swal from 'sweetalert';


const SignUpCover1 = (props) => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

  const [state, setState] = useState(() => ({
    firstname: '',
    middlename: '',
    lastname: '',
    phone: '',
    dob: '',
    gender_id: '',
    email: '',
     employer_id: '',
    password: '',
    confirm_password: '',
    designation_id: '',
    department_id: '',
    section_id: '',
    project_name: '',
    location_project: '',
    error_list: [],
  }))
  

    const handleInput = (name, value) => {
  setState((prevState) => ({
    ...prevState,
      [name]: value,
    error_list: { ...prevState.error_list, [name] : null },
  }));
    };
    
    
    const handleChange = (e, selectedOption) => {
  const name = e.target.name 
  const value = e ? e.target.value : selectedOption;

  // Check if the input is a select field
  if (selectedOption) {
    // Handle select field
    handleInput(name)
  } else {
    // Handle normal input field
    handleInput(name, value);
  }
};

    // start validate with form
    
  
    const saveUser = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        // End of handle submission

        // Assuming dataToSend is an object containing the user data
        const dataToSend = {
            firstname: state?.firstname,
            middlename: state?.middlename,
            lastname: state?.lastname,
            phone: state?.phone,
            dob: state?.dob,
            gender_id: state?.gender_id,
            email: state?.email,
            employer_id: state?.employer_id,
            password: state?.password,
            confirm_password: state?.confirm_password,
            designation_id: state?.designation_id,
            department_id: state?.department_id,
            section_id: state.section_id,
            project_name: state.project_name,
            location_project: state.location_project,
        };

        try {
            const res = await axios.post(`${apiBaseUrl}/users/add_user`, dataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        // "Content-Type": "application/json",  // Update content type if needed
                    },
                }
            );
            //  console.log('Full Response:', response.data);

            if (res.data.validator_err) {
                // Handle validation errors
                const validationErrors = res.data.validator_err;

                // Update component state with validation errors
                setState((prevState) => ({
                    ...prevState,
                    error_list: validationErrors,
                }));
            }
            else if(res.data.status === 500) {
                    swal({
                        title: "Failed to Create user",
                        text: res.data.message,
                        icon: "warning",
                        button: "ok",
                    });
                    // Additional logic or state updates after successful creation
                }
            else {
                alert('Successfuly saved');
                    // Additional logic or state updates after successful creation
                }
                           
            }       
        catch (error) {
            console.error("Unexpected error:", error.message);
        };
    }


    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dept = await DepartmentData();
                setDepartments(dept);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);

    // Unit Section  *********************

    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unit = await GroupSectionData();
                setSections(unit);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);

    //designation *********

    const [designations, setDesignations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const design = await GroupDesignation();

                setDesignations(design);
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

    // Employers   *********************

    const [employers, setEmployers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employer = await EmployerData();
                setEmployers(employer);
            } catch (error) {
                console.error("Error:", error.message);
            }
        };

        fetchData();
    }, []);
    

    
        /*   Starting of displaying department   */
        //Retrieve data from db
        // const [departments, setDepartments] = useState([]);

    
        return (
            <div className="flex justify-center min-h-screen align-middle">
                <Helmet>
                    <html dir='ltr' class="h-full"></html>
                    <body class="cover1 justify-center"></body>
                </Helmet>
                <main id="content"  className="">
                    <Link to={`${import.meta.env.BASE_URL}Authentication/signup/cover1/`} className="header-logo justify-center">
                        <br/><br/>
            <img src= {ALLImages('dark')} alt="logo" className="mx-auto block justify-center"/>
        </Link>
                <div className="mt-5 box ">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="col-span-12">
                            
                            <div className="box-body">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
                                    <p className="mt-3 text-sm text-gray-600 dark:text-white/70">
                                        Already have an account?
                                        <Link className="text-primary decoration-2 hover:underline font-medium" to={`${import.meta.env.BASE_URL}Authentication/signin/cover1`}> Sign in here</Link>
                                    </p>
                                </div>
                                <div className="mt-7">
                                    <form className="row g-3 ti-validation need-validation" noValidate onSubmit={saveUser}>
                                        <div className="grid lg:grid-cols-3 gap-6 space-y-4 lg:space-y-0">
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">First Name <span style={{ color: "red" }}> *</span></label>
                                                <input type="text" name="firstname" onChange={handleChange}
                                                    value={state.firstname} className="my-auto ti-form-input" placeholder="Firstname" required />
                                                 <span className="text-danger">{state.error_list.firstname}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Middle Name<span style={{ color: "red" }}> *</span></label>
                                                <input type="text" className="my-auto ti-form-input" name="middlename" onChange={handleChange}
                                                    value={state.middlename} placeholder="Middlename" required />
                                                 <span className="text-danger">{state.error_list.middlename}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Last Name<span style={{ color: "red" }}> *</span></label>
                                                <input type="text" name="lastname" onChange={handleChange}
                                                    value={state.lastname} className="my-auto ti-form-input" placeholder="Lastname"required />
                                                 <span className="text-danger">{state.error_list.lastname}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Phone Number<span style={{ color: "red" }}> *</span></label>
                                                <input type="number" name="phone" onChange={handleChange}
                                                    value={state.phone} className="my-auto ti-form-input"
                                                    placeholder="+2" required/>
                                                 <span className="text-danger">{state.error_list.phone}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Email Address<span style={{ color: "red" }}> *</span></label>
                                                <input type="email" name="email" className="my-auto ti-form-input"
                                                    placeholder="your@site.com" onChange={handleChange}
                                                    value={state.email} required/>
                                                 <span className="text-danger">{state.error_list.email}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Employer Name <span style={{ color: "red" }}> *</span></label>
                                                <Creatable classNamePrefix="react-select" name="employer_id" options={employers} onChange={(selectedOption) => handleInput(["employer_id"], selectedOption ? selectedOption.value : null)} value={employers.find((option) => option.value === state.employer_id)} required />
                                                 <span className="text-danger">{state.error_list.employer_id}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Password<span style={{ color: "red" }}> *</span></label>
                                                <input type="password" name="password" value={state.password} onChange={handleChange} className="ti-form-input" placeholder="password" required/>
                                                 <span className="text-danger">{state.error_list.password}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Confirm Password<span style={{ color: "red" }}> *</span></label>
                                                <input type="password" name="confirm_password" value={state.confirm_password} onChange={handleChange} className="ti-form-input" placeholder="password" required />
                                                 <span className="text-danger">{state.error_list.confirm_password}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Date of birth<span style={{ color: "red" }}> *</span></label>
                                                <input type="date" name="dob" value={state.dob} onChange={handleChange} className="my-auto ti-form-input"
                                                    placeholder="Date" required/>
                                                 <span className="text-danger">{state.error_list.dob}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Gender <span style={{ color: "red" }}> *</span></label>
                                                <ul className="flex flex-col sm:flex-row">
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none ltr:sm:first:rounded-tl-none rtl:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none ltr:sm:last:rounded-br-none rtl:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="hs-horizontal-list-group-item-radio-2"
                                                                    name="gender_id" value="1" onChange={handleChange} type="radio"
                                                                    className="ti-form-radio" />
                                                            </div>
                                                            <label htmlFor="hs-horizontal-list-group-item-radio-2"
                                                                className="ltr:ml-3 rtl:mr-3 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Male
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li
                                                        className="ti-list-group gap-x-2.5 bg-white border text-gray-800 ltr:sm:-ml-px rtl:sm:-mr-px sm:mt-0 ltr:sm:first:rounded-tr-none ltr:sm:first:rounded-tl-none rtl:sm:first:rounded-tr-none rtl:sm:first:rounded-tl-none ltr:sm:first:rounded-bl-sm rtl:sm:first:rounded-br-sm ltr:sm:last:rounded-bl-none ltr:sm:last:rounded-br-none rtl:sm:last:rounded-bl-none rtl:sm:last:rounded-br-none ltr:sm:last:rounded-tr-sm rtl:sm:last:rounded-tl-sm dark:bg-bgdark dark:border-white/10 dark:text-white">
                                                        <div className="relative flex items-start w-full">
                                                            <div className="flex items-center h-5">
                                                                <input id="hs-horizontal-list-group-item-radio-1"
                                                                    name="gender_id" value="2" onChange={handleChange} type="radio"
                                                                    className="ti-form-radio" defaultChecked />
                                                            </div>
                                                            <label htmlFor="hs-horizontal-list-group-item-radio-1"
                                                                className="ltr:ml-3 rtl:mr-3 block w-full text-sm text-gray-600 dark:text-white/70">
                                                                Female
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Department Name <span style={{ color: "red" }}> *</span></label>
                                              <Creatable classNamePrefix="react-select" name="department_id" options={departments} onChange={(selectedOption) => handleInput(["department_id"], selectedOption ? selectedOption.value : null)} value={departments.find((option) => option.value === state.department_id)} required
                                                />
                                                 <span className="text-danger">{state.error_list.department_id}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Section Name</label>
                                                <Creatable classNamePrefix="react-select" name="section_id" options={sections} onChange={(selectedOption) => handleInput(["section_id"], selectedOption ? selectedOption.value : null)} value={sections.find((option) => option.value === state.section_id)} />
                                                 {/* <span className="text-danger">{state.error_list.section_id}</span> */}
                                            </div>
                                            {/* <div className = "space-y-2">
                                    <label className = "ti-form-label mb-0">Role Name </label>
                                    <Creatable classNamePrefix="react-select"/>
                              </div> */}
                                          <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Designation <span style={{ color: "red" }}> *</span></label>
                                                <Creatable classNamePrefix="react-select" name="designation_id" options={designations}  onChange={(selectedOption) => handleInput(["designation_id"], selectedOption ? selectedOption.value : null)} value={designations.find((option) => option.value ===  state.designation_id)} required
                                                />
                                                 <span className="text-danger">{state.error_list.designation_id}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Project Name<span style={{ color: "red" }}> *</span></label>
                                                <input type="text" name="project_name" value={state.project_name} onChange={handleChange} className="ti-form-input" placeholder="Project name" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="ti-form-label mb-0">Location of the project </label>
                                                <Creatable classNamePrefix="react-select" name="location_project" options={regions} onChange={(selectedOption) => handleInput(["location_project"], selectedOption ? selectedOption.value : null)} value={regions.find((option) => option.value === state.location_project)} />
                                                
                                                </div>
                                                  <button type="submit" name="submit"
                                                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-success text-white hover:bg-info focus:outline-none focus:ring-0 focus:ring-info focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10 float-right">Register</button>
                                        </div>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</main>
            </div>
        );
    };

export default SignUpCover1;