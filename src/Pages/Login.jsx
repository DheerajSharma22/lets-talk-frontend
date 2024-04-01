import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from '../Redux/Slice/authSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };
  return (
    <div className="authBg">
      <div className="sm:w-[500px] bg-white rounded-md  shadow-2xl p-8 text-center max-w-[90%] w-full mx-auto">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h3 className="text-2xl font-semibold">Welcome Back !</h3>
          <p className="text-gray-500 text-sm">
            Sign to continue to Let's Talk
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email address"
              autoComplete="off"
              className="bg-gray-50 px-3 py-2 rounded-md text-md text-black border border-gray-300 outline-none hover:border-blue-400 focus:border-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="ml-1 sm:text-lg text-sm font-medium"
              >
                Password
              </label>
              <Link
                to="/reset-password"
                className="sm:text-sm text-[10px] font-medium text-red-500"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
              autoComplete="off"
              className="bg-gray-50 px-3 py-2 rounded-md text-md text-black border border-gray-300 outline-none hover:border-blue-400 focus:border-blue-400"
            />
          </div>

          <button className="w-full py-2 bg-green-700 text-white rounded-md">
            Login
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
