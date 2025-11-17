import { createContext, useContext, useState, useEffect } from "react";
import { login, signup } from "../services/usersApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // useState initialize the variable only once
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("authToken") === "true";
  });
  
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || null;
  });

  const signIn = async (username, password) => {
    const json = await login(username, password);
    localStorage.setItem("username", json.username);
    localStorage.setItem("authToken", "true");
    localStorage.setItem("token", json.token);
    setUsername(json.username);
    setAuthenticated(true);
    return json;
  };

  const signUp = async (username, password) => {
    const json = await signup(username, password);
    localStorage.setItem("username", json.username);
    localStorage.setItem("authToken", "true");
    localStorage.setItem("token", json.token);
    setUsername(json.username);
    setAuthenticated(true);
    return json;
  };

  const signOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    setUsername(null);
    setAuthenticated(false);
  };

  const value = {
    authenticated,
    username,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};