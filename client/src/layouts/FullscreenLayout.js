import { Outlet } from "react-router-dom";

export default function FullscreenLayout() {
  return (
    <div className="fullscreen-layout">
      <Outlet />
    </div>
  );
}