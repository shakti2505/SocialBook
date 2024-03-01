import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import { Form } from "react-bootstrap";
import axios from "axios";
import BASE_URL_API from "./utilities/baseURL";
import { apiVariables } from "./utilities/apiVariables";
import { Navigate, useNavigate } from "react-router-dom";
import swDev from "./serveiceWorkerDev.js";
import bg_login from "../src/images/backGround/login-bg3.jpg";
import logo from "./images/logo/logo.png";
const Login = () => {
  const navitage = useNavigate();

  const [isEmail, setIsemail] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const [isError, setIserror] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]:
        e.target.value < 0 ? (e.target.value = 0) : e.target.value,
    });
  };

  const changeLoginOption = () => {
    setIsemail(true);
  };
  const changeLoginOption2 = () => {
    setIsemail(false);
  };

  //   const LoginUser = () => {
  //     let apicall = axios.post(
  //       BASE_URL_API + apiVariables.signin.url,
  //       credentials,
  //       {
  //         withCredentials: "include",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Credentials": true,
  //         },
  //       }
  //     );

  //     apicall.then((response) => {
  //       if (!Object.keys(response).includes("error")) {
  //         console.log('api call ressponse',response)
  //         localStorage.setItem("user", response.data.loggedInUser.email);
  //         navitage("/home");
  //       }else{
  //         console.log('api call ressponse error',response)
  //         setError(response.response.data.error);
  //         // console.log('api error response::----::---',response)
  //       }
  //     });

  //     // if (result.status !== 200){
  //     //     console.log(result.response.data.message)
  //     // } else {
  //     //   localStorage.setItem("user", result.data.loggedInUser.email);
  //     //   navitage("/home");
  //     // }
  //     // }
  //     // if(result.response.data.message=='User not found'){
  //     //     setError(result.data.message);
  //   };

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
          swDev();
        }
        navitage("/home");
      })
      .catch((error) => {
        console.error("api call error", error);
        setError(error.message);
      });
  };

  const NavigateToSignPage = () => {
    navitage("/");
  };

  return (
    <>
      {/* <Container>
        <Row>
          <Col sm={6}>
            <Card className="loginCard">
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Card.Text id="tagLine">
                  ...by using one from below method
                </Card.Text>
                <CardGroup as="div" className="btnDiv">
                  <Button onClick={changeLoginOption} id="btn1">
                    Mobile No.{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.5em"
                      viewBox="0 0 384 512"
                    >
                      <path d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                    </svg>
                  </Button>
                  <Button onClick={changeLoginOption2} id="btn2">
                    Email{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.5em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                  </Button>
                </CardGroup>
                <hr />
                <Form className={isEmail ? "d-none" : ""}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      style={{
                        paddingTop: "5px",
                        marginTop: "5px",
                        borderRadius: "20px",
                      }}
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleLogin}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      style={{
                        paddingTop: "5px",
                        marginTop: "15px",
                        borderRadius: "20px",
                      }}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleLogin}
                    />
                  </Form.Group>

                  <CardGroup
                    as="div"
                    className="btnDiv"
                    style={{ marginTop: "10px" }}
                  >
                    <Button id="btn2" onClick={LoginUser}>
                      login{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.5em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                      </svg>
                    </Button>
                    <div className="d-flex justify-content-center mt-2">
                      <Button
                        style={{ textDecoration: "none" }}
                        onClick={NavigateToSignPage}
                        variant="link"
                      >
                        Create New account.
                      </Button>
                    </div>
                  </CardGroup>
                </Form>
                <Form className={isEmail ? "" : "d-none"}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      min="0"
                      oninput="validity.valid||(value='');"
                      style={{
                        paddingTop: "5px",
                        marginTop: "5px",
                        borderRadius: "20px",
                      }}
                      type="number"
                      placeholder="Enter Phone No."
                      onChange={handleLogin}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      style={{
                        paddingTop: "5px",
                        marginTop: "15px",
                        borderRadius: "20px",
                      }}
                      type="password"
                      placeholder="Password"
                      onChange={handleLogin}
                    />
                  </Form.Group>

                  <CardGroup
                    as="div"
                    className="btnDiv"
                    style={{ marginTop: "10px" }}
                  >
                    <Button id="btn2" onClick={LoginUser}>
                      login{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.5em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                      </svg>
                    </Button>
                    <div className="d-flex justify-content-center mt-2">
                      <Button
                        style={{ textDecoration: "none" }}
                        onClick={NavigateToSignPage}
                        variant="link"
                      >
                        Create New account.
                      </Button>
                    </div>
                  </CardGroup>
                  {isError && <p>{error}</p>}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}

      {/* <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="">
          <div className="d-flex justify-content-center">
            <h1 style={{ color: "#0866FF" }}>SocialBook</h1>
          </div>
          <div className="card shadow-lg ">
            <h5 className="text-center mt-4">Log in to SocialBook</h5>
            <Form className="mx-5 mt-2">
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  size="lg"
                  min="0"
                  style={{
                    paddingTop: "5px",
                    marginTop: "5px",
                    borderRadius: "5px",
                  }}
                  type="email"
                  placeholder="Enter Email."
                  onChange={handleLogin}
                  name="email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  size="lg"
                  style={{
                    paddingTop: "5px",
                    marginTop: "15px",
                    borderRadius: "5px",
                  }}
                  type="password"
                  placeholder="Password"
                  onChange={handleLogin}
                  name="password"
                />
              </Form.Group>
            </Form>
            <button className="btn btn-primary btn-lg mx-5 mt-2" onClick={LoginUser}>Log in</button>
            <div className="d-flex justify-content-center align-items-center mb-5 mt-4">
                <a className="text-decoration-none mx-2" href="#">Forgotten account?</a>
                <a className="text-decoration-none mx-2" href="/">Sign up for Socialbook</a>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-slate-100 justify-center items-center h-full overflow-hidden">
        <div className="flex flex-wrap justify-between items-center absolute top-0 w-100 mt-4 px-4">
          <div className="flex justify-evenly items-center border-2 rounded-full bg-gradient-to-r from-[#21E2AD] via-[#13C7CD] to-[#05A7F1]">
            <img src={logo} className="h-16" />
            <p className="text-5xl  font-['Times-roman'] m-0 pr-2 text-light max-sm:text-3xl">
              ocialbook
            </p>
          </div>
          <div className="w-60 h-20 max-sm:w-60 max-sm:h-16  max-sm:mt-2 ring-2  ring-[#007DF9] rounded-full flex justify-center items-center hover:bg-green-100">
            <button className="w-100 text-3xl">Sign up</button>
          </div>
        </div>
        <div className="bg-smoke-200 flex justify-between h-screen">
          <div className="flex flex-wrap justify-evenly items-center h-screen w-100 max-sm:mt-[10rem] max-sm:p-4">
            <div className="flex-col justify-center items-center mb-5">
              {/* <h1 className="text-center">Welcome to Socialbook!</h1> */}
              <div className="flex flex-col flex-wrap justify-between items-center "></div>
              <input
                type="email"
                className="w-100 bg-[#FDFFFE] outline-none	h-16 rounded-full	shadow-md text-xl px-4"
                placeholder="Email"
                onChange={handleLogin}
                name="email"
              />
              <input
                type="password"
                className="w-100 bg-[#FDFFFE] outline-none	h-16 rounded-full	shadow-md text-xl px-4 mt-3"
                placeholder="Password"
                onChange={handleLogin}
                name="password"
              />
              <a href="#" className="text-decoration-none ">
                <p className="text-right mt-4 text-lg  text-blue-800">
                  Forgot Password ?
                </p>
              </a>
              <div onClick={LoginUser} className=" bg-[#007DF9] flex justify-center items-center w-100 h-16 shadow-md mt-3 rounded-full text-light text-2xl hover:cursor-pointer">
                Log in
              </div>
            </div>
            <img
              className="h-[80%] object-cover"
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
