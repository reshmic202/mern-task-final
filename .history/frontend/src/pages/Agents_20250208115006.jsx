import { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListofAgentsListed from "./ListofAgentsListed";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [info, setInfo] = useState({ name: "", email: "", mobile: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [currentAgentList, setCurrentAgentList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    if (!info.name) tempErrors.name = "Name is required";
    if (!info.email) tempErrors.email = "Email is required";
    if (!info.mobile) tempErrors.mobile = "Mobile number is required";
    if (!info.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const fetchAgents = async () => {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    try {
      let newAgent = await fetch(`${process.env.REACT_APP_API_URL}/agents/${token}`);
      newAgent = await newAgent.json();
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
    if (!validateForm()) return;

    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/agents/add-agent`, {
        method: "POST",
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify({ ...info, token })
      });
      const status = res.status;
      res = await res.json();
      if (status === 201) {
        toast.success(res.message);
        setInfo({ name: "", email: "", mobile: "", password: "" });
        setErrors({});
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [handleAddAgent]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage Agents</h1>

        {/* Add Agent Form */}
        <form onSubmit={handleAddAgent} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Mobile"
              value={info.mobile}
              onChange={(e) => setInfo({ ...info, mobile: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Agent
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agents;
