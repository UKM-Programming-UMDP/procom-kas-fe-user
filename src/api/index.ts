/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIResponse } from "@types";
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  isAxiosError,
} from "axios";

type Headers = {
  Accept: string;
  "Content-type": string;
};

type APIContentType = {
  isFile?: boolean;
  isForm?: boolean;
};

export default class API {
  headers: Headers;
  api: AxiosInstance;

  constructor(
    { isFile, isForm }: APIContentType = { isFile: false, isForm: false },
  ) {
    this.headers = {
      Accept: "application/json",
      "Content-type": isFile
        ? "multipart/form-data"
        : isForm
          ? "application/x-www-form-urlencoded"
          : "application/json",
    };

    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_BACKEND_URL}/v1`,
      headers: this.headers as unknown as AxiosHeaders,
      httpsAgent: false,
    } as AxiosRequestConfig);
  }

  async GET<T>(path: string): Promise<APIResponse<T>> {
    try {
      const res = await this.api.get(path);
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return err?.response?.data;
      } else {
        return err;
      }
    }
  }

  async POST<T>(path: string, data: any): Promise<APIResponse<T>> {
    try {
      const res = await this.api.post(path, data);
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        console.error("Axios error:", err.message);
        throw new Error(
          `API Error: ${err.response?.status} ${err.response?.data?.message}`,
        );
      } else {
        console.error("Unexpected error:", err);
        throw err;
      }
    }
  }

  async PUT<T>(path: string, data: any): Promise<APIResponse<T>> {
    try {
      const res = await this.api.put(path, data);
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return err?.response?.data;
      } else {
        return err;
      }
    }
  }

  async DELETE<T>(path: string): Promise<APIResponse<T>> {
    try {
      const res = await this.api.delete(path);
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return err?.response?.data;
      } else {
        return err;
      }
    }
  }
}
