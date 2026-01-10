import { useEffect, useState } from "react";

interface Suggestion {
  id: number;
  fullName: string;
  accountNumber: string;
}

interface Props {
  fetchSuggestions: (q: string) => Promise<Suggestion[]>;
  onSelect: (item: Suggestion) => void;
  placeholder?: string;
}

const SearchAutocomplete = ({ fetchSuggestions, onSelect, placeholder }: Props) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setItems([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fetchSuggestions(query);
        setItems(data);
      } finally {
        setLoading(false);
      }
    }, 300); // 🔥 debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-sm">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search customer..."}
        className="w-full px-4 py-2 rounded border bg-gray-800 text-white"
      />

      {items.length > 0 && (
        <div className="absolute z-50 w-full bg-gray-900 border rounded mt-1 shadow-lg">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelect(item);
                setQuery("");
                setItems([]);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-800"
            >
              <div className="font-medium">{item.fullName}</div>
              <div className="text-sm text-gray-400">
                {item.accountNumber}
              </div>
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="absolute right-3 top-2 text-sm text-gray-400">
          Loading…
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
