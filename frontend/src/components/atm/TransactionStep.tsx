import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function TransactionStep({ onSubmit }: any) {
  const [type, setType] =
    useState<"DEPOSIT" | "WITHDRAW">("DEPOSIT");
  const [amount, setAmount] = useState(0);

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-center">
        Make a Transaction
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setType("DEPOSIT")}
          className={`p-4 rounded-xl border text-center ${
            type === "DEPOSIT"
              ? "border-green-500 bg-green-500/10"
              : "border-white/10"
          }`}
        >
          <ArrowDownCircle className="mx-auto mb-2 text-green-500" />
          Deposit
        </button>

        <button
          onClick={() => setType("WITHDRAW")}
          className={`p-4 rounded-xl border text-center ${
            type === "WITHDRAW"
              ? "border-green-500 bg-green-500/10"
              : "border-white/10"
          }`}
        >
          <ArrowUpCircle className="mx-auto mb-2 text-green-500" />
          Withdraw
        </button>
      </div>

      <input
        type="number"
        min={1}
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        className="w-full bg-[#1a1f1c] border border-white/10 rounded-lg px-4 py-3 focus:border-green-500 outline-none"
      />

      <button
        onClick={() => onSubmit(type, amount)}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 rounded-lg"
      >
        Complete Transaction
      </button>
    </div>
  );
}
