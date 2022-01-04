import React from 'react'
import ProfileImageWithDefault from "./ProfileImageWithDefault"
import Modal from './Modal'
import { Link } from "react-router-dom"
import { format } from "timeago.js"
import { useSelector } from 'react-redux'
import { deletePost } from '../api/apiCalls'
import { useState } from 'react'
import { useApiProgress } from '../shared/useApiProgress'


const PostView = (props) => {
    const { username: loggedInUser } = useSelector(store => store.user);
    const { post, onDeletePost } = props;
    const { user, content, timestamp, fileAttachment, id } = post;
    const { username, displayName, image} = user;
    const [modalVisible, setModalVisible] = useState(false);

    const pendingApiCall = useApiProgress("delete", `/api/1.0/posts/${id}`, true);

    const formattedTimestamp = format(timestamp);
    const isCurrentUsersPost = loggedInUser === username; 

    const onClickDelete = async () => {  
        try {
            await deletePost(id)
            onDeletePost(id);
        } catch (error) {
            console.log(error);
        }
    }

    const onClickCancel = () => {
        setModalVisible(false);
    }

    return (
        <>
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
                    {isCurrentUsersPost && (
                        <button className="btn btn-delete-link" onClick={() => setModalVisible(true)}>
                            <span className="material-icons">delete_forever</span>
                        </button>
                    )}
                </div>
                <div className="pe-3">
                    {content}
                </div>
                {fileAttachment && (
                    <div className="pl-5">
                        {fileAttachment.fileType.startsWith("image") && (
                            <img 
                                className="img-fluid" 
                                src={"images/attachments/" + fileAttachment.name} 
                                alt={content} 
                            />
                        )}
                        {!fileAttachment.fileType.startsWith("image") && (
                            <strong>Unsupported attachment type</strong>
                        )}
                    </div>
                )}
            </div>
            <Modal 
                visible={modalVisible}
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                pendingApiCall={pendingApiCall}
                title="Delete Post"
                okButtonText="Delete Post"
                message={
                    <div>
                        <strong>Are you sure to delete this post?</strong>
                        <div>
                            <span>{content}</span>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default PostView;