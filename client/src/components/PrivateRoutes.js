import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoutes() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const location = useLocation();

  // If logged in, render child routes; otherwise redirect to /
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};