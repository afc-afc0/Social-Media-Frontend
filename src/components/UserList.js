import React, { useState, useEffect } from 'react'
import { useAxios } from '../shared/useAxios';
import ButtonWithProgress from './buttonWithProgress';
import UserListItem from './UserListItem';

export default function UserList() {
    
    const [page, setPage] = useState({content:[], size:3, number:0, last:undefined , first:undefined})
    const [parameters, setParams] = useState({page:0, size:5});

    const {response, apiError, loading, apiRequestCallback} = useAxios({
        method : "GET",
        url : "/api/1.0/users",
        headers : {
            accept : "*/*",
        },
        params : {
            page : parameters.page,
            size : parameters.size
        }
    });
    
    useEffect(() => {
        if (response !== undefined){ 
            setPage(page => ({
                ...page,
                content: response.content,
                size: response.size,
                number: response.number,
                last: response.last,
                first: response.first
            })); 
        }
    }, [response])
    
    useEffect(() => {
        if (apiError != null){
            console.log("ApiError = ",apiError);
        }
    }, [apiError])

    const onClickNext = (event) => {
        const nextPage = page.number + 1;
        setParams({
            ...parameters,
            page : nextPage
        })
        apiRequestCallback(event);
    }

    return (
        <div>
            <ButtonWithProgress onClick={(event) => apiRequestCallback(event)} disabled={loading} pendingApiCall={loading} text={"Get Users"}/>
            <div className="card">
                <h3 className="card-header text-center">Users</h3>
                <div className="list-group-flush"> 
                {page.content && page.content.map((user, index) => (
                    <UserListItem key={user.username} user={user}></UserListItem>
                ))}
                </div>
                <div>
                    {page.last === false && <button className="btn btn-sm btn-light" onClick={(event) => onClickNext(event)}>Next</button>}
                </div>
            </div>
        </div>
    )
}
