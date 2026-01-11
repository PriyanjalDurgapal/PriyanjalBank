import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

// NEW PAGES
import CustomerList from "./pages/admin/customers/CustomerList";
import AddCustomer from "./pages/admin/customers/AddCustomer";
import DashboardLayout from "./components/layout/DashboradLayout";
import CustomerLogin from "./pages/customer/Customerlogin";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/" element={<CustomerLogin />} />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* CUSTOMER LIST */}
      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute>
               <DashboardLayout>
            <CustomerList />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ADD NEW CUSTOMER */}
      <Route
        path="/admin/customers/add"
        element={
          <ProtectedRoute>
            <DashboardLayout>
            <AddCustomer />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
