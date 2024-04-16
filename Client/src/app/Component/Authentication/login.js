import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg_login from "../../../images/backGround/login-bg3.jpg";
import logo from "../../../images/logo/logo.png";
import BASE_URL_API from "../../../utilities/baseURL.js";
import { apiVariables } from "../../../utilities/apiVariables.js";
// import googleIcon from "./images/logo/google.png";
import swDev from "../../../serveiceWorkerDev.js";
import axios from "axios";
const Login = () => {
  const navitage = useNavigate();

  const [isEmail, setIsemail] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isForgotPasword, setIsForgotPassword] = useState(false);     
  const [passwordRecoveryEmail, setPasswordRecoveryEmail] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const [isError, setIserror] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = (e) => {
    setPasswordRecoveryEmail({
      ...passwordRecoveryEmail,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]:
        e.target.value < 0 ? (e.target.value = 0) : e.target.value,
    });
  };

  const LoginUser = () => {
    fetch(BASE_URL_API + apiVariables.signin.url, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user", data.loggedInUser.email);
        if (data.loggedInUser.subscription != true) {
          swDev(data.loggedInUser.email);
        }
        navitage("/home");
      })
      .catch((error) => {
        console.error("api call error", error);
        setError(error.message);
      });
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
            <h1 className="text-center">Welcome to Socialbook!</h1>
                <input
                  type="email"
                  className="w-100 bg-[#FDFFFE] outline-none max-sm:placeholder-black	h-16 rounded-full	shadow-md text-xl px-4 max-sm:bg-transparent max-sm:ring-1"
                  placeholder="Email"
                  onChange={handleLogin}
                  name="email"
                />
                <input
                  type="password"
                  className="w-100 bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-16 rounded-full	shadow-md text-xl px-4 mt-3 max-sm:bg-transparent max-sm:ring-1"
                  placeholder="Password"
                  onChange={handleLogin}
                  name="password"
                />

                <div
                  onClick={LoginUser}
                  className=" bg-[#007DF9] flex justify-center items-center w-100 h-16 shadow-md mt-3 rounded-full text-light text-2xl hover:cursor-pointer max-sm:bg-transparent max-sm:ring-1 hover:bg-blue-800 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-900"
                >
                  <p className=" max-sm:text-black- lg:text-white text-2xl mt-3">
                    Login
                  </p>
                </div>

            
              <div
                className="flex justify-between items-center lg:justify-end"
              >
                <a
                  href="#"
                  className="text-decoration-none"
                >
                  <button onClick={()=>navitage('/forgotpassword')} className="text-right mt-4 text-lg  text-blue-500">
                    Forgot Password ?
                  </button>
                </a>
                <a href="#" className="text-decoration-none lg:hidden">
                  <button className="text-right mt-4 text-lg  text-blue-500  shadow-2xl">
                    Aready have an account ?
                  </button>
                </a>
              </div>
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

export default Login;
