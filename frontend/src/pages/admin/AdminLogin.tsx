import { useState } from "react";
import { adminLogin } from "../../api/adminAuth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await adminLogin({ email, password });
      alert(res.data);
    } catch (err: any) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
