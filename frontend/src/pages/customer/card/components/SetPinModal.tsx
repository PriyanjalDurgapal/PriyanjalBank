import { useState } from "react";
import * as cardService from "../../../../api/cardService";
import Popup from "../../../../components/ui/Popup";

const SetPinModal = ({ onClose, onSuccess }: any) => {
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const sendOtp = async () => {
    try {
      await cardService.requestPinOtp();
      setOtpSent(true);
      setPopup({ message: "OTP sent to your email", type: "success" });
    } catch {
      setPopup({ message: "Failed to send OTP", type: "error" });
    }
  };

  const submitPin = async () => {
    if (pin.length !== 6) {
      setPopup({ message: "PIN must be 6 digits", type: "error" });
      return;
    }

    if (!otp) {
      setPopup({ message: "Please enter OTP", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await cardService.setCardPin(otp, pin);
      setPopup({ message: "PIN set successfully", type: "success" });
      onSuccess?.();
      onClose?.();
    } catch {
      setPopup({ message: "Failed to set PIN", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
        <div className="w-full max-w-sm rounded-2xl bg-gray-900 text-white shadow-xl">
          {/* Header */}
          <div className="border-b border-gray-800 px-6 py-4">
            <h2 className="text-lg font-semibold">Set Transaction PIN</h2>
            <p className="text-sm text-gray-400">
              Secure your card with a 6-digit PIN
            </p>
          </div>

          {/* Body */}
          <div className="space-y-4 px-6 py-5">
            {!otpSent && (
              <button
                onClick={sendOtp}
                className="w-full rounded-lg bg-blue-600 py-2.5 font-medium transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Send OTP
              </button>
            )}

            {otpSent && (
              <>
                <div>
                  <label className="mb-1 block text-sm text-gray-300">
                    OTP
                  </label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-300">
                    6-Digit PIN
                  </label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••••"
                    maxLength={6}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <button
                  onClick={submitPin}
                  disabled={loading}
                  className="w-full rounded-lg bg-green-600 py-2.5 font-medium transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Setting PIN..." : "Set PIN"}
                </button>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 px-6 py-4">
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-gray-700 py-2.5 text-sm font-medium transition hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
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

export default SetPinModal;
