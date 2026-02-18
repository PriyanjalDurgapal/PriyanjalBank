import React from "react";
import ForgotPasswordModal from "../ui/ForgotPasswordModal";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  return (
    <>
      <ForgotPasswordModal
        isOpen={true}
        onClose={() => navigate(-1)}  
      />
    </>
  );
};

export default ChangePassword;