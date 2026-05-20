import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConsultationForm from '../components/ConsultationForm';
import MedicalNotesForm from '../components/MedicalNotesForm';
import LabTestsForm from '../components/LabTestsForm';
import PlanObservationsForm from '../components/PlanObservationsForm';
import PrescriptionForm from '../components/PrescriptionForm';
import LanguageToggle from '../components/LanguageToggle';
import { formatCurrency, formatDate, formatDateTime, getCurrentCATDateTime } from '../utils/congoCentric';
import {
  User, Calendar, Thermometer, Weight, Heart, FileText,
  CheckCircle, XCircle, Clock, ArrowRight, Users,
  Lock, Unlock, Edit, Save, Plus, Clipboard, PlusCircle,
  Pill, FileCheck, History, AlertCircle, Stethoscope
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  dob: string;
  paymentStatus: 'pending' | 'paid' | 'rejected';
  paymentAmount?: string;
  history?: Array<{
    date: string;
    condition: string;
    treatment: string;
    notes?: string;
    isConfidential?: boolean;
  }>;
  vitals?: {
    temperature: string;
    weight: string;
    pulse: string;
    bloodPressure?: string;
    notes: string;
  };
  files?: Array<{
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    isConfidential?: boolean;
  }> | string[];
  diagnosis?: {
    diagnosis: string;
    notes: string;
    isConfidential: boolean;
    attachment: string;
  };
  prescriptions?: Array<{
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
    isConfidential?: boolean;
  }>;
  medicalNotes?: {
    chiefComplaints: string;
    physicalExam: string;
    isConfidential: boolean;
  };
  labTests?: Array<{
    id: string;
    name: string;
    selected: boolean;
  }>;
  labResults?: Array<{
    id: string;
    testName: string;
    result: string;
    normalRange: string;
    date: string;
  }>;
  planObservations?: {
    plan: string;
    observations: string;
    isConfidential: boolean;
  };
}

