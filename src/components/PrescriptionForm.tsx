import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle, Trash2, Printer } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  durationUnit: 'days' | 'weeks' | 'months';
}

interface PrescriptionFormProps {
  onSubmit: (medications: Medication[]) => void;
  patientName?: string;
  patientId?: string;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ 
  onSubmit, 
  patientName = '', 
  patientId = '' 
}) => {
  const { t, i18n } = useTranslation();
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: '',
      dosage: '',
      frequency: 'frequency_2xDay',
      duration: '',
      durationUnit: 'days'
    }
  ]);
  const [notes, setNotes] = useState('');
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        id: Date.now().toString(),
        name: '',
        dosage: '',
        frequency: 'frequency_2xDay',
        duration: '',
        durationUnit: 'days'
      }
    ]);
  };

  const handleRemoveMedication = (id: string) => {
    if (medications.length > 1) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };

  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setMedications(
      medications.map(med => 
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(medications);
  };

  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  const frequencyOptions = [
    { value: 'frequency_1xDay', label: t('frequency_1xDay') },
    { value: 'frequency_2xDay', label: t('frequency_2xDay') },
    { value: 'frequency_3xDay', label: t('frequency_3xDay') },
    { value: 'frequency_4xDay', label: t('frequency_4xDay') },
    { value: 'frequency_asNeeded', label: t('frequency_asNeeded') },
    { value: 'frequency_weekly', label: t('frequency_weekly') },
    { value: 'frequency_everyMorning', label: t('frequency_everyMorning') },
    { value: 'frequency_everyNight', label: t('frequency_everyNight') }
  ];

  const durationUnitOptions = [
    { value: 'days', label: t('days') },
    { value: 'weeks', label: t('weeks') },
    { value: 'months', label: t('months') }
  ];

  const formatDate = (date: Date) => {
    // Format date in Congo-centric format (dd/mm/yyyy)
    return date.toLocaleDateString(i18n.language === 'fr' ? 'fr-CD' : 'en-CD', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Africa/Kinshasa' // Central Africa Time (CAT)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!showPrintPreview ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-[#11698E] mb-4">{t('prescriptionSummary')}</h2>
          
          {medications.map((medication, index) => (
            <div key={medication.id} className="p-4 border border-gray-200 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-[#11698E]">{t('medication')} #{index + 1}</h3>
                {medications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMedication(medication.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-[#11698E] mb-1">{t('medication')}</label>
                  <input
                    type="text"
                    value={medication.name}
                    onChange={(e) => handleMedicationChange(medication.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
                    required
                    placeholder="e.g. Paracetamol"
                  />
                </div>
                <div>
                  <label className="block text-[#11698E] mb-1">{t('dosage')}</label>
                  <input
                    type="text"
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(medication.id, 'dosage', e.target.value)}
                    className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
                    required
                    placeholder="e.g. 500mg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#11698E] mb-1">{t('frequency')}</label>
                  <select
                    value={medication.frequency}
                    onChange={(e) => handleMedicationChange(medication.id, 'frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
                    required
                  >
                    {frequencyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#11698E] mb-1">{t('duration')}</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={medication.duration}
                      onChange={(e) => handleMedicationChange(medication.id, 'duration', e.target.value)}
                      className="w-1/2 px-3 py-2 border border-[#A2D5F2] rounded-lg"
                      required
                      placeholder="e.g. 5"
                      min="1"
                    />
                    <select
                      value={medication.durationUnit}
                      onChange={(e) => handleMedicationChange(
                        medication.id, 
                        'durationUnit', 
                        e.target.value as 'days' | 'weeks' | 'months'
                      )}
                      className="w-1/2 px-3 py-2 border border-[#A2D5F2] rounded-lg"
                    >
                      {durationUnitOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddMedication}
            className="flex items-center text-[#11698E] hover:text-[#0e5a7a] transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            {t('addMedication')}
          </button>
          
          <div>
            <label className="block text-[#11698E] mb-1">{t('additionalNotes')}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
              rows={3}
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-[#11698E] text-white py-2 rounded-lg font-semibold hover:bg-[#0e5a7a] transition-colors"
            >
              {t('submitVitals')}
            </button>
            <button
              type="button"
              onClick={handlePrintPreview}
              className="flex items-center justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Printer className="h-5 w-5 mr-1" />
              {t('printPrescription')}
            </button>
          </div>
        </form>
      ) : (
        <div className="print-container">
          {/* A4 Print Preview */}
          <div className="bg-white p-8 max-w-[210mm] mx-auto border border-gray-300 shadow-md">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-[#11698E]">Hospital Name</h1>
                <p className="text-gray-600">123 Hospital Street, Kinshasa</p>
                <p className="text-gray-600">Tel: +243 123 456 789</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatDate(new Date())}</p>
                <p className="text-gray-600">Ref: RX-{Date.now().toString().slice(-6)}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-center border-b-2 border-[#11698E] pb-2 mb-4">ORDONNANCE</h2>
              
              <div className="mb-4">
                <p><span className="font-semibold">Patient:</span> {patientName || 'Patient Name'}</p>
                <p><span className="font-semibold">ID:</span> {patientId || 'Patient ID'}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold mb-2 text-[#11698E]">Rx</h3>
              <ul className="list-disc pl-5 space-y-4">
                {medications.map((med, index) => (
                  <li key={index}>
                    <p className="font-semibold">{med.name} {med.dosage}</p>
                    <p>{t(med.frequency)} - {med.duration} {t(med.durationUnit)}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {notes && (
              <div className="mb-8">
                <h3 className="font-semibold mb-2 text-[#11698E]">{t('additionalNotes')}</h3>
                <p className="border-t border-b py-2">{notes}</p>
              </div>
            )}
            
            <div className="mt-12 pt-8 border-t">
              <div className="flex justify-end">
                <div className="text-center">
                  <div className="mb-16">
                    {/* Space for signature */}
                  </div>
                  <p className="font-semibold">Doctor's Signature</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowPrintPreview(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors mr-2"
            >
              Back to Form
            </button>
            <button
              onClick={() => window.print()}
              className="bg-[#11698E] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a7a] transition-colors flex items-center"
            >
              <Printer className="h-5 w-5 mr-1" />
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionForm;