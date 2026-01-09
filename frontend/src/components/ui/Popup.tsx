//src/components/ui/Popup.ts

import { useEffect } from "react";

type PopupProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

const Popup = ({ message, type = "success", onClose }: PopupProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`
          px-5 py-4 rounded-lg backdrop-blur-xl border
          shadow-lg animate-slide-in
          ${
            type === "success"
              ? "bg-emerald-500/20 border-emerald-400 text-emerald-100"
              : "bg-red-500/20 border-red-400 text-red-100"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <span className="font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-auto text-sm opacity-70 hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
