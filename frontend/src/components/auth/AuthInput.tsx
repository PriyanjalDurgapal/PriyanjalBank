type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const AuthInput = ({ className = "", ...props }: AuthInputProps) => {
  return (
    <input
      {...props}
      className={`
        w-full mb-4 px-4 py-3.5 rounded-lg
        bg-black/40 text-emerald-100
        placeholder-emerald-200/40
        border border-emerald-500/30
        focus:outline-none focus:ring-2 focus:ring-emerald-400/50
        transition
        ${className}
      `}
    />
  );
};

export default AuthInput;
