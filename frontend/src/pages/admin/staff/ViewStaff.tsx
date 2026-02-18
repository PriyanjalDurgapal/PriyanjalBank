import { useEffect, useState } from "react";
import StaffModal from "./StaffModal";
import Popup from "../../../components/ui/Popup";
import { fetchStaff } from "../../../api/staffapi/AddStaff";

interface Staff {
  id: number;
  staffId: string;
  fullName: string;
  email: string;
  mobile: string;
  role: string;
  photoPath?: string;
  createdAt: string;
  deleted: boolean;
}

const StaffList = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [popup, setPopup] = useState<any>(null);

  const loadStaff = async () => {
    try {
      const res = await fetchStaff();
      setStaff(res.data);
    } catch {
      setPopup({ message: "Failed to load staff", type: "error" });
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-12 tracking-wide">Staff Management</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {staff.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelectedStaff(s)}
            className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                        border ${s.deleted ? "border-gray-600" : "border-green-500/20"}
                        rounded-3xl p-8 cursor-pointer
                        hover:scale-105 hover:border-green-500 transition-all duration-300
                        shadow-[0_0_30px_rgba(0,255,150,0.08)]
                        ${s.deleted ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={s.photoPath ? `http://localhost:8080/${s.photoPath}` : "https://via.placeholder.com/150"}
                alt="staff"
                className={`w-24 h-24 rounded-full object-cover mb-5 ${
                  s.deleted ? "border-gray-500" : "border-4 border-green-500"
                }`}
              />
              <h2 className={`text-xl font-semibold ${s.deleted ? "text-gray-400" : ""}`}>{s.fullName}</h2>
              <p className="text-sm text-gray-400 mt-1">{s.staffId}</p>
              <p className="text-sm mt-3 text-gray-300">{s.email}</p>
              <span
                className={`mt-4 px-4 py-1 text-xs rounded-full font-medium ${
                  s.deleted ? "bg-gray-500/20 text-gray-400" : "bg-green-500/20 text-green-400"
                }`}
              >
                {s.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedStaff && (
        <StaffModal
          staff={selectedStaff}
          onClose={() => setSelectedStaff(null)}
          onUpdated={() => {
            loadStaff();
            setPopup({ message: "Staff updated successfully", type: "success" });
          }}
          onDeleted={() => {
            loadStaff();
            setPopup({ message: "Staff deleted successfully", type: "success" });
          }}
        />
      )}

      {popup && <Popup message={popup.message} type={popup.type} onClose={() => setPopup(null)} />}
    </div>
  );
};

export default StaffList;