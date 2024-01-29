import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import user1 from './images/user1.jpg'
import user2 from './images/user2.jpg'
import user3 from './images/user3.jpg'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import event1 from './images/event1.jpg'
import eventp1 from './images/eventp1.jpg'
import Navbar from './Navbar.js'
import { useContext } from 'react';
import UserDataContext from './Context/UserContext.js';
import axios from 'axios';
import { apiVariables } from './utilities/apiVariables.js';
import BASE_URL_API from './utilities/baseURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const [userData, setUserdata] = useState()
  const [postPicture, setPostPicture] = useState([]);
  const [postCaption, setPostCaption] = useState('')
  const [imagePreviews, setImagePreviews] = useState([]);
  
  const notify = (message) => toast(message);
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
          setUserProfilePicture(response.data)
        }
      }).catch((err) => {
        console.log(err)
      })

  }
  const handlePostCaption = (e) => {
    setPostCaption(e.target.value);
  }
  
  const handleRemoveImage = (index) => {
    const updatedFiles = postPicture.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setPostPicture(updatedFiles); 
    setImagePreviews(updatedPreviews);
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setPostPicture((prevFiles) => [...prevFiles, ...selectedImages]);
    // Map through selected images to create image previews
    const imagePreviewUrls = selectedImages.map((image) => URL.createObjectURL(image));

    // Update state by concatenating new previews with existing ones
    setImagePreviews((prevPreviews) => [...prevPreviews, ...imagePreviewUrls]);
  };

  const uplaodPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    postPicture.forEach((picture, index) => {
      formData.append('images', picture)
    })
    formData.append('postCaption', postCaption)
    console.log([...formData.entries()])
    const apicall = await axios.post(BASE_URL_API + apiVariables.createPost.url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials:"include"
    })
    if (apicall.status = !201) {
      notify("error in uploading Post");
    } else {
      setImagePreviews([])
      notify('Post uploaded succesfully!') 
    }
  }

 
  const convertedProfilePicture =
    UserProfilePicture.map((singleData) => {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(singleData.file.data.data))
      );
      return `data:image/jpeg;base64,${base64String}`
    })

  useEffect(() => {
    changeBodybg();
    getUserProfilePicture()
  }, [])

  useEffect(() => {
    setUserdata(user)
  }, [user])

  return (
    <>
      <Navbar />
        <Container>
        <Row>
          {/* <Col xs={2}>
            <div className='sidenav'>
              <div className='sidebarOption'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" fill='#1BB9B9' /></svg>
                <a href="#"> Feed</a>
              </div>
              <div className='sidebarOption'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" fill='#1BB9B9' /></svg>
                <a href="#"> Explore</a>
              </div>
              <div className='sidebarOption'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" fill='#1BB9B9' /></svg>
                <a href="#"> Group</a>
              </div>
              <div className='sidebarOption'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" fill='#1BB9B9' /></svg>
                <a href="#">Favorites</a>
              </div>
            </div>
          </Col> */}
          <Col>
            <div className='PostCard'>
              <Card>
                <Card.Body>
                  <div className='postbar'>
                    <img className='profilePic' alt='' src={convertedProfilePicture} />
                    <Form.Control as="textarea" rows={3} placeholder="What's happening?" onChange={handlePostCaption} />
                  </div>
                  <Form.Control type="file" name='images' size="sm" onChange={handleImageChange} multiple/>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {imagePreviews.map((previewUrl, index) => (
                      <div key={index} style={{ position: 'relative' }}>
                        <img
                          src={previewUrl}
                          alt={`Preview ${index}`}
                          style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          style={{ position: 'absolute', top: '5px', right: '5px' }}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className='buttons1' >
                    <Button size="sm" variant='outline-light'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" /></svg>Live Video</Button>
                    <Button size="sm" variant='outline-light'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /></svg>Photos</Button>
                    <Button size="sm" variant='outline-light'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>Feeling</Button>
                    <Button size="sm" variant='outline-light' onClick={uplaodPost}>Post</Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className='PostCard' style={{ paddingTop: "5px" }}>
              <Card style={{ width: '100%' }}>
                <div className='postbar'>
                  <div>
                    <img className='profilePic' alt='' src={convertedProfilePicture} />
                  </div>
                  <div style={{ paddingTop: 10 }}>
                    <Card.Title>{userData?.Name} {userData?.LastName}</Card.Title>
                    <p>Delhi India</p>
                  </div>
                </div>
                <div className='postCaption'>
                  <p>छपाई और अक्षर योजन उद्योग का एक साधारण डमी पाठ है. Lorem Ipsum सन १५०० के बाद से अभी तक इस उद्योग का मानक डमी पाठ मन गया, जब एक अज्ञात मुद्रक ने नमूना लेकर एक नमूना किताब बनाई. </p>
                </div>
                <img className='postImage' alt='' src={user1} />
                <Card.Body>
                  <div className='LikeComment'>
                    <div id='circles'>
                      <img alt='' src={user1} />
                      <div id='img2'>
                        <img alt="" src={user2} />
                        <div id='img3'>
                          <img alt='' src={user3} />
                          <div id='img4'>
                            <p>+14</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='like'>
                      <p style={{ paddingRight: "30px" }}>14 Comment</p>
                      <p>256 Likes</p>
                    </div>
                  </div>
                  <hr />
                  <div className='lcs'>
                    <Button variant="link"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>Like</Button>
                    <Button variant="link"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" /></svg>Comment</Button>
                    <Button variant="link"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" /></svg>Share</Button>
                  </div>
                  <hr />
                  <div className='commentbox'>
                    <img style={{ width: '30px', height: "30px", displayL: "inline-block", borderRadius: "50%", }} src={convertedProfilePicture} />
                    <Form.Control size="sm" id='Cbox' type="text" placeholder="Write a Comment.." />
                    <Button size='sm' variant='Outlined-light'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" fill='#1BB9B9' /></svg>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col xs={3}>
            <div className='mutualFcard'>
              <Card>
                <Card.Body>
                  <div id='postbar'>
                    <h6>You Might Like</h6>
                    <a style={{ color: "#1BB9B9", }} href='#'>See all</a>
                  </div>

                  <div className='postbar '>
                    <img className='profilePic' src={user1} style={{ width: '40px', height: "40px" }} />
                    <h6 style={{ color: "gray" }}>Imran Khan</h6>

                  </div>
                  <div className='d-flex flex-row gap-5'>
                    <div className='LikeComment'>
                      <div id='circles'>
                        <img src={user1} />
                        <div id='img2'>
                          <img src={user2} />
                          <div id='img3'>
                            <img src={user3} />
                            <div id='img4'>
                              <p>+14</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>Mutual friends</p>
                  </div>

                  <div id='postbar'>
                    <Button style={{ width: "10rem", backgroundColor: '#1BB9B9' }} variant='outline-light'>Follow </Button>
                    <Button style={{ width: "10rem", backgroundColor: '#1BB9B9' }} variant='outline-light'>Ignore</Button>
                  </div>
                </Card.Body>
              </Card>

            </div>
            <div className='events pt-4'>
              <Card>
                <Card.Body>
                  <div id='postbar'>
                    <h6>Upcoming Events</h6>
                    <a style={{ color: "#1BB9B9", }} href='#'>See all</a>
                  </div>
                  <div className='eventDetails'>
                    <div className='d-flex flex-row'>
                      <div id='rbox'>
                        <div class="rhombus-1">
                          <div id='point'></div>
                        </div>
                      </div>
                      <div className='mx-2 mt-0'>
                        <div className='d-flex flex-column' id='eventTime'>Desing Talks <span>12 Oct, 13:00 IST</span></div>
                      </div>
                    </div>
                    <p className='mt-1 text-sm'>A General talk about the desing with best designer of the world.</p>
                    <hr />
                    <div className='d-flex flex-row justify-content-between'>
                      <div className='LikeComment'>
                        <div id='circles'>
                          <img src={user1} />
                          <div id='img2'>
                            <img src={user2} />
                            <div id='img3'>
                              <img src={user3} />
                              <div id='img4'>
                                <p>+14</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>112 Joined</p>
                    </div>
                  </div>
                  <div className='pt-4'>
                    <div className='eventDetails '>
                      <div className='d-flex flex-row'>
                        <div id='rbox'>
                          <div class="rhombus-1">
                            <div id='point'></div>
                          </div>
                        </div>
                        <div className='mx-2 mt-0'>
                          <div className='d-flex flex-column' id='eventTime'>Desing Talks <span>12 Oct, 13:00 IST</span></div>
                        </div>
                      </div>
                      <p className='mt-1 text-sm'>A General talk about the desing with best designer of the world.</p>
                      <hr />
                      <div className='d-flex flex-row justify-content-between'>
                        <div className='LikeComment'>
                          <div id='circles'>
                            <img alt='' src={user1} />
                            <div id='img2'>
                              <img alt='' src={user2} />
                              <div id='img3'>
                                <img alt='' src={user3} />
                                <div id='img4'>
                                  <p>+14</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p>112 Joined</p>
                      </div>
                    </div>
                  </div>

                </Card.Body>
              </Card>
            </div>
            <div className='pt-3'>
              <Card >
                <Card.Body >
                  <div id='postbar'>
                    <h6>Suggested Groups</h6>
                    <a style={{ color: "#6DB9FF", }} href='#'>See all</a>
                  </div>
                  <div className='groupCard'>
                    <Card.Img variant="top" src={event1} />
                    <img src={eventp1} class="rounded-circle" alt="Cinque Terre" />

                  </div>
                </Card.Body>
                <div className='d-flex justify-content-center '>
                  <p id='eventheading'>UI Ux designer</p>
                </div>
                <div className='d-flex justify-content-between mx-2'>
                  <p >123 member</p>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                </div>
              </Card>
            </div>

          </Col>
          <Col xs={3}>
            <div>
              <h6>You might Like</h6>
            </div>
          </Col>
        </Row>
      </Container >
      <ToastContainer />

    </>
  )
}

export default Sidebar