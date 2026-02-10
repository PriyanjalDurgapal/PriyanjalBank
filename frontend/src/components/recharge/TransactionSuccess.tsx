import { FiCheckCircle } from "react-icons/fi";

export default function TransactionSuccess() {
  return (
    <div className="flex flex-col items-center justify-center text-center
                    bg-slate-900 border border-slate-700 rounded-xl
                    max-w-md mx-auto p-8 space-y-4">
      <FiCheckCircle size={48} className="text-emerald-400" />
      <h2 className="text-xl font-semibold text-white">
        Transaction Successful
      </h2>
      <p className="text-slate-400 text-sm">
        Your recharge has been completed successfully.
      </p>
    </div>
  );
}
