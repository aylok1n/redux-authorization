import { Link, Route, Routes } from 'react-router-dom';
import '../styles/App.css';
import { ChangePasswordPage } from './pages/changePassword';
import { SignUpPage } from './pages/signUp';
import { SignInPage } from './pages/singnIn';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/signIn">Invoices</Link>
        <Link to="/signUp">Expenses</Link>
        <Link to="/changePassword">Expenses</Link>
      </nav>
      <Routes>
        <Route path="signIn" element={<SignInPage />} />
        <Route path="signUp" element={<SignUpPage />} />
        <Route path="changePassword" element={<ChangePasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
