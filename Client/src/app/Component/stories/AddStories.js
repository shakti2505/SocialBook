import React, { useContext, useState, useEffect } from "react";
import UserDataContext from "../../../Context/UserContext";
import { useAsyncError, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import BASE_URL_API from "../../../utilities/baseURL";
import { apiVariables } from "../../../utilities/apiVariables";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddStories = () => {
  const { loggedInUser } = useContext(UserDataContext);
  const [istextStory, setIstextStory] = useState(false);
  const [storytext, setstoryText] = useState("");
  const [storyBgColor, setStoryBgColor] = useState("#1D4ED8");
  const [storyFont, setStroyFont] = useState("");
  const [textStory, setTextStory] = useState([]);
  const [show, setShow] = useState(false);
  const [storyPhoto, setStoryPhoto] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [postImages, setpostImages] = useState([]);
  const [isloading, setisloading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleFontChange = (e) => {
    setStroyFont(e.target.value);
  };

  const create_text_stories = async () => {
    let apicall = await axios.post(
      BASE_URL_API + apiVariables.create_text_story.url,
      {
        storyContent: storytext,
        storybg: storyBgColor,
        storyFont: storyFont,
        storyOwnerName: loggedInUser.firstName + " " + loggedInUser.LastName,
        storyOwnerdp: loggedInUser.profilePic,
      },

      { withCredentials: "include" }
    );

    if (apicall.status !== 201) {
      alert("Unable to comment on post");
    } else {
      setTextStory(apicall.data);
      setStoryBgColor("");
      setstoryText("");
      setStroyFont("");
      navigate("/home");
    }
  };

  const handlePostImagesPreview = (e) => {
    const selectedImages = Array.from(e.target.files);
    setpostImages((prevFiles) => [...prevFiles, ...selectedImages]);
    // Map through selected images to create image previews
    const imagePreviewUrls = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    // Update state by concatenating new previews with existing ones
    setImagePreviews((prevPreviews) => [...prevPreviews, ...imagePreviewUrls]);
  };

  const submitPhotoStory = async (e) => {
    try {
      setisloading(true);
      let imageURL = [];
      let formData = new FormData();
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      formData.append("folder", process.env.REACT_APP_FOLDER);
      formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      const uploadPromises = postImages.map(async (item) => {
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
        imageURL.push(data.url);
      });

      // Wait for all upload promises to resolve
      await Promise.all(uploadPromises);
      const response2 = await axios.post(
        BASE_URL_API + apiVariables.createPost.url,
        {
          storyImageURLs: imageURL,
          storyOwner: loggedInUser.firstName + " " + loggedInUser.LastName,
          StoryOwnerDP: loggedInUser.profilePic,
        },
        { withCredentials: "include" }
      );
      if (response2.status != 201) {
        throw new Error("Failed to fetch result data");
      }
      const uploadedPost = await response2;
      setisloading(false);
      setImagePreviews([]);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleZoomIn = () => {
    let targetImage = document.getElementById("storyPhoto");
    let currentHeight = targetImage.clientHeight;
    let currentWidth = targetImage.clientWidth;
    targetImage.style.width = currentWidth + 20 + "px";
    targetImage.style.height = currentHeight + 20 + "px";
  };

  const handleZoomOut = () => {
    let targetImage = document.getElementById("storyPhoto");
    let currentHeight = targetImage.clientHeight;
    let currentWidth = targetImage.clientWidth;
    targetImage.style.height = currentHeight - 20 + "px";
    targetImage.style.width = currentWidth - 20 + "px";
  };

  let PrevValue; // Declare PrevValue outside the function

  const handleRange = () => {
    const rangeInput = document.getElementById("zoomRange");
    const currentValue = rangeInput.value;
    // const threshold = 50; // Adjust the threshold as needed

    if (currentValue > PrevValue) {
      // Range is increasing beyond the threshold
      handleZoomIn();
    } else if (currentValue < PrevValue) {
      // Range is decreasing below the threshold
      handleZoomOut();
    }
    // Update previous value
    PrevValue = currentValue;
  };
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-3 max-sm:hidden">
            <div className="flex justify-between items-center mt-2 ml-2 relative">
              <h5> Your story</h5>
              <button className="rounded-full  bg-gray-200 hover:bg-gray-300 items-center flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="25"
                  height="25"
                >
                  <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                </svg>
              </button>
            </div>
            <div className="flex justify-start items-center ml-2 mt-4">
              <img
                src={loggedInUser.profilePic}
                alt="images"
                className=" object-cover rounded-full h-12 w-12"
              />
              <p className="text-xl ml-2">
                {loggedInUser.firstName + " " + loggedInUser.LastName}{" "}
              </p>
            </div>
            {imagePreviews.length !== 0 && (
              <>
                <Form.Range id="zoomRange" onInput={handleRange} />
                <button className="btn btn-primary">Reset</button>
              </>
            )}
            <hr />
            <div className={istextStory ? "mt-4 ml-2" : "hidden"}>
              <Form.Control
                as="textarea"
                placeholder="Start typing here..."
                className={` ${storyFont} outline-none`}
                onChange={(e) => setstoryText(e.target.value)}
              />
              <Form.Select
                aria-label="Default select example"
                className="mt-3 outline-none"
                onChange={handleFontChange}
                value={storyFont}
              >
                <option disabled>Select font</option>
                <option value="">
                  <b>Aa</b> Simple
                </option>
                <option value="font-serif">
                  <b>Aa</b> Casual
                </option>
                <option value="font-mono">
                  <b>Aa</b> Fancy
                </option>
                <option value="font-bold">
                  <b>Aa</b> Headline
                </option>
              </Form.Select>
            </div>
            <div
              className={
                istextStory
                  ? "  border ml-2 mt-3 rounded-md flex flex-col justify-center"
                  : "hidden"
              }
            >
              <b className="ml-6 mt-2">Backgrounds</b>
              <div className="flex items-center justify-around p-2">
                <button
                  onClick={() => setStoryBgColor("#1D4ED8")}
                  className="rounded-full bg-blue-700 h-8 w-8 shadow-md  focus:ring"
                ></button>
                <button
                  onClick={() => setStoryBgColor("#C2410C")}
                  className="rounded-full bg-orange-700 h-8 w-8 shadow-md  focus:ring "
                ></button>
                <button
                  onClick={() => setStoryBgColor("#15803D")}
                  className="rounded-full bg-green-700 h-8 w-8 shadow-md  focus:ring"
                ></button>
                <button
                  onClick={() => setStoryBgColor("#0E7490")}
                  className="rounded-full bg-cyan-700 h-8 w-8 shadow-md  focus:ring"
                ></button>
                <button
                  onClick={() => setStoryBgColor("#BE185D")}
                  className="rounded-full bg-pink-700 h-8 w-8 shadow-md   focus:ring "
                ></button>
                <button
                  onClick={() => setStoryBgColor("#A16207")}
                  className="rounded-full bg-yellow-700 h-8 w-8 shadow-md  focus:ring"
                ></button>
              </div>
              <div className="flex items-center justify-around p-2">
                <button
                  onClick={() => setStoryBgColor("#F59E0B")}
                  className="rounded-full bg-amber-500 h-8 w-8 shadow-md  focus:ring"
                ></button>
                <button
                  onClick={() => setStoryBgColor("#F43F5E")}
                  className="rounded-full bg-rose-500	 h-8 w-8 shadow-md  focus:ring "
                ></button>
                <button
                  onClick={() => setStoryBgColor("#84CC16")}
                  className="rounded-full bg-lime-500	 h-8 w-8 shadow-md  focus:ring"
                ></button>
                <button
                  onClick={() => setStoryBgColor("#5B21B6")}
                  className="rounded-full bg-violet-800	 h-8 w-8 shadow-md  focus:ring"
                ></button>
                <button
                  onClick={() => setStoryBgColor("#0C4A6E")}
                  className="rounded-full bg-sky-900	 h-8 w-8 shadow-md   focus:ring "
                ></button>
                <button
                  onClick={() => setStoryBgColor("#2DD4BF")}
                  className="rounded-full bg-teal-400	 h-8 w-8 shadow-md  focus:ring"
                ></button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button className="btn btn-secondary" onClick={handleShow}>
                Discard
              </button>
              <button className="btn btn-primary" onClick={create_text_stories}>
                Share to story
              </button>
            </div>
          </div>
          <div className="col-9 flex justify-center items-center">
            <div
              className={
                istextStory || imagePreviews.length !== 0
                  ? "hidden"
                  : "flex flex-wrap w-full justify-evenly justify relative"
              }
            >
              <label
                htmlFor="file"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[45rem] w-[20rem] mt-4 rounded-xl flex flex-col justify-center items-center shadow-2xl active:ring-4 hover:ring-2"
              >
                <div className="rounded-full h-32 w-32 bg-white flex justify-center items-center ring-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width=""
                    height="50"
                    className="text-white"
                  >
                    <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                  </svg>
                </div>
                <h3 className="text-white mt-4 text-center">
                  Create a photo story
                </h3>
                <></>
              </label>
              <input
                type="file"
                multiple
                accept="image/png, image/jpg, image/jpeg , image/bmp"
                className="hidden"
                id="file"
                onChange={handlePostImagesPreview}
              />
              <button
                className="max-sm:hidden bg-gradient-to-r from-indigo-500 from-10% mt-4 via-sky-500 via-30% to-emerald-500 to-90% h-[45rem] w-[20rem] rounded-xl flex flex-col justify-center items-center shadow-2xl active:ring-4 hover:ring-2"
                onClick={() => setIstextStory(!istextStory)}
              >
                <div className="rounded-full h-32 w-32 bg-white flex justify-center items-center ring-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="80"
                    height="80"
                  >
                    <path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z" />
                  </svg>
                </div>

                <h3 className="text-white text-center">Create a text story</h3>
              </button>
            </div>
            <div
              className={
                istextStory
                  ? "shadow-xl rounded-md ring-slate-300 max-sm:hidden "
                  : "hidden"
              }
            >
              <h5 className="p-2">Preview</h5>
              <div
                className={`h-[44.3rem] w-96 bg-[${storyBgColor}]  m-2 rounded-md overflow-auto`}
              >
                <p
                  className={`text-gray-300 break-words whitespace-pre-wrap p-4 text-center ${storyFont}`}
                >
                  {storytext.length !== 0 ? storytext : "Start typing..."}
                </p>
              </div>
            </div>
            <div
              className={
                imagePreviews.length !== 0
                  ? "shadow-xl rounded-md ring-slate-300 flex justify-center items-center  bg-black"
                  : "hidden"
              }
            >
              <img
                src={imagePreviews[0]}
                alt="image"
                id="storyPhoto"
                height="50%"
                width="50%"
                className="py-5 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Discard story ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to discard this story? Your story won't be
          saved.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Continue editing
          </Button>
          <Button variant="primary" onClick={() => navigate("/home")}>
            Discard
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddStories;
