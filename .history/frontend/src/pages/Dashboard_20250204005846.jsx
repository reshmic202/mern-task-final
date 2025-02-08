import { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [agents, setAgents] = useState(0);
  const [lists, setLists] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token=localStorage.getItem('token');
      const agentRes = await axios.get("/api/agents/count");
      const listRes = await axios.get(`/api/lists/count/${token}");
      setAgents(agentRes.data.count);
      setLists(listRes.data.count);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Agents: {agents}</p>
      <p>Total Uploaded Lists: {lists}</p>
      <button onClick={() => navigate("/agents")}>Manage Agents</button>
      <button onClick={() => navigate("/upload")}>Upload CSV</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
