import "./Profile.css";
import React, { useContext, useEffect, useState } from "react";
import Navbars from "../../../Navbar.js";
import UserDataContext from "../../../Context/UserContext.js";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import BASE_URL_API from "..//..//..//utilities/baseURL.js";
import axios from "axios";
import { apiVariables } from "..//..//..//utilities/apiVariables.js";
import PostModal from "../../PostModal.js";
import PostUplaodModal from "../PostUplaodModal.js";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";
import EmojiPicker from "emoji-picker-react";
import paperPlane from "..//..//..//images/Icon/paper-plane.png";
import CommentSection from "../CommentSection/CommentSection.js";

const FriendProfilepage = () => {
  let { id } = useParams();
  const [addBio, setAddBio] = useState(false);
  const [bio, setBio] = useState("");
  const [key, setKey] = useState("Posts");
  const [AddprofilePictureModal, setAddprofilePictureModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState([]);
  const [profilePicturePreview, setProfilePicturePreview] = useState([]);
  const [ShowCancleDpUplpad, setShowCancleDpUplpad] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [postUrl, setPostUrl] = useState([]);
  const [specificUser, setSpecificUser] = useState([]);
  // const { posts } = useContext(UserDataContext);
  const [postCaption, setPostCaption] = useState("");
  const [posts, setposts] = useState([]);

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(
    Array(posts.length).fill(false)
  );
  const [commentSectionOpen, setcommentSectionOpen] = useState(
    Array(posts.length).fill(false)
  );

  const [seeMore, setseeMore] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPosts, setTotalPost] = useState(0);
  const [comment, setComment] = useState("");
  const [OpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  // const { posts } = useContext(UserDataContext);

  const ConvertDateTime = (DateTime) => {
    return new Date(DateTime).toLocaleString();
  };

  const concateCommentWithEmoji = (emoji) => {
    setComment((prevComment) => prevComment + emoji);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSection = (index) => {
    const newCommentSectionOpen = [...commentSectionOpen];
    newCommentSectionOpen[index] = !newCommentSectionOpen[index];
    setcommentSectionOpen(newCommentSectionOpen);
  };

  const handleEmojiPickerToggle = (index) => {
    const newEmojiPickerOpen = [...emojiPickerOpen];
    newEmojiPickerOpen[index] = !newEmojiPickerOpen[index];
    setEmojiPickerOpen(newEmojiPickerOpen);
  };

  const { loggedInUser, OpenPostModal, ClosePostModal, modalShow } =
    useContext(UserDataContext);

  const getUserSpecificPost = () => {
    const limit = 13;
    axios
      .get(BASE_URL_API + apiVariables.getUserSpecificPosts.url, {
        params: {
          page: activePage,
          pageSize: limit,
          UserId: id,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
        } else {
          setTotalPost(response.data.total);
          setActivePage(activePage + 1);
          setposts([...posts, ...response.data.posts]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getSpecifiedUser = (id) => {
  //   console.log(id)
  //   axios
  //     .get(
  //       BASE_URL_API + apiVariables.getSpecifiedUser.url

  //       {
  //         withCredentials: true,
  //       },
  //     )
  //     .then((response) => {
  //       if (response.status !== 200) {
  //       } else {
  //         setSpecificUser(response.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getSpecifiedUser = async (apivar) => {
    const apicall = await axios.get(`${BASE_URL_API}${apivar.url}`, {
      withCredentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    if (apicall.status !== 200) {
      console.log("Internal Error");
    } else {
      setSpecificUser(apicall.data.specificUser)
    }
  };

  const create_comment = async (postID, LoggedInUserDp, userName) => {
    console.log(postID, LoggedInUserDp, userName);
    const apicall = await axios.post(
      BASE_URL_API + apiVariables.createComments.url,
      {
        postID: postID,
        comment: comment,
        LoggedInUserDp: LoggedInUserDp,
        LoggedInUserName: userName,
      },
      { withCredentials: "include" }
    );

    if (apicall.status !== 201) {
      alert("Unable to comment on post");
    } else {
      console.log("comments response::", apicall.data);
      setComment("");
    }
  };

  const url =
    "https://res.cloudinary.com/dtbz1n84e/image/upload/v1705424794/cld-sample.jpg";
  const url2 =
    "https://res.cloudinary.com/dtbz1n84e/image/upload/v1705424771/samples/imagecon-group.jpg";

  useEffect(() => {
    posts.map((item) => {
      setPostUrl(item.postImagesURls);
    });
  }, [posts]);

  useEffect(() => {
    getUserSpecificPost();
  }, []);

  useEffect(() => {
    getSpecifiedUser(
      apiVariables.getSpecifiedUser(id)
    );
  }, [id])

  

  return (
    <>
      {/* style={{ backgroundColor: '#FFFFFF', boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }} */}
      {/* <Navbars /> */}
      <section className="mb-4">
        <div className="container">
          {/* image section           */}
          <section className="">
            <div
              className="text-center bg-image shadow-1-strong rounded-bottom"
              style={{
                backgroundImage: `url(${url2})`,
                height: "400px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            ></div>
            <div className="d-flex justify-content-evenly userProfile">
              <img
                src={specificUser.profilePic}
                style={{
                  width: "10rem",
                  height: "10rem",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginTop: "-100px",
                }}
                className=" shadow-3-strong align-items-center position-relative"
              />
            </div>
          </section>
          {/* image section */}
          {/* use data section */}
          <section className="text-center">
            <div className="d-flex flex-column text-center justify-content-center">
              <h2>
                <strong>
                  {specificUser.firstName} {specificUser.LastName}
                </strong>
              </h2>
              <p className="text-muted">561 friends</p>
              <p className="text-muted">{specificUser.bio}</p>
            </div>
          </section>
          {/* use data section */}
          <div className="container">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <section className="py-3">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    style={{ border: "0" }}
                  >
                    <Tab eventKey="Posts" title="Posts" id="tab">
                      <section>
                        <div className="container ">
                          <div className="row">
                            <div className="col-md-5 mb-4">
                              <div className="card">
                                <div className="card-body">
                                  <h5 className="card-title">
                                    <strong>Intro</strong>
                                  </h5>
                                  <ul className="list-unstyled text-muted">
                                    <li className="mt-3 flex">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                        width="25"
                                        height="25"
                                      >
                                        <path
                                          fill="#8C939D"
                                          d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z"
                                        />
                                      </svg>
                                      <span className="mx-3">
                                        Lives in{" "}
                                        <strong>
                                          {" "}
                                          {specificUser.livesIn},{" "}
                                          {specificUser.city}
                                        </strong>
                                      </span>
                                    </li>
                                    <li className="mt-3 flex">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        width="20"
                                        height="20"
                                      >
                                        <path
                                          fill="#8C939D"
                                          d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                                        />
                                      </svg>
                                      <span className="mx-3">Single</span>
                                    </li>
                                    <li className="mt-3 flex">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        width="20"
                                        height="20"
                                      >
                                        <path
                                          fill="#8C939D"
                                          d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                                        />
                                      </svg>
                                      <span className="mx-3 flex">
                                        Joined on <strong>December 2011</strong>
                                      </span>
                                    </li>
                                    <li className="mt-3 flex">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 512"
                                        width="25"
                                        height="25"
                                      >
                                        <path
                                          fill="#8C939D"
                                          d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48V352h28.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16V352c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V128H16zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128V352c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"
                                        />
                                      </svg>
                                      <span className="mx-3">
                                        Followed by <strong>83 people</strong>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="card mt-2">
                                <div className="card-body">
                                  <a
                                    href=""
                                    id="Photos"
                                    className="text-reset d-inline-block"
                                  >
                                    <h5 className="card-title mt-1 mb-4">
                                      <strong>Photos</strong>{" "}
                                    </h5>
                                  </a>
                                  <a
                                    href=""
                                    id="seeAllPhotos"
                                    className="btn btn-link d-inline-block float-right py-1 px-3 "
                                  >
                                    See All Photos
                                  </a>
                                  {postUrl.length !== 0 &&
                                    postUrl.map((item, index) => {
                                      return (
                                        <>
                                          <div className="row gx-2">
                                            <div className="col-lg-4">
                                              <a
                                                href={index == 0 && item}
                                                target="_blank"
                                              >
                                                <img
                                                  src={index == 0 && item}
                                                  className="w-100 shadow-1-strong rounded"
                                                  alt="Image1"
                                                  style={{
                                                    borderTopLeftRadius:
                                                      "0.5rem",
                                                  }}
                                                />
                                              </a>
                                            </div>
                                            <div className="col-lg-4">
                                              <img
                                                src={index == 1 && item}
                                                className="w-100 shadow-1-strong rounded"
                                                alt="Image2"
                                              />
                                            </div>
                                            <div className="col-lg-4">
                                              <img
                                                src={index == 2 && item}
                                                className="w-100 shadow-1-strong rounded"
                                                alt="Image3"
                                                style={{
                                                  borderTopRightRadius:
                                                    "0.5rem",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                </div>
                              </div>
                              <div className="card mt-2">
                                <div className="card-body">
                                  <a
                                    href=""
                                    id="Photos"
                                    className="text-reset d-inline-block"
                                  >
                                    <h5 className="card-title mt-1 mb-4">
                                      <strong>
                                        Friends{" "}
                                        <small className="text-muted ml-1">
                                          561
                                        </small>
                                      </strong>
                                    </h5>
                                  </a>
                                  <a
                                    href=""
                                    id="seeAllPhotos"
                                    className="btn btn-link d-inline-block float-right py-1 px-3 "
                                  >
                                    See All Friends
                                  </a>

                                  {postUrl.length !== 0 &&
                                    postUrl.map((item, index) => {
                                      return (
                                        <>
                                          <div className="row gx-2 text-center text-muted">
                                            <div className="col-lg-4">
                                              <a
                                                href={index == 0 && item}
                                                target="_blank"
                                              >
                                                <img
                                                  src={index == 0 && item}
                                                  className="w-100 shadow-1-strong rounded"
                                                  alt="Image1"
                                                  style={{
                                                    borderTopLeftRadius:
                                                      "0.5rem",
                                                  }}
                                                />
                                              </a>
                                              <p className="mb-1">
                                                <small id="friend-name">
                                                  John Doe
                                                </small>
                                              </p>
                                            </div>
                                            <div className="col-lg-4">
                                              <img
                                                src={index == 1 && item}
                                                className="w-100 shadow-1-strong rounded"
                                                alt="Image2"
                                              />
                                              <p className="mb-1">
                                                <small id="friend-name">
                                                  John Doe
                                                </small>
                                              </p>
                                            </div>
                                            <div className="col-lg-4">
                                              <img
                                                src={index == 2 && item}
                                                className="w-100 shadow-1-strong rounded"
                                                alt="Image3"
                                                style={{
                                                  borderTopRightRadius:
                                                    "0.5rem",
                                                }}
                                              />
                                              <p className="mb-1">
                                                <small id="friend-name">
                                                  John Doe
                                                </small>
                                              </p>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-7 mb-4 mb-md-0">
                              {/* <PostModal /> */}
                              <InfiniteScroll
                                dataLength={posts.length}
                                next={getUserSpecificPost}
                                hasMore={posts.length < totalPosts}
                                loader={
                                  <Spinner
                                    animation="border"
                                    variant="primary"
                                  />
                                }
                                endMessage={
                                  <p className="text-center mt-1">
                                    <b>Wow! You have seen it all!</b>
                                  </p>
                                }
                              >
                                {posts.length !== 0 &&
                                  posts.map((item, index) => {
                                    return (
                                      <>
                                        <div
                                          className="card mt-2 shadow-sm d-flex"
                                          key={item._id}
                                        >
                                          <div className="card-body">
                                            <div className="d-flex">
                                              <a href="/profile">
                                                <img
                                                  src={item.postOwnerDP}
                                                  className="ml-1 rounded-full h-12 w-12 object-cover"                                                />
                                              </a>
                                              <div className="d-flex flex-column">
                                                <strong className="mx-2">
                                                  {item.postOwner}
                                                </strong>
                                                <p
                                                  style={{ fontSize: "0.8rem" }}
                                                  className="mx-2"
                                                >
                                                  {ConvertDateTime(
                                                    item.createdAt
                                                  )}
                                                </p>
                                              </div>
                                            </div>
                                            <p>{item.postCaption}</p>
                                          </div>
                                          <div className="d-flex justify-content-between">
                                            {item.postImagesURls.length !== 0 &&
                                              item.postImagesURls.map(
                                                (previewUrl, index) => {
                                                  return (
                                                    <div key={index + 1}>
                                                      <img
                                                        src={previewUrl}
                                                        style={{
                                                          height: "100%",
                                                          width: "100%",
                                                          objectFit: "cover",
                                                        }}
                                                        className="mt-1"
                                                      />
                                                    </div>
                                                  );
                                                }
                                              )}
                                          </div>
                                          <hr className="m-2"></hr>
                                          <div className="d-flex align-items-center justify-content-around">
                                            <button className="btn btn-light btn-sm  mx-1 d-flex align-items-center justify-content-center">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                width="25"
                                                height="25"
                                              >
                                                <path
                                                  fill="#686E77"
                                                  d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"
                                                />
                                              </svg>
                                              <strong className=" text-muted mx-2">
                                                Like
                                              </strong>
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleCommentSection(index)
                                              }
                                              className="btn btn-light btn-sm mx-1 d-flex align-items-center justify-content-center"
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                height="25"
                                                width="25"
                                              >
                                                <path
                                                  fill="#686E77"
                                                  d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
                                                />
                                              </svg>
                                              <strong className=" text-muted mx-2">
                                                Comment
                                              </strong>
                                            </button>
                                            <button className="btn btn-light btn-sm  mx-1 d-flex align-items-center justify-content-center ">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                width="25"
                                                height="25"
                                              >
                                                <path
                                                  fill="#686E77"
                                                  d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
                                                />
                                              </svg>
                                              <strong className=" text-muted mx-2">
                                                Send
                                              </strong>
                                            </button>
                                          </div>
                                          <hr className="m-2"></hr>
                                          {/* comment section starts */}

                                          <CommentSection postId={item._id} />

                                          {/* comment section ends */}
                                          <hr className="m-2"></hr>
                                          {/* comment input starts */}
                                          {commentSectionOpen[index] && (
                                            <div className="d-flex flex-row mb-2">
                                              <a
                                                className="mx-2"
                                                href="/profile"
                                              >
                                                <img
                                                  src={loggedInUser.profilePic}
                                                  width="40"
                                                  height="40"
                                                  style={{
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                  }}
                                                />
                                              </a>
                                              <div className="w-100 mx-2 d-flex flex-column   m-0">
                                                <textarea
                                                  value={comment}
                                                  onChange={handleCommentChange}
                                                  placeholder="Write a comment...."
                                                  className="w-100 d-flex align-items-center"
                                                  style={{
                                                    outline: "none",
                                                    fontSize: "15px",
                                                    backgroundColor: "#F0F2F5",
                                                    border: "0",
                                                    borderTopLeftRadius: "17px",
                                                    borderTopRightRadius:
                                                      "17px",
                                                    resize: "none",
                                                    overflow: "hidden",
                                                  }}
                                                ></textarea>
                                                <div
                                                  className="d-flex justify-content-between align-items-center"
                                                  style={{
                                                    backgroundColor: "#F0F2F5",
                                                  }}
                                                >
                                                  <div className="d-flex">
                                                    <button
                                                      disabled={
                                                        comment.length !== 0
                                                          ? false
                                                          : true
                                                      }
                                                      className="p-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#F0F2F5",
                                                        outline: "none",
                                                        borderTopRightRadius:
                                                          "17px",
                                                        border: "0",
                                                        borderBottomRightRadius:
                                                          "17px",
                                                      }}
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 576 512"
                                                        width="20"
                                                        height="20"
                                                      >
                                                        <path
                                                          fill="#686E77"
                                                          d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                                                        />
                                                      </svg>
                                                    </button>
                                                    <button
                                                      onClick={() =>
                                                        handleEmojiPickerToggle(
                                                          index
                                                        )
                                                      }
                                                      className="p-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#F0F2F5",
                                                        outline: "none",
                                                        borderTopRightRadius:
                                                          "17px",
                                                        border: "0",
                                                        borderBottomRightRadius:
                                                          "17px",
                                                      }}
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                        width="20"
                                                        height="20"
                                                      >
                                                        <path
                                                          fill="#686E77"
                                                          d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                                                        />
                                                      </svg>
                                                    </button>
                                                    <button
                                                      className="p-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#F0F2F5",
                                                        outline: "none",
                                                        borderTopRightRadius:
                                                          "17px",
                                                        border: "0",
                                                        borderBottomRightRadius:
                                                          "17px",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          border:
                                                            "2px solid grey",
                                                          borderRadius: "5px",
                                                          fontSize: "10px",
                                                        }}
                                                      >
                                                        <small
                                                          className="text-muted"
                                                          style={{
                                                            margin: "2px",
                                                          }}
                                                        >
                                                          GIF
                                                        </small>
                                                      </div>
                                                    </button>
                                                    <button
                                                      className="p-1"
                                                      style={{
                                                        backgroundColor:
                                                          "#F0F2F5",
                                                        outline: "none",
                                                        borderTopRightRadius:
                                                          "17px",
                                                        border: "0",
                                                        borderBottomRightRadius:
                                                          "17px",
                                                      }}
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                        width="20"
                                                        height="20"
                                                      >
                                                        <path
                                                          fill="#686E77"
                                                          d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                                                        />
                                                      </svg>
                                                    </button>
                                                  </div>
                                                  <button
                                                    onClick={() =>
                                                      create_comment(
                                                        item._id,
                                                        loggedInUser.profilePic,
                                                        loggedInUser.firstName +
                                                          " " +
                                                          loggedInUser.LastName
                                                      )
                                                    }
                                                    disabled={
                                                      comment.length !== 0
                                                        ? false
                                                        : true
                                                    }
                                                    className="p-2"
                                                    style={{
                                                      backgroundColor:
                                                        "#F0F2F5",
                                                      outline: "none",
                                                      borderTopRightRadius:
                                                        "17px",
                                                      border: "0",
                                                      borderBottomRightRadius:
                                                        "17px",
                                                    }}
                                                  >
                                                    <img
                                                      src={paperPlane}
                                                      width="25"
                                                      height="25"
                                                    />
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {/* comment input  ends*/}

                                          {emojiPickerOpen[index] && (
                                            <EmojiPicker
                                              onEmojiClick={(e) =>
                                                concateCommentWithEmoji(e.emoji)
                                              }
                                              emojiStyle="facebook"
                                              width="100%"
                                            />
                                          )}
                                        </div>
                                      </>
                                    );
                                  })}
                              </InfiniteScroll>
                            </div>
                          </div>
                        </div>
                      </section>
                    </Tab>
                    <Tab eventKey="About" title="About">
                      Tab content for About
                    </Tab>
                    <Tab eventKey="Friends" title="Friends">
                      Tab content for Friends
                    </Tab>
                    <Tab eventKey="Photos" title="Photos">
                      Tab content for Photos
                    </Tab>
                    <Tab eventKey="Videos" title="Videos">
                      Tab content for Videos
                    </Tab>
                    <Tab eventKey="Check-ins" title="Check-ins">
                      Tab content for Check-ins
                    </Tab>
                    <Tab eventKey="More" title="More">
                      Tab content for More
                    </Tab>
                  </Tabs>
                </section>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FriendProfilepage;
