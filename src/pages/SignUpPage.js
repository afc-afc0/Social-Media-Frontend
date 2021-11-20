import React from "react";
import { signup } from "../api/apiCalls";
import ButtonWithProgress from "../components/buttonWithProgress";
import Input from "../components/input";
import { useInputs } from "../shared/useInputs";
import { useState } from "react";
import { withApiProgress } from "../shared/ApiProgress";

const SignUpPage = (props) => {

    const [{username, displayName, password, passwordRepeat}, setInput] = useState({username: "", displayName: "", password: "", passwordRepeat: ""});
    const [errors, setErrors] = useState({});

    useEffect(
        () => {

        }
    }, [input])

    const onChangeInput = event => {
        
        console.log("Started setting input")
        setInput(currentState => ({
            ...currentState,
            [event.target.name]: event.target.value
        }));

        console.log(`username = ${username}`);
        console.log(`display name = ${displayName}`);
        console.log(`password = ${password}`);
        console.log(`password repeat = ${passwordRepeat}`);        

        const {name} = event.target
        errors[name+"Error"] = undefined;

        if (name === "password" || name === "passwordRepeat") 
            if (name === "password" && password !==  passwordRepeat)
                setErrors({passwordRepeatError:'Password mismatch'});
            else if (name === "passwordRepeat" && passwordRepeat !== password)
                setErrors({passwordRepeatError:"Password mismatch"});
            else
                setErrors({passwordRepeatError:undefined});
    }
    
    const onClickSignUp = async event =>{
        event.preventDefault();//We block browser

        const body = {
            username: username,
            displayName: displayName,
            password: password
        };

        try{
            await signup(body);
        }catch (error){
            if (error.response.data.validationErrors)
                setErrors({errors: error.response.data.validationErrors});
        }
    }

    const { pendingApiCall } = false;

    return(
        <div className = "container">
            <form className="needs-validation">
                <h1 className="text-center">Sign Up Page</h1>
                <Input name="username" label="Username" value={username} error={errors.usernameError} onChange={onChangeInput}/>
                <Input name="displayName" label="Display Name" value={displayName} error={errors.displayNameError} onChange={onChangeInput}/>
                <Input name="password" label="Password" value={password}  error={errors.passwordError} onChange={onChangeInput} type="password"/>
                <Input name="passwordRepeat" label="Password Repeat" value={passwordRepeat} error={errors.passwordRepeatError} onChange={onChangeInput} type="password"/>
                <div className="spacer5"></div>
                <ButtonWithProgress onClick={onClickSignUp} disabled={pendingApiCall || errors.passwordRepeatError !== undefined} pendingApiCall={pendingApiCall} text={"Sign Up"}/>
            </form>
        </div>
    );
}

export default withApiProgress(SignUpPage, "api/1.0/users");;