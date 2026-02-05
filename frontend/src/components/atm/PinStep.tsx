import { useState } from "react";
import { Lock } from "lucide-react";

export default function PinStep({ onSubmit }: any) {
  const [account, setAccount] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div className="space-y-5">
      <div className="flex justify-center text-green-500">
        <Lock size={36} />
      </div>

      <h2 className="text-xl font-semibold text-center">
        Verify Your PIN
      </h2>

      <input
        className="w-full bg-[#1a1f1c] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-green-500 outline-none"
        placeholder="Enter account number"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />

      <input
        type="password"
        className="w-full bg-[#1a1f1c] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-green-500 outline-none"
        placeholder="Enter PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />

      <button
        onClick={() => onSubmit(account, pin)}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 rounded-lg"
      >
        Continue
      </button>
    </div>
  );
}
