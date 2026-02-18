import api from "../axios";

export const staffLogin = async (data: {
  staffId: string;
  password: string;
}) => {
  const response = await api.post("/staff-auth/login", data);
  return response.data;
};