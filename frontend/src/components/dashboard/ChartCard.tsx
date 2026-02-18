import React from "react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => (
  <div className="bg-[#0f172a] p-6 rounded-2xl shadow-xl">
    <h2 className="text-white font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default ChartCard;
