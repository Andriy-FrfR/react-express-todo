import { Routes, Route, Navigate } from 'react-router-dom';
import TodoList from '../../pages/TodoList/TodoList';
import Login from '../../pages/Login/Login';
import {useAuth} from '../../hooks/useAuth';
import { useEffect } from 'react';
import Logout from '../Logout/Logout';

const Router = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.autoLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let routes;
  if (auth.isAuthenticated) {
    routes = (
      <>
        <Route path="/" element={<TodoList />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  }

  return (
    <Routes>
      {routes}
    </Routes>
  )
}

export default Router;
