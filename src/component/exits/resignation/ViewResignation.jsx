import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Descriptions, Tag, Button, Space, Timeline, Modal, Form, Input, DatePicker, Upload } from "antd";
import { EditOutlined, EyeOutlined, FileTextOutlined, DownloadOutlined, SendOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import PageHeader from "../../../layout/layoutsection/pageHeader/pageHeader";

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

  useEffect(() => {
    fetchResignation();
  }, [id]);

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
    };
    return colors[status] || 'default';
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!resignation) {
    return <div>Resignation not found</div>;
  }

  return (
    <div>
      <PageHeader currentpage="View Resignation" activepage="Exit Management" mainpage="View Resignation" />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="Resignation Details"
            extra={
              <Button 
                type="primary" 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/exits/resignations')}
                style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
              >
                Back
              </Button>
            }
          >
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
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Attached Documents">
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
        </Col>
        <Col span={12}>
          <Card title="Workflow History">
            <Timeline>
              {resignation.workflows?.map((workflow, index) => (
                <Timeline.Item key={index} color={getStatusColor(workflow.status)}>
                  <div>
                    <strong>{workflow.function_name}</strong>
                    <br />
                    <small>{dayjs(workflow.created_at).format('DD MMM YYYY HH:mm')}</small>
                    {workflow.comments && (
                      <div style={{ marginTop: 8 }}>
                        <strong>Comments:</strong> {workflow.comments}
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

      {resignation.acceptance && (
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
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
          </Col>
        </Row>
      )}

      {!resignation.acceptance && resignation.status === 'Approved' && (
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
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
          </Col>
        </Row>
      )}

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