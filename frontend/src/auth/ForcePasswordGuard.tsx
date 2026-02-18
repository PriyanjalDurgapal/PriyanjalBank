import { useEffect, useState } from "react";
import ChangePasswordModal from "../components/ui/ChangePasswordModal";

interface Props {
  forcePasswordChange: boolean;
  onSuccess: () => void;
  children: React.ReactNode;
}

const ForcePasswordGuard = ({
  forcePasswordChange,
  onSuccess,
  children,
}: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (forcePasswordChange) {
      setOpen(true);
    }
  }, [forcePasswordChange]);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess(); // refetch profile
  };

  return (
    <>
      <ChangePasswordModal
        isOpen={open}
        onSuccess={handleSuccess}
      />

      {!open && children}
    </>
  );
};

export default ForcePasswordGuard;