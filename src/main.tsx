import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes.tsx';
import './index.css';
import './i18n'; // Import the i18n configuration
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </I18nextProvider>
  </StrictMode>
);
