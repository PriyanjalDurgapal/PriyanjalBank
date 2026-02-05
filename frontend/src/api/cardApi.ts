import api from "./axios";

export const getCard = () => api.get("/customer/card");
export const applyCard = () => api.post("/customer/card/apply");
export const requestPinOtp = () => api.post("/customer/card/pin/request-otp");
export const setPin = (otp: string, pin: string) =>
  api.post(`/customer/card/pin/set?otp=${otp}&pin=${pin}`);
