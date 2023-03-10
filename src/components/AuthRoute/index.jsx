import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * Component to authorize access to logged in user for protected routes
 * @param {any} {children} Component to protect
 * @returns {any} children component or redirection to login page
 */
export default function AuthRoute({ children }) {
  const userId = localStorage.getItem('userId');

  const username = useSelector((state) => state.user.username);

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return children;
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
