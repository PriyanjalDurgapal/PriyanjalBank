import { useEffect, useState } from "react";
import { fetchHistory } from "../../api/cutomersapi/atmApi";

type Tx = {
  id: number;
  type: string;
  amount: number;
  balanceAfter: number;
  createdAt: string;
};

export default function HistoryTable({
  accountNumber,
}: {
  accountNumber: string;
}) {
  const [data, setData] = useState<Tx[]>([]);

  useEffect(() => {
    fetchHistory(accountNumber).then((res) => setData(res.data));
  }, [accountNumber]);

  return (
    <table className="w-full border mt-6 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {data.map((tx) => (
          <tr key={tx.id} className="text-center border-t">
            <td>{new Date(tx.createdAt).toLocaleString()}</td>
            <td>{tx.type}</td>
            <td>{tx.amount}</td>
            <td>{tx.balanceAfter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
