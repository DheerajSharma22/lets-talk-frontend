import authImg from "../assets/auth-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp, setSignupData } from "../Redux/Slice/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmPassword: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setSignupData(formData));
    dispatch(sendOtp(formData.email, navigate));
  };

  return (
    <div className="authBg">
      <div className="sm:w-[500px] bg-white rounded-md  shadow-2xl p-8 text-center max-w-[90%] w-full mx-auto">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h3 className="text-2xl font-semibold">Register Account</h3>
          <p className="text-gray-500 text-sm">
            Get your free Let's Talk Account
          </p>
        </div>

        <form className="mt-8 flex flex-col gap-6" onSubmit={submitHandler}>
          <div className="flex flex-col gap-1 text-start">
            <label
              htmlFor="email"
              className="ml-1 sm:text-lg text-sm font-medium"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="bg-gray-50 px-3 py-2 rounded-md text-md text-black border border-gray-300 outline-none hover:border-blue-400 focus:border-blue-400"
              value={formData.email}
              onChange={changeHandler}
            />
          </div>

          <div className="flex flex-col gap-1 text-start">
            <label
              htmlFor="username"
              className="ml-1 sm:text-lg text-sm font-medium"
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="Enter your username"
              className="bg-gray-50 px-3 py-2 rounded-md text-md text-black border border-gray-300 outline-none hover:border-blue-400 focus:border-blue-400"
              value={formData.username}
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-col gap-1 text-start">
            <label
              htmlFor="password"
              className="ml-1 sm:text-lg text-sm font-medium"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              className="bg-gray-50 px-3 py-2 rounded-md text-md text-black border border-gray-300 outline-none hover:border-blue-400 focus:border-blue-400"
              value={formData.password}
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-col gap-1 text-start">
            <label
              htmlFor="confirmPassword"
              className="ml-1 sm:text-lg text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Enter your confirm password"
              className="bg-gray-50 px-3 py-2 rounded-md text-md text-black border border-gray-300 outline-none hover:border-blue-400 focus:border-blue-400"
              value={formData.confirmPassword}
              onChange={changeHandler}
            />
          </div>
          <button className="w-full py-2 bg-green-700 text-white rounded-md">
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
