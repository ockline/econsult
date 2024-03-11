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
      //Employee uploaded required document
export const fetchEmployeeUploadedDocument = async () => {
    
  try {
    const res = await axios.get(`${apiBaseUrl}/employees/document/show_uploaded_document`);
    return res.data.employee;
  } catch (error) {
    throw new Error('Failed to fetch employee documents: ' + error.message);
  }
};


// ****************************************************************************************
      //Social Record  Details
export const fetchSocialRecordDetails = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/employees/social/show_social_details`);
    return res.data.social_record;
  } catch (error) {
    throw new Error('Failed to fetch Social record: ' + error.message);
  }
};

// ****************************************************************************************
      //Social Record  Details
export const fetchPersonnelApplicationDetails = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/employees/application/show_application_details`);
    return res.data.personnel_application;
  } catch (error) {
    throw new Error('Failed to fetch Social record: ' + error.message);
  }
};