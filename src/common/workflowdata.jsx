

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//universal attribute;
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// ****************************************************************************************
      //Employee Personal Details
export const fetchInitiatedJobDetails = async () => {
    
  try {
    const res = await axios.get(`${apiBaseUrl}/workflows/vacancies/retrive_initiated`);
    return res.data.initiated_details;
  } catch (error) {
    throw new Error('Failed to fetch initiated job workflow: ' + error.message);
  }
};