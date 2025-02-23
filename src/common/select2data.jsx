import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ProductStatus = [
  { value: 'Publish', label: 'Publish' },
  { value: 'Schedule', label: 'Schedule' },
  { value: 'Unpublish', label: 'Unpublish' }
]
export const ProductVisibility = [
  { value: 'Visibility', label: 'Visibility' },
  { value: 'Private', label: 'Private' },
  { value: 'Public', label: 'Public' }
]
export const capacityType = [
    { value: '1', label: 'Illness' },
    { value: '2', label: 'Poor Performance' },
]
export const Category = [
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Footware', label: 'Footware' },
  { value: 'Accesories', label: 'Accesories' },
  { value: 'Gromming', label: 'Gromming' },
  { value: 'Ethnic & Festive', label: 'Ethnic & Festive' },
  { value: 'Jewellery', label: 'Jewellery' }, 
  { value: 'Toys & Babycare', label: 'Toys & Babycare' },
  { value: 'Festive Gifts', label: 'Festive Gifts' },
  { value: 'Kitchen', label: 'Kitchen' },
  { value: 'Dining', label: 'Dining' },
  { value: 'Home Decors', label: 'Home Decors' },
  { value: 'Stationery', label: 'Stationery' }
]
export const Gender = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Others', label: 'Others' }
]
export const Brand = [
  { value: 'Armani', label: 'Armani' },
  { value: 'Lacoste', label: 'Lacoste' },
  { value: 'Puma', label: 'Puma' },
  { value: 'Spykar', label: 'Spykar' },
  { value: 'Mufti', label: 'Mufti' },
  { value: 'Home Town', label: 'Home Town' },
  { value: 'Arrabi', label: 'Arrabi' }
]
export const Size = [
  { value: 'Extrasmall', label: 'Extrasmall' },
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' },
  { value: 'Extra large', label: 'Extra large' },
  { value: 'XXL', label: 'XXL' },
  { value: 'XXXL', label: 'XXXL' }
]
export const productSize = [
  { value: '1000MAH', label: '1000MAH' },
  { value: '1200MAH', label: '1200MAH' },
  { value: '1500MAH', label: '1500MAH' },
  { value: '2000MAH', label: '2000MAH' },
  { value: '3000MAH', label: '3000MAH' },
]
export const Color = [
  { value: 'blue', label: 'blue' },
  { value: 'pink', label: 'pink' },
  { value: 'yellow', label: 'yellow' },
  { value: 'orange', label: 'orange' },
  { value: 'lemon-green', label: 'lemon-green' },
  { value: 'green', label: 'green' },
  { value: 'white', label: 'white' }
]
export const Availability = [
  { value: 'Availabile', label: 'Availabile' },
  { value: 'in stock', label: 'in stock' },
  { value: 'out of stock', label: 'out of stock' },
  { value: 'Notify', label: 'Notify' }
]
export const AddressType = [
  { value: 'Home', label: 'Home' },
  { value: 'Office', label: 'Office' },
]
export const AvailabileTime = [
  { value: '7AM - 9PM', label: '7AM - 9PM' },
  { value: '9AM - 7PM', label: '9AM - 7PM' },
]
export const CurrencyConverter = [
  { value: 'BTC', label: 'BTC' },
  { value: 'ETH', label: 'ETH' },
  { value: 'XRP', label: 'XRP' },
  { value: 'DASH', label: 'DASH' },
  { value: 'NEO', label: 'NEO' },
  { value: 'LTC', label: 'LTC' },
  { value: 'BSD', label: 'BSD' },
]
export const DefaultSelect = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
]

export const CardSelect = [
  { value: '1', label: 'My Account' },
  { value: '2', label: 'Company' },
  { value: '3', label: 'Team Members' },
  { value: '4', label: 'Billing' },
]

export const BasicDropdownSelect = [
  { value: 'Thomas Edison', label: 'Thomas Edison' },
  { value: 'Nikola', label: 'Nikola' },
  { value: 'Nikola Tesla', label: 'Nikola Tesla' },
  { value: 'Arnold Schwarzenegger', label: 'Arnold Schwarzenegger' }
]

