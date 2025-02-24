import { request } from "../api/request";

export const authAPI = {
  register: (email: string, password: string, name?: string) =>
    request("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email: string, password: string) =>
    request("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }),

  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Нет refreshToken. Пользователь не авторизован.");

    await request("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });

    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  refreshToken: async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) throw new Error("Нет refreshToken");

    const data = await request("/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: storedRefreshToken }),
    });

    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    } else {
      throw new Error("Сервер не вернул refreshToken");
    }

    return data;
  },
};
