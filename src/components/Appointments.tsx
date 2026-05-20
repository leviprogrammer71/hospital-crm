import React, { useState } from 'react';
import { Calendar, Clock, Plus, Search, Filter, User, Phone } from 'lucide-react';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-16');
  const [viewMode, setViewMode] = useState('day');

  const appointments = [
    {
      id: 'A001',
      time: '09:00 AM',
      patient: 'John Doe',
      doctor: 'Dr. Sarah Wilson',
      department: 'Cardiology',
      type: 'Consultation',
      status: 'Confirmed',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 'A002',
      time: '10:30 AM',
      patient: 'Emily Davis',
      doctor: 'Dr. Michael Chen',
      department: 'Surgery',
      type: 'Pre-op',
      status: 'Confirmed',
      phone: '+1 (555) 321-0987'
    },
    {
      id: 'A003',
      time: '02:00 PM',
      patient: 'Sarah Johnson',
      doctor: 'Dr. Lisa Park',
      department: 'Pediatrics',
      type: 'Check-up',
      status: 'Pending',
      phone: '+1 (555) 987-6543'
    },
    {
      id: 'A004',
      time: '03:30 PM',
      patient: 'Michael Brown',
      doctor: 'Dr. Sarah Wilson',
      department: 'Cardiology',
      type: 'Follow-up',
      status: 'Completed',
      phone: '+1 (555) 456-7890'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#11698E] mb-2">Appointments</h1>
          <p className="text-gray-600">Manage patient appointments and schedules</p>
        </div>
        <button className="bg-[#11698E] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a7a] transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </button>
      </div>

      {/* Calendar Header */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-[#11698E] mr-2" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
              />
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'day' ? 'bg-[#11698E] text-white' : 'text-gray-600 hover:text-[#11698E]'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'week' ? 'bg-[#11698E] text-white' : 'text-gray-600 hover:text-[#11698E]'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'month' ? 'bg-[#11698E] text-white' : 'text-gray-600 hover:text-[#11698E]'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
              />
            </div>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-[#11698E]">Today's Schedule</h2>
            <p className="text-sm text-gray-600">January 16, 2024</p>
          </div>
          <div className="p-4 space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-[#11698E] mr-2" />
                    <span className="font-semibold text-[#11698E]">{appointment.time}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    appointment.status === 'Confirmed' ? 'bg-[#5CDB95] text-white' :
                    appointment.status === 'Pending' ? 'bg-[#A2D5F2] text-[#11698E]' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="font-medium">{appointment.patient}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{appointment.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{appointment.doctor}</span>
                    <span className="px-2 py-1 bg-[#A2D5F2] text-[#11698E] rounded-full text-xs">
                      {appointment.department}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Type: {appointment.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#11698E] mb-4">Today's Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#11698E]">12</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#5CDB95]">8</div>
                <div className="text-sm text-gray-600">Confirmed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#A2D5F2]">3</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-500">1</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#11698E] mb-4">Department Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cardiology</span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-[#11698E] h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium">6</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Surgery</span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-[#5CDB95] h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-sm font-medium">4</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pediatrics</span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-[#A2D5F2] h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm font-medium">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;