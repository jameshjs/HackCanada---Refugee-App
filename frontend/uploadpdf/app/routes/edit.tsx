// "use client";

// import React, { useState } from "react";

// const UploadBox: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<string>("");
//   const []

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(event.target.files[0]);
//       setUploadStatus("");
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setUploadStatus("❌ Please select a file to upload.");
//       return;
//     }

//     setUploadStatus("⚠️ Uploading to server...")

//     try {

//       const  data = new FormData()
//       data.append('file', selectedFile)
  
//       const sentRequest = await fetch('http://127.0.0.1:8000/document/upload', {
//         method: 'POST',
//         body: data
//       })
  
//       const response = await sentRequest.json()
  
//       console.log(response)
      
//       setUploadStatus("✅ File uploaded successfully!");
//     } catch (error) {

//       setUploadStatus("😭 Failed to upload!");
//     }

//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4 text-center">Edit Document</h2>
        
//         <label
//           className="w-full p-6 text-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:border-blue-500"
//         >
//           <input 
//             type="file" 
//             className="hidden" 
//             onChange={handleFileChange} 
//           />
//           {selectedFile ? <p>{selectedFile.name}</p> : <p>Drag & Drop or Click to Select</p>}
//         </label>
        
//         <button
//           onClick={handleUpload}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
//         >
//           Upload
//         </button>
        
//         {uploadStatus && (
//           <p className="mt-4 text-lg font-semibold text-center">{uploadStatus}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadBox;