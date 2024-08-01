import { APIResponse } from "@types";
import API from "..";
//import qs from "qs";

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
  email: string;
  kas_payed: number;
};

export type SubmissionRequest = {
  user: {
    npm: string;
  };
  payed_amount: number;
  note: string;
  evidence: string;
};

export default class CreateKasService {
  kasPath: string = "/kas-submissions";
  userPath: string = "/users";
  private api: API = new API();
  private apiForm: API = new API({ isForm: true });
  async post(
    submission: SubmissionRequest | string,
  ): Promise<APIResponse<GetResponse>> {
    const targetPath = `${this.kasPath}`;
    try {
      const res: APIResponse<GetResponse> = await this.apiForm.POST(
        targetPath,
        submission,
      );
      return res;
    } catch (error) {
      console.error("Error creating submission:", error);
      throw error;
    }
  }
  async get(queryParams: string = ""): Promise<APIResponse<UserType[]>> {
    const targetPath = `${this.userPath}${queryParams ? `?${queryParams}` : ""}`;
    try {
      const res: APIResponse<UserType[]> = await this.api.GET(targetPath);
      return res;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}
