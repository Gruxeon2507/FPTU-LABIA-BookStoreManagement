import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // Add an event listener to the form


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:6789/api/auth/login', { username, password });
      window.sessionStorage.setItem("user", response.data);
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("role")
      window.localStorage.setItem("user", response.data.username);
      window.localStorage.setItem("role",response.data.roles[0].roleName)
      console.log(response.data)
      console.log(window.localStorage.getItem("user"))
      console.log(window.localStorage.getItem("role"))
      // Set a timeout to remove the "user" item after 30 minutes (1,800,000 milliseconds)
      window.location.href = "/"
    } catch (error) {
      console.error(error);
      // display an error message to the user
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}
export default LoginForm
