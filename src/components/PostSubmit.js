import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postUserPost, postAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/useApiProgress';
import Input from "./Input"; 
import ButtonWithProgress from './ButtonWithProgress';
import AutoUploadImage from './AutoUploadImage';

const PostSubmit = () => {
    const [focused, setFocused] = useState(false);
    const [post, setPost] = useState("");
    const [errors, setErrors] = useState({});  
    const [newImage, setNewImage] = useState(); 

    const pendingApiCall= useApiProgress("post", "/api/1.0/posts", true);
    const pendingFileUpload = useApiProgress("post", "/api/1.0/post-attachments", true);

    useEffect(() => {
        if (!focused){
            setPost(""); 
            setErrors({});   
            setNewImage();
        }
    }, [focused])

    useEffect(() => {
        setErrors({});
    },[post])

    const onClickSubmit = async () => {
        const body = {
            content : post
        };

        try {
            await postUserPost(body);
            setFocused(false);
        } catch (errors) {
            setErrors(errors.response.data.validationErrors);
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
            uploadFile(file);
        };
        fileReader.readAsDataURL(file);
    }

    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append("file", file);
        
        try {
            await postAttachment(attachment);
        } catch (error) {
            console.log(error);
        }
    } 

    const { image } = useSelector((store) => ({image: store.user.image}))

    let textAreaClass = "form-control";
    if (errors.content) {
        textAreaClass += " is-invalid"
    }

    return (
        <div className="card flex-row">
            <ProfileImageWithDefault className="rounded-circle me-1" image={image} width="32" height="32" />
            <div className="flex-fill">
                <textarea 
                    className={textAreaClass} 
                    rows={focused ? "3" : "1"} 
                    onFocus={() => setFocused(true)} 
                    onChange={(event) => setPost(event.target.value)}
                    value={post}
                />
                <div className="invalid-feedback">{errors.content}</div>
                {focused &&
                    <>
                        {!newImage && <Input type="file" onChange={onChangeFile} />}
                        {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload}/>}
                        <div className="text-center mt-1">
                            <ButtonWithProgress
                                className="btn btn-secondary"
                                pendingApiCall={pendingApiCall}
                                onClick={onClickSubmit}
                                disabled={pendingApiCall || pendingFileUpload}
                                text="Submit"
                            />
                            <button className="btn btn-danger d-inline-flex ml-1" onClick={() => setFocused(false)} disabled={pendingApiCall || pendingApiCall} >
                                <span className="material-icons">cancel</span>
                                Cancel
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default PostSubmit;
