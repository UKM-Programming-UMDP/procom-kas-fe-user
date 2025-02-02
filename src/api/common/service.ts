import { CommonOptions, FetchCallback } from "@types";
import APIInstance from "..";
import { EnumsModel, HealthCheckResponse} from "./model";

export default class CommonService {
  private api: APIInstance = new APIInstance();

  // Because there is no route yet for health check, this is just a placeholder
  async healthCheck(callback: FetchCallback<HealthCheckResponse>) {
    const res = await this.api.GET<HealthCheckResponse>("/v1/balance");
    if (!res?.status) {
      callback.onError(res?.message || "Failed to fetch balance");
    } else {
      if (res.data) callback.onSuccess(res.data);
    }
    callback.onFullfilled && callback.onFullfilled();
  }
 

  async fetchPaymentType(callback: FetchCallback<CommonOptions[]>) {
    const res = await this.api.GET<EnumsModel[]>("/v1/enums/payment-type");
    if (!res?.status) {
      callback.onError(res.message);
    } else {
      if (res.data) callback.onSuccess(this.enumsFormatter(res.data));
    }
    callback.onFullfilled && callback.onFullfilled();
  }
  
  async fetchUsers(callback: FetchCallback<CommonOptions[]>) {
    const res = await this.api.GET<EnumsModel[]>("/users");
    if (!res?.status) {
      callback.onError(res.message);
    } else {
      if (res.data) callback.onSuccess(this.enumsFormatter(res.data));
    }
    callback.onFullfilled && callback.onFullfilled();
  }

  async fetchPaymentStatus(callback: FetchCallback<CommonOptions[]>) {
    const res = await this.api.GET<EnumsModel[]>("/v1/enums/payment-status");
    if (!res?.status) {
      callback.onError(res.message);
    } else {
      if (res.data) callback.onSuccess(this.enumsFormatter(res.data));
    }
    callback.onFullfilled && callback.onFullfilled();
  }
 
  enumsFormatter(enums: EnumsModel[]): CommonOptions[] {
    return enums.map((item) => ({
      value: item.id,
      label: item.name
    }));
  }
}