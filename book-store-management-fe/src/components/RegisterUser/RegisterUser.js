import React, { Component } from "react";
import UserServices from "../../services/UserServices";
import { Link } from "react-router-dom";

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      displayName: "",
      email: "",
      dob: "",
      avatarPath: null,
    };

    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeDisplayNameHandler = this.changeDisplayNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeAvatarPathHandler = this.changeAvatarPathHandler.bind(this);
  }

  changeUsernameHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  changeDisplayNameHandler = (event) => {
    this.setState({ displayName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changeAvatarPathHandler = (event) => {
    this.setState({ avatarPath: event.target.files[0], });
  };

  changeDobHandler = (event) => {
    this.setState({ dob: event.target.value });
  };

  handleSubmit = (event) => {
    const { username, password, displayName, email, dob, avatarPath } =
      this.state;

    const user = {
      username: username,
      password: password,
      displayName: displayName,
      email: email,
      dob: dob,
    };

    fetch("http://localhost:6789/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle API response
      });
    const formData = new FormData();
    formData.append("avatarPath", this.state.avatarPath);
    formData.append("username", this.state.username);
    UserServices.registerUserAvatar(formData);
  };

  render() {
    return (
      <div>
        {/* <div className="container">
          <form>
            <label>Username:</label>
            <input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.changeUsernameHandler}
              placeholder="Enter username"
              className="form-control"
              required
            />
            <br></br>
            <label>Password:</label>
            <input
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.changePasswordHandler}
              placeholder="Enter password"
              className="form-control"
              required
            />
            <br></br>

            <label>Display name:</label>
            <input
              type="text"
              value={this.state.displayName}
              name="displayName"
              onChange={this.changeDisplayNameHandler}
              placeholder="Enter Display Name"
              className="form-control"
              required
            />
            <br></br>

            <label>Email:</label>
            <input
              type="text"
              value={this.state.email}
              name="email"
              onChange={this.changeEmailHandler}
              placeholder="Enter email"
              className="form-control"
              required
            />
            <br></br>

            <label>Dob:</label>
            <input
              type="date"
              value={this.state.dob}
              name="dob"
              onChange={this.changeDobHandler}
              placeholder="Enter email"
              className="form-control"
              required
            />
            <br></br>

            <label>Your avatar </label>
            <input
              type="file"
              name="avatarPath"
              onChange={this.changeAvatarPathHandler}
              className="form-control"
              required
            ></input>
            <br></br>
            <button className="btn btn-success" onClick={this.handleSubmit}>
              Register
            </button>
          </form>
        </div> */}
        <div className="container">
          <h2 className="login-title">Sign Up</h2>

          <form className="login-form" >

            <div>
              <label for="email">Email </label>
              <input
                type="text"
                value={this.state.username}
                name="username"
                onChange={this.changeUsernameHandler}
                placeholder="Enter username"
                className="form-control"
                required
              />
            </div>

            <div>
              <label for="password">Password </label>
              <input
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.changePasswordHandler}
                placeholder="Enter password"
                className="form-control"
                required
              />
            </div>

            <div>
              <label for="displayName">Display Name </label>
              <input
                type="text"
                value={this.state.displayName}
                name="displayName"
                onChange={this.changeDisplayNameHandler}
                placeholder="Enter Display Name"
                className="form-control"
                required
              />
            </div>

            <div>
              <label for="email">Email </label>
              <input
                type="text"
                value={this.state.email}
                name="email"
                onChange={this.changeEmailHandler}
                placeholder="Enter email"
                className="form-control"
                required
              />
            </div>
            <div>
              <label for="dob">Day Of Birth </label>
              <input
                type="date"
                value={this.state.dob}
                name="dob"
                onChange={this.changeDobHandler}
                placeholder="Enter email"
                className="form-control"
                required
              />
            </div>
            <div>
              <label for="avatarPath">Avatar </label>
              <input
                type="file"
                name="avatarPath"
                onChange={this.changeAvatarPathHandler}
                className="form-control"
                required
              ></input>
            </div>
            <button className="btn btn--form" type="submit" value="Log in" onClick={this.handleSubmit}>
              Register
            </button>

          </form>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
