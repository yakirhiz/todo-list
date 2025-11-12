import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

import MainLayout from "../layouts/MainLayout";
import FullscreenLayout from "../layouts/FullscreenLayout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function Main({ authenticated, setAuthenticated, username, signOut }) {
  return (
    <Routes>
      <Route element={<MainLayout authenticated={authenticated} username={username} signOut={signOut} />}>
        {/* Always Accessible Routes */}
        <Route path="/" element={<HomePage authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage setAuthenticated={setAuthenticated} />} />
          <Route path="/settings" element={<SettingsPage setAuthenticated={setAuthenticated} />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<FullscreenLayout />}>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
        </Route>
      </Route>
    </Routes>
  );
}