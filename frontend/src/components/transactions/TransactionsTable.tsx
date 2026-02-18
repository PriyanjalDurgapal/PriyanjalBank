import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineArrowUpRight,
  HiOutlineArrowDownLeft,
} from "react-icons/hi2";
import {
  FiList,
  FiArrowUpCircle,
  FiArrowDownCircle,
} from "react-icons/fi";
import FilterButton from "../ui/FilterButton";

type Transaction = {
  id: number;
  type: "DEPOSIT" | "WITHDRAW";
  amount: number;
  balanceAfter: number;
  serviceProvider: string;
  createdAt: string;
};

type Props = {
  transactions: Transaction[];
  limit?: number;
};

export default function TransactionsTable({ transactions, limit }: Props) {
  const [filter, setFilter] = useState<"ALL" | "DEPOSIT" | "WITHDRAW">("ALL");

  const filtered = transactions.filter((tx) => {
    if (filter === "ALL") return true;
    return tx.type === filter;
  });

  const data = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="w-full">
      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
        <FilterButton
          active={filter === "ALL"}
          icon={<FiList />}
          label="ALL"
          onClick={() => setFilter("ALL")}
        />
        <FilterButton
          active={filter === "DEPOSIT"}
          
          icon={<FiArrowDownCircle />}
          label="DEPOSIT"
          onClick={() => setFilter("DEPOSIT")}
        />
        <FilterButton
          active={filter === "WITHDRAW"}
        icon={<FiArrowUpCircle />}
          label="WITHDRAW"
          onClick={() => setFilter("WITHDRAW")}
        />
      </div>

      {/* TABLE / CARD CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1220] to-[#060b14] overflow-hidden"
      >
        {/* ===== DESKTOP & TABLET TABLE ===== */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-white">
            <thead className="text-green-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Provider</th>
                <th className="px-6 py-4 text-left">Balance</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td
                    className={`px-6 py-4 font-semibold flex items-center gap-2 ${
                      tx.type === "DEPOSIT"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {tx.type === "DEPOSIT" ? (
                      <HiOutlineArrowDownLeft size={18} />
                    ) : (
                      <HiOutlineArrowUpRight size={18} />
                    )}
                    {tx.type}
                  </td>

                  <td className="px-6 py-4">
                    ₹ {tx.amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-white/60">
                    {tx.serviceProvider}
                  </td>

                  <td className="px-6 py-4">
                    ₹ {tx.balanceAfter.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-white/50">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-white/50"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===== MOBILE CARD VIEW ===== */}
        <div className="md:hidden divide-y divide-white/10">
          {data.map((tx) => (
            <div key={tx.id} className="p-4 space-y-2">
              <div
                className={`flex items-center gap-2 font-semibold ${
                  tx.type === "DEPOSIT"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {tx.type === "DEPOSIT" ? (
                  <HiOutlineArrowDownLeft size={18} />
                ) : (
                  <HiOutlineArrowDownLeft size={18} />
                )}
                {tx.type}
              </div>

              <div className="text-sm">
                <span className="text-white/50">Amount:</span>{" "}
                ₹ {tx.amount.toLocaleString()}
              </div>

              <div className="text-sm text-white/60">
                <span className="text-white/50">Provider:</span>{" "}
                {tx.serviceProvider}
              </div>

              <div className="text-sm">
                <span className="text-white/50">Balance:</span>{" "}
                ₹ {tx.balanceAfter.toLocaleString()}
              </div>

              <div className="text-xs text-white/50">
                {new Date(tx.createdAt).toLocaleString()}
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <div className="px-6 py-10 text-center text-white/50">
              No transactions found
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}