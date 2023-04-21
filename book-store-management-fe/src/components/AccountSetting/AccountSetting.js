import React, { Component } from "react";
import UserServices from "../../services/UserServices";
import {Link} from "react-router-dom"
import { useHistory } from 'react-router-dom';  

class AccountSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            displayName:'',
            email:'',
            dob:'',
            username: '',
            avatarPath: null
        };
        this.changeAvatarHandler= this.changeAvatarHandler.bind(this);
        this.changeGmailHandler = this.changeGmailHandler.bind(this);
        this.changeDisplayNameHandler = this.changeDisplayNameHandler.bind(this);
        this.changeDobHandler = this.changeDobHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        UserServices.getUserByUserName("duckm").then((res) => {
            this.setState({ user: res.data });
            this.setState({displayName: this.state.user.displayName});  
            this.setState({email: this.state.user.email});
            this.setState({dob: this.state.user.dob});
            this.setState({username: this.state.user.username});
        });
    }

    saveUser(e) {
        e.preventDefault();
        let User = {email: this.state.email, displayName: this.state.displayName, dob: this.state.dob,username: this.state.username};
        
        console.log(JSON.stringify(User));    
        UserServices.updateUserInformation(User)  
        let avatarPath=this.state.avatarPath
        if(avatarPath !== null){
            const formData = new FormData();
            formData.append('avatarPath', avatarPath);
            formData.append('username',this.state.username)
            UserServices.updateUserAvatar(formData)
        }
        
    }

    changeGmailHandler(event) {
        this.setState({email: event.target.value})
    }
    changeDisplayNameHandler(event) {
        this.setState({displayName: event.target.value})
    }
    changeDobHandler(event) {
        this.setState({dob: event.target.value})
    }
    changeAvatarHandler(event) {
        this.setState({avatarPath: event.target.files[0]})
    }

    cancel() {
        
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                <form>
                    <label name="displayName">Display Name: </label>
                    <input type="text" value={this.state.displayName} name="displayName" onChange={this.changeDisplayNameHandler} />

                    <input type="file" name="avatarPath" onChange={this.changeAvatarHandler}></input>

                    <label name="email">Email: </label>
                    <input type="text" value={this.state.email} name="email" onChange={this.changeGmailHandler} />

                    <label name="dob">DoB: </label>
                    <input type="date" value={this.state.dob} name="dob" onChange={this.changeDobHandler }/>
                    <input type="submit" value="update"/>

                    <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                    <button className="btn btn-danger" ><Link to={"/user/"+this.state.username}>Cancel</Link></button>
                </form>
            </div>
        );
    }
}

export default AccountSetting;
