import React, { useState } from "react";
import authImg from "../assets/auth-img.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../Redux/Slice/authSlice";

const UpdatePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const { token } = useParams();

    const submitHandler = (e) => {
        e.preventDefault();
        resetPassword(password, confirmPassword, token, navigate);
    }

    return (
        <div className="authBg">
            <div className="sm:w-[500px] bg-white rounded-md  shadow-2xl p-8 text-center max-w-[90%] w-full mx-auto">
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <h3 className="text-2xl font-semibold">Choose New Password</h3>
                    <p className="text-gray-500 text-sm sm:w-[70%]">
                        Almost done. Enter your new password and you're all set.
                    </p>

                    <form className="mt-8 flex flex-col gap-6 text-start w-full" onSubmit={submitHandler}>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="password"
                                className="ml-1 sm:text-lg text-sm font-medium"
                            >
                                Password
                            </label>
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
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="confirmPassword"
                                className="ml-1 sm:text-lg text-sm font-medium"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                id="confirmPassword"
                                placeholder="Enter your confirm password"
                                autoComplete="off"
                                className="bg-gray-50 px-3 py-2 rounded-md text-md text-black border border-gray-300 outline-none hover:border-blue-400 focus:border-blue-400"
                            />
                        </div>

                        <button className="w-full py-2 bg-green-700 text-white rounded-md">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword
