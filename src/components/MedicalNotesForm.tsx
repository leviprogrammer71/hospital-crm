import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Lock, Unlock } from 'lucide-react';

interface MedicalNotesFormProps {
  initialData?: {
    chiefComplaints?: string;
    physicalExam?: string;
    isConfidential?: boolean;
  };
  onSubmit: (data: {
    chiefComplaints: string;
    physicalExam: string;
    isConfidential: boolean;
  }) => void;
}

const MedicalNotesForm: React.FC<MedicalNotesFormProps> = ({ 
  initialData = {}, 
  onSubmit 
}) => {
  const { t } = useTranslation();
  const [chiefComplaints, setChiefComplaints] = useState(initialData.chiefComplaints || '');
  const [physicalExam, setPhysicalExam] = useState(initialData.physicalExam || '');
  const [isConfidential, setIsConfidential] = useState(initialData.isConfidential || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      chiefComplaints,
      physicalExam,
      isConfidential
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-[#11698E] font-medium">{t('chiefComplaints')}</label>
          <button
            type="button"
            onClick={() => setIsConfidential(!isConfidential)}
            className={`p-1 rounded-full ${isConfidential ? 'text-red-500' : 'text-gray-400'}`}
            title={isConfidential ? 'Confidential' : 'Not confidential'}
          >
            {isConfidential ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          </button>
        </div>
        <textarea
          value={chiefComplaints}
          onChange={(e) => setChiefComplaints(e.target.value)}
          className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
          rows={4}
          placeholder={t('chiefComplaints')}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {t('language') === 'fr' 
            ? "Notez les symptômes principaux et les préoccupations du patient" 
            : "Note the patient's main symptoms and concerns"}
        </p>
      </div>

      <div>
        <label className="block text-[#11698E] mb-1 font-medium">{t('physicalExam')}</label>
        <textarea
          value={physicalExam}
          onChange={(e) => setPhysicalExam(e.target.value)}
          className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
          rows={6}
          placeholder={t('physicalExam')}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {t('language') === 'fr'
            ? "Documentez les résultats de l'examen physique"
            : "Document physical examination findings"}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="confidential"
            checked={isConfidential}
            onChange={(e) => setIsConfidential(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="confidential" className="text-[#11698E]">
            {t('language') === 'fr' ? "Confidentiel" : "Confidential"}
          </label>
        </div>
        <button
          type="submit"
          className="bg-[#11698E] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0e5a7a] transition-colors flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          {t('language') === 'fr' ? "Enregistrer" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default MedicalNotesForm;