// import React, { useState } from "react";
// import { UploadIcon } from "@heroicons/react/solid";

// export default function UploadMenu() {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type === "application/pdf") {
//       setFile(selectedFile);
//       setMessage("");
//     } else {
//       setFile(null);
//       setMessage("Please select a PDF file.");
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage("Please select a file to upload.");
//       return;
//     }

//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("/api/menu/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         setMessage("Menu uploaded successfully!");
//         setFile(null);
//       } else {
//         throw new Error("Menu upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading menu:", error);
//       setMessage("Failed to upload menu. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//         <div className="px-4 py-5 sm:p-6">
//           <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
//             Upload Menu
//           </h2>
//           <form onSubmit={handleUpload}>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
//               <div className="space-y-1 text-center">
//                 <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600 dark:text-gray-400">
//                   <label
//                     htmlFor="file-upload"
//                     className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//                   >
//                     <span>Upload a file</span>
//                     <input
//                       id="file-upload"
//                       name="file-upload"
//                       type="file"
//                       className="sr-only"
//                       onChange={handleFileChange}
//                       accept=".pdf"
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   PDF up to 10MB
//                 </p>
//               </div>
//             </div>
//             {file && (
//               <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                 Selected file: {file.name}
//               </p>
//             )}
//             {message && (
//               <p
//                 className={`mt-2 text-sm ${
//                   message.includes("successfully")
//                     ? "text-green-600 dark:text-green-400"
//                     : "text-red-600 dark:text-red-400"
//                 }`}
//               >
//                 {message}
//               </p>
//             )}
//             <div className="mt-5">
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 disabled={uploading || !file}
//               >
//                 {uploading ? "Uploading..." : "Upload Menu"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { UploadIcon } from "@heroicons/react/solid";

export default function UploadMenu() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please select a PDF file.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8085/api/menu/upload", {
        // Updated base URL here
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.text();
        setMessage("Menu uploaded successfully!");
        setFile(null);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Menu upload failed");
      }
    } catch (error) {
      console.error("Error uploading menu:", error);
      setMessage(`Failed to upload menu: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Upload Menu
          </h2>
          <form onSubmit={handleUpload}>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF up to 10MB
                </p>
              </div>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Selected file: {file.name}
              </p>
            )}
            {message && (
              <p
                className={`mt-2 text-sm ${
                  message.includes("successfully")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {message}
              </p>
            )}
            <div className="mt-5">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                disabled={uploading || !file}
              >
                {uploading ? "Uploading..." : "Upload Menu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
