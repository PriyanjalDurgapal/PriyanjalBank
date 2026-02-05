type Props = {
  label: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  variant?: "primary" | "danger"
}

export default function Button({
  label,
  onClick,
  disabled,
  loading,
  variant = "primary"
}: Props) {
  const base =
    "px-4 py-2 rounded-md font-medium transition w-full sm:w-auto"

  const styles =
    variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-indigo-600 text-white hover:bg-indigo-700"

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${styles} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Processing..." : label}
    </button>
  )
}
