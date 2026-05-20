import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Search, User, Calendar, Phone, MapPin, CreditCard, ArrowRight, Mail, Globe } from 'lucide-react';
import { Patient, savePatient, getPatients } from '../utils/api';

const FrontDesk = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'recent'>('all');
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id'>>({
    name: '',
    dob: '',
    address: '',
    phone: '',
    email: '',
    preferredLanguage: '',
    idNumber: '',
  });
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Load patients from storage on component mount
  useEffect(() => {
    const loadPatients = () => {
      const storedPatients = getPatients();
      setPatients(storedPatients);
    };
    loadPatients();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleRegisterPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const patientId = `PAT-${Date.now().toString().slice(-6)}`;
      const patient = { id: patientId, ...newPatient };
      
      // Save to storage
      await savePatient(patient);
      
      // Update local state
      const updatedPatients = [...patients, patient];
      setPatients(updatedPatients);
      setSelectedPatient(patient);
      setNewPatient({ name: '', dob: '', address: '', phone: '', email: '', preferredLanguage: '', idNumber: '' });
      setShowRegistrationForm(false);
    } catch (error) {
      console.error('Error registering patient:', error);
      alert('Failed to register patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.idNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType === 'all' || filterType === 'recent')
  );

  const handleSendToPharmacy = () => {
    // In a real app, you would save the patient data to a database
    // and then redirect to the pharmacy page
    if (selectedPatient) {
      // For now, we'll just navigate to the pharmacy page
      // In a real app, you would pass the patient ID as a parameter
      navigate('/pharmacy');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-[#11698E] mb-6 flex items-center">
        <User className="mr-2 h-6 w-6" />
        Front Desk (Receptionist)
      </h1>
      
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row mb-6 gap-4">
        <button
          onClick={() => setShowRegistrationForm(true)}
          className="bg-[#11698E] text-white px-4 py-2 rounded-lg flex items-center justify-center md:justify-start hover:bg-[#0e5a7a] transition-colors"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Register New Patient
        </button>
        
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-[#A2D5F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
            aria-label="Search patients"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-md text-sm ${
              filterType === 'all'
                ? 'bg-[#11698E] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('recent')}
            className={`px-3 py-1 rounded-md text-sm ${
              filterType === 'recent'
                ? 'bg-[#11698E] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Recent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Patient List or Registration Form */}
        <div>
          {showRegistrationForm ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#11698E]">Register New Patient</h2>
                <span className="text-sm text-gray-500">* Required fields</span>
              </div>
              
              <form onSubmit={handleRegisterPatient} className="space-y-4">
                <div>
                  <label className="block text-[#11698E] mb-1 font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={newPatient.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-[#A2D5F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                      required
                      aria-label="Full Name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[#11698E] mb-1 font-medium">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="dob"
                      value={newPatient.dob}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-[#A2D5F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                      required
                      aria-label="Date of Birth"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#11698E] mb-1 font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={newPatient.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-[#A2D5F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                        required
                        aria-label="Phone Number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[#11698E] mb-1 font-medium">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={newPatient.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-[#A2D5F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                        required
                        aria-label="Email Address"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#11698E] mb-1 font-medium">
                      Preferred Language <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="preferredLanguage"
                        value={newPatient.preferredLanguage}
                        onChange={(e) => setNewPatient({ ...newPatient, preferredLanguage: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 border border-[#A2D5F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] appearance-none bg-white"
                        required
                        aria-label="Preferred Language"
                      >
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Lingala">Lingala</option>
                        <option value="Kikongo">Kikongo</option>
                        <option value="Tshiluba">Tshiluba</option>
                        <option value="Swahili">Swahili</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[#11698E] mb-1 font-medium">
                      ID Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="idNumber"
                        value={newPatient.idNumber}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-[#A2D5F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                        required
                        aria-label="ID Number"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-[#11698E] mb-1 font-medium">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={newPatient.address}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-[#A2D5F2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E]"
                      required
                      aria-label="Address"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#11698E] text-white py-2 rounded-lg font-medium hover:bg-[#0e5a7a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#11698E] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Registering...' : 'Register Patient'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegistrationForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h2 className="text-xl font-semibold text-[#11698E] mb-4">Patient List</h2>
              
              {filteredPatients.length > 0 ? (
                <div className="space-y-3">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPatient?.id === patient.id
                          ? 'border-[#11698E] bg-[#F0F8FF] shadow-md'
                          : 'border-[#A2D5F2] hover:border-[#11698E] hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-[#11698E]">{patient.name}</div>
                          <div className="text-sm text-gray-600 mt-1">ID: {patient.id}</div>
                        </div>
                        <ArrowRight className={`h-5 w-5 ${
                          selectedPatient?.id === patient.id ? 'text-[#11698E]' : 'text-gray-300'
                        }`} />
                      </div>
                      <div className="mt-2 text-sm text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {patient.dob}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <User className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">No patients yet – click below to add one</p>
                  <button
                    onClick={() => setShowRegistrationForm(true)}
                    className="bg-[#11698E] text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Add New Patient
                  </button>
                  <p className="text-sm text-gray-400 mt-4">
                    Tip: You can quickly register a patient using the form
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Right Column - Selected Patient Details */}
        <div>
          {selectedPatient ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#11698E] mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Patient Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Phone Number</div>
                  <div className="font-medium">{selectedPatient.phone}</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Email Address</div>
                  <div className="font-medium">{selectedPatient.email}</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Preferred Language</div>
                  <div className="font-medium">{selectedPatient.preferredLanguage}</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-medium">{selectedPatient.address}</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg md:col-span-2">
                  <div className="text-sm text-gray-500">ID Number</div>
                  <div className="font-medium">{selectedPatient.idNumber}</div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleSendToPharmacy}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Send to Pharmacy
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center text-center">
              <User className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500">Select a patient from the list to view details</p>
              <p className="text-sm text-gray-400 mt-2">
                Or register a new patient to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrontDesk;
