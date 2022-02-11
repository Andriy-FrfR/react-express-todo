import './CreateTodoForm.css';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import { useInput } from '../../hooks/useInput';
import { useTodo } from '../../hooks/useTodo';

const CreateTodoForm = () => {
  const todoCtx = useTodo();

  const todoInput = useInput({
    label: 'Todo title', 
    name: 'todoInput',
    validation: {
      required: true
    }
  });

  const onCreateTodoHandler = (event) => {
    event.preventDefault();
    if (!todoInput.isValid) return;

    todoCtx.createTodo(todoInput.value);
  };

  return (
    <form className="CreateTodoForm">
      <Input input={todoInput} />
      <Button
        className="waves-effect waves-light btn-small center"
        disabled={!todoInput.isValid}
        type="submit"
        onClick={onCreateTodoHandler}
      >Create Todo</Button>
    </form>
  );
};

export default CreateTodoForm;
