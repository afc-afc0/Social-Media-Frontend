import React from 'react'
import defaultUserPicture from "../assets/defaultUserPicture.png"

const ProfileImageWithDefault = (props) => {
    const { image } = props;

    let imageSource = defaultUserPicture;
    if (image) {
        imageSource = image;
    }

    return <img alt={"Profile"} src={imageSource} {...props} />          
}

export default ProfileImageWithDefault;