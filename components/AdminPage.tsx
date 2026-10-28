import { useAuth } from '../hooks/useAuth';
import AdminLogin from './AdminLogin';
import AdminGalleryManager from './AdminGalleryManager';

const AdminPage = () => {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading admin...</div>;
  return isAuthenticated ? <AdminGalleryManager onLogout={logout} /> : <AdminLogin onLogin={login} />;
};

export default AdminPage;
