import { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/lists/upload-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("CSV uploaded and distributed successfully");
      navigate("/dashboard");
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Upload CSV File</h1>
        
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Upload
          </button>
        </form>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-4 bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Upload;
