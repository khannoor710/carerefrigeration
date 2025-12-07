import { useState, useEffect, useCallback } from 'react';
import { AdminSession } from '../types';

const ADMIN_SESSION_KEY = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// IMPORTANT: This is basic client-side protection only, not security-critical
// For real security, implement proper backend authentication
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'CareRefrig2024!',
};

/**
 * Custom hook for admin authentication
 */
export const useAuth = () => {
  const [session, setSession] = useState<AdminSession>({
    isAuthenticated: false,
    expiresAt: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem(ADMIN_SESSION_KEY);
    if (storedSession) {
      try {
        const parsedSession: AdminSession = JSON.parse(storedSession);
        if (parsedSession.expiresAt > Date.now()) {
          setSession(parsedSession);
        } else {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      } catch (error) {
        console.error('Error parsing session:', error);
        localStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Login with username and password
   */
  const login = useCallback((username: string, password: string): boolean => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const newSession: AdminSession = {
        isAuthenticated: true,
        expiresAt: Date.now() + SESSION_DURATION,
      };
      setSession(newSession);
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(newSession));
      return true;
    }
    return false;
  }, []);

  /**
   * Logout and clear session
   */
  const logout = useCallback(() => {
    setSession({
      isAuthenticated: false,
      expiresAt: 0,
    });
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }, []);

  return {
    isAuthenticated: session.isAuthenticated,
    isLoading,
    login,
    logout,
  };
};