import axios from "axios";

//universal attribute;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
// ****************************************************************************************
   // Fetch   employee by id
export const fetchEmployeeDetails = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/employees/retrive_employee_detail/${id}`);
     return res.data.employee;
  } catch (error) {
    throw new Error('Failed to fetch All employee contracted: ' + error.message);
  }
};




      //REquired Contract  Details
export const fetchRequiredContractDetails = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/contracts/required/show_required_details`);
    return res.data.contract_detail;
  } catch (error) {
    throw new Error('Failed to fetch Contract Details: ' + error.message);
  }
};
  //Fixed Contract
export const fetchFixedContract = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/contracts/fixed/show_fixed_contracts`);
    return res.data.fixed_contract;
  } catch (error) {
    throw new Error('Failed to fetch Fixed Contract: ' + error.message);
  }
};

//specific_task
export const fetchSpecificTaskContract = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/contracts/specific/show_specific_tasks`);
    return res.data.specific_task;
  } catch (error) {
    throw new Error('Failed to fetch Specific Contract: ' + error.message);
  }
};

// Termsa and Condtions
export const fetchTermConditionContract = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/contracts/terms/show_term_conditions`);
    return res.data.term_conditions;
  } catch (error) {
    throw new Error('Failed to fetch Show Term condition: ' + error.message);
  }
};
