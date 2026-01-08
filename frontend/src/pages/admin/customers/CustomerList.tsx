import { useEffect, useState } from "react";
import { allcustomer } from "../../../api/AddCustomer";

interface Customer {
  id: number;
  customerId: string;
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  email?: string;
  address?: string;
  accountNumber: string;
  status: string;
  createdByRole: string;
  createdAt: string;
}

const CustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await allcustomer();
      setCustomers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      <table className="min-w-full border border-gray-700 rounded-md">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            <th className="px-4 py-2 border">Customer ID</th>
            <th className="px-4 py-2 border">Full Name</th>
            <th className="px-4 py-2 border">DOB</th>
            <th className="px-4 py-2 border">Gender</th>
            <th className="px-4 py-2 border">Mobile</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Account Number</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Created By</th>
            <th className="px-4 py-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id} className="odd:bg-gray-900 even:bg-gray-800">
              <td className="px-4 py-2 border">{cust.customerId}</td>
              <td className="px-4 py-2 border">{cust.fullName}</td>
              <td className="px-4 py-2 border">{cust.dob}</td>
              <td className="px-4 py-2 border">{cust.gender}</td>
              <td className="px-4 py-2 border">{cust.mobile}</td>
              <td className="px-4 py-2 border">{cust.email || "-"}</td>
              <td className="px-4 py-2 border">{cust.address || "-"}</td>
              <td className="px-4 py-2 border">{cust.accountNumber}</td>
              <td className="px-4 py-2 border">{cust.status}</td>
              <td className="px-4 py-2 border">{cust.createdByRole}</td>
              <td className="px-4 py-2 border">
                {new Date(cust.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
