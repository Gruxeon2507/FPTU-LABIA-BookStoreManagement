
import React, { useState } from 'react';
import axios from 'axios';
import Alert from "react-bootstrap/Alert";
import "./Login.scss";
import { Link, useParams,useNavigate } from 'react-router-dom';
function LoginForm() {
  const {link} = useParams();
  const [username, setUsername] = useState("");
  const [checkUsername, setCheckUsername] = useState(false);
  const [messageUsername, setMessageUsername] = useState(
    "Please just input numbers and characters"
  );
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [messageLoginFailed, setMessageLoginFailed] = useState("Login Failed");
  const navigate = useNavigate();
  // Add an event listener to the form

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(checkUsername){
      alert('can not load data to login');
      return;
    }
    try {
      const response = await axios.post(
        "http://103.173.229.92:6789/api/auth/login",
        { username, password }
      );
      console.log(response.data);
      const token = response.data.token;
      const role =response.data.role;
      localStorage.setItem("token",token);
      localStorage.setItem("role",role);

      if(link!=undefined){
        window.location.href="https://"+link
      }else{
        window.location.href="/"
      }

    } catch (error) {
      setLoginFailed(true);
      console.error(error);
      // display an error message to the user
    }
  };


  return (
    <div class="login">
      {/* <form onSubmit={handleSubmit} className='login-form'>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">Log in</button>
      </form> */}


      <div className="container">
        <h2 className="login-title">Log in</h2>

        <form className="login-form" onSubmit={handleSubmit} >
      
          <div>
            <label for="email">Username </label>
            <input type="text" value={username} placeholder='username' required onChange={(event) => setUsername(event.target.value)} />
          </div>

          <div>
            <label for="password">Password </label>
            <input type="password" value={password} placeholder='password' required onChange={(event) => setPassword(event.target.value)} />
          </div>
          {loginFailed ? (
        <>
          <div style={{ height: "10px" }}></div>
          <Alert key={"danger"} variant={"danger"}>
            {messageLoginFailed}
          </Alert>
        </>
      ) : null}

          <button className="btn btn--form" type="submit" value="Log in">
            Log in
          </button>
          <p>Don't have an account ? <span className='sign-in'><Link to="/register">Sign Up</Link></span></p>
        </form>
      </div>
    </div>

  );
}
export default LoginForm
