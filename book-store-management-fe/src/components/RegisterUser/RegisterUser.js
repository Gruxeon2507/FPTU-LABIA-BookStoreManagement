import React, { Component } from "react";
import UserServices from "../../services/UserServices";
import Alert from "react-bootstrap/Alert";
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
      errorUsername: "",
      showErrorUsername: false,
      errorDisplayName: "",
      showErrorDisplayName: false,
      errorAvatar: "",
      showErrorAvatar: false,
      usernameError: "",
      checkUsername: true,
    };

    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeDisplayNameHandler = this.changeDisplayNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeAvatarPathHandler = this.changeAvatarPathHandler.bind(this);
  }

  changeUsernameHandler = (event) => {
    const inputUsername = event.target.value;

    if (this.state.username.trim() !== "") {
      fetch(`http://localhost:6789/api/users/check/${inputUsername}`)
        .then((response) => response.text())
        .then((data) => {
          if (data === "Username already taken") {
            this.setState({
              usernameError: "Username already taken",
              checkUsername: false,
            });
            return;
          } else {
            this.setState({ usernameError: "", checkUsername: true });
          }
        });
    }
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (!regex.test(inputUsername)) {
      this.setState({
        showErrorUsername: true,
        errorUsername: "Please just input characters and numbers",
      });
      return;
    }

    this.setState({
      showErrorUsername: false,
      errorUsername: "",
      username: inputUsername,
    });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  changeDisplayNameHandler = (event) => {
    const inputDisplayName = event.target.value;
    const regex =
      /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    if (!regex.test(inputDisplayName)) {
      this.setState({
        showErrorDisplayName: true,
        errorDisplayName:
          "Please just input characters and numbers and not empty",
      });
      return;
    }

    this.setState({
      showErrorDisplayName: false,
      errorDisplayName: "",
      displayName: inputDisplayName,
    });
  };

  changeEmailHandler = (event) => {
    const formattedEmail = event.target.value.trim().toLowerCase();
    this.setState({ email: formattedEmail });
  };

  changeAvatarPathHandler = (event) => {
    const avatar = event.target.files[0];
    if (!avatar) {
      // alert("Please choose a file");
      this.setState({
        showErrorAvatar: true,
        errorAvatar:
          "Wrong file type (Please input JPEG File) and less than 5MB",
        avatarPath: null,
      });
      return;
    }

    if (avatar.size > 1024 * 1024 * 5) {
      // alert("Please choose a file less than 5MB");
      this.setState({
        showErrorAvatar: true,
        errorAvatar:
          "Wrong file type (Please input JPEG File) and less than 5MB",
        avatarPath: null,
      });
      return;
    }

    if (!avatar.type.includes("image/jpeg")) {
      // alert("Please select an image file.");
      this.setState({
        showErrorAvatar: true,
        errorAvatar:
          "Wrong file type (Please input JPEG File) and less than 5MB",
      });
      return;
    }

    this.setState({
      showErrorAvatar: false,
      errorAvatar: "",
      avatarPath: event.target.files[0],
    });
  };

  changeDobHandler = (event) => {
    this.setState({ dob: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      password,
      displayName,
      email,
      dob,
      avatarPath,
      errorUsername,
      showErrorUsername,
      errorDisplayName,
      showErrorDisplayName,
      errorAvatar,
      showErrorAvatar,
    } = this.state;

    const user = {
      username: username,
      password: password,
      displayName: displayName,
      email: email,
      dob: dob,
    };

    if (showErrorAvatar || showErrorDisplayName || showErrorUsername) {
      alert("can not load data to register!!!");
      return;
    }


    if (this.state.usernameError === "Username already taken") {
      return;
    } else {
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
      if (this.state.checkUsername) {
        const confirm = window.confirm(
          "Registed successfully want to change page to login ?"
        );
        if (confirm) {
          window.location.href = "http://localhost:3000/register";
        }
      }
    }
  };

  render() {
    const {
      username,
      password,
      displayName,
      email,
      dob,
      avatarPath,
      errorUsername,
      showErrorUsername,
      errorDisplayName,
      showErrorDisplayName,
      errorAvatar,
      showErrorAvatar,
      usernameError,
    } = this.state;
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
             {showErrorUsername ? (
              <>
                <div style={{ height: "10px" }}></div>
                <Alert key={"danger"} variant={"danger"}>
                  {this.state.errorUsername}
                </Alert>
              </>
            ) : null}
            {usernameError === '' ? null : (<>
              <Alert key={"danger"} variant={"danger"}>
                  {this.state.usernameError}
                </Alert>
            </>)}
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
            {showErrorDisplayName ? (
              <>
                <div style={{ height: "10px" }}></div>
                <Alert key={"danger"} variant={"danger"}>
                  {this.state.errorDisplayName}
                </Alert>
              </>
            ) : null}
            <br></br>

            <label>Email:</label>
            <input
              type="email"
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
            {showErrorAvatar ? (
              <>
                <div style={{ height: "10px" }}></div>
                <Alert key={"danger"} variant={"danger"}>
                  {this.state.errorAvatar}
                </Alert>
              </>
            ) : null}
            <br></br>
            <button className="btn btn-success" onClick={this.handleSubmit}>
              Register
            </button>
          </form>
        </div> */}
        <div className="container">
          <h2 className="login-title">Sign Up</h2>

          <form className="login-form">
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
              {usernameError === "" ? null : (
                <>
                  <Alert key={"danger"} variant={"danger"}>
                    {this.state.usernameError}
                  </Alert>
                </>
              )}
              {showErrorUsername ? (
                <>
                  <div style={{ height: "10px" }}></div>
                  <Alert key={"danger"} variant={"danger"}>
                    {this.state.errorUsername}
                  </Alert>
                </>
              ) : null}
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
              {showErrorDisplayName ? (
                <>
                  <div style={{ height: "10px" }}></div>
                  <Alert key={"danger"} variant={"danger"}>
                    {this.state.errorDisplayName}
                  </Alert>
                </>
              ) : null}
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
              {showErrorAvatar ? (
                <>
                  <div style={{ height: "10px" }}></div>
                  <Alert key={"danger"} variant={"danger"}>
                    {this.state.errorAvatar}
                  </Alert>
                </>
              ) : null}
            </div>
            <button
              className="btn btn--form"
              type="submit"
              value="Log in"
              onClick={this.handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
