import axios from "axios";

//universal attribute;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
// ****************************************************************************************
   // Fetch all contracte  employee
export const fetchemployeeContract = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/contracts/fixed/show_fixed_contracts`);
    return res.data.contract_detail;
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