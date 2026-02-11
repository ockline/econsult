import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Button, Form, Input, message, Upload, Modal, Timeline, Tag, Space
} from 'antd';
import { 
  ArrowLeftOutlined, EyeOutlined, CheckOutlined, CloseOutlined, 
  RollbackOutlined, DownloadOutlined, FileTextOutlined, UploadOutlined
} from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { getActiveRole } from '../../../utility/roleHelper';

const { TextArea } = Input;

const ViewEndSpecificTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [endContract, setEndContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile-1');
  const [form] = Form.useForm();
  const [generatedPdf, setGeneratedPdf] = useState(null);
  const [pdfPreviewVisible, setPdfPreviewVisible] = useState(false);
  const [documentUrl, setDocumentUrl] = useState('');
  const [documentPreviewVisible, setDocumentPreviewVisible] = useState(false);
  const [previewDocumentName, setPreviewDocumentName] = useState('');
  const [employeeDocuments, setEmployeeDocuments] = useState([]);
  const activeRole = getActiveRole();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const docBaseUrl = import.meta.env.VITE_REACT_APP_DOC_BASE_URL;

  useEffect(() => {
    fetchEndContract();
  }, [id]);

  useEffect(() => {
    if (endContract?.id) {
      fetchDocuments();
    }
  }, [endContract]);

  useEffect(() => {
    const handleRoleChange = () => {
      fetchEndContract();
    };
    window.addEventListener('roleChanged', handleRoleChange);
    return () => window.removeEventListener('roleChanged', handleRoleChange);
  }, []);

  const fetchEndContract = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/employees/exits/end_specific_contract/show_end_specific_contract/${id}`,
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

  const fetchDocuments = async () => {
    if (!endContract?.id) return;
    
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${apiBaseUrl}/employees/exits/end_specific_contract/get_attachments/${endContract.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === 200 && response.data.data) {
        setEmployeeDocuments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const getExitTypePath = (exitType) => {
    const map = { end_specific_contract: 'end_specific_contract', mutual_agreement: 'mutual_agreement', retrenchment: 'retrenchment' };
    return map[exitType] || 'end_specific_contract';
  };

  const hasUserActed = () => {
    if (!endContract?.workflows || !activeRole) return false;
    const currentUserId = sessionStorage.getItem('userId') || '1';
    return endContract.workflows.some(workflow => 
      workflow.attended_by?.id?.toString() === currentUserId.toString()
    );
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

        const response = await axios.post(endpoint, requestData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

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

  const generatePDF = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const endpoint = `${apiBaseUrl}/employees/exits/end_specific_contract/generate_end_specific_contract_pdf/${id}`;

      const response = await axios.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setGeneratedPdf({ blob, url, name: `end_specific_contract_${endContract.employee_name}_${dayjs().format('YYYY-MM-DD')}.pdf` });
      setPdfPreviewVisible(true);
      
      message.success('PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      message.error('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  const savePDF = async () => {
    if (!generatedPdf) {
      message.error('Please generate PDF first');
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();
      formData.append('attachment_file', generatedPdf.blob, generatedPdf.name);
      formData.append('end_contract_id', id);
      formData.append('document_name', `End Specific Contract - ${endContract.employee_name}`);
      formData.append('document_type', 'end_specific_contract');

      const response = await axios.post(
        `${apiBaseUrl}/employees/exits/end_specific_contract/save_attachment/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 200) {
        Swal.fire({
          title: 'Success',
          text: 'PDF saved successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#b2000a'
        });
        fetchDocuments();
        setPdfPreviewVisible(false);
        setGeneratedPdf(null);
      } else {
        message.error(response.data.message || 'Failed to save PDF');
      }
    } catch (error) {
      console.error('Error saving PDF:', error);
      message.error('Failed to save PDF');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!generatedPdf) return;
    
    const link = document.createElement('a');
    link.href = generatedPdf.url;
    link.download = generatedPdf.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewClick = async (attachment) => {
    if (!attachment) return;
    
    try {
      const token = sessionStorage.getItem('token');
      const endContractId = attachment.end_contract_id ?? endContract?.id;
      const exitPath = getExitTypePath(attachment.exit_type);
      const attachmentUrl = `${apiBaseUrl}/employees/exits/${exitPath}/get_attachment_file/${endContractId}/${attachment.id}`;
      
      // Fetch the file as base64 encoded data
      const response = await axios.get(attachmentUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.status === 200 && response.data.data) {
        const { file_content, mime_type } = response.data.data;
        
        // Create data URL from base64 content
        const dataUrl = `data:${mime_type};base64,${file_content}`;
        
        setDocumentUrl(dataUrl);
        setPreviewDocumentName(attachment.document_name || attachment.doc_name || 'Document Preview');
        setDocumentPreviewVisible(true);
      } else {
        message.error('Failed to load document');
      }
    } catch (error) {
      console.error('Error previewing document:', error);
      message.error('Failed to preview document');
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
    };
    return colors[status] || 'default';
  };

  const getStatusBgColor = (status) => {
    const colors = {
      'Initiated': '#1890ff',
      'Approved': '#52c41a',
      'Submitted': '#1890ff',
      'Under Review': '#faad14',
      'Rejected': '#ff4d4f',
      'Draft': '#d9d9d9',
    };
    return colors[status] || '#d9d9d9';
  };

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    // Hide all tab panels
    document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
      panel.classList.add('hidden');
    });
    // Show selected tab panel
    const selectedPanel = document.getElementById(tabId);
    if (selectedPanel) {
      selectedPanel.classList.remove('hidden');
    }
    // Update active tab button
    document.querySelectorAll('[role="tab"]').forEach(tab => {
      tab.classList.remove('hs-tab-active:bg-primary', 'hs-tab-active:border-primary', 'hs-tab-active:text-white', 'active');
      if (!tab.classList.contains('dark:bg-black/20')) {
        tab.classList.add('dark:bg-black/20', 'dark:border-white/10', 'dark:text-white/70');
      }
    });
    const selectedTab = document.querySelector(`[aria-controls="${tabId}"]`);
    if (selectedTab) {
      selectedTab.classList.add('hs-tab-active:bg-primary', 'hs-tab-active:border-primary', 'hs-tab-active:text-white', 'active');
      selectedTab.classList.remove('dark:bg-black/20', 'dark:border-white/10', 'dark:text-white/70');
    }
  };

  useEffect(() => {
    // Initialize first tab as active
    if (endContract) {
      switchTab('profile-1');
    }
  }, [endContract]);

  if (loading && !endContract) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column' }}>
        <div className="ti-spinner text-primary" role="status" aria-label="loading" style={{ fontSize: '48px' }}>
          <span className="sr-only">Loading...</span>
        </div>
        <p style={{ marginTop: '20px', fontSize: '16px', color: '#666' }}>Loading end specific contract details...</p>
      </div>
    );
  }

  if (!endContract && !loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', flexDirection: 'column' }}>
        <p style={{ fontSize: '18px', color: '#999' }}>End contract not found</p>
        <button
          type="button"
          className="ti-btn ti-btn-primary mt-4"
          style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
          onClick={() => navigate('/exits/end_specific_contracts')}
        >
          <i className="ti ti-arrow-left w-3.5 h-3.5"></i> Back to List
        </button>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <body className=""></body>
      </Helmet>

      <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>View End Specific Task Contract</h1>

        <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
          <li className="text-sm">
            <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to={`${import.meta.env.BASE_URL}dashboards/normal`}>
              Home
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
            </Link>
          </li>
          <li className="text-sm">
            <Link className="flex items-center text-primary hover:text-primary dark:text-primary" to={`${import.meta.env.BASE_URL}exits/end_specific_contracts`}>
              End Specific Task Exit
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
            </Link>
          </li>
          <li className="text-sm text-gray-500 dark:text-white/70" aria-current="page">
            View End Contract
          </li>
        </ol>
      </div>

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 xxl:col-span-5">
          <div className="box">
            <div className="box-header">
              <div className="flex justify-between items-center">
                <h5 className="box-title justify-center font-bold text-black !text-lg">Basic Information</h5>
                <button 
                  type="button" 
                  className="ti-btn ti-btn-primary" 
                  style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                  onClick={() => navigate('/exits/end_specific_contracts')}
                >
                  <i className="ti ti-arrow-left w-3.5 h-3.5"></i> Back
                </button>
              </div>
            </div>
            <div className="box-body py-3">
              <div className="xl:overflow-hidden overflow-x-auto">
                <table className="ti-custom-table border-0">
                  <tbody>
                    <tr className="border-0">
                      <td className="!p-2 !text-lg font-bold text-black">Employee Name</td>
                      <td className="!p-2">:</td>
                      <td className="!p-2 text-black font-medium">{endContract.employee_name}</td>
                    </tr>
                    <tr className="!border-0">
                      <td className="!p-2 !text-lg font-bold text-black">Department</td>
                      <td className="!p-2">:</td>
                      <td className="!p-2 text-black">{endContract.department_name}</td>
                    </tr>
                    <tr className="!border-0">
                      <td className="!p-2 !text-lg font-bold text-black">Job Title</td>
                      <td className="!p-2">:</td>
                      <td className="!p-2 text-black">{endContract.job_title}</td>
                    </tr>
                    <tr className="!border-0">
                      <td className="!p-2 !text-lg font-bold text-black">Phone Number</td>
                      <td className="!p-2">:</td>
                      <td className="!p-2 text-black">{endContract.phone_number}</td>
                    </tr>
                    <tr className="!border-0">
                      <td className="!p-2 !text-lg font-bold text-black">End Date</td>
                      <td className="!p-2">:</td>
                      <td className="!p-2 text-black">
                        {endContract.end_date ? dayjs(endContract.end_date).format('DD MMM YYYY') : 'N/A'}
                      </td>
                    </tr>
                    <tr className="!border-0">
                      <td className="!p-2 !text-lg font-bold text-black">Status</td>
                      <td className="!p-2">:</td>
                      <td className="!p-2">
                        <Tag color={getStatusColor(endContract.status)}>{endContract.status}</Tag>
                      </td>
                    </tr>
                    <tr className="!border-0">
                      <td className="!p-2 !text-lg font-bold text-black">Postal Address</td>
                      <td className="!p-2">:</td>
                      <td className="!p-2 text-black">{endContract.postal_address}</td>
                    </tr>
                    <tr className="!border-0">
                      <td className="!p-2 !text-lg font-bold text-black">Remark</td>
                      <td className="!p-2">:</td>
                      <td className="!p-2 text-black">{endContract.remark}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xxl:col-span-7">
          <div className="box">
            <div className="box-header">
              <nav
                className="sm:flex sm:space-x-2 space-y-2 sm:space-y-0 rtl:space-x-reverse block"
                aria-label="Tabs"
                role="tablist"
              >
                <button
                  type="button"
                  className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300 active"
                  id="profile-item-1"
                  data-hs-tab="#profile-1"
                  aria-controls="profile-1"
                  role="tab"
                  onClick={() => switchTab('profile-1')}
                >
                  <i className="ti ti-user-circle font-semibold"></i>
                  Employee Particulars
                </button>
                <button
                  type="button"
                  className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-1 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                  id="profile-item-2"
                  data-hs-tab="#profile-2"
                  aria-controls="profile-2"
                  role="tab"
                  onClick={() => switchTab('profile-2')}
                >
                  <i className="ti ti-file-text font-semibold"></i>
                  Employment Contract Details
                </button>
                <button
                  type="button"
                  className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                  id="profile-item-3"
                  data-hs-tab="#profile-3"
                  aria-controls="profile-3"
                  role="tab"
                  onClick={() => switchTab('profile-3')}
                >
                  <i className="ti ti-folders font-semibold"></i>
                  Documents Center
                </button>
                <button
                  type="button"
                  className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-lg text-center border text-black rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                  id="profile-item-4"
                  data-hs-tab="#profile-4"
                  aria-controls="profile-4"
                  role="tab"
                  onClick={() => switchTab('profile-4')}
                >
                  <i className="ti ti-checklist font-semibold"></i>
                  Workflow Actions
                </button>
              </nav>
            </div>
            <div className="box-body">
              {/* Tab 1: Employee Particulars */}
              <div
                id="profile-1"
                className=""
                role="tabpanel"
                aria-labelledby="profile-item-1"
              >
                <div className="xl:overflow-hidden overflow-x-auto">
                  <table className="ti-custom-table border-0">
                    <tbody>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Employer Name</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">{endContract.employer_name || 'N/A'}</td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Letter Title</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">{endContract.letter_title || 'N/A'}</td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Signed Date</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">
                          {endContract.signed_date ? dayjs(endContract.signed_date).format('DD MMM YYYY') : 'N/A'}
                        </td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Started Date</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">
                          {endContract.started_date ? dayjs(endContract.started_date).format('DD MMM YYYY') : 'N/A'}
                        </td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Days Worked</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">{endContract.days_worked || 'N/A'}</td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Designation</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">{endContract.designation || 'N/A'}</td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">HR Name</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">{endContract.hr_name || 'N/A'}</td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Employee Designation</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">{endContract.employee_designation || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tab 2: Employment Contract Details */}
              <div
                id="profile-2"
                className="hidden"
                role="tabpanel"
                aria-labelledby="profile-item-2"
              >
                <div className="xl:overflow-hidden overflow-x-auto">
                  <table className="ti-custom-table border-0">
                    <tbody>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">On Behalf Of</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">{endContract.on_behalf_of || 'N/A'}</td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Contract Date</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">
                          {endContract.contract_date ? dayjs(endContract.contract_date).format('DD MMM YYYY') : 'N/A'}
                        </td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Expire Date</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">
                          {endContract.expire_date ? dayjs(endContract.expire_date).format('DD MMM YYYY') : 'N/A'}
                        </td>
                      </tr>
                      <tr className="!border-0">
                        <td className="!p-2 !text-lg font-bold text-black">Non-Renewal Letter Title</td>
                        <td className="!p-2">:</td>
                        <td className="!p-2 text-black">{endContract.non_renewal_letter_title || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tab 3: Documents Center */}
              <div
                id="profile-3"
                className="hidden text-center"
                role="tabpanel"
                aria-labelledby="profile-item-3"
              >
                <div className="box">
                  <div className="box-header">
                    <h5 className="box-title">Documents Center</h5>
                  </div>
                  <div className="box-body">
                    {/* PDF Generation Section */}
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                      <h6 className="text-lg font-semibold mb-4">Generate End Specific Contract PDF</h6>
                      <Button
                        type="primary"
                        icon={<FileTextOutlined />}
                        onClick={generatePDF}
                        loading={loading}
                        size="large"
                        style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                      >
                        Generate PDF
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        Click to generate and preview the filled End Specific Contract document. You can save it after reviewing.
                      </p>
                    </div>

                    {/* PDF Preview Modal */}
                    <Modal
                      title="End Specific Contract - PDF Preview"
                      open={pdfPreviewVisible}
                      onCancel={() => {
                        setPdfPreviewVisible(false);
                        if (generatedPdf?.url) {
                          window.URL.revokeObjectURL(generatedPdf.url);
                        }
                        setGeneratedPdf(null);
                      }}
                      footer={[
                        <Button key="close" onClick={() => {
                          setPdfPreviewVisible(false);
                          if (generatedPdf?.url) {
                            window.URL.revokeObjectURL(generatedPdf.url);
                          }
                          setGeneratedPdf(null);
                        }}>
                          Close
                        </Button>,
                        <Button
                          key="download"
                          type="default"
                          icon={<DownloadOutlined />}
                          onClick={downloadPDF}
                        >
                          Download
                        </Button>,
                        <Button
                          key="save"
                          type="primary"
                          icon={<UploadOutlined />}
                          onClick={savePDF}
                          loading={loading}
                          style={{ backgroundColor: '#b2000a', borderColor: '#b2000a' }}
                        >
                          Save PDF
                        </Button>,
                      ]}
                      width="90%"
                      style={{ top: 20 }}
                      bodyStyle={{ padding: 0, height: 'calc(100vh - 200px)', overflow: 'hidden' }}
                    >
                      {generatedPdf && (
                        <iframe
                          src={generatedPdf.url}
                          style={{ width: '100%', height: '100%', border: 'none' }}
                          title="PDF Preview"
                        />
                      )}
                    </Modal>

                    {/* Saved Document Preview Modal */}
                    <Modal
                      title={`Document Preview - ${previewDocumentName}`}
                      open={documentPreviewVisible}
                      onCancel={() => {
                        setDocumentPreviewVisible(false);
                        setDocumentUrl('');
                        setPreviewDocumentName('');
                      }}
                      footer={[
                        <Button key="close" onClick={() => {
                          setDocumentPreviewVisible(false);
                          setDocumentUrl('');
                          setPreviewDocumentName('');
                        }}>
                          Close
                        </Button>,
                      ]}
                      width="90%"
                      style={{ top: 20 }}
                      bodyStyle={{ padding: 0, height: 'calc(100vh - 200px)', overflow: 'hidden' }}
                    >
                      {documentUrl && (
                        <iframe
                          src={documentUrl}
                          style={{ width: '100%', height: '100%', border: 'none' }}
                          title="Document Preview"
                        />
                      )}
                    </Modal>

                    {/* Documents List */}
                    <div className="pb-5">
                      <div className="md:flex justify-between space-y-2 md:space-y-0">
                        <div className="relative max-w-xs">
                          <label htmlFor="hs-table-search" className="sr-only">Search</label>
                          <input
                            type="text"
                            name="hs-table-search"
                            id="hs-table-search"
                            className="p-2 ltr:pr-10 rtl:pl-10 ti-form-input"
                            placeholder="Search for items"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="overflow-auto">
                      <table className="ti-custom-table table-bordered ti-custom-table-head">
                        <thead className="bg-gray-50 dark:bg-black/20">
                          <tr>
                            <th>S/No</th>
                            <th scope="col" className="!min-w-[13rem]">Document Name</th>
                            {employeeDocuments?.[0]?.employee_name != null && (
                              <>
                                <th scope="col">Employee</th>
                                <th scope="col">Exit Type</th>
                              </>
                            )}
                            <th scope="col">Modified Date</th>
                            <th scope="col" className="!text-end">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employeeDocuments && Array.isArray(employeeDocuments) && employeeDocuments.length > 0 ? (
                            employeeDocuments.map((document, index) => (
                              <tr key={document.id || index}>
                                <td>{index + 1}</td>
                                <td className="font-medium">{document.document_name || document.doc_name || 'Untitled Document'}</td>
                                {employeeDocuments[0]?.employee_name != null && (
                                  <>
                                    <td>{document.employee_name || '—'}</td>
                                    <td>{document.exit_type ? document.exit_type.replace(/_/g, ' ') : '—'}</td>
                                  </>
                                )}
                                <td>{document.created_at ? dayjs(document.created_at).format('DD MMM YYYY') : (document.doc_modified || 'N/A')}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="ti-btn ti-btn-success text-black"
                                    onClick={() => handlePreviewClick(document)}
                                  >
                                    <i className="ti ti-eye-check !text-white"></i>Preview
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={employeeDocuments?.length > 0 && employeeDocuments[0]?.employee_name != null ? 6 : 4} className="text-center py-4">
                                No documents available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab 4: Workflow Actions */}
              <div
                id="profile-4"
                className="hidden"
                role="tabpanel"
                aria-labelledby="profile-item-4"
              >
                <div className="space-y-4">
                  {/* Timeline */}
                  <div>
                    <h6 className="text-lg font-semibold mb-4">Workflow History</h6>
                    <Timeline>
                      {endContract.workflows?.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((workflow, index) => (
                        <Timeline.Item key={index} color={getStatusColor(workflow.status)}>
                          <div
                            style={{
                              position: 'relative',
                              padding: '20px',
                              backgroundColor: '#fff',
                              borderRadius: '8px',
                              border: '1px solid #f0f0f0',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                              marginBottom: '16px',
                              minHeight: '120px'
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '20px'
                              }}
                            >
                              <strong style={{ fontSize: '16px', color: '#262626', fontWeight: 600 }}>
                                {workflow.function_name}
                              </strong>
                              <span style={{ color: '#52c41a', fontSize: '13px', fontWeight: 500 }}>
                                {dayjs(workflow.attended_date || workflow.created_at).format('DD MMM YYYY, hh:mm A')}
                              </span>
                            </div>

                            {workflow.attended_by && (
                              <div style={{ marginBottom: '20px' }}>
                                <div style={{ color: '#262626', fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>
                                  {workflow.attended_by?.name || 'Unknown User'}
                                </div>
                                <div style={{ color: '#8c8c8c', fontSize: '12px' }}>
                                  ({workflow.previous_stage || 'System'})
                                </div>
                              </div>
                            )}

                            {workflow.comments && (
                              <div style={{ color: '#8c8c8c', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px' }}>
                                {workflow.comments}
                              </div>
                            )}

                            {workflow.recommendation && (
                              <div style={{ color: '#8c8c8c', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px' }}>
                                <strong>Recommendation:</strong> {workflow.recommendation}
                              </div>
                            )}

                            <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
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
                    <div style={{ marginTop: 24, paddingTop: 24, borderTop: '2px solid #f0f2f5' }}>
                      <h6 className="text-lg font-semibold mb-4">Take Action</h6>
                      <Form layout="vertical">
                        <Form.Item label="Comments" name="comments">
                          <TextArea
                            rows={4}
                            placeholder="Enter your comments here..."
                            id="workflow-action-comments"
                          />
                        </Form.Item>

                        <Space direction="vertical" style={{ width: '100%' }}>
                          {((activeRole?.endsWith('R') || activeRole?.startsWith('IR') || activeRole === 'DEV' || activeRole === 'ADMIN')) && (
                            <div style={{ display: 'flex', gap: '8px' }}>
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

                          {(activeRole?.endsWith('A') || activeRole?.startsWith('IR') || activeRole === 'DEV' || activeRole === 'ADMIN' || activeRole === 'MD') && (
                            <>
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
                            </>
                          )}
                        </Space>
                      </Form>
                    </div>
                  )}

                  {endContract.status !== 'Completed' && endContract.status !== 'Rejected' && hasUserActed() && (
                    <div
                      style={{
                        marginTop: 24,
                        paddingTop: 24,
                        borderTop: '2px solid #f0f2f5',
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: '#f6ffed',
                        border: '1px solid #b7eb8f',
                        borderRadius: '6px'
                      }}
                    >
                      <div style={{ color: '#52c41a', fontSize: '14px', fontWeight: 500 }}>
                        ✓ You have already taken action on this end contract
                      </div>
                      <div style={{ color: '#8c8c8c', fontSize: '12px', marginTop: '4px' }}>
                        No further action is required from you at this stage
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEndSpecificTask;
