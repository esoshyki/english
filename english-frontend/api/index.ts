import axios, { AxiosResponse, AxiosError } from "axios";
import { getError, getHeader } from "./helpers";
import { LoginResponse, LoginData, ApiResponse, User } from "./types";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
});

console.log(process.env.NEXT_PUBLIC_BACKEND);

export enum URLS {
  login = "auth/login",
  profile = "profile",
}

export const api = {
  login: async (data: LoginData): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response: AxiosResponse<LoginResponse> = await instance(
        URLS.login,
        { data, method: "POST" }
      );
      return {
        data: response.data,
        statusCode: response.status
      };
    } catch (err: any) {
      return getError(err);
    }
  },
  getProfile: async (token: string | null): Promise<ApiResponse<User>> => {
    try {
      const response: AxiosResponse<User> = await instance(
        URLS.profile,
        { method: "GET", headers: getHeader(token) }
      );
      return {
        data: response.data,
        statusCode: response.status
      };
    } catch (err: any) {
      return getError(err);
    }
  },
};
