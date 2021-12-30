import React from "react";
import PostSubmit from "../components/PostSubmit";
import UserList from "../components/UserList";
import { useSelector } from "react-redux";
import Feed from "../components/Feed";

const HomePage = () => {
    const { isLoggedIn } = useSelector((store) => ({isLoggedIn: store.user.isLoggedIn}))
    return(
        <div className="container">
            <div className="row">
                <div className="col-6">
                    {isLoggedIn && <PostSubmit/>}
                    <div className="mt-2">
                        <Feed />
                    </div>
                </div>
                <div className="col-6">
                    <UserList/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;