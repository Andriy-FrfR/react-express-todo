import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ProvideTodo from './context/todo/ProvideTodo';
import ProvideAuth from './context/auth/ProvideAuth';

const app = (
  <React.StrictMode>
    <ProvideAuth>
      <ProvideTodo>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideTodo>
    </ProvideAuth>
  </React.StrictMode>
);

ReactDOM.render(
  app,
  document.getElementById('root')
);

reportWebVitals();
