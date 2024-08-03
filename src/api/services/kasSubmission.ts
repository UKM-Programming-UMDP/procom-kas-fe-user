import { APIResponse } from "@types";
import API from "..";

export type GetResponse = {
  submission_id: string;
  user: UserType;
  payed_amount: number;
  status: {
    ID: number;
    Name: string;
  };
  note: string;
  evidence: string;
  submitted_at: string;
  updated_at: string;
};

export type UserType = {
  npm: string;
  name: string;
};

export type SubmissionRequest = {
  user: {
    npm: string;
  };
  payed_amount: number;
  note: string;
  evidence: string;
};

export default class KasSubmissionService {
  kasPath: string = "/kas-submissions";
  userPath: string = "/users";
  private api: API = new API();
  private apiForm: API = new API();
  async post(
    submission: SubmissionRequest | string,
  ): Promise<APIResponse<GetResponse>> {
    const targetPath = `${this.kasPath}`;
    try {
      const res: APIResponse<GetResponse> = await this.apiForm.POSTFORM(
        targetPath,
        submission,
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async get(queryParams?: string): Promise<APIResponse<UserType[]>> {
    const targetPath = `${this.userPath}?${queryParams}`;
    try {
      const res: APIResponse<UserType[]> = await this.api.GET(targetPath);
      return res;
    } catch (error) {
      throw error;
    }
  }
}
