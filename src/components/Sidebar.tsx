import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  BarChart3,
  Heart,
  Bell,
  Settings
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t, i18n } = useTranslation();

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'patients', label: t('patients'), icon: Users },
    { id: 'staff', label: t('staff'), icon: UserCheck },
    { id: 'appointments', label: t('appointments'), icon: Calendar },
    { id: 'analytics', label: t('analytics'), icon: BarChart3 },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="w-64 bg-[#11698E] text-white flex flex-col">
      <div className="p-6 border-b border-[#0e5a7a]">
        <div className="flex items-center">
          <Heart className="h-8 w-8 text-[#5CDB95]" />
          <span className="ml-2 text-xl font-bold">CuraOS</span>
        </div>
        <p className="text-[#A2D5F2] text-sm mt-1">Hospital Admin</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#5CDB95] text-[#11698E]'
                    : 'text-[#A2D5F2] hover:bg-[#0e5a7a] hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#0e5a7a]">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1 rounded-md text-sm ${
              i18n.language === 'en' ? 'bg-[#5CDB95] text-[#11698E]' : 'bg-[#0e5a7a] text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('fr')}
            className={`px-3 py-1 rounded-md text-sm ${
              i18n.language === 'fr' ? 'bg-[#5CDB95] text-[#11698E]' : 'bg-[#0e5a7a] text-white'
            }`}
          >
            Français
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button className="p-2 rounded-lg hover:bg-[#0e5a7a] transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-[#0e5a7a] transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;