const {body} = require('express-validator');

exports.authValidators = [
  body('email').isEmail(),
  body('password').isLength({min: 6, max: 20})
];

exports.createTodoValidators = [
  body('title').notEmpty()
];

exports.setTodoCompletedValidators = [
  body('completed').isBoolean()
];
