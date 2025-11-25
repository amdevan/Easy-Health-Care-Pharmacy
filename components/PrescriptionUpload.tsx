import React, { useState } from 'react';
import { Upload, FileCheck, AlertCircle, Loader2 } from 'lucide-react';

export const PrescriptionUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploadStatus('idle');
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus('success');
      // Reset after 3 seconds
      setTimeout(() => {
        setFile(null);
        setPreview(null);
        setUploadStatus('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-100 my-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Upload Prescription</h2>
        <p className="text-slate-500 mt-2">
          Upload a clear photo of your doctor's prescription. Our pharmacists will verify and process your order.
        </p>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors relative">
          
          {preview ? (
            <div className="relative w-full h-64">
              <img 
                src={preview} 
                alt="Prescription Preview" 
                className="w-full h-full object-contain rounded-md"
              />
              <button 
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setUploadStatus('idle');
                }}
                className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-500 hover:text-red-700"
              >
                <AlertCircle size={20} />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-primary-500 mb-4" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="bg-primary-50 text-primary-700 font-semibold px-4 py-2 rounded-lg border border-primary-200 hover:bg-primary-100 transition-colors">
                  Select a file
                </span>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
              <p className="mt-2 text-sm text-slate-400">Supported: JPG, PNG, PDF</p>
            </>
          )}
        </div>

        {uploadStatus === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center justify-center gap-2">
            <FileCheck className="w-5 h-5" />
            <span>Prescription uploaded successfully! We will contact you shortly.</span>
          </div>
        ) : (
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              !file 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              'Submit Prescription'
            )}
          </button>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-500">
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 font-bold">1</div>
          <p>Upload clear image</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 font-bold">2</div>
          <p>Pharmacist verifies</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 font-bold">3</div>
          <p>Delivery to Doorstep</p>
        </div>
      </div>
    </div>
  );
};
