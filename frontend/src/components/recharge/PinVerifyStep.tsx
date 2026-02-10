import Input from "../ui/Input";
import Button from "../ui/Button";

type Props = {
  pin: string;
  setPin: (v: string) => void;
  onVerify: () => void;
};

export default function PinVerifyStep({ pin, setPin, onVerify }: Props) {
  return (
    <div className="max-w-sm mx-auto bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-4">
      <Input
        label="Transaction PIN"
        type="password"
        value={pin}
        maxLength={6}
        onChange={e => setPin(e.target.value)}
      />

      <Button
        label="Verify PIN"
        disabled={pin.length !== 6}
        onClick={onVerify}
      />
    </div>
  );
}
