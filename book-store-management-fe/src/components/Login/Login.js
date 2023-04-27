import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [checkUsername, setCheckUsername] = useState(false);
  const [messageUsername, setMessageUsername] = useState(
    "Please just input numbers and characters"
  );
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [messageLoginFailed, setMessageLoginFailed] = useState("Login Failed");

  // Add an event listener to the form

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(checkUsername){
      alert('can not load data to login');
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:6789/api/auth/login",
        { username, password }
      );
      window.sessionStorage.setItem("user", response.data);
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("role");
      window.localStorage.setItem("user", response.data.username);
      window.localStorage.setItem("role", response.data.roles[0].roleName);
      console.log(response.data);
      console.log(window.localStorage.getItem("user"));
      console.log(window.localStorage.getItem("role"));
      // Set a timeout to remove the "user" item after 30 minutes (1,800,000 milliseconds)
      window.location.href = "/";
    } catch (error) {
      setLoginFailed(true);
      console.error(error);
      // display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => {
            const inputUsername = event.target.value;
            const regex = /^[a-zA-Z0-9\s]*$/;
            if (!regex.test(inputUsername)) {
              setCheckUsername(true);
              return;
            }
            setCheckUsername(false);
            setUsername(inputUsername);
          }}
        />
      </label>
      {checkUsername ? (
        <>
          <div style={{ height: "10px" }}></div>
          <Alert key={"danger"} variant={"danger"}>
            {messageUsername}
          </Alert>
        </>
      ) : null}
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {loginFailed ? (
        <>
          <div style={{ height: "10px" }}></div>
          <Alert key={"danger"} variant={"danger"}>
            {messageLoginFailed}
          </Alert>
        </>
      ) : null}
      <button type="submit">Log in</button>
    </form>
  );
}
export default LoginForm;
