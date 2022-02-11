import { useState } from 'react';
import { authContext } from './authContext';

const ProvideAuth = ({children}) => {
  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      if (response.status === 204) {
        setIsAuthenticated(true);
        setError(null);
      } else {
        const {error} = await response.json();
        setError(error);
        setIsAuthenticated(false);
      }

      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const register = async (email, password) => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 201) {
        setIsAuthenticated(true);
        setError(null);
      } else {
        const {error} = await response.json();
        setError(error);
        setIsAuthenticated(false);
      }

      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const autoLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/auto-login');

      if (response.status === 204) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/logout');

      if (response.status === 204) {
        setIsAuthenticated(false);
      }

      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <authContext.Provider value={{
      isAuthenticated, setIsAuthenticated,
      register, login, autoLogin, logout,
      loading, error
    }}>
      {children}
    </authContext.Provider>
  )
};

export default ProvideAuth;
