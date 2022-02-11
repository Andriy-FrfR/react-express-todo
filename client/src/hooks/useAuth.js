import { useContext } from 'react';
import { authContext } from '../context/auth/authContext';

export const useAuth = () => {
  return useContext(authContext);
};
