import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import {
  FiX,
  FiChevronDown,
  FiShield,
  FiLock,
  FiFileText,
  FiHelpCircle,
  FiUsers,
  FiUserPlus,
  FiHome,
  FiCreditCard,
  FiList,
  FiRepeat,
  FiBookOpen,
} from "react-icons/fi";
import { useState } from "react";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { role } = useAuth();
  const location = useLocation();

  const [customerOpen, setCustomerOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#020617] border-r border-gray-800
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={onClose} className="text-2xl text-[#22c55e]">
            <FiX />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {(role === "ADMIN" ) && (
              <SidebarItem
                to="/admin/dashboard"
                label="Dashboard"
                icon={<FiHome />}
                active={isActive("/admin/dashboard")}
              />
            )}
            {(role ==="STAFF" ) && (
              <SidebarItem
                to="/staff/dashboard"
                label="Dashboard"
                icon={<FiHome />}
                active={isActive("/staff/dashboard")}
              />
            )}

            {(role === "ADMIN" || role === "STAFF") && (
              <li>
                <button
                  onClick={() => setCustomerOpen(!customerOpen)}
                  className="w-full flex items-center justify-between px-6 py-3 rounded-lg text-gray-100 hover:bg-[#22c55e]/20 transition"
                >
                  <span className="flex items-center gap-3 font-medium">
                    <FiUsers />
                    Customers
                  </span>
                  <FiChevronDown
                    className={`transition-transform ${
                      customerOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {customerOpen && (
                  <ul className="ml-4 mt-2 space-y-1 animate-slide-in">
                    <DropdownItem
                      to="/allcustomers"
                      label="All Customers"
                      icon={<FiUsers />}
                      active={isActive("/allcustomers")}
                    />
                    <DropdownItem
                      to="/customers/add"
                      label="Add New Customer"
                      icon={<FiUserPlus />}
                      active={isActive("/customers/add")}
                    />
                  </ul>
                )}
              </li>
            )}

            {(role === "ADMIN" || role === "STAFF") && (
  <SidebarItem
    to="/all-accounts"
    label="Accounts"
    icon={<FiBookOpen />}
    active={isActive("/all-accounts")}
  />
)}
            
            {role === "ADMIN" && (
              <SidebarItem
                to="/admin/addstaff"
                label="Add Staff"
                icon={<FiBookOpen />}
                active={isActive("/admin/addstaff")}
              />
            )}
            {role === "ADMIN" && (
              <SidebarItem
                to="/admin/all-staff"
                label="see Staff"
                icon={<FiBookOpen />}
                active={isActive("/admin/all-staff")}
              />
            )}

            {role === "ADMIN" && (
              <SidebarItem
                to="/admin/logs"
                label="My Logs"
                icon={<FiFileText />}
                active={isActive("/admin/logs")}
              />
            )}

            {role === "ADMIN" && (
              <SidebarItem
                to="/admin/card-approval"
                label="Card Approval"
                icon={<FiCreditCard />}
                active={isActive("/admin/card-approval")}
              />
            )}

            {role === "EMPLOYEE" && (
              <SidebarItem
                to="/admin/transactions"
                label="Transactions"
                icon={<FiRepeat />}
                active={isActive("/admin/transactions")}
              />
            )}

            {role === "CUSTOMER" && (
              <SidebarItem
                to="/customer/dashboard"
                label="Dashboard"
                icon={<FiHome />}
                active={isActive("/customer/dashboard")}
              />
            )}

            {role === "CUSTOMER" && (
              <SidebarItem
                to="/customer/my-accounts"
                label="My Accounts"
                icon={<FiBookOpen />}
                active={isActive("/customer/my-accounts")}
              />
            )}

            {role === "CUSTOMER" && (
              <SidebarItem
                to="/customer/recharge"
                label="Recharge"
                icon={<FiCreditCard />}
                active={isActive("/customer/recharge")}
              />
            )}

            {role === "CUSTOMER" && (
              <SidebarItem
                to="/customer/transaction-history"
                label="Transactions"
                icon={<FiList />}
                active={isActive("/customer/transaction-history")}
              />
            )}

            {role === "CUSTOMER" && (
              <SidebarItem
                to="/customer/card"
                label="My Cards"
                icon={<FiCreditCard />}
                active={isActive("/customer/cards")}
              />
            )}

            {role === "CUSTOMER"|| role === "STAFF" && (
              <li>
                <button
                  onClick={() => setSecurityOpen(!securityOpen)}
                  className="w-full flex items-center justify-between px-6 py-3 rounded-lg text-gray-100 hover:bg-[#22c55e]/20 transition"
                >
                  <span className="flex items-center gap-3 font-medium">
                    <FiShield />
                    Security
                  </span>
                  <FiChevronDown
                    className={`transition-transform ${
                      securityOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {securityOpen && (
                  <ul className="ml-8 mt-2 space-y-1 animate-slide-in">
                    <DropdownItem
                      to="/customer/change-password"
                      label="Change password"
                      icon={<FiLock />}
                      active={isActive("/customer/security")}
                    />
                    <DropdownItem
                      to="/my/logs"
                      label="My Logs"
                      icon={<FiFileText />}
                      active={isActive("/my/logs")}
                    />
                    <DropdownItem
                      to="/customer/support"
                      label="Support"
                      icon={<FiHelpCircle />}
                      active={isActive("/customer/support")}
                    />
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

/* ---------- REUSABLE ITEMS ---------- */

const SidebarItem = ({
  to,
  label,
  active,
  icon,
}: {
  to: string;
  label: string;
  active: boolean;
  icon?: React.ReactNode;
}) => (
  <li>
    <Link
      to={to}
      className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition
        ${
          active
            ? "bg-[#22c55e] text-black shadow-lg"
            : "text-gray-100 hover:bg-[#22c55e]/20 hover:text-[#22c55e]"
        }`}
    >
      {icon}
      {label}
    </Link>
  </li>
);

const DropdownItem = ({
  to,
  label,
  active,
  icon,
}: {
  to: string;
  label: string;
  active: boolean;
  icon?: React.ReactNode;
}) => (
  <li>
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
        ${
          active
            ? "bg-[#22c55e]/30 text-[#22c55e]"
            : "text-gray-300 hover:bg-[#22c55e]/10 hover:text-[#22c55e]"
        }`}
    >
      {icon}
      {label}
    </Link>
  </li>
);

export default Sidebar;
