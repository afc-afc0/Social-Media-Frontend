import React from 'react'
import {} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ProfileCard = () => {

    const state = useSelector((state) => state);
    const authUsername = state.user.username;

    const { username } = useParams();

    let message = "We can't edit";
    if (authUsername === username){
        message = "We can edit";
    }

    return (
        <div>
            {message}
        </div>
    )
}

export default ProfileCard;