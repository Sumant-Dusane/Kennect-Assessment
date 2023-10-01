import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import "./postdetail.scss";
import { useLocation, useParams } from 'react-router-dom';
import { endpoint, getCurrentUser } from '../../constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function PostDetail() {
  const { postId } = useParams();
  const [activityFeed, setActivityFeed] = useState({});
  const [isLoading, setLoader] = useState(true);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    async function getPost() {
      const response = await fetch(endpoint + 'getSingleActivity/' + postId);
      if (!response.ok) {
        return
      }
      const data = await response.json();
      if (data) {
        setActivityFeed(data);
      }
      if (data) {
        setLoader(false);
      }
    }
    getPost();
  }, [activityFeed?._id, activityFeed?.comments?.length]);
  function MapComments(comments) {
    if (!comments?.length) {
      return <>NO COMMENTS FOUND</>
    }
    return comments.map((comment, index) => {
      return <div key={index} className="activity__comments__comment">
        <p>{comment?.comment}</p>
        <div>
          <small>{comment?.author}</small>
          <span>{new Date(comment?.timestamp).toLocaleString()}</span>
        </div>
      </div>
    })
  }
  async function addNewComment() {
    let body = {
      id: activityFeed._id,
      timestamp: Date.now(),
      comment: newComment,
      author: getCurrentUser()
    };

    const response = await fetch(endpoint + 'addComment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if(!response.ok) {
      return
    }
  }
  return (
    <> 
      {
        isLoading ? <>Please Wait...</> :
          <>
            <a className='btn btn-back' href="/"><FontAwesomeIcon icon={faArrowLeft} />  Back to Activity</a>
            <Post data={activityFeed} />
            <div className="activity__add-comment">
              <textarea placeholder='Post Your Reply' onChange={e => setNewComment(e.target.value)} />
              <button onClick={addNewComment} disabled={newComment ? false : true} className='btn btn-reply'>Reply</button>
            </div>
            <div className="activity__comments">
              <h2>Comments 💬</h2>
              {MapComments(activityFeed?.comments)}
            </div>
          </>
      }
    </>
  )
}
