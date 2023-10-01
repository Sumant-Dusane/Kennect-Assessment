import React, { useEffect, useState } from 'react';
import "./mainactivity.scss";
import Post from '../Post/Post';
import NewPost from '../NewPost/NewPost';
import { endpoint } from '../../constants/constants';

export default function MainActivity() {
  //TODO: check cookie currUser
  const [allActivities, setActivities] = useState([]);
  const [isLoading, setLoader] = useState(true);
  useEffect(() => {
    async function getAllActivities() {
      const response = await fetch(endpoint + 'getAllActivities');
      if(!response.ok) {
        return
      }
      const data = await response.json();
      setActivities(data);
    }
    getAllActivities();
    if(allActivities) {
      setLoader(false);
    }
  }, [allActivities.length]);

  function MapAllPosts(activities) {
    return activities.map((activity, index) => {
      return <Post key={index} data={activity} />
    })
  }
  return (
    <>  
    <div className="title"><b>Welcome 👋,</b> <br /> Checkout latest posts</div>
    <NewPost />
    { isLoading ? 
      <></> :
      MapAllPosts(allActivities)
    }
    </>
  )
}
