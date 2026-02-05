const StatusBadge = ({ status }: { status: string }) => {
  const color =
    status === "ACTIVE"
      ? "bg-green-500"
      : status === "LOCKED"
      ? "bg-red-500"
      : status === "FROZEN"
      ? "bg-yellow-500"
      : "bg-gray-400";

  return (
    <span className={`${color} text-white text-xs px-3 py-1 rounded-full`}>
      {status}
    </span>
  );
};

export default StatusBadge;
