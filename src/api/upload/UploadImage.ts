import { APIResponse } from "@types";
import API from "..";
import { UploadFileModel, UploadModel } from "./model";

export default class UploadImage {
  basePath: string = "/file/images";
  private api: API = new API();

  async post(submission: UploadFileModel): Promise<APIResponse<UploadModel>> {
    const targetPath = `${this.basePath}`;
    const res: APIResponse<UploadModel> = await this.api.POSTFORM(
      targetPath,
      submission,
    );
    return res;
  }
}
