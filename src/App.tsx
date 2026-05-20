import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import Staff from './components/Staff';
import Appointments from './components/Appointments';
import Analytics from './components/Analytics';
import Login from './components/Login';
import LanguageToggle from './components/LanguageToggle';
import { useTranslation } from 'react-i18next';


function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patients />;
      case 'staff':
        return <Staff />;
      case 'appointments':
        return <Appointments />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-4 flex justify-end">
          <LanguageToggle />
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;