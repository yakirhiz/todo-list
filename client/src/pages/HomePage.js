import React from 'react'
import LandingPage from './LandingPage';
import TodoList from '../components/TodoList';

export default function HomePage({ authenticated, setAuthenticated }) {
  return (
    <div className="home-page">
      {!authenticated ? <LandingPage /> : <TodoList />}
    </div>
  );
}