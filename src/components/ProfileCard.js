import React from 'react'
import Input from './Input';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/useApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import { updateSuccess } from '../redux/action-creators';


const ProfileCard = (props) => {
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    
    const [user, setUser] = useState({}); 
    const [editable, setEditable] = useState(false);

    const { username: pathUsername } = useParams();
    const { username: loggedInUsername } = useSelector((store) => ({
        username: store.user.username,
    }));

    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();



    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [pathUsername, loggedInUsername])

    useEffect(() => {
        setValidationErrors((prevValidationErrors) => {
            return {
                ...prevValidationErrors,
                displayName : undefined,
            }
        }); 
    }, [updatedDisplayName])

    useEffect(() => {
        setValidationErrors((prevValidationErrors) => {
            return {
                ...prevValidationErrors,
                image : undefined,
            }
        }); 
    }, [newImage])

    const { username, displayName, image } = user;

    useEffect(() => {
        if(!inEditMode){
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else { 
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName])

    const onClickSave = async () => {

        let image;
        if (newImage) {
            image = newImage.split(',')[1];
        }

        const body = {
            displayName: updatedDisplayName,
            image: image
        };

        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data));
        } catch (error) { 
            setValidationErrors(error.response.data.validationErrors);
        }
    }

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }

        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
    const { displayName : displayNameError, image : imageError} = validationErrors; 

    return (
        <div className="card text-center">
            <div className="card-header ">
                <ProfileImageWithDefault 
                    className="rounded-circle shadow"  
                    width="200" 
                    height="200" 
                    alt={`${username} profile`} 
                    image={image}
                    tempimage={newImage}
                />
            </div>
            <div className="card-body">
                {!inEditMode && (
                    <>
                        <h3>
                            {displayName}@{username} 
                        </h3>
                        {editable && (
                            <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                                <span className="material-icons">edit</span>
                                Edit
                            </button>
                        )}
                    </>
                )}
                {inEditMode && (
                    <div>
                        <Input
                            label="Change Display Name" 
                            defaultValue={displayName} 
                            onChange={(event) => setUpdatedDisplayName(event.target.value)}
                            error={displayNameError}
                        />
                        <Input 
                            type="file"
                            onChange={onChangeFile}
                            error={imageError}
                        />
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
                            <button className="btn btn-danger d-inline-flex ml-1" 
                            onClick={() => setInEditMode(false)} 
                            disabled={pendingApiCall}>
                                <span className="material-icons">cancel</span>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileCard;