// Patient API functions for backend integration
// This file provides a layer for patient data persistence
// Currently using localStorage for demo purposes - replace with actual backend (Firebase/Supabase) later

export interface Patient {
  id: string;
  name: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  preferredLanguage: string;
  idNumber: string;
}

// Save patient to localStorage (simulate database)
export const savePatient = async (patient: Patient): Promise<Patient> => {
  const patients = getPatients();
  const updatedPatients = [...patients, patient];
  localStorage.setItem('hospital_patients', JSON.stringify(updatedPatients));
  return patient;
};

// Get all patients from localStorage (simulate database query)
export const getPatients = (): Patient[] => {
  const stored = localStorage.getItem('hospital_patients');
  return stored ? JSON.parse(stored) : [];
};

// Get patient by ID from localStorage (simulate database query)
export const getPatientById = async (id: string): Promise<Patient | null> => {
  const patients = getPatients();
  return patients.find(patient => patient.id === id) || null;
};

// Update patient in localStorage (simulate database update)
export const updatePatient = async (id: string, updates: Partial<Patient>): Promise<Patient | null> => {
  const patients = getPatients();
  const index = patients.findIndex(patient => patient.id === id);
  
  if (index === -1) return null;
  
  patients[index] = { ...patients[index], ...updates };
  localStorage.setItem('hospital_patients', JSON.stringify(patients));
  return patients[index];
};

// Delete patient from localStorage (simulate database delete)
export const deletePatient = async (id: string): Promise<boolean> => {
  const patients = getPatients();
  const filtered = patients.filter(patient => patient.id !== id);
  
  if (filtered.length === patients.length) return false;
  
  localStorage.setItem('hospital_patients', JSON.stringify(filtered));
  return true;
};
