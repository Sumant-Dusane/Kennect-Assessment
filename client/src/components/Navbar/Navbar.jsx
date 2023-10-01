import React from 'react';
import "./navbar.scss";

export default function Navbar() {
  function search(event){
    if(event.keyCode === 13) {
      // search here
    }
  }
  return (
    <nav className='navbar'>
      <a href="/"><h1>Kennect</h1></a>
      <div className="search">
        <input className='search' type="text" placeholder='Search Posts/Comments' onKeyDown={search} />
      </div>
    </nav>
  )
}
