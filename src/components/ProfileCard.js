import React from 'react'
import Input from './input';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/useApiProgress';
import ButtonWithProgress from './buttonWithProgress';


const ProfileCard = (props) => {
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const [user, setUser] = useState({}); 
    const [editable, setEditable] = useState(false);

    const state = useSelector((state) => state);
    const loggedInUsername = state.user.username;

    const { username: pathUsername } = useParams();
    const { username, displayName, image } = user;


    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername)
    }, [pathUsername, loggedInUsername])

    useEffect(() => {
        if(!inEditMode){
            setUpdatedDisplayName(undefined);
        } else { 
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName])

    const onClickSave = async () => {
        const body = {
            displayName: updatedDisplayName
        }

        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
        } catch (error) {

        }
    }

    const pendingApiCall = useApiProgress('put', 'api/1.0/users/' + username, true);

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
                        { editable &&
                            <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                                <span className="material-icons">
                                    edit
                                </span>Edit
                            </button>
                        }
                    </div>
                    )
                }
                {inEditMode && 
                    (
                    <div>
                        <Input 
                            label="Change Display Name" 
                            defaultValue={displayName} 
                            onChange={(event) => setUpdatedDisplayName(event.target.value)}>
                        </Input>
                        <div>
                            <ButtonWithProgress
                                className="btn btn-secondary d-inline-flex" 
                                onClick={onClickSave}
                                disabled={pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                text={
                                        <>
                                            <span className="material-icons">save</span>
                                            Save
                                        </>
                                }   
                            />
                            <button className="btn btn-danger d-inline-flex ml-1" onClick={() => setInEditMode(false)} disabled={pendingApiCall}>
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