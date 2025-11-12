import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute(/* { authenticated } */) {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  // If user is authenticated, redirect to home page
  // Otherwise, allow access to the public routes
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}