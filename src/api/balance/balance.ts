import { APIResponse } from "@types";
import { BalanceModel } from "./model";
import API from "..";

export default class BalanceServices {
  basePath: string = "/balance";
  private api: API = new API();

  async get() {
    const targetPath = this.basePath;
    const res: APIResponse<BalanceModel> = await this.api.GET(targetPath);
    return res;
  }
}
