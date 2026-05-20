import React, { useState } from 'react';

const PaymentForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [amount, setAmount] = useState('');
  const [receipt, setReceipt] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount, receipt, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[#11698E] mb-1">Amount</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg" required />
      </div>
      <div>
        <label className="block text-[#11698E] mb-1">Receipt (file name or link)</label>
        <input type="text" value={receipt} onChange={e => setReceipt(e.target.value)} className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg" required />
      </div>
      <div>
        <label className="block text-[#11698E] mb-1">Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg">
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-[#11698E] text-white py-2 rounded-lg font-semibold hover:bg-[#0e5a7a] transition-colors">Confirm Payment</button>
    </form>
  );
};

export default PaymentForm;
