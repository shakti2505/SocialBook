import React, { useContext, useState, useEffect } from 'react'
import './App.css'
import logo from './images/logo/logo.png';
import { Link } from "react-router-dom";
import NavbarDropdown from './NavbarComponent/NavbarDropdown.js';
import axios from 'axios';
import BASE_URL_API from './utilities/baseURL.js';
import { apiVariables } from './utilities/apiVariables.js';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import UserDataContext from './Context/UserContext.js';
import { useNavigate } from "react-router-dom"
const Navbars = () => {
  const navigate = useNavigate()

  const { loggedInUser } = useContext(UserDataContext)
  const [show, setShow] = useState(false);
  const [SerchedUsers, setSerchedUsers] = useState([])
  const [openSearchModal, setOpenSearchModal] = useState(false)
  const [searchUser, setSearchUser] = useState('');
  
  const searchPotentialConnetion = async (apivar) => {
    if (searchUser.length !== 0) {
      const apicall = await axios.get(`${BASE_URL_API}${apivar.url}`, {
        withCredentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true
        },

      })
      if (apicall.status !== 200) {
        console.log('Internal Error')
      } else {
        setSerchedUsers(apicall.data)
      }
    }
  }

 

  useEffect(() => {
    searchPotentialConnetion(apiVariables.searchPotentialConnetion(searchUser));
  }, [searchUser]);

 

  return (
    <>
      {/* <nav className='navbar navbar-expand-lg bg-body-tertiary sticky-top' >
        <div className='d-flex'>
          <img id='logoNew' src={logo} height="3%" width="3%" alt='Social Book' />
          <div className='d-flex mt-1 mx-1 w-25' >
            <Dropdown role='search' className='w-100' id='#UserSearch'>
              <Dropdown.Toggle className='btn btn-light mx-2' size='md' id="dropdown-basic">
                <input onChange={(e) => setSearchUser(e.target.value)} type='text' id='searchInput' placeholder='Search Socialbook' className='w-100' />
              </Dropdown.Toggle>
              {
                SerchedUsers.length !== 0 &&
                <Dropdown.Menu className=''>
                  {
                    SerchedUsers.map((item, index) => {
                      return (
                        <>
                          <Dropdown.Item href="#/action-1">{item.firstName}</Dropdown.Item>
                        </>
                      )
                    })

                  }
                </Dropdown.Menu>
              }
            </Dropdown>
          </div>
      
          <ul className="tabs nav w-100 justify-content-center">
            <li className="nav-item">
              <Link to="/home" className="nav-link active" >
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512"><path fill="#0866FF" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>            
                </Link>
            </li>
            <li className="nav-item">
              <Link to="/market" className="nav-link active">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512"><path fill="#0866FF" d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z" /></svg>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/groups" className="nav-link active">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512"><path fill="#0866FF" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/groups" className="nav-link active">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512"><path fill="#0866FF" d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" /></svg>
              </Link>
            </li>
          </ul>
        </div>
        <NavbarDropdown />
      </nav>  */}
      {/* <div className='container w-100'> */}
      <nav className='navbar navbar-expand-lg bg-body-tertiary sticky-top d-flex justify-content-between align-items-center' >
        <div className='searchLarge' id=''>
          <img id='logoNew' src={logo} height="32px" width="32px" alt='Social Book' onClick={()=>navigate('/profile')}/>
          <div className='d-flex mt-1 mx-1'>
            <Dropdown role='search' id='#UserSearch'>
              <Dropdown.Toggle className='btn btn-light mx-2' size='md' id="dropdown-basic" >
                <input onChange={(e) => setSearchUser(e.target.value)} type='text' id='searchInput' placeholder='Search Socialbook' className='w-100' />
              </Dropdown.Toggle>
              {
                SerchedUsers.length !== 0 &&
                <Dropdown.Menu className=''>
                  {
                    SerchedUsers.map((item, index) => {
                      return (
                        <>
                          <Dropdown.Item href="#/action-1">{item.firstName}</Dropdown.Item>
                        </>
                      )
                    })

                  }
                </Dropdown.Menu>
              }
            </Dropdown>
          </div>
        </div>
        <div className='d-flex'>
          <ul className="tabs nav w-100 justify-content-center">
            <li className="nav-item">
              <Link to="/home" className="nav-link active" >
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512"><path fill="#0866FF" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/market" className="nav-link active">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512"><path fill="#0866FF" d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z" /></svg>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/groups" className="nav-link active">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512"><path fill="#0866FF" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/groups" className="nav-link active">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 640 512"><path fill="#0866FF" d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" /></svg>
              </Link>
            </li>
          </ul>
        </div>
        <NavbarDropdown />
      </nav>
      {/* </div> */}




    </>


  )
}

export default Navbars;

