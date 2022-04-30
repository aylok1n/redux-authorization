import { useRef } from "react";
import { Navigate } from "react-router-dom";
import {
  clearSignUp,
  registerMiddleware,
  setSignUpConfirmPassword,
  setSignUpEmail,
  setSignUpPassword,
} from "../../redux/forms/signUpSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  let navigate = useNavigate();
  const { user, signUp } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const emailInput = useRef<Input>(null);
  const passwordInput = useRef<Input>(null);
  const confirmPasswordInput = useRef<Input>(null);

  const register = async () => {
    const { email, password,error } = signUp;
    const isEmailValid = await emailInput.current?.validate();
    const isPasswordValid = await passwordInput.current?.validate();
    const isConfirmPasswordInput =
      await confirmPasswordInput.current?.validate();

    if (isEmailValid && isPasswordValid && isConfirmPasswordInput) {
      const resultAction = await dispatch(
        registerMiddleware({ password, email })
      );
      if (registerMiddleware.rejected.match(resultAction)) {
        toast.error(error);
      } else if (registerMiddleware.fulfilled.match(resultAction)) {
        toast.success("Регистрация успешна");
        setTimeout(() => {
          dispatch(clearSignUp());
          navigate("/ciplay/signIn");
        }, 1500);
      }
    }
  };

  if (!!user.email && !!user.password) return <Navigate to={"/ciplay"} />;

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
        onChange={(value) => dispatch(setSignUpPassword(value))}
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
        className={`rounded py-2 px-4 text-white ${
          signUp.loading ? "bg-grey" : "bg-blue-500 hover:bg-blue-700"
        }`}
        onClick={register}
        disabled={signUp.loading}
      >
        Регистрация
      </button>
    </main>
  );
};
