import { APIResponse } from "@types";
import API from "..";

export type UploadImageResponse = {
  url_id: string;
};
export type UploadImageRequest = {
  file: File;
};
export default class UploadImage {
  basePath: string = "/file/images";
  private api: API = new API({ isFile: true });
  async post(
    submission: UploadImageRequest,
  ): Promise<APIResponse<UploadImageResponse>> {
    const targetPath = `${this.basePath}`;
    const res: APIResponse<UploadImageResponse> = await this.api.POST(
      targetPath,
      submission,
    );
    return res;
  }
}
