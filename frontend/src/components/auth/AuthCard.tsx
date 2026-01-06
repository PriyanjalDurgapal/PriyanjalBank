type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-emerald-950 to-neutral-950 px-4">
      <div className="w-full max-w-md sm:max-w-lg backdrop-blur-2xl bg-white/5 border border-emerald-500/20 rounded-2xl shadow-[0_25px_60px_-15px_rgba(16,185,129,0.25)] p-6 sm:p-10">

        <div className="text-center mb-10">
          <div className="mx-auto mb-5 h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.55)]">
            <svg
              className="h-8 w-8 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
              <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
            </svg>
          </div>

          <h2 className="text-3xl font-semibold tracking-wide text-emerald-400">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm text-emerald-200/70 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthCard;
