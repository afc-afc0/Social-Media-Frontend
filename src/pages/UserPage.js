import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { useState, useEffect } from "react";
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router';
import { useApiProgress } from '../shared/useApiProgress';
import Spinner from '../components/Spinner';

const UserPage = () => {
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);
    
    const { username } = useParams();

    const pendingApiCall = useApiProgress("get", "/api/1.0/users/" + username);

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

    if (pendingApiCall) {
        return <Spinner />
    }

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
            <ProfileCard  user={user} />
        </div>
    );
};

export default UserPage;
