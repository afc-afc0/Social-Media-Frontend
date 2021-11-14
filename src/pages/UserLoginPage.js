import React from "react";
import Input from "../components/input";
import { login } from "../api/apiCalls";

class LoginPage extends React.Component {

    state = {
        username: null,
        password: null,
        error: null
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
                    <div className="text-center">
                        <button className="btn btn-secondary" onClick={this.onClickLogin} disabled={!buttonEnabled}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;