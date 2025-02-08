import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [agents, setAgents] = useState(0);
  const [lists, setLists] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      token = JSON.parse(token);

      try {
        let agentRes=await fetch(`${process.env.REACT_APP_API_URL}/agents/count/${token}`);
        agentRes = await agentRes.json()
        let listRes=await fetch(`${process.env.REACT_APP_API_URL}/lists/count/${token}`)
        listRes = await listRes.json()
        setAgents(agentRes.count);
        setLists(listRes.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-5 bg-blue-500 text-white rounded-lg shadow-md">
            <p className="text-xl font-semibold">Total Agents</p>
            <p className="text-2xl font-bold">{agents}</p>
          </div>
          <div className="p-5 bg-green-500 text-white rounded-lg shadow-md">
            <p className="text-xl font-semibold">Total Uploaded Lists</p>
            <p className="text-2xl font-bold">{lists}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/agents")}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Manage Agents
          </button>
          <button
            onClick={() => navigate("/upload")}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Upload CSV
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
