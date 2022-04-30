import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignInState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

const initialState: SignInState = {
  email: "",
  password: "",
  loading: false,
  error: null,
};

export const loginMiddleware = createAsyncThunk(
  "api/login",
  async (body: { email: string; password: string }, thunkApi) => {
    try {
      const response = await fetch(
        "https://626d5fb8e58c6fabe2d4a8a1.mockapi.io/login",
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

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    setSignInEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSignInPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    clearSignIn: (state) => {
      state.email = "";
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginMiddleware.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginMiddleware.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Ошибка сервера";
    });
    builder.addCase(loginMiddleware.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
  },
});

export const { setSignInEmail, setSignInPassword, clearSignIn } =
  signInSlice.actions;

export default signInSlice.reducer;
