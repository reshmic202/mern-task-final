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
    <div>
      <h1>Upload CSV File</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default Upload;
