import React from 'react'
import logo from "../assets/html5_game_transparent.png"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { bindActionCreators } from 'redux'; 
import { actionCreators } from "../redux/index";
import { useState, useEffect, useRef } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';

export const TopBar = () => {

    const { isLoggedIn, username, displayName, image } = useSelector((store) => ({
        isLoggedIn : store.user.isLoggedIn,
        username : store.user.username,
        displayName : store.user.displayName,
        image : store.user.image
    }));
    
    const menuArea = useRef(null);

    const dispatch = useDispatch();
    const { userLogout } = bindActionCreators(actionCreators, dispatch);
    const [menuVisible, setMenuVisible] = useState(false);


    useEffect(() => {
        document.addEventListener("click", onMenuClick);
        return () => {
            document.removeEventListener("click", onMenuClick);
        }
    }, [isLoggedIn])

    const onMenuClick = (event) => {
        if(menuArea.current === null || !menuArea.current.contains(event.target))
            setMenuVisible(false);
    }

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
        let dropdownClass = "dropdown-menu p-0 shadow";
        if (menuVisible) {
            dropdownClass += " show";
        }

        links = (
            <ul className="navbar-nav ms-auto" ref={menuArea}>
                <li className="nav-item dropdown">
                    <div className='d-flex' style={{ cursor: 'pointer'}} onClick={() => setMenuVisible(true)}>
                        <ProfileImageWithDefault 
                            className="rounded-circle m-auto" 
                            image={image} 
                            width="32" 
                            height="32"
                        />
                        <span className='nav-link dropdown-toggle'>{displayName}</span>
                    </div>
                    <div className={dropdownClass}>
                        <Link 
                            className="dropdown-item d-flex p-2" 
                            to={`/user/${username}`}
                            onClick={() => setMenuVisible(false)}
                        >
                            <span className="material-icons text-info me-2" >account_circle</span>
                            My Profile
                        </Link>
                        <span 
                            className="dropdown-item d-flex p-2" 
                            onClick={() => userLogout()} 
                            style={{cursor: 'pointer'}}
                        >
                            <span className="material-icons text-danger me-2">logout</span>
                            {"Logout"}
                        </span>
                    </div>
                </li>       
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
