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

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
//  /* starting of returning departments  */
export const CostCenterSelect = [
  { value: '1', label: 'Yes' },
  { value: '2', label: 'No' },
 
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
    const response = await fetch(`${apiBaseUrl}/employers/show_employer`);
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
// console.log('welimba');
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
// const usermchongo = await fetchUsers();
// console.log('welimba');
// console.log(usermchongo);

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