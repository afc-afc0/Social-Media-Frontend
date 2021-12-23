import React from 'react'
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'


const ProfileCard = (props) => {
    const [inEditMode, setInEditMode] = useState(false);

    const state = useSelector((state) => state);
    const loggedInUsername = state.user.username;

    const { username: pathUsername } = useParams();

    const { user } = props;
    const { username, displayName, image } = user;

    let message = "We can't edit";
    if (loggedInUsername === pathUsername){
        message = "We can edit";
    }

    return (
        <div className="card text-center">
            <div className="card-header ">
                <ProfileImageWithDefault className="rounded-circle shadow"  width="260" height="200" alt={`${username}`} image={image}></ProfileImageWithDefault>
            </div>
            <div className="card-body">
                {!inEditMode && 
                    (
                    <div>
                        <h3>
                            {displayName}@{username} 
                        </h3>
                        <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                            <span className="material-icons">
                                edit
                            </span>Edit
                        </button>
                    </div>
                    )
                }
                {inEditMode && 
                    (
                    <div>
                        <input label="Change Display Name"></input>
                        <div>
                            <button className="btn btn-secondary d-inline-flex">
                                <span className="material-icons">save</span>
                                Save
                            </button>    
                            <button className="btn btn-light d-inline-flex ml-1" onClick={() => setInEditMode(false)}>
                                <span className="material-icons">close</span>
                                Cancel
                            </button>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileCard;