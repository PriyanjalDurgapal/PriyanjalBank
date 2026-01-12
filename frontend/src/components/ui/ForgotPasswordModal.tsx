import { useEffect, useState } from "react";
import api from "../../api/axios";
import Popup from "../ui/Popup";
import ProcessingOverlay from "../ui/ProcessingOverlay";
import { FiX, FiMail, FiLock, FiKey, FiArrowRight } from "react-icons/fi";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [popup, setPopup] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [otpCountdown, setOtpCountdown] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);

  // -----------------------------
  // Reset state helper
  // -----------------------------
  const resetState = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setLoading(false);
    setProcessing(false);
    setPopup(null);
    setOtpCountdown(0);
    setResendCooldown(0);
  };

  // -----------------------------
  // Send OTP
  // -----------------------------
  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProcessing(true);

    try {
      const res = await api.post("/auth/forgot-password", null, { params: { email } });

      setOtpCountdown(res.data.otpExpiry || 300); // default 5 mins
      setResendCooldown(res.data.resendCooldown || 60); // default 60 sec

      setPopup({ message: "OTP sent to your registered email", type: "success" });
      setStep(2);
    } catch (err: any) {
      setPopup({ message: err?.response?.data?.message || "Failed to send OTP", type: "error" });
    } finally {
      setLoading(false);
      setProcessing(false);
    }
  };

  // -----------------------------
  // Reset Password
  // -----------------------------
  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProcessing(true);

    try {
      await api.post("/auth/reset-password", null, { params: { email, otp, newPassword } });
      setPopup({ message: "Password reset successful", type: "success" });

      setTimeout(() => {
        resetState();
        onClose();
      }, 1500);
    } catch (err: any) {
      setPopup({ message: err?.response?.data?.message || "Invalid OTP or password", type: "error" });
    } finally {
      setLoading(false);
      setProcessing(false);
    }
  };

  // -----------------------------
  // OTP Countdown Timer
  // -----------------------------
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => setOtpCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  // -----------------------------
  // Resend Cooldown Timer
  // -----------------------------
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // -----------------------------
  // Password Strength Hint
  // -----------------------------
  const passwordStrengthHint = () => {
    const length = newPassword.length >= 8;
    const upper = /[A-Z]/.test(newPassword);
    const lower = /[a-z]/.test(newPassword);
    const number = /[0-9]/.test(newPassword);
    const special = /[^A-Za-z0-9]/.test(newPassword);

    return (
      <ul className="text-xs text-gray-400 mt-1 space-y-0.5">
        <li className={length ? "text-green-400" : ""}>Minimum 8 characters</li>
        <li className={upper ? "text-green-400" : ""}>1 uppercase letter</li>
        <li className={lower ? "text-green-400" : ""}>1 lowercase letter</li>
        <li className={number ? "text-green-400" : ""}>1 number</li>
        <li className={special ? "text-green-400" : ""}>1 special character</li>
      </ul>
    );
  };

  if (!isOpen) return null;

  
  return (
    <>
      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
        <div className="w-full max-w-md bg-[#0f172a] text-white rounded-xl shadow-2xl p-6 relative animate-slide-up">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => { resetState(); onClose(); }}
            className="absolute top-3 right-4 text-gray-400 hover:text-white"
          >
            <FiX size={22} />
          </button>

          <h2 className="text-2xl font-bold mb-1">Forgot Password</h2>
          <p className="text-sm text-gray-400 mb-6">
            {step === 1
              ? "Enter your registered email to receive OTP"
              : "Enter OTP and set new password"}
          </p>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={sendOtp} className="space-y-4">
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Registered Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#020617] border border-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading || resendCooldown > 0}
                className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
                <FiArrowRight />
              </button>

              {resendCooldown > 0 && <p className="text-xs text-gray-400 mt-1">
                Resend available in {resendCooldown}s
              </p>}
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={resetPassword} className="space-y-4">
              <div className="relative">
                <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#020617] border border-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-[#020617] border border-gray-700 focus:outline-none focus:border-green-500"
                />
              </div>

              {passwordStrengthHint()}

              {otpCountdown > 0 && <p className="text-xs text-gray-400 mt-1">
                OTP expires in {otpCountdown}s
              </p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
                <FiArrowRight />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* PROCESSING OVERLAY */}
      <ProcessingOverlay show={processing} />

      {/* POPUP */}
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </>
  );
};

export default ForgotPasswordModal;
