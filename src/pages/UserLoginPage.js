import React from "react";
import Input from "../components/input";
import { login } from "../api/apiCalls";

class LoginPage extends React.Component {

    state = {
        username: null,
        password: null,
        errors:{

        }
    };


    onChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    onClickLogin = event => {
        event.preventDefault();
        const {username, password} = this.state
        const creds = {
            username: username,
            password: password
        }
        login(creds);
    }

    render(){
        return(
            <div className="container">
                <form className="needs-validation">
                    <h1 className="text-center">Login</h1>
                    <Input name="username" label="Username" onChange={this.onChange} />
                    <Input name="password" label="Password" onChange={this.onChange} type="password"/>
                    <div className="spacer5"></div>
                    <div className="text-center">
                        <button className="btn btn-secondary" onClick={this.onClickLogin}>Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;