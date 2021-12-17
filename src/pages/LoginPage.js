import React from "react";
import Input from "../components/input";
import ButtonWithProgress from "../components/buttonWithProgress";
import { useInput } from "../shared/useInput";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginHandler } from "../redux/action-creators/index"
import { useApiProgress } from "../shared/useApiProgress";

export const LoginPage = () => {
    
    const dispatch = useDispatch();

    const [values, handleChange] = useInput({username : "", password : ""});
    const [error, setError] = useState();
    const navigate = useNavigate();

    const onClickLogin = async (event) => {
        event.preventDefault();
        
        setError(undefined);

        try {
            await dispatch(loginHandler(values));
            navigate("/", { replace: true });
        } catch (apiError) {
            console.log(apiError);
            setError(apiError.response.data.message);
        }            
    }

    const buttonEnabled = values.username && values.password;
    const pendingApiCall = useApiProgress("post", "/api/1.0/auth");

    return(
        <div className="container">
            <form className="needs-validation">
                <h1 className="text-center">Login</h1>
                <Input 
                    name="username" 
                    label="Username" 
                    value={values.username} 
                    onChange={handleChange}  
                />
                <Input 
                    name="password" 
                    label="Password" 
                    value={values.password} 
                    onChange={handleChange} 
                    type="password"
                />
                {error && <div className="alert alert-danger">{error.message}</div>}
                <div className="spacer5"></div>
                {<ButtonWithProgress 
                    onClick={(event) => onClickLogin(event)} 
                    disabled={!buttonEnabled || pendingApiCall} 
                    pendingApiCall={pendingApiCall} 
                    text={"Login"}
                />}
            </form>
        </div>
    );
    
}

export default LoginPage;