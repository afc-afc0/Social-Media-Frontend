import React from "react";
import Input from "../components/input";
import { login } from "../api/apiCalls";
import ButtonWithProgress from "../components/buttonWithProgress";
import {withApiProgress} from "../shared/ApiProgress";
import { useInput } from "../shared/useInput";
import { useState} from 'react'
import { useNavigate  } from 'react-router-dom';

const LoginPage = (props) => {

    const [values, handleChange] = useInput({username: "", password: ""});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onClickLogin = async event => {
        event.preventDefault();

        const creds = {
            username: values.username,
            password: values.password
        }
        
        setError(null);
        try {
            await login(creds);
            navigate("/", { replace: true });
        } catch(apiError){
            setError(apiError.response.data.message);
        }
    }

    // const {pendingApiCall} = this.props;
    const buttonEnabled = values.username && values.password;
    const {pendingApiCall} = false;

    return(
        <div className="container">
            <form className="needs-validation">
                <h1 className="text-center">Login</h1>
                <Input name="username" label="Username" value={values.username} onChange={handleChange} />
                <Input name="password" label="Password" value={values.password} onChange={handleChange} type="password"/>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="spacer5"></div>
                {<ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall} text={"Login"}/>}
            </form>
        </div>
    );
    
}

export default withApiProgress(LoginPage, "/api/1.0/auth");