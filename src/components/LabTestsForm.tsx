import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircle, Trash2, Save, FileCheck } from 'lucide-react';

interface LabTest {
  id: string;
  name: string;
  selected: boolean;
}

interface LabResult {
  id: string;
  testName: string;
  result: string;
  normalRange: string;
  date: string;
}

interface LabTestsFormProps {
  initialTests?: LabTest[];
  initialResults?: LabResult[];
  onSubmit: (data: { tests: LabTest[], results: LabResult[] }) => void;
}

const LabTestsForm: React.FC<LabTestsFormProps> = ({
  initialTests = [],
  initialResults = [],
  onSubmit
}) => {
  const { t } = useTranslation();
  
  // If no initial tests are provided, use these default tests
  const defaultTests: LabTest[] = [
    { id: '1', name: 'NFS (Numération Formule Sanguine)', selected: false },
    { id: '2', name: 'Glucose', selected: false },
    { id: '3', name: 'Urine Analysis', selected: false },
    { id: '4', name: 'Malaria Test', selected: false },
    { id: '5', name: 'HIV Test', selected: false },
    { id: '6', name: 'Hepatitis B', selected: false },
    { id: '7', name: 'Hepatitis C', selected: false },
    { id: '8', name: 'Typhoid Test', selected: false },
    { id: '9', name: 'Tuberculosis Test', selected: false },
    { id: '10', name: 'Pregnancy Test', selected: false },
    { id: '11', name: 'Lipid Profile', selected: false },
    { id: '12', name: 'Kidney Function Test', selected: false },
    { id: '13', name: 'Liver Function Test', selected: false },
  ];

  const [labTests, setLabTests] = useState<LabTest[]>(
    initialTests.length > 0 ? initialTests : defaultTests
  );
  
  const [labResults, setLabResults] = useState<LabResult[]>(initialResults);
  const [newResult, setNewResult] = useState<LabResult>({
    id: '',
    testName: '',
    result: '',
    normalRange: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleTestToggle = (id: string) => {
    setLabTests(
      labTests.map(test => 
        test.id === id ? { ...test, selected: !test.selected } : test
      )
    );
  };

  const handleAddResult = () => {
    if (!newResult.testName || !newResult.result) return;
    
    const resultId = Date.now().toString();
    setLabResults([
      ...labResults,
      { ...newResult, id: resultId }
    ]);
    
    setNewResult({
      id: '',
      testName: '',
      result: '',
      normalRange: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleRemoveResult = (id: string) => {
    setLabResults(labResults.filter(result => result.id !== id));
  };

  const handleResultChange = (field: keyof LabResult, value: string) => {
    setNewResult({
      ...newResult,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ tests: labTests, results: labResults });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-[#11698E] mb-4 flex items-center">
            <FileCheck className="h-5 w-5 mr-2" />
            {t('labTests')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {labTests.map(test => (
              <div key={test.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`test-${test.id}`}
                  checked={test.selected}
                  onChange={() => handleTestToggle(test.id)}
                  className="mr-2 h-4 w-4"
                />
                <label 
                  htmlFor={`test-${test.id}`} 
                  className={`${test.selected ? 'text-[#11698E] font-medium' : 'text-gray-600'}`}
                >
                  {test.name}
                </label>
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold text-[#11698E] mb-4 flex items-center">
            <FileCheck className="h-5 w-5 mr-2" />
            {t('labResults')}
          </h2>
          
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-[#11698E] mb-1">{t('testName')}</label>
                <input
                  type="text"
                  value={newResult.testName}
                  onChange={(e) => handleResultChange('testName', e.target.value)}
                  className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
                  placeholder="e.g. Hemoglobin"
                />
              </div>
              <div>
                <label className="block text-[#11698E] mb-1">{t('result')}</label>
                <input
                  type="text"
                  value={newResult.result}
                  onChange={(e) => handleResultChange('result', e.target.value)}
                  className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
                  placeholder="e.g. 14.5 g/dL"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-[#11698E] mb-1">{t('normalRange')}</label>
                <input
                  type="text"
                  value={newResult.normalRange}
                  onChange={(e) => handleResultChange('normalRange', e.target.value)}
                  className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
                  placeholder="e.g. 12.0-15.5 g/dL"
                />
              </div>
              <div>
                <label className="block text-[#11698E] mb-1">{t('date')}</label>
                <input
                  type="date"
                  value={newResult.date}
                  onChange={(e) => handleResultChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg"
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleAddResult}
              className="flex items-center text-[#11698E] hover:text-[#0e5a7a] transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-1" />
              {t('addResult')}
            </button>
          </div>
          
          {labResults.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('testName')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('result')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('normalRange')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('date')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {labResults.map((result) => (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.testName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.result}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.normalRange}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => handleRemoveResult(result.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-6">
            <button
              type="submit"
              className="bg-[#11698E] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0e5a7a] transition-colors flex items-center"
            >
              <Save className="h-5 w-5 mr-2" />
              {t('saveLabData')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LabTestsForm;