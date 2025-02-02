import API from "..";
import { FetchCallback } from "@types";
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
    callback: FetchCallback<KasSubmissionModel>,
  ) {
    const targetPath = `${this.kasPath}`;

    const res = await this.apiForm.POSTFORM<KasSubmissionModel>(
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

  async get(params: string, callback: FetchCallback<UserModel[]>) {
    const targetPath = `${this.userPath}?${params}`;

    const res = await this.api.GET<UserModel[]>(targetPath);
    if (!res?.status) {
      callback.onError(res?.message || "unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}
