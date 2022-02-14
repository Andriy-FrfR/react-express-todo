import Button from '../common/Button/Button';
import './TodoItem.css';
import { useTodo } from '../../hooks/useTodo';

const TodoItem = ({todo}) => {
  const todoCtx = useTodo();

  const onChangeHandler = (event) => {
    todoCtx.changeTodoCompleted(todo._id, event.target.checked);
  }

  return (
    <li className="TodoItem">
      <form action="#">
        <p>
          <label htmlFor={todo._id} >
            <input
              type="checkbox"
              id={todo._id}
              onChange={onChangeHandler}
              checked={todo.completed}
            />
            <span></span>
          </label>
        </p>
      </form>
      <p className="title">
        {todo.title}
      </p>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
      <Button
        className="waves-effect waves-light btn-small red"
        onClick={() => todoCtx.removeTodo(todo._id)}
      >
        Delete
      </Button>
    </li>
  );
}

export default TodoItem;
