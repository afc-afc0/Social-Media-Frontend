import React from "react";
import Input from "../components/input";
import { login } from "../api/apiCalls";
import ButtonWithProgress from "../components/buttonWithProgress";
import {withApiProgress} from "../shared/ApiProgress";
import { Navigate } from "react-router-dom";

class LoginPage extends React.Component {

    state = {
        username: null,
        password: null,
        error: null,
    };

    onChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]:value,
            error:null
        })
    }



    onClickLogin = async event => {
        event.preventDefault();
        const {username, password} = this.state
        const creds = {
            username: username,
            password: password
        }
        
        this.setState({
            error:null
        })
        try {
            await login(creds);
        } catch(apiError){
            this.setState({
            error: apiError.response.data.message
          })
        }
    }

    render(){
        const {pendingApiCall} = this.props;
        const {username, password, error} = this.state;

        const buttonEnabled = username && password;
        
        return(
            <div className="container">
                <form className="needs-validation">
                    <h1 className="text-center">Login</h1>
                    <Input name="username" label="Username" onChange={this.onChange} />
                    <Input name="password" label="Password" onChange={this.onChange} type="password"/>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="spacer5"></div>
                    <ButtonWithProgress onClick={this.onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall} text={"Login"}/>
                </form>
            </div>
        );
    }
}

export default withApiProgress(LoginPage, "/api/1.0/auth");