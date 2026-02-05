import { useEffect, useState } from "react";
import { getMyAccounts } from "../../api/cutomersapi/CustomerAccount";
import Popup from "../../components/ui/Popup";
import StatusBadge from "../../components/ui/StatusBadge";

interface Account {
  id: number;
  accountNumber: string;
  type: string;
  balance: number;
  frozen: boolean;
  closed: boolean;
}

const MyAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [popup, setPopup] = useState<any>(null);

  const loadAccounts = async () => {
    try {
      const res = await getMyAccounts();
      setAccounts(res.data);
    } catch {
      setPopup({ message: "Failed to load accounts", type: "error" });
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const getStatus = (acc: Account) => {
    if (acc.closed) return "CLOSED";
    if (acc.frozen) return "FROZEN";
    return "ACTIVE";
  };

  return (
    <div className="p-4 md:p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">My Accounts</h1>

      {/* Empty State */}
      {accounts.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center text-gray-400">
          No accounts found
        </div>
      ) : (
        <>
          {/* ===== Mobile View (Cards) ===== */}
          <div className="grid gap-4 md:hidden">
            {accounts.map(acc => (
              <div
                key={acc.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Account No</span>
                  <StatusBadge status={getStatus(acc)} />
                </div>

                <p className="font-medium tracking-wide">
                  {acc.accountNumber}
                </p>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Type</span>
                  <span>{acc.type}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Balance</span>
                  <span className="font-semibold">
                    ₹ {acc.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ===== Tablet & Desktop View (Table) ===== */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-sm uppercase text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Account No</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-right">Balance</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {accounts.map(acc => (
                  <tr
                    key={acc.id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      {acc.accountNumber}
                    </td>
                    <td className="px-4 py-3">{acc.type}</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      ₹ {acc.balance.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={getStatus(acc)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
};

export default MyAccounts;
