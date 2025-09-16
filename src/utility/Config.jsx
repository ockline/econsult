// src/utility/Config.jsx

// Named export for Config
export const Config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  docBaseUrl: import.meta.env.VITE_DOC_BASE_URL,
};

// Named export for ROLES
export const ROLES = {
  DEV: "Developer",
  SA: "System Administrator",
  SUA: "Super Approver",
  MD: "Managing director",
  OM: "Operation Manager",
  AF: "Administrator Functional",
  RI: "Registration Initiator",
  RR: "Registration Reviewer",
  RA: "Registration Approver",
  VI: "Vacancy Initiator",
  VA: "Vacancy Approval",
  II: "Interview Initiator", 
  IC: "Interview Cordinator",
  IA: "Interview Assessor",
  INA: "Interview Approver",
  HI: "Hiring Initiator",
  HC: "Hiring Checker",
  HA: "Hiring Approver",
  SI: "Social Initiator",
  SR: "Social Reviewer",
  ITI: "Induction Initiator",
  ITR: "Induction Reviewer",
  ITAr: "Induction Approver",
  CI: "Contact Initiator",
  CR: "Contract Reviewer",
  CA: "Contract Approver",
  IDIN: "Id initiator",
  IDI: "Id Issuer",
  IRDI: "Disciplinary Initiator",
  IRDR: "Disciplinary Reviewer",
  IRDA: "Disciplinary Approver",
  IRGI: "Grievance Initiator",
  IRGR: "Grievance Reviewer",
  IRGA: "Grievance Approver",
  VO: "View Only",
  ALL: "All User",
};
