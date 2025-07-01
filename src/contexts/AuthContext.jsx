import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.find(u => u.role === 'admin')) {
      const adminUser = {
        id: uuidv4(),
        fullName: 'Admin User',
        email: 'admin@mohandz.com',
        phone: '+966509114525',
        password: 'password123', 
        role: 'admin',
      };
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userToStore = { id: foundUser.id, fullName: foundUser.fullName, email: foundUser.email, phone: foundUser.phone, role: foundUser.role };
      setUser(userToStore);
      sessionStorage.setItem('user', JSON.stringify(userToStore));
      return userToStore;
    }
    return null;
  };
  
  const register = (fullName, email, phone, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'البريد الإلكتروني مسجل مسبقاً.' };
    }
    if (users.some(u => u.phone === phone)) {
      return { success: false, message: 'رقم الجوال مسجل مسبقاً.' };
    }
    const newUser = {
      id: uuidv4(),
      fullName,
      email,
      phone,
      password, 
      role: 'client'
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const userToStore = { id: newUser.id, fullName: newUser.fullName, email: newUser.email, phone: newUser.phone, role: newUser.role };
    setUser(userToStore);
    sessionStorage.setItem('user', JSON.stringify(userToStore));
    return { success: true, user: userToStore };
  };
  
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}