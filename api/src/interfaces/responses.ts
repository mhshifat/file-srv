export interface Response {
  status: number;
  success: boolean;
}

export interface SuccessResponse<IData> extends Response {
  data: IData;
}

export interface ErrorResponse extends Response {
  message: string;
  errors?: { path: string, message: string }[];
}