export const multiDropdownSelect = [
  { value: 'Alabama', label: 'Alabama' },
  { value: 'Alaska', label: 'Alaska' },
  { value: 'Arizona', label: 'Arizona' },
  { value: 'Arkansas', label: 'Arkansas' },
  { value: 'California', label: 'California' },
  { value: 'Colorado', label: 'Colorado' },
  { value: 'Connecticut', label: 'Connecticut' },
  { value: 'Delaware', label: 'Delaware' },
  { value: 'District of Columbia', label: 'District of Columbia' },
  { value: 'Florida', label: 'Florida' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Hawaii', label: 'Hawaii' },
  { value: 'Idaho', label: 'Idaho' },
  { value: 'Illinois', label: 'Illinois' },
  { value: 'Indiana', label: 'Indiana' },
  { value: 'Iowa', label: 'Iowa' },
  { value: 'Kansas', label: 'Kansas' },
  { value: 'Kentucky', label: 'Kentucky' },
  { value: 'Louisiana', label: 'Louisiana' },
  { value: 'Maine', label: 'Maine' },
  { value: 'Maryland', label: 'Maryland' },
  { value: 'Massachusetts', label: 'Massachusetts' },
  { value: 'Michigan', label: 'Michigan' },
  { value: 'Minnesota', label: 'Minnesota' },
  { value: 'Mississippi', label: 'Mississippi' },
  { value: 'Missouri', label: 'Missouri' },
  { value: 'Montana', label: 'Montana' },
  { value: 'Nebraska', label: 'Nebraska' },
  { value: 'Nevada', label: 'Nevada' },
  { value: 'New Hampshire', label: 'New Hampshire' },
  { value: 'New Jersey', label: 'New Jersey' },
  { value: 'New Mexico', label: 'New Mexico' },
  { value: 'New York', label: 'New York' },
  { value: 'North Carolina', label: 'North Carolina' },
  { value: 'North', label: 'North' },
  { value: 'Ohio', label: 'Ohio' },
  { value: 'Oklahoma', label: 'Oklahoma' },
  { value: 'Oregon', label: 'Oregon' },
  { value: 'Pennsylvania', label: 'Pennsylvania' },
  { value: 'Rhode Island', label: 'Rhode Island' },
  { value: 'South Carolina', label: 'South Carolina' },
  { value: 'South Dakota', label: 'South Dakota' },
  { value: 'Tennessee', label: 'Tennessee' },
  { value: 'Texas', label: 'Texas' },
  { value: 'Utah', label: 'Utah' },
  { value: 'Vermont', label: 'Vermont' },
  { value: 'Virginia', label: 'Virginia' },
  { value: 'Washington', label: 'Washington' },
  { value: 'West Virginia', label: 'West Virginia' },
  { value: 'Wisconsin', label: 'Wisconsin' },
  { value: 'Wyoming', label: 'Montana' }
]

export const Skills = [
  { value: 'Laravel', label: 'Laravel' },
  { value: 'Angular', label: 'Angular' },
  { value: 'HTML', label: 'HTML' },
  { value: 'React', label: 'React' },
  { value: 'Bootstrap', label: 'Bootstrap' },
]
export const Multiselectcomponent = [
  { value: 'Choice 1', label: 'Choice 1' },
  { value: 'Choice 2', label: 'Choice 2' },
  { value: 'Choice 3', label: 'Choice 3' },
  { value: 'Choice 4', label: 'Choice 4' },
  { value: 'Choice 5', label: 'Choice 5' }
];

const Group1 = [
  { value: "London", label: "London" },
  { value: "Manchester", label: "Manchester" },
  { value: "Liverpool", label: "Liverpool" },
];
const Group2 = [
  { value: "Paris", label: "Paris" },
  { value: "Lyon", label: "Lyon" },
  { value: "Marseille", label: "Marseille" },
];

const Group3 = [
  { value: "Hamburg", label: "Hamburg" },
  { value: "Munich", label: "Munich" },
  { value: "Berlin", label: "Berlin" },
];
const Group4 = [
  { value: "New York", label: "New York" },
  { value: "Washington", label: "Washington" },
  { value: "Michigan", label: "Michigan" },
];
const disabledGroup = [
  { value: "New York", label: "New York" },
  { value: "Washington", label: "Washington", isDisabled: "isDisabled" },
  { value: "Michigan", label: "Michigan", isDisabled: "isDisabled" },
];
const Group5 = [
  { value: "Madrid", label: "Madrid" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Malaga", label: "Malaga" },
];

const Group6 = [
  { value: "Montreal", label: "Montreal" },
  { value: "Toronto", label: "Toronto" },
  { value: "Vancouver", label: "Vancouver" },
];
export const GroupedData = [
  {
    label: "UK",
    options: Group1
  },
  {
    label: "FR",
    options: Group2,
  },
  {
    label: "SP",
    options: Group3,
  },
  {
    label: "UK",
    options: Group4,
  },
  {
    label: "US",
    options: Group5,
  },
  {
    label: "CA",
    options: Group6,
  },
];

export const DisabledGroupData = [
  {
    label: "UK",
    options: Group1
  },
  {
    label: "FR",
    options: Group2,
  },
  {
    label: "SP",
    options: Group3,
  },
  {
    label: "UK",
    options: disabledGroup,
  },
  {
    label: "US",
    options: Group5,
  },
  {
    label: "CA",
    options: Group6,
  },
];
//****************  block of Mostly used  select */
export const ExplanationSelectcomponent = [
  { value: 'The structure', label: 'The structure' },
  { value: 'The type of work', label: 'The type of work' },
 
];
 
//List and introduce the key people and their roles:
export const KeyPeoplaSelectcomponent = [
  { value: 'Manager/owner', label: 'Manager/owner' },
  { value: 'Supervisor(s)', label: 'Supervisor(s)' },
   { value: 'Co-workers', label: 'Co-workers' },
  { value: 'Health and safety representative(s)', label: 'Health and safety representative(s)' },
  { value: 'Fire/emergency warden(s)', label: 'Fire/emergency warden(s)' },
  
];

//Explanation of Employee Employment Conditions:
export const EmploymentSelectcomponent = [
  { value: 'Terms of contracts', label: 'Terms of contracts' },
  { value: 'Job description and responsibilities', label: 'Job description and responsibilities' },
   { value: 'Leave entitlements', label: 'Leave entitlements' },
  { value: 'Notification of sick leave or absences', label: 'Notification of sick leave or absences' },
  { value: 'Out-of-hours inquiries and emergency procedures', label: 'Out-of-hours inquiries and emergency procedures' },
  { value: 'Time recording procedures', label: 'Time recording procedures' },
  { value: 'Work times and meal breaks', label: 'Work times and meal breaks' }, 
];
//Explain employee remuneration:
export const RemunerationSelectcomponent = [
  { value: 'Pay arrangements', label: 'Pay arrangements' },
  { value: 'Rates of pay and allowances', label: 'Rates of pay and allowances' },
   { value: 'Superannuation', label: 'Superannuation' },
  { value: 'Taxation and any other deductions ', label: 'Taxation and any other deductions ' },
  { value: '	Union membership.', label: '	Union membership.' },
];
//Explanation of work health and safety administration:
export const HealthSelectcomponent = [
  { value: ' Consultative and communication processes, including employee health and safety representatives', label: ' Consultative and communication processes, including employee health and safety representatives' },
  { value: 'Nature of the Working Compound', label: 'Nature of the Working Compound' },
   { value: '	Hazardous identification, Prevention, and Protection', label: '	Hazardous identification, Prevention, and Protection' },
  { value: 'Reporting of accident and disease', label: 'Reporting of accident and disease' },
   { value: 'PPE', label: 'PPE' },
  { value: 'Living Accommodation', label: 'Living Accommodation' },
   { value: 'General Provisions', label: 'General Provisions' },
  { value: 'Workers compensation claims', label: 'Workers compensation claims' },
   { value: 'Emergency plan, procedures, exits, and fire extinguishers', label: 'Emergency plan, procedures, exits, and fire extinguishers' },
  { value: 'First aid facilities such as the first aid kit and room', label: 'First aid facilities such as the first aid kit and room' },
   { value: 'Information on workplace hazards and controls', label: 'Information on workplace hazards and controls' },
 
];
//Show the environment:
export const EnvironmentSelectcomponent = [
  { value: 'Car parking', label: 'Car parking' },
  { value: 'Eating facilities', label: 'Eating facilities' },
   { value: 'Locker and change rooms', label: 'Locker and change rooms' },
  { value: 'Washing and toilet facilities', label: 'Washing and toilet facilities' },
     { value: 'Workstation, tools, machinery, and equipment used for the job.', label: 'Workstation, tools, machinery, and equipment used for the job.' },
  { value: 'recreation places (football pitch, gym, gaming place)', label: 'recreation places (football pitch, gym, gaming place)' }, 
];

//Explanation apropos training:
export const AproposSelectcomponent = [
  { value: 'First aid, fire safety, and emergency procedures training', label: 'First aid, fire safety, and emergency procedures training' },
  { value: 'Hazard-specific training (for example, manual handling, hazardous substances)', label: 'Hazard-specific training (for example, manual handling, hazardous substances)' },
   { value: 'On-the-job training in safe work procedures', label: 'On-the-job training in safe work procedures' },
  { value: 'Job-specific training (for example, if a license or permit  is required)', label: 'Job-specific training (for example, if a license or permit  is required)' }, 
];
//Conduct a follow-up review:
export const FollowUpSelectcomponent = [
  { value: 'Repeat any training required or provide additional training if needed', label: 'Repeat any training required or provide additional training if needed' },
  { value: 'Review work practices and procedures with the worker', label: 'Review work practices and procedures with the worker' },
   { value: 'Ask and answer questions', label: 'Ask and answer questions' }, 
];

//Explain employee remuneration:
export const TrainingSelectcomponent = [
  { value: 'HSE Training', label: 'HSE Training' },
  { value: 'HRR Training', label: 'HR Training' },
   { value: 'Apropes Training', label: 'Apropes Training' },
  { value: 'Policy Training', label: 'Policy Training' },
 
];

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
//  /* starting of returning departments  */
export const CostCenterSelect = [
  { value: '1', label: 'Yes' },
  { value: '2', label: 'No' },
 
]
export const Banking = [
  { value: 'CRDB', label: 'CRDB' },
  { value: 'NMB', label: 'NMB' },
  { value: 'NBC', label: 'NBC' }
]

//leave type

export const LeaveType = [
  { value: '1', label: 'Paid Leave' },
  { value: '2', label: 'Un Paid Leave'}
 
]

export const SickLeaveType = [
  { value: '5', label: 'Full Paid Leave' },
  { value: '6', label: 'Half Paid Leave' },
  { value: '7', label: 'Un Paid Leave'}
 
]

export const MaternityLeave = [
  { value: '3', label: 'Maternity Leave' },
  // { value: '2', label: 'Un Paid Leave'}
 
]
export const PaternityLeave = [
  { value: '4', label: 'Paternity Leave' },
  // { value: '2', label: 'Un Paid Leave'}
 
]
export const CompassionateLeave = [
  { value: '8', label: 'Compassionate Leave' },
  // { value: '2', label: 'Un Paid Leave'}
 
]

export const DepartmentData = async () => {
  try {
    const departments = await fetchDepartments();

    return [
      {
        label: "Department Name",
        options: departments,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching departments:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchDepartments
const fetchDepartments = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/departments/show_department`);
    if (!response.ok) {
      throw new Error('Failed to fetch departments');
    }

    const result = await response.json();
    
    // Assuming result.departments is an array of department objects
    const formattedDepartments = result.departments.map(department => ({
      label: department.name, // replace with the actual property name in your department object
      value: department.id,   // replace with the actual property name in your department object
    }));

    return formattedDepartments;
  } catch (error) {
    console.error('Error fetching departments:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Call the fetchDepartments function to get the actual department data
// const departmentsData = await fetchDepartments();

// /*  Returning Sections  or units */

export const GroupSectionData = async () => {
  try {
    const sections = await fetchSections();
    
    return [
      {
        label: "Section Name",
        options: sections,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching sections:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchSections
const fetchSections = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/sections/show_section`);
    if (!response.ok) {
      throw new Error('Failed to fetch sections');
    }
    const result = await response.json();
    
    // Assuming result.sections is an array of department objects
    const formattedSections = result.sections.map(section => ({
      label: section.name, // replace with the actual property name in your section object
      value: section.id,   // replace with the actual property name in your section object
    }));

    return formattedSections;
  } catch (error) {
    console.error('Error fetching sections:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Call the fetchSections function to get the actual section data
// const sectionsData = await fetchSections();




// /* Returning Designations */

export const GroupDesignation = async () => {
  try {
    const designations = await fetchDesignations();

    return [
      {
        label: "Designation Name",
        options: designations,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching designations:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchdesignations
const fetchDesignations = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/designations/show_designation`);
    if (!response.ok) {
      throw new Error('Failed to fetch designations');
    }

    const result = await response.json();
    
    // Assuming result.designations is an array of designation objects
    const formattedDesignations = result.designations.map(designation => ({
      label: designation.name, // replace with the actual property name in your designation object
      value: designation.id,   // replace with the actual property name in your designation object
    }));

    return formattedDesignations;
  } catch (error) {
    console.error('Error fetching designations:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Call the fetchDesignations function to get the actual designation data
// const designationsData = await fetchDesignations();
// console.log('welimba');
// console.log(designationsData);



// /* Returning Employers */
export const EmployerData = async () => {
  try {
    const employers = await fetchEmployers();
    return [
      {
        label: "Employer Name",
        options: employers,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching employers:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchEmployers
const fetchEmployers = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/employers/show_all_employer`);
    if (!response.ok) {
      throw new Error('Failed to fetch employers');
    }

    const result = await response.json();
    
    // Assuming result.employers is an array of employer objects
    const formattedEmployers = result.employers.map(employer => ({
      label: employer.name, // replace with the actual property name in your employer object
      value: employer.id,   // replace with the actual property name in your employer object
    }));

    return formattedEmployers;
  } catch (error) {
    console.error('Error fetching employers:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Call the fetchRegions function to get the actual region data
// const regionsData = await fetchRegions();
// console.log('welimba');
// console.log(regionsData)



// /* Returning Regions for location*/
export const RegionData = async () => {
  try {
    const regions = await fetchRegions();
    return [
      {
        label: "Region Name",
        options: regions,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching regions:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchRegions
const fetchRegions = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/regions/show_region`);
    if (!response.ok) {
      throw new Error('Failed to fetch regions');
    }

    const result = await response.json();
    
    // Assuming result.regions is an array of region objects
    const formattedRegions = result.regions.map(region => ({
      label: region.name, // replace with the actual property name in your region object
      value: region.id,   // replace with the actual property name in your region object
    }));

    return formattedRegions;
  } catch (error) {
    console.error('Error fetching regions:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};


// /* Returning District for location*/
export const DistrictData = async () => {
  try {
    const districts = await fetchDistricts();
    return [
      {
        label: "District Name",
        options: districts,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching districts:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetch Districts
const fetchDistricts = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/districts/show_district`);
   
    if (!response.ok) {
      throw new Error('Failed to fetch districts');
    }

    const result = await response.json();
    
    // Assuming result.districts is an array of district objects
    const formattedDistricts = result.districts.map(district => ({
      label: district.name, // replace with the actual property name in your district object
      value: district.id,   // replace with the actual property name in your district object
      regionId: district.region_id
    }));

    return formattedDistricts;
  } catch (error) {
    console.error('Error fetching districts:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Call the fetchDistricts function to get the actual district data
// const districtsData = await fetchDistricts();
// // console.log('welimba');
// console.log(districtsData);

// BankData, BankBranchData, LocationData, AllowanceData, ShiftData,WardData


// /* Returning Banks*/
export const BankData = async () => {
  try {
    const banks = await fetchBanks();
    return [
      {
        label: "Bank Name",
        options: banks,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching banks:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetch Banks
const fetchBanks = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/banks/show_bank`);
    if (!response.ok) {
      throw new Error('Failed to fetch banks');
    }

    const result = await response.json();
    
    // Assuming result.banks is an array of bank objects
    const formattedBanks = result.banks.map(bank => ({
      label: bank.name, // replace with the actual property name in your bank object
      value: bank.id,   // replace with the actual property name in your bank object
    }));

    return formattedBanks;
  } catch (error) {
    console.error('Error fetching banks:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};

// /* Returning Bank branch*/
export const BankBranchData = async () => {
  try {
    const branches = await fetchBankBranch();
    return [
      {
        label: "Bank Branch Name",
        options: branches,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching bank branches:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetch Bank branch
const fetchBankBranch = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/branches/show_bank_branch`);
    if (!response.ok) {
      throw new Error('Failed to fetch branches');
    }

    const result = await response.json();
    
    // Assuming result.bankbranchs is an array of bankbranch objects
    const formattedBankbranch = result.branches.map(branches => ({
      label: branches.name, // replace with the actual property name in your bankbranch object
      value: branches.id,   // replace with the actual property name in your bankbranch object
    }));

    return formattedBankbranch;
  } catch (error) {
    console.error('Error fetching bank branch:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};

// /* Returning  location */
export const LocationData = async () => {
  try {
    const locations = await fetchLocations();
    return [
      {
        label: "Location Name",
        options: locations,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching locations:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetch Location
const fetchLocations = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/locations/show_location`);
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    const result = await response.json();
    
    // Assuming result.locations is an array of location objects
    const formattedLocations = result.locations.map(location => ({
      label: location.name, // replace with the actual property name in your location object
      value: location.id,   // replace with the actual property name in your location object
    }));

    return formattedLocations;
  } catch (error) {
    console.error('Error fetching locations:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};

// /* Returning Ward for location*/
export const WardData = async () => {
  try {
    const wards = await fetchWards();
    return [
      {
        label: "Ward Name",
        options: wards,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching wards:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetch Ward
const fetchWards = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/wards/show_ward`);
    if (!response.ok) {
      throw new Error('Failed to fetch wards');
    }

    const result = await response.json();
    
    // Assuming result.wards is an array of ward objects
    const formattedWards = result.wards.map(ward => ({
      label: ward.ward_name, // replace with the actual property name in your ward object
      value: ward.id,   // replace with the actual property name in your ward object
      districtId: ward.district_id
    }));

    return formattedWards;
  } catch (error) {
    console.error('Error fetching wards:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};


// /* Returning Allowance*/
export const AllowanceData = async () => {
  try {
    const allowances = await fetchAllowances();
    return [
      {
        label: "Allowance Name",
        options: allowances,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching allowances:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetch Allowances
const fetchAllowances = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/allowances/show_allowance`);
    if (!response.ok) {
      throw new Error('Failed to fetch allowances');
    }

    const result = await response.json();
    
    // Assuming result.allowances is an array of allowance objects
    const formattedAllowances = result.allowances.map(allowance => ({
      label: allowance.name, // replace with the actual property name in your allowance object
      value: allowance.id,   // replace with the actual property name in your allowance object
    }));

    return formattedAllowances;
  } catch (error) {
    console.error('Error fetching allowances:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// /* Returning Shifts */
export const ShiftData = async () => {
  try {
    const shifts = await fetchShifts();
    return [
      {
        label: "Shift Name",
        options: shifts,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching shifts:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetch Shifts
const fetchShifts = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/shifts/show_shift`);
    if (!response.ok) {
      throw new Error('Failed to fetch shifts');
    }

    const result = await response.json();
    
    // Assuming result.shifts is an array of shift objects
    const formattedShifts = result.shifts.map(shift => ({
      label: shift.name, // replace with the actual property name in your shift object
      value: shift.id,   // replace with the actual property name in your shift object
    }));

    return formattedShifts;
  } catch (error) {
    console.error('Error fetching shifts:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// VacancyTypeData
 export const VacancyTypeData = async () => {
  try {
    const vacancies = await fetchVacancyType();
    return [
      {
        label: "Vacancy Name",
        options: vacancies,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching shifts:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetch vacancies
const fetchVacancyType = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/vacancies/show_vacancies`);
    if (!response.ok) {
      throw new Error('Failed to fetch vacancies');
    }

    const result = await response.json();
    
    // Assuming result.vacancies is an array of shift objects
    const formattedVacancies = result.vacancies.map(vacancy => ({
      label: vacancy.name, // replace with the actual property name in your vacancy object
      value: vacancy.id,   // replace with the actual property name in your vacancy object
    }));

    return formattedVacancies;
  } catch (error) {
    console.error('Error fetching vacancies:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// JobTitleData
export const JobTitleData = async () => {
  try {
    const job_titles = await fetchJobTitle();
    return [
      {
        label: "Job Title",
        options: job_titles,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching job titles:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetch job_titles
const fetchJobTitle = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/job_titles/show_job_titles`);
    if (!response.ok) {
      throw new Error('Failed to fetch job titles');
    }

    const result = await response.json();
    
    // Assuming result.vacancies is an array of shift objects
    const formattedJobTitle = result.job_titles.map(job_title => ({
      label: job_title.name, // replace with the actual property name in your job_title object
      value: job_title.id,   // replace with the actual property name in your job_title object
    }));

    return formattedJobTitle;
  } catch (error) {
    console.error('Error fetching job titles:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// ****************************************************************************************
 
//Package || cost Center name
export const PackageData = async () => {
  try {
    const packages = await fetchPackages();

    return [
      {
        label: "Package Name",
        options: packages,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching packeges:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchPackages
const fetchPackages = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/packages/show_packages`);
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }

    const result = await response.json();
    
    // Assuming result.departments is an array of department objects
    const formattedPackages = result.packages.map(cost_center => ({
      label: cost_center.name, // replace with the actual property name in your package object
      value: cost_center.id,   // replace with the actual property name in your package object
    }));

    return formattedPackages;
  } catch (error) {
    console.error('Error fetching packages:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
}
// ****************************************************************************************
 
//Ranking criterial
export const RankingCriterialData = async () => {
  try {
    const rankings = await fetchRankings();

    return [
      {
        label: "Ranking Name",
        options: rankings,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching rankings:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchRankings
const fetchRankings = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/ranking_criterial/show_ranking`);
    if (!response.ok) {
      throw new Error('Failed to fetch rankings');
    }

    const result = await response.json();
    
    // Assuming result.departments is an array of department objects
    const formattedRankings = result.rankings.map(ranking => ({
      label: ranking.name, // replace with the actual property name in your ranking object
      value: ranking.rate,      // replace with the actual property name in your ranking object
    }));

    return formattedRankings;
  } catch (error) {
    console.error('Error fetching rankings:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
}

// ****************************************************************************************
 
//Users || Employee name
export const UsersData = async () => {
  try {
    const users = await fetchUsers();

    return [
      {
        label: "User Name",
        options: users,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching users:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchUsers
const fetchUsers = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/users/get_users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const result = await response.json();
    
    // Assuming result.departments is an array of department objects
    const formattedUsers = result.users.map(user => ({
      label: user.firstname + ' ' + user.lastname, // replace with the actual property name in your users object
      value: user.id,   // replace with the actual property name in your users object
    }));

    return formattedUsers;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
}





//**************************************************** Practical Test */
export const PracticalTest = [
  { value: '1', label: 'Test 1' },
  { value: '2', label: 'Test 2' },
  { value: '3', label: 'Test 3' },
  { value: '4', label: 'Test 4' },
]



//*************************************** Nationality || Country */
export const NationalityData = async () => {
  try {
    const countries = await fetchCountries();

    return [
      {
        label: "Country Name",
        options: countries,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching Country:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchCountrys
const fetchCountries = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/countries/show_countries`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }

    const result = await response.json();
    
    // Assuming result.Country is an array of countries objects
    const formattedCountries = result.countries.map(countries => ({
      label: countries.name, // replace with the actual property name in your countries object
      value: countries.id,   // replace with the actual property name in your countries object
    }));

    return formattedCountries;
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// block for Relativeness or Dependant *****************************
export const DependantTypeData = async () => {
  try {
    const relativeness = await fetchRelative();

    return [
      {
        label: "Relativeness Name",
        options: relativeness,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching relativeness:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchRelatives
const fetchRelative = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/dependant_types/show_relationship`);
    if (!response.ok) {
      throw new Error('Failed to fetch relativeness');
    }

    const result = await response.json();
    
    // Assuming result.Country is an array of educations objects
    const formattedRelative = result.relationships.map(relationships => ({
      label: relationships.name, // replace with the actual property name in your relationships object
      value: relationships.id,   // replace with the actual property name in your relationships object
    }));

    return formattedRelative;
  } catch (error) {
    console.error('Error fetching relationships:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};

//**************************************************** Contract type Test */
export const ContractType = [
  { value: '1', label: 'Fixed Term Contract' },
  { value: '2', label: 'Specific Task Contract' },
  { value: '3', label: 'Unspecified Contract' },
 
]

// block for Education and Years    **********************************************************************************
   // Education Level
export const EducationLevelData = async () => {
  try {
    const education = await fetchEducation();

    return [
      {
        label: "Education Name",
        options: education,
      },
      // ... other groups
    ];
  } catch (error) {
    console.error('Error fetching Education:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};
// Example implementation of fetchEducations
const fetchEducation = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/education/show_educations`);
    if (!response.ok) {
      throw new Error('Failed to fetch education');
    }

    const result = await response.json();
    
    // Assuming result.Country is an array of educations objects
    const formattedEducation = result.educations.map(educations => ({
      label: educations.name, // replace with the actual property name in your educations object
      value: educations.id,   // replace with the actual property name in your educations object
    }));

    return formattedEducation;
  } catch (error) {
    console.error('Error fetching educations:', error.message);
    // Handle the error, maybe return a default value or log the error
    return [];
  }
};

// ******** Referee number
export const ReferenceCheck = [
  { value: '0', label: 'Please select Referee ' },
  { value: '1', label: 'Referee 1' },
  { value: '2', label: 'Referee 2' },
  { value: '3', label: 'Referee 3' },
 
]
// ******** Referee number
export const EmployeeRelative = [
  { value: '0', label: 'Please select Relative ' },
  { value: '1', label: 'Relative 1' },
  { value: '2', label: 'Relative 2' },
  { value: '3', label: 'Relative 3' },
  { value: '4', label: 'Relative 4' },
  { value: '5', label: 'Relative 5' },
 
]

// ******** Referee number
export const EmployeeDependent = [
  { value: '0', label: 'Please select Dependent ' },
  { value: '1', label: 'Dependent 1' },
  { value: '2', label: 'Dependent 2' },
  { value: '3', label: 'Dependent 3' },
  { value: '4', label: 'Dependent 4' },
  { value: '5', label: 'Dependent 5' },
 
]


export const CollegesData = [

  { value: "AbdulRahman Al-Sumit Memorial University  SUMAIT", label: 'AbdulRahman Al-Sumit Memorial University  SUMAIT' },
  { value: "Arch Bishop James University College", label: 'Arch Bishop James University College' },
  { value: "Archbishop Mihayo University College of Tabora (AMUCTA)", label: 'Archbishop Mihayo University College of Tabora (AMUCTA)' },
  { value: "Archbishop Mihayo University College of Tabora (AMUCTA)", label: 'Archbishop Mihayo University College of Tabora (AMUCTA)' },
  { value: "Ardhi Institute Morogoro", label: 'Ardhi Institute Morogoro' },
  { value: "Ardhi Institute Tabora (ARITA)", label: 'Ardhi Institute Tabora (ARITA)' },
  { value: "Ardhi University (ARU)", label: 'Ardhi University (ARU)' },
  { value: "Arusha Technical College", label: 'Arusha Technical College' },
  { value: "Bandari College", label: 'Bandari College' },
  { value: "Butiama University of Agriculture and Allied Sciences  BUAAS", label: 'Butiama University of Agriculture and Allied Sciences  BUAAS' },
  { value: "Catholic University of Health and Allied Sciences (CUHAS)", label: 'Catholic University of Health and Allied Sciences (CUHAS)' },
  { value: "Centre for Foreign  Relations (CFR)", label: 'Centre for Foreign  Relations (CFR)' },
  { value: "College of African Wildlife Management (Mweka)", label: 'College of African Wildlife Management (Mweka)' },
  {
    value: "College of Agriculture and Natural Resources (CANRE)", label: 'College of Agriculture and Natural Resources(CANRE)'},
{ value: "College of Business Education (CBE)", label: 'College of Business Education (CBE)' },
{ value: "Community Development Training Institute", label: 'Community Development Training Institute' },
  { value: "Dar es Salaam Institute of Technology (DIT)", label: 'Dar es Salaam Institute of Technology (DIT)' },
  { value: "Dar es Salaam Maritime Institute (DMI)", label: 'Dar es Salaam Maritime Institute (DMI)' },
  { value: "Dar es Salaam School of Journalism", label: 'Dar es Salaam School of Journalism' },
  { value: "Dar es Salaam University College of Education (DUCE)", label: 'Dar es Salaam University College of Education (DUCE)' },
  { value: "East Africa University of Technology  EAUT", label: 'East Africa University of Technology  EAUT' },
  { value: "Eastern Africa Statistical Training Centre (EASTC)", label: 'Eastern Africa Statistical Training Centre (EASTC)' },
  { value: "Eckernforde Tanga University (ETU)", label: 'Eckernforde Tanga University (ETU)' },
  { value: "Efforts University of Management, Science, Technology and Innovation  EUMSTI", label: 'Efforts University of Management, Science, Technology and Innovation  EUMSTI' },
  { value: "Faraja Health Management", label: 'Faraja Health Management' },
  { value: "Fisheries Education and Training Agency", label: 'Fisheries Education and Training Agency' },
  { value: "Forest Training Institute (FTI)", label: 'Forest Training Institute (FTI)' },
  { value: "Hubert Kairuki Memorial University (HKMU)", label: 'Hubert Kairuki Memorial University (HKMU)' },
  { value: "Institute of Accountancy Arusha", label: 'Institute of Accountancy Arusha' },
  { value: "Institute of Adult Education", label: 'Institute of Adult Education' },
  { value: "Institute of Finance Management (IFM)", label: 'Institute of Finance Management (IFM)' },
  { value: "Institute of Judiciary Administration", label: 'Institute of Judiciary Administration' },
  { value: "Institute of Rural Development Planning", label: 'Institute of Rural Development Planning' },
  { value: "Institute of Social Work (ISW)", label: 'Institute of Social Work (ISW)' },
  { value: "Institute of Tax Administration", label: 'Institute of Tax Administration' },
  { value: "International Medical and Technological University (IMTU)", label: 'International Medical and Technological University (IMTU)' },
  { value: "Iringa University College (IUCo)", label: 'Iringa University College (IUCo)' },
  { value: "Jomo Kenyatta University of Agriculture and Technology", label: 'Jomo Kenyatta University of Agriculture and Technology' },
  { value: "Jordan University College (JUCO)", label: 'Jordan University College (JUCO)' },
  { value: "Josiah Kibira University College (JOKUCO)", label: 'Josiah Kibira University College (JOKUCO)' },
  { value: "Kaliua Institute of Community Development", label: 'Kaliua Institute of Community Development' },
  { value: "Kampala International University Dar es Salaam Constituent College (KIU-DAR)", label: 'Kampala International University Dar es Salaam Constituent College (KIU-DAR)' },
  { value: "Karume Institute of Technology", label: 'Karume Institute of Technology' },
  { value: "Katavi University of Agriculture (KUA)", label: 'Katavi University of Agriculture (KUA)' },
  { value: "Kilimanjaro Christian Medical College (KCMCo)", label: 'Kilimanjaro Christian Medical College (KCMCo)' },
  { value: "Kilimanjaro Institute of Technology and Management", label: 'Kilimanjaro Institute of Technology and Management' },
  { value: "Livestock Training Agency (LITA)", label: 'Livestock Training Agency (LITA)' },
  { value: "Mabughai Community Development Technical Training Institute", label: 'Mabughai Community Development Technical Training Institute' },
  { value: "Mbeya University of Science and Technology (MUST)", label: 'Mbeya University of Science and Technology (MUST)' },
  { value: "Mineral Resources Institute(MRI)", label: 'Mineral Resources Institute(MRI)' },
  { value: "Ministry of Agriculture Training Institute - Uyole (Mbeya)", label: 'Ministry of Agriculture Training Institute - Uyole (Mbeya)' },
  { value: "Misungwi Community Development Technical Training Institute", label: 'Misungwi Community Development Technical Training Institute' },
  { value: "Mkwawa University College of Education (MUCE)", label: 'Mkwawa University College of Education (MUCE)' },
  { value: "Moshi University College of Cooperative and Business Studies (MUCCOBS)", label: 'Moshi University College of Cooperative and Business Studies (MUCCOBS)' },
  { value: "Mount Meru University (MMU)", label: 'Mount Meru University (MMU)' },
  { value: "Mtwara (K) Teachers College", label: 'Mtwara (K) Teachers College' },
  { value: "Muhimbili University of Health &amp; Allied Sciences (MUHAS)", label: 'Muhimbili University of Health &amp; Allied Sciences (MUHAS)' },
  { value: "Muslim University of Morogoro (MUM)", label: 'Muslim University of Morogoro (MUM)' },
  { value: "Mwalimu Nyerere Memorial Academy", label: 'Mwalimu Nyerere Memorial Academy' },
  { value: "Mwenge Catholic University  MWECAU", label: 'Mwenge Catholic University  MWECAU' },
  { value: "Mwenge University College of Education (MWUCE)", label: 'Mwenge University College of Education (MWUCE)' },
  { value: "Mzumbe University (MU)", label: 'Mzumbe University (MU)' },
  { value: "National College of Tourism (NCT)", label: 'National College of Tourism (NCT)' },
  { value: "National Institute of Transport (NIT)", label: 'National Institute of Transport (NIT)' },
  { value: "Nelson Mandela African Institute of Science and Technology (NMAIST)", label: 'Nelson Mandela African Institute of Science and Technology (NMAIST)' },
  { value: "New Vision Vocational Training Centre", label: 'New Vision Vocational Training Centre' },
  { value: "Njuweni Institute of Hotel, Catering and Tourism Management", label: 'Njuweni Institute of Hotel, Catering and Tourism Management' },
  { value: "OlmotonyiNational College of Tourism (NCT)", label: 'OlmotonyiNational College of Tourism (NCT)' },
  { value: "Open University of Tanzania (OUT)", label: 'Open University of Tanzania (OUT)' },
  { value: "Pasiansi Wildlife Training Institute (PWTI)", label: 'Pasiansi Wildlife Training Institute (PWTI)' },
  { value: "Procurement and Supplies Professionals and Technicians Board (PSPTB)", label: 'Procurement and Supplies Professionals and Technicians Board (PSPTB)' },
  { value: "Ruaha University College (RUCO)", label: 'Ruaha University College (RUCO)' },
  { value: "School of Library Archives and Documentation Studies (SLADS)", label: 'School of Library Archives and Documentation Studies (SLADS)' },
  { value: "Sebastian Kolowa Memorial University (SEKOMU)", label: 'Sebastian Kolowa Memorial University (SEKOMU)' },
  { value: "Sokoine University of Agriculture (SUA)", label: 'Sokoine University of Agriculture (SUA)' },
  { value: "St. Augustine University of Tanzania (Songea Centre)", label: 'St. Augustine University of Tanzania (Songea Centre)' },
  { value: "St. Glory Nursing School", label: 'St. Glory Nursing School' },
  { value: "St. Joseph University College of Management and Commerce", label: 'St. Joseph University College of Management and Commerce' },
  { value: "St. Joseph University in Tanzania Engineering and Technology", label: 'St. Joseph University in Tanzania Engineering and Technology' },
  { value: "St.Augustine University of Tanzania (SAUT)", label: 'St.Augustine University of Tanzania (SAUT)' },
  { value: "St.Francis University College of Health and Allied Sciences (SFUCHAS)", label: 'St.Francis University College of Health and Allied Sciences (SFUCHAS)' },
  { value: "St.John's University of Tanzania (SJUT)", label: 'St.John`s University of Tanzania (SJUT)' },
  { value: "St.Joseph University College of Agricultural Sciences and Technology (SJUCAST)", label: 'St.Joseph University College of Agricultural Sciences and Technology (SJUCAST)' },
  { value: "St.Joseph University College of Information Technology (SJUCIT)", label: 'St.Joseph University College of Information Technology (SJUCIT)' },
  { value: "St.Joseph University College of Management and Commerce (SJUCMC)", label: 'St.Joseph University College of Management and Commerce (SJUCMC)' },
  { value: "St.Joseph University in Tanzania (SJUT)", label: 'St.Joseph University in Tanzania (SJUT)' },
  { value: "State University of Zanzibar (SUZA)", label: 'State University of Zanzibar (SUZA)' },
  { value: "Stefano Moshi Memorial University College (SMMUCO)", label: 'Stefano Moshi Memorial University College (SMMUCO)' },
  { value: "Stella Maris Mtwara University College (STeMMUCO)", label: 'Stella Maris Mtwara University College (STeMMUCO)' },
  { value: "Tandala Teachers College", label: 'Tandala Teachers College' },
  { value: "Tanzania Institute of Accountancy (TIA)", label: 'Tanzania Institute of Accountancy (TIA)' },
  { value: "Tanzania Institute of Rail Technology", label: 'Tanzania Institute of Rail Technology' },
  { value: "Tanzania International University (TIU)", label: 'Tanzania International University (TIU)' },
  { value: "Tanzania Police Staff College", label: 'Tanzania Police Staff College' },
  { value: "Tanzania Public Service College (TPSC)", label: 'Tanzania Public Service College (TPSC)' },
  { value: "Tanzanite University  (TU)", label: 'Tanzanite University  TU' },
  { value: "Teofilo Kisanji University (TEKU)", label: 'Teofilo Kisanji University (TEKU)' },
  { value: "The College of African Wildlife Management, Mweka", label: 'The College of African Wildlife Management, Mweka' },
  { value: "Tumaini University", label: 'Tumaini University' },
  { value: "Tumaini University Dar es Salaam College (TURDACO)", label: 'Tumaini University Dar es Salaam College (TURDACO)' },
  { value: "Tumaini University Makumira  (Mbeya Centre)", label: 'Tumaini University Makumira  (Mbeya Centre)' },
  { value: "Tumaini University Makumira (TUMA)", label: 'Tumaini University Makumira (TUMA)' },
  { value: "United African University of Tanzania (UAUT)", label: 'United African University of Tanzania (UAUT)' },
  { value: "University College of Education Zanzibar (UCEZ)", label: 'University College of Education Zanzibar (UCEZ)' },
  { value: "University of Arusha (Buhare Centre)", label: 'University of Arusha (Buhare Centre)' },
  { value: "University of Arusha (Mbeya Centre)", label: 'University of Arusha (Mbeya Centre)' },
  { value: "University of Arusha (UOA)", label: 'University of Arusha (UOA)' },
  { value: "University of Bagamoyo (UOB)", label: 'University of Bagamoyo (UOB)' },
  { value: "University of Dar es Salaam (UDSM)", label: 'University of Dar es Salaam (UDSM)' },
  { value: "University of Dar es salaam Computing Centre (UCC)", label: 'University of Dar es salaam Computing Centre (UCC)' },
  { value: "University of Dodoma (UDOM)", label: 'University of Dodoma (UDOM)' },
  { value: "University of Iringa  UoI", label: 'University of Iringa  UoI' },
  { value: "Vocational Education And Training Authority (VETA)", label: 'Vocational Education And Training Authority (VETA)' },
  { value: "Water Institute", label: 'Water Institute' },
  { value: "Zanzibar Institute of Financial Administration", label: 'Zanzibar Institute of Financial Administration' },
  { value: "Zanzibar University (ZU)", label: 'Zanzibar University (ZU)' },
  { value: "Other", label: 'Other out of list' },
];


export const yearsData = [

{ value: "2034", label: '2034' },
{ value: "2033", label: '2033' },
{ value: "2032", label: '2032' },
{ value: "2031", label: '2031' },
{ value: "2030", label: '2030' },
{ value: "2029", label: '2029' },
{ value: "2028", label: '2028' },
{ value: "2027", label: '2027' },
{ value: "2026", label: '2026' },
{ value: "2025", label: '2025' },
{ value: "2024", label: '2024' },
{ value: "2023", label: '2023' },
{ value: "2022", label: '2022' },
{ value: "2021", label: '2021' },
{ value: "2020", label: '2020' },
{ value: "2019", label: '2019' },
{ value: "2018", label: '2018' },
{ value: "2017", label: '2017' },
{ value: "2016", label: '2016' },
{ value: "2015", label: '2015' },
{ value: "2014", label: '2014' },
{ value: "2013", label: '2013' },
{ value: "2012", label: '2012' },
{ value: "2011", label: '2011' },
{ value: "2010", label: '2010' },
{ value: "2009", label: '2009' },
{ value: "2008", label: '2008' },
{ value: "2007", label: '2007' },
{ value: "2006", label: '2006' },
{ value: "2005", label: '2005' },
{ value: "2004", label: '2004' },
{ value: "2003", label: '2003' },
{ value: "2002", label: '2002' },
{ value: "2001", label: '2001' },
{ value: "2000", label: '2000' },
{ value: "1999", label: '1999' },
{ value: "1998", label: '1998' },
{ value: "1997", label: '1997' },
{ value: "1996", label: '1996' },
{ value: "1995", label: '1995' },
{ value: "1994", label: '1994' },
{ value: "1993", label: '1993' },
{ value: "1992", label: '1992' },
{ value: "1991", label: '1991' },
{ value: "1990", label: '1990' },
{ value: "1989", label: '1989' },
{ value: "1988", label: '1988' },
{ value: "1987", label: '1987' },
{ value: "1986", label: '1986' },
{ value: "1985", label: '1985' },
{ value: "1984", label: '1984' },
{ value: "1983", label: '1983' },
{ value: "1982", label: '1982' },
{ value: "1981", label: '1981' },
{ value: "1980", label: '1980' },
{ value: "1979", label: '1979' },
{ value: "1978", label: '1978' },

]






export const ProfileHomeData = [
  { value: 'Only Me', label: 'Only Me' },
  { value: 'Public', label: 'Public' },
  { value: 'Private', label: 'Private' },
  { value: 'Friends Only', label: 'Friends Only' },
  { value: 'Friends Of Friends', label: 'Friends Of Friends' }
]
export const LanguageData = [
  { value: 'US English', label: 'US English' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Russia', label: 'Russia' }
]
export const TimeZoneData = [
  { value: "Pacific/Midway", label: '(GMT-11:00) Midway Island, Samoa' },
  { value: "America/Adak", label: '(GMT-10:00) Hawaii-Aleutian' },
  { value: "Etc/GMT+10", label: '(GMT-10:00) Hawaii' },
  { value: "Pacific/Marquesas", label: '(GMT-09:30) Marquesas Islands' },
  { value: "Pacific/Gambier", label: '(GMT-09:00) Gambier Islands' },
  { value: "America/Anchorage", label: '(GMT-09:00) Alaska' },
  { value: "America/Ensenada", label: '(GMT-08:00) Tijuana, Baja California' },
  { value: "Etc/GMT+8", label: '(GMT-08:00) Pitcairn Islands' },
  { value: "America/Los_Angeles", label: '(GMT-08:00) Pacific Time (US &amp; Canada)' },
  { value: "America/Denver", label: '(GMT-07:00) Mountain Time (US &amp; Canada)' },
  { value: "America/Chihuahua", label: '(GMT-07:00) Chihuahua, La Paz, Mazatlan' },
  { value: "America/Dawson_Creek", label: '(GMT-07:00) Arizona' },
  { value: "America/Belize", label: '(GMT-06:00) Saskatchewan, Central America' },
  { value: "America/Cancun", label: '(GMT-06:00) Guadalajara, Mexico City, Monterrey' },
  { value: "Chile/EasterIsland", label: '(GMT-06:00) Easter Island' },
  { value: "America/Chicago", label: '(GMT-06:00) Central Time (US &amp; Canada)' },
  { value: "America/New_York", label: '(GMT-05:00) Eastern Time (US &amp; Canada)' },
  { value: "America/Havana", label: '(GMT-05:00) Cuba' },
  { value: "America/Bogota", label: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco' },
  { value: "America/Caracas", label: '(GMT-04:30) Caracas' },
  { value: "America/Santiago", label: '(GMT-04:00) Santiago' },
  { value: "America/La_Paz", label: '(GMT-04:00) La Paz' },
  { value: "Atlantic/Stanley", label: '(GMT-04:00) Faukland Islands' },
  { value: "America/Campo_Grande", label: '(GMT-04:00) Brazil' },
  { value: "America/Goose_Bay", label: '(GMT-04:00) Atlantic Time (Goose Bay)' },
  { value: "America/Glace_Bay", label: '(GMT-04:00) Atlantic Time (Canada)' },
  { value: "America/St_Johns", label: '(GMT-03:30) Newfoundland' },
  { value: "America/Araguaina", label: '(GMT-03:00) UTC-3' },
  { value: "America/Montevideo", label: '(GMT-03:00) Montevideo' },
  { value: "America/Miquelon", label: '(GMT-03:00) Miquelon, St. Pierre' },
  { value: "America/Godthab", label: '(GMT-03:00) Greenland' },
  { value: "America/Argentina/Buenos_Aires", label: '(GMT-03:00) Buenos Aires' },
  { value: "America/Sao_Paulo", label: '(GMT-03:00) Brasilia' },
  { value: "America/Noronha", label: '(GMT-02:00) Mid-Atlantic' },
  { value: "Atlantic/Cape_Verde", label: '(GMT-01:00) Cape Verde Is.' },
  { value: "Atlantic/Azores", label: '(GMT-01:00) Azores' },
  { value: "Europe/Belfast", label: '(GMT) Greenwich Mean Time : Belfast' },
  { value: "Europe/Dublin", label: '(GMT) Greenwich Mean Time : Dublin' },
  { value: "Europe/Lisbon", label: '(GMT) Greenwich Mean Time : Lisbon' },
  { value: "Europe/London", label: '(GMT) Greenwich Mean Time : London' },
  { value: "Africa/Abidjan", label: '(GMT) Monrovia, Reykjavik' },
  { value: "Europe/Amsterdam", label: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna' },
  { value: "Europe/Belgrade", label: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague' },
  { value: "Europe/Brussels", label: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris' },
  { value: "Africa/Algiers", label: '(GMT+01:00) West Central Africa' },
  { value: "Africa/Windhoek", label: '(GMT+01:00) Windhoek' },
  { value: "Asia/Beirut", label: '(GMT+02:00) Beirut' },
  { value: "Africa/Cairo", label: '(GMT+02:00) Cairo' },
  { value: "Asia/Gaza", label: '(GMT+02:00) Gaza' },
  { value: "Africa/Blantyre", label: '(GMT+02:00) Harare, Pretoria' },
  { value: "Asia/Jerusalem", label: '(GMT+02:00) Jerusalem' },
  { value: "Europe/Minsk", label: '(GMT+02:00) Minsk' },
  { value: "Asia/Damascus", label: '(GMT+02:00) Syria' },
  { value: "Europe/Moscow", label: '(GMT+03:00) Moscow, St. Petersburg, Volgograd' },
  { value: "Africa/Addis_Ababa", label: '(GMT+03:00) Nairobi' },
  { value: "Asia/Tehran", label: '(GMT+03:30) Tehran' },
  { value: "Asia/Dubai", label: '(GMT+04:00) Abu Dhabi, Muscat' },
  { value: "Asia/Yerevan", label: '(GMT+04:00) Yerevan' },
  { value: "Asia/Kabul", label: '(GMT+04:30) Kabul' },
  { value: "Asia/Yekaterinburg", label: '(GMT+05:00) Ekaterinburg' },
  { value: "Asia/Tashkent", label: '(GMT+05:00) Tashkent' },
  { value: "Asia/Kolkata", label: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi' },
  { value: "Asia/Katmandu", label: '(GMT+05:45) Kathmandu' },
  { value: "Asia/Dhaka", label: '(GMT+06:00) Astana, Dhaka' },
  { value: "Asia/Novosibirsk", label: '(GMT+06:00) Novosibirsk' },
  { value: "Asia/Rangoon", label: '(GMT+06:30) Yangon (Rangoon)' },
  { value: "Asia/Bangkok", label: '(GMT+07:00) Bangkok, Hanoi, Jakarta' },
  { value: "Asia/Krasnoyarsk", label: '(GMT+07:00) Krasnoyarsk' },
  { value: "Asia/Hong_Kong", label: '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi' },
  { value: "Asia/Irkutsk", label: '(GMT+08:00) Irkutsk, Ulaan Bataar' },
  { value: "Australia/Perth", label: '(GMT+08:00) Perth' },
  { value: "Australia/Eucla", label: '(GMT+08:45) Eucla' },
  { value: "Asia/Tokyo", label: '(GMT+09:00) Osaka, Sapporo, Tokyo' },
  { value: "Asia/Seoul", label: '(GMT+09:00) Seoul' },
  { value: "Asia/Yakutsk", label: '(GMT+09:00) Yakutsk' },
  { value: "Australia/Adelaide", label: '(GMT+09:30) Adelaide' },
  { value: "Australia/Darwin", label: '(GMT+09:30) Darwin' },
  { value: "Australia/Brisbane", label: '(GMT+10:00) Brisbane' },
  { value: "Australia/Hobart", label: '(GMT+10:00) Hobart' },
  { value: "Asia/Vladivostok", label: '(GMT+10:00) Vladivostok' },
  { value: "Australia/Lord_Howe", label: '(GMT+10:30) Lord Howe Island' },
  { value: "Etc/GMT-11", label: '(GMT+11:00) Solomon Is., New Caledonia' },
  { value: "Asia/Magadan", label: '(GMT+11:00) Magadan' },
  { value: "Pacific/Norfolk", label: '(GMT+11:30) Norfolk Island' },
  { value: "Asia/Anadyr", label: '(GMT+12:00) Anadyr, Kamchatka' },
  { value: "Pacific/Auckland", label: '(GMT+12:00) Auckland, Wellington' },
  { value: "Etc/GMT-12", label: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.' },
  { value: "Pacific/Chatham", label: '(GMT+12:45) Chatham Islands' },
  { value: "Pacific/Tongatapu", label: '(GMT+13:00) Nuku alofa' },
  { value: "Pacific/Kiritimati", label: '(GMT+14:00) Kiritimati' },
]

export const TimeFormat = [
  { value: '12 Hour', label: '12 Hour' },
  { value: '24 Hour', label: '24 Hour' },
  { value: 'None', label: 'None' }
]
export const DateFormat = [
  { value: 'Y-M-D', label: 'Y-M-D' },
  { value: 'M-D-Y', label: 'M-D-Y' },
  { value: 'D-M-Y', label: 'D-M-Y' },
  { value: 'Y/M/D', label: 'Y/M/D' },
  { value: 'M/D/Y', label: 'M/D/Y' },
  { value: 'D/M/Y', label: 'D/M/Y' }
]
export const RowPage = [
  { value: '10', label: '10' },
  { value: '30', label: '30' },
  { value: '50', label: '50' },
  { value: '80', label: '80' },
  { value: '100', label: '100' }
]
export const MarkAsRead = [
  { value: 'Never', label: 'Never' },
  { value: 'Immediately', label: 'Immediately' },
  { value: 'After 1 minutes', label: 'After 1 minutes' },
  { value: 'After 5 minutes', label: 'After 5 minutes' },
  { value: 'After 10 minutes', label: 'After 10 minutes' }
]
export const ReturnReceipt = [
  { value: 'Ask me', label: 'Ask me' },
  { value: 'Send receipt', label: 'Send receipt' },
  { value: 'Send receipt to my contacts', label: 'Send receipt to my contacts' },
  { value: 'Send receipt to my trusted sender', label: 'Send receipt to my trusted sender' }
]
export const Refresh = [
  { value: 'Every 1 minutes', label: 'Every 1 minutes' },
  { value: 'Every 3 minutes', label: 'Every 3 minutes' },
  { value: 'Every 5 minutes', label: 'Every 5 minutes' },
  { value: 'Every 10 minutes', label: 'Every 10 minutes' },
  { value: 'Every 15 minutes', label: 'Every 15 minutes' },
  { value: 'Every 30 minutes', label: 'Every 30 minutes' }
]
export const BlogCatagories = [
  { value: 'Health', label: 'Health' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Business', label: 'Business' },
  { value: 'Tourism', label: 'Tourism' },
  { value: 'Nature', label: 'Nature' },
  { value: 'Development', label: 'Development' },
  { value: 'Housing', label: 'Housing' },
  { value: 'Realestate', label: 'Realestate' },
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Flowers', label: 'Flowers' }
]

export const PlubishStatus = [
  { value: 'on-hold', label: 'On-Hold' },
  { value: 'Published', label: 'Published' },
  { value: 'Un-Published', label: 'Un-Published' },
  { value: 'Descarded', label: 'Descarded' }
]
export const PaymentStatus = [
  { value: 'Paid', label: 'Paid' },
  { value: 'Due', label: 'Due' },
  { value: 'Unpaid', label: 'Unpaid' },
  { value: 'OverDue', label: 'OverDue' }
]
export const modeofPayment = [
  { value: 'Debit/CreditCard', label: 'Debit/CreditCard' },
  { value: 'Netbanking', label: 'Netbanking' },
  { value: 'Paypal', label: 'Paypal' },
  { value: 'UPI', label: 'UPI' }
]
export const TeamCategory = [
  { value: 'UI Developer', label: 'UI Developer' },
  { value: 'Java Developer', label: 'Java Developer' },
  { value: 'React Developer', label: 'React Developer' },
  { value: 'FullStack Developer', label: 'FullStack Developer' },
  { value: 'Networking team', label: 'Networking team' }
]
export const InlineData = [
  { value: 'US', label: 'US' },
  { value: 'CA', label: 'CA' },
  { value: 'EU', label: 'EU' },
  
]
export const InlineAddonData = [
  { value: 'USD', label: 'USD' },
  { value: 'CAD', label: 'CAD' },
  { value: 'EUR', label: 'EUR' },
  
]

export const NewTask = [
  { value: 'Angelina May', label: 'Angelina May' },
  { value: 'Kiara advain', label: 'Kiara advain' },
  { value: 'Hercules Jhon', label: 'Hercules Jhon' },
  { value: 'Mayor Kim', label: 'Mayor Kim' },
]
export const Assigned = [
  { value: 'Critical', label: 'Critical' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
]
export const SortBy = [
  { value: 'A To Z', label: 'A To Z' },
  { value: 'Z To A', label: 'Z To A' },
  { value: 'Favorites', label: 'Favorites' },
  { value: 'ALL', label: 'ALL' },
]
export const StatusTask = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Inprogress', label: 'Inprogress' },
  { value: 'New', label: 'New' },
]
export const Month = [
  { value: 'January', label: 'January' },
  { value: 'Febuary', label: 'Febuary' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
]
export const Year = [
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
  { value: '2028', label: '2028' },
  { value: '2029', label: '2029' },
  { value: '2030', label: '2030' },
]