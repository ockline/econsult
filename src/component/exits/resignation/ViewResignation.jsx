import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Descriptions, Tag, Button, Space, Timeline, Modal, Form, Input, DatePicker, Upload, message } from "antd";
import { EditOutlined, EyeOutlined, FileTextOutlined, DownloadOutlined, SendOutlined, ArrowLeftOutlined, CheckOutlined, CloseOutlined, RollbackOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";
import { getActiveRole, canPerformWorkflowAction, getAvailableActions } from "../../../utility/roleHelper";
import Swal from "sweetalert2";

const { TextArea } = Input;

const ViewResignation = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [resignation, setResignation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [acceptanceModalVisible, setAcceptanceModalVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [form] = Form.useForm();
  const activeRole = getActiveRole();

  useEffect(() => {
    fetchResignation();
  }, [id]);

  useEffect(() => {
    // Listen for role change events
    const handleRoleChange = () => {
      fetchResignation();
    };

    window.addEventListener('roleChanged', handleRoleChange);
    return () => window.removeEventListener('roleChanged', handleRoleChange);
  }, []);

  // Check if current user has already acted on this resignation
  const hasUserActed = () => {
    if (!resignation?.workflows || !activeRole) return false;
    
    // Get current user ID from session or use a method to identify current user
    const currentUserId = sessionStorage.getItem('userId') || '1';
    
    // Check if any workflow entry has been attended by current user
    return resignation.workflows.some(workflow => 
      workflow.attended_by?.id?.toString() === currentUserId.toString()
    );
  };

  const fetchResignation = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/employees/exits/resignation/show_resignation/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setResignation(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching resignation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAcceptance = async (values) => {
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();

      // Add form fields
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) {
          if (key === 'acceptance_date' || key === 'letter_dated' || key === 'effective_from' || key === 'started_work') {
            formData.append(key, dayjs(values[key]).format('YYYY-MM-DD'));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      // Add files
      if (values.hr_signature_file) {
        formData.append('hr_signature_file', values.hr_signature_file.file);
      }
      if (values.employee_signature_file) {
        formData.append('employee_signature_file', values.employee_signature_file.file);
      }

      const response = await axios.post(
        `${apiBaseUrl}/employees/exits/resignation/create_acceptance/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 200) {
        setAcceptanceModalVisible(false);
        form.resetFields();
        fetchResignation();
      }
    } catch (error) {
      console.error('Error creating acceptance:', error);
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
      'Initiated': '#1890ff',    // Primary blue
      'Reviewed': '#6c757d',     // Secondary gray
      'Approved': '#52c41a',     // Success green
      'Submitted': '#1890ff',    // Primary blue
      'Under Review': '#faad14', // Warning orange
      'Rejected': '#ff4d4f',     // Error red
      'Draft': '#d9d9d9',        // Default gray
    };
    return colors[status] || '#d9d9d9';
  };

  const getStageColor = (stage) => {
    const colors = {
      'Initiated': 'default',
      'HR Review': 'processing',
      'Manager Review': 'warning',
      'Final Approval': 'success',
      'Completed': 'success',
    };
    return colors[stage] || 'default';
  };

  const downloadFile = (fileName, fileType) => {
    if (fileName) {
      const link = document.createElement('a');
      link.href = `${apiBaseUrl}/resignations/${resignation.id}/${fileName}`;
      link.download = fileName;
      link.click();
    }
  };

  const handleWorkflowAction = async (action) => {
    // Get comments from the textarea
    const comments = document.getElementById('workflow-action-comments')?.value || '';

    // Show confirmation dialog
    const actionText = {
      'review': 'Review',
      'approve': 'Approve',
      'reject': 'Reject',
      'return': 'Return'
    };

    const result = await Swal.fire({
      title: `${actionText[action]} Resignation`,
      html: `
        <p>Are you sure you want to ${action} the resignation for <strong>${resignation.employee_name}</strong>?</p>
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
        const endpoint = `${apiBaseUrl}/employees/exits/resignation/${action}_resignation`;
        
        // Prepare request data based on action
        const requestData = {
          resignation_id: resignation.id,
          comments: comments,
          action: action
        };

        // For review action, also send hr_recommendations
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
            text: `Resignation ${action}ed successfully`,
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          });
          // Clear the comments textarea
          const textarea = document.getElementById('workflow-action-comments');
          if (textarea) textarea.value = '';
          // Refresh the resignation data
          fetchResignation();
        } else {
          Swal.fire({
            title: 'Error',
            text: response.data.message || `Failed to ${action} resignation`,
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          });
        }
      } catch (error) {
        console.error(`Error ${action}ing resignation:`, error);
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || `Failed to ${action} resignation`,
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
        url: `${apiBaseUrl}/resignations/${resignation.id}/${fileName}`
      });
      setPreviewModalVisible(true);
    }
  };

  const handleReInitiate = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Re-initiate Resignation',
      html: `
        <p>Are you sure you want to re-initiate the resignation for <strong>${resignation.employee_name}</strong>?</p>
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
          `${apiBaseUrl}/employees/exits/resignation/submit_resignation/${resignation.id}`,
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
            text: 'Resignation re-initiated successfully',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#52c41a'
          });
          // Refresh the resignation data
          fetchResignation();
        } else {
          Swal.fire({
            title: 'Error',
            text: response.data.message || 'Failed to re-initiate resignation',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          });
        }
      } catch (error) {
        console.error('Error re-initiating resignation:', error);
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Failed to re-initiate resignation',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!resignation) {
    return <div>Resignation not found</div>;
  }

  return (
    <div>
      <PageHeader currentpage="View Resignation" activepage="Exit Management" mainpage="View Resignation" />
      
      {/* Back Button and Edit/Re-initiate Actions */}
      <Row style={{ marginBottom: 16 }}>
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              type="primary" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/exits/resignations')}
              style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
            >
              Back to List
            </Button>
            
            {/* Edit and Re-initiate buttons for Industrial Initiator when status is Draft */}
            {resignation.status === 'Draft' && (activeRole?.includes('Initiator') || activeRole === 'DEV' || activeRole === 'ADMIN') && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button 
                  type="default"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/exits/resignations/edit/${resignation.id}`)}
                  style={{ borderColor: '#1890ff', color: '#1890ff' }}
                >
                  Edit Resignation
                </Button>
                <Button 
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={() => handleReInitiate()}
                  loading={loading}
                  style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                >
                  Re-initiate
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Left Column - 8 cols */}
        <Col span={16}>
          {/* Resignation Details */}
          <Card title="Resignation Details" style={{ marginBottom: 16 }}>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Employee Name" span={1}>
                {resignation.employee_name}
              </Descriptions.Item>
              <Descriptions.Item label="Department" span={1}>
                {resignation.department_name}
              </Descriptions.Item>
              <Descriptions.Item label="Job Title" span={1}>
                {resignation.job_title}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number" span={1}>
                {resignation.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="Resignation Date" span={1}>
                {dayjs(resignation.resignation_date).format('DD MMM YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={1}>
                <Tag color={getStatusColor(resignation.status)}>
                  {resignation.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Stage" span={1}>
                <Tag color={getStageColor(resignation.stage)}>
                  {resignation.stage}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Created Date" span={1}>
                {dayjs(resignation.created_at).format('DD MMM YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="Postal Address" span={2}>
                {resignation.postal_address}
              </Descriptions.Item>
              <Descriptions.Item label="Remark" span={2}>
                {resignation.remark}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Attached Documents */}
          <Card title="Attached Documents" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {resignation.resignation_notice_file && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FileTextOutlined style={{ marginRight: '8px' }} />
                    <span>Resignation Notice</span>
                  </div>
                  <Space>
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => handlePreviewFile(resignation.resignation_notice_file, 'Resignation Notice')}
                    >
                      Preview
                    </Button>
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      onClick={() => downloadFile(resignation.resignation_notice_file, 'Resignation Notice')}
                    >
                      Download
                    </Button>
                  </Space>
                </div>
              )}
              {resignation.resignation_form_file && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FileTextOutlined style={{ marginRight: '8px' }} />
                    <span>Resignation Form</span>
                  </div>
                  <Space>
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => handlePreviewFile(resignation.resignation_form_file, 'Resignation Form')}
                    >
                      Preview
                    </Button>
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      onClick={() => downloadFile(resignation.resignation_form_file, 'Resignation Form')}
                    >
                      Download
                    </Button>
                  </Space>
                </div>
              )}
              {resignation.resignation_letter_file && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FileTextOutlined style={{ marginRight: '8px' }} />
                    <span>Resignation Letter</span>
                  </div>
                  <Space>
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => handlePreviewFile(resignation.resignation_letter_file, 'Resignation Letter')}
                    >
                      Preview
                    </Button>
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      onClick={() => downloadFile(resignation.resignation_letter_file, 'Resignation Letter')}
                    >
                      Download
                    </Button>
                  </Space>
                </div>
              )}
              {resignation.certificate_of_service_file && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FileTextOutlined style={{ marginRight: '8px' }} />
                    <span>Certificate of Service</span>
                  </div>
                  <Space>
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => handlePreviewFile(resignation.certificate_of_service_file, 'Certificate of Service')}
                    >
                      Preview
                    </Button>
                    <Button
                      type="link"
                      icon={<DownloadOutlined />}
                      onClick={() => downloadFile(resignation.certificate_of_service_file, 'Certificate of Service')}
                    >
                      Download
                    </Button>
                  </Space>
                </div>
              )}
            </Space>
          </Card>

          {/* Acceptance Details */}
      {resignation.acceptance && (
            <Card title="Resignation Acceptance Details">
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Acceptance Date" span={1}>
                  {dayjs(resignation.acceptance.acceptance_date).format('DD MMM YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Letter Dated" span={1}>
                  {dayjs(resignation.acceptance.letter_dated).format('DD MMM YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Service Of" span={1}>
                  {resignation.acceptance.service_of}
                </Descriptions.Item>
                <Descriptions.Item label="Effective From" span={1}>
                  {dayjs(resignation.acceptance.effective_from).format('DD MMM YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Started Work" span={1}>
                  {dayjs(resignation.acceptance.started_work).format('DD MMM YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="HR Name" span={1}>
                  {resignation.acceptance.hr_name}
                </Descriptions.Item>
                <Descriptions.Item label="HR Designation" span={2}>
                  {resignation.acceptance.hr_designation}
                </Descriptions.Item>
              </Descriptions>
            </Card>
      )}

          {/* Create Acceptance Button */}
      {!resignation.acceptance && resignation.status === 'Approved' && (
            <Card
              title="Create Resignation Acceptance"
              extra={
                <Button
                  type="primary"
                  style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                  onClick={() => setAcceptanceModalVisible(true)}
                >
                  Create Acceptance
                </Button>
              }
            >
              <p>No acceptance details found. Click the button above to create acceptance details.</p>
            </Card>
          )}
          </Col>

        {/* Right Column - 8 cols for Workflow Actions */}
        <Col span={8}>
          <Card 
            title="Workflow Actions" 
            style={{ position: 'sticky', top: 20 }}
          >
            {/* Timeline - Always shown first */}
            <div>
              <Timeline>
                {resignation.workflows?.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((workflow, index) => (
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
                      {/* Function Name and Date on same line */}
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

                      {/* Attended By with Role */}
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

                      {/* Resignation Reason/Remarks */}
                      {workflow.function_name === 'Resignation Initiation' && resignation.remark && (
                        <div style={{ 
                          color: '#8c8c8c', 
                          fontSize: '13px', 
                          lineHeight: '1.5',
                          marginBottom: '20px'
                        }}>
                          {resignation.remark}
                        </div>
                      )}

                      {/* Workflow Comments for other actions */}
                      {workflow.function_name !== 'Resignation Initiation' && workflow.comments && (
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

                      {/* Status Badge - Bottom Right */}
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

            {/* Action Form - Show only if not completed, rejected, or user hasn't acted */}
            {resignation.status !== 'Completed' && resignation.status !== 'Rejected' && !hasUserActed() && (
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
                            // Clear the comments textarea
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
            {resignation.status !== 'Completed' && resignation.status !== 'Rejected' && hasUserActed() && (
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
                  ✓ You have already taken action on this resignation
                </div>
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginTop: '4px' }}>
                  No further action is required from you at this stage
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Modal
        title="Create Resignation Acceptance"
        open={acceptanceModalVisible}
        onCancel={() => {
          setAcceptanceModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateAcceptance}
          initialValues={{
            acceptance_date: dayjs(),
            letter_dated: dayjs(),
            effective_from: dayjs(),
            employee_name: resignation.employee_name,
            job_title: resignation.job_title,
            postal_address: resignation.postal_address,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Acceptance Date"
                name="acceptance_date"
                rules={[{ required: true, message: 'Please select acceptance date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Letter Dated"
                name="letter_dated"
                rules={[{ required: true, message: 'Please select letter date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Service Of"
                name="service_of"
                rules={[{ required: true, message: 'Please enter service of' }]}
              >
                <Input placeholder="Service Of" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Effective From"
                name="effective_from"
                rules={[{ required: true, message: 'Please select effective from date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Started Work"
                name="started_work"
                rules={[{ required: true, message: 'Please select started work date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="HR Name"
                name="hr_name"
                rules={[{ required: true, message: 'Please enter HR name' }]}
              >
                <Input placeholder="HR Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="HR Designation"
                name="hr_designation"
                rules={[{ required: true, message: 'Please enter HR designation' }]}
              >
                <Input placeholder="HR Designation" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="HR Signature File"
                name="hr_signature_file"
              >
                <Upload maxCount={1}>
                  <Button>Upload HR Signature</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employee Signature File"
                name="employee_signature_file"
              >
                <Upload maxCount={1}>
                  <Button>Upload Employee Signature</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}>
                Create Acceptance
              </Button>
              <Button onClick={() => {
                setAcceptanceModalVisible(false);
                form.resetFields();
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Document Preview Modal */}
      <Modal
        title={`Preview: ${previewFile?.type || 'Document'}`}
        open={previewModalVisible}
        onCancel={() => {
          setPreviewModalVisible(false);
          setPreviewFile(null);
        }}
        footer={[
          <Button key="close" onClick={() => {
            setPreviewModalVisible(false);
            setPreviewFile(null);
          }}>
            Close
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={() => {
              if (previewFile) {
                downloadFile(previewFile.name, previewFile.type);
              }
            }}
            style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
          >
            Download
          </Button>
        ]}
        width="90%"
        style={{ top: 20 }}
        bodyStyle={{ height: '80vh', padding: 0 }}
      >
        {previewFile && (
          <iframe
            src={previewFile.url}
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title={`Preview of ${previewFile.type}`}
          />
        )}
      </Modal>
    </div>
  );
};

export default ViewResignation;