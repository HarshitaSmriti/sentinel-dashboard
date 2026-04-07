import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from './Login';

const Signup: React.FC = () => {
  // Signup is handled within the Login page toggle
  return <Login />;
};

export default Signup;
