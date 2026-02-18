import { useEffect, useState } from "react";
import {
  fetchCustomers,
  getAccountsByCustomer,
  createAccountApi,
  freezeAccountApi,
  unfreezeAccountApi,
  closeAccountApi,
} from "../../../api/AddCustomer";

interface Customer {
  id: number;
  customerId: string;
  fullName: string;
  email?: string;
}

interface Account {
  id: number;
  accountNumber: string;
  type: string;
  balance: number;
  frozen: boolean;
  closed: boolean;
}

const AllAccounts = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newAccountType, setNewAccountType] = useState("");

  /* ---------------- LOAD CUSTOMERS ---------------- */
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await fetchCustomers();
        setCustomers(res?.data?.content || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadCustomers();
  }, []);

  /* ---------------- LOAD ACCOUNTS ---------------- */
  const loadAccounts = async (customerId: number) => {
    try {
      const res = await getAccountsByCustomer(customerId);
      setAccounts(res.data);
    } catch (error) {
      console.error("Failed to load accounts");
    }
  };

  /* ---------------- SELECT CUSTOMER ---------------- */
  const handleSelectCustomer = (cust: Customer) => {
    setSelectedCustomer(cust);
    loadAccounts(cust.id);
  };

  /* ---------------- CREATE ACCOUNT ---------------- */
  const createAccount = async () => {
    if (!selectedCustomer || !newAccountType) return;

    try {
      await createAccountApi(selectedCustomer.id, newAccountType);
      setNewAccountType("");
      loadAccounts(selectedCustomer.id);
    } catch {
      alert("Account already exists");
    }
  };

  /* ---------------- ACCOUNT ACTIONS ---------------- */
  const freeze = async (id: number) => {
    await freezeAccountApi(id);
    if (selectedCustomer) loadAccounts(selectedCustomer.id);
  };

  const unfreeze = async (id: number) => {
    await unfreezeAccountApi(id);
    if (selectedCustomer) loadAccounts(selectedCustomer.id);
  };

  const closeAcc = async (id: number) => {
    await closeAccountApi(id);
    if (selectedCustomer) loadAccounts(selectedCustomer.id);
  };

  return (
    <div className="p-6 text-white space-y-6">
        

      {/* CUSTOMER LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Customers</h2>
        <div className="space-y-2">
          {customers.map((cust) => (
            <div
              key={cust.id}
              onClick={() => handleSelectCustomer(cust)}
              className={`p-3 rounded cursor-pointer ${
                selectedCustomer?.id === cust.id
                  ? "bg-green-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {cust.fullName}
            </div>
          ))}
        </div>
      </div>

      {/* SELECTED CUSTOMER DETAILS */}
      {selectedCustomer && (
        <div className="bg-gray-900 p-6 rounded-xl space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="text-sm text-gray-400">Customer ID</p>
              <p className="font-medium">{selectedCustomer.customerId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Full Name</p>
              <p className="font-medium">{selectedCustomer.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium">
                {selectedCustomer.email || "-"}
              </p>
            </div>
          </div>

          {/* ACCOUNTS SECTION */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Accounts</h3>

            {/* CREATE ACCOUNT */}
            <div className="flex gap-2 mb-4">
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

            {/* ACCOUNTS TABLE */}
            {accounts.length > 0 && (
              <table className="w-full border border-gray-700 text-sm">
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
            )}

            {accounts.length === 0 && (
              <p className="text-gray-400">No accounts found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAccounts;