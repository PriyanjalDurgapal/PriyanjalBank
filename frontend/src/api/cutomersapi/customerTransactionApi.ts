import api from "../axios";


export const getMyTransactions = () => {
  return api.get("/customer/transactions");
};