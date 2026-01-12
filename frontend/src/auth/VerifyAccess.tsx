import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

interface VerifyAccessProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const VerifyAccess = ({ children, allowedRoles }: VerifyAccessProps) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await api.post("/auth/verify");
        setAuthorized(true);
      } catch {
        localStorage.clear();
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Verifying access...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default VerifyAccess;
