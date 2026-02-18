import api from "../axios";

export interface StaffProfile {
  fullName: string;
  email: string;
  role: string;
  profileImage:string
  forcePasswordChange: boolean;
}

export const getStaffProfile = async (): Promise<StaffProfile> => {
  const res = await api.get("/staff/profile");
  return res.data;
};