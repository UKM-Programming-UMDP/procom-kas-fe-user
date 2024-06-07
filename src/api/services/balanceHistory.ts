import { APIResponse, PaginationType } from "@types";
import API from "..";

export type BalanceHistoryType = {
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

export type GetResponse = {
  data: BalanceHistoryType[];
  pagination?: PaginationType;
};

export default class BalanceHistoryServices {
  basePath: string = "/balance/history";
  private api: API = new API();

  async get(queryParams?: string) {
    const targetPath = `${this.basePath}?${queryParams}`;
    const res: APIResponse<BalanceHistoryType[]> =
      await this.api.GET(targetPath);
    return res;
  }
}
