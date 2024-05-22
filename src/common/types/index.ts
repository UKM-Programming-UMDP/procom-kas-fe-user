export type APIResponse<T = void> = {
  status: boolean;
  status_code: number;
  message: string;
  errors: APIFieldError[];
  data: T;
  pagination?: PaginationType;
} | null;

export type FilterType = {
  page?: number;
  limit?: number;
  order_by?: "desc" | "asc";
  sort?: string;
};

export type PaginationType = {
  total_pages: number;
  total_items: number;
};

export type APIFieldError = {
  field: string;
  message: string;
};

export type AppType = "home" | "payed kas" | "balance" | "balance history";

export type AppList = {
  displayName: string;
  icon: JSX.Element;
  appName: AppType;
};
