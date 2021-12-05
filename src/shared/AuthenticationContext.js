import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const Authentication = React.createContext();

const AuthenticationContext = (props) => {
    
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    });

    const onLoginSuccess = (state) => {
        setAuthState({
            ...state,
            isLoggedIn: true,
        });
    }

    const onLogoutSuccess = () => {

        setAuthState({
            username: undefined,
            displayName: undefined,
            image: undefined,
            password: undefined,
            isLoggedIn: false
        });
        
        return (
            <Navigate to="/" />
        )
    }
    
    
    return (
        <Authentication.Provider value={{authState,onLoginSuccess,onLogoutSuccess}}>
            {props.children}
        </Authentication.Provider>
    )
}

export default AuthenticationContext;