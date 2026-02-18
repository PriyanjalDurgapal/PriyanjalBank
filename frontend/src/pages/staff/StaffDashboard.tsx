import { useEffect, useState, useRef } from "react";
import { getStaffProfile } from "../../api/staffapi/staffService";
import type { StaffProfile } from "../../api/staffapi/staffService";
import ForcePasswordGuard from "../../auth/ForcePasswordGuard";

import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import { getDashboardStats } from "../../api/adminService";
import type { AdminDashboardDTO } from "../../components/types/admin";

const API_BASE = import.meta.env.VITE_API_URL;

const StaffDashboard = () => {
  // ----- Staff profile state -----
  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const tapRef = useRef<number>(0);

  // ----- Admin stats state -----
  const [stats, setStats] = useState<AdminDashboardDTO | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");

  // Fetch staff profile
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getStaffProfile();
      setProfile(data);
    } catch (error) {
      console.error("Profile error", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  // Fetch admin dashboard stats
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (err) {
      console.error(err);
      setStatsError("Failed to load dashboard data");
    } finally {
      setLoadingStats(false);
    }
  };

  // Auto flip avatar every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => setFlipped((prev) => !prev), 15000);
    return () => clearInterval(interval);
  }, []);

  // Double tap / double click
  const handleTap = () => {
    const now = Date.now();
    if (now - tapRef.current < 300) setFlipped((prev) => !prev);
    tapRef.current = now;
  };

  // Loading
  if (loadingProfile)
    return <p className="text-white p-6 sm:p-10">Loading...</p>;

  const imageUrl = profile?.profileImage
    ? `${API_BASE}/${profile.profileImage}`
    : null;

  return (
    <ForcePasswordGuard
      forcePasswordChange={profile?.forcePasswordChange ?? false}
      onSuccess={fetchProfile}
    >
      <div className="px-4 sm:px-6 lg:px-10 py-6">
        {/* ===== Staff Welcome + Profile ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Welcome Card */}
          <div className="rounded-2xl p-6 sm:p-8 
                          bg-gradient-to-br from-black via-[#0b1a14] to-black 
                          border border-green-500/20">
            <p className="text-white/60 text-sm sm:text-base">Good Evening</p>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-2">
              Welcome back,
              <span className="text-green-400 block mt-1">
                {profile?.fullName || "Staff"}
              </span>
            </h1>
          </div>

          {/* Profile Card */}
          <div className="rounded-2xl p-6 sm:p-8 
                          bg-black/40 border border-white/10
                          flex flex-col sm:flex-row
                          items-center sm:items-center
                          text-center sm:text-left
                          gap-6">
            {/* Avatar */}
            <div
              className="w-24 sm:w-28 aspect-square min-w-[96px] sm:min-w-[112px]
                         rounded-full flip-perspective flex-shrink-0 cursor-pointer"
              onClick={handleTap}
              onTouchEnd={handleTap}
            >
              <div className={`flip-card ${flipped ? "flipped" : ""}`}>
                {/* FRONT */}
                <div className="flip-face border-4 border-green-500">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center 
                                    bg-green-500/20 text-green-400 text-3xl font-bold">
                      {profile?.fullName?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* BACK */}
                <div className="flip-face flip-back border-4 border-green-500
                                bg-green-500/20 flex items-center justify-center
                                text-green-400 text-3xl font-bold">
                  {profile?.fullName?.charAt(0)}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="w-full">
              <p className="text-white font-semibold text-lg sm:text-xl">
                {profile?.fullName}
              </p>
              <p className="text-white/50 text-sm mt-1">{profile?.role} Account</p>
              <p className="text-white/40 text-xs sm:text-sm mt-2 break-all">
                {profile?.email}
              </p>
            </div>
          </div>
        </div>

        {/* ===== Admin Stats Cards ===== */}
        {loadingStats && (
          <p className="text-center text-gray-400 animate-pulse">Loading stats...</p>
        )}
        {statsError && (
          <p className="text-center text-red-500 bg-red-500/10 p-3 rounded-lg">
            {statsError}
          </p>
        )}
        {stats && <DashboardStats stats={stats} />}

        {/* ===== Admin Charts ===== */}
        {stats && <DashboardCharts stats={stats} />}
      </div>
    </ForcePasswordGuard>
  );
};

export default StaffDashboard;
