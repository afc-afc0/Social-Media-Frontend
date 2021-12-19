import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { useState, useEffect } from "react";
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router';

const UserPage = () => {
    const [user, setUser] = useState();
    const [notFound, setNotFound] = useState(false);
    
    const { username } = useParams();

    useEffect(() => {
        setNotFound(false);
    }, [user])

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {
                setNotFound(true);
            }
        };

        loadUser();
    }, [username])

    if (notFound) {
        return (
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                        <i className="material-icons" style={{fontSize: "48px"}}>
                            error
                        </i>
                    </div>
                    User not found
                </div>
            </div>
        )
    }
    
    return (
        <div className="container">
            <ProfileCard  username={username} />
            <h1>{username}</h1>
        </div>
    );
};

export default UserPage;
