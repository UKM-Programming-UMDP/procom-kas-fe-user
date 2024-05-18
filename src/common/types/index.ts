export type APIResponse<T = void> = {
  status: boolean;
  status_code: number;
  message: string;
  errors: APIFieldError[];
  data: T;
} | null;

export type APIFieldError = {
  field: string;
  message: string;
};

export type AppType = "home" | "payed kas" | "balance";

export type AppList = {
  displayName: string;
  icon: JSX.Element;
  appName: AppType;
};
