import { useState } from "react";

interface SearchFilterBarProps {
  onSearch: (search: string, status: string) => void;
  placeholder?: string;
  showStatusFilter?: boolean;
}

const SearchFilterBar = ({
  onSearch,
  placeholder = "Search...",
  showStatusFilter = true,
}: SearchFilterBarProps) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      {/* Search */}
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none"
      />

      {/* Status Filter */}
      {showStatusFilter && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      )}

      {/* Button */}
      <button
        onClick={() => onSearch(search, status)}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilterBar;
