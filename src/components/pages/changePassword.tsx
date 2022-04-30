import { useRef } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Input } from "../ui/input";
import {
  changePasswordMiddleware,
  clearChangePassword,
  setConfirmNewPassword,
  setNewPassword,
  setOldPassword,
} from "../../redux/forms/changePasswordSlice";

export const ChangePasswordPage = () => {
  const { user, changePassword } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const oldPasswordInput = useRef<Input>(null);
  const newPasswordInput = useRef<Input>(null);
  const confirmNewPasswordInput = useRef<Input>(null);

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, error } = changePassword;

    const isOldPasswordValid = await oldPasswordInput.current?.validate();
    const isNewPasswordValid = await newPasswordInput.current?.validate();
    const isConfirmPasswordValid =
      await confirmNewPasswordInput.current?.validate();

    if (isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid) {
      const resultAction = await dispatch(
        changePasswordMiddleware({ oldPassword, newPassword })
      );
      if (changePasswordMiddleware.rejected.match(resultAction)) {
        toast.error(error);
      } else if (changePasswordMiddleware.fulfilled.match(resultAction)) {
        toast.success("Пароль изменен");
        dispatch(clearChangePassword());
      }
    }
  };

  if (!user.email || !user.password) return <Navigate to={"/"} />;

  return (
    <main className="flex flex-col justify-center">
      <Input
        ref={oldPasswordInput}
        value={changePassword.oldPassword}
        placeholder="Введите страрый пароль"
        onChange={(value) => dispatch(setOldPassword(value))}
        validationSchema={Input.validation.password}
      />
      <Input
        ref={newPasswordInput}
        value={changePassword.newPassword}
        placeholder="Введите новый пароль"
        onChange={(value) => dispatch(setNewPassword(value))}
        validationSchema={Input.validation.password}
      />
      <Input
        ref={confirmNewPasswordInput}
        value={changePassword.confirmNewPassword}
        placeholder="Повторите новый пароль"
        onChange={(value) => dispatch(setConfirmNewPassword(value))}
        validationSchema={Input.validation.confirmPassword(
          changePassword.newPassword
        )}
      />
      <button
        className={`rounded py-2 px-4 text-white ${
          changePassword.loading ? "bg-grey" : "bg-blue-500 hover:bg-blue-700"
        }`}
        onClick={handleChangePassword}
      >
        Войти
      </button>
    </main>
  );
};
