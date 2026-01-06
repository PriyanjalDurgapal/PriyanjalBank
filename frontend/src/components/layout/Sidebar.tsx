import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { FiX, FiChevronDown } from "react-icons/fi";
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
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
        {/* Close (mobile) */}
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={onClose}
            className="text-2xl text-[#22c55e]"
          >
            <FiX />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">

            {/* DASHBOARD */}
            {(role === "ADMIN" || role === "BANKER") && (
              <SidebarItem
                to="/admin/dashboard"
                label="Dashboard"
                active={isActive("/admin/dashboard")}
              />
            )}

            {/* CUSTOMERS DROPDOWN */}
            {(role === "ADMIN" || role === "BANKER") && (
              <li>
                <button
                  onClick={() => setCustomerOpen(!customerOpen)}
                  className="w-full flex items-center justify-between px-6 py-3 rounded-lg text-gray-100 hover:bg-[#22c55e]/20 transition"
                >
                  <span className="font-medium">Customers</span>
                  <FiChevronDown
                    className={`transition-transform ${customerOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {customerOpen && (
                  <ul className="ml-4 mt-2 space-y-1 animate-slide-in">
                    <DropdownItem
                      to="/admin/customers"
                      label="All Customers"
                      active={isActive("/admin/customers")}
                    />
                    <DropdownItem
                      to="/admin/customers/add"
                      label="Add New Customer"
                      active={isActive("/admin/customers/add")}
                    />
                  </ul>
                )}
              </li>
            )}

            {/* ACCOUNTS */}
            {role === "ADMIN" && (
              <SidebarItem
                to="/admin/accounts"
                label="Accounts"
                active={isActive("/admin/accounts")}
              />
            )}

            {/* TRANSACTIONS */}
            {role === "ADMIN" && (
              <SidebarItem
                to="/admin/transactions"
                label="Transactions"
                active={isActive("/admin/transactions")}
              />
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
}: {
  to: string;
  label: string;
  active: boolean;
}) => (
  <li>
    <Link
      to={to}
      className={`block px-6 py-3 rounded-lg font-medium transition
        ${active
          ? "bg-[#22c55e] text-black shadow-lg"
          : "text-gray-100 hover:bg-[#22c55e]/20 hover:text-[#22c55e]"
        }`}
    >
      {label}
    </Link>
  </li>
);

const DropdownItem = ({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) => (
  <li>
    <Link
      to={to}
      className={`block px-4 py-2 rounded-md text-sm transition
        ${active
          ? "bg-[#22c55e]/30 text-[#22c55e]"
          : "text-gray-300 hover:bg-[#22c55e]/10 hover:text-[#22c55e]"
        }`}
    >
      {label}
    </Link>
  </li>
);

export default Sidebar;
