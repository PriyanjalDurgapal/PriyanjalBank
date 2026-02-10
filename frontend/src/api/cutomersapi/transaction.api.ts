import api from "../axios";


import type { TransactionPayload } from "../../components/recharge/transaction.types";

export const verifyPin = (accountNumber: string, pin: string) =>
  api.post("/atm/verify-pin", { accountNumber, pin });

export const createTransaction = (payload: TransactionPayload) =>
  api.post("/transactions/debit", payload);