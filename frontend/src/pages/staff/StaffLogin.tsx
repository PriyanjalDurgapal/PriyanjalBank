import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "../../components/ui/Slider";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import Popup from "../../components/ui/Popup";

import { staffLogin } from "../../api/staffapi/staffAuth";
import { useAuth } from "../../auth/AuthContext";

export default function StaffLogin() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const slides = [
    {
      image: "/images.jpeg",
      title: "Staff Portal Access",
      subtitle: "Secure login for authorized personnel",
    },
    {
      image: "/stars.jpg",
      title: "Banking Management",
      subtitle: "Manage operations efficiently and securely",
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!staffId || !password) {
      setPopup({
        message: "Please enter Staff ID and Password",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await staffLogin({ staffId, password });

      // Store token + role in your AuthContext
      login(res.token, res.role);

      setPopup({
        message: "Login successful",
        type: "success",
      });

      // Navigate to dashboard
      setTimeout(() => {
        navigate("/staff/dashboard");
      }, 800);

    } catch (err: any) {
      setPopup({
        message:
          err?.response?.data?.message || "Invalid credentials",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6">
      <div className="w-full max-w-6xl bg-[#1f3d25] rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.6)] p-2">
        <div className="flex flex-col md:flex-row bg-[#0f1511] rounded-2xl overflow-hidden shadow-2xl">

          {/* Left Slider */}
          <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-[90vh]">
            <Slider slides={slides} />
          </div>

          {/* Right Login Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-14 text-white flex items-center justify-center">
            <div className="w-full max-w-md bg-[#1a211b] p-6 sm:p-10 rounded-xl shadow-xl shadow-black/40">

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Staff Login
              </h1>

              <p className="mb-6 text-xs sm:text-sm opacity-80">
                Please sign in to continue.
              </p>

              <form
                onSubmit={handleLogin}
                className="space-y-4 sm:space-y-5"
              >
                <AuthInput
                  placeholder="Staff ID"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                />

                <AuthInput
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <AuthButton
                  text={loading ? "Logging in..." : "Login"}
                  loading={loading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}