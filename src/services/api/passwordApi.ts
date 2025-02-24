import { request, ApiResponse } from "./request";
import { API_BASE_URL } from "../../constants";

export interface AuthResponse extends ApiResponse {
  accessToken: string;
  refreshToken?: string;
  user: { email: string; name: string };
}

export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  return request(`${API_BASE_URL}/password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
  });
};
  
export const resetPassword = async (password: string, token: string): Promise<ApiResponse> => {
  return request(`${API_BASE_URL}/password-reset/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
  });
};
