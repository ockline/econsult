import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Form, Input, DatePicker, Upload, Button, message, Select, Space } from "antd";
import { UploadOutlined, SaveOutlined, SendOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const { TextArea } = Input;
const { Option } = Select;

const AddResignation = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errorList, setErrorList] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

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
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/departments/show_department`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleEmployeeChange = (employeeId) => {
    const employee = employees?.find(emp => emp.id === employeeId);
    if (employee) {
      form.setFieldsValue({
        employee_name: employee.employee_name,
        department_name: employee.department?.name || '',
        job_title: employee.job_title?.name || '',
      });
    }
  };

  // Function to fetch employee data based on the employee number (searchQuery)
  const getEmployeeDetail = async (employeeNumber) => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get(`${apiBaseUrl}/leaves/retrieve_employee_detail/${employeeNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (res.data.employee) {
        const employee = res.data.employee;
        setSelectedEmployee(employee);
        
        // Build employee full name
        const fullName = `${employee.firstname || ''} ${employee.middlename || ''} ${employee.lastname || ''}`.trim();
        
        // Auto-fill form fields with correct mapping from API response
        form.setFieldsValue({
          employee_id: employee.employee_id, // Display value for user (this is the employee number)
          employee_name: fullName,
          department_name: employee.departments || '',
          job_title: employee.job_title || '',
          phone_number: employee.phone_number || employee.phone || '',
          employer: employee.employer || '',
          employer_id: employee.employer_id || '',
        });

        console.log('Employee details loaded:', {
          employee_id: employee.employee_id,
          name: fullName,
          department: employee.departments,
          job_title: employee.job_title,
          employer: employee.employer
        });
      }
    } catch (error) {
      console.error('Error fetching employee data:', error.message);
      Swal.fire({
        title: 'Error',
        text: 'Employee not found. Please check the employee number.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#b2000a'
      });
    }
  };

  // Trigger the fetch when search query changes
  useEffect(() => {
    if (searchQuery !== '') {
      getEmployeeDetail(searchQuery);
    }
  }, [searchQuery]);

  const validateRequiredFields = (values) => {
    const requiredFields = [
      { key: 'employee_name', label: 'Employee Name' },
      { key: 'department_name', label: 'Department' },
      { key: 'job_title', label: 'Job Title' },
      { key: 'phone_number', label: 'Phone Number' },
      { key: 'resignation_date', label: 'Resignation Date' },
      { key: 'postal_address', label: 'Postal Address' },
      { key: 'remark', label: 'Remark' },
      { key: 'resignation_letter_file', label: 'Resignation Letter File' }
    ];

    // Check if employee is selected
    if (!selectedEmployee) {
      return ['Employee (Please search and select an employee)'];
    }

    const missingFields = [];
    
    requiredFields.forEach(field => {
      if (!values[field.key] || 
          (typeof values[field.key] === 'string' && values[field.key].trim() === '') ||
          (field.key.includes('file') && !values[field.key]?.file)) {
        missingFields.push(field.label);
      }
    });

    return missingFields;
  };

  const showValidationModal = (missingFields) => {
    const errorMessage = missingFields.length > 0 
      ? `Please fill in the following required fields:\n\n• ${missingFields.join('\n• ')}`
      : 'Please fill in all required fields.';

    Swal.fire({
      title: 'Required Fields Missing',
      text: errorMessage,
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: '#b2000a',
      customClass: {
        popup: 'swal2-popup-custom',
        title: 'swal2-title-custom',
        content: 'swal2-content-custom'
      }
    });
  };

  const handleSave = async (values) => {
    // Validate required fields before proceeding
    const missingFields = validateRequiredFields(values);
    if (missingFields.length > 0) {
      showValidationModal(missingFields);
      return;
    }

    setLoading(true);
    try {
      // No need for token validation - using session-based authentication
      const formData = new FormData();

      // Add employee_id from selected employee
      if (selectedEmployee) {
        // Use the actual database ID, not the employee_id field
        const employeeId = parseInt(selectedEmployee.id);
        formData.append('employee_id', employeeId);
        console.log('Sending employee_id (database ID):', employeeId, 'Type:', typeof employeeId);
        console.log('Selected employee data:', selectedEmployee);
        console.log('Available employee fields:', Object.keys(selectedEmployee));
      } else {
        console.error('No selected employee found!');
        Swal.fire({
          title: 'Error',
          text: 'No employee selected. Please search and select an employee first.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
        setLoading(false);
        return;
      }

      // Add form fields (exclude employee_id as it's handled separately)
      Object.keys(values).forEach(key => {
        if (key !== 'employee_id' && values[key] !== undefined && values[key] !== null) {
          if (key === 'resignation_date') {
            formData.append(key, dayjs(values[key]).format('YYYY-MM-DD'));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      // Debug: Log all form data
      console.log('Form data being sent:');
      for (let [key, value] of formData.entries()) {
        console.log(key, ':', value);
      }

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
        `${apiBaseUrl}/employees/exits/resignation/add_resignation`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'Resignation Saved Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        }).then(() => {
          navigate('/exits/resignations');
        });
      } else if (response.data.validator_err) {
        const validationErrors = response.data.validator_err;
        setErrorList(validationErrors);
        
        const formattedErrors = Object.keys(validationErrors)
          .map((field) => `${validationErrors[field].join(", ")}`)
          .join("\n");

        Swal.fire({
          title: "Validation Error",
          text: formattedErrors,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: '#b2000a'
        });
      }
    } catch (error) {
      console.error('Error saving resignation:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to save resignation',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#b2000a'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    // Validate required fields before proceeding
    const missingFields = validateRequiredFields(values);
    if (missingFields.length > 0) {
      showValidationModal(missingFields);
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();

      // Add employee_id from selected employee
      if (selectedEmployee) {
        // Use the actual database ID, not the employee_id field
        const employeeId = parseInt(selectedEmployee.id);
        formData.append('employee_id', employeeId);
        console.log('Sending employee_id (database ID):', employeeId, 'Type:', typeof employeeId);
        console.log('Selected employee data:', selectedEmployee);
        console.log('Available employee fields:', Object.keys(selectedEmployee));
      } else {
        console.error('No selected employee found!');
        Swal.fire({
          title: 'Error',
          text: 'No employee selected. Please search and select an employee first.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
        setLoading(false);
        return;
      }

      // Add form fields (exclude employee_id as it's handled separately)
      Object.keys(values).forEach(key => {
        if (key !== 'employee_id' && values[key] !== undefined && values[key] !== null) {
          if (key === 'resignation_date') {
            formData.append(key, dayjs(values[key]).format('YYYY-MM-DD'));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      // Debug: Log all form data
      console.log('Form data being sent:');
      for (let [key, value] of formData.entries()) {
        console.log(key, ':', value);
      }

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
        `${apiBaseUrl}/employees/exits/resignation/add_resignation`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.status === 200) {
        // Submit the resignation
        const submitResponse = await axios.post(
          `${apiBaseUrl}/employees/exits/resignation/submit_resignation/${response.data.data.id}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (submitResponse.data.status === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Resignation Submitted Successfully',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#b2000a'
          }).then(() => {
            navigate('/exits/resignations');
          });
        }
      }
    } catch (error) {
      console.error('Error submitting resignation:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit resignation',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#b2000a'
      });
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
        Swal.fire({
          title: 'Invalid File Type',
          text: 'You can only upload PDF or Word documents!',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
        return false;
      }
      const isValidSize = file.size / 1024 / 1024 < 5;
      if (!isValidSize) {
        Swal.fire({
          title: 'File Too Large',
          text: 'File must be smaller than 5MB!',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
        return false;
      }
      return false; // Prevent auto upload
    },
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
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
            </a>
          </li>
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}exits/resignations/add`}>
              Add Resignation
            </a>
          </li>
        </ol>
      </div>

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-header">
              <div className="flex">
                <h5 className="box-title my-auto">Add New Resignation</h5>
              </div>
            </div>
            <div className="box-body">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={{
                resignation_date: dayjs(),
              }}
            >
              {/* Employee Search and ID Row */}
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0 font-bold text-lg">
                      Search Employee <span style={{ color: "red" }}> *</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i className="ti ti-search"></i>
                      </div>
                      <input
                        type="text"
                        name="employee-search"
                        id="employee-search"
                        autoComplete="off"
                        className="p-2 pr-10 ti-form-input w-full"
                        placeholder="Search by Employee Number"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Employee ID"
                    name="employee_id"
                    rules={[{ required: true, message: 'Please search and select an employee' }]}
                  >
                    <Input 
                      placeholder="Employee ID" 
                      readOnly 
                      className="bg-gray-100"
                      value={selectedEmployee?.employee_id || ''}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Employee Name"
                    name="employee_name"
                    rules={[{ required: true, message: 'Please enter employee name' }]}
                  >
                    <Input 
                      placeholder="Employee Name" 
                      readOnly 
                      className="bg-gray-100"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                  >
                    <Input 
                      placeholder="Phone Number"
                    />
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
                    <Input 
                      placeholder="Department Name" 
                      readOnly 
                      className="bg-gray-100"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Job Title"
                    name="job_title"
                    rules={[{ required: true, message: 'Please enter job title' }]}
                  >
                    <Input 
                      placeholder="Job Title" 
                      readOnly 
                      className="bg-gray-100"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Employer"
                    name="employer"
                  >
                    <Input 
                      placeholder="Employer" 
                      readOnly 
                      className="bg-gray-100"
                    />
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
                <Col span={12}>
                  <Form.Item
                    label="Postal Address"
                    name="postal_address"
                    rules={[{ required: true, message: 'Please enter postal address' }]}
                  >
                    <Input placeholder="Postal Address" />
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
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Resignation Letter File"
                    name="resignation_letter_file"
                    rules={[{ required: true, message: 'Please upload resignation letter file' }]}
                  >
                    <Upload {...uploadProps} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item>
                    <Space>
                      <Button
                        type="primary"
                        style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                        htmlType="submit"
                        icon={<SaveOutlined />}
                        loading={loading}
                      >
                        Save
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => form.validateFields().then(handleSubmit)}
                        icon={<SendOutlined />}
                        loading={loading}
                        style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                      >
                        Save & Submit
                      </Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResignation;