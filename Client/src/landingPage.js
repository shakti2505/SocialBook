import React, {  useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import BASE_URL_API from './utilities/baseURL.js'
import { apiVariables } from './utilities/apiVariables.js';
import { useNavigate } from "react-router-dom"
import Logo from './images/logo/SocialBook_logo1.png'

const LandingPage = () => {

  const navitage = useNavigate()

  const [inputData, setinputData] = useState({
    fname: "",
    mName: "",
    Lname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: ""
  })

  const handleChange = (e) => {
    setinputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    if(inputData.fname.length!==0 &&inputData.Lname.length!==0 && inputData.email.length!==0 && inputData.dob.length!==0 && inputData.gender.length!==0 &&inputData.password.length!==0){
      e.preventDefault();
    const result = axios.post(BASE_URL_API + apiVariables.signup.url, inputData)
    result.then((response) => {
      if (response.data.response.message === "account creation successfull") {
        navitage('/upload-DP');
      }
    })
      .catch((error) => {
        alert(error.data.response.message)
      })
    }else{
      alert("Please fill all field!")
    }
    
  }

  const NavigateToLoginPage = () => {
    navitage('/login')
  }

  return (
    <>
      <div className='container vh-100'  >
        <div className='row d-flex justify-content-center align-self-center'>
          <h1 className='text-center fw-bold mt-5' >Welcome to Social Book</h1>
          <div className='col-md-4 mt-5' style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", borderRadius: "15px", background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(58,69,83,1) 100%)', opacity:"0.7"}}>
            <div className='d-flex justify-content-center'>
            </div>
            <div className='m-3'>
              <Form.Control type="text" name='fname' value={inputData.fname} onChange={handleChange} placeholder="First Name" required/>
            </div>

            <div className='m-3'>
              <Form.Control type="text" name='Lname' value={inputData.Lname} onChange={handleChange} placeholder="Last Name" required/>
            </div>

            <div className='m-3'>
              <Form.Select aria-label="Default select example" name='gender' value={inputData.gender} onChange={handleChange} required>
                <option>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </div>
            <div className='m-3'>
              <Form.Control type="date" name='dob' value={inputData.dob} onChange={handleChange} placeholder="DD/MM/YYYY" required/>
            </div>

            <div className='m-3'>
              <Form.Control type="text" name='phone' value={inputData.phone} onChange={handleChange} placeholder="Phone No." required/>
            </div>

            <div className='m-3'>
              <Form.Control type="text" name='email' value={inputData.email} onChange={handleChange} placeholder="Email address" required/>
            </div>
            <div className='m-3'>
              <Form.Control type="password" name='password' value={inputData.password} onChange={handleChange} placeholder="New Password" required/>
            </div>  
          
            <div className='m-3 d-flex justify-content-center'>
              <Button size='small' className='w-100' onClick={handleSubmit} >Sign Up</Button>
            </div>
            <div className='m-3 d-flex justify-content-center'>
              <Button className='text-light' style={{ textDecoration: "none" }} onClick={NavigateToLoginPage} variant="link">Already have an account?</Button>
            </div>

          </div>
        </div>
      </div>

      {/* <Container>
        <Row>
          <Col id='cardCol'>
            <Card className='signupCard'>
              <Card.Body >
                <CardGroup className='d-flex justify-content-center'>
                  <h3>Create a new account</h3>
                </CardGroup>
                <CardGroup className='d-flex justify-content-center'>
                  <h6>It's easy as a pie. </h6>
                </CardGroup>
                <hr />
                <Form>
                  <Row className='mb-3 mt-4'>
                    <Form.Group as={Col} controlId="formGridFname">
                      <Form.Control type="text" name='fname' value={inputData.fname} onChange={handleChange} placeholder="First Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLname">
                      <Form.Control type="text" name='Lname' value={inputData.Lname} onChange={handleChange} placeholder="Last Name" />
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridPhone">
                      <Form.Control type="text" name='phone' value={inputData.phone} onChange={handleChange} placeholder="Phone No." />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLEmail">
                      <Form.Control type="text" name='email' value={inputData.email} onChange={handleChange} placeholder="Email address" />
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Control type="password" name='password' value={inputData.password} onChange={handleChange} placeholder="New Password" />
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridDob">
                      <Form.Control type="date" name='dob' value={inputData.dob} onChange={handleChange} placeholder="Date of Birth" />
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridGender">
                      <Form.Select aria-label="Default select example" name='gender' value={inputData.gender} onChange={handleChange}>
                        <option>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                </Form>
                <div className='d-flex justify-content-center '>
                  <Button size='small' style={{ fontWeight: "bold", width: "15rem", fontSize: "25px" }} onClick={handleSubmit} >Sign Up</Button>
                </div>
                <div className='d-flex justify-content-center mt-2'  >
                  <Button style={{ textDecoration: "none" }} onClick={NavigateToLoginPage} variant="link">Already have an account?</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </>
  )
}

export default LandingPage