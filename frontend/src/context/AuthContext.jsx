import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const API = import.meta.env.VITE_API_BASE_URL || 'https://coffee-shop-bs3a.onrender.com';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('drk_user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('drk_token'));

  useEffect(() => {
    if (user) localStorage.setItem('drk_user', JSON.stringify(user)); else localStorage.removeItem('drk_user');
    if (token) localStorage.setItem('drk_token', token); else localStorage.removeItem('drk_token');
  }, [user, token]);

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    setUser({ _id: data._id, name: data.name, email: data.email, phone: data.phone || '', address: data.address || '', isAdmin: data.isAdmin });
    setToken(data.token);
  };

  const register = async (payload) => {
    const res = await fetch(`${API}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error('Register failed');
    const data = await res.json();
    setUser({ _id: data._id, name: data.name, email: data.email, phone: data.phone || '', address: data.address || '', isAdmin: data.isAdmin });
    setToken(data.token);
  };

  const updateProfile = async (payload) => {
    const res = await fetch(`${API}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Update failed');
    const data = await res.json();
    setUser({ _id: data._id, name: data.name, email: data.email, phone: data.phone || '', address: data.address || '', isAdmin: data.isAdmin });
    return data;
  };

  const logout = () => { setUser(null); setToken(null); };

  const authFetch = (url, opts={}) => {
    return fetch(`${API}${url}`, { ...opts, headers: { 'Content-Type': 'application/json', ...(opts.headers||{}), ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
  };

  return <AuthContext.Provider value={{ user, token, login, register, logout, authFetch, updateProfile }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
