import React, { useState, useRef } from 'react';

const ConsultationForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);
  const [attachment, setAttachment] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setAttachment(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would upload the file to a server here
    // and get back a URL to store in the database
    onSubmit({ diagnosis, notes, isConfidential, attachment });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[#11698E] mb-1">Diagnosis</label>
        <input type="text" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg" required />
      </div>
      <div>
        <label className="block text-[#11698E] mb-1">Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 border border-[#A2D5F2] rounded-lg" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" checked={isConfidential} onChange={e => setIsConfidential(e.target.checked)} className="mr-2" />
        <label className="text-[#11698E]">Confidential</label>
      </div>
      <div>
        <label className="block text-[#11698E] mb-1">Attachment</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={attachment}
            onChange={e => setAttachment(e.target.value)}
            className="flex-1 px-3 py-2 border border-[#A2D5F2] rounded-lg"
            placeholder="No file selected"
            readOnly
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
          >
            Browse
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {selectedFile && (
          <p className="mt-1 text-sm text-gray-500">
            Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
          </p>
        )}
      </div>
      <button type="submit" className="w-full bg-[#11698E] text-white py-2 rounded-lg font-semibold hover:bg-[#0e5a7a] transition-colors">Submit Consultation</button>
    </form>
  );
};

export default ConsultationForm;
