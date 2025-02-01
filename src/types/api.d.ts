export interface APIInstanceInterface {
    GET<T>(path: string, params?: FetchParams): Promise<APIResponse<T>>;
    POST<T, U = T>(path: string, data: T): Promise<APIResponse<U>>;
    PUT<T, U = T>(path: string, data: T): Promise<APIResponse<U>>;
    DELETE<T>(path: string): Promise<APIResponse<T>>;
    POSTFORM<T>(path: string, data: File): Promise<APIResponse<T>>;
  }
  
  export type APIResponse<T = void> = {
    status: boolean;
    status_code: number;
    message: string;
    errors: APIFieldError[];
    data: T;
    pagination: Pagination;
  };
  
  export type APIFieldError = {
    field: string;
    message: string;
  };
  
  export type FetchParams = {
    params: {
      [key: string]: string | number;
    };
  };
  
  export type Pagination = {
    page: number;
    limit: number;
    total_pages: number;
    total_items: number;
  };
  