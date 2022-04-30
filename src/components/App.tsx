import { Link, Outlet } from 'react-router-dom';
import '../styles/App.css';

const App = () => {
  return (
    <div className="App">
      <nav>
        <Link to="/">main</Link>
        <Link to="/signIn">signIn</Link>
        <Link to="/signUp">signUp</Link>
        <Link to="/changePassword">changePassword</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
