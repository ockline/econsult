import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//universal attribute;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

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
      //Person ID application  Details
export const fetchPersonnelApplicationDetails = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/employees/application/show_application_details`);
    return res.data.personnel_application;
  } catch (error) {
    throw new Error('Failed to fetch Social record: ' + error.message);
  }
};

// ******************************************

export const fetchAllIdApplicationDetails = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/application/show_general_id_requests`);
    return res.data.general_id_requests;
  } catch (error) {
    throw new Error('Failed to fetch Social record: ' + error.message);
  }
};

// ******************* get Induction   to initiate
      //Social Record  Details
export const fetchInductionRecordDetails = async () => {
  try {
    const res = await axios.get(`${apiBaseUrl}/employees/induction/show_induction_details`);
    return res.data.induction_detail;
  } catch (error) {
    throw new Error('Failed to fetch Social record: ' + error.message);
  }
};


//user roles

export const fetchUserRolesData = async () => {
    
  try {
    const res = await axios.get(`${apiBaseUrl}/roles/get_user_roles`);
    return res.data.user_roles;
  } catch (error) {
    throw new Error('Failed to fetch  user role: ' + error.message);
  }
};