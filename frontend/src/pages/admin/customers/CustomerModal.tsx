import {
  deleteCustomer,
  updateCustomer,
  getAccountsByCustomer,
  createAccountApi,
  freezeAccountApi,
  unfreezeAccountApi,
  closeAccountApi,
} from "../../../api/AddCustomer";
import Popup from "../../../components/ui/Popup";
import { useState, useEffect } from "react";

/* ================= TYPES ================= */
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

interface Account {
  id: number;
  accountNumber: string;
  type: string;
  balance: number;
  frozen: boolean;
  closed: boolean;
}

interface CustomerModalProps {
  customer: Customer;
  onClose: () => void;
  onUpdated: () => void;
  onDeleted: () => void;
  onError: (msg: string) => void;
}

/* ================= UI HELPERS ================= */
const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-medium break-words">{value}</p>
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

/* ================= MODAL ================= */
const CustomerModal = ({
  customer,
  onClose,
  onUpdated,
  onDeleted,
}: CustomerModalProps) => {
  const [form, setForm] = useState({
    fullName: customer.fullName,
    gender: customer.gender,
    status: customer.status,
  });

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newAccountType, setNewAccountType] = useState("");

  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- LOAD ACCOUNTS ---------- */
  const loadAccounts = async () => {
    try {
      const res = await getAccountsByCustomer(customer.id);
      setAccounts(res.data);
    } catch {
      setPopup({ message: "Failed to load accounts", type: "error" });
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  /* ---------- CREATE ACCOUNT ---------- */
  const createAccount = async () => {
    if (!newAccountType) {
      setPopup({ message: "Select account type", type: "error" });
      return;
    }

    try {
      await createAccountApi(customer.id, newAccountType);
      setPopup({ message: "Account created successfully", type: "success" });
      setNewAccountType("");
      loadAccounts();
    } catch (e: any) {
      setPopup({
        message: e.response?.data?.message || "Account already exists",
        type: "error",
      });
    }
  };

  /* ---------- ACCOUNT ACTIONS ---------- */
  const freeze = async (id: number) => {
    await freezeAccountApi(id);
    loadAccounts();
  };

  const unfreeze = async (id: number) => {
    await unfreezeAccountApi(id);
    loadAccounts();
  };

  const closeAcc = async (id: number) => {
    await closeAccountApi(id);
    loadAccounts();
  };

  /* ---------- UPDATE ---------- */
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateCustomer(customer.id, form);
      onUpdated();
      onClose();
    } catch {
      setPopup({ message: "Update failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async () => {
    if (!window.confirm("Delete customer?")) return;
    try {
      setLoading(true);
      await deleteCustomer(customer.id);
      onDeleted();
      onClose();
    } catch {
      setPopup({ message: "Delete failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-2 sm:px-4">
      <div className="bg-gray-900 w-full max-w-3xl rounded-xl text-white max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold">Customer Details</h2>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* CUSTOMER DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
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

          {/* ACCOUNTS */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Accounts</h3>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <select
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
              >
                <option value="">Select Type</option>
                <option value="SAVINGS">Savings</option>
                <option value="CURRENT">Current</option>
              </select>

              <button
                onClick={createAccount}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Create Account
              </button>
            </div>

            {accounts.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-[600px] w-full border border-gray-700 text-sm">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="p-2">Account No</th>
                      <th>Type</th>
                      <th>Balance</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((acc) => (
                      <tr key={acc.id} className="border-t border-gray-700">
                        <td className="p-2">{acc.accountNumber}</td>
                        <td>{acc.type}</td>
                        <td>₹ {acc.balance}</td>
                        <td>
                          {acc.closed
                            ? "CLOSED"
                            : acc.frozen
                            ? "FROZEN"
                            : "ACTIVE"}
                        </td>
                        <td className="flex gap-2 justify-center p-2">
                          {!acc.closed && (
                            <>
                              {acc.frozen ? (
                                <button
                                  onClick={() => unfreeze(acc.id)}
                                  className="bg-blue-600 px-2 py-1 rounded"
                                >
                                  Unfreeze
                                </button>
                              ) : (
                                <button
                                  onClick={() => freeze(acc.id)}
                                  className="bg-yellow-600 px-2 py-1 rounded"
                                >
                                  Freeze
                                </button>
                              )}
                              <button
                                onClick={() => closeAcc(acc.id)}
                                className="bg-red-600 px-2 py-1 rounded"
                              >
                                Close
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-4 flex justify-end gap-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 rounded"
          >
            Delete
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-green-600 rounded"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded"
          >
            Close
          </button>
        </div>

        {popup && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={() => setPopup(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerModal;
