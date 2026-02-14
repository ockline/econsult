import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Add = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: "",
    employee_number: "",
    employee_name: "",
    wcf_case_number: "",
    incident_type: "",
    employer_reported_by: "",
    incident_date: "",
    reason_for_termination: "",
    sick_leave_less: "",
    comment: "",
    amount: "",
    payment_status: "",
    health_status: "",
    attachment: null,
    cause: "",
    status: "",
    recommendation: "",
  });

  useEffect(() => {
    axios.get(`${apiBaseUrl}/contracts/all_contracts/show_contract`).then((res) => {
      setEmployees(res.data.all_contracts || []);
    });
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "employee_id") {
      const emp = employees.find((e) => String(e.employee_id) === String(value));
      if (emp) {
        setFormData((prev) => ({
          ...prev,
          employee_id: value,
          employee_number: String(emp.employee_no ?? emp.employee_id ?? value),
          employee_name: emp.employee_name || "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v != null && v !== "" && k !== "attachment") data.append(k, v);
      if (k === "attachment" && v) data.append("attachment", v);
    });
    try {
      await axios.post(`${apiBaseUrl}/compliances/occupational/store`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Occupation Added Successfully", "success");
      navigate(`${import.meta.env.BASE_URL}compliances/occupational`);
    } catch (error) {
      Swal.fire("Error", "Sorry! Operation failed", "error");
    }
  };

  return (
    <div>
      <div className="box-body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "2em", margin: 0 }}>Add WCF Occupation</h1>
        <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}dashboards/normal`}>
              Home
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
        <div className="box-header">
          <h5 className="box-title">Add Occupational Employee Details</h5>
        </div>
        <form onSubmit={handleSubmit} className="box-body">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <label className="block text-sm font-medium mb-2">Employee</label>
              <select
                className="ti-form-input w-full"
                value={formData.employee_id}
                onChange={(e) => handleInputChange("employee_id", e.target.value)}
              >
                <option value="">Select Employee</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.employee_id}>
                    {e.employee_name} ({e.employee_no || e.employee_id})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block text-sm font-medium mb-2">WCF Case Number (Filename) *</label>
              <input
                type="text"
                className="ti-form-input w-full"
                value={formData.wcf_case_number}
                onChange={(e) => handleInputChange("wcf_case_number", e.target.value)}
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block text-sm font-medium mb-2">Incident Date</label>
              <input
                type="date"
                className="ti-form-input w-full"
                value={formData.incident_date}
                onChange={(e) => handleInputChange("incident_date", e.target.value)}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block text-sm font-medium mb-2">Incident Type</label>
              <input
                type="text"
                className="ti-form-input w-full"
                value={formData.incident_type}
                onChange={(e) => handleInputChange("incident_type", e.target.value)}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                className="ti-form-input w-full"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <label className="block text-sm font-medium mb-2">Payment Status</label>
              <select
                className="ti-form-input w-full"
                value={formData.payment_status}
                onChange={(e) => handleInputChange("payment_status", e.target.value)}
              >
                <option value="">Select</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label className="block text-sm font-medium mb-2">Reason for Termination</label>
              <textarea
                className="ti-form-input w-full"
                rows={2}
                value={formData.reason_for_termination}
                onChange={(e) => handleInputChange("reason_for_termination", e.target.value)}
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label className="block text-sm font-medium mb-2">Comment</label>
              <textarea
                className="ti-form-input w-full"
                rows={2}
                value={formData.comment}
                onChange={(e) => handleInputChange("comment", e.target.value)}
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label className="block text-sm font-medium mb-2">Attachment (WCF Award Letter)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="ti-form-input w-full"
                onChange={(e) => handleInputChange("attachment", e.target.files?.[0])}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button type="submit" className="ti-btn ti-btn-primary">
              Save
            </button>
            <Link to={`${import.meta.env.BASE_URL}compliances/occupational`} className="ti-btn ti-btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
