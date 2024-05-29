import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg_login from "../../../images/backGround/login-bg3.jpg";
import logo from "../../../images/logo/logo.png";
// import Alert from "react-bootstrap/Alert";
import BASE_URL_API from "../../../utilities/baseURL.js";
import { apiVariables } from "../../../utilities/apiVariables.js";
import Spinner from "react-bootstrap/Spinner";
import Alert from "@mui/material/Alert";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
const Forgotpassword = () => {
  const navitage = useNavigate();

  const [isloading, setisloading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isForgotPasword, setIsForgotPassword] = useState(false);
  const [passwordRecoveryEmail, setPasswordRecoveryEmail] = useState("");
  const [otp, setotp] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setIserror] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isOTPVerified, setIsOtpVeified] = useState(false);
  const [sucessMsg, setSucessMsg] = useState("");

  const handleForgotPassword = (e) => {
    setPasswordRecoveryEmail({
      ...passwordRecoveryEmail,
      [e.target.name]: e.target.value,
    });
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setisloading(true);
    let apicall = await axios.post(
      BASE_URL_API + apiVariables.sendOtp.url,

      passwordRecoveryEmail,
      {
        withCredentials: true,
      }
    );
    if (apicall.status !== 200) {
      setOtpError(apicall.data.message);
    } else {
      setOpenSnackbar(true);
      setPasswordRecoveryEmail(apicall.data.email);
      setIsOtpSent(true);
      setisloading(false);
    }
  };

  const handleOtpVerification = async () => {
    let apicall = await axios.post(
      BASE_URL_API + apiVariables.verifyOtp.url,
      otp,
      {
        withCredentials: "true",
      }
    );
    if (apicall.status !== 200) {
      setIserror(true);
      setErrorMsg(apicall.data.message);
      setIsOtpVeified(false);
    } else {
      setIsOtpVeified(true);
      setIserror(false);
      setSucessMsg(apicall.data.message);
      setTimeout(() => {
          navitage('/resetpassword')
      }, 2000);
    }
  };

  const handleOTP = (e, targetField) => {
    if (
      e.key >= 0 ||
      e.key <= 9 ||
      (e.key === "Backspace" && e.target.value.length === 1)
    ) {
      setotp({ ...otp, [e.target.name]: e.key });
      let target = document.getElementById(targetField);
      target.focus();
    } else if (Object.keys(otp).length !== 0 && e.key === "Backspace") {
      let target = document.getElementById(targetField - 2);
      target !== null && target.focus();
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="bg-slate-100 justify-center items-center h-full overflow-hidden">
        <div className="flex flex-wrap justify-between items-center absolute top-0 w-100 mt-4 px-4">
          <div className="flex justify-evenly items-center border-2 rounded-full bg-gradient-to-r from-[#21E2AD] via-[#13C7CD] to-[#05A7F1]">
            <img src={logo} className="h-16" />
            <p className="text-5xl  font-['Times-roman'] m-0 pr-2 text-light max-sm:text-3xl">
              ocialbook
            </p>
          </div>
          <div
            className="w-60
             h-16 
             max-sm:w-60 
             max-sm:h-16 
             max-sm:mt-2 ring-2  ring-[#007DF9] 
             max-sm:hidden
             rounded-full 
             flex 
             justify-center 
             items-center
            hover:bg-green-100"
          >
            <button
              className="w-100 text-3xl"
              onClick={() => navitage("/")}
            >
              Signup
            </button>
          </div>
        </div>

        <div
          className="bg-smoke-200 flex justify-between h-screen sm:!bg-none"
          style={{
            background: `url(${bg_login})`,
            backgroundSize: "cover",

            backgroundRepeat: "no-repeat",
            backgroundPosition: "-10rem",
          }}
        >
          <div className="flex flex-wrap justify-evenly items-center h-screen w-100  max-sm:p-4">
            <div className="flex-col justify-center items-center mb-5">
              {/* forgot password */}
              {isOtpSent && <h1 className="text-center">Forgot password</h1>}
              {!isOtpSent ? (
                <input
                  disabled={isloading ? true : false}
                  type="email"
                  className="w-[35.5rem] bg-[#FDFFFE] outline-none max-sm:placeholder-black	h-16 rounded-full	shadow-md text-xl px-4 max-sm:bg-transparent max-sm:ring-1"
                  placeholder="Enter your email Registered Email"
                  onChange={handleForgotPassword}
                  name="email"
                />
              ) : (
                ""
              )}
              {isOtpSent && (
                <>
                  <div className="flex flex-row justify-around items-center">
                    <input
                      type="text"
                      className="px-2 w-11 bg-[#FDFFFE] outline-none max-sm:placeholder-black	h-16  rounded-lg	shadow-md text-xl max-sm:bg-transparent max-sm:ring-1"
                      onKeyUp={(e) => handleOTP(e, "2")}
                      name="otp1"
                      id="1"
                      // value={otp.otp1!=='Backspace'?otp.otp1:""}
                    />
                    <input
                      type="text"
                      className=" px-2 w-11 bg-[#FDFFFE] outline-none max-sm:placeholder-black	h-16  rounded-lg  	shadow-md text-xl max-sm:bg-transparent max-sm:ring-1"
                      onKeyUp={(e) => handleOTP(e, "3")}
                      name="otp2"
                      id="2"
                      // value={otp.otp2!=='Backspce' ? otp.otp2 :''}
                    />
                    <input
                      style={{}}
                      type="text"
                      className=" px-2 w-10 bg-[#FDFFFE] outline-none max-sm:placeholder-black h-16  rounded-lg shadow-md text-xl max-sm:bg-transparent max-sm:ring-1"
                      onKeyUp={(e) => handleOTP(e, "4")}
                      name="otp3"
                      id="3"
                      // value={otp.otp3!=='Backspace' ? otp.otp3:''}
                    />
                    <input
                      type="text"
                      className="  px-2 w-10 bg-[#FDFFFE] outline-none max-sm:placeholder-black	h-16  rounded-lg	shadow-md text-xl max-sm:bg-transparent max-sm:ring-1"
                      onKeyUp={(e) => handleOTP(e, "5")}
                      name="otp4"
                      id="4"
                      // value={otp.otp4 !=='Backspace' ? otp.otp4 :''}
                    />
                  </div>
                  <button
                    onClick={handleOtpVerification}
                    id="5"
                    className=" bg-[#007DF9] flex justify-center items-center mt-3 w-100 h-16 shadow-md rounded-full text-light text-2xl hover:cursor-pointer max-sm:bg-transparent max-sm:ring-1 hover:bg-blue-800 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-900"
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {!isOtpSent ? (
                <>
                  <button
                    disabled={isloading ? true : false}
                    onClick={sendOtp}
                    className=" bg-[#007DF9] flex  justify-center items-center w-100 h-16 shadow-md mt-3 rounded-full text-light text-2xl hover:cursor-pointer max-sm:bg-transparent max-sm:ring-1 hover:bg-blue-800 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-900"
                  >
                    {isloading ? (
                      <>
                        <span className="text-3xl text-white">Sending OTP</span>
                        <Spinner
                          className="mx-2"
                          variant="light"
                          animation="border"
                          role="status"
                        ></Spinner>
                      </>
                    ) : (
                      "Send Otp"
                    )}
                  </button>
                </>
              ) : (
                ""
              )}

              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                TransitionComponent="Fade"
                onClose={() => setOpenSnackbar(false)}
                // message={`OTP sent to the ${passwordRecoveryEmail}`}
              >
                <Alert
                  onClose={() => setOpenSnackbar(false)}
                  severity="success"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  OTP sent to {passwordRecoveryEmail}, Please check your email!
                </Alert>
              </Snackbar>
              {/* forgot password */}
            </div>
            <img
              className="h-[80%] object-cover max-sm:hidden"
              src={bg_login}
              style={{ mixBlendMode: "darken" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
