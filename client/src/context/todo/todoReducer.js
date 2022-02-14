import { CREATE_TODO, GET_TODOS, REMOVE_TODO, CHANGE_TODO_COMPLETED } from '../types';

export const todoReducer = (state, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {...state, todos: action.todos}
    case CREATE_TODO:
      return {...state, todos: action.todos};
    case REMOVE_TODO:
      const todosFiltered = state.todos.filter((todo) => todo._id !== action.id);
      return {...state, todos: todosFiltered};
    case CHANGE_TODO_COMPLETED:
      const todos = [...state.todos];
      const idx = todos.findIndex((todo) => todo._id === action.id);
      if (idx === -1) {
        return state;
      }
      const todo = {...todos[idx], completed: action.completed};
      todos[idx] = todo;
      return {...state, todos};
    default: return state;
  }
}
