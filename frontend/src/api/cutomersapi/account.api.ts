import api from "../axios";
import type { Account } from "../../components/recharge/account.types";



export const fetchMyAccounts = async (): Promise<Account[]> => {
  const res = await api.get("/accounts/me");
  return res.data;
};