import "./Home.css";
import React, { useContext, useState, useEffect } from "react";
import { apiVariables } from "../utilities/apiVariables.js";
import axios from "axios";
import BASE_URL_API from "../utilities/baseURL";
import Navbar from "../Navbar.js";
import LeftBar from "./LeftBar.js";
import RightBar from "./RightBar.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "./LoadingSpinner.js";
import PostModal from "./PostModal.js";
import UserDataContext from "../Context/UserContext.js";
import PostUplaodModal from "./Component/PostUplaodModal.js";
import swDev from "../serveiceWorkerDev.js";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { getDays } from "../utilities/utilities.js";

const HomePage = () => {
  // const [modalShow, setModalShow] = useState(false);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(true);
  const [isloading, setisloading] = useState(false);
  const [subscription, setSubscription] = useState({});
  const [textStory, settextStory] = useState([]);
  const [storyView, setStoryView] = useState(false);
  const [viewerLength, setViewerLength] = useState("");
  const defaultTextStory = {
    bgColor: "bg-white",
    storyFont: "sans-sarif",
    content: "",
  };
  const { loggedInUser, OpenPostModal, ClosePostModal, modalShow } =
    useContext(UserDataContext);
  const [userSubscription, setUserSubscription] = useState([]);
  const navigate = useNavigate();
  const loggedInUserSubsctription = localStorage.getItem("subscription");
  const handleClose = () => setOpenSubscriptionModal(false);
  const [smShow, setSmShow] = useState(false);
  const [story, setStory] = useState({});

  // const handleSubscribe = async () => {
  //   setisloading(true)
  //   const subscription=await swDev();
  //   console.log('subscription',subscription)
  //   if(subscription){
  //     setisloading(false)
  //     setSubscription(subscription);
  //     setOpenSubscriptionModal(false)
  //   }
  //

  const ConvertDateTime = (DateTime) => {
    return new Date(DateTime).toLocaleString();
  };

  const getTextStories = async () => {
    let apicall = await axios.get(
      BASE_URL_API + apiVariables.get_text_stories.url,
      { withCredentials: true }
    );

    if (apicall.status !== 200) {
      console.log("NO text stories found");
    } else {
      settextStory(apicall.data.textStories);
    }
  };

  const showStory = (id) => {
    setViewerLength();
    setSmShow(true);
    const result = textStory.filter((item) => item._id === id);
    setStory(result[0]);
    setViewerLength(result[0].views.length);
    markStoryView(id);
  };

  const userStory = textStory.find((item) => item.user === loggedInUser._id);

  const markStoryView = async (storyID) => {
    let apicall = await axios.post(
      BASE_URL_API + apiVariables.view_marked_text_stories.url,
      {
        storyId: storyID,
      },
      { withCredentials: true }
    );

    if (apicall.status !== 201) {
      setStoryView(false);
    } else {
      setStoryView(true);
    }
  };
  // useEffect(()=>{
  //   if(localStorage.getItem('subscription')!='false'){
  //     handleSubscribe();
  //   }
  // },[])

  useEffect(() => {
    getTextStories();
  }, []);

  useEffect(()=>{
    console.log(story)
  },[story])

  return (
    <>
      {/* <Navbar /> */}
      <div className="d-flex">
        {/* <LeftBar /> */}
        <div className="col-8 p-4" id="middleBar" style={{ overflowY: "hidden" }}>
          {/* stories */}
          <div>
            <div className="w-full overflow-x-scroll mt-2">
              <div className="d-flex gap-3 w-max">
                <div
                  className={`relative ${
                    textStory.length !== 0 && textStory[0].bgColor
                  } h-[17rem] rounded-md`}
                >
                  {textStory.length == 0 && (
                    <img
                      src={loggedInUser.profilePic}
                      alt="images"
                      className=" object-cover w-40 rounded-t-lg h-[13rem]"
                    />
                  )}
                  <div className={`w-40 h-12 m-2 rounded-md`}>
                    {userStory && ( // Check if userStory is defined (i.e., found a matching story)
                      <img
                        src={userStory.storyURL} // Use the storyURL from the found userStory
                        alt="Story Image"
                        className="object-cover w-40 rounded-t-lg h-52" // Adjusted className
                      />
                    )}
                  </div>
                  <button
                    onClick={() => navigate("/stories/create")}
                    className="rounded-full ring-offset-2 ring w-8 h-8 absolute left-16 bottom-12 bg-[#1049F4] flex items-center  justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      height="13"
                      width="13"
                    >
                      <path
                        fill="#FFFFFF"
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                      />
                    </svg>
                  </button>
                  <p className=" absolute bottom-0 left-7 ">Create stroy</p>
                </div>
                {textStory.length !== 0 &&
                  textStory.map((item, index) => {
                    return (
                      <>
                        <div
                          onClick={() => showStory(item._id)}
                          key={index}
                          className="relative w-40"
                        >
                          <img
                            className="rounded-full absolute top-2 bg-slate-950  w-8 h-8 left-2 shadow-2xl ring ring-blue-500"
                            src={item.storyOwnerdp}
                          />
                          <img
                            src={item.storyURL}
                            alt="images"
                            className=" object-cover w-40 rounded-md h-[17rem]"
                          />
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            {/* stories */}
            <div className="card mt-2 shadow-sm">
              <div className="card-body">
                <div className="d-flex">
                  <a href="/profile">
                    <img
                      src={loggedInUser.profilePic}
                      className="w-14 h-14 object-cover rounded-full"
                    />
                  </a>
                  <button
                    onClick={OpenPostModal}
                    className="searchBtn text-muted btn btn-light mx-2 w-100 d-flex justify-start items-center shadow-md"
                  >
                    {`What's on you mind, ${loggedInUser.firstName} ?`}
                  </button>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-around align-items-center mb-2">
                <button className="btn btn-light btn-md d-flex justify-content-between align-items-center shadow-md">
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
                  <small className="text-muted mx-2">Live Video</small>
                </button>
                <button
                  onClick={OpenPostModal}
                  type="button"
                  className="btn btn-light btn-md shadow-md d-flex justify-content-between align-items-center"
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
                  <small className="text-muted mx-2">Photo/Video</small>
                </button>
                <button
                  type="button"
                  className="btn btn-light btn-md d-flex justify-content-between shadow-md  align-items-center"
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
                  <small className="text-muted mx-2">Feeling/Activity</small>
                </button>
              </div>
            </div>
            {/* </div> */}
            <PostUplaodModal />
            <PostModal />
          </div>
        </div>
        <RightBar />
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="relative"
      >
        {loggedInUser._id === story.user && (
          <div className="flex justify-start items-center">
            <svg
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="25"
              height="25"
            >
              <path
                fill="#36454F"
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
              />
            </svg>

            <small className="text-3xl text-slate-500 ml-2">
              {viewerLength && viewerLength}
            </small>
          </div>
        )}
        <div className=" absolute mt-2 ml-2">
          <div className="d-flex">
            <a href="/profile">
              <img
                src={story.storyOwnerdp}
                className="ml-1 rounded-full h-12 w-12 object-cover "
              />
            </a>
            <div className="d-flex flex-column">
              <strong className="mx-2 text-white">{story.storyOwnerName}</strong>
              <p style={{ fontSize: "0.8rem" }} className="mx-2 text-white">
                {getDays(story.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <Card.Img variant="top" src={story.storyURL} />
      </Modal>

      {/* <Modal show={(openSubscriptionModal && loggedInUserSubsctription) ? !openSubscriptionModal : openSubscriptionModal} onHide={handleClose} backdrop="static"
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
          <Button disabled={isloading ? true :false} variant="primary" onClick={handleSubscribe}>
            Subscribe
          </Button>
        </Modal.Footer>
      </Modal>  */}
    </>
  );
};

export default HomePage;
