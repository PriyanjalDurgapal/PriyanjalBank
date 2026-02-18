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
import RechargePage from "./pages/customer/RechargePage";
import AllAccounts from "./pages/admin/customers/AllAccounts";
import ChangePassword from "./components/layout/Changepassowrd";
import AddStaff from "./pages/admin/staff/AddStaff";
import ViewStaff from "./pages/admin/staff/ViewStaff";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffDashboard from "./pages/staff/StaffDashboard";

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
        path="/allcustomers"
        element={
          <VerifyAccess allowedRoles={["ADMIN","STAFF"]}>
            <DashboardLayout>
              <CustomerList />
            </DashboardLayout>
          </VerifyAccess>
        }
      />
      <Route
        path="/admin/all-staff"
        element={
          <VerifyAccess allowedRoles={["ADMIN"]}>
            <DashboardLayout>
              <ViewStaff />
            </DashboardLayout>
          </VerifyAccess>
        }
      />
      <Route
        path="/admin/card-approval"
        element={
          <VerifyAccess allowedRoles={["ADMIN"]}>
            <DashboardLayout>
              <CardApprovals />
            </DashboardLayout>
          </VerifyAccess>
        }
      />


      <Route
        path="/customers/add"
        element={
          <VerifyAccess allowedRoles={["ADMIN","STAFF"]}>
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
      <Route
        path="/admin/addstaff"
        element={
          <VerifyAccess allowedRoles={["Admin"]}>
            <DashboardLayout>
              <AddStaff />
            </DashboardLayout>
          </VerifyAccess>

        }
      />
      <Route
        path="/all-accounts"
        element={
          <VerifyAccess allowedRoles={["Admin"]}>
            <DashboardLayout>
              <AllAccounts />
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
        path="/customer/change-password"
        element={
          <VerifyAccess allowedRoles={["CUSTOMER"]}>
            <DashboardLayout>
              <ChangePassword />
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
        path="/customer/recharge"
        element={
          <VerifyAccess allowedRoles={["CUSTOMER"]}>
            <DashboardLayout>
              <RechargePage />
            </DashboardLayout>
          </VerifyAccess>
        }
      />
      <Route
        path="/my/logs"
        element={
          <VerifyAccess allowedRoles={["CUSTOMER","STAFF"]}>
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


      {/* ============================staff================================================================== */}
      <Route
        path="/staff/login"
        element={

          <StaffLogin />

        } />

      <Route
        path="/staff/dashboard"
        element={
          <VerifyAccess allowedRoles={["STAFF"]}>
            <DashboardLayout>
              <StaffDashboard />
            </DashboardLayout>
          </VerifyAccess>
        }
      />

    </Routes>


  );
}

export default App;
