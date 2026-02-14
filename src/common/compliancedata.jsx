import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch employees for compliance template generation
 * @param {Object} params - { month, year, category } category: new|promotion|terminated|retrenched
 */
export const fetchComplianceEmployees = async (params = {}) => {
  try {
    const res = await axios.get(`${apiBaseUrl}/compliances/template_employees`, {
      params: { month: params.month, year: params.year, category: params.category }
    });
    return res.data.employees || [];
  } catch (error) {
    // Fallback to contracts if compliance API not available
    try {
      const res = await axios.get(`${apiBaseUrl}/contracts/all_contracts/show_contract`);
      return (res.data.all_contracts || []).map(c => ({
        employee_id: c.employee_id,
        employee_no: c.employee_no || c.employee_id,
        employee_name: c.employee_name,
        employer_name: c.employer_name || c.employer || "",
        basic_salary: c.basic_salary || c.basic_pay || 0,
        house_allowance: c.house_allowance || 0,
        meal_allowance: c.meal_allowance || 0,
        transport_allowance: c.transport_allowance || 0,
        wcf: c.wcf_number || c.wcf || "",
        firstname: c.firstname || (c.employee_name || "").split(" ")[0] || "",
        middlename: c.middlename || "",
        lastname: c.lastname || (c.employee_name || "").split(" ").slice(1).join(" ") || "",
        gender: c.gender || "",
        dob: c.dob || "",
        basic_pay: c.basic_salary || c.basic_pay || 0,
        gross_pay: c.gross_pay || (c.basic_salary || 0) + (c.house_allowance || 0) + (c.meal_allowance || 0) + (c.transport_allowance || 0),
        job_title: c.job_title || c.job_title_name || "",
        employee_category: c.employee_category || c.staff_classfication || "",
        national_id: c.national_id || "",
        nssf_member_no: c.nssf || c.member_no || "",
        tin: c.tin || ""
      }));
    } catch (e) {
      throw new Error("Failed to fetch compliance employee data: " + (e.message || "Unknown error"));
    }
  }
};

/**
 * Fetch WCF occupational reconciliation records
 */
export const fetchOccupationalRecords = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/compliances/occupational/list`);
    return res.data.occupational || [];
  } catch (error) {
    return [];
  }
};

/**
 * Create WCF occupational record
 */
export const createOccupationalRecord = async (formData) => {
  const res = await axios.post(`${apiBaseUrl}/compliances/occupational/store`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

/**
 * Update WCF occupational record
 */
export const updateOccupationalRecord = async (id, formData) => {
  const res = await axios.post(`${apiBaseUrl}/compliances/occupational/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

/**
 * Import occupational Excel
 */
export const importOccupationalExcel = async (formData) => {
  const res = await axios.post(`${apiBaseUrl}/compliances/occupational/import`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};
