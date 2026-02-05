import { useState } from "react";
import api from "../../../../api/axios";
import type { VirtualCard } from "../../../../components/types/card";
import ForgotPinModal from "../../../../components/ui/ForgotPinModal";

export default function CardControls({
  card,
  reload,
  setPopup,
  setOtpAction,
}: {
  card: VirtualCard;
  reload: () => void;
  setPopup: (m: string) => void;
  setOtpAction: (a: "PIN" | "REVEAL") => void;
}) {
  const [showForgotPin, setShowForgotPin] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() =>
            api.patch("/api/customer/card/toggle/online").then(reload)
          }
        >
          {card.onlineEnabled ? "Disable Online" : "Enable Online"}
        </button>

        <button
          onClick={() =>
            api.patch("/api/customer/card/toggle/international").then(reload)
          }
        >
          {card.internationalEnabled ? "Disable Intl" : "Enable Intl"}
        </button>

        <button
          onClick={() =>
            api.post("/api/customer/card/lock").then(() => {
              setPopup("Card locked");
              reload();
            })
          }
        >
          Lock Card
        </button>

        <button
          onClick={async () => {
            await api.post("/api/customer/card/pin/request-otp");
            setOtpAction("PIN");
          }}
        >
          Set / Change PIN
        </button>

        <button onClick={() => setShowForgotPin(true)}>
          Forgot PIN
        </button>

        <button
          onClick={async () => {
            await api.post("/api/customer/card/reveal/request-otp");
            setOtpAction("REVEAL");
          }}
        >
          Reveal Card
        </button>
      </div>

      {showForgotPin && (
        <ForgotPinModal
          onClose={() => {
            setShowForgotPin(false);
            reload();
          }}
        />
      )}
    </>
  );
}
