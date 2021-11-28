import React from "react";
import { signup } from "../api/apiCalls";
import ButtonWithProgress from "../components/buttonWithProgress";
import Input from "../components/input";
import { withApiProgress } from "../shared/ApiProgress";
class UserSignUpPage extends React.Component{

    state = {//Comes from React.components
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors:{

        }
    };
  

    onChange = event => {

        

        const { name, value} = event.target
        const errors = {...this.state.errors};
        errors[name] = undefined;

        if (name === "password" || name === "passwordRepeat") 
            if (name === "password" && value !==  this.state.passwordRepeat)
                errors.passwordRepeat = 'Password mismatch'
            else if (name === "passwordRepeat" && value !== this.state.password)
                errors.passwordRepeat = "Password mismatch";
            else
                errors.passwordRepeat = undefined;
        
        this.setState({
            [name]: value,
            errors
        })
    }
    
    onClickSignUp = async event =>{
        event.preventDefault();

        const { username, displayName, password} = this.state;

        const body = {
            username,
            displayName,
            password,
        };

        try{
            await signup(body);
        }catch (error){
            if (error.response.data.validationErrors)// we dont want to set errors to null
                this.setState({errors: error.response.data.validationErrors});
        }
    }

    render(){
        const { pendingApiCall} = this.props;
        const { errors } = this.state;
        const { username, displayName, password, passwordRepeat} = errors;
        return(
        <div className = "container">
            <form className="needs-validation">
                <h1 className="text-center">Sign Up Page</h1>
                <Input name="username" label="Username" error={username} onChange={this.onChange}/>
                <Input name="displayName" label="Display Name" error={displayName} onChange={this.onChange}/>
                <Input name="password" label="Password" error={password} onChange={this.onChange} type="password"/>
                <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange={this.onChange} type="password"/>
                <div className="spacer5"></div>
                <ButtonWithProgress onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat !== undefined} pendingApiCall={pendingApiCall} text={"Sign Up"}/>
            </form>
        </div>
        );
    }
}

export default withApiProgress(UserSignUpPage, "api/1.0/users");;