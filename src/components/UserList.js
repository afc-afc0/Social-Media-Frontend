import React, { useState, useEffect } from 'react'
import ButtonWithProgress from './buttonWithProgress';
import UserListItem from './UserListItem';
import { getUsers } from '../api/apiCalls';
import { useApiProgress } from '../shared/useApiProgress';

export default function UserList() {
    
    const [page, setPage] = useState({content:[], size:3, number:0})

    useEffect(() => {
        loadUsers();
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
        try {
            const response = await getUsers(pageNum, page.size);
            setPage(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const pendingApiCall = useApiProgress("get", "/api/1.0/users?page");
    const { content: users, last, first } = page;

    return (
        <div>
            <ButtonWithProgress onClick={() => loadUsers()} disabled={pendingApiCall} pendingApiCall={pendingApiCall} text={"Get Users"}/>
            <div className="card">
                <h3 className="card-header text-center">Users</h3>
                <div className="list-group-flush"> 
                    {users && users.map((user, index) => (
                        <UserListItem key={user.username} user={user}/>
                    ))}
                    
                </div>
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
            </div>
        </div>
    )
}
