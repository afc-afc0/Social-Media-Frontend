import React from "react";
import Input from "../components/input";
import ButtonWithProgress from "../components/buttonWithProgress";
import { useInput} from "../shared/useInput";
import { useNavigate  } from 'react-router-dom';
import {useAxios} from "../shared/useAxios";
import {useEffect} from 'react'

export const LoginPage = ({onLoginSuccess}) => {

    const [values, handleChange] = useInput({username : "", password : ""});
    const navigate = useNavigate();

    const {response, apiError, loading, apiRequestCallback} = useAxios({
        method : "POST",
        url : "/api/1.0/auth",
        auth : {username : values.username , password : values.password},
        headers : {
            accept : "*/*",
        },
    });

    useEffect(() => {
        if (response !== undefined && response.username === values.username){ //Login succesfull
            onLoginSuccess(values.username);
            navigate("/", { replace: true });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])

    useEffect(() => {
        if (apiError != null){
            console.log("ApiError = ",apiError);
        }
    }, [apiError])


    const onButtonClick = (event) => {
        event.preventDefault();
        apiRequestCallback();
    }

    const buttonEnabled = values.username && values.password;

    return(
        <div className="container">
            <form className="needs-validation">
                <h1 className="text-center">Login</h1>
                <Input name="username" label="Username" value={values.username} onChange={handleChange}  />
                <Input name="password" label="Password" value={values.password} onChange={handleChange} type="password"/>
                {apiError && <div className="alert alert-danger">{apiError.message}</div>}
                <div className="spacer5"></div>
                {<ButtonWithProgress onClick={onButtonClick} disabled={!buttonEnabled || loading} pendingApiCall={loading} text={"Login"}/>}
            </form>
        </div>
    );
    
}

export default LoginPage;