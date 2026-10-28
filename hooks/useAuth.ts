import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/session')
      .then(response => response.json())
      .then(data => setIsAuthenticated(Boolean(data.authenticated)))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'Unable to sign in');
    }
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isLoading, login, logout };
};
