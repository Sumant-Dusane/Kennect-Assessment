import React, { useEffect, useState } from 'react';
import "./mainactivity.scss";
import Post from '../Post/Post';
import NewPost from '../NewPost/NewPost';
import { endpoint } from '../../constants/constants';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons';
import {removeCurrentUser} from "../../constants/constants";
import LoadingState from '../LoadingState/LoadingState';

export default function MainActivity() {
  const [allActivities, setActivities] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const {searchTerm} = useParams();
  useEffect(() => {
    if(searchTerm) {
      async function getSearchedActivites() {
        const response = await fetch(endpoint + 'getSearchPostComments/' + searchTerm);
        if(!response.ok) {
          return
        }
        const data = await response.json();
        setActivities(data);
      }
      getSearchedActivites();
    } else {
      async function getAllActivities() {
        const response = await fetch(endpoint + 'getAllActivities');
        if(!response.ok) {
          return
        }
        const data = await response.json();
        setActivities(data);
      }
      getAllActivities();
    }
    if(allActivities) {
      setLoader(false);
    }
  }, [allActivities.length]);

  function MapAllPosts(activities) {
    return activities.map((activity, index) => {
      return <Post key={index} data={activity} />
    })
  }
  function logoutUser() {
    removeCurrentUser();
    window.location.href = '/auth';
  }
  return (
    <> 
    <button className='btn btn-logout' onClick={logoutUser}>Logout</button> 
    {searchTerm ? 
      <div className="title">You Searched For 👀: <b>{searchTerm}</b>, <br /> Here are the Results </div> : 
      <div className="title"><b>Welcome 👋,</b> <br /> Checkout latest posts</div>} 
    <NewPost />
    { isLoading ? 
      <LoadingState /> :
      allActivities.length ?
      MapAllPosts(allActivities) :
      <div className='empty-state'>
        <div className="icon">
          <FontAwesomeIcon icon={faHourglassEmpty} />
        </div>
        <h4>No Activity Found🧐 </h4>
        <p>Post new Activity and Be the First Author here 😄</p>
      </div>
    }
    </>
  )
}
