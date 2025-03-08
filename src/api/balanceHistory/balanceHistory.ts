import { APIResponse } from "@types";
import API from "..";
import { BalanceHistoryModel } from "./model";

export default class BalanceHistoryServices {
  basePath: string = "/balance/history";
  private api: API = new API();

  async get(queryParams?: string) {
    const targetPath = `${this.basePath}?${queryParams}`;
    const res: APIResponse<BalanceHistoryModel[]> =
      await this.api.GET(targetPath);
    return res;
  }
}
