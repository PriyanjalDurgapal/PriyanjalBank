import { useState } from "react";
import { adminLogin } from "../../api/adminAuth";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import Popup from "../../components/ui/Popup";
import ForgotPasswordModal from "../../components/ui/ForgotPasswordModal";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [open,setOpen]=useState(false);

  const handleLogin = async () => {
    try {
      const res = await adminLogin({ email, password });
      login(res.data.token, res.data.role);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setPopup({
        message: err.response?.data?.message || "Login failed",
        type: "error",
      });
    }
  };

  return (
    <>
    <AuthCard
      title="Admin Login"
      subtitle="Secure administrative access"
    >
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}

      <AuthInput
        type="email"
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthInput
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="mb-8"
      />
       <div className="text-right mb-6">
      <button type="button" onClick={()=> setOpen(true)} className="text-sm text-green-600 hover:underline"> Forgot Password?</button>
    </div>

      <AuthButton text="LOGIN" onClick={handleLogin} />
    </AuthCard>
    <ForgotPasswordModal isOpen={open} onClose={()=>setOpen(false)}/>

   
    </>
  );
  
};

export default AdminLogin;
