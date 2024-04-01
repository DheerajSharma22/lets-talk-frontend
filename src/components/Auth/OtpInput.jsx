import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../../Redux/Slice/authSlice";

const OtpInput = ({ length = 4 }) => {
  const { signupData } = useSelector(state => state.auth);

  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value[value.length - 1] ? value[value.length - 1] : "";

    setOtp(newOtp);

    // Check for not a last input box and after this box there is a valid dom input element.
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      // Move focus to next input
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const combinedOtp = otp.join("");
    dispatch(signup({...signupData, otp: combinedOtp}, navigate));
  };

  return (
    <form className="mt-5" onSubmit={submitHandler}>
      <div className="flex items-center gap-3">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            type="text"
            className="border border-blue-300 w-12 h-12 rounded outline-none text-center"
            placeholder="-"
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={(e) => handleClick(index)}
          />
        ))}
      </div>

      <button className="bg-green-700 text-white w-full mt-5 py-2 rounded-md">
        Verify
      </button>
    </form>
  );
};

export default OtpInput;
