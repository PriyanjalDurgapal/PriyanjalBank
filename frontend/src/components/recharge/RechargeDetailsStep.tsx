import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RechargeDetailsStep({
  provider,
  setProvider,
  reference,
  setReference,
  amount,
  setAmount,
  onSubmit
}: any) {
  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-5">
      <Input
        label="Service Provider"
        value={provider}
        onChange={e => setProvider(e.target.value)}
      />

      <Input
        label="Mobile / Consumer No"
        value={reference}
        onChange={e => setReference(e.target.value)}
      />

      <Input
        label="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <Button label="Pay Now" onClick={onSubmit} />
    </div>
  );
}
