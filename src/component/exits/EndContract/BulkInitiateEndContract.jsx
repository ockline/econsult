import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, DatePicker, Table, Checkbox, Space, message, Row, Col, Card } from 'antd';
import { ContractType } from '/src/common/select2data';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const { RangePicker } = DatePicker;
const { Option } = Select;

const BulkInitiateEndContract = ({ visible, onCancel, onSuccess }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [contractType, setContractType] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (visible) {
      // Reset state when modal opens
      setContractType(null);
      setDateRange(null);
      setEmployees([]);
      setFilteredEmployees([]);
      setSelectedRowKeys([]);
      setSelectAll(false);
    }
  }, [visible]);

  // Fetch employees based on filters from contract tables
  const fetchEmployees = async () => {
    if (!contractType) {
      message.warning('Please select a contract type');
      return;
    }

    setFetching(true);
    try {
      const token = sessionStorage.getItem('token');
      let endpoint = '';
      let dataKey = '';

      // Use existing contract APIs, but all heavy logic (employee_number, etc.)
      // is handled in the backend repositories. We do NOT change those routes,
      // only read additional fields they now expose.
      // ContractType: 1 = Fixed Term, 2 = Specific Task, 3 = Unspecified
      if (contractType === '1') {
        endpoint = `${apiBaseUrl}/contracts/fixed/show_fixed_contracts`;
        dataKey = 'fixed_contract';
      } else if (contractType === '2') {
        endpoint = `${apiBaseUrl}/contracts/specific/show_specific_tasks`;
        dataKey = 'specific_task';
      } else if (contractType === '3') {
        message.warning('Unspecified contract endpoint not available');
        setEmployees([]);
        setFilteredEmployees([]);
        setFetching(false);
        return;
      } else {
        message.error('Invalid contract type selected');
        setFetching(false);
        return;
      }

      const response = await axios.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.status === 200 || response.data[dataKey]) {
        // For fixed/specific task contract APIs the payload key is fixed_contract / specific_task
        let contractList = response.data[dataKey] || response.data.data || [];
        
        // Filter by employment date range if provided
        if (dateRange && dateRange.length === 2) {
          const fromDate = dayjs(dateRange[0]).startOf('day');
          const toDate = dayjs(dateRange[1]).endOf('day');
          
          contractList = contractList.filter(contract => {
            // Try different date field names
            const empDateStr = contract.date_employed || contract.employment_date || contract.created_at || contract.contract_created;
            if (!empDateStr) return false;
            
            const empDate = dayjs(empDateStr);
            return empDate.isAfter(fromDate.subtract(1, 'day')) && empDate.isBefore(toDate.add(1, 'day'));
          });
        }

        // Map data returned from backend (repositories already join employees and contracts
        // and expose employee_number and employee_db_id fields)
        const mappedEmployees = contractList.map((contract) => {
          // Backend now returns:
          // - employee_number: human employee number from employees table (e.employee_no)
          // - employee_db_id: foreign key to employees table (cd.employee_id)
          return {
            // Contract data
            contract_id: contract.id,
            contract_created: contract.contract_created || contract.created_at,

            // IDs
            employee_db_id: contract.employee_db_id || contract.employee_id,

            // Human employee number (e.g. 9023)
            employee_number: contract.employee_number || null,

            // Employee / contract details
            employee_name: contract.employee_name || contract.contract_employee || '',
            firstname: contract.firstname || '',
            middlename: contract.middlename || '',
            lastname: contract.lastname || '',
            departments: contract.departments || contract.department || contract.department_name || '',
            job_title: contract.job_title || '',
            date_employed: contract.date_employed || contract.employment_date || contract.created_at || contract.contract_created,
            employer: contract.employer || contract.employer_name || '',

            // Contract type
            contract_type: contractType,

            // Keep original contract data for reference
            original_contract: contract,
          };
        });

        setEmployees(mappedEmployees);
        setFilteredEmployees(mappedEmployees);
        message.success(`Found ${mappedEmployees.length} employee(s) with ${ContractType.find(t => t.value === contractType)?.label || 'contract'}`);
      } else {
        message.error(response.data.message || 'Failed to fetch employees');
        setEmployees([]);
        setFilteredEmployees([]);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      message.error(error.response?.data?.message || 'Failed to fetch employees. Please check your connection and try again.');
      setEmployees([]);
      setFilteredEmployees([]);
    } finally {
      setFetching(false);
    }
  };

  const handleSearch = () => {
    if (!contractType) {
      message.warning('Please select a contract type');
      return;
    }
    fetchEmployees();
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedRowKeys(filteredEmployees.map(emp => emp.employee_db_id || emp.id || emp.contract_id));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleSelectRow = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
    setSelectAll(selectedKeys.length === filteredEmployees.length && filteredEmployees.length > 0);
  };

  const handleBulkInitiate = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select at least one employee');
      return;
    }

    // Get readable contract type label for messaging
    const selectedType = ContractType.find(t => t.value === contractType);
    const contractTypeLabel = selectedType?.label || 'selected contract type';

    const result = await Swal.fire({
      title: 'Bulk Exit Initiation',
      html: `<p>Are you sure you want to initiate exit based on type of contract <strong>(${contractTypeLabel})</strong> for <strong>${selectedRowKeys.length}</strong> employee(s)?</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#b2000a',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Initiate All',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      // No working bulk endpoint on backend; use individual creates for all selected employees.
      await handleIndividualCreates();
    } catch (error) {
      console.error('Error bulk initiating end contracts:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || error.message || 'Failed to bulk initiate end contracts',
        icon: 'error',
        confirmButtonColor: '#b2000a'
      });
    } finally {
      setLoading(false);
    }
  };

  // Fallback: Create end contracts individually
  const handleIndividualCreates = async () => {
    const selectedEmployees = filteredEmployees.filter(emp => 
      selectedRowKeys.includes(emp.employee_db_id || emp.id || emp.contract_id)
    );

    let successCount = 0;
    let failCount = 0;
    const errors = [];
    const token = sessionStorage.getItem('token');

    // Use the same end contract endpoint for all contract types.
    const endpoint = `${apiBaseUrl}/employees/exits/endcontract/create_endcontract`;

    for (const emp of selectedEmployees) {
      try {
        const formData = new FormData();
        // Use employee_db_id (database ID from employees table) for the foreign key
        formData.append('employee_id', emp.employee_db_id || emp.id);
        
        // Add required fields for end contract creation
        const fullName = emp.employee_name || `${emp.firstname || ''} ${emp.middlename || ''} ${emp.lastname || ''}`.trim();
        if (fullName) formData.append('employee_name', fullName);
        if (emp.departments) formData.append('department_name', emp.departments);
        if (emp.job_title) formData.append('job_title', emp.job_title);
        formData.append('action', 'save'); // Save as draft

        const response = await axios.post(
          endpoint,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.data.status === 200) {
          successCount++;
        } else {
          failCount++;
          errors.push(`${fullName || emp.employee_id}: ${response.data.message}`);
        }
      } catch (error) {
        failCount++;
        const fullName = emp.employee_name || `${emp.firstname || ''} ${emp.middlename || ''} ${emp.lastname || ''}`.trim();
        errors.push(`${fullName || emp.employee_number}: ${error.response?.data?.message || 'Failed'}`);
      }
    }

    const message = failCount > 0 
      ? `Successfully initiated ${successCount} contract(s). ${failCount} failed.`
      : `Successfully initiated ${successCount} contract(s).`;

    Swal.fire({
      title: failCount > 0 ? 'Partial Success' : 'Success!',
      html: `<p>${message}</p>${errors.length > 0 ? `<div style="max-height: 200px; overflow-y: auto; margin-top: 10px; text-align: left;"><small>${errors.join('<br>')}</small></div>` : ''}`,
      icon: failCount > 0 ? 'warning' : 'success',
      confirmButtonColor: '#b2000a'
    });

    setSelectedRowKeys([]);
    setSelectAll(false);
    if (onSuccess) {
      onSuccess();
    }
    onCancel();
  };

  const columns = [
    {
      title: 'S/N',
      key: 'index',
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: 'Employee Number',
      key: 'employee_number',
      render: (_, record) => {
        // Display employee_number derived from employees table (like 9023)
        return record.employee_number
          || record.original_employee?.employee_id
          || 'N/A';
      },
    },
    {
      title: 'Employee Name',
      key: 'name',
      render: (_, record) => {
        return record.employee_name || 
               `${record.firstname || ''} ${record.middlename || ''} ${record.lastname || ''}`.trim() || 
               'N/A';
      },
    },
    {
      title: 'Employer',
      dataIndex: 'employer',
      key: 'employer',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Department',
      dataIndex: 'departments',
      key: 'departments',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Date Employed',
      key: 'date_employed',
      render: (_, record) => {
        const date = record.date_employed || record.employment_date || record.created_at || record.contract_created;
        return date ? dayjs(date).format('DD MMM YYYY') : 'N/A';
      },
    },
    {
      title: 'Contract Type',
      key: 'contract_type',
      render: (_, record) => {
        const contractTypeId = record.contract_type || record.contract_id || contractType;
        const type = ContractType.find(t => t.value == contractTypeId);
        return type ? type.label : 'N/A';
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectRow,
    onSelectAll: handleSelectAll,
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="ti ti-users w-5 h-5"></i>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Bulk Exit Initiation</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1200}
      style={{ top: 20 }}
    >
      <div style={{ padding: '20px 0' }}>
        {/* Filter Section */}
        <Card title="Filter Criteria" style={{ marginBottom: '20px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <div className="space-y-2">
                <label className="ti-form-label mb-0 font-bold">
                  Contract Type <span style={{ color: "red" }}> *</span>
                </label>
                <Select
                  placeholder="Select Contract Type"
                  style={{ width: '100%' }}
                  value={contractType}
                  onChange={setContractType}
                >
                  {ContractType.map(type => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div className="space-y-2">
                <label className="ti-form-label mb-0 font-bold">
                  Date Employed (From - To)
                </label>
                <RangePicker
                  style={{ width: '100%' }}
                  value={dateRange}
                  onChange={setDateRange}
                  format="DD MMM YYYY"
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Button
                type="primary"
                onClick={handleSearch}
                loading={fetching}
                disabled={!contractType}
                style={{ marginTop: '28px', backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                block
              >
                <i className="ti ti-search"></i> Search Employees
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Table Section */}
        {filteredEmployees.length > 0 && (
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Select Employees ({filteredEmployees.length} found)</span>
                <Space>
                  <Checkbox
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  >
                    Select All ({selectedRowKeys.length} selected)
                  </Checkbox>
                </Space>
              </div>
            }
            style={{ marginBottom: '20px' }}
          >
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredEmployees}
              rowKey={(record) => record.employee_db_id || record.id || record.contract_id}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} employees`,
              }}
              scroll={{ x: true }}
            />
          </Card>
        )}

        {/* Action Buttons */}
        {filteredEmployees.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              type="primary"
              onClick={handleBulkInitiate}
              loading={loading}
              disabled={selectedRowKeys.length === 0}
              style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
            >
              <i className="ti ti-send"></i> Initiate Selected ({selectedRowKeys.length})
            </Button>
          </div>
        )}

        {filteredEmployees.length === 0 && !fetching && contractType && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#8c8c8c' }}>
            <i className="ti ti-inbox" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
            <p>No employees found. Please adjust your filters and search again.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BulkInitiateEndContract;

