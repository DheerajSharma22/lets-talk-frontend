import React from "react";
import OtpInput from "../components/Auth/OtpInput";


const VerifyEmail = () => {
    return (
        <div className="authBg">
            <div className="sm:w-[500px] bg-white rounded-md  shadow-2xl p-8 text-center max-w-[90%] w-full mx-auto">
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <h3 className="text-2xl font-semibold">Verify Email</h3>
                    <p className="text-gray-500 text-sm sm:w-[70%]">
                        A verfication code has been sent to you. Enter the code below
                    </p>

                    <OtpInput length={6} />
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
