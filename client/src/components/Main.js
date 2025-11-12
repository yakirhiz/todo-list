import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function Main({ authenticated, setAuthenticated }) {
  return (
    <main className="main">
      <Routes>
        {/* Always Accessible Routes */}
        <Route path="/" element={<HomePage authenticated={authenticated} setAuthenticated={setAuthenticated} />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>

        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />}></Route>
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage setAuthenticated={setAuthenticated} />}></Route>
          <Route path="/settings" element={<SettingsPage setAuthenticated={setAuthenticated} />}></Route>
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </main>
  );
}