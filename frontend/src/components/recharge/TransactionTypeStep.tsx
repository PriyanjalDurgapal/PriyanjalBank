import type { TransactionChannel } from "./transaction.types";
import {
  FiSmartphone,
  FiTv,
  FiZap,
  FiDroplet,
  FiRepeat
} from "react-icons/fi";

type Props = {
  onSelect: (type: TransactionChannel) => void;
};

const TYPES = [
  { id: "MOBILE_RECHARGE", title: "Mobile Recharge", icon: FiSmartphone },
  { id: "DTH", title: "DTH", icon: FiTv },
  { id: "ELECTRICITY", title: "Electricity", icon: FiZap },
  { id: "WATER", title: "Water", icon: FiDroplet },
  { id: "TRANSFER", title: "Account Transfer", icon: FiRepeat }
] as const;

export default function TransactionTypeStep({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {TYPES.map(t => {
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="group bg-slate-900 border border-slate-700 rounded-xl p-5
                       hover:border-emerald-400 transition-all text-left"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-lg
                            bg-emerald-500/10 text-emerald-400 mb-3">
              <Icon size={24} />
            </div>
            <p className="text-white text-sm font-medium group-hover:text-emerald-400">
              {t.title}
            </p>
          </button>
        );
      })}
    </div>
  );
}
