import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetToken } from "../Redux/Slice/authSlice";


const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    sendPasswordResetToken(email, setEmailSent);
  };


  return (
    <div className="authBg">
      <div className="sm:w-[500px] bg-white rounded-md  shadow-2xl p-8 text-center max-w-[90%] w-full mx-auto">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h3 className="text-2xl font-semibold">
            {emailSent ? "Check Email" : "Reset Password"}
          </h3>
          <p className="text-gray-500 text-sm sm:w-[70%]">
            {emailSent
              ? `We have sent the reset email to ${email}`
              : "Enter your Email and instructions will be sent to you!"}
          </p>

          <form
            className="mt-8 flex flex-col gap-6 w-full"
            onSubmit={submitHandler}
          >
            {!emailSent && (
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
            )}

            <button
              className="w-full py-2 bg-green-700 text-white rounded-md disabled:bg-gray-500"
            >
              {emailSent ? "Resend" : "Reset"}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-500">
            Remember it ?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
