// components/dashboard/DashboardCharts.tsx
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import type { AdminDashboardDTO } from "../types/admin";

// Make sure chartSetup.ts is imported once
import "./chartSetup";

interface DashboardChartsProps {
  stats: AdminDashboardDTO;
}

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const DashboardCharts = ({ stats }: DashboardChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Monthly Transactions Line Chart */}
      <ChartCard title="Monthly Transactions">
        <Line
          key="transactions-chart"
          data={{
            labels: months,
            datasets: [
              {
                label: "Transactions",
                data: stats.monthlyTransactions ?? [],
                borderColor: "#22c55e",
                backgroundColor: "rgba(34,197,94,0.2)",
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
            },
          }}
        />
      </ChartCard>

      {/* Deposit vs Withdrawal Bar Chart */}
      <ChartCard title="Deposit vs Withdrawal">
        <Bar
          key="deposit-withdrawal-chart"
          data={{
            labels: months,
            datasets: [
              {
                label: "Deposits",
                data: stats.monthlyDeposits ?? [],
                backgroundColor: "#22c55e",
              },
              {
                label: "Withdrawals",
                data: stats.monthlyWithdrawals ?? [],
                backgroundColor: "#ef4444",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
            },
          }}
        />
      </ChartCard>

      {/* New Customers Per Month Bar Chart */}
      <ChartCard title="New Customers Per Month">
        <Bar
          key="new-customers-chart"
          data={{
            labels: months,
            datasets: [
              {
                label: "New Customers",
                data: stats.newCustomersPerMonth ?? [],
                backgroundColor: "#3b82f6",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
            },
          }}
        />
      </ChartCard>
      
    </div>
  );
};

export default DashboardCharts;
