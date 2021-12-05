import React from 'react'
import {} from 'react-router-dom'
import { Authentication } from '../shared/AuthenticationContext'
import { useParams } from 'react-router-dom'

const ProfileCard = (props) => {

    const authValues = React.useContext(Authentication);
    const authUsername = authValues.authState.username;

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