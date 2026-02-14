import React from "react";
import ReportLayout from "../ReportLayout";

const ClientsReport = () => {
  const columns = [
    { key: "no", label: "S/No" },
    { key: "name", label: "Name" },
    { key: "contact", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "vrn", label: "VRN" },
    { key: "created", label: "Created At" },
  ];

  const renderRows = (data) => {
    if (!data || !data.employers) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-8 text-gray-500">No records found.</td>
        </tr>
      );
    }
    return data.employers.map((emp, i) => (
      <tr key={emp.id}>
        <td>{i + 1}</td>
        <td>{emp.name}</td>
        <td>{emp.phone_number || emp.telephone || "-"}</td>
        <td>{emp.email || "-"}</td>
        <td>{emp.vrn || "-"}</td>
        <td>{emp.created_at}</td>
      </tr>
    ));
  };

  return (
    <ReportLayout
      title="Employer or Clients"
      apiPath="clients"
      columns={columns}
      renderRows={renderRows}
    />
  );
};

export default ClientsReport;
