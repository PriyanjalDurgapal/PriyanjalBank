export type VirtualCard = {
  id: number;
  maskedNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  onlineEnabled: boolean;
  internationalEnabled: boolean;
  locked: boolean;
  pinSet: boolean;
  dailyLimit: number;
};

export type CardAuditLog = {
  id: number;
  action: string;
  description: string;
  createdAt: string;
};
