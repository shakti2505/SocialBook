import React, { useEffect, useState } from "react";
import UserContext from "./UserContext.js";
import axios from "axios";
import { apiVariables } from "../utilities/apiVariables.js";
import BASE_URL_API from "../utilities/baseURL.js";
import { useNavigate } from "react-router-dom";

const UserState = (props) => {
  const limit = 2;
  const [loggedInUser, setLoggedInUser] = useState({});
  const [posts, setposts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [loggedInUserfriend, setLoggedInUserfriends] = useState([]);

  const OpenPostModal = () => {
    setModalShow(true);
  };

  const ClosePostModal = () => {
    setModalShow(false);
  };

  const navigate = useNavigate();

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        posts,
        OpenPostModal,
        ClosePostModal,
        modalShow,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
