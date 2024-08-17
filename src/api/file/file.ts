import API from "..";
import { UploadFileModel, UploadModel } from "./model";
import { FetchCallback } from "@types";

export default class FileServices {
  basePath: string = "/file/images";
  private api: API = new API();

  async post(
    submission: UploadFileModel,
    callback: FetchCallback<UploadModel>,
  ) {
    const targetPath = `${this.basePath}`;
    const res = await this.api.POSTFORM<UploadModel>(targetPath, submission);

    if (!res?.status) {
      callback.onError(res?.message || "unknown error");
    } else {
      if (res.data) callback.onSuccess(res.data);
    }

    callback.onFullfilled && callback.onFullfilled();
  }
}
