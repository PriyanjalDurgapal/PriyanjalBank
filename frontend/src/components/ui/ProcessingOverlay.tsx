const ProcessingOverlay = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
      <div className="bg-[#0f172a] text-white px-8 py-6 rounded-xl shadow-2xl text-center max-w-md w-full">
        <div className="mb-4 animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent mx-auto" />
        
        <h2 className="text-lg font-semibold mb-2">
          Processing Request
        </h2>

        <p className="text-sm text-gray-300">
          Please do not cancel or touch any button.<br />
          We are processing your request.
        </p>
      </div>
    </div>
  );
};

export default ProcessingOverlay;
