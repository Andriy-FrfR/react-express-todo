const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  todos: [
    {
      completed: {
        type: Schema.Types.Boolean,
        required: true
      },
      title: {
        type: Schema.Types.String
      }
    }
  ]
});

userSchema.methods.addTodo = async function(title) {
  const todos = [...this.todos];
  todos.push({title, completed: false});
  this.todos = todos;

  return this.save();
};

userSchema.methods.removeTodo = async function(id) {
  const todos = this.todos.filter((todo) => todo._id.toString() !== id);
  this.todos = todos;

  return this.save();
}

userSchema.methods.changeTodoCompleted = async function(id, completed) {
  const todos = [...this.todos.toObject()];
  const idx = todos.findIndex((todo) => todo._id.toString() === id);
  const todo = {...todos[idx], completed};
  todos[idx] = todo;
  this.todos = todos;
  return this.save();
}

module.exports = model('User', userSchema);
