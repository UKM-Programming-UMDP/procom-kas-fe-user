export type APIResponse<T = void> = {
  status: boolean;
  status_code: number;
  message: string;
  errors: APIFieldError[];
  data: T;
  pagination?: PaginationType;
} | null;

export type PaginationType = {
  page: number;
  limit: number;
  total_items?: number;
  total_pages?: number;
  order_by: "desc" | "asc";
  sort: string;
};

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
