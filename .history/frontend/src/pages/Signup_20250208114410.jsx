import API from "../api";
import axios from "../api";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });
  const [signupDataError, setSignupDataError] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    setSignupDataError({ ...signupDataError, [e.target.name]: "" });
  };

  const validatePassword = (password) => {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    return hasLetter && hasNumber && hasSpecialChar && hasLowercase;
  };

  const validateForm = () => {
    let errors = {};
    if (!signupData.name.trim()) errors.name = "Full Name is required";
    if (!signupData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      errors.email = "Invalid email format";
    }
    if (!signupData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(signupData.mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }
    if (!signupData.password) {
      errors.password = "Password is required";
    } else if (signupData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    setSignupDataError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if(!validatePassword)

    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register-account`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(signupData)
      });
      const status = res.status;
      res = await res.json();
      if (status === 201) {
        toast.success(res.message);
        localStorage.setItem("token", JSON.stringify(res.token));
        window.location.href = "/dashboard";
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
              name="name"
              value={signupData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {signupDataError.name && <p className="text-red-500 text-sm mt-1">{signupDataError.name}</p>}
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
            {signupDataError.email && <p className="text-red-500 text-sm mt-1">{signupDataError.email}</p>}
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
            />
            {signupDataError.mobile && <p className="text-red-500 text-sm mt-1">{signupDataError.mobile}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none flex justify-between items-center">
              <input
                className="border-none outline-none w-full"
                placeholder="Enter your password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={signupData.password}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {signupDataError.password && <p className="text-red-500 text-sm mt-1">{signupDataError.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
          <p className="text-gray-600 text-sm text-center mt-3">
            Already have an account? <a href="/" className="text-blue-500 font-semibold hover:underline">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
