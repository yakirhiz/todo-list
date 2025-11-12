import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ authenticated, username, signOut }) {
  return (
    <div className="main-layout">
      <Header  authenticated={authenticated} username={username} signOut={signOut} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}