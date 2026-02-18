import React from "react";

interface StatCardProps {
  title: string;
  value: number | null | undefined;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="bg-gradient-to-br from-[#0f172a] to-[#111827] border border-[#15803d]/20 rounded-2xl p-6 shadow-xl hover:scale-[1.03] transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="text-[#22c55e] text-3xl">{icon}</div>
    </div>

    <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{title}</p>
    <p className="text-3xl font-extrabold text-white">{(value ?? 0).toLocaleString()}</p>
  </div>
);

export default StatCard;
