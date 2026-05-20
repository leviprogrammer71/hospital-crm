import React from 'react';

const PatientCard = ({ patient }: { patient: any }) => (
  <div className="bg-white rounded-xl shadow p-4 mb-4">
    <h3 className="text-lg font-bold text-[#11698E]">{patient.full_name}</h3>
    <p className="text-gray-600">DOB: {patient.dob}</p>
    <p className="text-gray-600">Phone: {patient.phone}</p>
    <p className="text-gray-600">Status: {patient.status}</p>
  </div>
);

export default PatientCard;
