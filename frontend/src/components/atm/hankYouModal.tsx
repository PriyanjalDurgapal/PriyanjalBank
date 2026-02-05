type Props = {
  open: boolean;
  type: "DEPOSIT" | "WITHDRAW";
  amount: number;
  onClose: () => void;
};

export default function ThankYouModal({
  open,
  type,
  amount,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center text-white">
        <div className="text-green-500 text-4xl mb-3">✓</div>

        <h2 className="text-xl font-bold mb-1">
          Transaction Successful
        </h2>
        <p className="text-sm text-white/60 mb-4">
          Thank you for banking with us
        </p>

        <div className="bg-black rounded-lg p-4 text-sm mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-white/50">Type</span>
            <span>{type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Amount</span>
            <span>₹ {amount}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg"
        >
          Done
        </button>
      </div>
    </div>
  );
}
