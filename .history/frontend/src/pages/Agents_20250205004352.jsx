import { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fetchAgents = async () => {
    try {
      let newAgent = await fetch(`${process.env.REACT_APP_API_URL}/agents`)
      newAgent = await newAgent.json()
      setAgents(newAgent.newAgent);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };
  useEffect(() => {
    fetchAgents();
  }, []);

  const handleAddAgent = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/agents/add-agent`, {
        method: "POST",
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify({ name, email, mobile, password })
      })
      const status = res.status;
      res = await res.json();
      if (status === 201) {
        toast.success(res.message)
        setName("")
        setEmail("")
        setMobile("")
        setPassword("")
      } else {
        toast.error(res.message)
      }
      console.log(res)
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(()=>{
    fetchAgents()
  },[handleAddAgent])

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage Agents</h1>

        {/* Add Agent Form */}
        <form onSubmit={handleAddAgent} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Agent
          </button>
        </form>

        {/* Agents List */}
        <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-4">Agents List</h2>
        <ul className="w-full space-y-2">
          {agents.length > 0 ? (
            agents.map((agent) => (
              <li
                key={agent._id}
                className="bg-gray-100 p-3 rounded-lg shadow-md flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">{agent.name}</span>
                <span className="text-gray-600">{agent.email}</span>
                <span className="text-gray-600">{agent.mobile}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No agents found</p>
          )}
        </ul>

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-6 bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Agents;
