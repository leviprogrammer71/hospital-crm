import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import VitalsForm from '../components/VitalsForm';
import {
  User, Calendar, Thermometer, Weight, Heart, FileText, Upload,
  ChevronDown, ChevronUp, CheckCircle, Clock, ArrowRight,
  Clipboard, Users, Trash2, Eye, Download, PlusCircle
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  dob: string;
  paymentStatus: 'pending' | 'paid' | 'rejected';
  paymentAmount?: string;
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
  }>;
}

const NurseDashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // In a real app, this would come from a database or context
  // For now, we'll use mock patients
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'PAT-123456',
      name: 'John Doe',
      dob: '1990-01-01',
      paymentStatus: 'paid',
      paymentAmount: '150.00',
    },
    {
      id: 'PAT-789012',
      name: 'Jane Smith',
      dob: '1985-05-15',
      paymentStatus: 'paid',
      paymentAmount: '200.00',
      vitals: {
        temperature: '98.6',
        weight: '140',
        pulse: '78',
        bloodPressure: '120/80',
        notes: 'Patient appears healthy',
      },
      files: [
        {
          name: 'previous_visit.pdf',
          type: 'PDF',
          size: '1.2 MB',
          uploadDate: '2023-05-10'
        }
      ]
    }
  ]);
  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activePanel, setActivePanel] = useState<'vitals' | 'files' | 'notes'>('vitals');
  const [showVitalsForm, setShowVitalsForm] = useState(false);
  const [fileUpload, setFileUpload] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [notes, setNotes] = useState('');
  const [notesHistory, setNotesHistory] = useState<Array<{text: string, date: string}>>([]);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowVitalsForm(false);
    setNotes('');
  };

  const handleVitalsSubmit = (vitals: any) => {
    if (!selectedPatient) return;
    
    const updatedPatient = {
      ...selectedPatient,
      vitals: {
        ...vitals,
        bloodPressure: vitals.bloodPressure || '120/80'
      }
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
    setShowVitalsForm(false);
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !fileUpload) return;
    
    const newFile = {
      name: fileUpload,
      type: fileType || 'PDF',
      size: fileSize || '1.0 MB',
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedPatient = {
      ...selectedPatient,
      files: [...(selectedPatient.files || []), newFile]
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
    setFileUpload('');
    setFileType('');
    setFileSize('');
  };

  const handleDeleteFile = (index: number) => {
    if (!selectedPatient || !selectedPatient.files) return;
    
    const updatedFiles = [...selectedPatient.files];
    updatedFiles.splice(index, 1);
    
    const updatedPatient = {
      ...selectedPatient,
      files: updatedFiles
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
  };

  const handleAddNote = () => {
    if (!notes.trim() || !selectedPatient) return;
    
    const newNote = {
      text: notes,
      date: new Date().toISOString().split('T')[0]
    };
    
    setNotesHistory([newNote, ...notesHistory]);
    setNotes('');
  };

  const handleSendToDoctor = () => {
    // In a real app, you would update the patient status in a database
    // For now, we'll just navigate to the doctor dashboard
    navigate('/doctor');
  };

  const isReadyForDoctor = () => {
    return selectedPatient &&
           selectedPatient.vitals &&
           (selectedPatient.files?.length || 0) > 0;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-[#11698E] mb-6 flex items-center">
        <Clipboard className="mr-2 h-6 w-6" />
        Nurse Dashboard
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Patient List */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-[#11698E] mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Patients
            </h2>
            
            {patients.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
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
                        {patient.paymentStatus === 'paid' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {patient.dob}
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        patient.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.paymentStatus.toUpperCase()}
                      </div>
                      {patient.vitals && (
                        <div className="text-xs text-green-600 font-medium">
                          Vitals recorded
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
                        <div className="text-sm text-gray-500">Amount</div>
                        <div className="font-medium">${selectedPatient.paymentAmount}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tabbed Interface */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`flex-1 py-3 px-4 flex items-center justify-center ${
                      activePanel === 'vitals'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActivePanel('vitals')}
                    aria-label="View vitals"
                  >
                    <Thermometer className="h-5 w-5 mr-2" />
                    Vitals
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 flex items-center justify-center ${
                      activePanel === 'files'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActivePanel('files')}
                    aria-label="View files"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Files
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 flex items-center justify-center ${
                      activePanel === 'notes'
                        ? 'bg-[#F0F8FF] text-[#11698E] border-b-2 border-[#11698E]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActivePanel('notes')}
                    aria-label="View notes"
                  >
                    <Clipboard className="h-5 w-5 mr-2" />
                    Notes
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Vitals Panel */}
                  {activePanel === 'vitals' && (
                    <div>
                      {selectedPatient.vitals ? (
                        <>
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
                          
                          {selectedPatient.vitals.notes && (
                            <div className="p-4 bg-gray-50 rounded-lg mb-4">
                              <div className="text-sm text-gray-500 mb-1">Notes</div>
                              <div className="font-medium">{selectedPatient.vitals.notes}</div>
                            </div>
                          )}
                          
                          <button
                            onClick={() => setShowVitalsForm(true)}
                            className="text-[#11698E] font-medium flex items-center hover:underline"
                          >
                            <PlusCircle className="h-4 w-4 mr-1" />
                            Update Vitals
                          </button>
                        </>
                      ) : showVitalsForm ? (
                        <div>
                          <h3 className="text-lg font-semibold text-[#11698E] mb-4">Record Vitals</h3>
                          <VitalsForm onSubmit={handleVitalsSubmit} />
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Thermometer className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 mb-4">No vitals recorded for this patient</p>
                          <button
                            onClick={() => setShowVitalsForm(true)}
                            className="bg-[#11698E] text-white px-4 py-2 rounded-lg flex items-center mx-auto hover:bg-[#0e5a7a] transition-colors"
                          >
                            <PlusCircle className="h-5 w-5 mr-2" />
                            Record Vitals
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Files Panel */}
                  {activePanel === 'files' && (
                    <div>
                      <div className="mb-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#11698E] transition-colors">
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files.length > 0) {
                                const file = e.target.files[0];
                                setFileUpload(file.name);
                                setFileType(file.type.split('/')[1].toUpperCase());
                                setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
                              }
                            }}
                          />
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 mb-2">Drag and drop files here, or</p>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-[#11698E] text-white px-4 py-2 rounded-lg inline-flex items-center hover:bg-[#0e5a7a] transition-colors"
                          >
                            <Upload className="h-5 w-5 mr-2" />
                            Browse Files
                          </button>
                          <p className="text-xs text-gray-400 mt-2">
                            Supported formats: PDF, JPG, PNG, DOCX (Max 10MB)
                          </p>
                        </div>
                      </div>
                      
                      {fileUpload && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-[#11698E] mb-2">Selected File</h3>
                          <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-6 w-6 text-[#11698E] mr-2" />
                              <div>
                                <div className="font-medium">{fileUpload}</div>
                                <div className="text-sm text-gray-500">{fileType} • {fileSize}</div>
                              </div>
                            </div>
                            <button
                              onClick={handleFileUpload}
                              className="bg-[#11698E] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#0e5a7a] transition-colors"
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {selectedPatient.files && selectedPatient.files.length > 0 ? (
                        <div>
                          <h3 className="text-lg font-semibold text-[#11698E] mb-2">Uploaded Files</h3>
                          <div className="space-y-2">
                            {selectedPatient.files.map((file, index) => (
                              <div key={index} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-[#11698E] mr-2" />
                                  <div>
                                    <div className="font-medium">{file.name}</div>
                                    <div className="text-xs text-gray-500">
                                      {file.type} • {file.size} • Uploaded on {file.uploadDate}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    className="p-1 text-gray-500 hover:text-[#11698E] transition-colors"
                                    aria-label="View file"
                                  >
                                    <Eye className="h-5 w-5" />
                                  </button>
                                  <button
                                    className="p-1 text-gray-500 hover:text-[#11698E] transition-colors"
                                    aria-label="Download file"
                                  >
                                    <Download className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFile(index)}
                                    className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                                    aria-label="Delete file"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-500">No files uploaded yet</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Notes Panel */}
                  {activePanel === 'notes' && (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-[#11698E] mb-2">Add Note</h3>
                        <div className="mb-4">
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                            rows={4}
                            placeholder="Enter notes about the patient here..."
                          ></textarea>
                        </div>
                        <button
                          onClick={handleAddNote}
                          className="bg-[#11698E] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#0e5a7a] transition-colors"
                          disabled={!notes.trim()}
                        >
                          <PlusCircle className="h-5 w-5 mr-2" />
                          Add Note
                        </button>
                      </div>
                      
                      {notesHistory.length > 0 ? (
                        <div>
                          <h3 className="text-lg font-semibold text-[#11698E] mb-2">Notes History</h3>
                          <div className="space-y-3">
                            {notesHistory.map((note, index) => (
                              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-500 mb-1">{note.date}</div>
                                <div className="font-medium">{note.text}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-500">No notes added yet</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {isReadyForDoctor() && (
                <div className="flex justify-end">
                  <button
                    onClick={handleSendToDoctor}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Send to Doctor
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center h-full">
              <Clipboard className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">Select a patient from the list to view details</p>
              <p className="text-sm text-gray-400">
                You can record vitals, upload files, and add notes for the patient
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;
