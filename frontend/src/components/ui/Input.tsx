interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm text-slate-400">{label}</label>
      )}
      <input
        {...props}
        className="
          w-full px-4 py-2 rounded-lg
          bg-slate-800 border border-slate-700
          text-white outline-none
          focus:border-indigo-500
        "
      />
    </div>
  );
}