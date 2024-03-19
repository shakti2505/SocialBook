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
import Form from "react-bootstrap/Form";

const ProfilePage = () => {
  const [addBio, setAddBio] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPosts, setTotalPost] = useState(0);
  const [bio, setBio] = useState("");
  const [key, setKey] = useState("Posts");
  const [AddprofilePictureModal, setAddprofilePictureModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState([]);
  const [profilePicturePreview, setProfilePicturePreview] = useState([]);
  const [ShowCancleDpUplpad, setShowCancleDpUplpad] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [postUrl, setPostUrl] = useState([]);
  // const { posts } = useContext(UserDataContext);
  const [postCaption, setPostCaption] = useState("");
  const [posts, setposts] = useState([]);

  const { loggedInUser, OpenPostModal, ClosePostModal, modalShow } =
    useContext(UserDataContext);

  const handleCloseDpDiscard = () => {
    setProfilePicturePreview([]);
    setShowCancleDpUplpad(false);
  };
  const addbio = () => {
    setBio(loggedInUser.bio);
    setAddBio(true);
  };

  const handleShowCancleDpUplpad = () => setShowCancleDpUplpad(true);

  const handleProfilePictuePreview = (e) => {
    const selectedImages = Array.from(e.target.files);
    setProfilePicture((prevFiles) => [...prevFiles, ...selectedImages]);
    // Map through selected images to create image previews
    const imagePreviewUrls = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    // Update state by concatenating new previews with existing ones
    setProfilePicturePreview((prevPreviews) => [
      ...prevPreviews,
      ...imagePreviewUrls,
    ]);
  };
  const handleChangeBio = (e) => {
    setBio(e.target.value);
  };

  const getPosts = () => {
    const limit = 13;
    axios
      .get(BASE_URL_API + apiVariables.getPosts.url, {
        params: {
          page: activePage,
          pageSize: limit,
        },
        withCredentials: true,
      })
      .then((response) => {
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

  const changeProfilePicture = async () => {
    try {
      // document.getElementById('postbtn').setAttribute('disabled', 'true');
      setisloading(true);
      let imageURL = [];
      let formData = new FormData();
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      formData.append("folder", process.env.REACT_APP_PROFILE_FOLDER);
      formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      const uploadPromises = profilePicture.map(async (item) => {
        formData.append("file", item);
        let response1 = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
          {
            method: "post",
            body: formData,
          }
        );
        if (!response1.ok) {
          throw new Error("Failed to upload images");
        }

        const data = await response1.json();
        console.log("", data.url);
        imageURL.push(data.url);
      });

      // Wait for all upload promises to resolve
      await Promise.all(uploadPromises);
      const response2 = await axios.put(
        BASE_URL_API + apiVariables.uploadDP.url,
        {
          profilePic: imageURL,
        },
        { withCredentials: "include" }
      );

      if (response2.status != 201) {
        throw new Error("Failed to fetch result data");
      }
      const uploadedPost = await response2;
      // setisloading(false);
      setProfilePicturePreview([]);
      setAddprofilePictureModal(false);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const UpdateUserInfo = async () => {
    setisloading(true);
    let apicall = await axios.put(
      BASE_URL_API + apiVariables.uploadDP.url,
      {
        bio: bio,
      },
      { withCredentials: "include" }
    );
    if (apicall.status !== 201) {
      throw new Error("Failed to Upload Data");
    } else {
      setisloading(false);
      setAddBio(false);
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
    getPosts();
  }, []);

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
            <div
              className="d-flex justify-content-evenly userProfile"
              onClick={() => setAddprofilePictureModal(true)}
            >
              <img
                src={loggedInUser.profilePic}
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
                  {loggedInUser.firstName} {loggedInUser.LastName}
                </strong>
              </h2>
              <p className="text-muted">561 friends</p>
              <p className="text-muted">{loggedInUser.bio}</p>
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
                                  {addBio ? (
                                    <>
                                      {/* <input type="text" className="w-100" name="bio" onChange={(e)=>setBio(e.target.value)}/> */}
                                      <textarea
                                        disabled={isloading ? true : false}
                                        className="form-control w-100"
                                        rows="3"
                                        type="text"
                                        value={bio}
                                        onChange={handleChangeBio}
                                        placeholder="Describle Who you are"
                                      ></textarea>
                                      <p className="text-muted float-end mt-1">
                                        {101 - bio.length} Character remaining
                                      </p>
                                      <div className="d-flex justify-content-between mt-5">
                                        <div className="d-flex">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            width="20"
                                            height="20"
                                          >
                                            <path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                                          </svg>
                                          <p className="text-muted mx-2">
                                            Public
                                          </p>
                                        </div>
                                        <div>
                                          <button
                                            disabled={isloading ? true : false}
                                            className="btn btn-light btn-md mx-2 shadow-sm"
                                            onClick={() => setAddBio(false)}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            onClick={UpdateUserInfo}
                                            disabled={isloading ? true : false}
                                            className="btn btn-light btn-md shadow-sm"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <button
                                      placeholder="dfd"
                                      onClick={addbio}
                                      className="btn btn-light btn-lg w-100 mt-1 shadow-sm"
                                    >
                                      {loggedInUser.bio
                                        ? "Edit Bio"
                                        : "Add bio"}{" "}
                                    </button>
                                  )}
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
                                      <span className="mx-3 flex">
                                        Lives in{" "}
                                        <strong>
                                          {" "}
                                          {loggedInUser.livesIn},{" "}
                                          {loggedInUser.city}
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
                                  <button
                                    type="button"
                                    className="btn btn-light w-100 shadow-sm mb-4"
                                  >
                                    Edit Details
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-light w-100 shadow-sm mb-4"
                                  >
                                    Add Features
                                  </button>
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
                                                  className="w-full shadow-1-strong rounded"
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
                                                className="w-full shadow-1-strong rounded"
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
                              <div className="card">
                                <div className="card-body">
                                  <div className="flex justify-between">
                                    <a href="/profile">
                                      <img
                                        src={loggedInUser.profilePic}
                                        alt="img"
                                        className=" object-cover rounded-full h-14 w-14"
                                       
                                      />
                                    </a>

                                    <button
                                      onClick={OpenPostModal}
                                      className=" text-center btn btn-light ml-2 shadow-sm w-full rounded-3xl"
                                    >
                                      {postCaption.length !== 0
                                        ? postCaption
                                        : `What's on you mind, ${loggedInUser.firstName}?`}
                                    </button>
                                  </div>
                                </div>
                                <hr className="mx-2" />
                                <div className="d-flex justify-content-around py-2 px-2">
                                  <button className="btn btn-light btn-sm py-2 px-2 mx-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="2rem"
                                      width="2rem"
                                      viewBox="0 0 576 512"
                                    >
                                      <path
                                        fill="#F02849"
                                        d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
                                      />
                                    </svg>
                                    <small className="text-muted mx-2">
                                      Live Video
                                    </small>
                                  </button>
                                  <button
                                    onClick={OpenPostModal}
                                    type="button"
                                    className="btn btn-light  btn-sm  py-2 px-2 mx-2"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="2rem"
                                      width="2rem"
                                      viewBox="0 0 576 512"
                                    >
                                      <path
                                        fill="#46BD63"
                                        d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z"
                                      />
                                    </svg>
                                    <small className="text-muted mx-2">
                                      Photo/Video
                                    </small>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-light  btn-sm  py-2 px-2 mx-2"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="2rem"
                                      width="2rem"
                                      viewBox="0 0 512 512"
                                    >
                                      <path
                                        fill="#FFD43B"
                                        d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                                      />
                                    </svg>
                                    <small className="text-muted mx-2">
                                      Feeling/Activity
                                    </small>
                                  </button>
                                </div>
                              </div>
                              <PostUplaodModal />
                              <PostModal />
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

          {/* use data section */}

          {/* section Buttons */}
          {/* <section className="py-3 d-flex justify-content-between align-items-center" style={{ marginLeft: "10%", marginRight: "10%" }}>
            <div>
              <button type="button" className="btn btn-light mx-1 mt-2 text-reset shadow-sm">POST</button>
              <button type="button" className="btn btn-light mx-1 mt-2 text-reset shadow-sm">ABOUT</button>
              <button type="button" className="btn btn-light mx-1 mt-2 text-reset shadow-sm">FRIENDS <small className="text-muted">1452</small> </button>
              <button type="button" className="btn btn-light mx-1 mt-2 text-reset shadow-sm">PHOTOS</button>
              <div className="dropdown d-inline-block ">
                <button className="btn btn-secondary dropdown-toggle mx-1 mt-2 text-reset shadow-sm" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  MORE
                </button>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </div>

            </div>

            <div>
              <button type="button" className="btn btn-light mr-2  mt-2 text-reset shadow-sm"> <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 576 512"><path fill="#74C0FC" d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z" /></svg>EDIT PROFILE</button>
              <button type="button" className="btn btn-light mr-2 mt-2 text-reset shadow-sm">mfdkf</button>
              <button type="button" className="btn btn-light mr-2 mt-2 text-reset shadow-sm">EDIT PROFILE</button>
              <button type="button" className="btn btn-light mt-2 text-reset  shadow-sm">EDIT PROFILE</button>

            </div>
          </section> */}
          {/* section Buttons */}
        </div>
      </section>

      {/* add profile picture modal */}
      <Modal
        show={AddprofilePictureModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // onHide={()=>setAddprofilePictureModal(false)}
      >
        <div className="flex justify-between">
          <h4 className="mx-2 ">Choose Profile Picture</h4>
          <button
            className="btn btn-light"
            onClick={() => setAddprofilePictureModal(false)}
          >
            X
          </button>
        </div>
        <hr></hr>
        <Modal.Body>
          {/* <button className="btn btn-light btn-md w-100 position-relative shadow-sm align-items-center" id="profilePicUploadBtn">
          <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20"><path fill="#0064D1" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
          <span style={{color:"#0064D1"}} className="mx-2 mt-1"><strong>Uplaod Photo</strong></span>
            <input
              id='FileUpload'
              style={{opacity: "1" , position:"absolute", top:"0"}}
              className='position-relative w-100'
              type='file'
              multiple
              accept='image/png, image/jpg, image/jpeg , image/bmp'
            /> 
            </button> */}
          <button
            className="btn btn-light w-full relative"
            id="profilePicUploadBtn"
            disabled={profilePicturePreview.length !== 0 ? true : false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-full h-5 fill-current"
            > 
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            <span style={{ color: "#0064D1" }} className="mx-2 mt-1">
              Upload Photo
            </span>
            <input
              id="FileUpload"
              style={{
                zIndex: "1",
                opacity: "0",
                border: "1px solid",
                left: "1rem",
              }}
              className="absolute w-full"
              type="file"
              multiple
              accept="image/png, image/jpg, image/jpeg , image/bmp"
              onChange={handleProfilePictuePreview}
              disabled={profilePicturePreview.length !== 0 ? true : false}
            />
          </button>

          <div className="d-flex justify-content-center align-items-center mt-2 position-relative">
            {profilePicturePreview.length !== 0 &&
              profilePicturePreview.map((item) => {
                return (
                  <>
                    <img
                      id="previewImg"
                      src={item}
                      style={{
                        width: "10rem",
                        height: "10rem",
                        borderRadius: "50%",
                        objectFit: "cover",
                        alignItems: "center",
                      }}
                    />
                  </>
                );
              })}
          </div>
        </Modal.Body>
        <Modal.Footer
          className={profilePicturePreview.length !== 0 ? "" : "d-none"}
        >
          {/* <Button onClick={() => setAddprofilePictureModal(false)}>Close</Button> */}
          <Button onClick={handleShowCancleDpUplpad}>Close</Button>
          <Button onClick={changeProfilePicture} id="postbtn">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* add profile picture modal */}

      <Modal
        show={ShowCancleDpUplpad}
        backdrop="static"
        keyboard={false}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Discard changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to discard your changes?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCancleDpUplpad(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseDpDiscard}>
            Discard
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfilePage;
