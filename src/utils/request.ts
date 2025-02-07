import { checkResponse } from "./checkResponse";
import { API_BASE_URL } from "../constants";

export function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  return fetch(url, options).then(checkResponse<T>);
}
