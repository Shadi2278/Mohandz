import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, full_name, phone')
        .eq('id', authUser.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is okay for a moment
        throw error;
      }

      const userData = {
        ...authUser,
        ...profile,
      };
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(authUser); // Fallback to auth user data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await fetchUserProfile(session?.user ?? null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await fetchUserProfile(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  const login = useCallback(async (email, password) => {
    const response = await supabase.auth.signInWithPassword({ email, password });
    return response;
  }, []);

  const register = useCallback(async (fullName, email, phone, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: 'client'
        },
      },
    });
    return { data, error };
  }, []);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
    fetchUserProfile,
  }), [user, loading, login, register, logout, fetchUserProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};