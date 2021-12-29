import React from "react";
import PostSubmit from "../components/PostSubmit";
import UserList from "../components/UserList";
import { useSelector } from "react-redux";

const HomePage = () => {
    const { isLoggedIn } = useSelector((store) => ({isLoggedIn: store.user.isLoggedIn}))
    return(
    <div className="container">
        <div className="row">
            <div className="col-6">
                {isLoggedIn && <PostSubmit/>}
            </div>
            <div className="col-6">
                <UserList/>
            </div>
        </div>
    </div>
    );
}

export default HomePage;