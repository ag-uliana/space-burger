import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { request } from "../api";
import { authAPI } from "../api/authAPI";

interface AuthState {
  user: { email: string; name: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const savedUser = localStorage.getItem("user");
const savedRefreshToken = localStorage.getItem("refreshToken");

const selectAuth = (state: RootState) => state.auth;
export const selectUser = createSelector(
  [selectAuth],
  (auth) => auth.user
);

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  accessToken: null,
  refreshToken: savedRefreshToken || null,
  isLoading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }: { email: string; password: string; name?: string }, { rejectWithValue }) => {
    try {
      const data = await authAPI.register(email, password, name);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка при регистрации");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(email, password);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка входа");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue, getState }) => {
  try {
    const state: RootState = getState() as RootState;
    const refreshToken = state.auth.refreshToken || localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Нет refreshToken. Пользователь не авторизован.");

    await authAPI.logout();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    return true;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Ошибка выхода");
  }
});

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) throw new Error("Нет refreshToken");

      const data = await request("/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: storedRefreshToken }),
      });

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Ошибка обновления токена");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user ?? null;
        state.accessToken = action.payload.accessToken ?? null;

        if (action.payload.refreshToken) {
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user ?? null;
        state.accessToken = action.payload.accessToken ?? null;
        state.refreshToken = action.payload.refreshToken ?? null;

        if (action.payload.refreshToken) {
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken ?? null;
        state.refreshToken = action.payload.refreshToken ?? null;

        if (action.payload.accessToken) {
          localStorage.setItem("accessToken", action.payload.accessToken);
        }
        if (action.payload.refreshToken) {
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { updateAuthUser } = authSlice.actions;
export default authSlice.reducer;
