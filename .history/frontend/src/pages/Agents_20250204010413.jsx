import { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await axios.get("/api/agents");
      setAgents(data.newAgent);
    };
    fetchAgents();
  }, []);

  const handleAddAgent = async (e) => {
    e.preventDefault();
    await axios.post("/api/agents/add-agent", { name, email, mobile, password });
    alert("Agent added successfully");
    window.location.reload();
  };

  return (
    <div>
      <h1>Manage Agents</h1>
      <form onSubmit={handleAddAgent}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Add Agent</button>
      </form>

      <h2>Agents List</h2>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>{agent.name} - {agent.email} - {agent.mobile}</li>
        ))}
      </ul>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default Agents;
