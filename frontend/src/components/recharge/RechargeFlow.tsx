import { useEffect, useState } from "react";
import { getMyAccounts } from "../../api/cutomersapi/CustomerAccount";
import { verifyPin, createTransaction } from "../../api/cutomersapi/transaction.api";

import type { Account } from "./account.types";
import type { TransactionChannel } from "./transaction.types";

import TransactionTypeStep from "./TransactionTypeStep";
import AccountSelectStep from "./AccountSelectStep";
import PinVerifyStep from "./PinVerifyStep";
import RechargeDetailsStep from "./RechargeDetailsStep";
import TransactionSuccess from "./TransactionSuccess";

import BackButton from "../ui/BackButton";
import StepIndicator from "../ui//StepIndicator";

import Popup from "../ui/Popup";
import ProcessingOverlay from "../ui/ProcessingOverlay";

export default function RechargeFlow() {
  const [step, setStep] = useState(1);

  const [type, setType] = useState<TransactionChannel | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [account, setAccount] = useState<Account | null>(null);

  const [pin, setPin] = useState("");
  const [provider, setProvider] = useState("");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<any>(null);

  useEffect(() => {
    getMyAccounts()
      .then(res => setAccounts(res.data))
      .catch(() =>
        setPopup({ message: "Failed to load accounts", type: "error" })
      );
  }, []);

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);

      await verifyPin(account!.accountNumber, pin);

      await createTransaction({
        accountNumber: account!.accountNumber,
        pin: pin,
        amount: Number(amount),
        channel: type!,
        serviceProvider: provider,
        reference,
        type: "WITHDRAW"
      });

      setStep(5);
    } catch (err: any) {
      setPopup({
        message: err?.response?.data?.message || "Transaction failed",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProcessingOverlay show={loading} />
      {popup && <Popup {...popup} onClose={() => setPopup(null)} />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {step > 1 && step < 5 && (
          <BackButton onBack={() => setStep(step - 1)} />
        )}

        <StepIndicator step={step} />

        {step === 1 && (
          <TransactionTypeStep
            onSelect={(t) => {
              setType(t);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <RechargeDetailsStep
            provider={provider}
            setProvider={setProvider}
            reference={reference}
            setReference={setReference}
            amount={amount}
            setAmount={setAmount}
            onSubmit={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <AccountSelectStep
            accounts={accounts}
            selected={account}
            onSelect={setAccount}
            onNext={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <PinVerifyStep
            pin={pin}
            setPin={setPin}
            onVerify={handleFinalSubmit}
          />
        )}

        {step === 5 && <TransactionSuccess />}
      </div>
    </>
  );
}
