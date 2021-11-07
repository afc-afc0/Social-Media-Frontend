import React from "react";
import { signup } from "../api/apiCalls";

class UserSignUpPage extends React.Component{

    state = {//Comes from React.components
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false
    };
  

    onChange = event => {
        const { name, value} = event.target
        // Shorthand 
        //const value = event.target.value;
        //const nameField = event.target.name;
        this.setState({
            [name]: value
        })
    }
    
    onClickSignUp = async event =>{
        event.preventDefault();//We block browser

        const { username, displayName, password, passwordRepeat} = this.state;

        const body = {
            username,
            displayName,
            password,
            passwordRepeat
        };

        this.setState({pendingApiCall: true});
        
        try{
            const response = await signup(body);
        }catch (error){ }
        this.setState({pendingApiCall: false});

        // We used then and catch because we need to wait for asyn response than wait for the result
        // signup(body).then(responce =>{
        //     this.setState({pendingApiCall: false});
        // }).catch(error => {
        //     this.setState({pendingApiCall: false});
        // });
    }

    render(){
        const { pendingApiCall } = this.state;// we dont want to use this.state.pendingApiCall everytime
        return(
        <div className = "container">
            <form>
                <h1 className="text-center">Sign Up Page</h1>
                <div className="form-group">
                    <label className="form-label">Username</label>
                    <input name="username" className="form-control" onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Display Name</label>
                    <input name="displayName" className="form-control" onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input name="password"type="password" className="form-control" onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Password Repeat</label>
                    <input name="passwordRepeat" className="form-control" type="password" onChange={this.onChange}/>
                </div>
                <div className="spacer5"></div>
                <div className="text-center">
                    <button className="btn btn-secondary" onClick={this.onClickSignUp} disabled={pendingApiCall}>
                    {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} Sign Up 
                    </button>
                </div>
            </form>
        </div>
        );
    }
    //this named conditional rendering this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>

    // We dont want to repeat our code 
    // onChangeUsername = event => {
    //     this.setState({
    //         username: event.target.value
    //     });
    // };

    // onChangeDisplayName = event => {
    //     this.setState({
    //         displayname: event.target.value
    //     });
    // };
    
    // onChangePassword = event => {
    //     this.setState({
    //         password: event.target.value
    //     });
    // };

    // onChangePasswordRepeat = event => {
    //     this.setState({
    //         passwordRepeat: event.target.value
    //     });
    // };

}

export default UserSignUpPage;