import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { api } from "../api";
import { LoginData } from "../api/types";
import {
  resetApi,
  setLogingError,
  setLogingStatus,
  setToken,
} from "../store/auth";
import { ApiState, UserData } from "../types";

export const useAuth = () => {
  const { token, status, error } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const [profileState, setProfileState] = useState<ApiState<UserData>>({
    data: null,
    status: "idle",
    statusCode: null,
  });

  const login = async (data: LoginData) => {
    dispatch(setLogingStatus("pending"));
    const result = await api.login(data);
    if (result.error?.message) {
      dispatch(setLogingError(result.error.message));
      dispatch(setLogingStatus("error"));
    } else if (result.data?.access_token) {
      dispatch(setToken(result.data?.access_token));
      dispatch(setLogingStatus("success"));
    }
  };

  const getProfile = async () => {
    setProfileState((prev) => ({ ...prev, status: "pending" }));
    const result = await api.getProfile(token);

    if (result.error?.message) {
      setProfileState((prev) => ({
        ...prev,
        data: null,
        status: "error",
        error: result.error?.message,
        statusCode: result.statusCode,
      }));
    } else if (result.data) {
      setProfileState(() => ({
        data: result.data,
        status: "success",
        statusCode: 200,
      }));
    }
  };

  const _resetApi = useCallback(() => {
    dispatch(resetApi());
  }, [dispatch, resetApi]);

  return {
    token,
    status,
    error,
    login,
    getProfile,
    profileState,
    resetApi: _resetApi,
  };
};
