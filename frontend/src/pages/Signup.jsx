import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [info, setInfo] = useState({ name: "", email: "", mobile: "", password: "" });
  const [infoError, setinfoError] = useState({name: "",email: "",mobile: "",password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    setinfoError({ ...infoError, [e.target.name]: "" });
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
    if (!info.name.trim()) errors.name = "Full Name is required";
    if (!info.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
      errors.email = "Invalid email format";
    }
    if (!info.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(info.mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }
    if (!info.password) {
      errors.password = "Password is required";
    } else if (info.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    setinfoError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if(!validatePassword(info.password)){
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register-account`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(info)
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
              value={info.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {infoError.name && <p className="text-red-500 text-sm mt-1">{infoError.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={info.email}
              type="email"
              onChange={handleChange}
            />
            {infoError.email && <p className="text-red-500 text-sm mt-1">{infoError.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Mobile Number</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your mobile number"
              id="mobile"
              type="tel"
              name="mobile"
              value={info.mobile}
              onChange={handleChange}
            />
            {infoError.mobile && <p className="text-red-500 text-sm mt-1">{infoError.mobile}</p>}
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
                value={info.password}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {infoError.password && <p className="text-red-500 text-sm mt-1">{infoError.password}</p>}
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
