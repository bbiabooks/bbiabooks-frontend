"use client";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userKey, setUserKey] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (newToken, newUserKey, newUserId) => {
    setToken(newToken);
    setUserKey(newUserKey);
    setUserId(newUserId);
    localStorage.setItem('authToken', newToken); // Store the token in local storage
    localStorage.setItem('userKey', newUserKey); // Store the userKey in local storage
    localStorage.setItem('userId', newUserId); // Store the userId in local storage
  };

  const logout = () => {
    setToken(null);
    setUserKey(null);
    setUserId(null);
    localStorage.removeItem('authToken'); // Remove the token from local storage
    localStorage.removeItem('userKey'); // Remove the userKey from local storage
    localStorage.removeItem('userId'); // Remove the userId from local storage
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUserKey = localStorage.getItem('userKey');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken && storedUserKey && storedUserId) {
      setToken(storedToken);
      setUserKey(storedUserKey);
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    console.log("Stored token:", token); // Check if the token is being stored
    console.log("Stored userKey:", userKey); // Check if the userKey is being stored
    console.log("Stored userId:", userId); // Check if the userKey is being stored
  }, [token, userKey, userId]);

  return (
    <AuthContext.Provider value={ { token, login, logout, userKey, userId } }>
      { children }
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
