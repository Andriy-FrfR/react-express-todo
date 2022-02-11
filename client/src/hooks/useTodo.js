import { useContext } from 'react';
import { todoContext } from '../context/todo/todoContext';

export const useTodo = () => {
  return useContext(todoContext);
}
