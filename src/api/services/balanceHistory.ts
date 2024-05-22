import { APIResponse, FilterType } from "@types";
import API from "..";

export type GetResponse = {
  amount: number;
  prev_balance: number;
  activity: string;
  note: string;
  user: {
    npm: string;
    name: string;
  };
  created_at: string;
}[];

export default class BalanceHistoryServices {
  basePath: string = "/balance/history";
  private api: API = new API();

  async get({
    limit = 10,
    page = 1,
    order_by = "desc",
    sort = "created_at",
  }: FilterType) {
    const targetPath = `${this.basePath}?limit=${limit}&page=${page}&order_by=${order_by}&sort=${sort}`;
    const res: APIResponse<GetResponse> = await this.api.GET(targetPath);
    return res;
  }
}
