import React from "react";
import StatCard from "./StatCard";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUniversity,
  FaCheckCircle,
  FaTimesCircle,
  FaLock,
  FaMoneyBillWave,
} from "react-icons/fa";
import type { AdminDashboardDTO } from "../types/admin";

interface DashboardStatsProps {
  stats: AdminDashboardDTO;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
    <StatCard title="Total Customers" value={stats.totalCustomers} icon={<FaUsers />} />
    <StatCard title="Active Customers" value={stats.activeCustomers} icon={<FaUserCheck />} />
    <StatCard title="Inactive Customers" value={stats.inactiveCustomers} icon={<FaUserTimes />} />

    <StatCard title="Total Accounts" value={stats.totalAccounts} icon={<FaUniversity />} />
    <StatCard title="Active Accounts" value={stats.activeAccounts} icon={<FaCheckCircle />} />
    <StatCard title="Closed Accounts" value={stats.closedAccounts} icon={<FaTimesCircle />} />
    <StatCard title="Frozen Accounts" value={stats.frozenAccounts} icon={<FaLock />} />
    <StatCard title="Total Revenue" value={stats.totalRevenue} icon={<FaMoneyBillWave />} />
  </div>
);

export default DashboardStats;
