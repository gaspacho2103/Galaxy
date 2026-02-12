import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const exp = decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (exp > currentTime) {
          setIsAuthorized(true);
        } else {
          navigate('/auth', { replace: true });
        }
      } catch (e) {
        navigate('/auth', { replace: true });
      }
    } else {
      navigate('/auth', { replace: true });
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
};

export default ProtectedRoute;