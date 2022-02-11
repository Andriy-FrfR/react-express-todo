const {Router} = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = Router();

router.get('/get-todos', authMiddleware, (req, res) => {
  res.json(req.user.todos);
});

router.post('/create', authMiddleware, async (req, res) => {
  const {title} = req.body;

  await req.user.addTodo(title);

  res.status(201).json(req.user.todos);
});

router.delete('/remove-todo/:id', authMiddleware, async (req, res) => {
  try {
    await req.user.removeTodo(req.params.id);

    res.status(204).end();
  } catch(e) {
    console.error(e);
  }
});

router.patch('/set-todo-completed/:id', authMiddleware, async (req, res) => {
  try {
    await req.user.changeTodoCompleted(req.params.id, req.body.completed);
    res.status(204).end();
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
