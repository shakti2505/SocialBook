import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbars from '../Navbar';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import BASE_URL_API from '../utilities/baseURL.js';
import { apiVariables } from '../utilities/apiVariables.js';
const FriendsListpage = () => {
  const [pendingRequest, setPendingRequest] = useState([])
  const [allUsers, setAllUsers] = useState([])

  const navigate = useNavigate()

  const getPendingFriendRequests = async (apivar) => {
    const apicall = await axios.get(`${BASE_URL_API}${apivar}`, {
      withCredentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },

    })
    if (apicall.status !== 200) {
      console.log('Internal Error')
    } else {
      setPendingRequest(apicall.data)
    }
  }

  const getPeopleYouMayKnow = async (apivar) => {
    const apicall = await axios.get(`${BASE_URL_API}${apivar}`, {
      withCredentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },

    })
    if (apicall.status !== 200) {
      console.log('Internal Error')
    } else {
      setAllUsers(apicall.data)
    }
  }

  const addFriend = async (firstName, lastName, requestreceiver, displayPicture) => {
    const apicall = await axios.post(BASE_URL_API + apiVariables.sendFriendRequest.url,
      {
        friendRequestStatus: 'pending',
        requestReceiverId: requestreceiver,
        username: firstName + lastName,
        userDisplayPicture: displayPicture
      },
      {
        withCredentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        },

      }
    );
    const result = await apicall.data
    console.log('result', result)
  }



  useEffect(() => {
    getPendingFriendRequests(apiVariables.getPendingFriendRequest.url);
    getPeopleYouMayKnow(apiVariables.getAllUsers.url);
  }, [])

  return (
    <>

      <Navbars />

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-3 col-md-12'>
            <Nav defaultActiveKey="/home" className="flex-column sidebar">
              <h2 className='mx-3 mt-1 fw-bold'>Friends</h2>
              <Nav.Link href="/home" className='d-flex navlink'>
                <div className='d-flex'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="1.5rem" height="1.5rem"><path fill="#055df5" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
                  <strong>Home</strong>
                </div>
              </Nav.Link>

              <Nav.Link href="#" className='d-flex navlink'>
                <div className='d-flex'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="25" height="25"><path fill="#055df5" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
                  <strong>Friend Request</strong>
                </div>
              </Nav.Link>

              <Nav.Link href="#" className='d-flex navlink'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="25" height="25"><path fill="#055df5" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
                <strong>Friends</strong>
              </Nav.Link>

              <Nav.Link href="#" className='d-flex navlink'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="25" height="25"><path fill="#055df5" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
                <strong>Custom</strong>
              </Nav.Link>

            </Nav>
          </div>
          <div className='col-lg-8 col-md-12 m-4'>
            <h4 className='fw-bold'>Friend request</h4>
            <div className='d-flex justify-content-start flex-wrap' >
              {
                pendingRequest.length !== 0 && pendingRequest.map((item, index) => {
                  return (
                    <>
                      <Card style={{ width: '16rem', height: '25rem', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                        <Card.Img src={item.frientRequestSenderDP} width="100%" height="50%" />
                        <Card.Body>
                          <Card.Title>{item.frientRequestSenderName}</Card.Title>
                          <Card.Text>
                            9 Mutual Friends
                          </Card.Text>

                          <Button size='md' variant="primary" className='w-100'>Confirm </Button>
                          <Button size='md' variant="light" className='w-100 mt-1'>Delete</Button>
                        </Card.Body>
                      </Card>
                    </>
                  );
                })
              }
            </div>

            <hr />
            <h4 className='fw-bold'>People you may know</h4>
            <div className='d-flex justify-content-start flex-wrap' >
              {allUsers.length !== 0 &&
                allUsers.map((item, index) => {
                  return (
                    <div key={index} className='mx-2 mt-2' >
                      <Card style={{ width: '16rem', height: '25rem', boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }} >
                        <Card.Img src={item.profilePic} width="100%" height="50%" style={{objectFit:"cover"}} />
                        <Card.Body>
                          <Card.Title>{item.firstName} {item.LastName}</Card.Title>
                          <Card.Text>
                            9 Mutual Friends
                          </Card.Text>
                          <Button size='md' variant="primary" onClick={() => addFriend(item.firstname, item.lastname, item.User_id, item.displayPicture)} className='w-100'>Add Friend </Button>
                          <Button size='md' variant="light" className='w-100 mt-1'>Remove</Button>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })
              }
            </div>

          </div>
        </div>
      </div>


    </>

  )
}

export default FriendsListpage