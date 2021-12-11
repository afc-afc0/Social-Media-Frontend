import React, { useState, useEffect } from 'react'
import { useAxios } from '../shared/useAxios';
import ButtonWithProgress from './buttonWithProgress';

const Item = (props) => {

    const [username, setUsername] = useState(undefined);

    useEffect(() => {
        setUsername(props.user.username);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            {username}
            <button>Delete</button>
        </div>
    )
}

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
            setUsers(response);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])
    

    useEffect(() => {
        if (apiError != null){
            console.log("ApiError = ",apiError);
        }
    }, [apiError])

    const onDeleteItem = () => {
        console.log("Delete clicked");
    }

    return (
        <div>
            <ButtonWithProgress onClick={(event) => apiRequestCallback(event)} disabled={loading} pendingApiCall={loading} text={"Get Users"}/>
            <div>
                {users && users.map((user, index) => (
                    <Item key={index} user={user}/>
                ))}
            </div>
        </div>
    )
}
