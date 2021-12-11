import React, { useState, useEffect } from 'react'
import { useAxios } from '../shared/useAxios';
import ButtonWithProgress from './buttonWithProgress';

export default function UserList() {
    
    const [users, setUsers] = useState(null);

    const {response, apiError, loading, apiRequestCallback} = useAxios({
        method : "GET",
        url : "/api/1.0/users",
        headers : {
            accept : "*/*",
        },
    });

    useEffect(() => {
        if (response !== undefined){ //Login succesfull
            console.log(response);
            setUsers();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])
    

    useEffect(() => {
        if (apiError != null){
            console.log("ApiError = ",apiError);
        }
    }, [apiError])

    const onButtonClick = (event) => {
        event.preventDefault();
        apiRequestCallback();
    }

    return (
        <div>
            <UserList/>
            <ButtonWithProgress onClick={onButtonClick} disabled={loading} pendingApiCall={loading} text={"Get Users"}/>
        </div>

    )
}
