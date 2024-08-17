import { APIResponse } from "@types";
import API from "..";
import {
  KasSubmissionModel,
  UserModel,
  KasSubmissionCreateModel,
} from "./model";
import { FetchCallback } from "@types";

export default class KasSubmissionService {
  kasPath: string = "/kas-submissions";
  userPath: string = "/users";
  private api: API = new API();
  private apiForm: API = new API();
  async post(
    submission: KasSubmissionCreateModel | string,
    callback: FetchCallback<KasSubmissionModel>,
  ) {
    const targetPath = `${this.kasPath}`;

    const res: APIResponse<KasSubmissionModel> = await this.apiForm.POSTFORM(
      targetPath,
      submission,
    );

    if (!res?.status) {
      callback.onError(res?.message || "unknown error");
    } else {
      if (res.data) callback.onSuccess(res.data);
    }

    callback.onFullfilled && callback.onFullfilled();
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
