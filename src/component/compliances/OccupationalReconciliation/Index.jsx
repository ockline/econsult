import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableLoader from "/src/common/TableLoader";
import Swal from "sweetalert2";

const Index = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fileInput, setFileInput] = useState(null);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiBaseUrl}/compliances/occupational/list`);
      setRecords(res.data.occupational || []);
    } catch (error) {
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${apiBaseUrl}/compliances/occupational/import`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Occupation Incident uploaded Successfully", "success");
      fetchRecords();
    } catch (error) {
      Swal.fire("Error", "Sorry! Operation failed", "error");
    } finally {
      setIsImporting(false);
      setFileInput(null);
      e.target.value = "";
    }
  };

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
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}compliances/occupational`}>
              WCF Occupation Reconciliation
            </a>
          </li>
        </ol>
      </div>

      <div className="box">
        <div className="box-header flex justify-between items-center">
          <h5 className="box-title">ECMS.Req.009.2 - WCF Occupation Reconciliation</h5>
          <div className="flex gap-2">
            <label className="ti-btn ti-btn-primary cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                ref={(el) => setFileInput(el)}
                onChange={handleImport}
                disabled={isImporting}
              />
              {isImporting ? "Importing..." : "Import Excel"}
            </label>
            <Link to={`${import.meta.env.BASE_URL}compliances/occupational/add`} className="ti-btn ti-btn-primary">
              <i className="ti ti-plus" /> Add Occupation
            </Link>
          </div>
        </div>
        <div className="box-body">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            History of paid employees since operation started. Add new paid employees with WCF, import existing sheets.
          </p>

          <div className="table-bordered rounded-sm overflow-auto">
            <table className="ti-custom-table ti-custom-table-head">
              <thead className="bg-gray-50 dark:bg-black/20">
                <tr>
                  <th>S/No</th>
                  <th>Employee No</th>
                  <th>Employee Name</th>
                  <th>WCF Case No</th>
                  <th>Incident Date</th>
                  <th>Amount</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableLoader colSpan={8} />
                ) : records.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      No occupational records. Add or import to get started.
                    </td>
                  </tr>
                ) : (
                  records.map((rec, i) => (
                    <tr key={rec.id || i}>
                      <td>{i + 1}</td>
                      <td>{rec.employee_number}</td>
                      <td>{rec.employee_name}</td>
                      <td>{rec.wcf_case_number}</td>
                      <td>{rec.incident_date}</td>
                      <td>{rec.amount}</td>
                      <td>{rec.payment_status}</td>
                      <td>
                        <Link
                          to={`${import.meta.env.BASE_URL}compliances/occupational/edit/${rec.id}`}
                          className="ti-btn ti-btn-soft-secondary ti-btn-sm"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
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
