import React from 'react'
import { useState, useEffect } from "react";
import { getFeed, getOldPosts, getNewPostCount, getNewPosts } from '../api/apiCalls';
import { useApiProgress } from '../shared/useApiProgress';
import { useParams } from 'react-router';
import PostView from './PostView';
import Spinner from "./Spinner";

const Feed = () => {
    const [page, setPage] = useState({content: [], last: true, number: 0});
    const [newPostCount, setNewPostCount] = useState(0); 
    const { username } = useParams();
    
    const path = username ? `/api/1.0/users/${username}/posts?page=` : "/api/1.0/posts?page=";
    const initialFeedLoadProcess = useApiProgress("get", path);

    let firstPostId = 0;
    let lastPostId = 0;
    if (page.content.length > 0){
        firstPostId = page.content[0].id;

        const lastPostIndex = page.content.length - 1;
        lastPostId = page.content[lastPostIndex].id;
    }

    const oldPostPath = username ? `/api/1.0/users/${username}/posts/${lastPostId}` : `/api/1.0/posts/${lastPostId}`;
    const loadOldPostsProgress = useApiProgress("get", oldPostPath, true);
    
    const newPostPath = username ? `/api/1.0/users/${username}/posts/${firstPostId}?direction=after` : `/api/1.0/posts/${firstPostId}?direction=after`;
    const loadNewPostsProgress = useApiProgress("get", newPostPath, true);


    useEffect(() => {
        const getCount = async () => {
            const response = await getNewPostCount(firstPostId, username);
            setNewPostCount(response.data.count);
        } 
        let looper = setInterval(getCount, 3000);

        return function cleanup() {
            clearInterval(looper);
        }
    },[firstPostId, username])

    useEffect(() => {
        const loadFeed = async (page) => {
            try {
                const response = await getFeed(username, page);
                setPage(previousPage => ({
                    ...response.data,
                    content: [...previousPage.content, ...response.data.content]
                }));
            } catch (error) { 
                console.log(error);
            }
        }
        loadFeed();
    }, [username])

    const loadOldPosts = async () => {
        try {
            const response = await getOldPosts(lastPostId, username);
            setPage(previousPage => ({
                ...response.data,
                content: [...previousPage.content, ...response.data.content]
            }));
        } catch (error) {
            console.log(error)
        }
    }

    const loadNewPosts = async () => {
        try {
            const response = await getNewPosts(firstPostId, username);
            console.log(response);
            setPage(previousPage => ({
                ...previousPage.content,
                content: [...response.data, ...previousPage.content]
            }));
            setNewPostCount(0);
        } catch (error) {
            console.log(error)
        }
    }

    const { content, last } = page;

    if (content.length === 0) {
        return <div className="alert alert-secondary text-center">{initialFeedLoadProcess ? <Spinner/> : "There are no posts"}</div>
    }

    return (
        <div>
            {newPostCount > 0 &&
                <div className="alert alert-secondary text-center mb-1"
                    style={{ cursor: loadNewPostsProgress ? "not-allowed" : "pointer"}} 
                    onClick={loadNewPostsProgress ? () => {} : loadNewPosts}
                >
                    {loadNewPostsProgress ? <Spinner /> : "There are new posts"}
                </div>
            }
            {content.map(post => {
                return <PostView key={post.id} post={post} />
            })}
            {!last && (
                <div className="alert alert-secondary text-center" 
                    style={{ cursor: loadOldPostsProgress ? "not-allowed" : "pointer"}} 
                    onClick={loadOldPostsProgress ? () => {} : loadOldPosts}
                >
                    {loadOldPostsProgress ? <Spinner/> : "Load older posts"}
                </div>
            )}
        </div>
    )
}

export default Feed;