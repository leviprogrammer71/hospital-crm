import React from 'react';
import { Users, UserCheck, Calendar, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'bg-[#5CDB95]'
    },
    {
      title: 'Staff Online',
      value: '23',
      change: '+3',
      icon: UserCheck,
      color: 'bg-[#A2D5F2]'
    },
    {
      title: 'Appointments Today',
      value: '47',
      change: '+8%',
      icon: Calendar,
      color: 'bg-[#11698E]'
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-2',
      icon: AlertTriangle,
      color: 'bg-[#FF6B6B]'
    }
  ];

  const recentActivities = [
    { time: '10:30 AM', action: 'Patient John Doe checked in', type: 'check-in' },
    { time: '10:15 AM', action: 'Dr. Smith updated patient records', type: 'update' },
    { time: '09:45 AM', action: 'New appointment scheduled', type: 'appointment' },
    { time: '09:30 AM', action: 'Staff member Sarah logged in', type: 'login' },
    { time: '09:15 AM', action: 'Critical alert resolved', type: 'alert' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#11698E] mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your hospital today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-[#5CDB95]' : 'text-[#FF6B6B]'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#11698E] mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#11698E]">Recent Activities</h2>
            <Activity className="h-5 w-5 text-[#5CDB95]" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'check-in' ? 'bg-[#5CDB95]' :
                  activity.type === 'update' ? 'bg-[#A2D5F2]' :
                  activity.type === 'appointment' ? 'bg-[#11698E]' :
                  activity.type === 'login' ? 'bg-gray-400' :
                  'bg-[#FF6B6B]'
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#11698E]">Department Overview</h2>
            <TrendingUp className="h-5 w-5 text-[#5CDB95]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Emergency</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-[#FF6B6B] h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Surgery</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-[#11698E] h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-sm font-medium">60%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pediatrics</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-[#5CDB95] h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <span className="text-sm font-medium">40%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cardiology</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div className="bg-[#A2D5F2] h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;