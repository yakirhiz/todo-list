import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";

export default function Main({ authenticated, setAuthenticated }) {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage authenticated={authenticated} setAuthenticated={setAuthenticated} />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </main>
  );
}