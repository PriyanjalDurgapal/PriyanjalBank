import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Smartphone, DollarSign, X } from "lucide-react";

import PinStep from "../../components/atm/PinStep";
import OtpStep from "../../components/atm/OtpStep";
import TransactionStep from "../../components/atm/TransactionStep";
import Popup from "../../components/ui/Popup";
import ThankYouModal from "../../components/atm/hankYouModal";

import {
  verifyPin,
  sendOtp,
  verifyOtp,
  transact,
} from "../../api/cutomersapi/atmApi";

type PopupType = {
  type: "success" | "error";
  message: string;
};

export default function AtmPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [accountNumber, setAccountNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<PopupType | null>(null);

  const [showThankYou, setShowThankYou] = useState(false);
  const [lastTxType, setLastTxType] =
    useState<"DEPOSIT" | "WITHDRAW" | null>(null);
  const [lastAmount, setLastAmount] = useState(0);

  const handleError = (err: any) => {
    setPopup({
      type: "error",
      message:
        err?.response?.data?.message ||
        err?.response?.data ||
        "Something went wrong",
    });
    setLoading(false);
  };

  const handlePinVerify = async (account: string, pin: string) => {
    try {
      setLoading(true);
      await verifyPin(account, pin);
      setAccountNumber(account);
      await sendOtp(account);
      setStep(2);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (enteredOtp: string) => {
    try {
      setLoading(true);
      await verifyOtp(accountNumber, enteredOtp);
      setOtp(enteredOtp);
      setStep(3);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTransaction = async (
    type: "DEPOSIT" | "WITHDRAW",
    amount: number
  ) => {
    try {
      setLoading(true);
      await transact(accountNumber, otp, type, amount);
      setLastTxType(type);
      setLastAmount(amount);
      setShowThankYou(true);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-3 sm:px-6">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md sm:max-w-lg rounded-2xl
                   bg-[#0b0f0d] border border-white/10 shadow-2xl"
      >
        {/* Close */}
        <button className="absolute top-4 right-4 text-white/40 hover:text-white">
          <X size={18} />
        </button>

        {/* Stepper */}
        <div className="flex justify-between px-4 sm:px-6 pt-6">
          {[
            { label: "Verify PIN", icon: Lock, s: 1 },
            { label: "OTP", icon: Smartphone, s: 2 },
            { label: "Transaction", icon: DollarSign, s: 3 },
          ].map(({ label, icon: Icon, s }) => {
            const active = step === s;
            const done = step > s;

            return (
              <div key={label} className="flex-1 text-center">
                <div
                  className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center
                    ${
                      done || active
                        ? "bg-green-500 text-black"
                        : "border border-white/30 text-white/40"
                    }`}
                >
                  {done ? "✓" : <Icon size={16} />}
                </div>
                <p
                  className={`mt-2 text-[11px] sm:text-xs ${
                    active || done
                      ? "text-green-400"
                      : "text-white/40"
                  }`}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="px-4 sm:px-6 py-6 text-white">
          {popup && (
            <Popup
              type={popup.type}
              message={popup.message}
              onClose={() => setPopup(null)}
            />
          )}

          {loading && (
            <div className="py-10 text-center">
              <div className="mx-auto w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-green-400 text-sm">
                Processing...
              </p>
            </div>
          )}

          {!loading && (
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="pin"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <PinStep onSubmit={handlePinVerify} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <OtpStep onSubmit={handleOtpSubmit} />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="tx"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <TransactionStep onSubmit={handleTransaction} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      <ThankYouModal
        open={showThankYou}
        type={lastTxType!}
        amount={lastAmount}
        onClose={() => {
          setShowThankYou(false);
          setStep(1); 
        }}
      />
    </div>
  );
}