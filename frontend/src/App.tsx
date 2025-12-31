import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/admin/login" />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 404 Fallback */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
