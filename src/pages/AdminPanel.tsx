import React, { useState } from 'react';
import { roles } from '../utils/roles';
import {
  Users, UserPlus, FileText, BarChart3, DollarSign,
  Activity, Calendar, Bell, Settings, Clipboard,
  UserCheck, AlertCircle, Lock, Unlock, Edit, Trash2,
  ChevronUp, ChevronDown, Search, Filter, Download
} from 'lucide-react';

// Add custom CSS for hiding scrollbars in a clean way across browsers
const hideScrollbarStyles = `
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`;

interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: 'active' | 'inactive';
  lastActive?: string;
}

interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  isConfidential: boolean;
}

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  date: string;
  isRead: boolean;
}

interface DashboardStats {
  totalPatients: number;
  totalStaff: number;
  totalConsultations: number;
  revenue: number;
  pendingAppointments?: number;
  activeAlerts?: number;
  patientTrend?: number;
  revenueTrend?: number;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'staff' | 'consultations' | 'reports' | 'alerts'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [staffFilter, setStaffFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [consultationFilter, setConsultationFilter] = useState<'all' | 'confidential' | 'public'>('all');
  
  // Mock data for dashboard stats
  const [dashboardStats] = useState<DashboardStats>({
    totalPatients: 150,
    totalStaff: 25,
    totalConsultations: 320,
    revenue: 45000,
    pendingAppointments: 12,
    activeAlerts: 3,
    patientTrend: 8,
    revenueTrend: 12
  });
  
  // Mock data for staff
  const [staffList, setStaffList] = useState<Staff[]>([
    { id: 'STF-001', name: 'Dr. John Smith', email: 'john.smith@hospital.com', role: 'doctor', status: 'active', lastActive: '2023-06-20' },
    { id: 'STF-002', name: 'Jane Doe', email: 'jane.doe@hospital.com', role: 'nurse', status: 'active', lastActive: '2023-06-21' },
    { id: 'STF-003', name: 'Robert Johnson', email: 'robert.johnson@hospital.com', role: 'receptionist', status: 'active', lastActive: '2023-06-19' },
    { id: 'STF-004', name: 'Mary Williams', email: 'mary.williams@hospital.com', role: 'pharmacy', status: 'inactive', lastActive: '2023-05-30' },
    { id: 'STF-005', name: 'David Brown', email: 'david.brown@hospital.com', role: 'admin', status: 'active', lastActive: '2023-06-21' },
  ]);
  
  // Mock data for consultations
  const [consultations] = useState<Consultation[]>([
    {
      id: 'CON-001',
      patientId: 'PAT-123456',
      patientName: 'John Doe',
      doctorName: 'Dr. John Smith',
      date: '2023-06-15',
      diagnosis: 'Common cold',
      isConfidential: false
    },
    {
      id: 'CON-002',
      patientId: 'PAT-789012',
      patientName: 'Jane Smith',
      doctorName: 'Dr. John Smith',
      date: '2023-06-16',
      diagnosis: 'Hypertension',
      isConfidential: true
    },
    {
      id: 'CON-003',
      patientId: 'PAT-345678',
      patientName: 'Michael Johnson',
      doctorName: 'Dr. Sarah Lee',
      date: '2023-06-17',
      diagnosis: 'Diabetes Type 2',
      isConfidential: true
    },
    {
      id: 'CON-004',
      patientId: 'PAT-901234',
      patientName: 'Emily Davis',
      doctorName: 'Dr. John Smith',
      date: '2023-06-18',
      diagnosis: 'Allergic rhinitis',
      isConfidential: false
    },
  ]);
  
  // Mock data for alerts
  const [alerts] = useState<Alert[]>([
    {
      id: 'ALT-001',
      type: 'warning',
      message: 'Low medication stock for Lisinopril',
      date: '2023-06-21',
      isRead: false
    },
    {
      id: 'ALT-002',
      type: 'error',
      message: 'System backup failed',
      date: '2023-06-20',
      isRead: false
    },
    {
      id: 'ALT-003',
      type: 'info',
      message: 'New staff onboarding scheduled for tomorrow',
      date: '2023-06-19',
      isRead: true
    },
  ]);
  
  // State for new staff form
  const [newStaff, setNewStaff] = useState<Omit<Staff, 'id'>>({
    name: '',
    email: '',
    role: 'receptionist',
  });
  
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };
  
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const staffId = `STF-${(staffList.length + 1).toString().padStart(3, '0')}`;
    const staff = { id: staffId, ...newStaff };
    setStaffList([...staffList, staff]);
    setNewStaff({ name: '', email: '', role: 'receptionist' });
    setShowAddStaffForm(false);
  };
  
  const handleRemoveStaff = (id: string) => {
    setStaffList(staffList.filter(staff => staff.id !== id));
  };
  
  const handleExportReport = (reportType: string) => {
    // In a real app, this would generate and download a report
    alert(`Exporting ${reportType} report...`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Add the style tag for custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarStyles }} />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-[#11698E] flex items-center">
          <Settings className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
          Admin Panel
        </h1>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
              aria-label="Search"
            />
          </div>
          
          <div className="relative group">
            <button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative"
              aria-label={`Notifications ${alerts.filter(a => !a.isRead).length > 0 ? `(${alerts.filter(a => !a.isRead).length} unread)` : ''}`}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {alerts.filter(a => !a.isRead).length > 0 && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" aria-hidden="true"></span>
              )}
            </button>
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 invisible group-hover:visible transition-all duration-300 opacity-0 group-hover:opacity-100">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {alerts.length > 0 ? (
                  alerts.map(alert => (
                    <div key={alert.id} className={`p-3 border-b border-gray-100 ${!alert.isRead ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-start">
                        {alert.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" aria-hidden="true" />}
                        {alert.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" aria-hidden="true" />}
                        {alert.type === 'info' && <Bell className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" aria-hidden="true" />}
                        <div>
                          <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500">No notifications</div>
                )}
              </div>
              <div className="p-2 border-t border-gray-200 text-center">
                <button className="text-sm text-[#11698E] hover:underline">View all notifications</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6 border-b border-gray-200">
        <div className="flex overflow-x-auto pb-1 hide-scrollbar">
          <button
            className={`py-2 sm:py-3 px-3 sm:px-4 flex items-center whitespace-nowrap ${activeTab === 'dashboard' ? 'border-b-2 border-[#11698E] text-[#11698E]' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('dashboard')}
            aria-label="Dashboard tab"
            aria-selected={activeTab === 'dashboard'}
            role="tab"
          >
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" aria-hidden="true" />
            <span className="text-sm sm:text-base">Dashboard</span>
          </button>
          <button
            className={`py-2 sm:py-3 px-3 sm:px-4 flex items-center whitespace-nowrap ${activeTab === 'staff' ? 'border-b-2 border-[#11698E] text-[#11698E]' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('staff')}
            aria-label="Staff Management tab"
            aria-selected={activeTab === 'staff'}
            role="tab"
          >
            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" aria-hidden="true" />
            <span className="text-sm sm:text-base">Staff</span>
          </button>
          <button
            className={`py-2 sm:py-3 px-3 sm:px-4 flex items-center whitespace-nowrap ${activeTab === 'consultations' ? 'border-b-2 border-[#11698E] text-[#11698E]' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('consultations')}
            aria-label="Consultations tab"
            aria-selected={activeTab === 'consultations'}
            role="tab"
          >
            <Clipboard className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" aria-hidden="true" />
            <span className="text-sm sm:text-base">Consultations</span>
          </button>
          <button
            className={`py-2 sm:py-3 px-3 sm:px-4 flex items-center whitespace-nowrap ${activeTab === 'reports' ? 'border-b-2 border-[#11698E] text-[#11698E]' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('reports')}
            aria-label="Reports tab"
            aria-selected={activeTab === 'reports'}
            role="tab"
          >
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" aria-hidden="true" />
            <span className="text-sm sm:text-base">Reports</span>
          </button>
          <button
            className={`py-2 sm:py-3 px-3 sm:px-4 flex items-center whitespace-nowrap ${activeTab === 'alerts' ? 'border-b-2 border-[#11698E] text-[#11698E]' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('alerts')}
            aria-label="Alerts tab"
            aria-selected={activeTab === 'alerts'}
            role="tab"
          >
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" aria-hidden="true" />
            <span className="text-sm sm:text-base">Alerts</span>
            {alerts.filter(a => !a.isRead).length > 0 && (
              <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                {alerts.filter(a => !a.isRead).length}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {activeTab === 'dashboard' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#11698E]">Total Patients</h2>
                  <p className="text-2xl sm:text-3xl font-bold mt-2">{dashboardStats.totalPatients}</p>
                </div>
                <div className="p-2 sm:p-3 bg-blue-50 rounded-full">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#11698E]" aria-hidden="true" />
                </div>
              </div>
              {dashboardStats.patientTrend && (
                <div className="flex items-center text-sm">
                  <span className="text-green-500 flex items-center">
                    <ChevronUp className="h-4 w-4 mr-1" aria-hidden="true" />
                    {dashboardStats.patientTrend}%
                  </span>
                  <span className="text-gray-500 ml-2">from last month</span>
                </div>
              )}
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#11698E]">Revenue</h2>
                  <p className="text-2xl sm:text-3xl font-bold mt-2">${dashboardStats.revenue.toLocaleString()}</p>
                </div>
                <div className="p-2 sm:p-3 bg-green-50 rounded-full">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" aria-hidden="true" />
                </div>
              </div>
              {dashboardStats.revenueTrend && (
                <div className="flex items-center text-sm">
                  <span className="text-green-500 flex items-center">
                    <ChevronUp className="h-4 w-4 mr-1" aria-hidden="true" />
                    {dashboardStats.revenueTrend}%
                  </span>
                  <span className="text-gray-500 ml-2">from last month</span>
                </div>
              )}
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#11698E]">Consultations</h2>
                  <p className="text-2xl sm:text-3xl font-bold mt-2">{dashboardStats.totalConsultations}</p>
                </div>
                <div className="p-2 sm:p-3 bg-purple-50 rounded-full">
                  <Clipboard className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-500">
                  {consultations.filter(c => c.isConfidential).length} confidential
                </span>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#11698E]">Staff</h2>
                  <p className="text-2xl sm:text-3xl font-bold mt-2">{dashboardStats.totalStaff}</p>
                </div>
                <div className="p-2 sm:p-3 bg-yellow-50 rounded-full">
                  <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" aria-hidden="true" />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-500">
                  {staffList.filter(s => s.status === 'active').length} active
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-[#11698E]">Recent Consultations</h2>
                <button
                  className="text-sm text-[#11698E] hover:underline flex items-center"
                  aria-label="View all consultations"
                >
                  View all
                  <ChevronDown className="h-4 w-4 ml-1" aria-hidden="true" />
                </button>
              </div>
              
              <div className="overflow-x-auto hide-scrollbar">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                      <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="py-2 px-2 sm:px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {consultations.slice(0, 5).map((consultation) => (
                      <tr key={consultation.id} className="hover:bg-gray-50">
                        <td className="py-2 sm:py-3 px-2 sm:px-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{consultation.patientName}</div>
                          <div className="text-xs text-gray-500">{consultation.patientId}</div>
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 whitespace-nowrap text-sm sm:text-base">
                          {consultation.doctorName}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 whitespace-nowrap text-sm sm:text-base">
                          {consultation.date}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 whitespace-nowrap">
                          {consultation.isConfidential ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center w-fit">
                              <Lock className="h-3 w-3 mr-1" aria-hidden="true" />
                              <span>Confidential</span>
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center w-fit">
                              <Unlock className="h-3 w-3 mr-1" aria-hidden="true" />
                              <span>Public</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-[#11698E]">Recent Alerts</h2>
                <button
                  className="text-sm text-[#11698E] hover:underline flex items-center"
                  aria-label="View all alerts"
                >
                  View all
                  <ChevronDown className="h-4 w-4 ml-1" aria-hidden="true" />
                </button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg ${
                      alert.type === 'warning' ? 'bg-yellow-50' :
                      alert.type === 'error' ? 'bg-red-50' : 'bg-blue-50'
                    }`}
                    role="alert"
                    aria-live={alert.type === 'error' ? 'assertive' : 'polite'}
                  >
                    <div className="flex items-start">
                      {alert.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" aria-hidden="true" />}
                      {alert.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" aria-hidden="true" />}
                      {alert.type === 'info' && <Bell className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" aria-hidden="true" />}
                      <div>
                        <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {dashboardStats.pendingAppointments && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 border border-dashed border-[#11698E] rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-[#11698E] mr-1 sm:mr-2" aria-hidden="true" />
                      <span className="font-medium text-[#11698E] text-sm sm:text-base">Pending Appointments</span>
                    </div>
                    <span className="bg-[#11698E] text-white px-2 py-1 rounded-full text-xs font-medium">
                      {dashboardStats.pendingAppointments}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'staff' && (
        <div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddStaffForm(true)}
                className="bg-[#11698E] text-white px-4 py-2 rounded-lg flex items-center"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add New Staff
              </button>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Filter:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className={`px-3 py-1 text-sm ${staffFilter === 'all' ? 'bg-[#11698E] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setStaffFilter('all')}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-sm ${staffFilter === 'active' ? 'bg-[#11698E] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setStaffFilter('active')}
                >
                  Active
                </button>
                <button
                  className={`px-3 py-1 text-sm ${staffFilter === 'inactive' ? 'bg-[#11698E] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setStaffFilter('inactive')}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>
          
          {showAddStaffForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#11698E]">Add New Staff</h2>
                <button
                  onClick={() => setShowAddStaffForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddStaff} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newStaff.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newStaff.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                      required
                      placeholder="john.doe@hospital.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={newStaff.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                    required
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddStaffForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#11698E] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a73] transition-colors"
                  >
                    Add Staff
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#11698E]">Staff List</h2>
              <div className="text-sm text-gray-500">
                Total: {staffList.length} | Active: {staffList.filter(s => s.status === 'active').length} | Inactive: {staffList.filter(s => s.status === 'inactive').length}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staffList
                    .filter(staff => {
                      // Apply status filter
                      if (staffFilter !== 'all') {
                        return staff.status === staffFilter;
                      }
                      return true;
                    })
                    .filter(staff => {
                      // Apply search filter
                      if (searchTerm) {
                        return (
                          staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.id.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                      }
                      return true;
                    })
                    .map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap">{staff.id}</td>
                      <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">{staff.name}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{staff.email}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          staff.role === 'doctor' ? 'bg-blue-100 text-blue-800' :
                          staff.role === 'nurse' ? 'bg-green-100 text-green-800' :
                          staff.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          staff.role === 'pharmacy' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {staff.status === 'active' ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Inactive</span>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">
                        {staff.lastActive || 'N/A'}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="Edit staff member"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveStaff(staff.id)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Remove staff member"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {staffList
                .filter(staff => {
                  if (staffFilter !== 'all') {
                    return staff.status === staffFilter;
                  }
                  return true;
                })
                .filter(staff => {
                  if (searchTerm) {
                    return (
                      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      staff.id.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                  }
                  return true;
                }).length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No staff members found matching your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'consultations' && (
        <div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search consultations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Filter:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className={`px-3 py-1 text-sm ${consultationFilter === 'all' ? 'bg-[#11698E] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setConsultationFilter('all')}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-sm ${consultationFilter === 'confidential' ? 'bg-[#11698E] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setConsultationFilter('confidential')}
                >
                  Confidential
                </button>
                <button
                  className={`px-3 py-1 text-sm ${consultationFilter === 'public' ? 'bg-[#11698E] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setConsultationFilter('public')}
                >
                  Public
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#11698E]">Consultation Records</h2>
              <div className="text-sm text-gray-500">
                Total: {consultations.length} | Confidential: {consultations.filter(c => c.isConfidential).length} | Public: {consultations.filter(c => !c.isConfidential).length}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {consultations
                    .filter(consultation => {
                      // Apply confidentiality filter
                      if (consultationFilter === 'confidential') {
                        return consultation.isConfidential;
                      } else if (consultationFilter === 'public') {
                        return !consultation.isConfidential;
                      }
                      return true;
                    })
                    .filter(consultation => {
                      // Apply search filter
                      if (searchTerm) {
                        return (
                          consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          consultation.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          consultation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          consultation.patientId.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                      }
                      return true;
                    })
                    .map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap">{consultation.id}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{consultation.patientName}</div>
                        <div className="text-xs text-gray-500">{consultation.patientId}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">{consultation.doctorName}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{consultation.date}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{consultation.diagnosis}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {consultation.isConfidential ? (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center w-fit">
                            <Lock className="h-3 w-3 mr-1" />
                            Confidential
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center w-fit">
                            <Unlock className="h-3 w-3 mr-1" />
                            Public
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="View consultation details"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="Edit consultation"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {consultations
                .filter(consultation => {
                  if (consultationFilter === 'confidential') {
                    return consultation.isConfidential;
                  } else if (consultationFilter === 'public') {
                    return !consultation.isConfidential;
                  }
                  return true;
                })
                .filter(consultation => {
                  if (searchTerm) {
                    return (
                      consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      consultation.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      consultation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      consultation.patientId.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                  }
                  return true;
                }).length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No consultations found matching your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'reports' && (
        <div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#11698E] mb-4">Generate Reports</h2>
            <p className="text-gray-600">Select a report type to generate and download.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-50 rounded-full mr-4">
                  <Users className="h-6 w-6 text-[#11698E]" />
                </div>
                <h3 className="text-lg font-semibold">Patient Reports</h3>
              </div>
              <p className="text-gray-600 mb-4">View patient statistics, demographics, and visit history.</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleExportReport('monthly-patient-visits')}
                  className="w-full flex items-center justify-between bg-white border border-[#11698E] text-[#11698E] px-4 py-2 rounded-lg hover:bg-[#f0f7fa] transition-colors"
                >
                  <span>Monthly Patient Visits</span>
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleExportReport('patient-demographics')}
                  className="w-full flex items-center justify-between bg-white border border-[#11698E] text-[#11698E] px-4 py-2 rounded-lg hover:bg-[#f0f7fa] transition-colors"
                >
                  <span>Patient Demographics</span>
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-50 rounded-full mr-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">Financial Reports</h3>
              </div>
              <p className="text-gray-600 mb-4">Track revenue, payments, and financial performance.</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleExportReport('monthly-revenue')}
                  className="w-full flex items-center justify-between bg-white border border-[#11698E] text-[#11698E] px-4 py-2 rounded-lg hover:bg-[#f0f7fa] transition-colors"
                >
                  <span>Monthly Revenue</span>
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleExportReport('payment-status')}
                  className="w-full flex items-center justify-between bg-white border border-[#11698E] text-[#11698E] px-4 py-2 rounded-lg hover:bg-[#f0f7fa] transition-colors"
                >
                  <span>Payment Status</span>
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-50 rounded-full mr-4">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold">Department Reports</h3>
              </div>
              <p className="text-gray-600 mb-4">Analyze department performance and staff activity.</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleExportReport('department-usage')}
                  className="w-full flex items-center justify-between bg-white border border-[#11698E] text-[#11698E] px-4 py-2 rounded-lg hover:bg-[#f0f7fa] transition-colors"
                >
                  <span>Department Usage</span>
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleExportReport('staff-activity')}
                  className="w-full flex items-center justify-between bg-white border border-[#11698E] text-[#11698E] px-4 py-2 rounded-lg hover:bg-[#f0f7fa] transition-colors"
                >
                  <span>Staff Activity</span>
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#11698E]">Recent Reports</h3>
              <button className="text-sm text-[#11698E] hover:underline flex items-center">
                View all
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated By</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">Monthly Patient Visits</td>
                    <td className="py-3 px-4 whitespace-nowrap">David Brown</td>
                    <td className="py-3 px-4 whitespace-nowrap">2023-06-20</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button className="text-[#11698E] hover:text-[#0e5a73] flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">Staff Activity</td>
                    <td className="py-3 px-4 whitespace-nowrap">David Brown</td>
                    <td className="py-3 px-4 whitespace-nowrap">2023-06-18</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button className="text-[#11698E] hover:text-[#0e5a73] flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">Monthly Revenue</td>
                    <td className="py-3 px-4 whitespace-nowrap">David Brown</td>
                    <td className="py-3 px-4 whitespace-nowrap">2023-06-15</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button className="text-[#11698E] hover:text-[#0e5a73] flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
