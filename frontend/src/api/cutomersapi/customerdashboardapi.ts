import api from "../axios";

/* -------- Profile -------- */
export const fetchCustomerProfile = () => {
  return api.get("/customer/profile");
};

/* -------- PIN Verify -------- */
export const verifyPin = (accountNumber: string, pin: string) => {
  return api.post("/atm/verify-pin", {
    accountNumber,
    pin,
  });
};



