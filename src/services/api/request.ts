import { checkResponse } from "../../utils/checkResponse";
import { API_BASE_URL } from "../../constants";

export interface ApiResponse {
  success: boolean;
  message: string;
  status?: number;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    email: string;
    name: string;
  };
}

export async function request<T = ApiResponse>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, options);

  return checkResponse(response) as Promise<T>;
}
