import React, { useEffect, useState } from "react";
import UserContext from './UserContext.js';
import axios from "axios";
import { apiVariables } from "../utilities/apiVariables.js";
import BASE_URL_API from "../utilities/baseURL.js";
import { useNavigate } from "react-router-dom"

const UserState = (props) => {
    const limit = 5;
    const [loggedInUser, setLoggedInUser] = useState({});
    const [posts, setposts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [activePage, setActivePage] = useState(1);


    const OpenPostModal = () => {
      setModalShow(true)
    }
  
    const ClosePostModal = ()=>{
      setModalShow(false)
    }

    const navigate = useNavigate()

    const getLoggedInUserData =  () => {
        axios.get(BASE_URL_API + apiVariables.getLoggedInUserData.url,   {
            withCredentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
        .then((response)=>{
            if(response.data.message=='unauthorized access'){
                navigate('/login')
            }else{
                console.log('response',response);
                setLoggedInUser(response.data.loggedInUser);
            }
        }).catch((err)=>{
            console.log(err)
        })
       
    }

    const getPosts = () => {
        axios.get(BASE_URL_API + apiVariables.getPosts.url,
          
          {
          withCredentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
          },  
        })
          .then((response) => {
            if (response.status!==200) {
            } else {
              setposts(response.data)
            }
          }).catch((err) => {
            console.log(err)
          })
      }
    

    useEffect(() => {
        getLoggedInUserData();
        getPosts();
    }, []);

    return (
        <UserContext.Provider value={{loggedInUser, posts, OpenPostModal, ClosePostModal, modalShow}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;