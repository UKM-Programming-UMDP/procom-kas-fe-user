import { APIResponse } from "@types";
import { PayedKasModel } from "./model";
import API from "..";

export default class PayedKasService {
  basePath: string = "/kas";
  private api: API = new API();

  async get() {
    const targetPath = this.basePath + "?sort=created_at&order_by=desc";
    const res: APIResponse<PayedKasModel[]> = await this.api.GET(targetPath);
    return res;
  }
}
