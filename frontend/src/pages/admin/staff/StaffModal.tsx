import { useState } from "react";
import { updateStaff, softDeleteStaff, toggleActiveStaff, permanentDeleteStaff } from "../../../api/staffapi/AddStaff";
import Popup from "../../../components/ui/Popup";
import { FiX } from "react-icons/fi";
import axios from "axios";

interface Props {
  staff: any;
  onClose: () => void;
  onUpdated: () => void;
  onDeleted: () => void;
}

const StaffModal = ({ staff, onClose, onUpdated, onDeleted }: Props) => {
  const [form, setForm] = useState({
    email: staff.email || "",
    mobile: staff.mobile || "",
    address: staff.address || "",
    manager: staff.manager || "",
    notes: staff.notes || "",
    maritalStatus: staff.maritalStatus || "",
  });

  const [popup, setPopup] = useState<any>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleUpdate = async () => {
  try {
    await updateStaff(staff.id, form);
    setPopup({ message: "Staff updated successfully", type: "success" });
    onUpdated();
    onClose();
  } catch (error: unknown) {
    let errorMessage = "Update failed";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    setPopup({ message: errorMessage, type: "error" });
  }
};

  const handleSoftDelete = async () => {
    if (!window.confirm("Deactivate this staff member?")) return;

    try {
      await softDeleteStaff(staff.id);
      onUpdated();
      onClose();
    } catch {
      setPopup({ message: "Deactivation failed", type: "error" });
    }
  };

  const handleToggleActive = async () => {
    try {
      await toggleActiveStaff(staff.id);
      onUpdated();
      onClose();
    } catch {
      setPopup({ message: "Toggle status failed", type: "error" });
    }
  };

  const handlePermanentDelete = async () => {
    const reason = prompt("Enter reason for permanent deletion:");
    if (!reason) return;

    try {
      await permanentDeleteStaff(staff.id, reason);
      onDeleted();
      onClose();
    } catch {
      setPopup({ message: "Permanent deletion failed", type: "error" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-6">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto scroll-smooth custom-scroll bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 shadow-2xl border border-gray-700 text-white">

        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition duration-200">
          <FiX size={26} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <img
            src={`http://localhost:8080/${staff.photoPath}`}
            className={`w-32 h-32 rounded-full object-cover border-4 shadow-lg ${
              staff.deleted ? "border-gray-500" : "border-green-500"
            }`}
          />
          <h2 className={`mt-6 text-3xl font-bold tracking-wide ${staff.deleted ? "text-gray-400" : ""}`}>
            {staff.fullName}
          </h2>
          <p className="text-sm text-gray-400 mt-2">{staff.staffId}</p>
          <span className={`mt-4 px-5 py-1 text-xs rounded-full font-semibold tracking-wide ${
            staff.deleted ? "bg-gray-500/20 text-gray-400" : "bg-green-500/20 text-green-400"
          }`}>
            {staff.role}
          </span>
        </div>

        {/* Read Only Info */}
        <div className="grid md:grid-cols-2 gap-6 text-sm mb-12">
          <Info label="Date of Birth" value={staff.dob} />
          <Info label="Gender" value={staff.gender} />
          <Info label="Salary" value={`₹${staff.salary}`} />
          <Info label="Work Schedule" value={staff.workSchedule} />
          <Info label="Created At" value={new Date(staff.createdAt).toLocaleString()} />
          <Info label="Created By" value={staff.createdBy} />
        </div>

        <hr className="border-gray-700 mb-10" />

        <h3 className="text-xl font-semibold text-yellow-400 mb-6">Editable Information</h3>

        {/* Editable Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <Editable label="Email" name="email" value={form.email} onChange={handleChange} />
          <Editable label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />
          <Editable label="Address" name="address" value={form.address} onChange={handleChange} />
          <Editable label="Reporting Manager" name="manager" value={form.manager} onChange={handleChange} />
          <Editable label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} />

          <div className="md:col-span-2">
            <label className="text-gray-400 text-xs uppercase tracking-wider">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 mt-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition duration-200"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-12">
          {staff.deleted ? (
            <button
              onClick={handleToggleActive}
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition duration-200"
            >
              Activate
            </button>
          ) : (
            <button
              onClick={handleSoftDelete}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition duration-200"
            >
              Deactivate
            </button>
          )}

          <button
            onClick={handlePermanentDelete}
            className="bg-gray-700 hover:bg-gray-800 px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition duration-200"
          >
            Permanent Delete
          </button>

          <button
            onClick={handleUpdate}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition duration-200"
          >
            Save Changes
          </button>
        </div>

        {popup && <Popup message={popup.message} type={popup.type} onClose={() => setPopup(null)} />}
      </div>
    </div>
  );
};

const Info = ({ label, value }: any) => (
  <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-gray-600 transition">
    <p className="text-gray-400 text-xs uppercase tracking-wider">{label}</p>
    <p className="mt-2 font-medium text-white">{value || "-"}</p>
  </div>
);

const Editable = ({ label, name, value, onChange }: any) => (
  <div>
    <label className="text-gray-400 text-xs uppercase tracking-wider">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 mt-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition duration-200"
    />
  </div>
);

export default StaffModal;