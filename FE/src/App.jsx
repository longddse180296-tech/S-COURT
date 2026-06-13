import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import HomePage from "./pages/User/HomePage.jsx";
import RequireAuth from "./routes/RequireAuth.jsx";
import { useBootstrapApp } from "./hooks/useBootstrapApp";

const App = () => {
  useBootstrapApp();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route
        path="/user/home"
        element={
          <RequireAuth role="Player">
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/player/profile"
        element={
          <RequireAuth role="Player">
            <ProfilePage role="Player" />
          </RequireAuth>
        }
      />
      <Route
        path="/owner/profile"
        element={
          <RequireAuth role="VenueOwner">
            <ProfilePage role="VenueOwner" />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default App;
