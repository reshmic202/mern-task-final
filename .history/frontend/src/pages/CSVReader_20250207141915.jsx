import React, { useState } from "react";
import Papa from "papaparse";

const CSVReader = () => {
  const [data, setData] = useState([]);

  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        Papa.parse(target.result, {
          header: true, // Parses CSV into JSON format
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
          },
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h2>Upload and Read CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      
      {data.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CSVReader;