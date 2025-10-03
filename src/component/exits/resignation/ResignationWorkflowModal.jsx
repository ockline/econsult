import React, { useEffect, useState } from "react";
import { Row, Col, Card, Timeline, Tag, Form, Select, Input, Button, Modal } from "antd";
import dayjs from "dayjs";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const ResignationWorkflowModal = ({ visible, onClose, formData, workflowType }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    if (visible && formData?.id) {
      fetchWorkflowHistory();
    }
  }, [visible, formData]);

  const fetchWorkflowHistory = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/employees/exits/resignation/workflow_history/${formData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setWorkflows(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching workflow history:', error);
    }
  };

  const handleWorkflowAction = async (action) => {
    try {
      const values = await form.validateFields();
      const updatedValues = {
        ...values,
        resignation_id: formData.id,
      };

      setLoading(true);

      const token = sessionStorage.getItem('token');
      let endpoint = '';

      switch (action) {
        case 'review':
          endpoint = 'review_resignation';
          break;
        case 'manager_review':
          endpoint = 'manager_review';
          break;
        case 'approve':
          endpoint = 'approve_resignation';
          break;
        case 'reject':
          endpoint = 'reject_resignation';
          break;
        case 'return':
          endpoint = 'return_resignation';
          break;
        default:
          throw new Error('Invalid action');
      }

      const response = await axios.post(
        `${apiBaseUrl}/employees/exits/resignation/${endpoint}`,
        updatedValues,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        form.resetFields();
        onClose();
        // Refresh the parent component
        window.location.reload();
      }
    } catch (error) {
      console.error('Error processing workflow action:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Initiated': 'default',
      'Reviewed': 'processing',
      'Approved': 'success',
      'Rejected': 'error',
      'Returned': 'warning',
    };
    return colors[status] || 'default';
  };

  const renderWorkflowForm = () => {
    switch (workflowType) {
      case 'hr_review':
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              label="Comments"
              name="comments"
            >
              <TextArea rows={3} placeholder="Enter your comments" />
            </Form.Item>
            <Form.Item
              label="HR Recommendations"
              name="hr_recommendations"
              rules={[{ required: true, message: 'Please enter HR recommendations' }]}
            >
              <TextArea rows={4} placeholder="Enter HR recommendations" />
            </Form.Item>
          </Form>
        );
      case 'manager_review':
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              label="Comments"
              name="comments"
            >
              <TextArea rows={3} placeholder="Enter your comments" />
            </Form.Item>
            <Form.Item
              label="Manager Recommendations"
              name="manager_recommendations"
              rules={[{ required: true, message: 'Please enter manager recommendations' }]}
            >
              <TextArea rows={4} placeholder="Enter manager recommendations" />
            </Form.Item>
          </Form>
        );
      case 'approve':
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              label="Comments"
              name="comments"
            >
              <TextArea rows={3} placeholder="Enter your comments" />
            </Form.Item>
            <Form.Item
              label="Final Recommendations"
              name="recommendation"
            >
              <TextArea rows={4} placeholder="Enter final recommendations" />
            </Form.Item>
          </Form>
        );
      case 'reject':
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              label="Comments"
              name="comments"
              rules={[{ required: true, message: 'Please enter rejection comments' }]}
            >
              <TextArea rows={3} placeholder="Enter rejection comments" />
            </Form.Item>
            <Form.Item
              label="Recommendations"
              name="recommendation"
            >
              <TextArea rows={4} placeholder="Enter recommendations" />
            </Form.Item>
          </Form>
        );
      case 'return':
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              label="Comments"
              name="comments"
              rules={[{ required: true, message: 'Please enter return comments' }]}
            >
              <TextArea rows={3} placeholder="Enter return comments" />
            </Form.Item>
            <Form.Item
              label="Recommendations"
              name="recommendation"
            >
              <TextArea rows={4} placeholder="Enter recommendations for revision" />
            </Form.Item>
          </Form>
        );
      default:
        return null;
    }
  };

  const getActionButton = () => {
    switch (workflowType) {
      case 'hr_review':
        return (
          <Button
            type="primary"
            style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
            onClick={() => handleWorkflowAction('review')}
            loading={loading}
          >
            Submit Review
          </Button>
        );
      case 'manager_review':
        return (
          <Button
            type="primary"
            style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
            onClick={() => handleWorkflowAction('manager_review')}
            loading={loading}
          >
            Submit Manager Review
          </Button>
        );
      case 'approve':
        return (
          <Button
            type="primary"
            style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
            onClick={() => handleWorkflowAction('approve')}
            loading={loading}
          >
            Approve Resignation
          </Button>
        );
      case 'reject':
        return (
          <Button
            type="danger"
            onClick={() => handleWorkflowAction('reject')}
            loading={loading}
          >
            Reject Resignation
          </Button>
        );
      case 'return':
        return (
          <Button
            type="warning"
            onClick={() => handleWorkflowAction('return')}
            loading={loading}
          >
            Return for Revision
          </Button>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (workflowType) {
      case 'hr_review':
        return 'HR Review';
      case 'manager_review':
        return 'Manager Review';
      case 'approve':
        return 'Approve Resignation';
      case 'reject':
        return 'Reject Resignation';
      case 'return':
        return 'Return for Revision';
      default:
        return 'Workflow Action';
    }
  };

  return (
    <Modal
      title={getModalTitle()}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Workflow History" size="small">
            <Timeline>
              {workflows.map((workflow, index) => (
                <Timeline.Item key={index} color={getStatusColor(workflow.status)}>
                  <div>
                    <strong>{workflow.function_name}</strong>
                    <Tag color={getStatusColor(workflow.status)} style={{ marginLeft: 8 }}>
                      {workflow.status}
                    </Tag>
                    <br />
                    <small>{dayjs(workflow.created_at).format('DD/MM/YYYY HH:mm')}</small>
                    {workflow.comments && (
                      <div style={{ marginTop: 8 }}>
                        <strong>Comments:</strong> {workflow.comments}
                      </div>
                    )}
                    {workflow.recommendation && (
                      <div style={{ marginTop: 8 }}>
                        <strong>Recommendation:</strong> {workflow.recommendation}
                      </div>
                    )}
                    {workflow.attended_by && (
                      <div>
                        <strong>Attended by:</strong> {workflow.attended_by?.name}
                      </div>
                    )}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Action Form" size="small">
            {renderWorkflowForm()}
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                {getActionButton()}
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ResignationWorkflowModal;