import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Form, Input, DatePicker, Upload, Button, message, Select, Space } from "antd";
import { UploadOutlined, SaveOutlined, SendOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

const EditResignation = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [resignation, setResignation] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchResignation();
    fetchEmployees();
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
        const data = response.data.data;
        setResignation(data);
        form.setFieldsValue({
          employee_no: data.employee_no || data.employee?.employee_no || 'N/A',
          employee_name: data.employee_name,
          department_name: data.department_name,
          job_title: data.job_title,
          postal_address: data.postal_address,
          phone_number: data.phone_number,
          remark: data.remark,
          resignation_date: dayjs(data.resignation_date),
        });
      }
    } catch (error) {
      console.error('Error fetching resignation:', error);
      message.error('Failed to fetch resignation details');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/employees/show_all_employee`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setEmployees(response.data.data || []);
      } else {
        console.error('Failed to fetch employees:', response.data.message);
        setEmployees([]);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    }
  };

  const handleEmployeeChange = (employeeId) => {
    if (employees && Array.isArray(employees)) {
      const employee = employees.find(emp => emp.id === employeeId);
      if (employee) {
        form.setFieldsValue({
          employee_name: employee.employee_name,
          department_name: employee.department?.name || '',
          job_title: employee.job_title?.name || '',
        });
      }
    }
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();

      // Add form fields
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) {
          if (key === 'resignation_date') {
            formData.append(key, dayjs(values[key]).format('YYYY-MM-DD'));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      // Add files
      if (values.resignation_notice_file) {
        formData.append('resignation_notice_file', values.resignation_notice_file.file);
      }
      if (values.resignation_form_file) {
        formData.append('resignation_form_file', values.resignation_form_file.file);
      }
      if (values.resignation_letter_file) {
        formData.append('resignation_letter_file', values.resignation_letter_file.file);
      }

      const response = await axios.post(
        `${apiBaseUrl}/employees/exits/resignation/update_resignation/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 200) {
        message.success('Resignation Updated Successfully');
        navigate('/exits/resignations');
      }
    } catch (error) {
      console.error('Error updating resignation:', error);
      message.error('Failed to update resignation');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();

      // Add form fields
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) {
          if (key === 'resignation_date') {
            formData.append(key, dayjs(values[key]).format('YYYY-MM-DD'));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      // Add files
      if (values.resignation_notice_file) {
        formData.append('resignation_notice_file', values.resignation_notice_file.file);
      }
      if (values.resignation_form_file) {
        formData.append('resignation_form_file', values.resignation_form_file.file);
      }
      if (values.resignation_letter_file) {
        formData.append('resignation_letter_file', values.resignation_letter_file.file);
      }

      const response = await axios.post(
        `${apiBaseUrl}/employees/exits/resignation/update_resignation/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 200) {
        // Submit the resignation
        const submitResponse = await axios.post(
          `${apiBaseUrl}/employees/exits/resignation/submit_resignation/${id}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (submitResponse.data.status === 200) {
          message.success('Resignation Submitted Successfully');
          navigate('/exits/resignations');
        }
      }
    } catch (error) {
      console.error('Error submitting resignation:', error);
      message.error('Failed to submit resignation');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isValidType = file.type === 'application/pdf' || 
                         file.type === 'application/msword' || 
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (!isValidType) {
        message.error('You can only upload PDF or Word documents!');
        return false;
      }
      const isValidSize = file.size / 1024 / 1024 < 5;
      if (!isValidSize) {
        message.error('File must be smaller than 5MB!');
        return false;
      }
      return false; // Prevent auto upload
    },
  };

  if (loading && !resignation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Edit Resignation">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdate}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Employee Number"
                    name="employee_no"
                  >
                    <Input placeholder="Employee Number" readOnly className="bg-gray-100" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Employee Name"
                    name="employee_name"
                    rules={[{ required: true, message: 'Please enter employee name' }]}
                  >
                    <Input placeholder="Employee Name" readOnly className="bg-gray-100" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Department"
                    name="department_name"
                    rules={[{ required: true, message: 'Please enter department name' }]}
                  >
                    <Input placeholder="Department Name" readOnly className="bg-gray-100" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Job Title"
                    name="job_title"
                    rules={[{ required: true, message: 'Please enter job title' }]}
                  >
                    <Input placeholder="Job Title" readOnly className="bg-gray-100" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Resignation Date"
                    name="resignation_date"
                    rules={[{ required: true, message: 'Please select resignation date' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Postal Address"
                    name="postal_address"
                    rules={[{ required: true, message: 'Please enter postal address' }]}
                  >
                    <TextArea rows={3} placeholder="Postal Address" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Remark"
                    name="remark"
                    rules={[{ required: true, message: 'Please enter remark' }]}
                  >
                    <TextArea rows={4} placeholder="Remark" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item
                    label="Resignation Notice File"
                    name="resignation_notice_file"
                  >
                    <Upload {...uploadProps} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                    {resignation?.resignation_notice_file && (
                      <div style={{ marginTop: 8 }}>
                        <small>Current: {resignation.resignation_notice_file}</small>
                      </div>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Resignation Form File"
                    name="resignation_form_file"
                  >
                    <Upload {...uploadProps} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                    {resignation?.resignation_form_file && (
                      <div style={{ marginTop: 8 }}>
                        <small>Current: {resignation.resignation_form_file}</small>
                      </div>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Resignation Letter File"
                    name="resignation_letter_file"
                  >
                    <Upload {...uploadProps} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                    {resignation?.resignation_letter_file && (
                      <div style={{ marginTop: 8 }}>
                        <small>Current: {resignation.resignation_letter_file}</small>
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Space>
                        <Button
                          onClick={() => navigate('/exits/resignations')}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                          htmlType="submit"
                          icon={<SaveOutlined />}
                          loading={loading}
                        >
                          Update
                        </Button>
                      </Space>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditResignation;