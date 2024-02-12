import './App.css';
import UserState from './Context/UserState';
import Sidebar from './Sidebar';
import SidebarV2 from './SidebarV2';
import HomePage from './app/HomePage.js'
import UploadDP from './UploadDP';
import LandingPage from './landingPage';
import Login from './login';
import { Routes, Route, useLocation } from "react-router-dom";
import FriendsListpage from './app/FriendsListpage.js';
import Navbars from './Navbar.js';
import Protected from './app/Utils/Protected.js';
import ProfilePage from './app/Component/profilePage/ProfilePage.js';

function App() {
  const location = useLocation();
  const showNavbars = !(location.pathname === '/login' || location.pathname === '/');

  return (
    <>
      <UserState>
      {showNavbars && <Navbars />}
        <Routes>
          <Route path='/' element={<LandingPage />} />
          {/* <Route path='/home' element={<Sidebar />} /> */}
          <Route path='/home' element={<Protected Component={HomePage} />} />
          <Route path='/upload-DP' element={<UploadDP />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home2' element={<SidebarV2 />} />
          <Route path='/friends' element={<Protected Component={FriendsListpage} />} />
          <Route path='/profile' element={<Protected Component={ProfilePage} />} />
        </Routes>
      </UserState>
    </>

  );
}

export default App;
