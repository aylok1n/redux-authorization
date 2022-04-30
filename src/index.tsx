import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './components/App';
import { SignInPage } from './components/pages/singnIn';
import { SignUpPage } from './components/pages/signUp';
import { ChangePasswordPage } from './components/pages/changePassword';
import { NotFoundPage } from './components/pages/notFound';
import { WelcomePage } from './components/pages/welcome';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<WelcomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/changePassword" element={<ChangePasswordPage />} />
          <Route
            path="*"
            element={<NotFoundPage />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);