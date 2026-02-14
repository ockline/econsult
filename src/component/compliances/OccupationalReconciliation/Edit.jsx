import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Edit = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    wcf_case_number: "",
    incident_type: "",
    incident_date: "",
    reason_for_termination: "",
    comment: "",
    amount: "",
    payment_status: "",
    attachment: null,
  });

  useEffect(() => {
    if (id) {
      axios.get(`${apiBaseUrl}/compliances/occupational/show/${id}`).then((res) => {
        const d = res.data.occupational || res.data;
        setFormData((prev) => ({
          ...prev,
          ...d,
        }));
      }).catch(() => {});
    }
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v != null && v !== "" && k !== "attachment") data.append(k, v);
      if (k === "attachment" && v) data.append("attachment", v);
    });
    try {
      await axios.post(`${apiBaseUrl}/compliances/occupational/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Occupation Updated Successfully", "success");
      navigate(`${import.meta.env.BASE_URL}compliances/occupational`);
    } catch (error) {
      Swal.fire("Error", "Sorry! Operation failed", "error");
    }
  };

  return (
    <div>
      <div className="box-body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "2em", margin: 0 }}>Edit WCF Occupation</h1>
        <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
          <li className="text-sm">
            <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}compliances/occupational`}>
              WCF Occupation Reconciliation
            </a>
          </li>
        </ol>
      </div>

      <div className="box">
        <div className="box-header">
          <h5 className="box-title">Update Occupational Employee Details</h5>
        </div>
        <form onSubmit={handleSubmit} className="box-body">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <label className="block text-sm font-medium mb-2">WCF Case Number *</label>
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
              <label className="block text-sm font-medium mb-2">Attachment</label>
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
              Update
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

export default Edit;
