export interface ApiSuccessResponse<D> {
  code: string;
  message: string;
  data: D;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  data?: null;
}

export type ApiResponse<D> = ApiSuccessResponse<D> | ApiErrorResponse;
