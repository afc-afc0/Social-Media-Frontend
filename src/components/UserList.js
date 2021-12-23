import React, { useState, useEffect } from 'react'
import UserListItem from './UserListItem';
import { getUsers } from '../api/apiCalls';
import { useApiProgress } from '../shared/useApiProgress';
import Spinner from './spinner';

export default function UserList() {
    
    const [page, setPage] = useState({content:[], size:3, number:0})
    const pendingApiCall = useApiProgress("get", "/api/1.0/users?page");

    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    }

    const onClickPrevious = () => {
        const prevPage = page.number - 1;
        loadUsers(prevPage);
    }

    const loadUsers = async (pageNum) => {
        setLoadError(false);
        try {
            const response = await getUsers(pageNum, page.size);
            setPage(response.data);
        } catch (error) {
            setLoadError(true);
        }
    }

    const { content: users, last, first } = page;

    let actionDiv = (
        <div>   
            {first === false && (
                <button className="btn btn-sm btn-secondary" onClick={onClickPrevious}>
                    Previous
                </button>
            )}
            {last === false && (
                <button className="btn btn-sm btn-secondary float-end" onClick={onClickNext}>
                    Next
                </button>
            )}
        </div>
    )

    if (pendingApiCall) {
        actionDiv = <Spinner />
    }

    return (
        <div>
            <div className="card">
                <h3 className="card-header text-center">Users</h3>
                <div className="list-group-flush"> 
                    {users && users.map((user, index) => (
                        <UserListItem key={user.username} user={user}/>
                    ))}
                    
                </div>
                {actionDiv}
                {loadError && <div className="text-center text-danger">Error while loading users</div>}
            </div>
        </div>
    )
}
