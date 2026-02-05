import api from "../axios";

export const verifyPin = (accountNumber: string, pin: string) =>
  api.post("/atm/verify-pin", {
    accountNumber,
    pin,
  });

export const sendOtp = (accountNumber: string) =>
  api.post("/atm/send-otp", {
    accountNumber,
  });

export const transact = (
  accountNumber: string,
  otp: string,
  type: "DEPOSIT" | "WITHDRAW",
  amount: number
) =>
  api.post("/atm/transaction", {
    accountNumber,
    otp,
    type,
    amount,
  });

export const fetchHistory = (accountNumber: string) =>
  api.get(`/transactions/${accountNumber}`);

export const verifyOtp = (accountNumber: string, otp: string) =>
  api.post("/atm/verify-otp", {
    accountNumber,
    otp,
  });