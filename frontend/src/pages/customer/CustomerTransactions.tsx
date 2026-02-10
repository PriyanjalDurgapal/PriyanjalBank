import { useEffect, useState } from "react";
import TransactionsTable from "../../components/transactions/TransactionsTable";
import { getMyTransactions } from "../../api/cutomersapi/customerTransactionApi";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTransactions()
      .then((res) => setTransactions(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-green-400">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-green-400 mb-4">
        Transaction History
      </h1>

      {/* SHOW ALL TRANSACTIONS */}
      <TransactionsTable transactions={transactions} />
    </div>
  );
}