import { useEffect, useState } from "react";
import api from "../../api/axios";


interface SecurityLog {
  id: number;
  email: string;
  role: string;
  action: string;
  ipAddress: string;
  createdAt: string; 
}

const CustomerSecurityLogs = () => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await api.get<SecurityLog[]>("/customer/logs");
        setLogs(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to fetch logs");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-green-400 bg-black min-h-screen">
        Loading logs...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-500 bg-black min-h-screen">
        {error}
      </div>
    );

  return (
    <div className="p-6 bg-black min-h-screen">
      <h2 className="text-xl font-bold mb-6 text-green-400">
        Security Activity
      </h2>

      {logs.length === 0 && (
        <p className="text-green-700">No logs available.</p>
      )}

      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-[#020617] border border-green-900/60
                       p-4 rounded-lg hover:border-green-500
                       transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-300 font-semibold">
                {log.action}
              </span>
              <span className="text-green-700 text-xs">
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-green-600">Email:</span>{" "}
                <span className="text-green-400">{log.email}</span>
              </div>

              <div>
                <span className="text-green-600">Role:</span>{" "}
                <span className="text-green-400">{log.role}</span>
              </div>

              <div>
                <span className="text-green-600">IP Address:</span>{" "}
                <span className="text-green-400">{log.ipAddress}</span>
              </div>

              <div>
                <span className="text-green-600">Log ID:</span>{" "}
                <span className="text-green-400">{log.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSecurityLogs;
