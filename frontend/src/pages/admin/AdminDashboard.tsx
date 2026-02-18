import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboradLayout";
import { getDashboardStats } from "../../api/adminService";
import type { AdminDashboardDTO } from "../../components/types/admin";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardCharts from "../../components/dashboard/DashboardCharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminDashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold mb-10 text-white">Admin Analytics Dashboard</h1>

        {loading && <p className="text-center text-gray-400 animate-pulse">Loading dashboard...</p>}
        {error && <p className="text-center text-red-500 bg-red-500/10 p-3 rounded-lg">{error}</p>}

        {stats && (
          <>
            <DashboardStats stats={stats} />
            <DashboardCharts stats={stats} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
