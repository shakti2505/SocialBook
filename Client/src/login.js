import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup'
import { Form } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL_API from './utilities/baseURL';
import { apiVariables } from './utilities/apiVariables';
import { Navigate, useNavigate } from "react-router-dom"

const Login = () => {
    const navitage = useNavigate()

    const [isEmail, setIsemail] = useState(false)
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        phone: ""
    })

    // const [LoginUserData, setLoginUserData] = useState({})

    const [isError, setIserror] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = (e) => {
        setCredentials({ ...credentials, [e.target.name]: (e.target.value < 0 ? e.target.value=0 : e.target.value)})
    }

    const changeLoginOption = () => {
        setIsemail(true)
    }
    const changeLoginOption2 = () => {
        setIsemail(false)
    }

    const LoginUser = async() => {
        const result = await axios.post(BASE_URL_API + apiVariables.signin.url, credentials,
            {
                withCredentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true
                }
            }
        )
        if(result.data.message == 'unauthorized access'){
            setIserror(true);
            setError(result.data.message)
        }else{
            navitage('/home')
        }
    }

    const NavigateToSignPage = () =>{
        navitage('/')
    }
    return (
        <>
            <Container>
                <Row>
                    <Col sm={6}>
                        <Card className='loginCard'>
                            <Card.Body >
                                <Card.Title>Login</Card.Title>
                                <Card.Text id='tagLine'>...by using one from below method</Card.Text>
                                <CardGroup as="div" className='btnDiv'>
                                    <Button onClick={changeLoginOption} id='btn1'>Mobile No. <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512"><path d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg>
                                    </Button>
                                    <Button onClick={changeLoginOption2} id='btn2'>Email <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
                                    </Button>
                                </CardGroup>
                                <hr />
                                <Form className={isEmail ? 'd-none' : ""}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control style={{ paddingTop: '5px', marginTop: "5px", borderRadius: "20px" }} type="email" placeholder="Enter email" name='email' onChange={handleLogin} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control style={{ paddingTop: '5px', marginTop: "15px", borderRadius: "20px" }} type="password" placeholder="Password" name='password' onChange={handleLogin} />
                                    </Form.Group>

                                    <CardGroup as="div" className='btnDiv' style={{ marginTop: "10px" }}>
                                        <Button id='btn2' onClick={LoginUser} >login <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /></svg>
                                        </Button>
                                        <div className='d-flex justify-content-center mt-2'  >
                                            <Button style={{ textDecoration: "none" }} onClick={NavigateToSignPage} variant="link">Create New account.</Button>
                                        </div>
                                    </CardGroup>
                                </Form>
                                <Form className={isEmail ? '' : "d-none"}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control  min="0" oninput="validity.valid||(value='');" style={{ paddingTop: '5px', marginTop: "5px", borderRadius: "20px" }} type="number" placeholder="Enter Phone No." onChange={handleLogin} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Control style={{ paddingTop: '5px', marginTop: "15px", borderRadius: "20px" }} type="password" placeholder="Password" onChange={handleLogin} />
                                    </Form.Group>

                                    <CardGroup as="div" className='btnDiv' style={{ marginTop: "10px" }}>
                                        <Button id='btn2' onClick={LoginUser} >login <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /></svg>
                                        </Button>
                                        <div className='d-flex justify-content-center mt-2'  >
                                            <Button style={{ textDecoration: "none" }} onClick={NavigateToSignPage} variant="link">Create New account.</Button>
                                        </div>
                                    </CardGroup>
                                    {
                                        isError &
                                        <p>{error}</p>
                                    }
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login