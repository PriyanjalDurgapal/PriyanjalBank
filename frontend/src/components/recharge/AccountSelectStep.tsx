import type { Account } from "./account.types";
import Button from "../ui/Button";

type Props = {
  accounts: Account[];
  selected: Account | null;
  onSelect: (acc: Account) => void;
  onNext: () => void;
};

export default function AccountSelectStep({
  accounts,
  selected,
  onSelect,
  onNext
}: Props) {
  return (
    <div className="max-w-xl mx-auto space-y-4">
      {accounts.map(acc => (
        <div
          key={acc.id}
          onClick={() => onSelect(acc)}
          className={`p-4 rounded-xl border cursor-pointer transition-all
            ${
              selected?.id === acc.id
                ? "border-emerald-400 bg-emerald-500/5"
                : "border-slate-700 hover:border-slate-500"
            }`}
        >
          <p className="text-white font-medium">{acc.type}</p>
          <p className="text-slate-400 text-sm">{acc.accountNumber}</p>
        </div>
      ))}

      <Button label="Continue" disabled={!selected} onClick={onNext} />
    </div>
  );
}
