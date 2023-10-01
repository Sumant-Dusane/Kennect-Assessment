import React, { useEffect, useState } from 'react';
import "./post.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { endpoint, getCurrentUser } from '../../constants/constants';


export default function Post({data}) {
    const [userName, setUserName] = useState('');
    const [liked, setLike] = useState(false);
    useEffect(() => {
        async function getUserName() {
            const respone = await fetch(endpoint + 'getUserNameFromId/' + data?.author);
            if(!respone.ok) {
                return
            }
            const username = await respone.json();
            setUserName(username?.name);
            const activityLikes = await data?.likes;
            activityLikes.includes(getCurrentUser()) ? setLike(true) : setLike(false);
        }
        getUserName();
    }, [])
    function navigateToPost(id) {
        window.location.href = '/post/' + id;
    }
    async function addLike(e) {
        e.stopPropagation();
        const response = await fetch(endpoint + 'addLike/' + data?._id + '/' + data?.author);
        if(!response.ok) {
            return
        }
    }
    function addComment(e) {
        e.stopPropagation();
        let body = {
            timestamp: Date.now(),
            comment: ""
        }
    }
    return (
        <div className="card post" onClick={() => navigateToPost(data?._id)}>
            <h3 className='post__author'>{userName}</h3>
            <p className='post__content'>{data?.post}</p>
            <span className='post__timeline'>{new Date(data?.timestamp).toLocaleString()}</span>
            <div className="post__controls">
                <button className={liked ? 'btn btn-like liked': 'btn btn-like'} onClick={addLike}><FontAwesomeIcon icon={faHeart} /> {data?.likes?.length}</button>
                <button className="btn btn-comment" onClick={addComment}><FontAwesomeIcon icon={faComment} /> {data?.comments?.length}</button>
            </div>
        </div>
    )
}
