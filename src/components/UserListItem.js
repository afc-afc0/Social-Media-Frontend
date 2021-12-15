import React from 'react'
import defaultUserPicture from "../assets/defaultUserPicture.png";
import { Link } from "react-router-dom"

const UserListItem = (props) => {
    const { user } = props;
    const { username, displayName, image} = user;
    let imageSource = defaultUserPicture;
    if (image) {
        imageSource = image;
    }

    return (
        <Link to={`/user/${username}`} className="list-group-item list-group-item-action" key={username}>
            <img className="rounded-circle" width="40" height="32" alt={`${username} profile`} src={imageSource}/>
            <span className="pl-2">{displayName}@{username}</span>
        </Link>
    )
}

export default UserListItem;
 

