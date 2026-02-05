export default function CardLimits({ limit }: { limit: number }) {
  return (
    <div className="bg-white rounded-md p-4 shadow">
      <p className="text-sm text-gray-500">Daily Transaction Limit</p>
      <p className="text-lg font-semibold mt-1">₹ {limit.toLocaleString()}</p>
    </div>
  )
}
