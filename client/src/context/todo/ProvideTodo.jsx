import { useReducer } from 'react';
import { todoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { CREATE_TODO, GET_TODOS, REMOVE_TODO, CHANGE_TODO_COMPLETED } from '../types';
import { useAuth } from '../../hooks/useAuth';

const ProvideTodo = (props) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: []
  });

  const auth = useAuth();

  const createTodo = async (title) => {
    try {
      const response = await fetch('http://localhost:5000/api/todo/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title}),
        credentials: 'include'
      });

      if (response.status === 201) {
        const todos = await response.json();
        dispatch({
          type: CREATE_TODO,
          todos
        });
      } else if (response.status === 401) {
        auth.setIsAuthenticated(false);
      }
    } catch (e) {
      console.error(e);
    } 
  };

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todo/get-todos', {
        credentials: 'include'
      });

      if (response.status === 200) {
        const todos = await response.json();

        dispatch({type: GET_TODOS, todos})
      } else if (response.status === 401) {
        auth.setIsAuthenticated(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todo/remove-todo/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.status === 204) {
        dispatch({type: REMOVE_TODO, id});
      } else if (response.status === 401) {
        auth.setIsAuthenticated(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeTodoCompleted = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todo/set-todo-completed/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({completed}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (response.status === 204) {
        dispatch({type: CHANGE_TODO_COMPLETED, id, completed});
      } else if (response.status === 401) {
        auth.setIsAuthenticated(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <todoContext.Provider value={{
      state,
      createTodo,
      getTodos,
      removeTodo,
      changeTodoCompleted
    }}>
    {props.children}
    </todoContext.Provider>
  )
}

export default ProvideTodo;
