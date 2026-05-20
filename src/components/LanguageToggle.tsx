import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-3 py-2 bg-white text-[#11698E] rounded-lg border border-[#A2D5F2] hover:bg-[#F0F8FF] transition-colors"
      aria-label={t('toggleLanguage')}
      title={t('toggleLanguage')}
    >
      <Globe className="h-4 w-4 mr-2" />
      <span className="font-medium">
        {currentLanguage === 'fr' ? '🇬🇧 English' : '🇫🇷 Français'}
      </span>
    </button>
  );
};

export default LanguageToggle;