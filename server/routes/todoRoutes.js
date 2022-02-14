const {Router} = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {validationResult} = require('express-validator');
const {createTodoValidators, setTodoCompletedValidators} = require('../utils/validators');
const router = Router();

router.get('/get-todos', authMiddleware, (req, res) => {
  res.json(req.user.todos);
});

router.post('/create', authMiddleware, createTodoValidators, async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422);
  }
  
  try {
    const {title} = req.body;

    await req.user.addTodo(title);
  
    res.status(201).json(req.user.todos);
  } catch (e) {
    console.error(e);
  }
});

router.delete('/remove-todo/:id', authMiddleware, async (req, res) => {
  try {
    await req.user.removeTodo(req.params.id);

    res.status(204).end();
  } catch(e) {
    console.error(e);
  }
});

router.patch('/set-todo-completed/:id', authMiddleware, setTodoCompletedValidators, async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422);
  }

  try {
    await req.user.changeTodoCompleted(req.params.id, req.body.completed);
    res.status(204).end();
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
