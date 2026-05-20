import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import {
  User, Calendar, DollarSign, CreditCard, Bell, Printer,
  CheckCircle, XCircle, Clock, ArrowRight, Users, Filter
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  dob: string;
  paymentStatus?: 'pending' | 'paid' | 'rejected';
  paymentAmount?: string;
  paymentMethod?: string;
  receiptUrl?: string;
  timestamp?: string;
}

interface Payment {
  amount: string;
  method: string;
  receipt: string;
  status: 'pending' | 'paid' | 'rejected';
}

const Pharmacy = () => {
  const navigate = useNavigate();
  // In a real app, this would come from a database or context
  // For now, we'll use mock patients
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'PAT-123456',
      name: 'John Doe',
      dob: '1990-01-01',
      paymentStatus: 'pending',
      timestamp: '10:30 AM'
    },
    {
      id: 'PAT-789012',
      name: 'Jane Smith',
      dob: '1985-05-15',
      paymentStatus: 'pending',
      timestamp: '11:15 AM'
    },
    {
      id: 'PAT-345678',
      name: 'Robert Johnson',
      dob: '1978-08-23',
      paymentStatus: 'paid',
      paymentAmount: '250.00',
      paymentMethod: 'Credit Card',
      timestamp: '09:45 AM'
    }
  ]);
  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'rejected'>('all');

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowPaymentForm(false);
    setPaymentComplete(false);
    setShowReceipt(false);
  };

  const handlePaymentSubmit = (payment: Payment) => {
    if (!selectedPatient) return;
    
    const updatedPatient = {
      ...selectedPatient,
      paymentStatus: payment.status,
      paymentAmount: payment.amount,
      paymentMethod: payment.method,
      receiptUrl: payment.receipt,
    };
    
    setPatients(patients.map(p =>
      p.id === selectedPatient.id ? updatedPatient : p
    ));
    
    setSelectedPatient(updatedPatient);
    setShowPaymentForm(false);
    setPaymentComplete(true);
  };

  const handleNotifyNurse = () => {
    // In a real app, you would send a notification to the nurse
    // For now, we'll just navigate to the nurse dashboard
    navigate('/nurse');
  };

  const handlePrintReceipt = () => {
    setShowReceipt(true);
  };

  const filteredPatients = patients.filter(patient =>
    statusFilter === 'all' || patient.paymentStatus === statusFilter
  );

  const getStatusIcon = (status?: string) => {
    switch(status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-[#11698E] mb-6 flex items-center">
        <CreditCard className="mr-2 h-6 w-6" />
        Pharmacy - Payment Processing
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Queue */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#11698E] flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Payment Queue
              </h2>
              <div className="relative">
                <Filter className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
                <select
                  className="pl-8 pr-4 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#11698E] focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  aria-label="Filter by status"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            
            {filteredPatients.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredPatients.map((patient) => (
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
                        {getStatusIcon(patient.paymentStatus)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {patient.timestamp}
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        patient.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : patient.paymentStatus === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.paymentStatus?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500">No patients in queue</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Middle and Right Columns */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <>
              {/* Patient Information */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-[#11698E] mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Patient Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    <div className="text-sm text-gray-500">Payment Status</div>
                    <div className={`font-medium flex items-center ${
                      selectedPatient.paymentStatus === 'paid'
                        ? 'text-green-600'
                        : selectedPatient.paymentStatus === 'rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                    }`}>
                      {getStatusIcon(selectedPatient.paymentStatus)}
                      <span className="ml-1">{selectedPatient.paymentStatus?.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                
                {selectedPatient.paymentAmount && (
                  <div className="p-3 bg-gray-50 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Amount</div>
                        <div className="font-medium flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {selectedPatient.paymentAmount}
                        </div>
                      </div>
                      
                      {selectedPatient.paymentMethod && (
                        <div>
                          <div className="text-sm text-gray-500">Method</div>
                          <div className="font-medium flex items-center">
                            <CreditCard className="h-4 w-4 mr-1" />
                            {selectedPatient.paymentMethod}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-3">
                  {!showPaymentForm && !paymentComplete && selectedPatient.paymentStatus !== 'paid' && (
                    <button
                      onClick={() => setShowPaymentForm(true)}
                      className="bg-[#11698E] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#0e5a7a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#11698E]"
                    >
                      <DollarSign className="h-5 w-5 mr-2" />
                      Process Payment
                    </button>
                  )}
                  
                  {(paymentComplete || selectedPatient.paymentStatus === 'paid') && (
                    <>
                      <button
                        onClick={handlePrintReceipt}
                        className="bg-[#11698E] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#0e5a7a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#11698E]"
                      >
                        <Printer className="h-5 w-5 mr-2" />
                        Print Receipt
                      </button>
                      
                      <button
                        onClick={handleNotifyNurse}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <Bell className="h-5 w-5 mr-2" />
                        Notify Nurse
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Payment Form or Receipt */}
              {showPaymentForm && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-[#11698E] mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Payment Processing
                  </h2>
                  <PaymentForm onSubmit={handlePaymentSubmit} />
                </div>
              )}
              
              {showReceipt && selectedPatient.paymentStatus === 'paid' && (
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-[#11698E] flex items-center">
                        <Printer className="h-5 w-5 mr-2" />
                        Payment Receipt
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">Receipt #{selectedPatient.id}-{Date.now().toString().slice(-4)}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">CuraOS Hospital</div>
                      <div className="text-sm text-gray-500">123 Medical Center Dr.</div>
                      <div className="text-sm text-gray-500">Healthcare City, HC 12345</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-200 py-4 my-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Patient</div>
                        <div className="font-medium">{selectedPatient.name}</div>
                        <div className="text-sm text-gray-500 mt-1">ID: {selectedPatient.id}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Date & Time</div>
                        <div className="font-medium">{new Date().toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500 mt-1">{new Date().toLocaleTimeString()}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between py-2 border-b">
                      <div className="font-medium">Service Description</div>
                      <div className="font-medium">Amount</div>
                    </div>
                    <div className="flex justify-between py-3">
                      <div>Medical Consultation</div>
                      <div>${selectedPatient.paymentAmount}</div>
                    </div>
                    <div className="flex justify-between py-3 font-bold">
                      <div>Total</div>
                      <div>${selectedPatient.paymentAmount}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="text-sm text-gray-500 mb-1">Payment Method</div>
                    <div className="font-medium flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      {selectedPatient.paymentMethod}
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <div className="flex justify-center mb-2">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="font-semibold text-green-600">Payment Successful</div>
                    <p className="text-sm text-gray-500 mt-1">Thank you for your payment</p>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setShowReceipt(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Close Receipt
                    </button>
                  </div>
                </div>
              )}
              
              {paymentComplete && !showReceipt && (
                <div className={`p-4 rounded-lg mb-4 ${
                  selectedPatient.paymentStatus === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : selectedPatient.paymentStatus === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  <div className="flex items-start">
                    {selectedPatient.paymentStatus === 'paid' ? (
                      <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    ) : selectedPatient.paymentStatus === 'rejected' ? (
                      <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    ) : (
                      <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                    )}
                    <div>
                      <h2 className="text-lg font-semibold mb-1">Payment {selectedPatient.paymentStatus?.toUpperCase()}</h2>
                      <p>
                        {selectedPatient.paymentStatus === 'paid'
                          ? 'Payment has been successfully processed. You can now print a receipt or notify the nurse.'
                          : selectedPatient.paymentStatus === 'rejected'
                            ? 'Payment has been rejected. Please try again or use a different payment method.'
                            : 'Payment is pending. Please complete the payment process.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center h-full">
              <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">Select a patient from the queue to process payment</p>
              <p className="text-sm text-gray-400">
                Tip: You can filter the queue by payment status
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
