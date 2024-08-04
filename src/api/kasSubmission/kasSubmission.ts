import { APIResponse } from "@types";
import API from "..";
import {
  KasSubmissionModel,
  UserModel,
  KasSubmissionCreateModel,
} from "./model";

export default class KasSubmissionService {
  kasPath: string = "/kas-submissions";
  userPath: string = "/users";
  private api: API = new API();
  private apiForm: API = new API();
  async post(
    submission: KasSubmissionCreateModel | string,
  ): Promise<APIResponse<KasSubmissionModel>> {
    const targetPath = `${this.kasPath}`;
    try {
      const res: APIResponse<KasSubmissionModel> = await this.apiForm.POSTFORM(
        targetPath,
        submission,
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async get(queryParams?: string): Promise<APIResponse<UserModel[]>> {
    const targetPath = `${this.userPath}?${queryParams}`;
    try {
      const res: APIResponse<UserModel[]> = await this.api.GET(targetPath);
      return res;
    } catch (error) {
      throw error;
    }
  }
}
