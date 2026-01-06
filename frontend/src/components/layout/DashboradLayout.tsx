import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-gray-100">
      <Header onMenuClick={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#020617] via-[#0f172a]/20 to-[#020617] p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;