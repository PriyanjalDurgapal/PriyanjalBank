import { useEffect, useState } from "react";
import { fetchCustomerSuggestions } from "../../api/AddCustomer";

interface Suggestion {
  id: number;
  fullName: string;
  accountNumber: string;
}

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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ⚡ Debounced live search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search, status);

      //  Fetch suggestions after 3 chars
      if (search.length && search.length >= 3) {
        fetchCustomerSuggestions(search).then((res) => {
  const list = Array.isArray(res.data) ? res.data : [];
  setSuggestions(list);
  setShowSuggestions(list.length > 0);
});

      } else {
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status]);

  return (
    <div className="relative flex flex-col md:flex-row gap-3 mb-4">
      {/* Search */}
      <div className="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
        />

        {/* 🔍 Suggestions Dropdown */}
        {showSuggestions && Array.isArray(suggestions) && suggestions.length > 0 && (

          <div className="absolute z-20 w-full bg-gray-900 border border-gray-700 rounded mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setSearch(s.accountNumber);
                  setShowSuggestions(false);
                }}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
              >
                <div className="font-semibold">{s.fullName}</div>
                <div className="text-gray-400">{s.accountNumber}</div>
              </div>
            ))}
          </div>
        )}
      </div>

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
    </div>
  );
};

export default SearchFilterBar;
