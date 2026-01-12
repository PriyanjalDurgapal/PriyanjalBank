import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboradLayout";
import api from "../../api/axios";

interface CustomerProfile {
  fullName: string;
  email: string;
  dob: string;
  mobile: string;
  gender: string;
}

const CustomerDashboard = () => {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/customer/profile");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8 text-white">Welcome, {profile?.fullName || "Customer"}</h1>

      <div className="bg-[#0f172a]/80 p-6 rounded-xl shadow-xl max-w-lg">
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Date of Birth:</strong> {profile?.dob}</p>
        <p><strong>Mobile:</strong> {profile?.mobile}</p>
        <p><strong>Gender:</strong> {profile?.gender}</p>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
