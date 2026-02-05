import { useEffect, useState } from "react";
import { applyCard, getCard } from "../../../api/cardApi";
import VirtualCardView from "./components/VirtualCard";
import SetPinModal from "./components/SetPinModal";

export default function CardPage() {
  const [card, setCard] = useState<any>(null);
  const [showPinModal, setShowPinModal] = useState(false);

  const load = async () => {
    const res = await getCard();
    setCard(res.data);

    
    if (res.data && !res.data.pinSet) {
      setShowPinModal(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!card) {
    return (
      <button onClick={applyCard} className="btn-primary">
        Apply Virtual Card
      </button>
    );
  }

  return (
    <>
      <VirtualCardView card={card} />

      {showPinModal && (
        <SetPinModal
          onClose={() => setShowPinModal(false)}
          onSuccess={() => {
            setShowPinModal(false);
            load(); 
          }}
        />
      )}
    </>
  );
}
