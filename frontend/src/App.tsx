import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerLogin from "./pages/customer/Customerlogin";
import CustomerList from "./pages/admin/customers/CustomerList";
import AddCustomer from "./pages/admin/customers/AddCustomer";
import DashboardLayout from "./components/layout/DashboradLayout";
import VerifyAccess from "./auth/VerifyAccess";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerSecurityLogs from "./pages/customer/CustomerSecurityLogs";

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
          <VerifyAccess allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </VerifyAccess>
        }
      />

      <Route
        path="/admin/customers"
        element={
          <VerifyAccess allowedRoles={["ADMIN"]}>
            <DashboardLayout>
              <CustomerList />
            </DashboardLayout>
          </VerifyAccess>
        }
      />


      <Route
        path="/admin/customers/add"
        element={
          <VerifyAccess allowedRoles={["ADMIN"]}>
            <DashboardLayout>
              <AddCustomer />
            </DashboardLayout>
          </VerifyAccess>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <VerifyAccess allowedRoles={["Admin"]}>
            <DashboardLayout>
            <CustomerSecurityLogs />
            </DashboardLayout>
          </VerifyAccess>
          
        }
      />

      {/* =================================Customer paths========================================== */}
   
     <Route
        path="/customer/dashboard"
        element={
          <VerifyAccess allowedRoles={["CUSTOMER"]}>
            <CustomerDashboard />
          </VerifyAccess>
        }
      />
     <Route
        path="/customer/logs"
        element={
          <VerifyAccess allowedRoles={["CUSTOMER"]}>
            <DashboardLayout>
            <CustomerSecurityLogs />
            </DashboardLayout>
          </VerifyAccess>
          
        }
      />
    </Routes>
    
  );
}

export default App;
