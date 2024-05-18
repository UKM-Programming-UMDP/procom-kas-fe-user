import { APIResponse } from "@types";
import API from "..";

export type GetResponse = {
  submission_id: string;
  user: {
    npm: string;
    name: string;
    email: string;
    kas_payed: number;
    month_start_pay: {
      id: number;
    };
  };
  payed_amount: number;
  status: string;
  note: string;
  evidence: string;
  submitted_at: string;
  updated_at: string;
};

export default class PayedKasService {
  basePath: string = "/kas";
  private api: API = new API();

  async get() {
    const targetPath = this.basePath + "?sort=created_at&order_by=desc";
    const res: APIResponse<GetResponse[]> = await this.api.GET(targetPath);
    return res;
  }
}
