import React from 'react';
import "./navbar.scss";
import {removeCurrentUser} from "../../constants/constants";

export default function Navbar() {
  function search(event){
    if(event.keyCode === 13) {
      // search here
    }
  }
  function logoutUser() {
    removeCurrentUser();
    window.location.href = '/auth';
  }
  return (
    <nav className='navbar'>
      <a href="/"><h1>Kennect</h1></a>
      <div className="search">
        <button className='btn btn-danger' onClick={logoutUser}>Logout</button> 
        <input className='search' type="text" placeholder='Search Posts/Comments' onKeyDown={search} />
      </div>
    </nav>
  )
}
