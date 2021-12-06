import React from 'react'
import logo from "../assets/html5_game_transparent.png"
import { Link } from 'react-router-dom'
import { Authentication } from '../shared/AuthenticationContext'


export const TopBar = () => {

    const state = useSelector();
    const value = React.useContext(Authentication);

    const { authState, onLogoutSuccess } = value;
    const { isLoggedIn, username} = authState;

    let links = (
        <ul className="navbar-nav ms-auto">
            <li>
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/signup">
                    Sign Up
                </Link>
            </li>
        </ul>
    );

    if (isLoggedIn) {
        links = (
        <ul className="navbar-nav ms-auto">
            <li>
                <Link className="nav-link" to={`/user/${username}`}>
                    {username}
                </Link>
            </li>
            <li className="nav-link" onClick={onLogoutSuccess} style={{cursor: 'pointer'}}>{"Logout"}</li>
        </ul>
        );
    }

    return (
        <div className="shadow-sm bg-light mb-2">
            <nav className="navbar navbar-light container navbar-expand">
                <Link className="navbar-brand" to="/">
                    <img src={logo} height="40" alt="Hoaxify Logo"/>
                    Hoaxify
                </Link>
                {links}
            </nav>
        </div>
    )

}

export default TopBar;
