import API from "../api";
import axios from "../api";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
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
    e.preventDefault();
    if (!validatePassword(signupData.password)) {
      console.log();




      // try {
      //   const {data}=await axios.post(`http://localhost:5000/api/auth/register-account`, { name, email, mobile, password });
      //   console.log(data)
      //   // alert("Signup successful! Please login.");
      //   // localStorage.setItem("token", JSON.stringify(data.token));
      //   // window.location.href = "/dashboard";
      // } catch (error) {

      // }

    };
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
                id="fullName"
                type="text"
                name='fullName'
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
                value={email}
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
                value={mobile}
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
