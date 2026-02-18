import api from "./axios";

export const getDashboardStats = () => {
  return api.get("/common/dashboard");
};