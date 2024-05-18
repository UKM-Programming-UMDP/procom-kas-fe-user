import { APIResponse } from "@types";
import API from "..";

type GetResponse = {
  balance: number;
  updated_at: string;
};

export default class BalanceServices {
  basePath: string = "/balance";
  private api: API = new API();

  async get() {
    const targetPath = this.basePath;
    const res: APIResponse<GetResponse> = await this.api.GET(targetPath);
    return res;
  }
}
