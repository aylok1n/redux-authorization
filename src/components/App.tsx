import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const App = () => {
  const user = useAppSelector((state) => state.user);
  const isLoginned = !!user.email && !!user.password;

  return (
    <div className="flex items-center flex-col">
      <nav className="w-full py-5 bg-blue-500 shadow-lg shadow-blue-500/50 align-middle font-bold text-white mb-3 ">
        <Link className="self-start hover:text-cyan-100 float-left mx-2" to="/">
          Главная
        </Link>
        {!isLoginned && (
          <Link
            className="self-end hover:text-cyan-100 float-right mx-2"
            to="/signIn"
          >
            Авторизация
          </Link>
        )}
        {!isLoginned && (
          <Link
            className="self-end hover:text-cyan-100 float-right mx-2"
            to="/signUp"
          >
            Регистрация
          </Link>
        )}
        {isLoginned && (
          <Link
            className="self-end hover:text-cyan-100 float-right mx-2"
            to="/changePassword"
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
