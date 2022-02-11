import { useTodo } from '../../hooks/useTodo';
import { useEffect } from 'react';
import TodoItem from '../../components/TodoItem/TodoItem';
import './TodoList.css';
import CreateTodoForm from '../../components/CreateTodoForm/CreateTodoForm';

const TodoList = () => {
  const todosContext = useTodo();

  useEffect(() => {
    todosContext.getTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CreateTodoForm />
      <ul className="TodoList">
        {todosContext.state.todos.map((todo) => (
          <TodoItem todo={todo} key={todo._id} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
