import { useState } from "react";
import api from "../../api/axios";

interface Props {
  isOpen: boolean;
  onSuccess: () => void;
}

const ChangePasswordModal = ({ isOpen, onSuccess }: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await api.post("/staff-auth/change-password", {
      oldPassword,
      newPassword,
    });

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f172a] p-8 rounded-xl w-96 space-y-4 text-white"
      >
        <h2 className="text-xl font-bold">Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-3 rounded bg-[#1e293b]"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 rounded bg-[#1e293b]"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 rounded bg-[#1e293b]"
        />

        <button className="w-full bg-green-600 py-3 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordModal;