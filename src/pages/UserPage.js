import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { useState, useEffect } from "react";
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router';

const UserPage = () => {
    const [user, setUser] = useState();
    const { username } = useParams();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        loadUser();
    }, [username])

    
    return (
        <div className="container">
            <ProfileCard  username={username} />
            <h1>{username}</h1>
        </div>
    );
};

export default UserPage;
