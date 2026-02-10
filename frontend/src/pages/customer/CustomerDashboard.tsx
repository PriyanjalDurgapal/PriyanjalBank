import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboradLayout";
import api from "../../api/axios";
import RechargeFlow from "../../components/recharge/RechargeFlow";
import TransactionsTable from "../../components/transactions/TransactionsTable";
import { getMyTransactions } from "../../api/cutomersapi/customerTransactionApi";
import { FiMail, FiPhone, FiCalendar } from "react-icons/fi";

interface CustomerProfile {
  fullName: string;
  email: string;
  dob: string;
  mobile: string;
  gender: string;
}

const CustomerDashboard = () => {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/customer/profile");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await getMyTransactions();
        setTransactions(res.data);
      } finally {
        setLoadingTx(false);
      }
    };

    fetchProfile();
    fetchTransactions();
  }, []);

  return (
    <DashboardLayout>
      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        
        {/* Welcome + Balance */}
        <div className="lg:col-span-1 rounded-2xl p-5 sm:p-8 bg-gradient-to-br from-black via-[#0b1a14] to-black border border-green-500/20">
          <p className="text-white/60 mb-1 text-sm sm:text-base">
            Good Evening
          </p>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
            Welcome back,{" "}
            <span className="text-green-400 block sm:inline">
              {profile?.fullName || "Customer"}
            </span>
          </h1>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl p-4 sm:p-6 bg-black/40 border border-white/10">
          <div className="flex items-center gap-3 sm:gap-4 mb-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-lg sm:text-xl font-bold">
              {profile?.fullName?.charAt(0) || "C"}
            </div>
            <div>
              <p className="text-white font-semibold text-sm sm:text-base">
                {profile?.fullName || "Customer"}
              </p>
              <p className="text-white/50 text-xs sm:text-sm">
                Premium Account
              </p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70 break-all">
            <p className="flex items-center gap-2">
              <FiMail className="shrink-0" />
              {profile?.email}
            </p>
            <p className="flex items-center gap-2">
              <FiPhone className="shrink-0" />
              {profile?.mobile}
            </p>
            <p className="flex items-center gap-2">
              <FiCalendar className="shrink-0" />
              {profile?.dob}
            </p>
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="mb-3 text-center">
        <h2 className="text-xs sm:text-sm text-white/50 mb-3 sm:mb-4 uppercase tracking-wide">
          Quick Actions
        </h2>
      </div>

      {/* ================= RECHARGE SECTION ================= */}
      <div className="mb-8 sm:mb-10">
        <RechargeFlow />
      </div>

      {/* ================= RECENT TRANSACTIONS ================= */}
      <div className="mt-4 sm:mt-6">
        <h2 className="text-lg sm:text-xl font-semibold text-green-400 mb-3 sm:mb-4">
          Recent Transactions
        </h2>

        {loadingTx ? (
          <div className="text-green-400 py-4 sm:py-6 text-sm">
            Loading recent transactions...
          </div>
        ) : (
          <TransactionsTable transactions={transactions} limit={5} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;