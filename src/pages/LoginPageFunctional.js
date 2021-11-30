import React from "react";
import Input from "../components/input";
import { login } from "../api/apiCalls";
import ButtonWithProgress2 from "../components/buttonWithProgress2";
import { useInput } from "../shared/useInput";
import { useState, useEffect, useRef, useCallback} from 'react'
import { useNavigate  } from 'react-router-dom';
import {useAxios} from "../shared/useAxios";

export const LoginPage = (props) => {

    const [values, handleChange] = useInput({username: "", password: ""});
    const [isSending, setIsSending] = useState(false);

    const { response, loading, errors } = useAxios({
        method : "POST",
        url : "/api/1.0/auth",
        headers : {
            accept : "*/*",
            auth : {username : values.username , password : values.password}
        },
        data : {}
    });

    const [error, setError] = useState(null);
    const isMounted = useRef(false);
    const navigate = useNavigate();

    // const sendRequest = useCallback(async () => {
    //     // don't send again while we are sending
    //     if (isSending) return
    //     // update state
    //     setIsSending(true)
    //     // send the actual request
    //     await axios();
    //     // once the request is sent, update state again
    //     if (isMounted.current) // only update if we are still mounted
    //       setIsSending(false)
    //   }, [isSending]) 

    useEffect(() => {
        return () => {
          isMounted.current = false
        }
      }, [])

    // useEffect(() => {
    //     if (errors !== null){
    //         setError(errors);
    //     }
    // }, [isSending]);


    // const onClickLogin = async event => {
    //     event.preventDefault();

    //     const creds = {
    //         username: values.username,
    //         password: values.password
    //     }
        
    //     console.log("using axios");
    //     await axios();
    //     //navigate("/", { replace: true });      
    // }

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
                {<ButtonWithProgress2 disabled={!buttonEnabled || loading} pendingApiCall={loading} text={"Login"}/>}
            </form>
        </div>
    );
    
}

export default LoginPage;