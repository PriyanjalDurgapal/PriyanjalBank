type AuthButtonProps = {
  text: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const AuthButton = ({
  text,
  onClick,
  loading = false,
  disabled = false,
}: AuthButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        w-full py-3.5 rounded-lg font-semibold tracking-widest
        text-black
        bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500
        hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-600
        active:scale-[0.97]
        transition-all duration-300
        shadow-[0_10px_40px_rgba(16,185,129,0.45)]
        hover:shadow-[0_15px_50px_rgba(16,185,129,0.65)]
        relative overflow-hidden
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
    >
      <span className="relative z-10">
        {loading ? "Please wait..." : text}
      </span>

      {!loading && (
        <span
          className="
            absolute inset-0
            bg-gradient-to-r from-transparent via-white/30 to-transparent
            translate-x-[-120%] hover:translate-x-[120%]
            transition-transform duration-700
          "
        />
      )}
    </button>
  );
};

export default AuthButton;
