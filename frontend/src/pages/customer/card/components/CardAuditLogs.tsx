import type { CardAuditLog } from "../../../../components/types/card"

export default function CardAuditLogs({ logs }: { logs: CardAuditLog[] }) {
  return (
    <div className="bg-white rounded-md p-4 shadow">
      <h3 className="font-semibold mb-2">Card Activity</h3>
      <ul className="space-y-2 text-sm max-h-64 overflow-y-auto">
        {logs.map(log => (
          <li key={log.id} className="border-b pb-1">
            <p className="font-medium">{log.action}</p>
            <p className="text-gray-500">{log.description}</p>
            <p className="text-xs text-gray-400">
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
