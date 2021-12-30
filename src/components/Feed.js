import React from 'react'
import { useState, useEffect } from "react";
import { getFeed } from '../api/apiCalls';
import { useApiProgress } from '../shared/useApiProgress';
import PostView from './PostView';
import Spinner from "./Spinner";

const Feed = () => {
    const [page, setPage] = useState({content: [], last: true, number: 0});
    const pendingApiCall = useApiProgress("get", "/api/1.0/posts");

    useEffect(() => {
        loadFeed();
    }, [])

    const loadFeed = async (page) => {
        try {
            const response = await getFeed(page);
            setPage(previousPage => ({
                ...response.data,
                content: [...previousPage.content, ...response.data.content]
            }) );
        } catch (error) {

        }
    }

    const { content, last, number } = page;

    if (content.length === 0) {
        return <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner/> : "There are no posts"}</div>
    }

    return (
        <div>
            {content.map(post => {
                return <PostView key={post.id} post={post} />
            })}
            {!last && (
                <div className="alert alert-secondary text-center" 
                    style={{ cursor: pendingApiCall ? "not-allowed" : "pointer"}} 
                    onClick={pendingApiCall ? () => {} : () => loadFeed(number + 1)}
                >
                    {pendingApiCall ? <Spinner/> : "Load older posts"}
                </div>
            )}
        </div>
    )
}

export default Feed;