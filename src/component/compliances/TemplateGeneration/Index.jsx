import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import TableLoader from "/src/common/TableLoader";
import Swal from "sweetalert2";

const TEMPLATE_TYPES = [
  { value: "wcf", label: "WCF Employee Details" },
  { value: "nssf", label: "NSSF Employee Details" },
  { value: "payee", label: "PAYEE (TRA) Employee Details" },
  { value: "sdl", label: "SDL Employee Details" },
  { value: "workers_union", label: "Workers Union Employee Details" },
];

const EMPLOYEE_CATEGORIES = [
  { value: "all", label: "All Employees" },
  { value: "new", label: "New Employees" },
  { value: "promotion", label: "Promotion" },
  { value: "terminated", label: "Terminated" },
  { value: "retrenched", label: "Retrenched" },
];

const Index = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [templateType, setTemplateType] = useState("wcf");
  const [category, setCategory] = useState("all");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [month, year, category]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      let data = [];
      try {
        const res = await axios.get(`${apiBaseUrl}/compliances/template_employees`, {
          params: { month, year, category }
        });
        data = res.data.employees || [];
      } catch (e) {
        const res = await axios.get(`${apiBaseUrl}/contracts/all_contracts/show_contract`);
        data = res.data.all_contracts || [];
      }
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      Swal.fire("Warning Error", "Failed to fetch employee data.", "error");
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  const mapToExcelRow = (emp, index) => {
    const basicPay = Number(emp.basic_salary) || 0;
    const house = Number(emp.house_allowance) || 0;
    const meal = Number(emp.meal_allowance) || 0;
    const transport = Number(emp.transport_allowance) || 0;
    const grossPay = basicPay + house + meal + transport;
    const nameParts = (emp.employee_name || "").split(" ").filter(Boolean);
    const first = emp.firstname || nameParts[0] || "";
    const middle = emp.middlename || nameParts[1] || "";
    const last = emp.lastname || nameParts.slice(2).join(" ") || nameParts[nameParts.length - 1] || "";

    switch (templateType) {
      case "wcf":
        return {
          "Employee number": emp.employee_no || emp.employee_id || "",
          "WCF number": emp.wcf || "",
          "First name": first,
          "Middle name": middle,
          "Last name": last,
          "Gender": emp.gender || "",
          "DOB": emp.dob || "",
          "Basic pay": basicPay,
          "Gross pay": grossPay,
          "Job title": emp.job_title || "",
          "Employee category": emp.staff_classfication || emp.employee_category || "",
          "National ID": emp.national_id || "",
        };
      case "nssf":
        return {
          "MEMBER NO": emp.nssf || emp.member_no || "",
          "FIRST NAME": first,
          "MIDDLE NAME": middle,
          "SURNAME": last,
          "WAGE (gross pay)": grossPay,
        };
      case "payee":
        return {
          "Employee number": emp.employee_no || emp.employee_id || "",
          "Tin": emp.tin || "",
          "First name": first,
          "Middle name": middle,
          "Last name": last,
          "Basic pay": basicPay,
          "Gross pay": grossPay,
        };
      case "sdl":
        if (index === 0) {
          const sumBasic = employees.reduce((s, e) => s + (Number(e.basic_salary) || 0), 0);
          const sumOther = employees.reduce((s, e) => {
            const h = Number(e.house_allowance) || 0;
            const m = Number(e.meal_allowance) || 0;
            const t = Number(e.transport_allowance) || 0;
            return s + h + m + t;
          }, 0);
          return {
            "Number of employee": employees.length,
            "Sum of basic salary": sumBasic,
            "Sum of other allowances": sumOther,
            "Sum of exemption": 0,
          };
        }
        return null;
      case "workers_union":
        return {
          "Member Number": emp.nssf || emp.member_no || "",
          "First name": first,
          "Middle name": middle,
          "Last name": last,
          "Basic pay": basicPay,
        };
      default:
        return {};
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      let rows = [];
      if (templateType === "sdl") {
        rows = [mapToExcelRow(employees[0] || {}, 0)];
      } else {
        rows = employees.map((emp, i) => mapToExcelRow(emp, i)).filter(Boolean);
      }

      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Compliance");
      const fileName = `Compliance_${TEMPLATE_TYPES.find(t => t.value === templateType)?.label.replace(/\s+/g, "_")}_${year}-${String(month).padStart(2, "0")}.xlsx`;
      XLSX.writeFile(wb, fileName);
      Swal.fire("Success", "Excel Downloaded Successfully", "success");
    } catch (error) {
      console.error("Export error:", error);
      Swal.fire("Warning Error", "Excel download encountered errors.", "error");
    } finally {
      setIsExporting(false);
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: new Date(2000, i).toLocaleString("default", { month: "long" }) }));
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div>
      <div className="box-body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "2em", margin: 0 }}>Compliance Management</h1>
        <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
              Home
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180" />
            </a>
          </li>
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}compliances/templategeneration`}>
              Template Generation
            </a>
          </li>
        </ol>
      </div>

      <div className="box">
        <div className="box-header">
          <h5 className="box-title">ECMS.Req.009 - Template Generation</h5>
        </div>
        <div className="box-body">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Auto-generate compliance Excel forms for WCF, NSSF, PAYEE (TRA), SDL, and Workers Union.
          </p>

          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12 lg:col-span-3">
              <label className="block text-sm font-medium mb-2">Template Type</label>
              <select
                className="ti-form-input w-full"
                value={templateType}
                onChange={(e) => setTemplateType(e.target.value)}
              >
                {TEMPLATE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="col-span-12 lg:col-span-2">
              <label className="block text-sm font-medium mb-2">Month</label>
              <select className="ti-form-input w-full" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            <div className="col-span-12 lg:col-span-2">
              <label className="block text-sm font-medium mb-2">Year</label>
              <select className="ti-form-input w-full" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <label className="block text-sm font-medium mb-2">Employee Category</label>
              <select className="ti-form-input w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                {EMPLOYEE_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="col-span-12 lg:col-span-2 flex items-end">
              <button
                type="button"
                className="ti-btn ti-btn-primary w-full"
                onClick={handleExport}
                disabled={isExporting || isLoading}
              >
                {isExporting ? "Exporting..." : "Export Excel"}
              </button>
            </div>
          </div>

          <div className="table-bordered rounded-sm overflow-auto">
            <table className="ti-custom-table ti-custom-table-head">
              <thead className="bg-gray-50 dark:bg-black/20">
                <tr>
                  <th>S/No</th>
                  <th>Employee</th>
                  <th>Name</th>
                  <th>Employer</th>
                  <th>Basic Pay</th>
                  <th>Job Title</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableLoader colSpan={6} />
                ) : (
                  employees.map((emp, i) => {
                    const basic = Number(emp.basic_salary) || 0;
                    const gross = basic + (Number(emp.house_allowance) || 0) + (Number(emp.meal_allowance) || 0) + (Number(emp.transport_allowance) || 0);
                    return (
                      <tr key={emp.id || i}>
                        <td>{i + 1}</td>
                        <td>{emp.employee_no || emp.employee_id}</td>
                        <td>{emp.employee_name}</td>
                        <td>{emp.employer_name}</td>
                        <td>{gross > 0 ? gross.toLocaleString() : basic.toLocaleString()}</td>
                        <td>{emp.job_title}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
