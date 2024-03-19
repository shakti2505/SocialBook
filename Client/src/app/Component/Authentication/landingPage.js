import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import bg_login from "../../../images/backGround/login-bg3.jpg";
import logo from "../../../images/logo/logo.png";
import Alert from "react-bootstrap/Alert";
import BASE_URL_API from "../../../utilities/baseURL.js";
import { apiVariables } from "../../../utilities/apiVariables.js";

const LandingPage = () => {
  const navitage = useNavigate();

  const [iScustomGender, setIsCustomerGender] = useState(false);
  const [inputData, setinputData] = useState({});
  const [emailExist, setemailExists] = useState(false);
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    setinputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (
      Object.keys(inputData).length == 5 ||
      Object.keys(inputData).includes(
        "MobileOrEmail",
        "Surname",
        "fname",
        "gender",
        "password",
        "days",
        "months",
        "years"
      )
    ) {
      e.preventDefault();
      const result = axios.post(
        BASE_URL_API + apiVariables.signup.url,
        inputData
      );
      result
        .then((response) => {
          console.log("singup api", response.data.message);
          if (response.data.message === "account creation successfull") {
            navitage("/login");
          } else {
            setemailExists(true);
            seterror(response.data.message);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("all fields are required");
    }
  };

  const NavigateToLoginPage = () => {
    navitage("/login");
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const startYear = 1905;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

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
              onClick={() => navitage("/login")}
            >
              Login
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
            <div className="flex-col justify-center items-center mb-5 h-[31.5rem]">
              <h1 className="text-center">Create a new account!</h1>
              <div className="flex justify-around items-center">
                <input
                  type="text"
                  className="w-100 bg-[#FDFFFE] outline-none max-sm:placeholder-black	h-14 rounded-xl	shadow-md text-xl px-4 max-sm:bg-transparent max-sm:ring-1"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="fname"
                />
                <input
                  type="text"
                  className="w-100 bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-14 rounded-xl	shadow-md text-xl px-4 max-sm:bg-[#FDFFFE] max-sm:ring-1 ml-3"
                  placeholder="Surname"
                  onChange={handleChange}
                  name="Surname"
                />
              </div>
              <input
                type="text"
                className="w-100 bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-14 rounded-xl	shadow-md text-xl px-4 max-sm:bg-[#FDFFFE] max-sm:ring-1 mt-2"
                placeholder="Mobile number or email address"
                onChange={handleChange}
                name="MobileOrEmail"
              />
              {emailExist && <Alert variant="danger"  onClose={() => setemailExists(false)}>{error}</Alert>}
              <input
                type="password"
                className="w-100 bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-14 rounded-xl	shadow-md text-xl px-4 max-sm:bg-[#FDFFFE] max-sm:ring-1 mt-2"
                placeholder="New password"
                onChange={handleChange}
                
                name="password"
              />

              <label for="cars" className="mt-2 text-muted">
                Date of birth ?
              </label>
              <div className="flex justify-between items-center mt-2">
                <select
                  onChange={handleChange}
                  name="days"
                  className="w-100 bg-[#FDFFFE] outline-none max-sm:placeholder-black h-14 rounded-xl shadow-md text-xl px-4 max-sm:bg-transparent max-sm:ring-1"
                >
                  {Array.from({ length: 31 }, (_, index) => index + 1).map(
                    (day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    )
                  )}
                </select>
                <select
                  onChange={handleChange}
                  name="months"
                  id="months"
                  className="w-100 bg-[#FDFFFE] outline-none max-sm:placeholder-black h-14 rounded-xl shadow-md text-xl px-4 max-sm:bg-transparent max-sm:ring-1 mx-2"
                >
                  {monthNames.map((month, index) => (
                    <option key={index + 1} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  onChange={handleChange}
                  name="years"
                  id="years"
                  className="w-100 bg-[#FDFFFE] outline-none max-sm:placeholder-black h-14 rounded-xl shadow-md text-xl px-4 max-sm:bg-transparent max-sm:ring-1"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <label for="cars" className="mt-2 text-muted">
                Gender ?
              </label>
              <div className="flex justify-between items-center mt-2 w-100">
                <div className="flex justify-around items-center w-100  bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-14 rounded-xl	shadow-md text-xl max-sm:bg-transparent max-sm:ring-1">
                  <label for="html">Female</label>
                  <input
                    type="radio"
                    id="html"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    onClick={() => setIsCustomerGender(false)}
                  />
                </div>
                <div className="flex justify-around items-center w-100  bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-14 rounded-xl	shadow-md text-xl max-sm:bg-transparent max-sm:ring-1 mx-2">
                  <small>Male</small>
                  <input
                    type="radio"
                    id="html"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    onClick={() => setIsCustomerGender(false)}
                  />
                </div>
                <div className="flex justify-around items-center w-100  bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-14 rounded-xl	shadow-md text-xl max-sm:bg-transparent max-sm:ring-1">
                  <small>Custom</small>
                  <input
                    type="radio"
                    id="html"
                    name="gender"
                    onClick={() => setIsCustomerGender(true)}
                  />
                </div>
              </div>
              <div className={iScustomGender ? "mt-2" : "d-none"}>
                <select
                  onChange={handleChange}
                  name="pronouns"
                  className="flex justify-around items-center w-100  bg-[#FDFFFE] max-sm:placeholder-black outline-none px-4	h-14 rounded-xl	shadow-md text-xl max-sm:bg-transparent max-sm:ring-1"
                >
                  <option value="Select Your Pronoun" disabled>
                    Select Your Pronoun
                  </option>
                  <option value="She">She: "Wish her a happy birthday!"</option>
                  <option value="He">He: Wish him a happy birthday!</option>
                  <option value="They">
                    They: "Wish them a happy birthday!"
                  </option>
                </select>
              </div>
              <div className={iScustomGender ? "mt-2" : "d-none"}>
                <input
                  type="text"
                  className="w-100 bg-[#FDFFFE] max-sm:placeholder-black outline-none	h-14 rounded-xl	shadow-md text-xl px-4 max-sm:bg-[#FDFFFE] max-sm:ring-1"
                  placeholder="Gender (optional)"
                  onChange={handleChange}
                  name="gender"
                />
              </div>

              <div
                onClick={handleSubmit}
                className=" bg-[#007DF9] flex justify-center items-center w-100 h-16 shadow-md mt-3 rounded-full text-light text-2xl hover:cursor-pointer max-sm:bg-transparent max-sm:ring-1 hover:bg-blue-800 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-900"
              >
                <p className=" max-sm:text-black- lg:text-white text-2xl mt-3">
                  Sign Up
                </p>
              </div>

              <div className="flex justify-between items-center lg:justify-end">
                <a href="#" className="text-decoration-none">
                  <p className="text-right mt-4 text-lg  text-blue-500">
                    Forgot Password ?
                  </p>
                </a>
                <a href="#" className="text-decoration-none lg:hidden">
                  <p className="text-right mt-4 text-lg  text-blue-500  shadow-2xl">
                    Aready have an account ?
                  </p>
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

export default LandingPage;
