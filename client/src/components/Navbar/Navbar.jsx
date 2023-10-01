import React from 'react';
import "./navbar.scss";

export default function Navbar() {
  function search(event){
    if(event.keyCode === 13) {
      window.location.href = '/search/' + event.target.value;
    }
  }
  return (
    <nav className='navbar'>
      <a href="/"><h1>Kennect</h1></a>
      <div className="search">
        <input className='search' type="text" placeholder='Press Enter to Search Posts, Comments' onKeyDown={search} />
      </div>
    </nav>
  )
}
