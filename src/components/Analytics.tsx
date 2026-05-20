import React from 'react';
import { TrendingUp, Users, Calendar, Activity, BarChart3, PieChart } from 'lucide-react';

const Analytics = () => {
  const metrics = [
    {
      title: 'Patient Satisfaction',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Users,
      color: 'bg-[#5CDB95]'
    },
    {
      title: 'Average Wait Time',
      value: '12 min',
      change: '-3 min',
      trend: 'down',
      icon: Calendar,
      color: 'bg-[#A2D5F2]'
    },
    {
      title: 'Bed Occupancy',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Activity,
      color: 'bg-[#11698E]'
    },
    {
      title: 'Staff Efficiency',
      value: '91.5%',
      change: '+1.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-[#FF6B6B]'
    }
  ];

  const departmentData = [
    { name: 'Emergency', patients: 145, revenue: '$45,200', efficiency: 92 },
    { name: 'Surgery', patients: 89, revenue: '$78,900', efficiency: 88 },
    { name: 'Cardiology', patients: 67, revenue: '$34,500', efficiency: 95 },
    { name: 'Pediatrics', patients: 123, revenue: '$28,700', efficiency: 90 },
    { name: 'Orthopedics', patients: 78, revenue: '$52,300', efficiency: 87 }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#11698E] mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Hospital performance metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <span className={`text-sm font-medium flex items-center ${
                metric.trend === 'up' ? 'text-[#5CDB95]' : 'text-[#FF6B6B]'
              }`}>
                {metric.change}
                <TrendingUp className={`h-3 w-3 ml-1 ${
                  metric.trend === 'down' ? 'rotate-180' : ''
                }`} />
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#11698E] mb-1">{metric.value}</h3>
            <p className="text-gray-600 text-sm">{metric.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Patient Flow Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#11698E]">Patient Flow (Last 7 Days)</h2>
            <BarChart3 className="h-5 w-5 text-[#5CDB95]" />
          </div>
          <div className="space-y-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const values = [45, 52, 38, 61, 48, 35, 29];
              const percentage = (values[index] / 70) * 100;
              return (
                <div key={day} className="flex items-center">
                  <div className="w-8 text-sm text-gray-600">{day}</div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-[#11698E] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-sm font-medium text-[#11698E]">{values[index]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#11698E]">Revenue by Department</h2>
            <PieChart className="h-5 w-5 text-[#5CDB95]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#11698E] rounded-full mr-3"></div>
                <span className="text-gray-700">Surgery</span>
              </div>
              <span className="font-semibold text-[#11698E]">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#5CDB95] rounded-full mr-3"></div>
                <span className="text-gray-700">Emergency</span>
              </div>
              <span className="font-semibold text-[#11698E]">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#A2D5F2] rounded-full mr-3"></div>
                <span className="text-gray-700">Orthopedics</span>
              </div>
              <span className="font-semibold text-[#11698E]">22%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#FF6B6B] rounded-full mr-3"></div>
                <span className="text-gray-700">Cardiology</span>
              </div>
              <span className="font-semibold text-[#11698E]">18%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Department Performance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-[#11698E]">Department Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-[#11698E]">Department</th>
                <th className="text-left py-3 px-6 font-semibold text-[#11698E]">Patients</th>
                <th className="text-left py-3 px-6 font-semibold text-[#11698E]">Revenue</th>
                <th className="text-left py-3 px-6 font-semibold text-[#11698E]">Efficiency</th>
                <th className="text-left py-3 px-6 font-semibold text-[#11698E]">Status</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.map((dept, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-[#11698E]">{dept.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{dept.patients}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-[#5CDB95]">{dept.revenue}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-[#11698E] h-2 rounded-full"
                          style={{ width: `${dept.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{dept.efficiency}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      dept.efficiency >= 90 ? 'bg-[#5CDB95] text-white' :
                      dept.efficiency >= 85 ? 'bg-[#A2D5F2] text-[#11698E]' :
                      'bg-[#FF6B6B] text-white'
                    }`}>
                      {dept.efficiency >= 90 ? 'Excellent' :
                       dept.efficiency >= 85 ? 'Good' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;