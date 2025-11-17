import React from 'react'
import LandingPage from './LandingPage';
import TodoList from '../components/TodoList';
import { useAuthContext } from '../contexts/AuthContext';

export default function HomePage() {
  const { authenticated } = useAuthContext();

  return (
    <div className="home-page">
      {!authenticated ? <LandingPage /> : <TodoList />}
    </div>
  );
}