import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Row, Col, Card, Descriptions, Tag, Button, Space, Timeline, Form, 
  Input, Modal, message, Divider 
} from 'antd';
import { 
  ArrowLeftOutlined, EditOutlined, SendOutlined, EyeOutlined, 
  CheckOutlined, CloseOutlined, RollbackOutlined, DownloadOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { getActiveRole, canPerformWorkflowAction } from '../../../utility/roleHelper';

const { TextArea } = Input;

const ViewEndContract = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [endContract, setEndContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [acceptanceModalVisible, setAcceptanceModalVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [form] = Form.useForm();
  const activeRole = getActiveRole();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchEndContract();
  }, [id]);

  useEffect(() => {
    // Listen for role change events
    const handleRoleChange = () => {
      fetchEndContract();
    };

    window.addEventListener('roleChanged', handleRoleChange);
    return () => window.removeEventListener('roleChanged', handleRoleChange);
  }, []);

  // Check if current user has already acted on this end contract
  const hasUserActed = () => {
    if (!endContract?.workflows || !activeRole) return false;
    
    const currentUserId = sessionStorage.getItem('userId') || '1';
    
    return endContract.workflows.some(workflow => 
      workflow.attended_by?.id?.toString() === currentUserId.toString()
    );
  };

  const fetchEndContract = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/employees/exits/endcontract/show_endcontract/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setEndContract(response.data.data);
      } else {
        message.error('Failed to fetch end contract details');
        navigate('/exits/endcontracts');
      }
    } catch (error) {
      console.error('Error fetching end contract:', error);
      message.error('Failed to fetch end contract details');
      navigate('/exits/endcontracts');
    } finally {
      setLoading(false);
    }
  };

  const handleWorkflowAction = async (action) => {
    const comments = document.getElementById('workflow-action-comments')?.value || '';

    const actionText = {
      'review': 'Review',
      'approve': 'Approve',
      'reject': 'Reject',
      'return': 'Return'
    };

    const result = await Swal.fire({
      title: `${actionText[action]} End Contract`,
      html: `
        <p>Are you sure you want to ${action} the end contract for <strong>${endContract.employee_name}</strong>?</p>
        ${comments ? `<p style="margin-top: 10px;"><strong>Your comments:</strong></p><p style="text-align: left; padding: 10px; background: #f0f2f5; border-radius: 4px;">${comments}</p>` : '<p style="color: #999; margin-top: 10px;">No comments provided</p>'}
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: actionText[action],
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#b2000a',
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('token');
        const endpoint = `${apiBaseUrl}/employees/exits/endcontract/${action}_endcontract`;
        
        const requestData = {
          endcontract_id: endContract.id,
          comments: comments,
          action: action
        };

        if (action === 'review') {
          requestData.hr_recommendations = comments || 'No specific recommendations';
        }

        const response = await axios.post(
          endpoint,
          requestData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 200) {
          Swal.fire({
            title: 'Success',
            text: `End contract ${action}ed successfully`,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          });
          
          const textarea = document.getElementById('workflow-action-comments');
          if (textarea) textarea.value = '';
          
          fetchEndContract();
        } else {
          Swal.fire({
            title: 'Error',
            text: response.data.message || `Failed to ${action} end contract`,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          });
        }
      } catch (error) {
        console.error(`Error ${action}ing end contract:`, error);
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || `Failed to ${action} end contract`,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReInitiate = async () => {
    const result = await Swal.fire({
      title: 'Re-initiate End Contract',
      html: `
        <p>Are you sure you want to re-initiate the end contract for <strong>${endContract.employee_name}</strong>?</p>
        <p style="color: #8c8c8c; font-size: 12px; margin-top: 10px;">This will change the status to "Submitted" and move it to the next stage for review.</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Re-initiate',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#52c41a',
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(
          `${apiBaseUrl}/employees/exits/endcontract/submit_endcontract/${endContract.id}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'End contract re-initiated successfully',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#52c41a'
          });
          fetchEndContract();
        } else {
          Swal.fire({
            title: 'Error',
            text: response.data.message || 'Failed to re-initiate end contract',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          });
        }
      } catch (error) {
        console.error('Error re-initiating end contract:', error);
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Failed to re-initiate end contract',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePreviewFile = (fileName, fileType) => {
    if (fileName) {
      setPreviewFile({
        name: fileName,
        type: fileType,
        url: `${apiBaseUrl}/exits/endcontract/${endContract.id}/file/${fileName}`
      });
      setPreviewModalVisible(true);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'default',
      'Submitted': 'processing',
      'Under Review': 'warning',
      'Approved': 'success',
      'Rejected': 'error',
      'Initiated': 'primary',
      'Reviewed': 'secondary',
    };
    return colors[status] || 'default';
  };

  const getStatusBgColor = (status) => {
    const colors = {
      'Initiated': '#1890ff',
      'Reviewed': '#6c757d',
      'Approved': '#52c41a',
      'Submitted': '#1890ff',
      'Under Review': '#faad14',
      'Rejected': '#ff4d4f',
      'Draft': '#d9d9d9',
    };
    return colors[status] || '#d9d9d9';
  };

  const generateContract = async (type) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const endpoint = type === 'employment' 
        ? `${apiBaseUrl}/employees/exits/endcontract/generate_employment_contract/${id}`
        : `${apiBaseUrl}/employees/exits/endcontract/generate_nonrenewal_contract/${id}`;

      const response = await axios.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}_contract_${endContract.employee_name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.success(`${type === 'employment' ? 'Employment' : 'Non-Renewal'} contract generated successfully`);
    } catch (error) {
      console.error(`Error generating ${type} contract:`, error);
      message.error(`Failed to generate ${type} contract`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !endContract) {
    return <div>Loading...</div>;
  }

  if (!endContract) {
    return <div>End contract not found</div>;
  }

  return (
    <div>
      {/* Breadcrumb and Header */}
      <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>View End Contract</h1>

        <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
              Home
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
            </a>
          </li>
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}exits/endcontracts`}>
              End Contract Management
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
            </a>
          </li>
          <li className="text-sm text-gray-500 dark:text-white/70" aria-current="page">
            View End Contract
          </li>
        </ol>
      </div>

      <Row gutter={[16, 16]}>
        {/* Left Column - Details */}
        <Col span={16}>
          {/* End Contract Details */}
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>End Contract Details</span>
                <button 
                  type="button" 
                  className="ti-btn ti-btn-primary" 
                  style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                  onClick={() => navigate('/exits/endcontracts')}
                >
                  <i className="ti ti-arrow-left w-3.5 h-3.5"></i> Back
                </button>
              </div>
            } 
            style={{ marginBottom: 16 }}
          >
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Employee Name" span={1}>
                {endContract.employee_name}
              </Descriptions.Item>
              <Descriptions.Item label="Department" span={1}>
                {endContract.department_name}
              </Descriptions.Item>
              <Descriptions.Item label="Job Title" span={1}>
                {endContract.job_title}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number" span={1}>
                {endContract.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="End Date" span={1}>
                {dayjs(endContract.end_date).format('DD MMM YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={1}>
                <Tag color={getStatusColor(endContract.status)}>
                  {endContract.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Postal Address" span={2}>
                {endContract.postal_address}
              </Descriptions.Item>
              <Descriptions.Item label="Remark" span={2}>
                {endContract.remark}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Employment Contract Details */}
          {endContract.employer_name && (
            <Card title="Employment Contract Details" style={{ marginBottom: 16 }}>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Employer Name" span={1}>
                  {endContract.employer_name}
                </Descriptions.Item>
                <Descriptions.Item label="Letter Title" span={1}>
                  {endContract.letter_title}
                </Descriptions.Item>
                <Descriptions.Item label="Signed Date" span={1}>
                  {endContract.signed_date ? dayjs(endContract.signed_date).format('DD MMM YYYY') : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Started Date" span={1}>
                  {endContract.started_date ? dayjs(endContract.started_date).format('DD MMM YYYY') : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Days Worked" span={1}>
                  {endContract.days_worked}
                </Descriptions.Item>
                <Descriptions.Item label="On Behalf Of" span={1}>
                  {endContract.on_behalf_of}
                </Descriptions.Item>
                <Descriptions.Item label="Designation" span={1}>
                  {endContract.designation}
                </Descriptions.Item>
                <Descriptions.Item label="HR Name" span={1}>
                  {endContract.hr_name}
                </Descriptions.Item>
                <Descriptions.Item label="Employee Designation" span={2}>
                  {endContract.employee_designation}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}

          {/* Attached Documents */}
          <Card title="Attached Documents">
            <Row gutter={[16, 16]}>
              {endContract.renewal_notice_file && (
                <Col span={8}>
                  <Card size="small" title="Renewal Notice">
                    <Button 
                      type="link" 
                      icon={<EyeOutlined />}
                      onClick={() => handlePreviewFile(endContract.renewal_notice_file, 'document')}
                    >
                      View File
                    </Button>
                  </Card>
                </Col>
              )}
              {endContract.signature_file && (
                <Col span={8}>
                  <Card size="small" title="HR Signature">
                    <Button 
                      type="link" 
                      icon={<EyeOutlined />}
                      onClick={() => handlePreviewFile(endContract.signature_file, 'image')}
                    >
                      View Signature
                    </Button>
                  </Card>
                </Col>
              )}
              {endContract.employee_signature_file && (
                <Col span={8}>
                  <Card size="small" title="Employee Signature">
                    <Button 
                      type="link" 
                      icon={<EyeOutlined />}
                      onClick={() => handlePreviewFile(endContract.employee_signature_file, 'image')}
                    >
                      View Signature
                    </Button>
                  </Card>
                </Col>
              )}
            </Row>
          </Card>
        </Col>

        {/* Right Column - Workflow Actions */}
        <Col span={8}>
          <Card 
            title="Workflow Actions" 
            style={{ position: 'sticky', top: 20 }}
          >
            {/* Timeline */}
            <div>
              <Timeline>
                {endContract.workflows?.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((workflow, index) => (
                  <Timeline.Item key={index} color={getStatusColor(workflow.status)}>
                    <div style={{ 
                      position: 'relative', 
                      padding: '20px', 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      border: '1px solid #f0f0f0',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      marginBottom: '16px',
                      minHeight: '120px'
                    }}>
                      {/* Function Name and Date */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginBottom: '20px' 
                      }}>
                        <strong style={{ 
                          fontSize: '16px', 
                          color: '#262626', 
                          fontWeight: 600 
                        }}>
                          {workflow.function_name}
                        </strong>
                        <span style={{ 
                          color: '#52c41a', 
                          fontSize: '13px', 
                          fontWeight: 500 
                        }}>
                          {dayjs(workflow.attended_date || workflow.created_at).format('DD MMM YYYY, hh:mm A')}
                        </span>
                      </div>

                      {/* Attended By */}
                      {workflow.attended_by && (
                        <div style={{ marginBottom: '20px' }}>
                          <div style={{ 
                            color: '#262626', 
                            fontSize: '14px', 
                            fontWeight: 500,
                            marginBottom: '2px'
                          }}>
                            {workflow.attended_by?.name || 'Unknown User'}
                          </div>
                          <div style={{ 
                            color: '#8c8c8c', 
                            fontSize: '12px' 
                          }}>
                            ({workflow.previous_stage || 'System'})
                          </div>
                        </div>
                      )}

                      {/* Comments */}
                      {workflow.function_name === 'End Contract Initiation' && endContract.remark && (
                        <div style={{ 
                          color: '#8c8c8c', 
                          fontSize: '13px', 
                          lineHeight: '1.5',
                          marginBottom: '20px'
                        }}>
                          {endContract.remark}
                        </div>
                      )}

                      {workflow.function_name !== 'End Contract Initiation' && workflow.comments && (
                        <div style={{ 
                          color: '#8c8c8c', 
                          fontSize: '13px', 
                          lineHeight: '1.5',
                          marginBottom: '20px'
                        }}>
                          {workflow.comments}
                        </div>
                      )}

                      {/* Recommendation */}
                      {workflow.recommendation && (
                        <div style={{ 
                          color: '#8c8c8c', 
                          fontSize: '13px', 
                          lineHeight: '1.5',
                          marginBottom: '20px'
                        }}>
                          <strong>Recommendation:</strong> {workflow.recommendation}
                        </div>
                      )}

                      {/* Status Badge */}
                      <div style={{ 
                        position: 'absolute', 
                        bottom: '20px', 
                        right: '20px'
                      }}>
                        <Tag 
                          style={{ 
                            margin: 0,
                            fontSize: '11px',
                            padding: '2px 8px',
                            fontWeight: 500,
                            borderRadius: '4px',
                            backgroundColor: getStatusBgColor(workflow.status),
                            color: '#fff',
                            border: `1px solid ${getStatusBgColor(workflow.status)}`
                          }}
                        >
                          {workflow.status}
                        </Tag>
                      </div>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>

            {/* Action Form */}
            {endContract.status !== 'Completed' && endContract.status !== 'Rejected' && !hasUserActed() && (
              <>
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: '2px solid #f0f2f5' }}>
                  <Form
                    layout="vertical"
                    onFinish={(values) => {
                      // This will be handled by individual button clicks
                    }}
                  >
                    <Form.Item
                      label="Comments"
                      name="comments"
                      rules={[{ required: false }]}
                    >
                      <TextArea
                        rows={4}
                        placeholder="Enter your comments here..."
                        id="workflow-action-comments"
                      />
                    </Form.Item>

                    <div style={{ marginTop: 16 }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        {/* Review and Return Buttons - Same Row */}
                        {((activeRole?.endsWith('R') || activeRole?.startsWith('IR') || activeRole === 'DEV' || activeRole === 'ADMIN')) && (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {/* Review Button */}
                            <Button
                              type="primary"
                              danger
                              icon={<EyeOutlined />}
                              onClick={() => handleWorkflowAction('review')}
                              loading={loading}
                              style={{ flex: 1, backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
                            >
                              Review
                            </Button>
                            
                            {/* Return Button */}
                            <Button
                              type="primary"
                              icon={<RollbackOutlined />}
                              onClick={() => handleWorkflowAction('return')}
                              loading={loading}
                              style={{ flex: 1, backgroundColor: '#faad14', borderColor: '#faad14', color: '#fff' }}
                            >
                              Return
                            </Button>
                          </div>
                        )}
                        
                        {/* Approve Button */}
                        {(activeRole?.endsWith('A') || activeRole?.startsWith('IR') || activeRole === 'DEV' || activeRole === 'ADMIN' || activeRole === 'MD') && (
                          <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            onClick={() => handleWorkflowAction('approve')}
                            loading={loading}
                            block
                            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                          >
                            Approve
                          </Button>
                        )}
                        
                        {/* Reject Button */}
                        {(activeRole?.endsWith('A') || activeRole?.startsWith('IR') || activeRole === 'DEV' || activeRole === 'ADMIN' || activeRole === 'MD') && (
                          <Button
                            type="primary"
                            danger
                            icon={<CloseOutlined />}
                            onClick={() => handleWorkflowAction('reject')}
                            loading={loading}
                            block
                          >
                            Reject
                          </Button>
                        )}

                        {/* Cancel Button */}
                        <Button
                          type="default"
                          onClick={() => {
                            const textarea = document.getElementById('workflow-action-comments');
                            if (textarea) textarea.value = '';
                          }}
                          block
                          style={{ marginTop: '8px', borderColor: '#d9d9d9', color: '#8c8c8c' }}
                        >
                          Cancel
                        </Button>
                      </Space>
                    </div>
                  </Form>
                </div>
              </>
            )}

            {/* Message when user has already acted */}
            {endContract.status !== 'Completed' && endContract.status !== 'Rejected' && hasUserActed() && (
              <div style={{ 
                marginTop: 24, 
                paddingTop: 24, 
                borderTop: '2px solid #f0f2f5',
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#f6ffed',
                border: '1px solid #b7eb8f',
                borderRadius: '6px'
              }}>
                <div style={{ color: '#52c41a', fontSize: '14px', fontWeight: 500 }}>
                  ✓ You have already taken action on this end contract
                </div>
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginTop: '4px' }}>
                  No further action is required from you at this stage
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* File Preview Modal */}
      <Modal
        title={`Preview: ${previewFile?.name}`}
        open={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPreviewModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />}
            href={previewFile?.url.replace('/file/', '/download/')}
            target="_blank"
            style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
          >
            Download
          </Button>
        ]}
        width={800}
      >
        {previewFile && (
          <div style={{ textAlign: 'center' }}>
            {previewFile.type === 'image' ? (
              <img 
                src={previewFile.url} 
                alt={previewFile.name}
                style={{ maxWidth: '100%', maxHeight: '500px' }}
              />
            ) : (
              <iframe
                src={previewFile.url}
                style={{ width: '100%', height: '500px', border: 'none' }}
                title={previewFile.name}
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewEndContract;
