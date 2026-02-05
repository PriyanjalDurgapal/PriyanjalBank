import { useRef, useState } from "react";
import { Smartphone } from "lucide-react";

export default function OtpStep({ onSubmit }: any) {
  const [otp, setOtp] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) setOtp(value);
  };

  return (
    <div
      className="space-y-5 text-center cursor-pointer"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex justify-center text-green-500">
        <Smartphone size={36} />
      </div>

      <h2 className="text-xl font-semibold">OTP Verification</h2>

      {/* OTP BOXES */}
      <div className="flex justify-center gap-2">
        {[...Array(6)].map((_, i) => {
          const active = i === otp.length;
          return (
            <div
              key={i}
              className={`w-10 h-12 rounded-lg flex items-center justify-center text-lg
                ${
                  active
                    ? "border border-green-500"
                    : "border border-white/10"
                }
                bg-[#1a1f1c]
              `}
            >
              {otp[i] || ""}
            </div>
          );
        })}
      </div>

      {/* REAL INPUT (INVISIBLE BUT FOCUSABLE) */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoFocus
        maxLength={6}
        value={otp}
        onChange={handleChange}
        className="absolute opacity-0 pointer-events-none"
      />

      <button
        onClick={() => onSubmit(otp)}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 rounded-lg"
      >
        Verify OTP
      </button>
    </div>
  );
}
