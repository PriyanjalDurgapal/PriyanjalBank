import api from "./axios";

export const getCard = () => api.get("/customer/card");
export const applyCard = () => api.post("/customer/card/apply");
export const setCardPin = (otp: string, pin: string) =>
  api.post(`/customer/card/pin/set?otp=${otp}&pin=${pin}`);
export const toggleCardStatus = (enabled: boolean) =>
  api.patch("/customer/card/toggle-status", { enabled });
export const updateLimits = (data: any) =>
  api.put("/customer/card/limits", data);
export const getCardLogs = () => api.get("/customer/card/logs");
export const requestOtpForReveal = () => api.post("/customer/card/reveal/otp");
export const revealCardWithOtp = (otp: string) => api.post("/customer/card/reveal", { otp });


export const requestPinOtp = () =>
  api.post("/customer/card/pin/request-otp");

