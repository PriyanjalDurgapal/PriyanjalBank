import { useEffect, useState } from "react";
import {
  getPendingCardRequests,
  approveCardRequest,
  rejectCardRequest,
} from "../../../api/adminCardService";
import Popup from "../../../components/ui/Popup";

export default function CardApprovals() {
  const [requests, setRequests] = useState<any[]>([]);
  const [reasons, setReasons] = useState<Record<number, string>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const load = async () => {
    const data = await getPendingCardRequests();
    setRequests(data);
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id: number) => {
    try {
      setLoadingId(id);
      await approveCardRequest(id);
      setPopup({ message: "Card approved successfully", type: "success" });
      load();
    } catch {
      setPopup({ message: "Failed to approve card", type: "error" });
    } finally {
      setLoadingId(null);
    }
  };

  const reject = async (id: number) => {
    if (!reasons[id]) {
      setPopup({ message: "Reject reason is required", type: "error" });
      return;
    }

    try {
      setLoadingId(id);
      await rejectCardRequest(id, reasons[id]);
      setPopup({ message: "Card rejected", type: "success" });
      load();
    } catch {
      setPopup({ message: "Failed to reject card", type: "error" });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">
        Card Approval Requests
      </h1>

      {requests.length === 0 && (
        <div className="rounded-lg bg-gray-800 p-6 text-center text-gray-400">
          No pending card requests
        </div>
      )}

      {requests.map((r) => (
        <div
          key={r.id}
          className="flex flex-col gap-4 rounded-xl bg-gray-900 p-5 shadow border border-gray-800"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Customer Ref</p>
              <p className="font-medium text-white">
                {r.customerRefId}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => approve(r.id)}
                disabled={loadingId === r.id}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium transition hover:bg-emerald-700 disabled:opacity-60"
              >
                Approve
              </button>

              <button
                onClick={() => reject(r.id)}
                disabled={loadingId === r.id}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition hover:bg-red-700 disabled:opacity-60"
              >
                Reject
              </button>
            </div>
          </div>

          <input
            placeholder="Enter rejection reason"
            value={reasons[r.id] || ""}
            onChange={(e) =>
              setReasons({ ...reasons, [r.id]: e.target.value })
            }
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      ))}

      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
