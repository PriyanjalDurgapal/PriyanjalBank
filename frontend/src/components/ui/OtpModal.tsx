import { useState } from "react";

export default function OtpModal({
  open,
  onSubmit,
  onClose,
}: {
  open: boolean;
  onSubmit: (otp: string) => void;
  onClose: () => void;
}) {
  const [otp, setOtp] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80 space-y-4">
        <h3 className="font-semibold">Enter OTP</h3>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border w-full p-2 rounded"
          placeholder="6-digit OTP"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={() => onSubmit(otp)}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
