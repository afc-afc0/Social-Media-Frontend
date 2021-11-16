import React, { Component } from 'react'
import logo from "../assets/html5_game_transparent.png"
import { Link } from 'react-router-dom'

export default class TopBar extends Component {
    render() {
        return (
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} height="40" alt="Hoaxify Logo"/>
                        Hoaxify
                    </Link>
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
                </nav>
            </div>
        )
    }
}
