import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function PublicRoute() {
  const { authenticated } = useAuthContext();

  // If user is authenticated, redirect to home page
  // Otherwise, allow access to the public routes
  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
}