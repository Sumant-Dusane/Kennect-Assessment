import React from 'react';
import "./loadingstate.scss";
import spinner from "../../assets/images/spinner.gif"

export default function LoadingState() {
  return (
    <div className='loading-state'>
        <div className="spinner">
            <img src={spinner} alt="" />
        </div>
      <div className="loading-state__text">Please Wait 😴, <br /> Loading Data...</div>
    </div>
  )
}
