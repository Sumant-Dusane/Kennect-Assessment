import React, { useState } from 'react';
import { endpoint, getCurrentUser, setCurrentUser } from '../../constants/constants';
import "./newpost.scss";

export default function NewPost() {
  const [text, setText] = useState('');
  async function addPost() {
    const postData = text;
    setText('');
    const body = {
      post: text,
      author: getCurrentUser(),
      timestamp: Date.now(),
      likes: [],
      comments: []
    };
    const response = await fetch(endpoint + 'addPost', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if(!response.ok) {
      alert("failed");
      return
    }

    const data = await response.json();
    if(data) {
      alert("Post Uploaded")
    }
  }
  return (
    <div className='new-post'>
        <h4>Add a New Post</h4>
        <textarea placeholder='Add A Post, What is happening ?' value={text} onChange={e => setText(e.target.value)}/>
        <button disabled={!text ? true : false} className='btn btn-post' onClick={addPost}>Post</button>
    </div>
  )
}
