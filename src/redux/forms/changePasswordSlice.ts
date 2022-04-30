import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChangePasswordState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  loading: boolean;
  error: string | null;
}

const initialState: ChangePasswordState = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  loading: false,
  error: null,
};

export const changePasswordMiddleware = createAsyncThunk(
  "api/changePassword",
  async (body: { oldPassword: string; newPassword: string }, thunkApi) => {
    try {
      const response = await fetch(
        "https://626d5fb8e58c6fabe2d4a8a1.mockapi.io/changePassword",
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      if (response.status === 400) {
        return thunkApi.rejectWithValue(data);
      } else return { body, data };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    setOldPassword: (state, action: PayloadAction<string>) => {
      state.oldPassword = action.payload;
    },
    setNewPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },
    setConfirmNewPassword: (state, action: PayloadAction<string>) => {
      state.confirmNewPassword = action.payload;
    },
    clearChangePassword: (state) => {
      state.oldPassword = "";
      state.newPassword = "";
      state.confirmNewPassword = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changePasswordMiddleware.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changePasswordMiddleware.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Ошибка сервера";
    });
    builder.addCase(changePasswordMiddleware.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  setOldPassword,
  setConfirmNewPassword,
  setNewPassword,
  clearChangePassword,
} = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
