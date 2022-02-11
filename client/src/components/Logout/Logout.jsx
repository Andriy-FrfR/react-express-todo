import {useEffect} from 'react';
import { useAuth } from '../../hooks/useAuth';
import {Navigate} from 'react-router-dom';
import Loader from '../Loader/Loader';

const Logout = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.logout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth.loading) {
    return (
      <Loader />
    );
  }

  return <Navigate to="/" />;
}

export default Logout;
