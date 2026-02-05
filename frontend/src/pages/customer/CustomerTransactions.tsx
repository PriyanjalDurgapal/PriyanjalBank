import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMyTransactions } from "../../api/cutomersapi/customerTransactionApi";

type Transaction = {
  id: number;
  type: "DEPOSIT" | "WITHDRAW";
  amount: number;
  balanceAfter: number;
  serviceProvider: string;
  channel: string;
  createdAt: string;
};

export default function CustomerTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTransactions()
      .then((res) => setTransactions(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-green-400 text-lg">
        Loading transaction history...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full overflow-x-auto rounded-xl border border-white/10 bg-black/20"
    >
      <table className="min-w-full text-sm text-white">
        <thead className="bg-[#0f1512] text-green-400">
          <tr>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left hidden sm:table-cell">
              Provider
            </th>
            <th className="px-4 py-3 text-left">Balance</th>
            <th className="px-4 py-3 text-left hidden md:table-cell">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              className="border-t border-white/5 hover:bg-white/5 transition"
            >
              <td
                className={`px-4 py-3 font-semibold ${
                  tx.type === "DEPOSIT"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {tx.type}
              </td>

              <td className="px-4 py-3">
                ₹ {tx.amount.toLocaleString()}
              </td>

              <td className="px-4 py-3 hidden sm:table-cell">
                {tx.serviceProvider || "ATM"}
              </td>

              <td className="px-4 py-3 text-green-300">
                ₹ {tx.balanceAfter.toLocaleString()}
              </td>

              <td className="px-4 py-3 hidden md:table-cell text-white/60">
                {new Date(tx.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}

          {transactions.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-6 text-center text-white/50"
              >
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
}