import "./Profile.css";
import React, { useContext } from "react";
import Navbars from "../../../Navbar.js";
import UserDataContext from "../../../Context/UserContext.js";

const ProfilePage = () => {
  const loggedInUser = useContext(UserDataContext);

  const url =
    "https://res.cloudinary.com/dtbz1n84e/image/upload/v1705424794/cld-sample.jpg";
  const url2 =
    "https://res.cloudinary.com/dtbz1n84e/image/upload/v1705424771/samples/imagecon-group.jpg";
  return (
    <>
      <Navbars />
      <section className="bg-white">
        <div className="container">
          {/* cover Image */}
          <div
            className=" p-5 text-center bg-image shadow-1-strong rounded-bottom"
            style={{ backgroundImage: `url(${url2})`, height: '400px', backgroundSize:'cover', backgroundPosition:'center' }}
          >
          </div>
          {/* cover Image */}
          <div className="d-flex justify-content-center">
            <img src={url} style={{ width: "10rem", height:"10rem", borderRadius:"50%" , objectFit:"cover", marginTop:'-40px'}} className=" shadow-3-strong align-items-center position-relative" />
          </div>
        </div>
      </section>
      {/* <div id="cover">
        <img src={url2} alt="image" id="coverImage" />
        <img src={url} width="50" height="50" id="profilePicOnCover" />
    
        <div className="other w-50">
          <div className="d-flex flex-column">
            <h4 className="text-center">
              {loggedInUser.firstName} {loggedInUser.LastName}
              <p> 561 Followers</p>
            </h4>
          </div>
          <button className="btn btn-info">add Story</button>

        </div>
      </div> */}
    </>
  );
};

export default ProfilePage;
