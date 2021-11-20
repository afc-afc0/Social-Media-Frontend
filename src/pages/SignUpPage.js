import React from "react";
import { signup } from "../api/apiCalls";
import ButtonWithProgress from "../components/buttonWithProgress";
import Input from "../components/input";
import { useInput } from "../shared/useInput";
import { useState, useEffect } from "react";
import { withApiProgress } from "../shared/ApiProgress";

const SignUpPage = (props) => {

    const [ errors, setErrors] = useState({username:"", displayName:"", password:""});
    const [ inputs, setInput] = useInput({username: "", displayName: "", password: "", passwordRepeat: ""});


    useEffect ( () => {
        resetErrors();
    }, [inputs.username, inputs.displayName])

    useEffect ((errors) => {

        resetErrors();

        if (inputs.password !==  inputs.passwordRepeat)
            setErrors ({
                ...errors,
                passwordRepeat:'Password mismatch'
            });
        else
            setErrors({
                ...errors,
                passwordRepeat:undefined
            });
    }, [inputs.password, inputs.passwordRepeat])
    
    const resetErrors = () => {
        setErrors({
            username : "",
            displayName : "",
            password : ""
        })
    }

    const onClickSignUp = async event =>{
        event.preventDefault();

        const body = {
            username: inputs.username,
            displayName: inputs.displayName,
            password: inputs.password
        };

        try{
            await signup(body);

        }catch (error){
            if (error.response.data.validationErrors){
                setErrors({
                    username : error.response.data.validationErrors.username,
                    displayName : error.response.data.validationErrors.displayName,
                    password : error.response.data.validationErrors.password,
                })
            }
        }
    }

    const { pendingApiCall } = props;

    return(
        <div className = "container">
            <form className="needs-validation">
                <h1 className="text-center">Sign Up Page</h1>
                <Input name="username" label="Username" value={inputs.username} error={errors.username} onChange={setInput}/>
                <Input name="displayName" label="Display Name" value={inputs.displayName} error={errors.displayName} onChange={setInput}/>
                <Input name="password" label="Password" value={inputs.password}  error={errors.password} onChange={setInput} type="password"/>
                <Input name="passwordRepeat" label="Password Repeat" value={inputs.passwordRepeat} error={errors.passwordRepeat} onChange={setInput} type="password"/>
                <div className="spacer5"></div>
                <ButtonWithProgress onClick={onClickSignUp} disabled={pendingApiCall || errors.passwordRepeat !== undefined} pendingApiCall={pendingApiCall} text={"Sign Up"}/>
            </form>
        </div>
    );
}

export default withApiProgress(SignUpPage, "api/1.0/users");;