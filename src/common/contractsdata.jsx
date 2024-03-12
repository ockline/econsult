import axios from "axios";

//universal attribute;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
// ****************************************************************************************
      //Social Record  Details
export const fetchRequiredContractDetails = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/contracts/required/show_required_details`);
    return res.data.contract_detail;
  } catch (error) {
    throw new Error('Failed to fetch Social record: ' + error.message);
  }
};