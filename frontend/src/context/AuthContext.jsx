import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { supabase } from '../api/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync Supabase Auth state with our Context
  useEffect(() => {
    const syncAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        localStorage.setItem('token', session.access_token);
        // Verify/Get Profile from backend or Supabase
        try {
          const { data } = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${session.access_token}` }
          });
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        } catch (err) {
          console.error("Failed to sync profile:", err);
        }
      }
      setLoading(false);
    };

    syncAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth Event:", event);
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        localStorage.setItem('token', session.access_token);
        try {
          const { data } = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${session.access_token}` }
          });
          console.log("Synced User Data from API:", data.user);
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        } catch (err) {
          console.error("Failed to sync profile:", err);
        }
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/home'
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error("Google Login Error:", err);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
