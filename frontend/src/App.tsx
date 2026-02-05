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
import CardPage from "./pages/customer/card/CardPage";
import CardApprovals from "./pages/admin/card/CardApprovals";
import MyAccounts from "./pages/customer/MyAccounts";
import AtmPage from "./pages/atm/AtmPage";
import CustomerTransactions from "./pages/customer/CustomerTransactions";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/" element={<CustomerLogin />} />
      <Route path="/atm" element={<AtmPage />} />

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
        path="/admin/card-approval"
        element={
          <VerifyAccess allowedRoles={["ADMIN"]}>
            <DashboardLayout>
              <CardApprovals/>
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
        path="/customer/my-accounts"
        element={
          <VerifyAccess allowedRoles={["CUSTOMER"]}>
            <DashboardLayout>
            <MyAccounts />
            </DashboardLayout>
          </VerifyAccess>
        }
      />
       <Route
        path="/customer/transaction-history"
        element={
          <VerifyAccess allowedRoles={["CUSTOMER"]}>
            <DashboardLayout>
            <CustomerTransactions />
            </DashboardLayout>
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
      <Route
  path="/customer/card"
  element={
    <VerifyAccess allowedRoles={["CUSTOMER"]}>
      <DashboardLayout>
        <CardPage />
      </DashboardLayout>
    </VerifyAccess>
  }
/>

    </Routes>
    
    
  );
}

export default App;
