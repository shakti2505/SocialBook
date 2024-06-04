import React, { useContext } from "react";
import "./App.css";
import UserState from "./Context/UserState";
import { Routes, Route, useLocation, json } from "react-router-dom";
import FriendsListpage from "./app/FriendsListpage.js";
import Navbars from "./Navbar.js";
import Protected from "./app/Utils/Protected.js";
import ProfilePage from "./app/Component/profilePage/ProfilePage.js";
import FriendProfilepage from "./app/Component/profilePage/FriendProfilePage.js";
import PostModalSekeloton from "./app/Component/SkeletonLoaders/PostModalSekeloton.js";
import Login from "./app/Component/Authentication/login.js";
import LandingPage from "./app/Component/Authentication/landingPage.js";
import Forgotpassword from "./app/Component/Authentication/ForgotPassword.js";
import ResetPassword from "./app/Component/Authentication/ResetPassword.js";
import AddStories from "./app/Component/stories/AddStories.js";
import { ChatContextProvider } from "./Context/ChatContext.js";
import { AuthContext } from "./Context/AuthContext.js";
import ChatPage from "./app/Component/chats/ChatPage.js";

const Home = React.lazy(() => import("./app/HomePage.js"));
// const Forgotpassword = React.lazy(()=>import("./app/Component/Authentication/ForgotPassword.js"))
function App() {

// const {user} =  useContext(AuthContext);
const user = JSON.parse(localStorage.getItem('User'));
  const location = useLocation();
  const showNavbars = !(
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/forgotpassword" ||
    location.pathname === "/resetpassword"
  );

  return (
    <>
        <UserState>
        <ChatContextProvider user = {user}>
          {showNavbars && <Navbars />}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/home"
              element={
                <React.Suspense fallback={<PostModalSekeloton />}>
                  <Protected Component={Home} />
                </React.Suspense>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route
              path="/friends"
              element={<Protected Component={FriendsListpage} />}
            />
            <Route
              path="/profile"
              element={<Protected Component={ProfilePage} />}
            />
            <Route
              path="/profile/:id"
              element={<Protected Component={FriendProfilepage} />}
            />
            <Route
              path="/stories/create"
              element={<Protected Component={AddStories} />}
            />
            <Route
              path="/chats"
              element={<Protected Component={ChatPage} />}
            />
          </Routes>
          </ChatContextProvider>
        </UserState>
    </>
  );
}

export default App;
