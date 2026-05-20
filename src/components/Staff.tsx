import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, User, Phone, Mail, Badge } from 'lucide-react';

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const staff = [
    {
      id: 'S001',
      name: 'Dr. Sarah Wilson',
      role: 'Cardiologist',
      department: 'Cardiology',
      phone: '+1 (555) 111-2222',
      email: 'sarah.wilson@hospital.com',
      status: 'Online',
      shift: 'Morning',
      experience: '12 years'
    },
    {
      id: 'S002',
      name: 'Nurse Jennifer Lee',
      role: 'Registered Nurse',
      department: 'Emergency',
      phone: '+1 (555) 333-4444',
      email: 'jennifer.lee@hospital.com',
      status: 'Online',
      shift: 'Night',
      experience: '8 years'
    },
    {
      id: 'S003',
      name: 'Dr. Michael Chen',
      role: 'Surgeon',
      department: 'Surgery',
      phone: '+1 (555) 555-6666',
      email: 'michael.chen@hospital.com',
      status: 'Busy',
      shift: 'Morning',
      experience: '15 years'
    },
    {
      id: 'S004',
      name: 'Maria Rodriguez',
      role: 'Receptionist',
      department: 'Administration',
      phone: '+1 (555) 777-8888',
      email: 'maria.rodriguez@hospital.com',
      status: 'Offline',
      shift: 'Evening',
      experience: '3 years'
    }
  ];

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle Add Staff button click
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    department: '',
    phone: '',
    email: '',
    shift: '',
    experience: ''
  });

  const handleAddStaff = () => {
    setShowAddModal(true);
  };

  const handleStaffInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to add staff to the list here
    setShowAddModal(false);
    setNewStaff({ name: '', role: '', department: '', phone: '', email: '', shift: '', experience: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#11698E] mb-2">Staff Management</h1>
          <p className="text-gray-600">Manage hospital staff and schedules</p>
        </div>
        <button
          className="bg-[#11698E] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a7a] transition-colors flex items-center"
          onClick={handleAddStaff}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Staff
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[#11698E]">23</p>
              <p className="text-sm text-gray-600">Online Now</p>
            </div>
            <div className="w-3 h-3 bg-[#5CDB95] rounded-full"></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[#11698E]">8</p>
              <p className="text-sm text-gray-600">On Break</p>
            </div>
            <div className="w-3 h-3 bg-[#A2D5F2] rounded-full"></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[#11698E]">5</p>
              <p className="text-sm text-gray-600">In Surgery</p>
            </div>
            <div className="w-3 h-3 bg-[#FF6B6B] rounded-full"></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[#11698E]">67</p>
              <p className="text-sm text-gray-600">Total Staff</p>
            </div>
            <Badge className="h-4 w-4 text-[#11698E]" />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search staff by name, role, or department..."
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

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Staff Member</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Role & Department</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Shift</th>
                <th className="text-left py-3 px-4 font-semibold text-[#11698E]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#A2D5F2] rounded-full flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-[#11698E]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#11698E]">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.id} • {member.experience}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-800">{member.role}</p>
                      <p className="text-sm text-gray-600">{member.department}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-2" />
                        {member.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-2" />
                        {member.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        member.status === 'Online' ? 'bg-[#5CDB95]' :
                        member.status === 'Busy' ? 'bg-[#FF6B6B]' :
                        'bg-gray-400'
                      }`}></div>
                      <span className="text-sm">{member.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-[#A2D5F2] text-[#11698E] rounded-full text-sm">
                      {member.shift}
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
      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-[#11698E] mb-4">Add New Staff</h2>
            <form className="space-y-4" onSubmit={handleStaffSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newStaff.name}
                  onChange={handleStaffInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                  placeholder="Enter staff name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={newStaff.role}
                    onChange={handleStaffInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                    placeholder="Role"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={newStaff.department}
                    onChange={handleStaffInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                    placeholder="Department"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newStaff.phone}
                  onChange={handleStaffInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newStaff.email}
                  onChange={handleStaffInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                  <input
                    type="text"
                    name="shift"
                    value={newStaff.shift}
                    onChange={handleStaffInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                    placeholder="Shift"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={newStaff.experience}
                    onChange={handleStaffInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                    placeholder="Experience"
                  />
                </div>
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
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;