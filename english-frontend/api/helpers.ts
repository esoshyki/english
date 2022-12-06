import { AxiosError } from "axios";
import { ApiResponse } from "./types";

export const getError = (err: AxiosError): ApiResponse<any> => {
  console.log(err);
  return {
    data: null,
    statusCode: err.response?.status ?? 500,
    error: {
      code: err.response?.status ?? 500,
      message: err.message,
    },
  };
};

export const getHeader = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
});
