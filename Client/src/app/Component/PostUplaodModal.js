import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import UserDataContext from "../../Context/UserContext.js";
import LoadingSpinner from "../LoadingSpinner.js";
import axios from "axios";
import BASE_URL_API from "../../utilities/baseURL";
import { apiVariables } from "../../utilities/apiVariables.js";
import Dropdown from "react-bootstrap/Dropdown";

const PostUplaodModal = () => {
  // const [modalShow, setModalShow] = useState(false);
  const [PostAudienceModalShow, setPostAudienceModalShow] = useState(false);
  const [postCaption, setPostCaption] = useState("");
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [postImages, setpostImages] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [uploadedPost, setUploadedPost] = useState({});

  const { loggedInUser, OpenPostModal, ClosePostModal, modalShow } =
    useContext(UserDataContext);

  const OpenPostAudienceModal = () => {
    setPostAudienceModalShow(true);
    ClosePostModal();
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

  const BackToPostModal = () => {
    setPostAudienceModalShow(false);
    OpenPostModal();
  };

  const submitPostImages = async (e) => {
    try {
      document.getElementById("postbtn").setAttribute("disabled", "true");
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
          postimagesURLs: imageURL,
          postcaptions: postCaption,
          postOwner: loggedInUser.firstName + " " + loggedInUser.LastName,
          postOwnerDP: loggedInUser.profilePic,
        },
        { withCredentials: "include" }
      );
      if (response2.status != 201) {
        throw new Error("Failed to fetch result data");
      }
      const uploadedPost = await response2;
      setUploadedPost(uploadedPost.data.savedPost);
      document.getElementById("postbtn").setAttribute("disabled", "true");
      setisloading(false);
      ClosePostModal();
      setImagePreviews([]);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        style={{ opacity: "2" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mx-2 mt-2">Create Post</h5>
          <button
            className="btn btn-link mx-2 mt-2 rounded-sm  text-muted text-decoration-none"
            onClick={() => ClosePostModal()}
          >
            X
          </button>
        </div>
        <Modal.Body
          style={{
            maxHeight: "25rem",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <div className="d-flex">
            <img
              src={loggedInUser.profilePic}
              alt="img"
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="d-flex flex-column">
              <strong className="mx-2">
                {loggedInUser.firstName} {loggedInUser.LastName}
              </strong>
              <button
                onClick={OpenPostAudienceModal}
                className="btn btn-light btn-sm mx-2 d-flex align-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="15"
                  width="15"
                  viewBox="0 0 512 512"
                >
                  <path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l-5.9-3c-6.6-3.3-14.3-3.9-21.3-1.5l-23.2 7.7c-8.2 2.7-17.2-.4-21.9-7.5c-4.7-7-4.2-16.3 1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                </svg>
                <b className="mx-1">Public</b>
                <svg
                  className="mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="20"
                  viewBox="0 0 320 512"
                >
                  <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                </svg>
              </button>
            </div>
          </div>
          <textarea
            onChange={(e) => setPostCaption(e.target.value)}
            placeholder={`What's on your Mind, ${loggedInUser.firstName}?`}
            className="w-100 mt-3"
            style={{ border: "0", outline: "none", fontSize: "25px" }}
            value={postCaption && postCaption}
          ></textarea>
          {/* PhotoUPloadModal starts */}
          <div
            className={
              showAddPhotoModal && imagePreviews.length === 0
                ? "mt-1 position-relative rounded mb-2"
                : "d-none"
            }
            style={{ border: "2px solid lightgrey", background: "#F7F8FA" }}
          >
            {/* <button onClick={() => setShowAddPhotoModal(false)} type="button" className="btn-close mx-2 mt-2" aria-label="Close" style={{ float: "right" }}></button> */}
            <button
              className="btn btn-link mx-2 mt-2 rounded-sm  text-muted text-decoration-none"
              onClick={() => setShowAddPhotoModal(false)}
            >
              X
            </button>

            <div
              className="position-absolute d-flex justify-content-center align-items-center flex-column"
              style={{
                left: "50%",
                top: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-image-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
              </svg>
              <p
                style={{ fontSize: "1rem" }}
                className="flex justify-center  items-center"
              >
                <b>Add Photos Or drag and drop</b>
              </p>
            </div>
            <input
              id="FileUpload"
              style={{ zIndex: "100", opacity: "0", height: "10rem" }}
              className="position-relative w-100 mt-4"
              type="file"
              multiple
              accept="image/png, image/jpg, image/jpeg , image/bmp"
              onChange={handlePostImagesPreview}
            />
          </div>
          {/* PhotoUPloadModal ends */}
          {/* PhotoPreviewStarts */}
          {imagePreviews.length !== 0 && (
            <div
              className={
                imagePreviews.length > 1 ? "d-flex flex-row vh-50" : "w-100"
              }
              style={{
                borderRadius: "10px",
                border: "1px solid lightgrey",
                position: "relative",
              }}
            >
              {imagePreviews.length !== 0 &&
                imagePreviews.slice(0, 3).map((previewUrl, index) => (
                  <>
                    <div style={{ position: "relative", width: "100%" }}>
                      {index === 0 && (
                        <button
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            display: "flex",
                            zIndex: "1",
                          }}
                          className="position-absolute btn btn-light"
                        >
                          <input
                            id="FileUpload"
                            style={{
                              zIndex: "1",
                              opacity: "0",
                              border: "1px solid",
                              top: "0.5px",
                              left: "0.5px",
                            }}
                            className="position-absolute w-100"
                            type="file"
                            multiple
                            accept="image/png, image/jpg, image/jpeg , image/bmp"
                            onChange={handlePostImagesPreview}
                          />
                          Add photo
                        </button>
                      )}
                      <img
                        key={index + Math.random}
                        className="p-1"
                        src={
                          imagePreviews.length === 1
                            ? imagePreviews[0]
                            : previewUrl
                        }
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                      {imagePreviews.length > 3 && index === 2 && (
                        <h1
                          style={{
                            position: "absolute",
                            bottom: "25%",
                            left: "25%",
                            color: "white",
                          }}
                        >
                          +{imagePreviews.length - 3}
                        </h1>
                      )}
                    </div>
                  </>
                ))}
            </div>
          )}
          {/* PhotoPreview Ends */}
          <div
            id="addToYourPost"
            className="d-flex justify-content-around mt-1"
          >
            <button className="btn btn-link addPost m-1">
              Add To Your Post
            </button>
            <div className="PostBtns m-1">
              <button
                onClick={() => setShowAddPhotoModal(true)}
                className="btn btn-link"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  width="25"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="#46BD63"
                    d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z"
                  />
                </svg>
              </button>
            </div>
            <div className="PostBtns m-1">
              <button className="btn btn-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  width="25"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="#0D6EFD"
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c10 0 18.8-4.9 24.2-12.5l-99.2-99.2c-14.9-14.9-23.3-35.1-23.3-56.1v-33c-15.9-4.7-32.8-7.2-50.3-7.2H178.3zM384 224c-17.7 0-32 14.3-32 32v82.7c0 17 6.7 33.3 18.7 45.3L478.1 491.3c18.7 18.7 49.1 18.7 67.9 0l73.4-73.4c18.7-18.7 18.7-49.1 0-67.9L512 242.7c-12-12-28.3-18.7-45.3-18.7H384zm24 80a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="PostBtns m-1">
              <button className="btn btn-link">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  width="25"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#FFD43B"
                    d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                  />
                </svg>
              </button>
            </div>
            <div className="PostBtns m-1">
              <button className="btn btn-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  width="25"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#f80d24"
                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                  />
                </svg>
              </button>
            </div>
            <div className="PostBtns m-1">
              <button className="btn btn-link">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  width="25"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="#46BD63"
                    d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <LoadingSpinner disable={isloading} />
        </Modal.Body>
        <Modal.Footer>
          <button
            id="postbtn"
            className="btn btn-primary w-100 fw-bold"
            onClick={submitPostImages}
          >
            Post
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Post Audience starts */}
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={PostAudienceModalShow}
        onHide={() => setPostAudienceModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="d-flex ">
            <div className="PostBtns m-1">
              <button onClick={BackToPostModal} className="btn btn-link mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  viewBox="0 0 448 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
            </div>
            <p className="mt-2 mx-2">Post Audience</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Who Can see your post?</h5>
          <p>
            Your post will appear in Feed, on your profile and in search
            results.
          </p>
          <p>
            Your default audience is set to Public, but you can change the
            audience of this specific post.
          </p>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
      {/* Modal for Post Audience ends*/}
    </>
  );
};

export default PostUplaodModal;
