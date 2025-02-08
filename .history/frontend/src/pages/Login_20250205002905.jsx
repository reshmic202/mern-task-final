import { toast } from "react-toastify";
import axios from "../api";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          let res=await fetch(`${process.env.REACT_APP_API_URL}/auth/login`,{
            method:"POST",
            headers:{
              'content-type':"application/json"
            },
            body:JSON.stringify({email,password})
          })
          const status=res.status;
          res=await res.json();
          if(status===200){
            toast.success(res.message)
            localStorage.setItem('token',JSON.stringify(res.token));
            window.location.href="/dashboard";
          }else{
            toast.error(res.message)
          }
          console.log(res)
        } catch (error) {
          console.log(error.message)
        }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <p className="text-gray-600 text-sm text-center mt-3">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 font-semibold hover:underline">
              SignUn here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
