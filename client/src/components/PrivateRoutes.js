import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function PrivateRoutes() {
  const { authenticated } = useAuthContext();
  const location = useLocation();

  // If logged in, render child routes; otherwise redirect to /
  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};