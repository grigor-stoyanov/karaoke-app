import { useSyncQueue } from './Hooks/useSyncQueue';
import { useSyncAdmins } from './Hooks/useSyncAdmins';
import AdminLogin from './Pages/AdminLoginPage';
import AdminDashboard from './Pages/AdminDashboardPage';
import UserLogin from './Pages/UserLoginPage';
import SongSearchPage from './Pages/SongSearchPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAdminCheck } from './Hooks/useAdminCheck';
export default function App() {
  useSyncQueue();
  useSyncAdmins();
  const { isAdmin } = useAdminCheck();

  return (
    <BrowserRouter>
      <Routes>
        {/* Root path - no chance of loops */}
        <Route path="/" element={
          isAdmin
            ? <Navigate to="/admin/dashboard" replace />
            : <Navigate to="/login" replace />
        } />

        {/* Login path - only show UserLogin if no nickname exists */}
        <Route path="/login" element={
          sessionStorage.getItem('userNickname')
            ? <Navigate to="/queue" replace />
            : <UserLogin />
        } />

        {/* Protected admin route */}
        <Route path="/admin/dashboard" element={
          isAdmin ? <AdminDashboard /> : <Navigate to="/admin" replace />
        } />

        {/* Protected user route */}
        <Route path="/queue" element={
          sessionStorage.getItem('userNickname')
            ? <SongSearchPage />
            : <Navigate to="/login" replace state={{ from: 'queue' }} />
        } />

        {/* Fallback - no loop risk */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}