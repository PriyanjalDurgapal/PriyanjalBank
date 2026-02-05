import type { VirtualCard } from "../../../../components/types/card"

export default function VirtualCardView({ card }: { card: VirtualCard }) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-6 shadow-lg w-full max-w-md">
      <p className="text-sm opacity-80">Virtual Debit Card</p>

      <p className="text-xl tracking-widest mt-4">
        {card.maskedNumber}
      </p>

      <div className="flex justify-between mt-6 text-sm">
        <div>
          <p className="opacity-80">Expiry</p>
          <p>{card.expiryMonth}/{card.expiryYear}</p>
        </div>
        <div>
          <p className="opacity-80">CVV</p>
          <p>{card.cvv}</p>
        </div>
      </div>
    </div>
  )
}
