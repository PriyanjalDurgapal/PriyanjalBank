import { FiArrowLeft } from "react-icons/fi";

type Props = {
  onBack: () => void;
};

export default function BackButton({ onBack }: Props) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-emerald-400 mb-4
                 hover:gap-3 transition-all duration-200"
    >
      <FiArrowLeft size={18} />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
}
