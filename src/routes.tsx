import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import FrontDesk from './pages/FrontDesk';
import Pharmacy from './pages/Pharmacy';
import NurseDashboard from './pages/NurseDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminPanel from './pages/AdminPanel';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/frontdesk" element={<ProtectedRoute role="receptionist"><FrontDesk /></ProtectedRoute>} />
      <Route path="/pharmacy" element={<ProtectedRoute role="pharmacy"><Pharmacy /></ProtectedRoute>} />
      <Route path="/nurse" element={<ProtectedRoute role="nurse"><NurseDashboard /></ProtectedRoute>} />
      <Route path="/doctor" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default AppRoutes;
