import React from "react";
import ReportLayout from "../ReportLayout";

const EmployeesReport = () => {
  const columns = [
    { key: "no", label: "S/No" },
    { key: "employee_no", label: "Employee No" },
    { key: "name", label: "Name" },
    { key: "job_title", label: "Job Title" },
    { key: "department", label: "Department" },
    { key: "employer", label: "Employer" },
    { key: "stage", label: "Stage" },
    { key: "created", label: "Created At" },
  ];

  const renderRows = (data) => {
    if (!data || !data.employees) {
      return (
        <tr>
          <td colSpan={8} className="text-center py-8 text-gray-500">No records found.</td>
        </tr>
      );
    }
    return data.employees.map((emp, i) => (
      <tr key={emp.id}>
        <td>{i + 1}</td>
        <td>{emp.employee_no}</td>
        <td>{[emp.firstname, emp.middlename, emp.lastname].filter(Boolean).join(" ")}</td>
        <td>{emp.job_title_name}</td>
        <td>{emp.department_name}</td>
        <td>{emp.employer_name}</td>
        <td>{emp.progressive_stage ?? "-"}</td>
        <td>{emp.created_at}</td>
      </tr>
    ));
  };

  return (
    <ReportLayout
      title="Employee Registration"
      apiPath="employees"
      columns={columns}
      renderRows={renderRows}
      typeOptions={[
        { value: "1", label: "Employee Details" },
        { value: "2", label: "Supportive Document" },
        { value: "3", label: "Social Record" },
        { value: "4", label: "Induction Training" },
        { value: "5", label: "Contract" },
        { value: "6", label: "Person ID" },
        { value: "7", label: "Employee Registration Completed" },
      ]}
    />
  );
};

export default EmployeesReport;
