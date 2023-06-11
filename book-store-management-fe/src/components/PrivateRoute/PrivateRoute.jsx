import React from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated
  const userRoles = localStorage.getItem('role'); // Retrieve the user's roles
  const navigate = useNavigate(); // Hook to navigate to a different route

  if (isAuthenticated && roles.includes(userRoles)) {
    return <Component {...rest} />;
  } else {
    navigate('/login'); // Redirect to the login page
    return <Navigate to="/login" replace />; // Render a <Navigate> component to perform the redirect
  }
};

export default PrivateRoute;