const DoctorDashboard = () => {
  const { t } = useTranslation();
  // In a real app, this would come from a database or context
  // For now, we'll use mock patients
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'PAT-123456',
      name: 'John Doe',
      dob: '1990-01-01',
      paymentStatus: 'paid',
      paymentAmount: '150.00',
      history: [
        {
          date: '2023-01-15',
          condition: 'Common cold',
          treatment: 'Rest and fluids',
          notes: 'Patient recovered within a week'
        }
      ],
      vitals: {
        temperature: '98.6',
        weight: '180',
        pulse: '72',
        bloodPressure: '120/80',
        notes: 'Patient appears healthy',
      },
      files: [
        {
          name: 'initial_consultation.pdf',
          type: 'PDF',
          size: '1.2 MB',
          uploadDate: '2023-05-10'
        }
      ],
      prescriptions: [
        {
          medication: 'Ibuprofen',
          dosage: '200mg',
          frequency: 'Twice daily',
          duration: '5 days'
        }
      ]
    },
    {
      id: 'PAT-789012',
      name: 'Jane Smith',
      dob: '1985-05-15',
      paymentStatus: 'paid',
      paymentAmount: '200.00',
      history: [
        {
          date: '2023-03-20',
          condition: 'Hypertension',
          treatment: 'Prescribed medication',
          notes: 'Patient needs regular monitoring',
          isConfidential: true
        }
      ],
      vitals: {
        temperature: '99.1',
        weight: '140',
        pulse: '78',
        bloodPressure: '130/85',
        notes: 'Patient has mild fever',
      },
      files: [
        {
          name: 'medical_history.pdf',
          type: 'PDF',
          size: '2.5 MB',
          uploadDate: '2023-04-15',
          isConfidential: true
        }
      ],
      prescriptions: [
        {
          medication: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '30 days',
          notes: 'Take in the morning',
          isConfidential: true
        }
      ]
    },
  ]);
  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState<'history' | 'vitals' | 'diagnosis' | 'prescriptions' | 'notes' | 'labs' | 'plan'>('history');
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    notes: '',
    isConfidential: false
  });
  const [showAddHistory, setShowAddHistory] = useState(false);
  const [newHistory, setNewHistory] = useState({
    date: new Date().toISOString().split('T')[0],
    condition: '',
    treatment: '',
    notes: '',
    isConfidential: false
  });

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowConsultationForm(false);
    setEditingNotes(false);
    setShowAddPrescription(false);
    setShowAddHistory(false);
  };

  const handleConsultationSubmit = (consultationData: any) => {
    if (selectedPatient) {
      const updatedPatient = {
        ...selectedPatient,
        diagnosis: consultationData,
      };
      
      setPatients(patients.map(p =>
        p.id === selectedPatient.id ? updatedPatient : p
      ));
      
      setSelectedPatient(updatedPatient);
      setShowConsultationForm(false);
    }
  };

  const handleToggleConfidential = (type: 'diagnosis' | 'file' | 'prescription' | 'history', index?: number) => {
    if (!selectedPatient) return;
    
    let updatedPatient = { ...selectedPatient };
    
    if (type === 'diagnosis' && updatedPatient.diagnosis) {
      updatedPatient.diagnosis.isConfidential = !updatedPatient.diagnosis.isConfidential;
    } else if (type === 'file' && updatedPatient.files && typeof index === 'number') {
      if (Array.isArray(updatedPatient.files) && typeof updatedPatient.files[index] === 'object') {
        const file = updatedPatient.files[index] as {
          name: string;
          type: string;
          size: string;
          uploadDate: string;
          isConfidential?: boolean;
        };
        
        updatedPatient.files[index] = {
          ...file,
          isConfidential: !file.isConfidential
        };
      }
    } else if (type === 'prescription' && updatedPatient.prescriptions && typeof index === 'number') {
      const prescription = updatedPatient.prescriptions[index];
      updatedPatient.prescriptions[index] = {
        ...prescription,
        isConfidential: !prescription.isConfidential
      };
    } else if (type === 'history' && updatedPatient.history && typeof index === 'number') {
      const history = updatedPatient.history[index];
      updatedPatient.history[index] = {
        ...history,
        isConfidential: !history.isConfidential
      };
    }
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
  };

  const handleEditNotes = () => {
    if (!selectedPatient || !selectedPatient.diagnosis) return;
    
    setEditedNotes(selectedPatient.diagnosis.notes);
    setEditingNotes(true);
  };

  const handleSaveNotes = () => {
    if (!selectedPatient || !selectedPatient.diagnosis) return;
    
    const updatedPatient = {
      ...selectedPatient,
      diagnosis: {
        ...selectedPatient.diagnosis,
        notes: editedNotes
      }
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
    setEditingNotes(false);
  };

  const handleAddPrescription = () => {
    if (!selectedPatient || !newPrescription.medication || !newPrescription.dosage) return;
    
    const updatedPatient = {
      ...selectedPatient,
      prescriptions: [
        ...(selectedPatient.prescriptions || []),
        newPrescription
      ]
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
    setNewPrescription({
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      notes: '',
      isConfidential: false
    });
    setShowAddPrescription(false);
  };

  const handleAddHistory = () => {
    if (!selectedPatient || !newHistory.condition || !newHistory.treatment) return;
    
    const updatedPatient = {
      ...selectedPatient,
      history: [
        ...(selectedPatient.history || []),
        newHistory
      ]
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
    setNewHistory({
      date: new Date().toISOString().split('T')[0],
      condition: '',
      treatment: '',
      notes: '',
      isConfidential: false
    });
    setShowAddHistory(false);
  };

  const handlePrescriptionChange = (field: string, value: string | boolean) => {
    setNewPrescription({
      ...newPrescription,
      [field]: value
    });
  };

  const handleHistoryChange = (field: string, value: string | boolean) => {
    setNewHistory({
      ...newHistory,
      [field]: value
    });
  };

  // Handlers for new components
  const handleMedicalNotesSubmit = (data: { chiefComplaints: string; physicalExam: string; isConfidential: boolean }) => {
    if (!selectedPatient) return;
    
    const updatedPatient = {
      ...selectedPatient,
      medicalNotes: data
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
  };

  const handleLabTestsSubmit = (data: { tests: any[]; results: any[] }) => {
    if (!selectedPatient) return;
    
    const updatedPatient = {
      ...selectedPatient,
      labTests: data.tests.filter(test => test.selected),
      labResults: data.results
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
  };

  const handlePlanObservationsSubmit = (data: { plan: string; observations: string; isConfidential: boolean }) => {
    if (!selectedPatient) return;
    
    const updatedPatient = {
      ...selectedPatient,
      planObservations: data
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
  };

  const handlePrescriptionSubmit = (medications: any[]) => {
    if (!selectedPatient) return;
    
    const updatedPatient = {
      ...selectedPatient,
      prescriptions: medications
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#11698E] flex items-center">
          <Stethoscope className="mr-2 h-6 w-6" />
          {t('doctorDashboard')}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {formatDateTime(getCurrentCATDateTime())}
          </div>
          <LanguageToggle />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Patient List */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-[#11698E] mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Patients
            </h2>
            
            {patients.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPatient?.id === patient.id
                        ? 'border-[#11698E] bg-[#F0F8FF] shadow-md'
                        : 'border-[#A2D5F2] hover:border-[#11698E] hover:shadow-sm'
                    }`}
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-[#11698E]">{patient.name}</div>
                        <div className="text-sm text-gray-600 mt-1">ID: {patient.id}</div>
                      </div>
                      <div className="flex items-center">
                        {patient.diagnosis?.isConfidential && (
                          <Lock className="h-4 w-4 text-red-500 ml-1" />
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {patient.dob}
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        patient.diagnosis
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.diagnosis ? 'Diagnosed' : 'Pending'}
                      </div>
                      {patient.prescriptions && patient.prescriptions.length > 0 && (
                        <div className="text-xs text-green-600 font-medium flex items-center">
                          <Pill className="h-3 w-3 mr-1" />
                          {patient.prescriptions.length}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">No patients available</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Columns - Patient Details and Actions */}
        <div className="lg:col-span-3">
          {selectedPatient ? (
            <>
              {/* Patient Information */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-[#11698E] mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Patient Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Patient ID</div>
                    <div className="font-medium">{selectedPatient.id}</div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Full Name</div>
                    <div className="font-medium">{selectedPatient.name}</div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Date of Birth</div>
                    <div className="font-medium">{selectedPatient.dob}</div>
                  </div>
                </div>
                
                {/* Medical Notes Tab */}
                {activeTab === 'notes' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#11698E] mb-4">{t('medicalNotes')}</h3>
                    
                    {selectedPatient.medicalNotes ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-[#11698E]">{t('chiefComplaints')}</h4>
                            {selectedPatient.medicalNotes.isConfidential && (
                              <Lock className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <p className="whitespace-pre-wrap">{selectedPatient.medicalNotes.chiefComplaints}</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-[#11698E] mb-2">{t('physicalExam')}</h4>
                          <p className="whitespace-pre-wrap">{selectedPatient.medicalNotes.physicalExam}</p>
                        </div>
                        
                        <button
                          onClick={() => setActiveTab('notes')}
                          className="text-[#11698E] font-medium flex items-center hover:underline"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          {t('editNotes')}
                        </button>
                      </div>
                    ) : (
                      <MedicalNotesForm onSubmit={handleMedicalNotesSubmit} />
                    )}
                  </div>
                )}
                
                {/* Lab Tests Tab */}
                {activeTab === 'labs' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#11698E] mb-4">{t('labTests')}</h3>
                    
                    <LabTestsForm
                      initialTests={selectedPatient.labTests}
                      initialResults={selectedPatient.labResults}
                      onSubmit={handleLabTestsSubmit}
                    />
                  </div>
                )}
                
                {/* Plan & Observations Tab */}
                {activeTab === 'plan' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#11698E] mb-4">{t('planObservations')}</h3>
                    
                    {selectedPatient.planObservations ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-[#11698E]">{t('treatmentPlan')}</h4>
                            {selectedPatient.planObservations.isConfidential && (
                              <Lock className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <p className="whitespace-pre-wrap">{selectedPatient.planObservations.plan}</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-[#11698E] mb-2">{t('observations')}</h4>
                          <p className="whitespace-pre-wrap">{selectedPatient.planObservations.observations}</p>
                        </div>
                        
                        <button
                          onClick={() => setActiveTab('plan')}
                          className="text-[#11698E] font-medium flex items-center hover:underline"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          {t('editPlan')}
                        </button>
                      </div>
                    ) : (
                      <PlanObservationsForm onSubmit={handlePlanObservationsSubmit} />
                    )}
                  </div>
                )}
                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Payment Status</div>
                      <div className={`font-medium flex items-center ${
                        selectedPatient.paymentStatus === 'paid'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}>
                        {selectedPatient.paymentStatus === 'paid' ? (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        ) : (
                          <Clock className="h-4 w-4 mr-1" />
                        )}
                        {selectedPatient.paymentStatus.toUpperCase()}
                      </div>
                    </div>
                    
                    {selectedPatient.paymentAmount && (
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{t('amount')}</div>
                        <div className="font-medium">{formatCurrency(parseFloat(selectedPatient.paymentAmount))}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tabbed Interface */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="flex flex-wrap border-b border-gray-200">
                  <button
                    className={`py-3 px-4 flex items-center justify-center ${
                      activeTab === 'history'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('history')}
                    aria-label="View patient history"
                  >
                    <History className="h-5 w-5 mr-2" />
                    {t('history')}
                  </button>
                  <button
                    className={`py-3 px-4 flex items-center justify-center ${
                      activeTab === 'vitals'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('vitals')}
                    aria-label="View vitals"
                  >
                    <Thermometer className="h-5 w-5 mr-2" />
                    {t('vitals')}
                  </button>
                  <button
                    className={`py-3 px-4 flex items-center justify-center ${
                      activeTab === 'notes'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('notes')}
                    aria-label="View medical notes"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    {t('medicalNotes')}
                  </button>
                  <button
                    className={`py-3 px-4 flex items-center justify-center ${
                      activeTab === 'labs'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('labs')}
                    aria-label="View lab tests"
                  >
                    <FileCheck className="h-5 w-5 mr-2" />
                    {t('labTests')}
                  </button>
                  <button
                    className={`py-3 px-4 flex items-center justify-center ${
                      activeTab === 'diagnosis'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('diagnosis')}
                    aria-label="View diagnosis"
                  >
                    <Clipboard className="h-5 w-5 mr-2" />
                    {t('diagnosis')}
                  </button>
                  <button
                    className={`py-3 px-4 flex items-center justify-center ${
                      activeTab === 'plan'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('plan')}
                    aria-label="View plan"
                  >
                    <AlertCircle className="h-5 w-5 mr-2" />
                    {t('planObservations')}
                  </button>
                  <button
                    className={`py-3 px-4 flex items-center justify-center ${
                      activeTab === 'prescriptions'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('prescriptions')}
                    aria-label="View prescriptions"
                  >
                    <Pill className="h-5 w-5 mr-2" />
                    {t('prescriptions')}
                  </button>
                </div>
                
                <div className="p-6">
                  {/* History Tab */}
                  {activeTab === 'history' && (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-[#11698E]">Medical History</h3>
                        <button
                          onClick={() => setShowAddHistory(true)}
                          className="bg-[#11698E] text-white px-3 py-1 rounded-lg text-sm flex items-center hover:bg-[#0e5a7a] transition-colors"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Entry
                        </button>
                      </div>
                      
                      {showAddHistory && (
                        <div className="mb-6 p-4 border border-[#A2D5F2] rounded-lg bg-[#F0F8FF]">
                          <h4 className="font-semibold text-[#11698E] mb-3">Add Medical History Entry</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Date</label>
                              <input
                                type="date"
                                value={newHistory.date}
                                onChange={(e) => handleHistoryChange('date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Condition</label>
                              <input
                                type="text"
                                value={newHistory.condition}
                                onChange={(e) => handleHistoryChange('condition', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                                placeholder="e.g., Hypertension, Diabetes"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Treatment</label>
                              <input
                                type="text"
                                value={newHistory.treatment}
                                onChange={(e) => handleHistoryChange('treatment', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                                placeholder="e.g., Medication, Surgery"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Notes</label>
                              <textarea
                                value={newHistory.notes}
                                onChange={(e) => handleHistoryChange('notes', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                                rows={3}
                                placeholder="Additional notes about the condition or treatment"
                              ></textarea>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="historyConfidential"
                                checked={newHistory.isConfidential as boolean}
                                onChange={(e) => handleHistoryChange('isConfidential', e.target.checked)}
                                className="mr-2 h-4 w-4 text-[#11698E] focus:ring-[#11698E] border-gray-300 rounded"
                              />
                              <label htmlFor="historyConfidential" className="text-sm text-gray-600 flex items-center">
                                <Lock className="h-4 w-4 mr-1 text-red-500" />
                                Mark as confidential
                              </label>
                              <div className="ml-2 group relative">
                                <AlertCircle className="h-4 w-4 text-gray-400 cursor-help" />
                                <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                                  Confidential entries are only visible to doctors and admins
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2 pt-2">
                              <button
                                type="button"
                                onClick={handleAddHistory}
                                className="bg-[#11698E] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a7a] transition-colors"
                              >
                                Add Entry
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowAddHistory(false)}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedPatient.history && selectedPatient.history.length > 0 ? (
                        <div className="space-y-4">
                          {selectedPatient.history.map((entry, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-semibold text-[#11698E]">{entry.condition}</div>
                                <div className="flex items-center">
                                  <div className="text-sm text-gray-500 mr-2">{entry.date}</div>
                                  {entry.isConfidential ? (
                                    <button
                                      onClick={() => handleToggleConfidential('history', index)}
                                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                                      aria-label="Remove confidential status"
                                      title="Remove confidential status"
                                    >
                                      <Lock className="h-4 w-4" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleToggleConfidential('history', index)}
                                      className="p-1 text-gray-400 hover:text-[#11698E] transition-colors"
                                      aria-label="Mark as confidential"
                                      title="Mark as confidential"
                                    >
                                      <Unlock className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="mb-2">
                                <span className="text-sm text-gray-500">Treatment:</span> {entry.treatment}
                              </div>
                              {entry.notes && (
                                <div className="text-sm">
                                  <span className="text-gray-500">Notes:</span> {entry.notes}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 mb-4">No medical history recorded for this patient</p>
                          <button
                            onClick={() => setShowAddHistory(true)}
                            className="bg-[#11698E] text-white px-4 py-2 rounded-lg flex items-center mx-auto hover:bg-[#0e5a7a] transition-colors"
                          >
                            <Plus className="h-5 w-5 mr-2" />
                            Add Medical History
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Vitals Tab */}
                  {activeTab === 'vitals' && (
                    <div>
                      {selectedPatient.vitals ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="p-4 bg-gray-50 rounded-lg flex items-center">
                            <Thermometer className="h-8 w-8 text-[#11698E] mr-3" />
                            <div>
                              <div className="text-sm text-gray-500">Temperature</div>
                              <div className="text-xl font-semibold">{selectedPatient.vitals.temperature}°F</div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded-lg flex items-center">
                            <Weight className="h-8 w-8 text-[#11698E] mr-3" />
                            <div>
                              <div className="text-sm text-gray-500">Weight</div>
                              <div className="text-xl font-semibold">{selectedPatient.vitals.weight} lbs</div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded-lg flex items-center">
                            <Heart className="h-8 w-8 text-[#11698E] mr-3" />
                            <div>
                              <div className="text-sm text-gray-500">Pulse</div>
                              <div className="text-xl font-semibold">{selectedPatient.vitals.pulse} bpm</div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded-lg flex items-center">
                            <Heart className="h-8 w-8 text-[#11698E] mr-3" />
                            <div>
                              <div className="text-sm text-gray-500">Blood Pressure</div>
                              <div className="text-xl font-semibold">{selectedPatient.vitals.bloodPressure || 'N/A'}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Thermometer className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">No vitals recorded for this patient</p>
                        </div>
                      )}
                      
                      {selectedPatient.vitals?.notes && (
                        <div className="p-4 bg-gray-50 rounded-lg mb-4">
                          <div className="text-sm text-gray-500 mb-1">Notes</div>
                          <div className="font-medium">{selectedPatient.vitals.notes}</div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Diagnosis Tab */}
                  {activeTab === 'diagnosis' && (
                    <div>
                      {selectedPatient.diagnosis ? (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-[#11698E]">Diagnosis</h3>
                            <div className="flex items-center">
                              {selectedPatient.diagnosis.isConfidential ? (
                                <button
                                  onClick={() => handleToggleConfidential('diagnosis')}
                                  className="flex items-center text-red-600 hover:text-red-800 text-sm"
                                  aria-label="Make diagnosis public"
                                >
                                  <Lock className="h-4 w-4 mr-1" />
                                  Confidential
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleToggleConfidential('diagnosis')}
                                  className="flex items-center text-green-600 hover:text-green-800 text-sm"
                                  aria-label="Make diagnosis confidential"
                                >
                                  <Unlock className="h-4 w-4 mr-1" />
                                  Public
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 mb-1">Diagnosis</div>
                            <div className="font-medium">{selectedPatient.diagnosis.diagnosis}</div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-sm text-gray-500">Notes</div>
                              {!editingNotes && (
                                <button
                                  onClick={handleEditNotes}
                                  className="text-[#11698E] hover:text-[#0e5a73] text-sm flex items-center"
                                  aria-label="Edit notes"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </button>
                              )}
                            </div>
                            
                            {editingNotes ? (
                              <div>
                                <textarea
                                  value={editedNotes}
                                  onChange={(e) => setEditedNotes(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                                  rows={4}
                                ></textarea>
                                <div className="flex justify-end mt-2">
                                  <button
                                    onClick={handleSaveNotes}
                                    className="bg-[#11698E] text-white px-3 py-1 rounded-lg flex items-center text-sm"
                                  >
                                    <Save className="h-4 w-4 mr-1" />
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="font-medium">{selectedPatient.diagnosis.notes}</div>
                            )}
                          </div>
                          
                          {selectedPatient.diagnosis.attachment && (
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Attachment</div>
                              <div className="font-medium">{selectedPatient.diagnosis.attachment}</div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                          <Clipboard className="h-16 w-16 text-gray-300 mb-4" />
                          <p className="text-gray-500 mb-4">No diagnosis available</p>
                          <button
                            onClick={() => setShowConsultationForm(true)}
                            className="bg-[#11698E] text-white px-4 py-2 rounded-lg flex items-center"
                          >
                            <PlusCircle className="h-5 w-5 mr-2" />
                            Add Diagnosis
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Prescriptions Tab */}
                  {activeTab === 'prescriptions' && (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-[#11698E] mb-4">{t('prescriptions')}</h3>
                      
                      <PrescriptionForm
                        onSubmit={handlePrescriptionSubmit}
                        patientName={selectedPatient.name}
                        patientId={selectedPatient.id}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Consultation Form */}
              {showConsultationForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-xl font-semibold text-[#11698E] mb-4">Add Diagnosis</h2>
                  <ConsultationForm onSubmit={handleConsultationSubmit} />
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clipboard className="h-24 w-24 text-gray-300 mb-6" />
              <p className="text-gray-500 text-lg mb-2">No patient selected</p>
              <p className="text-gray-400">Select a patient from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
