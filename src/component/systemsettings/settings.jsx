import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Applicants,
    Bitcoins,
    DshCoin,
    Ethereum,
    Golem,
    SessionsDevice,
    TargetReport,
    SettingsRevenue,
} from "../../common/chartData";
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import { UsersData, DepartmentData } from '/src/common/select2data';
import ALLImages from "../../common/imagesdata";
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import store from "../../redux/store";
import { connect } from "react-redux";
import { ThemeChanger } from "../../redux/Action";
import '../../assets/css/RolesCheckboxGrid.css';
import axios from "axios";

const Settings = ({ local_varaiable, ThemeChanger }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.Syntoverticalstyles == "doublemenu") {
            const theme = store.getState();
            ThemeChanger({ ...theme, toggled: "" });
        }
    }, []);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BAS

    // console.log('wazungu', local_varaiable)
    const [rolesData, setRolesData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const id = local_varaiable.user.id;

    useEffect(() => {
        axios.get(`${apiBaseUrl}/roles/retrive_roles`)
            .then((res) => {
                // console.log('API Response:', res.data);  // Log the entire response
                // setRolesData(res.data.roles);
                const sortedRoles = res.data.roles.sort((a, b) => a.name.length - b.name.length);
                setRolesData(sortedRoles);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const [users, setUsers] = useState([]);


    // console.log('datatata', allRoles)
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

    //  let navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: '',
        role_id: [],
        error_list: [],
    });

    const handleInputChange = (stepName, value) => {
        if (stepName === "role_id") {
            setFormData((prevData) => {
                const roleIds = prevData.role_id.includes(value)
                    ? prevData.role_id.filter((id) => id !== value) // Uncheck
                    : [...prevData.role_id, value]; // Check

                return {
                    ...prevData,
                    role_id: roleIds,
                    error_list: { ...prevData.error_list, [stepName]: null },
                };
            });
        } else {
            // Handle other input types
            setFormData((prevData) => ({
                ...prevData,
                [stepName]: value,
                error_list: { ...prevData.error_list, [stepName]: null },
            }));
        }
    };

    const handleSubmit = async (e) => {
        // Handle form submission logic here
        e.preventDefault();
        // console.log('Form submitted:', formData);
        const DataToSend = {
            user_id: formData?.user_id,
            role_id: formData.role_id,


        };
        setIsLoading(true)
        try {

            const resp = await axios.post(`${apiBaseUrl}/roles/add_user_roles`, DataToSend, {
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
                )).join('\n');

                swal({
                    title: 'failed',
                    text: formattedErrors,
                    icon: 'error',
                    button: 'OK',
                });
            } else if (resp.data.status === 500) {
                swal({
                    title: 'failed',
                    text: resp.data.message,
                    icon: 'warning',
                    button: 'ok',
                })
                setIsLoading(false)
                // Additional logic or state updates after successful update
            } else if (resp.data.status === 200) {
                swal({
                    title: 'Success',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false,
                }).then(() => {
                    navigate('/manage_roles/');
                });
            }
            setIsLoading(false);
        }
        catch (error) {
            console.error("Unexpected error:", error.message);
        };
        setIsLoading(false)
    };



    return (
        <div>
            <PageHeader
                currentpage="System Settings"
                activepage="Home"
                mainpage="Settings"
            />

            <div className="col-span-12 xl:col-span-12">
                <div className="box">
                    <div className="box-header">
                        <h5 className="box-title">Roles and Access</h5>
                    </div>
                    <div className="box-body">
                        <form className="ti-validation" noValidate onSubmit={handleSubmit}></form>

                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="ti-form-label mb-0">User Name <span style={{ color: "red" }}> *</span></label>
                                <Creatable classNamePrefix="react-select" name="user_id" options={users} onChange={(selectedOption) => handleInputChange(["user_id"], selectedOption ? selectedOption.value : null)} value={users.find((option) => option.value === formData.user_id)} />
                                {/* <span className="text-danger">{formData.error_list.interviewer}</span> */}
                            </div>


                        </div>

                        <div className="box-body">
                            <div className="space-y-3">

                                <div className="roles-grid">
                                    {rolesData.map((role) => (
                                        <div key={role.id} className="role-item">
                                            <input
                                                type="checkbox"
                                                name="role_id"
                                                className="ti-form-checkbox mt-0.5"
                                                id={`checkbox-${role.id}`}
                                                onChange={(e) => handleInputChange("role_id", role.id)}
                                            />
                                            <label
                                                htmlFor={`checkbox-${role.id}`}
                                                className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                            >
                                                {role.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="float-end">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="ti-btn ti-btn-success justify-center"
                                    disabled={isLoading} // Disable the button when loading
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="ti-spinner text-white" role="status" aria-label="loading">
                                                <span className="sr-only">Loading...</span>
                                            </span>
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <i className="ti ti-send"></i>
                                            Update Roles
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Settings);

// export default system Settings;
