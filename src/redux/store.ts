import { configureStore } from "@reduxjs/toolkit";
import changePasswordSlice from "./forms/changePasswordSlice";
import signInSlice from "./forms/signInSlice";
import signUpSlice from "./forms/signUpSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    signIn: signInSlice,
    signUp: signUpSlice,
    changePassword: changePasswordSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
