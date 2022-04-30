import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { setSignInPassword } from "../../redux/forms/signInSlice";
import {
  setSignUpConfirmPassword,
  setSignUpEmail,
} from "../../redux/forms/signUpSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Input } from "../ui/input";

export const SignUpPage = () => {
  const { user, signUp } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const emailInput = useRef<Input>(null);
  const passwordInput = useRef<Input>(null);
  const confirmPasswordInput = useRef<Input>(null);

  if (!!user.email && !!user.password) return <Navigate to={"/"} />;

  const register = async () => {
    const isEmailValid = await emailInput.current?.validate();
    const isPasswordValid = await passwordInput.current?.validate();
    if (isEmailValid && isPasswordValid) {
    }
  };

  return (
    <main className="flex flex-col justify-center">
      <Input
        ref={emailInput}
        value={signUp.email}
        placeholder="Введите email"
        onChange={(value) => dispatch(setSignUpEmail(value))}
        validationSchema={Input.validation.email}
      />
      <Input
        ref={passwordInput}
        value={signUp.password}
        placeholder="Введите пароль"
        onChange={(value) => dispatch(setSignInPassword(value))}
        validationSchema={Input.validation.password}
      />
      <Input
        ref={confirmPasswordInput}
        value={signUp.confirmPassword}
        placeholder="Подтвердите пароль"
        onChange={(value) => dispatch(setSignUpConfirmPassword(value))}
        validationSchema={Input.validation.confirmPassword(signUp.password)}
      />
      <button
        className="rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white"
        onClick={register}
      >
        Регистрация
      </button>
    </main>
  );
};
