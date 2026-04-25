'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { adminApi } from './admin-api';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

interface AuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  admin: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false, message: '' }),
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = adminApi.getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    adminApi.get<AdminUser>('/auth/me').then((res) => {
      if (res.success && res.data) setAdmin(res.data);
      else adminApi.clearTokens();
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const res = await adminApi.login(email, password);
    if (res.success && res.data) {
      setAdmin(res.data.admin);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const logout = async () => {
    await adminApi.logout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, isLoading, isAuthenticated: !!admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
