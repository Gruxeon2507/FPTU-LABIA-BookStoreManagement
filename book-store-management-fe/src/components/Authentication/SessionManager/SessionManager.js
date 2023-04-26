import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../../Login/Login';

const SessionManager = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId,setSessionId] = useState('');

  useEffect(() => {
    setSessionId(localStorage.getItem("sessionId"))
    console.log(sessionId)
    if (sessionId) {
      axios.defaults.headers.common['sessionId'] = sessionId;
      axios.get('http://localhost:6789/api/auth/checkSession')
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          localStorage.removeItem('sessionId');
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, [sessionId]);

  const handleLogout = () => {
    localStorage.removeItem('sessionId');
    axios.post('http://localhost:6789/api/auth/logout')
      .then(() => setIsAuthenticated(false))
      .catch(console.log);
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {children}
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default SessionManager;
