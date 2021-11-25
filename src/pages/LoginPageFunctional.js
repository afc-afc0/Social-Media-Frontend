import React from "react";
import Input from "../components/input";
import { login } from "../api/apiCalls";
import ButtonWithProgress from "../components/buttonWithProgress";
import {withApiProgress} from "../shared/ApiProgress";
import { useInput } from "../shared/useInput";
import { useState, useEffect} from 'react'
import { useNavigate  } from 'react-router-dom';
import useAxios from "../shared/useAxios";

const LoginPage = (props) => {

    const [values, handleChange] = useInput({username: "", password: ""});
    const axios = useAxios("/api/1.0/auth");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { response, loading, errors } = useAxios({
        method: 'post',
        url: '/posts',
        headers: JSON.stringify({ accept: '*/*' }),
        body: JSON.stringify({
            username: values.username,
            password: values.password,
        }),
    });

    useEffect(() => {
        if (errors !== null) {
            setError(errors);
        }
    }, [errors]);

    const onClickLogin = async event => {
        event.preventDefault();

        const creds = {
            username: values.username,
            password: values.password
        }
        
        try {
            await login(creds);
            navigate("/", { replace: true });
        } catch(apiError){
            setErrors(apiError.response.data.message);
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
                {errors && <div className="alert alert-danger">{errors}</div>}
                <div className="spacer5"></div>
                {<ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall} text={"Login"}/>}
            </form>
        </div>
    );
    
}

export default withApiProgress(LoginPage, "/api/1.0/auth");