import { useEffect, useState } from "react";
import CustomerModal from "./CustomerModal";
import Popup from "../../../components/ui/Popup";
import SearchFilterBar from "../../../components/ui/SearchFilterBar";
import Pagination from "../../../components/ui/Pagination";
import { fetchCustomers } from "../../../api/AddCustomer";

interface Customer {
  id: number;
  accountNumber: string;
  fullName: string;
  status: string;
  createdByRole: string;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await fetchCustomers(search, status, page, 5);
      setCustomers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch {
      setPopup({ message: "Failed to load customers", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [page]);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>

      {/* 🔍 Search + Filter */}
      <SearchFilterBar
        onSearch={(s, st) => {
          setSearch(s);
          setStatus(st);
          setPage(0);
          setTimeout(loadCustomers, 0);
        }}
      />

      {/* Table */}
      <table className="min-w-full border border-gray-700 rounded-md">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            <th className="px-4 py-2 border">Account No</th>
            <th className="px-4 py-2 border">Full Name</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Created By</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id} className="odd:bg-gray-900 even:bg-gray-800">
              <td className="px-4 py-2 border">{cust.accountNumber}</td>
              <td className="px-4 py-2 border">{cust.fullName}</td>
              <td className="px-4 py-2 border">{cust.status}</td>
              <td className="px-4 py-2 border">{cust.createdByRole}</td>
              <td className="px-4 py-2 border text-center">
                <button
                  onClick={() => setSelectedCustomer(cust)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
};

export default CustomerList;
