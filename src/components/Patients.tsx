import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, User, Phone, Mail, Calendar } from 'lucide-react';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const patients = [
    {
      id: 'P001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      lastVisit: '2024-01-15',
      department: 'Cardiology',
      status: 'Active'
    },
    {
      id: 'P002',
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 987-6543',
      email: 'sarah.j@email.com',
      lastVisit: '2024-01-14',
      department: 'Pediatrics',
      status: 'Active'
    },
    {
      id: 'P003',
      name: 'Michael Brown',
      age: 58,
      gender: 'Male',
      phone: '+1 (555) 456-7890',
      email: 'michael.b@email.com',
      lastVisit: '2024-01-12',
      department: 'Surgery',
      status: 'Discharged'
    },
    {
      id: 'P004',
      name: 'Emily Davis',
      age: 28,
      gender: 'Female',
      phone: '+1 (555) 321-0987',
      email: 'emily.d@email.com',
      lastVisit: '2024-01-16',
      department: 'Emergency',
      status: 'Critical'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#11698E] mb-2">Patients</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#11698E] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a7a] transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search patients by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Patient</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Last Visit</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#A2D5F2] rounded-full flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-[#11698E]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#11698E]">{patient.name}</p>
                        <p className="text-sm text-gray-600">{patient.id} • {patient.age}y, {patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-2" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-2" />
                        {patient.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#A2D5F2] text-[#11698E] rounded-full text-sm">
                      {patient.department}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-3 w-3 mr-2" />
                      {patient.lastVisit}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      patient.status === 'Active' ? 'bg-[#5CDB95] text-white' :
                      patient.status === 'Critical' ? 'bg-[#FF6B6B] text-white' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-[#11698E] mb-4">Add New Patient</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                  placeholder="Enter patient name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                  placeholder="Email address"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#11698E] text-white rounded-lg hover:bg-[#0e5a7a] transition-colors"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;