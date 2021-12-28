import React from 'react'
import defaultUserPicture from "../assets/defaultUserPicture.png"

const ProfileImageWithDefault = (props) => {
    const { image, tempimage } = props;

    let imageSource = defaultUserPicture;
    if (image) {
        imageSource = 'images/' + image;
    }

    return <img 
                alt={"Profile"} 
                src={tempimage || imageSource} {...props} 
                onError={(event) => {
                    event.target.src = defaultUserPicture
                }}
            />          
}

export default ProfileImageWithDefault;