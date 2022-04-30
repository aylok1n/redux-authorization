import { Toaster } from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/userSlice";

const App = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isLoginned = !!user.email && !!user.password;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center flex-col">
      <Toaster position="top-right" />
      <nav className="w-full py-5 bg-blue-500 shadow-lg shadow-blue-500/50 align-middle font-bold text-white mb-3 ">
        <Link className="self-start hover:text-cyan-100 float-left mx-2" to="/ciplay">
          Главная
        </Link>
        {!isLoginned && (
          <Link
            className="self-end hover:text-cyan-100 float-right mx-2"
            to="/ciplay/signIn"
          >
            Авторизация
          </Link>
        )}
        {!isLoginned && (
          <Link
            className="self-end hover:text-cyan-100 float-right mx-2"
            to="/ciplay/signUp"
          >
            Регистрация
          </Link>
        )}
        {isLoginned && (
          <span
            className="self-end cursor-pointer text-red-500 hover:text-red-700 float-right mx-2"
            onClick={handleLogout}
          >
            Выйти
          </span>
        )}
        {isLoginned && (
          <Link
            className="self-end hover:text-cyan-100 float-right mx-2"
            to="/ciplay/changePassword"
          >
            Сменить пароль
          </Link>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
