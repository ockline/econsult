import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Upload, Select, Row, Col, Card, message, Space } from 'antd';
import { ArrowLeftOutlined, UploadOutlined, SaveOutlined, SendOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const { TextArea } = Input;
const { Option } = Select;

const AddEndContract = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({}); // Store form data across steps
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Step navigation functions
  const saveCurrentStepData = () => {
    const currentValues = form.getFieldsValue();
    setFormData(prevData => ({
      ...prevData,
      ...currentValues
    }));
  };

  const nextStep = () => {
    saveCurrentStepData();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    saveCurrentStepData();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    saveCurrentStepData();
    setCurrentStep(step);
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchEmployers();
  }, []);

  // Load saved form data when component mounts or step changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      form.setFieldsValue(formData);
    }
  }, [currentStep, formData, form]);

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

  // Function to fetch employee data based on the employee number (searchQuery)
  const getEmployeeDetail = async (employeeNumber) => {
    setSearchLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get(`${apiBaseUrl}/leaves/retrieve_employee_detail/${employeeNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      console.log('API Response:', res.data); // Debug log
      console.log('Employee object:', res.data.employee); // Debug log
      
      if (res.data.status === 200 && res.data.employee) {
        const employee = res.data.employee;
        setSelectedEmployee(employee);
        
        // Build employee full name
        const fullName = `${employee.firstname || ''} ${employee.middlename || ''} ${employee.lastname || ''}`.trim();
        
        // Auto-fill form fields with correct mapping from API response
        // Fill read-only fields and phone number from employee data
        form.setFieldsValue({
          employee_id: employee.id, // Use the database ID for form submission
          employee_name: fullName, // Read-only
          department_name: employee.departments || '', // Read-only
          job_title: employee.job_title || '', // Read-only
          phone_number: employee.mobile_number || employee.telephone_home || employee.telephone_office || '', // Auto-fill phone from employee data
          
          // Auto-fill Employment Contract Details (editable)
          employer_name: employee.employer || '', // Auto-fill employer name
          designation: employee.job_title || '', // Use job title as designation
          employee_designation: employee.job_title || '', // Use job title as employee designation
          // Don't auto-fill postal_address - let user input this
        });

        console.log('Employee details loaded:', {
          employee_id: employee.id,
          employee_number: employee.employee_id,
          name: fullName,
          department: employee.departments,
          job_title: employee.job_title,
          employer: employee.employer,
          employer_id: employee.employer_id,
          mobile_number: employee.mobile_number,
        });

        // Clear any previous error messages
        message.success(`Employee found: ${fullName}`);
      } else {
        // Handle case where employee is not found
        setSelectedEmployee(null);
        form.resetFields(['employee_id', 'employee_name', 'department_name', 'job_title', 'phone_number', 'employer_name', 'designation', 'employee_designation']);
        
        Swal.fire({
          title: 'Employee Not Found',
          text: 'No employee found with this employee number. Please check and try again.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setSelectedEmployee(null);
      form.resetFields(['employee_id', 'employee_name', 'department_name', 'job_title', 'phone_number', 'employer_name', 'employee_designation']);
      
      if (error.response && error.response.status === 404) {
        Swal.fire({
          title: 'Employee Not Found',
          text: 'No employee found with this employee number. Please check and try again.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch employee data. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
      }
    } finally {
      setSearchLoading(false);
    }
  };

  // Trigger the fetch when search query changes with debounce
  useEffect(() => {
    if (searchQuery !== '' && searchQuery.length >= 3) {
      // Add a small delay to avoid too many API calls while typing
      const timeoutId = setTimeout(() => {
        getEmployeeDetail(searchQuery);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else if (searchQuery === '') {
      // Clear form when search is empty
      setSelectedEmployee(null);
      form.resetFields(['employee_id', 'employee_name', 'department_name', 'job_title', 'phone_number', 'employer_name', 'employee_designation']);
    }
  }, [searchQuery]);

  const handleSubmit = async (values, action = 'save') => {
    // Save current step data before submitting
    saveCurrentStepData();
    
    // Combine current form values with stored form data
    const currentValues = form.getFieldsValue();
    const allFormData = {
      ...formData,
      ...currentValues,
      ...values
    };

    // Validate that employee is selected
    if (!selectedEmployee) {
      Swal.fire({
        title: 'Employee Required',
        text: 'Please search and select an employee before submitting.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#b2000a'
      });
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const submitFormData = new FormData();

      // Add employee_id from selected employee (use database ID)
      submitFormData.append('employee_id', selectedEmployee.id);

      // Add employee details from selectedEmployee (for read-only fields)
      if (selectedEmployee) {
        const fullName = `${selectedEmployee.firstname || ''} ${selectedEmployee.middlename || ''} ${selectedEmployee.lastname || ''}`.trim();
        submitFormData.append('employee_name', fullName);
        submitFormData.append('department_name', selectedEmployee.departments || '');
        submitFormData.append('job_title', selectedEmployee.job_title || '');
      }

      // Add form fields from combined data
      Object.keys(allFormData).forEach(key => {
        if (key !== 'employee_id' && allFormData[key] !== undefined && allFormData[key] !== null && allFormData[key] !== '') {
          if (key.includes('date') && allFormData[key]) {
            submitFormData.append(key, dayjs(allFormData[key]).format('YYYY-MM-DD'));
          } else if (key === 'renewal_notice_file' && allFormData[key]?.fileList) {
            if (allFormData[key].fileList.length > 0) {
              submitFormData.append(key, allFormData[key].fileList[0].originFileObj);
            }
          } else if (key === 'signature_file' && allFormData[key]?.fileList) {
            if (allFormData[key].fileList.length > 0) {
              submitFormData.append(key, allFormData[key].fileList[0].originFileObj);
            }
          } else if (key === 'employee_signature_file' && allFormData[key]?.fileList) {
            if (allFormData[key].fileList.length > 0) {
              submitFormData.append(key, allFormData[key].fileList[0].originFileObj);
            }
          } else {
            submitFormData.append(key, allFormData[key]);
          }
        }
      });

      // Add action type
      submitFormData.append('action', action);

      // Debug: Log form data
      console.log('All form data being sent:', allFormData);
      console.log('Selected employee:', selectedEmployee);
      for (let pair of submitFormData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const endpoint = action === 'submit' 
        ? `${apiBaseUrl}/employees/exits/endcontract/submit_endcontract`
        : `${apiBaseUrl}/employees/exits/endcontract/create_endcontract`;

      const response = await axios.post(endpoint, submitFormData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 200) {
        const actionText = action === 'submit' ? 'submitted' : 'saved';
        Swal.fire({
          title: 'Success',
          text: `End contract ${actionText} successfully`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        }).then(() => {
          navigate('/exits/endcontracts');
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

  return (
    <div>
      {/* Breadcrumb and Header */}
      <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Add End Contract</h1>

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
            Add End Contract
          </li>
        </ol>
      </div>

      {/* Step Progress Indicator */}
      <div className="box">
        <div className="box-body">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold cursor-pointer ${
                      currentStep === step
                        ? 'bg-blue-600'
                        : currentStep > step
                        ? 'bg-green-600'
                        : 'bg-gray-400'
                    }`}
                    onClick={() => goToStep(step)}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 ${
                        currentStep > step ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">
              {currentStep === 1 && 'Step 1: End of Contract Details'}
              {currentStep === 2 && 'Step 2: End of Employment Contract Details'}
              {currentStep === 3 && 'Step 3: Non-Renewal Contract Details (Optional)'}
            </h2>
          </div>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleSubmit(values, 'save')}
      >
        <Row gutter={[16, 16]}>
          {/* Step 1: End of Contract Details */}
          {currentStep === 1 && (
            <Col span={24}>
              <Card 
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>End of Contract Details</span>
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
              <Row gutter={[16, 16]}>
                {/* Employee Search and ID Row */}
                <Col xs={24} sm={12} md={8}>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0 font-bold text-lg">
                      Search Employee <span style={{ color: "red" }}> *</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {searchLoading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        ) : (
                          <i className="ti ti-search"></i>
                        )}
                      </div>
                      <input
                        type="text"
                        name="employee-search"
                        id="employee-search"
                        autoComplete="off"
                        className="p-2 pr-10 ti-form-input w-full"
                        placeholder="Search by Employee Number (min 3 characters)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={searchLoading}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && searchQuery.length >= 3) {
                            e.preventDefault();
                            getEmployeeDetail(searchQuery);
                          }
                        }}
                      />
                    </div>
                    {/* Manual search button */}
                    <div style={{ marginTop: '8px' }}>
                      <Button 
                        size="small" 
                        onClick={() => {
                          if (searchQuery.length >= 3) {
                            getEmployeeDetail(searchQuery);
                          } else {
                            message.warning('Please enter at least 3 characters');
                          }
                        }}
                        loading={searchLoading}
                        disabled={searchQuery.length < 3}
                      >
                        Search Now
                      </Button>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Employee ID"
                    name="employee_id"
                    rules={[{ required: true, message: 'Please search and select an employee' }]}
                    style={{ display: 'none' }} // Hidden field for form submission
                  >
                    <Input type="hidden" />
                  </Form.Item>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0 font-bold text-lg">
                      Employee Number
                    </label>
                    <Input 
                      placeholder="Employee Number" 
                      value={selectedEmployee?.employee_id || ''}
                      readOnly 
                      className="bg-gray-100"
                    />
                  </div>
                </Col>
                
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Employee Name"
                    name="employee_name"
                    rules={[{ required: true, message: 'Please enter employee name' }]}
                  >
                    <Input placeholder="Employee Name" readOnly className="bg-gray-100" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Department Name"
                    name="department_name"
                    rules={[{ required: true, message: 'Please enter department name' }]}
                  >
                    <Input placeholder="Department Name" readOnly className="bg-gray-100" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Job Title"
                    name="job_title"
                    rules={[{ required: true, message: 'Please enter job title' }]}
                  >
                    <Input placeholder="Job Title" readOnly className="bg-gray-100" />
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

                {/* End Date, Postal Address and Renewal Notice in same row */}
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="End Date"
                    name="end_date"
                    rules={[{ required: true, message: 'Please select end date' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Postal Address"
                    name="postal_address"
                    rules={[{ required: true, message: 'Please enter postal address' }]}
                  >
                    <Input placeholder="Postal Address" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Renewal Notice (if any)"
                    name="renewal_notice_file"
                  >
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                  </Form.Item>
                </Col>

                {/* Remark text area - full width */}
                <Col xs={24}>
                  <Form.Item
                    label="Remark"
                    name="remark"
                    rules={[{ required: true, message: 'Please enter remark' }]}
                  >
                    <TextArea rows={3} placeholder="Enter remark" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          )}

          {/* Step 2: End of Employment Contract Details */}
          {currentStep === 2 && (
            <Col span={24}>
              <Card title="End of Employment Contract Details" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Employer Name"
                    name="employer_name"
                    rules={[{ required: true, message: 'Please enter employer name' }]}
                  >
                    <Input placeholder="Employer Name" />
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
                    rules={[{ required: true, message: 'Please select started date' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Days Worked"
                    name="days_worked"
                    rules={[{ required: true, message: 'Please enter days worked' }]}
                  >
                    <Input type="number" placeholder="Days Worked" />
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
                    rules={[{ required: true, message: 'Please upload HR signature' }]}
                  >
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload HR Signature</Button>
                    </Upload>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Employee Signature"
                    name="employee_signature_file"
                    rules={[{ required: true, message: 'Please upload employee signature' }]}
                  >
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload Employee Signature</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          )}

          {/* Step 3: Non-Renewal Contract Details (Optional) */}
          {currentStep === 3 && (
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
          )}

          {/* Step Navigation Buttons */}
          <Col span={24}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  {currentStep > 1 && (
                    <Button
                      type="default"
                      onClick={prevStep}
                      size="large"
                      style={{ marginRight: '8px' }}
                    >
                      Previous
                    </Button>
                  )}
                </div>
                
                <div>
                  {currentStep < 3 ? (
                    <Button
                      type="primary"
                      onClick={nextStep}
                      size="large"
                      style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Space size="middle">
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => {
                          handleSubmit({}, 'save');
                        }}
                        loading={loading}
                        size="large"
                        style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                      >
                        Save as Draft
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
                        style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                      >
                        Submit for Review
                      </Button>

                      <Button
                        type="default"
                        icon={<CloseOutlined />}
                        onClick={() => navigate('/exits/endcontracts')}
                        size="large"
                        style={{ marginLeft: '8px' }}
                      >
                        Close
                      </Button>
                    </Space>
                  )}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddEndContract;
