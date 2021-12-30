import React from 'react'

const PostView = (props) => {
    const { post } = props;

    return (
        <div className="card p-1">
            {post.content}
        </div>
    )
}

export default PostView;