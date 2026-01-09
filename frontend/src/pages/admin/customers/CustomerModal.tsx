import { deleteCustomer, updateCustomer } from "../../../api/AddCustomer";
import { useState } from "react";

interface Customer {
  id: number;
  customerId: string;
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  email?: string;
  address?: string;
  accountNumber: string;
  status: string;
  createdByRole: string;
  createdAt: string;
}

interface CustomerModalProps {
  customer: Customer;
  onClose: () => void;
  onUpdated: () => void;
  onDeleted: () => void;
  onError: (msg: string) => void;
}

/* ------------------ UI Helpers ------------------ */

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const EditableInput = ({ label, ...props }: any) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <input
      {...props}
      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
    />
  </div>
);

const EditableSelect = ({ label, options, ...props }: any) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <select
      {...props}
      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

/* ------------------ Modal ------------------ */

const CustomerModal = ({
  customer,
  onClose,
  onUpdated,
  onDeleted,
  onError,
}: CustomerModalProps) => {
  const [form, setForm] = useState({
    fullName: customer.fullName,
    gender: customer.gender,
    status: customer.status,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* -------- UPDATE -------- */
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateCustomer(customer.id, {
        fullName: form.fullName,
        gender: form.gender,
        status: form.status,
      });
      onUpdated();
      onClose();
    } catch (err: any) {
      onError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* -------- DELETE -------- */
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      setLoading(true);
      await deleteCustomer(customer.id);
      onDeleted();
      onClose();
    } catch (err: any) {
      onError(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-2xl rounded-xl p-6">

        <h2 className="text-xl font-bold mb-5 text-white">
          Customer Details
        </h2>

        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <Detail label="Customer ID" value={customer.customerId} />
          <Detail label="Account Number" value={customer.accountNumber} />

          <EditableInput
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <Detail label="DOB" value={customer.dob} />

          <EditableSelect
            label="Gender"
            name="gender"
            value={form.gender}
            options={["Male", "Female", "Other"]}
            onChange={handleChange}
          />

          <Detail label="Mobile" value={customer.mobile} />
          <Detail label="Email" value={customer.email || "-"} />
          <Detail label="Address" value={customer.address || "-"} />

          <EditableSelect
            label="Status"
            name="status"
            value={form.status}
            options={["ACTIVE", "INACTIVE"]}
            onChange={handleChange}
          />

          <Detail label="Created By" value={customer.createdByRole} />
          <Detail
            label="Created At"
            value={new Date(customer.createdAt).toLocaleString()}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white disabled:opacity-50"
          >
            Delete
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white disabled:opacity-50"
          >
            Update
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
