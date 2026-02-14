import React from "react";
import ReportLayout from "../ReportLayout";

const ContractsReport = () => {
  const columns = [
    { key: "no", label: "S/No" },
    { key: "type", label: "Type" },
    { key: "employee_no", label: "Employee No" },
    { key: "name", label: "Employee Name" },
    { key: "job_title", label: "Job Title" },
    { key: "employer", label: "Employer" },
    { key: "basic", label: "Basic Salary" },
    { key: "created", label: "Created At" },
  ];

  const renderRows = (data) => {
    if (!data) return null;
    const rows = [];
    let i = 1;
    (data.fixed || []).forEach((c) => {
      const name = [c.firstname, c.middlename, c.lastname].filter(Boolean).join(" ") || c.employee_name;
      rows.push(
        <tr key={`f-${c.id}`}>
          <td>{i++}</td>
          <td>Fixed</td>
          <td>{c.employee_no}</td>
          <td>{name}</td>
          <td>{c.job_title_name}</td>
          <td>{c.employer_name}</td>
          <td>{c.basic_salary != null ? Number(c.basic_salary).toLocaleString() : "-"}</td>
          <td>{c.created_at}</td>
        </tr>
      );
    });
    (data.specific || []).forEach((c) => {
      const name = [c.firstname, c.middlename, c.lastname].filter(Boolean).join(" ") || c.employee_name;
      rows.push(
        <tr key={`s-${c.id}`}>
          <td>{i++}</td>
          <td>Specific Task</td>
          <td>{c.employee_no}</td>
          <td>{name}</td>
          <td>{c.job_title_name}</td>
          <td>{c.employer_name}</td>
          <td>{c.basic_salary != null ? Number(c.basic_salary).toLocaleString() : "-"}</td>
          <td>{c.created_at}</td>
        </tr>
      );
    });
    if (rows.length === 0) {
      return (
        <tr>
          <td colSpan={8} className="text-center py-8 text-gray-500">No records found.</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <ReportLayout
      title="Contracts"
      apiPath="contracts"
      columns={columns}
      renderRows={renderRows}
      typeOptions={[
        { value: "fixed", label: "Fixed Term" },
        { value: "specific", label: "Specific Task" },
      ]}
    />
  );
};

export default ContractsReport;
