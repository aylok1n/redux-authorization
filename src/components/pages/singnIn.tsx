import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  clearSignIn,
  loginMiddleware,
  setSignInEmail,
  setSignInPassword,
} from "../../redux/forms/signInSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Input } from "../ui/input";
import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const SignInPage = () => {
  let navigate = useNavigate();
  const { user, signIn } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const emailInput = useRef<Input>(null);
  const passwordInput = useRef<Input>(null);

  if (!!user.email && !!user.password) return <Navigate to={"/"} />;

  const logIn = async () => {
    const { email, password, error } = signIn;
    const isEmailValid = await emailInput.current?.validate();
    const isPasswordValid = await passwordInput.current?.validate();

    if (isEmailValid && isPasswordValid) {
      const resultAction = await dispatch(loginMiddleware({ password, email }));
      if (loginMiddleware.rejected.match(resultAction)) {
        toast.error(error);
      } else if (loginMiddleware.fulfilled.match(resultAction)) {
        toast.success("Вы вошли в систему");
        setTimeout(() => {
          dispatch(clearSignIn());
          dispatch(login({ password, email }));
          navigate("/");
        }, 1500);
      }
    }
  };

  return (
    <main className="flex flex-col justify-center">
      <Input
        ref={emailInput}
        value={signIn.email}
        placeholder="Введите email"
        onChange={(value) => dispatch(setSignInEmail(value))}
        validationSchema={Input.validation.email}
      />
      <Input
        ref={passwordInput}
        value={signIn.password}
        placeholder="Введите пароль"
        onChange={(value) => dispatch(setSignInPassword(value))}
        validationSchema={Input.validation.password}
      />
      <button
        className={`rounded py-2 px-4 text-white ${
          signIn.loading ? "bg-grey" : "bg-blue-500 hover:bg-blue-700"
        }`}
        onClick={logIn}
      >
        Войти
      </button>
    </main>
  );
};
