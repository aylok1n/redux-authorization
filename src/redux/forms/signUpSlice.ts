import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpState {
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string | null;
}

const initialState: SignUpState = {
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
  error: null,
};

export const registerMiddleware = createAsyncThunk(
  "api/register",
  async (body: { email: string; password: string }, thunkApi) => {
    try {
      const response = await fetch(
        "https://626d5fb8e58c6fabe2d4a8a1.mockapi.io/register",
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

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setSignUpEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSignUpPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setSignUpConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    clearSignUp: (state) => {
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerMiddleware.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerMiddleware.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Ошибка сервера";
    });
    builder.addCase(registerMiddleware.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  setSignUpEmail,
  setSignUpPassword,
  setSignUpConfirmPassword,
  clearSignUp,
} = signUpSlice.actions;

export default signUpSlice.reducer;
