import React, { useContext, useState, useEffect } from 'react'
import '../App.css'
import UserDataContext from '../Context/UserContext';
import axios from 'axios';
import BASE_URL_API from '../utilities/baseURL';
import { apiVariables } from '../utilities/apiVariables';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown';

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip"  {...props}>
        {props}
    </Tooltip>
);

const NavbarDropdown = () => {

    const navigate = useNavigate()

    const logout = async () => {
        const apicall = await axios.get(BASE_URL_API + apiVariables.logout.url, {
            withCredentials: "include"
        })
        if (apicall.status == 200) {
            navigate('/login')
        } else {
            console.log('error in logging out.')
        }
    }

    const user = useContext(UserDataContext)

    const [UserProfilePicture, setUserProfilePicture] = useState([])
    const changeBodybg = () => {
        document.body.style.backgroundColor = "white"
        document.body.style.height = '0px'
    }
    const getUserProfilePicture = () => {
        axios.get(BASE_URL_API + apiVariables.userProfilePicture.url, {
            withCredentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then((response) => {
                if (response.data.message == 'Image not found') {
                    console.log(response.data.message)
                } else {
                    setUserProfilePicture(response.data.UserProfilePicture)
                }
            }).catch((err) => {
                console.log(err)
            })

    }

    const handleChatWindow = () => {
        const chatWindow = document.querySelector('.chat-window');
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
    }

    const logoutUSer = () => {
        const apicall = axios.get(BASE_URL_API + apiVariables.logout.url,
            {
                withCredentials: 'include'
            })
        apicall.then((response) => {
            if (response.data.message !== 'Internal Server Error') {
                navigate('/')
            } else {
                console.log(response.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }




    useEffect(() => {
        getUserProfilePicture()
    }, [])
    return (
        <>
            <div className='d-flex flex-row justify-content-between mt-1'>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 100, hide: 100 }}
                    overlay={renderTooltip('Menu')}
                >
                    <Button className='hover-focus-button' onClick={handleChatWindow} variant="light" size='sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                    </Button>
                </OverlayTrigger>
                <div className="chat-window">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-7" style={{ boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
                                <h4 className='text-start'>Menu</h4>
                                <form className="d-flex px-2 py-2" role="search">
                                    <input className=" form-control" id='search-bar' type="search" placeholder="Search" />
                                </form>
                                <h5 className='text-start'>
                                    Social
                                </h5>
                                <div>
                                    <Button variant='light' className='d-flex flex-row w-100' onClick={() => navigate('/friends')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512"><path fill="#0866FF" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
                                        <div className='d-flex flex-column'>
                                            <strong className='mx-1 text-start'>Friends</strong>
                                            <p className='mx-1' style={{ fontSize: "90%" }}>Search for friends or people you may know.
                                            </p>
                                        </div>
                                    </Button>
                                    <Button variant='light' className='d-flex  w-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem" viewBox="0 0 448 512"><path fill="#ef4360" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" /></svg>
                                        <div className='d-flex flex-column'>
                                            <strong className='mx-1 text-start'>Friends</strong>
                                            <p className='mx-1' style={{ fontSize: "90%" }}> Oraganise or find events nearby
                                            </p>
                                        </div>

                                    </Button>
                                    <Button variant='light' className='d-flex flex-row w-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem" viewBox="0 0 448 512"><path fill="#ef4360" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" /></svg>
                                        <p className='mx-2'>
                                            <h5 className='text-start' >Events</h5>
                                            Oraganise or find events nearby.</p>
                                    </Button>
                                    <Button variant='light' className='d-flex flex-row w-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem" viewBox="0 0 448 512"><path fill="#ef4360" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" /></svg>
                                        <p className='mx-2'>
                                            <h5 className='text-start' >Events</h5>
                                            Oraganise or find events nearby.</p>
                                    </Button>
                                    <Button variant='light' className='d-flex flex-row w-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512"><path fill="#ef4360" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" /></svg>
                                        <p className='mx-2'>
                                            <h5 className='text-start' >Events</h5>
                                            Oraganise or find events nearby.</p>
                                    </Button>
                                    <Button variant='light' className='d-flex flex-row w-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512"><path fill="#ef4360" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" /></svg>
                                        <p className='mx-2'>
                                            <h5 className='text-start' >Events</h5>
                                            Oraganise or find events nearby.</p>
                                    </Button>
                                    <Button variant='light' className='d-flex flex-row w-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512"><path fill="#ef4360" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" /></svg>
                                        <p className='mx-2'>
                                            <h5 className='text-start' >Events</h5>
                                            Oraganise or find events nearby.</p>
                                    </Button>
                                    <Button variant='light' className='d-flex flex-row w-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512"><path fill="#ef4360" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" /></svg>
                                        <p className='mx-2'>
                                            <h5 className='text-start' >Events</h5>
                                            Oraganise or find events nearby.</p>
                                    </Button>
                                    <Button variant='light' className='d-flex flex-row w-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512"><path fill="#ef4360" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" /></svg>
                                        <p className='mx-2'>
                                            <h5 className='text-start' >Events</h5>
                                            Oraganise or find events nearby.</p>
                                    </Button>
                                    <Button variant='light' className='d-flex flex-row w-100'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512"><path fill="#ef4360" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" /></svg>
                                        <p className='mx-2'>
                                            <h5 className='text-start' >Events</h5>
                                            Oraganise or find events nearby.</p>
                                    </Button>

                                </div>

                            </div>
                            <div className="col-4 offset-1" style={{ boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px", }}>

                            </div>
                        </div>
                    </div>
                </div>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip('Messages')}
                >
                    <Button variant='light' size='sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem" viewBox="0 0 512 512"><path d="M256.6 8C116.5 8 8 110.3 8 248.6c0 72.3 29.7 134.8 78.1 177.9 8.4 7.5 6.6 11.9 8.1 58.2A19.9 19.9 0 0 0 122 502.3c52.9-23.3 53.6-25.1 62.6-22.7C337.9 521.8 504 423.7 504 248.6 504 110.3 396.6 8 256.6 8zm149.2 185.1l-73 115.6a37.4 37.4 0 0 1 -53.9 9.9l-58.1-43.5a15 15 0 0 0 -18 0l-78.4 59.4c-10.5 7.9-24.2-4.6-17.1-15.7l73-115.6a37.4 37.4 0 0 1 53.9-9.9l58.1 43.5a15 15 0 0 0 18 0l78.4-59.4c10.4-8 24.1 4.5 17.1 15.6z" /></svg>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip('Notification')}
                >
                    <Button className='hover-focus-button' variant='light' size='sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" /></svg>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip('Profile')}
                >
                    {/* <Button className='hover-focus-button' variant='light' size='sm'> */}

                    <Dropdown>
                        <Dropdown.Toggle className='hover-focus-button' variant="light" size='sm' id="dropdown-basic">
                            <div>
                                {
                                    UserProfilePicture.length !== 0 && UserProfilePicture.map((item, index) => {
                                        return (
                                            <>
                                                <img className='profilePic' alt='' src={item.displayPictureUrl} height='1rem' width="1rem" />
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logoutUSer}>Logout</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* </Button> */}
                </OverlayTrigger>
            </div>
        </>
    )
}

export default NavbarDropdown