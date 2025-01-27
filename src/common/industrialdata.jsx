import axios from "axios";

//universal attribute;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
// ****************************************************************************************
   // Fetch   employee by id
export const fetchMisconductType = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/industrial_relationship/retrieve_misconduct_type`);
     return res.data.misconduct_cause;
  } catch (error) {
    throw new Error('Failed to fetch All misconduct type: ' + error.message);
  }
};
//fetch  perfomance critertial
export const fetchPerfomanceCriterial = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/industrial_relationship/retrieve_perfomance_criterials`);
     return res.data.perfomance_criterial;
  } catch (error) {
    throw new Error('Failed to fetch All perfomance criterial: ' + error.message);
  }
};



