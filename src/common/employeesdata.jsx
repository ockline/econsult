import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//universal attribute;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// ****************************************************************************************
      //Employee Personal Details
export const fetchEmployeeDetails = async () => {
    
  try {
    const res = await axios.get(`${apiBaseUrl}/employees/show_all_employee`);
    return res.data.employee;
  } catch (error) {
    throw new Error('Failed to fetch assessed candidates: ' + error.message);
  }
};

// ****************************************************************************************
      //Social Record  Details
export const fetchSocialRecordDetails = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/hiring/technical_interview/show_candidate`);
    return res.data.candidate;
  } catch (error) {
    throw new Error('Failed to fetch technical assessed candidates: ' + error.message);
  }
};