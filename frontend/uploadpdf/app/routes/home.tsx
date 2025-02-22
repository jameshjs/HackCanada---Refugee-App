"use client";

import React, { useState } from "react";

const UploadBox: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus("");
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus("❌ Please select a file to upload.");
      return;
    }
    
    // Simulate file upload
    setTimeout(() => {
      setUploadStatus("✅ File uploaded successfully!");
      setSelectedFile(null);
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">📂 Upload Government Forms</h2>
        
        <label
          className="w-full p-6 text-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:border-blue-500"
        >
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
          />
          {selectedFile ? <p>{selectedFile.name}</p> : <p>Drag & Drop or Click to Select</p>}
        </label>
        
        <button
          onClick={handleUpload}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Upload
        </button>
        
        {uploadStatus && (
          <p className="mt-4 text-lg font-semibold text-center">{uploadStatus}</p>
        )}
      </div>
    </div>
  );
};

export default UploadBox;