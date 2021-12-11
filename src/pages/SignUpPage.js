import ButtonWithProgress from "../components/buttonWithProgress";
import Input from "../components/input";
import { useInput } from "../shared/useInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAxios } from "../shared/useAxios";

export const SignUpPage = () => {

    const [ errors, setErrors] = useState({username:"", displayName:"", password:""});
    const [ inputs, setInput] = useInput({username: "", displayName: "", password: "", passwordRepeat: ""});
    const navigate = useNavigate();

    const {response, apiError, loading, apiRequestCallback} = useAxios({
        method: "POST",
        url: "api/1.0/users",
        headers : {
            accept : "*/*"
        },
        data : {
            username: inputs.username, 
            displayName: inputs.displayName,
            password: inputs.password
        }
    });

    const resetErrors = () => {
        setErrors({
            username : "",
            displayName : "",
            password : ""
        })
    }

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
    
    

    useEffect(() => {
        if (apiError != null){
            console.log("Error message = ", apiError.message);
            setErrors({
                username: apiError.validationErrors.username,
                displayName: apiError.validationErrors.displayName,
                password: apiError.validationErrors.password
            })
        }
            
    },[apiError])

    useEffect(() => {
        if (response !== undefined){
            console.log(response);
            navigate("/", { replace: true });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response])

    return(
        <div className = "container">
            <form className="needs-validation">
                <h1 className="text-center">Sign Up Page</h1>
                <Input name="username" label="Username" value={inputs.username} error={errors.username} onChange={setInput}/>
                <Input name="displayName" label="Display Name" value={inputs.displayName} error={errors.displayName} onChange={setInput}/>
                <Input name="password" label="Password" value={inputs.password}  error={errors.password} onChange={setInput} type="password"/>
                <Input name="passwordRepeat" label="Password Repeat" value={inputs.passwordRepeat} error={errors.passwordRepeat} onChange={setInput} type="password"/>
                <div className="spacer5"></div>
                <ButtonWithProgress onClick={(event) => apiRequestCallback(event)} disabled={loading || errors.passwordRepeat !== undefined} pendingApiCall={loading} text={"Sign Up"}/>
            </form>
        </div>
    );
}

export default SignUpPage;