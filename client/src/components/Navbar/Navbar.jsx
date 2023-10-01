import React, { useState } from 'react';
import "./navbar.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  function search(event) {
    if (event.keyCode === 13) {
      window.location.href = '/search/' + event.target.value;
    }
  }
  function openNav() {
    setNavbarOpen(true);
  }
  function closeNav() {
    setNavbarOpen(false);
  }
  return (
    <div className="nav">
      <button className="btn btn-open" onClick={openNav}><FontAwesomeIcon icon={faBars} /></button>
      <nav className={navbarOpen ? 'navbar show' : 'navbar'}>
        <button className='btn btn-close' onClick={closeNav}><FontAwesomeIcon icon={faClose} /></button>
        <a href="/"><h1>Kennect</h1></a>
        <input className='search' type="text" placeholder='Press Enter to Search Posts, Comments' onKeyDown={search} />
      </nav>
    </div>
  )
}
