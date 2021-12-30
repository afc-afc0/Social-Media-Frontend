import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import { useInput } from "../shared/useInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useApiProgress } from "../shared/useApiProgress";
import { signupHandler } from "../redux/action-creators";

export const SignUpPage = () => {

    const [errors, setErrors] = useState({username:"", displayName:"", password:""});
    const [inputs, setInput] = useInput({username: "", displayName: "", password: "", passwordRepeat: ""});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const resetErrors = () => {
        setErrors({
            username : "",
            displayName : "",
            password : ""
        })
    }

    useEffect((event) => {
        resetErrors();
    },[inputs])

    const OnClickSignUp = async (event) => {
        event.preventDefault();

        resetErrors();

        try {
            await dispatch(signupHandler(inputs)); // async ve await ile signup işlemi tamamlandıktan sonra alt satıra geçer
            navigate("/", { replace: true });
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    }
       
    const pendingApiCallSignup = useApiProgress("post", "/api/1.0/users");
    const pendingApiCallLogin = useApiProgress("post", "/api/1.0/auth");
    const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;

    return(
        <div className = "container">
            <form className="needs-validation">
                <h1 className="text-center">Sign Up Page</h1>
                <Input name="username" label="Username" value={inputs.username} error={errors.username} onChange={setInput}/>
                <Input name="displayName" label="Display Name" value={inputs.displayName} error={errors.displayName} onChange={setInput}/>
                <Input name="password" label="Password" value={inputs.password}  error={errors.password} onChange={setInput} type="password"/>
                <Input name="passwordRepeat" label="Password Repeat" value={inputs.passwordRepeat} error={errors.passwordRepeat} onChange={setInput} type="password"/>
                <div className="spacer5"></div>
                <ButtonWithProgress onClick={(event) => OnClickSignUp(event)} disabled={pendingApiCall || errors.passwordRepeat !== undefined} pendingApiCall={pendingApiCall} text={"Sign Up"}/>
            </form>
        </div>
    );
}

export default SignUpPage;