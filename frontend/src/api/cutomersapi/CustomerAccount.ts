import api from "../axios";

export const getMyAccounts = () =>
  api.get("/customer/accounts");
