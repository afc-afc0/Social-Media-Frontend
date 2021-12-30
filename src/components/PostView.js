import React from 'react'
import ProfileImageWithDefault from "./ProfileImageWithDefault"
import { Link } from "react-router-dom"
import { format } from "timeago.js"

const PostView = (props) => {
    const { post } = props;
    const { user, content, timestamp } = post;
    const { username, displayName, image} = user;

    const formattedTimestamp = format(timestamp);
    return (
        <div className="card p-1">
            <div className="d-flex">
                <ProfileImageWithDefault className="rounded-circle" image={image} width="32" height="32"/>
                <div className="flex-fill m-auto pe-2">
                    <Link to={`/user/${username}`} className="text-dark">
                        <h6 className="d-inline">
                            {displayName}@{username}
                        </h6>
                        <span> - </span>
                        <span>{formattedTimestamp}</span>
                    </Link>
                </div>
            </div>
            <div className="pe-3">
                {content}
            </div>
        </div>

    )
}

export default PostView;