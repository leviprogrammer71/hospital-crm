import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, Lock, Unlock, FileText } from 'lucide-react';

interface PlanObservationsFormProps {
  initialData?: {
    plan?: string;
    observations?: string;
    isConfidential?: boolean;
  };
  onSubmit: (data: {
    plan: string;
    observations: string;
    isConfidential: boolean;
  }) => void;
}

const PlanObservationsForm: React.FC<PlanObservationsFormProps> = ({
  initialData = {},
  onSubmit
}) => {
  const { t } = useTranslation();
  const [plan, setPlan] = useState(initialData.plan || '');
  const [observations, setObservations] = useState(initialData.observations || '');
  const [isConfidential, setIsConfidential] = useState(initialData.isConfidential || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      plan,
      observations,
      isConfidential
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#11698E] flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            {t('planObservations')}
          </h2>
          <button
            type="button"
            onClick={() => setIsConfidential(!isConfidential)}
            className={`p-1 rounded-full ${isConfidential ? 'text-red-500' : 'text-gray-400'}`}
            title={isConfidential ? 'Confidential' : 'Not confidential'}
          >
            {isConfidential ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-[#11698E] mb-1 font-medium">{t('treatmentPlan')}</label>
          <textarea
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
            rows={5}
            placeholder={t('treatmentPlanPlaceholder')}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {t('language') === 'fr'
              ? "Détaillez le plan de traitement pour le patient"
              : "Detail the treatment plan for the patient"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-[#11698E] mb-1 font-medium">{t('observations')}</label>
          <textarea
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
            rows={5}
            placeholder={t('observationsPlaceholder')}
          />
          <p className="text-xs text-gray-500 mt-1">
            {t('language') === 'fr'
              ? "Ajoutez des observations supplémentaires ou des notes de suivi"
              : "Add additional observations or follow-up notes"}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="confidential-plan"
              checked={isConfidential}
              onChange={(e) => setIsConfidential(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="confidential-plan" className="text-[#11698E]">
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
      </div>
    </form>
  );
};

export default PlanObservationsForm;