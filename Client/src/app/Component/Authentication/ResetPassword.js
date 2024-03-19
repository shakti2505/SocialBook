import React, { useState } from "react";
import logo from "../../../images/logo/logo.png";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg_login from "../../../images/backGround/login-bg3.jpg";
// import Alert from "react-bootstrap/Alert";
import BASE_URL_API from "../../../utilities/baseURL.js";
import { apiVariables } from "../../../utilities/apiVariables.js";
import Spinner from "react-bootstrap/Spinner";
import Alert from "@mui/material/Alert";

const ResetPassword = () => {
  const navitage = useNavigate();

  const [newPassword, setNewPassword] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIserror] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMesssage, setSuccessMessage] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };

  const createNewPassword = async (e) => {
    try {
      e.preventDefault();
      if (newPassword.password1 !== newPassword.password2) {
        setOpenSnackbar(true);
      }
      let apicall = await axios.post(
        BASE_URL_API + apiVariables.resetPassword.url,
        newPassword,
        {
          withCredentials: true,
        }
      );
      if (apicall.status != 200) {
        setIserror(true);
        setError(apicall.data.message);
      } else {
        setIsSuccess(true);
        setSuccessMessage(apicall.data.message);
      }
    } catch (error) {
      console.error(error);
      setIserror(true);
      setIsSuccess(false);
    }
  };

  return (
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
            onClick={() => navitage("/signup")}
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
            <h1 className="text-center">Create new password!</h1>
            <input
              type="password"
              className="w-100 bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-16 rounded-full	shadow-md text-xl px-4 mt-3 max-sm:bg-transparent max-sm:ring-1"
              placeholder="Enter new password"
              onChange={handleNewPassword}
              name="password1"
            />

            <input
              type="password"
              className="w-100 bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-16 rounded-full	shadow-md text-xl px-4 mt-3 max-sm:bg-transparent max-sm:ring-1"
              placeholder="Re-enter password"
              onChange={handleNewPassword}
              name="password2"
            />

            <button
              onClick={createNewPassword}
              className=" bg-[#007DF9] flex justify-center items-center w-100 h-16 shadow-md mt-3 rounded-full text-light text-2xl hover:cursor-pointer max-sm:bg-transparent max-sm:ring-1 hover:bg-blue-800 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-900"
            >
              <p className=" max-sm:text-black- lg:text-white text-2xl mt-3">
                Create
              </p>
            </button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              TransitionComponent="Fade"
              onClose={() => setOpenSnackbar(false)}
            >
              <Alert
                onClose={() => setOpenSnackbar(false)}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Passwords does not match, Please check your passwords.
              </Alert>
            </Snackbar>
          </div>

          <img
            className="h-[80%] object-cover max-sm:hidden"
            src={bg_login}
            style={{ mixBlendMode: "darken" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
