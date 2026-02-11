import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tag, Button, Space, Modal, message } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, SendOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { getActiveRole, canPerformWorkflowAction, filterItemsByActiveRole, getAvailableActions } from "/src/utility/roleHelper";
import BulkInitiateEndContract from "../EndContract/BulkInitiateEndContract";

const MutualAgreementList = ({ local_varaiable }) => {
  const userRoles = local_varaiable?.roles || [];
  const activeRole = getActiveRole();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [endContracts, setEndContracts] = useState([]);
  const [filteredEndContracts, setFilteredEndContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEndContract, setSelectedEndContract] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [bulkModalVisible, setBulkModalVisible] = useState(false);

  useEffect(() => {
    fetchEndContracts();
  }, []);

  useEffect(() => {
    fetchEndContracts();
  }, [location.pathname]);

  useEffect(() => {
    const handleRoleChange = () => {
      fetchEndContracts();
    };
    window.addEventListener('roleChanged', handleRoleChange);
    return () => window.removeEventListener('roleChanged', handleRoleChange);
  }, []);

  useEffect(() => {
    setFilteredEndContracts(endContracts);
  }, [endContracts, activeRole]);

  const fetchEndContracts = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/employees/exits/mutual_agreement/show_all_mutual_agreements`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setEndContracts(response.data.data || []);
      } else {
        console.error('Failed to fetch mutual agreements:', response.data.message);
        setEndContracts([]);
      }
    } catch (error) {
      console.error('Error fetching mutual agreements:', error);
      setEndContracts([]);
    } finally {
      setLoading(false);
    }
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
      return 'truncate whitespace-nowrap inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary/80';
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

  const handleDeleteClick = (endContract) => {
    setSelectedEndContract(endContract);
    setDeleteModalVisible(true);
  };

  const handleSubmitForReview = async (endContract) => {
    try {
      const result = await Swal.fire({
        title: 'Submit for Review?',
        text: `Are you sure you want to submit "${endContract.employee_name}'s" mutual agreement for review?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#b2000a',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, Submit',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        setLoading(true);
        const token = sessionStorage.getItem('token');
        
        const response = await axios.post(
          `${apiBaseUrl}/employees/exits/mutual_agreement/submit_mutual_agreement/${endContract.id}`,
          { action: 'submit' },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Mutual agreement submitted for review successfully.',
            icon: 'success',
            confirmButtonColor: '#b2000a'
          });
          fetchEndContracts();
        } else {
          throw new Error(response.data.message || 'Failed to submit mutual agreement');
        }
      }
    } catch (error) {
      console.error('Error submitting mutual agreement:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || error.message || 'Failed to submit mutual agreement for review.',
        icon: 'error',
        confirmButtonColor: '#b2000a'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEndContract) return;

    setDeleting(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(
        `${apiBaseUrl}/employees/exits/mutual_agreement/delete_mutual_agreement/${selectedEndContract.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        message.success('Mutual agreement deleted successfully');
        fetchEndContracts();
        setDeleteModalVisible(false);
        setSelectedEndContract(null);
      } else {
        message.error(response.data.message || 'Failed to delete mutual agreement');
      }
    } catch (error) {
      console.error('Error deleting mutual agreement:', error);
      message.error(error.response?.data?.message || 'Failed to delete mutual agreement');
    } finally {
      setDeleting(false);
    }
  };

  const handleWorkflowAction = async (endContract, action) => {
    const actionText = {
      'approve': 'Approve',
      'reject': 'Reject'
    };

    const result = await Swal.fire({
      title: `${actionText[action]} Mutual Agreement`,
      html: `
        <p>Are you sure you want to ${action} the mutual agreement for <strong>${endContract.employee_name}</strong>?</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: actionText[action],
      cancelButtonText: 'Cancel',
      confirmButtonColor: action === 'approve' ? '#52c41a' : '#ff4d4f',
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('token');
        const endpoint = `${apiBaseUrl}/employees/exits/endcontract/${action}_endcontract`;
        
        const response = await axios.post(
          endpoint,
          {
            endcontract_id: endContract.id,
            action: action
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 200) {
          Swal.fire({
            title: 'Success',
            text: `Mutual agreement ${action}ed successfully`,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          });
          fetchEndContracts();
        } else {
          Swal.fire({
            title: 'Error',
            text: response.data.message || `Failed to ${action} mutual agreement`,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          });
        }
      } catch (error) {
        console.error(`Error ${action}ing mutual agreement:`, error);
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || `Failed to ${action} mutual agreement`,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Mutual Agreement Exit</h1>

        <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
          <li className="text-sm">
            <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to={`${import.meta.env.BASE_URL}dashboards/normal`}>
              Home
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
            </Link>
          </li>
          <li className="text-sm">
            <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to={`${import.meta.env.BASE_URL}exits/mutual_agreements`}>
              Mutual Agreement Exit
            </Link>
          </li>
        </ol>
      </div>

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex">
                <h5 className="box-title my-auto">Mutual Agreement Exit List</h5>
                <div className="space-y-2" style={{ display: 'flex', gap: '10px' }}>
                  <Link to={`${import.meta.env.BASE_URL}exits/mutual_agreements/add`}>
                    <button type="button" className="ti-btn ti-btn-primary" style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}>
                      <i className="ti ti-user-plus w-3.5 h-3.5"></i> Create Mutual Agreement
                    </button>
                  </Link>
                  <button 
                    type="button" 
                    className="ti-btn ti-btn-primary" 
                    style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                    onClick={() => setBulkModalVisible(true)}
                  >
                    <i className="ti ti-users w-3.5 h-3.5"></i> Bulk Initiate Exit
                  </button>
                </div>
              </div>
            </div>
            <div className="box-body">
              <div className="table-responsive">
                <table className="table whitespace-nowrap min-w-full table-bordered"
                       style={{ border: '1px solid #e5e7eb' }}>
                  <thead style={{ backgroundColor: '#f9fafb' }}>
                    <tr>
                      <th scope="col" className="text-start" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>S/N</th>
                      <th scope="col" className="text-start" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>Employee Name</th>
                      <th scope="col" className="text-start" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>Department</th>
                      <th scope="col" className="text-start" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>Job Title</th>
                      <th scope="col" className="text-start" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>End Date</th>
                      <th scope="col" className="text-start" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>Status</th>
                      <th scope="col" className="text-start" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>Stage</th>
                      <th scope="col" className="text-start" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>Created Date</th>
                      <th scope="col" className="text-start" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="9" className="text-center align-middle" style={{ border: '1px solid #e5e7eb', padding: '12px 8px', minHeight: '200px', verticalAlign: 'middle' }}>
                          <div className="relative flex items-center justify-center w-full py-12">
                            <div className="ti-spinner text-danger" role="status" aria-label="loading" style={{ fontSize: '48px' }}>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <span className="absolute inset-0 flex items-center justify-center text-danger font-semibold text-xs uppercase tracking-wider">SOCRATE</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredEndContracts.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center py-4 text-gray-500" style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>
                          No mutual agreement exits found
                        </td>
                      </tr>
                    ) : (
                      filteredEndContracts.map((endContract, index) => (
                        <tr 
                          key={endContract.id}
                          onClick={(e) => {
                            if (e.target.closest('td:last-child') || e.target.closest('button') || e.target.closest('a')) {
                              return;
                            }
                            navigate(`${import.meta.env.BASE_URL}exits/mutual_agreements/${endContract.id}`);
                          }}
                          style={{ cursor: 'pointer' }}
                          className="hover:bg-gray-50"
                        >
                          <td style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>{index + 1}</td>
                          <td style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>
                            <div className="font-medium text-gray-900">
                              {endContract.employee_name}
                            </div>
                          </td>
                          <td style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>{endContract.department_name}</td>
                          <td style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>{endContract.job_title}</td>
                          <td style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>
                            {endContract.end_date ? dayjs(endContract.end_date).format('DD MMM YYYY') : '-'}
                          </td>
                          <td style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>
                            <span className={getStatusColor(endContract.status)}>
                              {endContract.status}
                            </span>
                          </td>
                          <td style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>
                            <span className={getStageColor(endContract.stage)}>
                              {endContract.stage}
                            </span>
                          </td>
                          <td style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }}>
                            {dayjs(endContract.created_at).format('DD MMM YYYY')}
                          </td>
                          <td style={{ border: '1px solid #e5e7eb', padding: '12px 8px' }} onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-info"
                              title="View"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                navigate(`${import.meta.env.BASE_URL}exits/mutual_agreements/${endContract.id}`);
                              }}
                            >
                              <i className="ti ti-eye"></i>
                            </button>
                            &nbsp;&nbsp;
                            
                            {endContract.status === 'Draft' && (
                              <>
                                <Link to={`${import.meta.env.BASE_URL}exits/mutual_agreements/edit/${endContract.id}`} onClick={(e) => e.stopPropagation()}>
                                  <button
                                    type="button"
                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-primary"
                                    title="Edit"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <i className="ti ti-pencil"></i>
                                  </button>
                                </Link>
                                &nbsp;&nbsp;
                                <button
                                  type="button"
                                  className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger"
                                  onClick={(e) => { e.stopPropagation(); handleDeleteClick(endContract); }}
                                  title="Delete"
                                >
                                  <i className="ti ti-trash"></i>
                                </button>
                                &nbsp;&nbsp;
                                <button
                                  type="button"
                                  className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
                                  onClick={(e) => { e.stopPropagation(); handleSubmitForReview(endContract); }}
                                  title="Submit for Review"
                                >
                                  <i className="ti ti-send"></i>
                                </button>
                                &nbsp;&nbsp;
                              </>
                            )}
                            
                            {activeRole && getAvailableActions(activeRole, endContract, 'stage').map(action => {
                              if (action === 'approve') {
                                return (
                                  <button
                                    key={action}
                                    type="button"
                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-success"
                                    onClick={(e) => { e.stopPropagation(); handleWorkflowAction(endContract, action); }}
                                    title="Approve"
                                  >
                                    <i className="ti ti-check-double"></i>
                                  </button>
                                );
                              }
                              if (action === 'reject') {
                                return (
                                  <button
                                    key={action}
                                    type="button"
                                    className="w-8 h-8 ti-btn rounded-full p-0 transition-none focus:outline-none ti-btn-soft-danger"
                                    onClick={(e) => { e.stopPropagation(); handleWorkflowAction(endContract, 'reject'); }}
                                    title="Reject"
                                  >
                                    <i className="ti ti-x"></i>
                                  </button>
                                );
                              }
                              return null;
                            })}
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
        title="Delete Mutual Agreement"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedEndContract(null);
        }}
        confirmLoading={deleting}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete the mutual agreement for{' '}
          <strong>{selectedEndContract?.employee_name}</strong>?
        </p>
        <p className="text-red-600 text-sm mt-2">
          This action cannot be undone.
        </p>
      </Modal>

      <BulkInitiateEndContract
        visible={bulkModalVisible}
        onCancel={() => setBulkModalVisible(false)}
        onSuccess={() => {
          fetchEndContracts();
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  local_varaiable: state
});

export default connect(mapStateToProps)(MutualAgreementList);

