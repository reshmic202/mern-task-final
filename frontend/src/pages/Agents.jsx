import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListofAgentsListed from "./ListofAgentsListed";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [info, setInfo] = useState({ name: "", email: "", mobile: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [currentAgentList, setCurrentAgentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const validatePassword = (password) => {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    return hasLetter && hasNumber && hasSpecialChar && hasLowercase;
  };

  const handleAddAgent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!validatePassword(info.password)) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

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

  const getLists = async (id) => {
    try {
      let newAgent = await fetch(`${process.env.REACT_APP_API_URL}/lists/list-of-current-agent/${id}`)
      newAgent = await newAgent.json()
      setCurrentAgentList(newAgent.count);
      setShowModal(true)
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

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
            
            <div className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none flex justify-between items-center">
              <input
                className="border-none outline-none w-full"
                placeholder="Enter your password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={info.password}
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
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
                onClick={() => {
                  getLists(agent._id)
                }}
                key={agent._id}
                className="bg-gray-100 p-3 rounded-lg shadow-md flex justify-between cursor-pointer items-center"
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


      {
        showModal && (
          <div className=" fixed top-0 left-0 w-full flex items-center justify-center min-h-screen backdrop-blur-md">{
            currentAgentList.length > 0 ? (
              <ul className=" lg:w-1/2 flex items-center flex-col w-full gap-1">
                <button onClick={() => {
                  setShowModal(false)
                  setCurrentAgentList([])
                }} className=" bg-red-600 absolute right-12 top-1 p-3 rounded-full text-white w-8 h-8 flex items-center justify-center">X</button>
                <span className="text-gray-600 font-bold text-center">Added By: {currentAgentList[0]?.agentId?.name}</span>
                {
                  currentAgentList.map((item) => {
                    return (
                      <ListofAgentsListed item={item} name={currentAgentList?.agentId?.name} />
                    )
                  })
                }
              </ul>
            ) :
              (
                <>
                  <button onClick={() => {
                    setShowModal(false)
                    setCurrentAgentList([])
                  }} className=" bg-red-600 absolute right-12 top-1 p-3 rounded-full text-white w-8 h-8 flex items-center justify-center">X</button>
                  <h1>No Task assigned to the current agent.</h1>
                </>
              )
          }
          </div>
        )
      }
    </div>
    // </div>
  );
}

export default Agents;
