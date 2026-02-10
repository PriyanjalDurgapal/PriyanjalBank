type Props = {
  step: number;
  total?: number;
};

export default function StepIndicator({ step, total = 5 }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => {
        const active = step === i + 1;
        const completed = step > i + 1;

        return (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300
              ${
                active
                  ? "w-8 bg-emerald-400"
                  : completed
                  ? "w-6 bg-emerald-600"
                  : "w-6 bg-slate-700"
              }`}
          />
        );
      })}
    </div>
  );
}
