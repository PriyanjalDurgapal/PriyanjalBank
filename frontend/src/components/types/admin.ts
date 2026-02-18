export interface AdminDashboardDTO {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;

  totalAccounts: number;
  activeAccounts: number;
  closedAccounts: number;
  frozenAccounts: number;

  monthlyTransactions: number[];
  monthlyDeposits: number[];
  monthlyWithdrawals: number[];
  newCustomersPerMonth: number[];

  totalRevenue: number;
}