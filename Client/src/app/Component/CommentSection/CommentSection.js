import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiVariables } from "../../../utilities/apiVariables.js";
import BASE_URL_API from "../../../utilities/baseURL";
const CommentSection = ({ postId }) => {
  const [postComments, setPostCommnets] = useState([]);

  const getDays = (dateTime) => {
    const currentDate = Date.now();
    const dt = new Date(dateTime).getTime();
    const millisec = dt - currentDate;

    const hours = Math.abs(millisec) / (1000 * 60 * 60);
    const minutes = Math.abs(millisec) / (1000 * 60);
    if (hours >= 24) {
      return `${Math.floor(hours / 24)} Days ago`; // return days
    } else if (hours >= 1) {
      return `${Math.floor(hours)} hours ago`; // return hours
    } else {
      return `${Math.floor(minutes)} minutes ago`; // return minutes
    }
  };

  const getPostComments = () => {
    axios
      .get(BASE_URL_API + apiVariables.getPostComments.url, {
        params: {
            postID:postId
        },
        withCredentials: true
      })
      .then((response) => {
        if (response.status !== 200) {
          // Handle non-200 status codes if needed
        } else {
          setPostCommnets(response.data.allComments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostComments();
  }, []);


  return (
    <>
      {postComments.length !== 0 &&
        postComments.map((item) => {
          return (
            <>
              {item.postID === postId && (
                <div className="d-flex align-items-center m-2">
                  <img
                    src={item.userDP}
                    width="25"
                    height="25"
                    style={{ borderRadius: "50%" }}
                    className="mx-2"
                  />
                  <div
                    className="shadow-md"
                    style={{ backgroundColor: "#F0F2F5", borderRadius: "10px" }}
                  >
                    <small className="mx-2">{item.userName}</small>
                    <p className="mx-2">{item.comment}</p>
                    <small className="mx-2" style={{ color: "#0866FF" }}>
                      {getDays(item.createdAt)}
                    </small>
                  </div>
                </div>
              )}
            </>
          );
        })}
    </>
  );
};

export default CommentSection;
