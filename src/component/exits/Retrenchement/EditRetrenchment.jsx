import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Upload, Select, Row, Col, Card, message, Space } from 'antd';
import { ArrowLeftOutlined, UploadOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const { TextArea } = Input;
const { Option } = Select;

const EditRetrenchment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [endContract, setEndContract] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employers, setEmployers] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Watch started_date and end_date to calculate days_worked
  const startedDate = Form.useWatch('started_date', form);
  const endDate = Form.useWatch('end_date', form);

  useEffect(() => {
    fetchEndContract();
    fetchEmployees();
    fetchDepartments();
    fetchEmployers();
  }, [id]);

  // Function to calculate days worked
  const calculateDaysWorked = (startDate = null, endDate = null) => {
    // Get dates from parameters or form values
    const startDateValue = startDate || form.getFieldValue('started_date');
    const endDateValue = endDate || form.getFieldValue('end_date');
    
    if (startDateValue && endDateValue) {
      const start = dayjs(startDateValue);
      const end = dayjs(endDateValue);
      if (end.isAfter(start) || end.isSame(start)) {
        const daysDiff = end.diff(start, 'day') + 1; // +1 to include both start and end days
        form.setFieldsValue({ days_worked: daysDiff });
      } else {
        form.setFieldsValue({ days_worked: undefined });
      }
    } else {
      form.setFieldsValue({ days_worked: undefined });
    }
  };

  // Calculate days worked when dates change via Form.useWatch
  useEffect(() => {
    if (startedDate || endDate) {
      calculateDaysWorked();
    }
  }, [startedDate, endDate]);

  const fetchEndContract = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/employees/exits/retrenchment/show_retrenchment/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        const data = response.data.data;
        
        // Check if status is Draft - only allow editing when status is Draft
        if (data.status !== 'Draft') {
          Swal.fire({
            title: 'Cannot Edit',
            text: `This end contract cannot be edited because its status is "${data.status}". Only contracts with "Draft" status can be edited.`,
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          });
          navigate('/exits/retrenchments');
          return;
        }
        
        setEndContract(data);
        
        // Populate form with existing data
        form.setFieldsValue({
          employee_id: data.employee_id,
          employee_name: data.employee_name,
          department_name: data.department_name,
          job_title: data.job_title,
          phone_number: data.phone_number,
          postal_address: data.postal_address,
          remark: data.remark,
          end_date: data.end_date ? dayjs(data.end_date) : null,
          employer_name: data.employer_name,
          letter_title: data.letter_title,
          signed_date: data.signed_date ? dayjs(data.signed_date) : null,
          started_date: data.started_date ? dayjs(data.started_date) : null,
          days_worked: data.days_worked,
          on_behalf_of: data.on_behalf_of,
          designation: data.designation,
          hr_name: data.hr_name,
          employee_designation: data.employee_designation,
          job_department: data.job_department,
          contract_date: data.contract_date ? dayjs(data.contract_date) : null,
          expire_date: data.expire_date ? dayjs(data.expire_date) : null,
          non_renewal_letter_title: data.non_renewal_letter_title
        });
      } else {
        message.error('Failed to fetch end contract details');
        navigate('/exits/end_specific_contracts');
      }
    } catch (error) {
      console.error('Error fetching end contract:', error);
      message.error('Failed to fetch end contract details');
      navigate('/exits/end_specific_contracts');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${apiBaseUrl}/employees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.status === 200) {
        setEmployees(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${apiBaseUrl}/departments`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.status === 200) {
        setDepartments(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${apiBaseUrl}/employers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.status === 200) {
        setEmployers(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching employers:', error);
    }
  };

  const handleEmployeeChange = (employeeId) => {
    const selectedEmployee = employees.find(emp => emp.id === employeeId);
    if (selectedEmployee) {
      form.setFieldsValue({
        employee_name: selectedEmployee.name,
        department_name: selectedEmployee.department,
        job_title: selectedEmployee.job_title,
        phone_number: selectedEmployee.phone,
        postal_address: selectedEmployee.address
      });
    }
  };

  const handleSubmit = async (values, action = 'save') => {
    // Prevent updates if status is not Draft
    if (endContract && endContract.status !== 'Draft') {
      Swal.fire({
        title: 'Cannot Update',
        text: `This end contract cannot be updated because its status is "${endContract.status}". Only contracts with "Draft" status can be updated.`,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#b2000a'
      });
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();

      // Add form fields
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) {
          if (key.includes('date') && values[key]) {
            formData.append(key, dayjs(values[key]).format('YYYY-MM-DD'));
          } else if (key === 'renewal_notice_file' && values[key]?.fileList) {
            if (values[key].fileList.length > 0) {
              formData.append(key, values[key].fileList[0].originFileObj);
            }
          } else if (key === 'signature_file' && values[key]?.fileList) {
            if (values[key].fileList.length > 0) {
              formData.append(key, values[key].fileList[0].originFileObj);
            }
          } else if (key === 'employee_signature_file' && values[key]?.fileList) {
            if (values[key].fileList.length > 0) {
              formData.append(key, values[key].fileList[0].originFileObj);
            }
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      // Add action type and ID
      formData.append('action', action);
      formData.append('id', id);

      const endpoint = action === 'submit' 
        ? `${apiBaseUrl}/employees/exits/retrenchment/submit_retrenchment/${id}`
        : `${apiBaseUrl}/employees/exits/retrenchment/update_retrenchment/${id}`;

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 200) {
        const actionText = action === 'submit' ? 'submitted' : 'updated';
        Swal.fire({
          title: 'Success',
          text: `End contract ${actionText} successfully`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        }).then(() => {
          navigate('/exits/retrenchments');
        });
      } else {
        message.error(response.data.message || `Failed to ${action} end contract`);
      }
    } catch (error) {
      console.error(`Error ${action}ing end contract:`, error);
      message.error(error.response?.data?.message || `Failed to ${action} end contract`);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: () => false, // Prevent auto upload
    maxCount: 1,
    accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png'
  };

  // Upload props for signature files (images only)
  const signatureUploadProps = {
    beforeUpload: (file) => {
      // Check if file is an image
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Signature files must be images (JPG, PNG, GIF, etc.)');
        return false; // Prevent the file from being added
      }
      return false; // Prevent auto upload
    },
    maxCount: 1,
    accept: 'image/*'
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
        <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Edit Retrenchment</h1>

        <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
          <li className="text-sm">
            <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to={`${import.meta.env.BASE_URL}dashboards/normal`}>
              Home
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
            </Link>
          </li>
          <li className="text-sm">
            <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to={`${import.meta.env.BASE_URL}exits/retrenchments`}>
              Retrenchment Exit
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
            </Link>
          </li>
          <li className="text-sm text-gray-500 dark:text-white/70" aria-current="page">
            Edit End Contract
          </li>
        </ol>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleSubmit(values, 'save')}
      >
        <Row gutter={[16, 16]}>
          {/* End of Contract Details */}
          <Col span={24}>
            <Card 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>End of Contract Details</span>
                  <button 
                    type="button" 
                    className="ti-btn ti-btn-primary" 
                    style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                    onClick={() => navigate('/exits/end_specific_contracts')}
                  >
                    <i className="ti ti-arrow-left w-3.5 h-3.5"></i> Back
                  </button>
                </div>
              } 
              style={{ marginBottom: 16 }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Employee"
                    name="employee_id"
                    rules={[{ required: true, message: 'Please select employee' }]}
                  >
                    <Select
                      placeholder="Select Employee"
                      showSearch
                      optionFilterProp="children"
                      onChange={handleEmployeeChange}
                    >
                      {employees.map(employee => (
                        <Option key={employee.id} value={employee.id}>
                          {employee.name} - {employee.employee_number}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Employee Name"
                    name="employee_name"
                    rules={[{ required: true, message: 'Please enter employee name' }]}
                  >
                    <Input placeholder="Employee Name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Department Name"
                    name="department_name"
                    rules={[{ required: true, message: 'Please enter department name' }]}
                  >
                    <Input placeholder="Department Name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Job Title"
                    name="job_title"
                    rules={[{ required: true, message: 'Please enter job title' }]}
                  >
                    <Input placeholder="Job Title" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="End Date"
                    name="end_date"
                    rules={[{ required: true, message: 'Please select end date' }]}
                  >
                    <DatePicker 
                      style={{ width: '100%' }} 
                      onChange={(date) => {
                        form.setFieldsValue({ end_date: date });
                        // Calculate immediately with the new date
                        calculateDaysWorked(null, date);
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Postal Address"
                    name="postal_address"
                    rules={[{ required: true, message: 'Please enter postal address' }]}
                  >
                    <TextArea rows={3} placeholder="Postal Address" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Remark"
                    name="remark"
                    rules={[{ required: true, message: 'Please enter remark' }]}
                  >
                    <TextArea rows={3} placeholder="Enter remark" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Renewal Notice (if any)"
                    name="renewal_notice_file"
                  >
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                    {endContract.renewal_notice_file && (
                      <div style={{ marginTop: 8, color: '#52c41a' }}>
                        Current file: {endContract.renewal_notice_file}
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* End of Employment Contract Details */}
          <Col span={24}>
            <Card title="End of Employment Contract Details" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Employer Name"
                    name="employer_name"
                    rules={[{ required: true, message: 'Please select employer name' }]}
                  >
                    <Select placeholder="Select Employer">
                      {employers.map(employer => (
                        <Option key={employer.id} value={employer.name}>
                          {employer.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Letter Title"
                    name="letter_title"
                    rules={[{ required: true, message: 'Please enter letter title' }]}
                  >
                    <Input placeholder="Letter Title" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Signed Date"
                    name="signed_date"
                    rules={[{ required: true, message: 'Please select signed date' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Started Date"
                    name="started_date"
                    rules={[
                      { required: true, message: 'Please select started date' },
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.resolve();
                          }
                          const selectedDate = dayjs(value);
                          const today = dayjs().startOf('day');
                          if (selectedDate.isAfter(today) || selectedDate.isSame(today)) {
                            return Promise.reject(new Error('Started date must be before today'));
                          }
                          return Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <DatePicker 
                      style={{ width: '100%' }} 
                      disabledDate={(current) => {
                        // Disable today and future dates
                        return current && current >= dayjs().startOf('day');
                      }}
                      onChange={(date) => {
                        form.setFieldsValue({ started_date: date });
                        // Calculate immediately with the new date
                        calculateDaysWorked(date, null);
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Days Worked"
                    name="days_worked"
                    rules={[{ required: true, message: 'Please enter days worked' }]}
                  >
                    <Input type="number" placeholder="Days Worked (Auto-calculated)" readOnly className="bg-gray-100" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="On Behalf Of"
                    name="on_behalf_of"
                    rules={[{ required: true, message: 'Please enter on behalf of' }]}
                  >
                    <Input placeholder="On Behalf Of" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Designation"
                    name="designation"
                    rules={[{ required: true, message: 'Please enter designation' }]}
                  >
                    <Input placeholder="Designation" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="HR Name"
                    name="hr_name"
                    rules={[{ required: true, message: 'Please enter HR name' }]}
                  >
                    <Input placeholder="HR Name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Employee Designation"
                    name="employee_designation"
                    rules={[{ required: true, message: 'Please enter employee designation' }]}
                  >
                    <Input placeholder="Employee Designation" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="HR Signature"
                    name="signature_file"
                  >
                    <Upload {...signatureUploadProps}>
                      <Button icon={<UploadOutlined />}>Upload HR Signature</Button>
                    </Upload>
                    <div style={{ marginTop: 8, color: '#8c8c8c', fontSize: '12px' }}>
                      Only image files (JPG, PNG, GIF, etc.) are allowed
                    </div>
                    {endContract.signature_file && (
                      <div style={{ marginTop: 8, color: '#52c41a' }}>
                        Current file: {endContract.signature_file}
                      </div>
                    )}
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Employee Signature"
                    name="employee_signature_file"
                  >
                    <Upload {...signatureUploadProps}>
                      <Button icon={<UploadOutlined />}>Upload Employee Signature</Button>
                    </Upload>
                    <div style={{ marginTop: 8, color: '#8c8c8c', fontSize: '12px' }}>
                      Only image files (JPG, PNG, GIF, etc.) are allowed
                    </div>
                    {endContract.employee_signature_file && (
                      <div style={{ marginTop: 8, color: '#52c41a' }}>
                        Current file: {endContract.employee_signature_file}
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Non-Renewal Contract Details */}
          <Col span={24}>
            <Card title="Non-Renewal Contract Details (Optional)" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Job Department"
                    name="job_department"
                  >
                    <Select placeholder="Select Department">
                      {departments.map(dept => (
                        <Option key={dept.id} value={dept.name}>
                          {dept.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Contract Date"
                    name="contract_date"
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Expire Date"
                    name="expire_date"
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Non-Renewal Letter Title"
                    name="non_renewal_letter_title"
                  >
                    <Input placeholder="Non-Renewal Letter Title" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Action Buttons */}
          <Col span={24}>
            <Card>
              <Space size="middle">
                <Button
                  type="default"
                  icon={<SaveOutlined />}
                  onClick={() => form.submit()}
                  loading={loading}
                  size="large"
                >
                  Update
                </Button>
                
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={() => {
                    form.validateFields().then(values => {
                      handleSubmit(values, 'submit');
                    });
                  }}
                  loading={loading}
                  size="large"
                  style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                >
                  Update & Submit
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditRetrenchment;


