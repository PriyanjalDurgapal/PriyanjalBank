export default function PinStatusBanner({ pinSet }: { pinSet: boolean }) {
  return (
    <div
      className={`p-4 rounded-md ${
        pinSet ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {pinSet
        ? "Transaction PIN is set"
        : "You must set a 6-digit transaction PIN"}
    </div>
  )
}
