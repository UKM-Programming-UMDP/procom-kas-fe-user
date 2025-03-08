/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIResponse } from "@types";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  isAxiosError,
} from "axios";

type Headers = {
  "Content-type": string;
};

export default class API {
  api: AxiosInstance;
  private headers: Headers;

  constructor() {
    this.headers = {
      "Content-type": "application/json",
    };
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_BACKEND_URL}/v1`,
      httpsAgent: false,
    } as AxiosRequestConfig);
  }

  async GET<T>(path: string): Promise<APIResponse<T>> {
    try {
      const res = await this.api.get(path, { headers: this.headers });
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<T>;
      } else {
        return {
          status: false,
          message: "Internal Server Error",
        } as APIResponse<T>;
      }
    }
  }

  async POST<T, U = T>(path: string, data: any): Promise<APIResponse<U>> {
    try {
      const res = await this.api.post(path, data, { headers: this.headers });
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<U>;
      } else {
        return {
          status: false,
          message: "Internal Server Error",
        } as APIResponse<U>;
      }
    }
  }

  async POSTFORM<T, U = T>(path: string, data: any): Promise<APIResponse<U>> {
    try {
      const headers: Headers = {
        "Content-type": "multipart/form-data",
      };
      const res = await this.api.post(path, data, { headers });
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<U>;
      } else {
        return {
          status: false,
          message: "Internal Server Error",
        } as APIResponse<U>;
      }
    }
  }

  async PUT<T, U = T>(path: string, data: any): Promise<APIResponse<U>> {
    try {
      const res = await this.api.put(path, data, { headers: this.headers });
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<U>;
      } else {
        return {
          status: false,
          message: "Internal Server Error",
        } as APIResponse<U>;
      }
    }
  }

  async DELETE<T, U = T>(path: string): Promise<APIResponse<U>> {
    try {
      const res = await this.api.delete(path);
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<U>;
      } else {
        return {
          status: false,
          message: "Internal Server Error",
        } as APIResponse<U>;
      }
    }
  }
}
