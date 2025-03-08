import { PaginationType } from "@types";

export type BalanceHistoryModel = {
  amount: number;
  prev_balance: number;
  activity: string;
  note: string;
  user: {
    npm: string;
    name: string;
  };
  created_at: string;
};

export type BalanceHistoryResponseModel = {
  data: BalanceHistoryModel[];
  pagination?: PaginationType;
};
