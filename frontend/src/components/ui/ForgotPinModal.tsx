import { useState } from "react";
import api from "../../api/axios";
export default function ForgotPinModal({ onClose }: any) {
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");

  const requestOtp = async () => {
    await api.post("/api/customer/card/pin/forgot/request-otp");
    alert("OTP sent to email");
  };

  const resetPin = async () => {
    await api.post(
      `/api/customer/card/pin/forgot/reset?otp=${otp}&newPin=${pin}`
    );
    alert("PIN reset successful");
    onClose();
  };

  return (
    <div className="modal">
      <button onClick={requestOtp}>Send OTP</button>

      <input placeholder="OTP" onChange={e => setOtp(e.target.value)} />
      <input placeholder="New PIN" onChange={e => setPin(e.target.value)} />

      <button onClick={resetPin}>Reset PIN</button>
    </div>
  );
}
