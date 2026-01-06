// src/pages/admin/AdminDashboard.tsx (or wherever it is)

import DashboardLayout from "../../components/layout/DashboradLayout"; // Fixed typo

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8 text-white">Admin Control Center</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <StatCard title="TOTAL CUSTOMERS" value="1,248" />
        <StatCard title="ACTIVE ACCOUNTS" value="3,402" />
        <StatCard title="DAILY TRANSACTIONS" value="18,920" />
      </div>
    </DashboardLayout>
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-[#0f172a]/80 backdrop-blur-md border border-[#15803d]/20 rounded-xl p-6 shadow-2xl transition-all hover:border-[#22c55e]/50 hover:shadow-[#22c55e]/20">
    <p className="text-[#9ca3af] text-sm uppercase tracking-wider mb-2">{title}</p>
    <p className="text-4xl font-extrabold text-[#22c55e] drop-shadow-lg">{value}</p>
  </div>
);

export default AdminDashboard;