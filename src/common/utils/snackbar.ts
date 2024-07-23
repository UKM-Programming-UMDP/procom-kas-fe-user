import { APIResponse } from "@types";

export function errMessage(err: APIResponse<object>): string {
  if (err?.message) {
    return err?.message;
  } else {
    return "Oops, an error occurred. Please try again later.";
  }
}
