import { FiMenu } from "react-icons/fi";
import { useAuth } from "../../auth/AuthContext";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const { role, logout } = useAuth();

  return (
    <header className="h-16 bg-[#0f172a]/90 backdrop-blur-md border-b border-[#15803d]/30 flex items-center justify-between px-4 md:px-8 shadow-lg">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-2xl text-[#22c55e] hover:text-white transition"
          aria-label="Open menu"
        >
          <FiMenu />
        </button>

        <h1 className="text-[#22c55e] text-2xl font-extrabold tracking-wider">
          PD Bank
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-sm text-[#d1d5db] hidden sm:block">
          Role: <span className="text-[#22c55e] font-bold">{role}</span>
        </span>

        <button
          onClick={logout}
          className="bg-[#15803d] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#22c55e] transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;