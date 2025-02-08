import API from "../api";
import axios from "../api";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });


  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value })
  }
  const validatePassword = (password) => {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    return hasLetter && hasNumber && hasSpecialChar && hasLowercase;
  };

  const handleSubmit = async (e) => {
    console.log(process.env.REACT_APP_API_URL)
    e.preventDefault();
    if (!validatePassword(signupData.password)) {
      console.log("Password should contain at least 8 characters, including at least one uppercase letter, one lower")
      return;
    };
    try {
      let res=await fetch(`${process.env.REACT_APP_API_URL}/auth/register-account`,{
        method:"POST",
        headers:{
          'content-type':"application/json"
        },
        body:JSON.stringify(signupData)
      })
      const status=res.status;
      res=await res.json();
      if(status===201){
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
  }

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                id="name"
                type="text"
                name='name'
                value={signupData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={signupData.email}
                type="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Mobile Number</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your mobile number"
                id="mobile"
                type="tel"
                name="mobile"
                value={signupData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your password"
                id="password"
                name="password"
                minLength={8}
                type={"password"}
                value={signupData.password}
                onChange={handleChange}
                required
              />

            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
            <p className="text-gray-600 text-sm text-center mt-3">
              Already have an account?{" "}
              <a href="/" className="text-blue-500 font-semibold hover:underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }

  export default Signup;
