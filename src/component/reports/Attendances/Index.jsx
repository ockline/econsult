import React from "react";
import ReportLayout from "../ReportLayout";

const AttendancesReport = () => {
  const columns = [
    { key: "no", label: "S/No" },
    { key: "type", label: "Type" },
    { key: "employee_no", label: "Employee No" },
    { key: "name", label: "Employee Name" },
    { key: "date", label: "Date" },
    { key: "in_hours", label: "Time In / Hours" },
    { key: "out", label: "Time Out" },
  ];

  const renderRows = (data) => {
    if (!data) return null;
    const rows = [];
    let i = 1;
    (data.attendance || []).forEach((a) => {
      rows.push(
        <tr key={`a-${a.id}`}>
          <td>{i++}</td>
          <td>Normal</td>
          <td>{a.employee_no}</td>
          <td>{[a.firstname, a.middlename, a.lastname].filter(Boolean).join(" ") || a.employee_name}</td>
          <td>{a.date}</td>
          <td>{a.time_in}</td>
          <td>{a.time_out}</td>
        </tr>
      );
    });
    (data.overtime || []).forEach((o) => {
      rows.push(
        <tr key={`o-${o.id}`}>
          <td>{i++}</td>
          <td>Overtime</td>
          <td>{o.employee_no}</td>
          <td>{[o.firstname, o.middlename, o.lastname].filter(Boolean).join(" ") || o.employee_name}</td>
          <td>{o.overtime_date}</td>
          <td>{o.ot_hours}</td>
          <td>-</td>
        </tr>
      );
    });
    if (rows.length === 0) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-8 text-gray-500">No records found.</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <ReportLayout
      title="Attendances"
      apiPath="attendances"
      columns={columns}
      renderRows={renderRows}
      typeOptions={[
        { value: "normal", label: "Normal" },
        { value: "overtime", label: "Overtime" },
      ]}
    />
  );
};

export default AttendancesReport;
