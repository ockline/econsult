import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import TableLoader from "/src/common/TableLoader";
import Swal from "sweetalert2";

/**
 * Shared report layout with date range, status filter, and export.
 */
const ReportLayout = ({ title, apiPath, columns = [], renderRows, statusOptions = [], typeOptions = [] }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [filters, setFilters] = useState({
    date_from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10),
    date_to: new Date().toISOString().slice(0, 10),
    status: "",
    type: "all",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.date_from) params.append("date_from", filters.date_from);
      if (filters.date_to) params.append("date_to", filters.date_to);
      if (filters.status) params.append("status", filters.status);
      if (filters.type && filters.type !== "all") params.append("type", filters.type);

      const res = await axios.get(`${apiBaseUrl}/reports/${apiPath}?${params.toString()}`);
      setData(res.data);
    } catch (error) {
      console.error("Report fetch error:", error);
      Swal.fire("Error", "Failed to load report data.", "error");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiPath]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const params = new URLSearchParams();
      if (filters.date_from) params.append("date_from", filters.date_from);
      if (filters.date_to) params.append("date_to", filters.date_to);
      if (filters.status) params.append("status", filters.status);
      if (filters.type && filters.type !== "all") params.append("type", filters.type);

      const url = `${apiBaseUrl}/reports/${apiPath}/export?${params.toString()}`;
      window.open(url, "_blank");
      Swal.fire("Success", "Report export started.", "success");
    } catch (error) {
      Swal.fire("Error", "Export failed.", "error");
    } finally {
      setIsExporting(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toYMD = (date) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const toDate = (ymd) => {
    if (!ymd) return null;
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  return (
    <div>
      <div className="box-body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "2em", margin: 0 }}>Reports</h1>
        <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
              Home
              <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 rtl:rotate-180" />
            </a>
          </li>
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary" href={`${import.meta.env.BASE_URL}reports/${apiPath}`}>
              {title}
            </a>
          </li>
        </ol>
      </div>

      <div className="box">
        <div className="box-header">
          <h5 className="box-title">{title} Report</h5>
        </div>
        <div className="box-body">
          <div className="flex flex-wrap items-end gap-6 mb-6">
            <div className="min-w-[180px]">
              <label className="block text-sm font-medium mb-2">Date From</label>
              <DatePicker
                className="ti-form-input w-full"
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                selected={toDate(filters.date_from)}
                onChange={(date) => handleFilterChange("date_from", toYMD(date))}
              />
            </div>
            <div className="min-w-[180px]">
              <label className="block text-sm font-medium mb-2">Date To</label>
              <DatePicker
                className="ti-form-input w-full"
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                selected={toDate(filters.date_to)}
                onChange={(date) => handleFilterChange("date_to", toYMD(date))}
              />
            </div>
            {statusOptions.length > 0 && (
              <div className="min-w-[180px]">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  className="ti-form-input w-full"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">All</option>
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            )}
            {typeOptions.length > 0 && (
              <div className="min-w-[180px]">
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  className="ti-form-input w-full"
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="all">All</option>
                  {typeOptions.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex items-end gap-3">
              <button
                type="button"
                className="ti-btn text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#b2000a' }}
                onClick={fetchData}
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
            <div className="ltr:ml-auto rtl:mr-auto flex items-end">
              <button
                type="button"
                className="ti-btn text-white hover:opacity-90 transition-opacity float-end"
                style={{ backgroundColor: '#b2000a' }}
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
                  {columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableLoader colSpan={columns.length} />
                ) : (
                  renderRows(data)
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportLayout;
