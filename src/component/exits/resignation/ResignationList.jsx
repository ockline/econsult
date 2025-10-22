import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tag, Button, Space, Modal, message } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const ResignationList = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [resignations, setResignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedResignation, setSelectedResignation] = useState(null);

  useEffect(() => {
    fetchResignations();
  }, []);

  const fetchResignations = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/employees/exits/resignation/show_all_resignations`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setResignations(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching resignations:', error);
      message.error('Failed to fetch resignations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(
        `${apiBaseUrl}/employees/exits/resignation/delete_resignation/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        message.success('Resignation deleted successfully');
        fetchResignations();
        setDeleteModalVisible(false);
        setSelectedResignation(null);
      }
    } catch (error) {
      console.error('Error deleting resignation:', error);
      message.error('Failed to delete resignation');
    }
  };

  const showDeleteModal = (resignation) => {
    setSelectedResignation(resignation);
    setDeleteModalVisible(true);
  };

  const getStatusColor = (status) => {
    if (status === 'Draft') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-warning/10 text-warning/80';
    } else if (status === 'Submitted') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80';
    } else if (status === 'Under Review') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-info/10 text-info/80';
    } else if (status === 'Approved') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80';
    } else if (status === 'Rejected') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-danger/15 text-danger/80';
    }
    return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-gray/10 text-gray/80';
  };

  const getStageColor = (stage) => {
    if (stage === 'Initiated') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-default/10 text-default/80';
    } else if (stage === 'HR Review') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-info/10 text-info/80';
    } else if (stage === 'Manager Review') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-warning/10 text-warning/80';
    } else if (stage === 'Final Approval') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80';
    } else if (stage === 'Completed') {
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-success/10 text-success/80';
    }
    return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-gray/10 text-gray/80';
  };

  return (
    <div>
      {/* Breadcrumb and Header */}
      <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Exit Management</h1>

        <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
              Home
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
            </a>
          </li>
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}exits/resignations`}>
              Resignation Management
            </a>
          </li>
        </ol>
      </div>

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex">
                <h5 className="box-title my-auto">Employee Resignations</h5>
                <div className="space-y-2">
                  <Link to={`${import.meta.env.BASE_URL}exits/resignations/add`}>
                    <button type="button" className="ti-btn ti-btn-primary" style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}>
                      <i className="ti ti-user-plus w-3.5 h-3.5"></i> Add Resignation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="box-body">
              <div className="table-bordered rounded-sm ti-custom-table-head overflow-auto">
                <table className="ti-custom-table ti-custom-table-head whitespace-nowrap">
                  <thead className="bg-gray-50 dark:bg-black/20">
                    <tr className="">
                      <th scope="col" className="dark:text-white/80">S/no</th>
                      <th scope="col" className="dark:text-white/80">Employee ID</th>
                      <th scope="col" className="dark:text-white/80">Full Name</th>
                      <th scope="col" className="dark:text-white/80 min-w-[200px]">Department</th>
                      <th scope="col" className="dark:text-white/80">Job Title</th>
                      <th scope="col" className="dark:text-white/80">Resignation Date</th>
                      <th scope="col" className="dark:text-white/80">Status</th>
                      <th scope="col" className="dark:text-white/80">Stage</th>
                      <th scope="col" className="dark:text-white/80">Created Date</th>
                      <th scope="col" className="dark:text-white/80">Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {loading ? (
                      <tr>
                        <td colSpan="10" className="text-center py-8">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      resignations?.map((resignation, index) => (
                        <tr key={index} className="">
                          <td>{index + 1}</td>
                          <td>
                            <div className="flex space-x-3 rtl:space-x-reverse w-full">
                              <div className="block w-full my-auto">
                                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-300 min-w-[180px] truncate">
                                  {resignation.employee_no || 'N/A'}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>{resignation.employee_name}</td>
                          <td className="!text-success font-semibold text-base">{resignation.department_name}</td>
                          <td>
                            <div className="flex space-x-3 rtl:space-x-reverse text-start">
                              <div className="block my-auto">
                                <p className="block text-sm font-semibold my-auto text-gray-800 dark:text-white">
                                  {resignation.job_title}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>{dayjs(resignation.resignation_date).format('DD MMM YYYY')}</td>
                          <td>
                            <span className={getStatusColor(resignation.status)}>
                              {resignation.status}
                            </span>
                          </td>
                          <td>
                            <span className={getStageColor(resignation.stage)}>
                              {resignation.stage}
                            </span>
                          </td>
                          <td>{dayjs(resignation.created_at).format('DD MMM YYYY')}</td>
                          <td className="font-medium space-x-2 rtl:space-x-reverse">
                            <div className="hs-tooltip ti-main-tooltip">
                              <Link 
                                to={`${import.meta.env.BASE_URL}exits/resignations/view/${resignation.id}`}
                                className="m-0 hs-tooltip-toggle relative w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary"
                                style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                              >
                                <i className="ti ti-eye"></i>
                                <span
                                  className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 bg-gray-900 text-xs font-medium text-white shadow-sm dark:bg-slate-700"
                                  role="tooltip">
                                  View
                                </span>
                              </Link>
                            </div>
                            &nbsp;&nbsp;
                            <Link 
                              aria-label="anchor"
                              className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-secondary"
                              to={`${import.meta.env.BASE_URL}exits/resignations/edit/${resignation.id}`}
                            >
                              <i className="ti ti-pencil"></i>
                            </Link>
                            &nbsp;&nbsp;
                            <button
                              type="button"
                              className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger"
                              onClick={() => showDeleteModal(resignation)}
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
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Delete Resignation"
        open={deleteModalVisible}
        onOk={() => handleDelete(selectedResignation?.id)}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedResignation(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete the resignation for{" "}
          <strong>{selectedResignation?.employee_name}</strong>?
        </p>
      </Modal>
    </div>
  );
};

export default ResignationList;