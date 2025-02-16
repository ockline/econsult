import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { fetchUserRolesData } from "../../common/employeesdata";
import ALLImages from "../../common/imagesdata";
import Creatable from "react-select/creatable";
import DatePicker from 'react-datepicker';
import store from "../../redux/store";
import { connect } from "react-redux";
import { ThemeChanger } from "../../redux/Action";
import '../../assets/css/RolesCheckboxGrid.css'; 
import axios from "axios";
import Swal from "sweetalert2";

const UserRoles = ({ local_varaiable, ThemeChanger }) => {
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
    
    const [searchQuery, setSearchQuery] = useState(''); // for Searching
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

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
    
    //return all user assigned roles 
    
    const [usersRoles, setUserRoles] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRoles = await fetchUserRolesData();
                setUserRoles(userRoles);
                // console.log(employeeDetails);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);
    

    
    function Style2() {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You want to remove this role(s)?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#5e76a6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, remove it!',
  });
}

    
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
    e.preventDefault();

    // Prompt the confirmation dialog
    const result = await Style2();

    if (result.isConfirmed) {
        // If the user confirmed, proceed with the deletion
        const DataToSend = {
            user_id: formData?.user_id,
            role_id: formData.role_id,
        };

        console.log('Form submitted:', DataToSend);
        setIsLoading(true);

        try {
            const resp = await axios.delete(`${apiBaseUrl}/roles/remove_user_roles`, {
                headers: {
                    "Content-Type": "application/json",
                },
                data: DataToSend,
            });

            if (resp.data.validator_err) {
                const validationErrors = resp.data.validator_err;
                setFormData((prevData) => ({
                    ...prevData,
                    error_list: validationErrors,
                }));

                const formattedErrors = Object.keys(validationErrors).map((field) => (
                    `${validationErrors[field].join(', ')}`
                )).join('\n');

                swal({
                    title: 'Sorry! Operation failed',
                    text: formattedErrors,
                    icon: 'error',
                    button: 'OK',
                });
            } else if (resp.data.status === 500) {
                swal({
                    title: 'Sorry! Operation failed',
                    text: resp.data.message,
                    icon: 'warning',
                    button: 'ok',
                });
                setIsLoading(false);
            } else if (resp.data.status === 200) {
                swal({
                    title: 'Success',
                    text: resp.data.message,
                    icon: 'success',
                    button: 'ok',
                    closeOnClickOutside: false,
                }).then(() => {
                    refreshUserRoles();
                    setFormData({
                        user_id: '',
                        role_id: [],
                        error_list: [],
                    });
                });
            }
        } catch (error) {
            console.error("Unexpected error:", error.message);
        } finally {
            setIsLoading(false);
        }
    } else {
        // If the user canceled, do nothing
        setIsLoading(false);
    }
};

    const filteredData = usersRoles.filter((roles) =>
        roles.user_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //*********************Pagination */
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Add this function to refresh the roles data
    const refreshUserRoles = async () => {
        try {
            const userRoles = await fetchUserRolesData();
            setUserRoles(userRoles);
        } catch (error) {
            console.error('Error fetching updated roles:', error.message);
        }
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
                        <h5 className="box-title">Manage Roles</h5>
                    </div>
                    <div className="box-body">
                        <form className="ti-validation" noValidate onSubmit={handleSubmit}>

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
                                    className="ti-btn ti-btn-danger justify-center"
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
                                            Remove Roles
                                        </>
                                    )}
                                </button>
                            </div>
                            </div>
                            </form>
                    </div>
                         <div className="box-body">
                        <div className="space-y-3">
                            <div className="col-span-12 lg:col-span-4">
                            <div className="relative sm:max-w-xs max-w-[210px]">
                                <label htmlFor="hs-table-search" className="sr-only">Search</label>
                                <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center pointer-events-none ltr:pr-4 rtl:pl-4">
                                    <i className="ti ti-search"></i>
                                </div>
                                <input type="text" name="hs-table-search" id="hs-table-search" className="p-2 ltr:pr-10 rtl:pl-10 ti-form-input" value={searchQuery} onChange={(ele) => setSearchQuery(ele.target.value)}
                                    placeholder="Search by employee name" />
                            </div>
                        </div>
                         <div className="table-bordered rounded-md overflow-auto" >
                                        <table className="ti-custom-table ti-custom-table-head" >
                                            <thead className="bg-gray-50 dark:bg-black/20">
                                        <tr>
                                                <th scope="col" className="py-3 ltr:pl-4 rtl:pr-4" style={{ backgroundColor: '#c1c2c2', width:'20 pixel'}}> S/No </th>
                                                    <th scope="col" colSpan={1} className="py-3 ltr:pl-4 rtl:pr-4" style={{ backgroundColor: '#c1c2c2' }}> Staff Name </th>
                                                  
                                                    <th scope="col" colSpan={1} className="!text-center" style={{ backgroundColor: '#c1c2c2' }}>Role Name</th>
                                                    <th scope="col" colSpan={1} className="!text-center" style={{ backgroundColor: '#c1c2c2' }}>Status</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(usersRoles) && usersRoles.map((role, index) => (

                                                     <tr className="product-list" key={role.id}>
                                                        <td>{index + 1 + indexOfFirstEntry}</td>
                                                        <td colSpan={1} >{role.user_name}</td>
                                                        <td colSpan={1} >{role.role_names}</td>
                                                        <td>
                                                {
                                                role.status === 1 ? (
                                                    <span className="badge bg-green-300 text-black">Active</span>
                                                ) : (<span className="badge bg-warning text-white">Not InActive</span>)
                                                }
                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                            </div>
                            </div>
                    <br />
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
        </div>
    );
};

const mapStateToProps = (state) => ({
    local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(UserRoles);

// export default system UserRoles;
