import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VitalsForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const { t } = useTranslation();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bloodPressureSystolic, setBloodPressureSystolic] = useState('');
  const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [oxygenSaturation, setOxygenSaturation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      height,
      weight,
      temperature,
      bloodPressure: `${bloodPressureSystolic}/${bloodPressureDiastolic}`,
      heartRate,
      respiratoryRate,
      oxygenSaturation,
      notes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#11698E] mb-1">{t('height')} (cm)</label>
          <input
            type="number"
            value={height}
            onChange={e => setHeight(e.target.value)}
            className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
            required
            placeholder="170"
          />
        </div>
        <div>
          <label className="block text-[#11698E] mb-1">{t('weight')} (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
            required
            placeholder="70"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#11698E] mb-1">{t('temperature')} (°C)</label>
          <input
            type="number"
            step="0.1"
            value={temperature}
            onChange={e => setTemperature(e.target.value)}
            className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
            required
            placeholder="37.0"
          />
        </div>
        <div>
          <label className="block text-[#11698E] mb-1">{t('bloodPressure')} (mmHg)</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={bloodPressureSystolic}
              onChange={e => setBloodPressureSystolic(e.target.value)}
              className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
              required
              placeholder="120"
            />
            <span className="flex items-center text-gray-500">/</span>
            <input
              type="number"
              value={bloodPressureDiastolic}
              onChange={e => setBloodPressureDiastolic(e.target.value)}
              className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
              required
              placeholder="80"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-[#11698E] mb-1">{t('heartRate')} (bpm)</label>
          <input
            type="number"
            value={heartRate}
            onChange={e => setHeartRate(e.target.value)}
            className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
            required
            placeholder="75"
          />
        </div>
        <div>
          <label className="block text-[#11698E] mb-1">{t('respiratoryRate')} (/min)</label>
          <input
            type="number"
            value={respiratoryRate}
            onChange={e => setRespiratoryRate(e.target.value)}
            className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
            required
            placeholder="16"
          />
        </div>
        <div>
          <label className="block text-[#11698E] mb-1">{t('oxygenSaturation')} (%)</label>
          <input
            type="number"
            value={oxygenSaturation}
            onChange={e => setOxygenSaturation(e.target.value)}
            className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
            required
            placeholder="98"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#11698E] mb-1">{t('notes')}</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
          rows={3}
          placeholder={t('additionalObservations')}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#11698E] text-white py-2 rounded-lg font-semibold hover:bg-[#0e5a7a] transition-colors"
      >
        {t('submitVitals')}
      </button>
    </form>
  );
};

export default VitalsForm;
