import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminLogin from './AdminLogin';
import AdminGalleryManager from './AdminGalleryManager';

const AdminPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showManager, setShowManager] = useState(false);

  useEffect(() => {
    setShowManager(isAuthenticated);
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!showManager) {
    return <AdminLogin onLoginSuccess={() => setShowManager(true)} />;
  }

  return <AdminGalleryManager />;
};

export default AdminPage;