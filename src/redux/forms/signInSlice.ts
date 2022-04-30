import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignInState {
  email: string;
  password: string;
}

const initialState: SignInState = {
  email: "",
  password: "",
};

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
});

export const { setSignInEmail, setSignInPassword, clearSignIn } =
  signInSlice.actions;

export default signInSlice.reducer;
