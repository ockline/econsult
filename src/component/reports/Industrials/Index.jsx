import React from "react";
import ReportLayout from "../ReportLayout";

const IndustrialsReport = () => {
  const columns = [
    { key: "no", label: "S/No" },
    { key: "type", label: "Type" },
    { key: "employee_no", label: "Employee No" },
    { key: "name", label: "Employee Name" },
    { key: "detail", label: "Status/Type" },
    { key: "created", label: "Created At" },
  ];

  const renderRows = (data) => {
    if (!data) return null;
    const rows = [];
    let i = 1;
    (data.misconducts || []).forEach((m) => {
      rows.push(
        <tr key={`m-${m.id}`}>
          <td>{i++}</td>
          <td>Misconduct</td>
          <td>{m.employee_no}</td>
          <td>{[m.firstname, m.middlename, m.lastname].filter(Boolean).join(" ")}</td>
          <td>{m.misconduct_type_name ?? m.status ?? "-"}</td>
          <td>{m.created_at}</td>
        </tr>
      );
    });
    (data.disciplinaries || []).forEach((d) => {
      rows.push(
        <tr key={`d-${d.id}`}>
          <td>{i++}</td>
          <td>Disciplinary</td>
          <td>{d.employee_no}</td>
          <td>{[d.firstname, d.middlename, d.lastname].filter(Boolean).join(" ")}</td>
          <td>{d.status ?? "-"}</td>
          <td>{d.created_at}</td>
        </tr>
      );
    });
    (data.performance_reviews || []).forEach((p) => {
      rows.push(
        <tr key={`p-${p.id}`}>
          <td>{i++}</td>
          <td>Performance Review</td>
          <td>{p.employee_no}</td>
          <td>{[p.firstname, p.middlename, p.lastname].filter(Boolean).join(" ")}</td>
          <td>{p.overall_rating ?? "-"}</td>
          <td>{p.created_at}</td>
        </tr>
      );
    });
    (data.grievances || []).forEach((g) => {
      rows.push(
        <tr key={`g-${g.id}`}>
          <td>{i++}</td>
          <td>Grievance</td>
          <td>{g.employee_no}</td>
          <td>{[g.firstname, g.middlename, g.lastname].filter(Boolean).join(" ")}</td>
          <td>{g.status ?? "-"}</td>
          <td>{g.created_at}</td>
        </tr>
      );
    });
    if (rows.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-8 text-gray-500">No records found.</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <ReportLayout
      title="Industrial Relation"
      apiPath="industrials"
      columns={columns}
      renderRows={renderRows}
      typeOptions={[
        { value: "misconducts", label: "Misconduct" },
        { value: "grievances", label: "Grievances" },
        { value: "disciplinaries", label: "Disciplinary" },
        { value: "performance_reviews", label: "Performance Review" },
      ]}
    />
  );
};

export default IndustrialsReport;
