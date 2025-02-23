import { request } from "../api/request";

export const profileAPI = {
  fetchUserProfile: async (accessToken: string) => {
    return request("/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    });
  },

  updateUserProfile: async (accessToken: string, updatedData: Partial<{ email: string; name: string }>) => {
    return request("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(updatedData),
    });
  },
};
