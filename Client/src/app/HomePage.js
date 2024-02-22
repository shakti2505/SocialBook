import './Home.css'
import React, { useContext, useState, useEffect } from 'react';
import { apiVariables } from '../utilities/apiVariables.js';
import axios from 'axios';
import BASE_URL_API from '../utilities/baseURL';
import Navbar from '../Navbar.js'
import LeftBar from './LeftBar.js'
import RightBar from './RightBar.js'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from './LoadingSpinner.js';
import PostModal from './PostModal.js';
import UserDataContext from '../Context/UserContext.js';
import PostUplaodModal from './Component/PostUplaodModal.js';
import swDev from '../serveiceWorkerDev.js';


const HomePage = () => {
  // const [modalShow, setModalShow] = useState(false);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(true)
  const [isloading, setisloading] = useState(false);
  const [subscription, setSubscription] = useState({})
  const { loggedInUser, OpenPostModal, ClosePostModal, modalShow } = useContext(UserDataContext)


  const handleClose = () => setOpenSubscriptionModal(false);
  
  const handleSubscribe = async () => {
    const subscription=await swDev();
      setSubscription(subscription);
  }

  const stories = [
    'https://res.cloudinary.com/dtbz1n84e/image/upload/v1706200005/Post%20Images/jky1wbxlzsunued0y9ge.jpg',
    'https://res.cloudinary.com/dtbz1n84e/image/upload/v1706199308/Post%20Images/amvgldvyzttz5yvgxdr2.jpg',
    'https://res.cloudinary.com/dtbz1n84e/image/upload/v1705778184/Post%20Images/yltknsshlfz1glfn6eq3.jpg',
    'https://res.cloudinary.com/dtbz1n84e/image/upload/v1705424794/cld-sample.jpg',
    'https://res.cloudinary.com/dtbz1n84e/image/upload/v1705424786/samples/two-ladies.jpg',
    'https://res.cloudinary.com/dtbz1n84e/image/upload/v1705424786/samples/shoe.jpg',

  ]

  return (
    <>
      {/* <Navbar /> */}
      <div className='d-flex'>
        <LeftBar />
        <div className='col-4' id='middleBar' style={{ overflowY: 'hidden' }}>
          {/* stories */}
          <div>
            <div className='d-flex story-container'>
              {stories.map((item, index) => {
                return (
                  <>
                    <img src={item} alt='images' className='story' />
                  </>
                )
              })

              }

            </div> 
            {/* stories */}
            <div className='card mt-3 mx-5 shadow-sm'>
              <div className='card-body'>
                <div className="d-flex">
                  <a href='/profile'>
                    <img src={loggedInUser.profilePic} alt='img' width='40' height='40' style={{ borderRadius: "50%", objectFit: "cover" }} />
                  </a>
                  <button onClick={OpenPostModal} className='searchBtn text-muted btn btn-light mx-2 w-100 d-flex justify-content-start'>
                    {/* {
                      postCaption.length !== 0 ? postCaption : `What's on you mind, ${loggedInUser.firstName}?`
                    } */}
                  </button>
                </div>

              </div>
              <hr />
              <div className='d-flex justify-content-around align-items-center px-1 py-1'>
                <button className="btn btn-light btn-md w-100 py-2 px-2 mx-2">
                  <svg xmlns="http://www.w3.org/2000/svg" height="2rem" width="2rem" viewBox="0 0 576 512"><path fill='#F02849' d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" /></svg>
                  <small className="text-muted mx-2">Live Video</small></button>
                <button onClick={OpenPostModal} type="button" className="btn btn-light btn-md w-100 py-2 px-2 mx-2">
                  <svg xmlns="http://www.w3.org/2000/svg" height="2rem" width="2rem" viewBox="0 0 576 512"><path fill="#46BD63" d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z" /></svg>
                  <small className="text-muted mx-2">Photo/Video</small></button>
                <button type="button" className="btn btn-light btn-md w-100 py-2 px-2 mx-2">
                  <svg xmlns="http://www.w3.org/2000/svg" height="2rem" width="2rem" viewBox="0 0 512 512"><path fill="#FFD43B" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                  <small className="text-muted mx-2">Feeling/Activity</small></button>
              </div>
            </div>

            {/* </div> */}
            <PostUplaodModal />
            <PostModal />
          </div>
        </div>
        <RightBar />
      </div>

      <Modal show={openSubscriptionModal} onHide={handleClose} backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Subscribe</Modal.Title>
        </Modal.Header>
        <Modal.Body>Subscribe for push notification</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
          <Button variant="primary" onClick={handleSubscribe}>
            Subscribe
          </Button>
        </Modal.Footer>
      </Modal> 
    </>
  )
}

export default HomePage