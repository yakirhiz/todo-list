import React from 'react'
import Auth from '../components/Auth';
import TodoList from '../components/TodoList';

export default function HomePage({ authenticated, setAuthenticated }) {
  return (
    <div className="home-page">
      {!authenticated ? <Auth setAuthenticated={setAuthenticated} /> : <TodoList setAuthenticated={setAuthenticated} />}
    </div>
  );
}