// components/ui/FilterButton.tsx
import React from "react";

interface FilterButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const FilterButton = ({
  active,
  icon,
  label,
  onClick,
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition ${
        active
          ? "bg-green-400 text-black"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default FilterButton;