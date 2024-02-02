import './App.css';
import UserState from './Context/UserState';
import Sidebar from './Sidebar';
import SidebarV2 from './SidebarV2';
import HomePage from './app/HomePage.js'
import UploadDP from './UploadDP';
import LandingPage from './landingPage';
import Login from './login';
import { Routes, Route } from "react-router-dom";
import FriendsListpage from './app/FriendsListpage.js';
import Profilepage from './app/Component/profilePage/ProfilePage.js'

function App() {
  return (
    <>
    <UserState>
      <Routes>
        <Route path='/' element={<LandingPage />}  />
        {/* <Route path='/home' element={<Sidebar />} /> */}
        <Route path='/home' element={<HomePage />} />
        <Route path='/upload-DP' element={<UploadDP/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home2' element={<SidebarV2/>}/>
        <Route path='/friends' element={<FriendsListpage/>}/>
        <Route path='/profile' element={<Profilepage/>}/>
      </Routes>
      </UserState>
    </>

  );
}

export default App;
