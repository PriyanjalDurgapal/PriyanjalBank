export type TransactionChannel =
  | "MOBILE_RECHARGE"
  | "DTH"
  | "ELECTRICITY"
  | "WATER"
  | "TRANSFER";

export interface TransactionPayload {
  accountNumber: string;
  pin: string;
  type: "WITHDRAW";
  amount: number;
  channel: TransactionChannel;
  serviceProvider?: string;
  reference?: string;
}