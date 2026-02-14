import React from "react";
import ReportLayout from "../ReportLayout";

const HiringReport = () => {
  const columns = [
    { key: "no", label: "S/No" },
    { key: "type", label: "Type" },
    { key: "title", label: "Title / Job" },
    { key: "employer", label: "Employer" },
    { key: "status", label: "Status" },
    { key: "created", label: "Created At" },
  ];

  const renderRows = (data) => {
    if (!data) return null;
    const rows = [];
    let i = 1;
    (data.vacancies || []).forEach((v) => {
      rows.push(
        <tr key={`v-${v.id}`}>
          <td>{i++}</td>
          <td>Vacancy</td>
          <td>{v.title}</td>
          <td>{v.employer_name}</td>
          <td>{v.status ?? "-"}</td>
          <td>{v.created_at}</td>
        </tr>
      );
    });
    (data.hr_interviews || []).forEach((h) => {
      rows.push(
        <tr key={`h-${h.id}`}>
          <td>{i++}</td>
          <td>HR Interview</td>
          <td>{h.job_title}</td>
          <td>{h.employer_name}</td>
          <td>{h.overall_rating ?? "-"}</td>
          <td>{h.created_at}</td>
        </tr>
      );
    });
    (data.technical_interviews || []).forEach((t) => {
      rows.push(
        <tr key={`t-${t.id}`}>
          <td>{i++}</td>
          <td>Technical Interview</td>
          <td>{t.job_title}</td>
          <td>{t.employer_name}</td>
          <td>{t.overall_rating ?? "-"}</td>
          <td>{t.created_at}</td>
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
      title="Hiring"
      apiPath="hirings"
      columns={columns}
      renderRows={renderRows}
      typeOptions={[
        { value: "vacancies", label: "Vacancies" },
        { value: "hr_interviews", label: "HR Interviews" },
        { value: "technical_interviews", label: "Technical Interviews" },
      ]}
    />
  );
};

export default HiringReport;
