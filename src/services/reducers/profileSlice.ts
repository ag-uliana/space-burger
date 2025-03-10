import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { request } from "../api/request";
import { refreshToken } from "./authSlice";
import { RootState } from "../store";

interface UserProfile {
  email: string;
  name: string;
}

interface ProfileState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  isLoading: false,
  error: null,
};

const selectProfile = (state: RootState) => state.profile;

export const selectIsProfileLoading = createSelector(
  [selectProfile],
  (profile) => profile.isLoading 
);

const getAccessToken = (state: RootState) => {
  const accessToken = state.auth.accessToken;
  if (!accessToken) throw new Error("Нет accessToken. Авторизация требуется.");
  return accessToken;
};

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      let accessToken = getAccessToken(getState() as RootState);

      let response = await request("/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      if (!response.success) {
        if (response.status === 401) {
          const refreshed = await dispatch(refreshToken()).unwrap();
          accessToken = refreshed.accessToken as string;

          response = await request("/auth/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${accessToken}`,
            },
          });
        } else {
          throw new Error(`Ошибка сервера: ${response.status ?? "Неизвестная ошибка"}`);
        }
      }

      return response.user as UserProfile;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка получения данных");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (updatedData: Partial<UserProfile>, { rejectWithValue, getState, dispatch }) => {
    try {
      let accessToken = getAccessToken(getState() as RootState);
      let response = await request("/auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.status === 401) {
        const refreshed = await dispatch(refreshToken()).unwrap();
        accessToken = refreshed.accessToken as string;

        response = await request("/auth/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
          body: JSON.stringify(updatedData),
        });
      }

      if (!response.success) {
        throw new Error(`Ошибка сервера: ${response.status ?? "Неизвестная ошибка"}`);
      }

      return response.user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Ошибка обновления профиля");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      });
  },
});

export default profileSlice.reducer;
